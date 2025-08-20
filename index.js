import { menuArray } from "./data.js"

const mainEl = document.getElementById("main-items")
const orderEl = document.getElementById("order-items")
const paymentModal = document.getElementById('pay-modal')
let itemArr = []
let modalOpen = false

renderMenu()

function renderMenu(){
    const menuEl = menuArray.map((item) => {
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
     if (e.target.id){
        itemArr.push(e.target.id)
     }
     if (e.target.id && itemArr.length > 0){
        renderOrder()
     }
})

// I need to render all of the items in the array. I have the ID's of each element. 
// I need to use the ID's to find the corresponding object with that ID. I think I can use find()
// Then I will render everything 
function renderOrder(){
    let totalCost = 0

    const selectedItemsArr = itemArr.map((id) => {
        return menuArray.find((item) => item.id.toString() === id)
    }).filter(item => item !== undefined)

    const selectedItemsEl = selectedItemsArr.map((item) => {
        return `
        <div class="order-item">
            <div class="order-item-desc">
                <p class="order-item-name">${item.name}</p>
                <button id="${item.id}"class="remove-btn">remove</button>
            </div>
            <p class="font-util-two">$${item.price}</p>
        </div>
        `
    }).join("")

    const totalPrice = selectedItemsArr.reduce((acc, item) => {
        return acc += item.price
    }, 0)

    orderEl.innerHTML = `<p class="center-util font-util your-order">Your Order</p>` 
    + selectedItemsEl + 
    `<hr>` + 
    `<div class="total-price">
        <p class="font-util">Total Price:</p>
        <p class="font-util-two">$${totalPrice}</p>
    </div>` + 
    `<div id="complete-container" class="complete-btn-container">
        <button id="complete" class="complete-btn">Complete Order</button>
    </div>`

}

// Removing items, probably can clean up this logic
// Have one event listener for the menu items, and one for the user's order. Makes the most sense for me.
orderEl.addEventListener('click', (e) => {
    // Find the first index of the item to be deleted, then filter that items index out of the array.
    let targetIndex
    if (e.target.id){
        targetIndex = itemArr.findIndex((item) => {
            return item === e.target.id
        })
    }

    if (e.target.id === "complete"){
        if (!modalOpen){
            paymentModal.classList.toggle("pay-hide")
            modalOpen = true
        }
    }

    itemArr = itemArr.filter((item, index) => {
        return index !== targetIndex
    })

    // If the array is empty clear out any rendering, otherwise re-render the order.
    if (itemArr.length === 0){
        orderEl.innerHTML = ""
    } else {
        renderOrder()
    }

})

let paymentEl = document.getElementById("payment-form")

paymentEl.addEventListener("submit", (e) => {
    e.preventDefault()
    paymentModal.classList.toggle("pay-hide")
    orderEl.innerHTML = `<p class="order-submit">Thanks, Your order is on its way!</p>`
    itemArr = []
    modalOpen = false
    paymentEl.reset()
})