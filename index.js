import { menuArray } from "./data.js"

const mainEl = document.getElementById("main-items")
const orderEl = document.getElementById("order-items")
let itemArr = []

renderMenu()

function renderMenu(){
    let menuEl = menuArray.map((item) => {
        return (`
            <div class="menu-item">
                <div>
                    <div class="item-start">
                    <p class="emoji" >${item.emoji}</p>
                    <div class="item-desc">
                        <p class="item-name">${item.name}</p>
                        <p class="item-ingredients">${item.ingredients.join(", ")}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                    </div>
                </div>
                <button id="${item.id}" class="add-item">+</button>
            </div>
            `)
    }).join("")

    mainEl.innerHTML += menuEl

}

mainEl.addEventListener('click', (e) => {
     console.log(e.target.id)
     if (e.target.id){
        itemArr.push(e.target.id)
     }
     console.log(itemArr)
})

