const itemsContainer = document.getElementById("items");
const spinBtn = document.getElementById("spinBtn");
const resultLabel = document.getElementById("result");
const coinsLabel = document.getElementById("coins");
const energyLabel = document.getElementById("energy");
const sellBtn = document.querySelector(".sell");
const cells = document.querySelectorAll(".invCell");

let coinsInlet = 1000;
let energyInlet = 5;

// 🎰 Предметы с твоими картинками
function getItem() {
    let r = Math.random() * 100;
    if (r < 80) return { img: "4-removebg-preview.png", rarity: "common", value: 50 };
    if (r < 89) return { img: "3-removebg-preview.png", rarity: "rare", value: 100 };
    if (r < 95) return { img: "2-removebg-preview.png", rarity: "epic", value: 200 };
    return { img: "1.png", rarity: "legendary", value: 500 };
}

// Создание элемента для ленты
function createItemElement(item) {
    let div = document.createElement("div");
    div.className = "item " + item.rarity;
    let img = document.createElement("img");
    img.src = item.img;
    div.appendChild(img);
    return div;
}

// Начальное заполнение
function init() {
    itemsContainer.innerHTML = "";
    for(let i = 0; i < 50; i++) {
        itemsContainer.appendChild(createItemElement(getItem()));
    }
}
init();

// 🚀 ЛОГИКА СПИНА
spinBtn.addEventListener("click", () => {
    if (coinsInlet < 100 || energyInlet <= 0) {
        alert("Недостаточно средств или энергии!");
        return;
    }

    spinBtn.disabled = true;
    
    // Сброс анимации
    itemsContainer.style.transition = "none";
    itemsContainer.style.transform = "translateX(0)";
    itemsContainer.innerHTML = "";

    const winningItem = getItem();
    const winIndex = 40; // На каком предмете остановимся

    // Генерация новой ленты под результат
    for (let i = 0; i < winIndex + 5; i++) {
        let item = (i === winIndex) ? winningItem : getItem();
        itemsContainer.appendChild(createItemElement(item));
    }

    // Запуск прокрутки
    setTimeout(() => {
        itemsContainer.style.transition = "transform 2.5s cubic-bezier(0.1, 0, 0.1, 1)";
        let itemWidth = 110; // 100px + 10px margin
        let centerOffset = (320 / 2) - (itemWidth / 2);
        let finalPos = (winIndex * itemWidth) - centerOffset;
        itemsContainer.style.transform = `translateX(-${finalPos}px)`;
    }, 50);

    // Расходы
    coinsInlet -= 100;
    energyInlet -= 1;
    coinsLabel.textContent = coinsInlet;
    energyLabel.textContent = energyInlet;

    // Финал анимации
    setTimeout(() => {
        addToInventory(winningItem);
        spinBtn.disabled = false;

        if (energyInlet === 0) {
            setTimeout(() => {
                energyInlet = 5;
                energyLabel.textContent = energyInlet;
            }, 1000);
        }
    }, 2600);
});

// Добавление в инвентарь
function addToInventory(item) {
    for (let cell of cells) {
        if (cell.innerHTML === "") {
            cell.innerHTML = `<img src="${item.img}">`;
            cell.dataset.value = item.value;
            cell.className = "invCell " + item.rarity;
            return;
        }
    }
}

// Продажа последнего предмета
sellBtn.addEventListener("click", () => {
    for (let i = cells.length - 1; i >= 0; i--) {
        if (cells[i].innerHTML !== "") {
            coinsInlet += parseInt(cells[i].dataset.value);
            coinsLabel.textContent = coinsInlet;
            cells[i].innerHTML = "";
            cells[i].className = "invCell";
            return;
        }
    }
    alert("No items!");
});