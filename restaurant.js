document.addEventListener("DOMContentLoaded", () => {
async function getMenu() {
    try {
        let response = await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
        let data = await response.json();

        let menuDiv = document.getElementById("menu-items");
        menuDiv.innerHTML = "";

        data.forEach(item => {
            let div = document.createElement("div")
            div.className = "menu-card";
            div.innerHTML +=
            `
            <img src="pizza.jpg" alt="${item.name}" width="280" height="200"/>
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            `;
            menuDiv.appendChild(div);
        })

    }
    catch(error) {
        console.log(`Error fetching menu`, error)
    }
}

function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(async () => {
            let response = await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
            let data = response.json();

            let orderItems = [];
            for (let i = 0; i < 3; i++) {
                let randomIndex = Math.floor(Math.random() * 10)
                orderItems.push(data[randomIndex])
            }

            let order = {items : orderItems};
            console.log(`Order placed`);
            resolve(order)
        }, 2500);
    })
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            let orderStatus = { order_status: true, paid: false };
            console.log("Order is being prepared:", orderStatus);
            resolve(orderStatus);
        }, 1500);
    });
}

function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            let paymentStatus = { order_status: true, paid: true };
            console.log("Order paid:", paymentStatus);
            resolve(paymentStatus);
        }, 1000);
    });
}

function thankyouFnc() {
    alert("Thank you for eating with us today!");
}

async function startProcess() {
    await getMenu();

    let order = await takeOrder();
    let prep = await orderPrep();
    let payment = await payOrder();

    if (payment.paid) {
        thankyouFnc();
    }
}

startProcess()
})