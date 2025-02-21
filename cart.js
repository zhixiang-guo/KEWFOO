document.addEventListener("DOMContentLoaded", function () {
    console.log("cart.js loaded!");

    if (document.getElementById("cart-items")) {
        console.log("Loading cart items");
        loadCart();
    }

    let clearcartBtn = document.getElementById("clearCart");
    if (clearcartBtn) {
        clearcartBtn.addEventListener("click", clearCart);
    }

    let checkoutBtn =document.getElementById("checkout");
    if (checkoutBtn){
        checkoutBtn.addEventListener("click",checkout);
    }
});

// add item to cart
function addToCart(name, price, image) {
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("You must be logged in to add items to the cart!");
        window.location.href = "signup.html"; // Redirect to login page
        return;
    }
    let userCartKey = `cart_${loggedInUser}`; // Store cart separately for each user
    let cart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem(userCartKey, JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

//  load cart items
function loadCart() {
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        document.getElementById("cart-items").innerHTML = "<p>Please log in to view your cart.</p>";
        return;
    }

    let userCartKey = `cart_${loggedInUser}`;
    let cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
    let cartItems = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("totalprice");

    cartItems.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:100px; height:100px; margin-right:10px;">
            ${item.name} - $${item.price} x ${item.quantity}
            <button onclick="removeFromCart('${item.name}')">Remove</button>`;
        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// remove item from cart
function removeFromCart(name) {
    let loggedInUser = localStorage.getItem("loggedInUser");
    console.log("Logged in user:", loggedInUser);
    if (!loggedInUser) {
        alert("You must be logged in to remove items from the cart!");
        return;
    }

    let userCartKey = `cart_${loggedInUser}`;
    let cart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    cart = cart.filter(item => item.name !== name);
    localStorage.setItem(userCartKey, JSON.stringify(cart));
    alert("cart cleared")
    loadCart();
}


// clearCart
function clearCart() {
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("You must be logged in to clear the cart!");
        return;
    }

    let userCartKey = `cart_${loggedInUser}`;
    localStorage.removeItem(userCartKey);
    loadCart();
    alert("Cart cleared!");
}

// checkout
function checkout() {
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("You must be logged in to checkout!");
        return;
    }

    let userCartKey = `cart_${loggedInUser}`;
    let cart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    localStorage.removeItem(userCartKey);
    loadCart();
    alert("Thank you for your purchase!");
}