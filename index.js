let itemsContainer = document.getElementById("items")
let spinBtn = document.getElementById("spinBtn")
let result = document.getElementById("result")
let coins = document.getElementById("coins")
let cell = document.querySelector('.invCell')
let coinsInlet = 1000

let items = [
"🦆",
"💎",
"🪙",
"🔥",
"👑"
]

// заполняем ленту
for(let i = 0; i < 30; i++){
    let div = document.createElement("div")
    div.className = "item"
    div.textContent = items[Math.floor(Math.random() * items.length)]
    itemsContainer.appendChild(div)
}


 spinBtn.addEventListener("click", function(){

    if(coinsInlet >= 100){

        let randomIndex = Math.floor(Math.random() * 30)
        let offset = randomIndex * 100

        itemsContainer.style.transform = "translateX(-" + offset + "px)"

        spinBtn.disabled = true

        setTimeout(function(){
        spinBtn.disabled = false
        }, 2000)

        coinsInlet -= 100
        coins.textContent = coinsInlet

         cells = document.querySelectorAll(".invCell")
        
         let selectedItem = itemsContainer.children[randomIndex].textContent
result.textContent = "You got: " + selectedItem

        addToInventory(selectedItem)
        function addToInventory(item){

            for(let i = 0; i < cells.length; i++){

                if(cells[i].textContent === ""){
                    cells[i].textContent = item
                    return
                }

            }

            alert("Inventory full!")
        }

    } else {
        alert('not enough currency!')
    }
   
})

sell.addEventListener('click', function(){

    for(let i = cells.length - 1; i >= 0; i--){

        if(cells[i].textContent !== ""){
            cells[i].textContent = ""
            coinsInlet += 100
            coins.textContent = coinsInlet
            return
        }

    }

    alert("Нет предметов!")

})