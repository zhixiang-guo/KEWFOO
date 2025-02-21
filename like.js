document.addEventListener("DOMContentLoaded", function () {
    console.log("like.js loaded!");

    if (document.getElementById("like-items")) {
        console.log("Loading liked items");
        loadlike();
    }

    let clearLikeBtn = document.getElementById("clearlike");
    if (clearLikeBtn) {
        clearLikeBtn.addEventListener("click", clearlike);
    }
});

function addTolike(name, image) {
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("You must be logged in to like items!");
        window.location.href = "signup.html"; // Redirect to login page
        return;
    }

    let like = JSON.parse(localStorage.getItem("like")) || [];

    let existingItem = like.find(item => item.name === name);
    if (existingItem) {
        alert(`${name} is already in your Likes!`);
        return;
    }

    like.push({ name, image });

    localStorage.setItem("like", JSON.stringify(like));
    alert(`${name} added to Likes!`);
}

function loadlike() {
    let like = JSON.parse(localStorage.getItem("like")) || [];
    let likeItems = document.getElementById("like-items");

    if (!likeItems) {
        console.warn("like-items not found in like.html!");
        return;
    }

    likeItems.innerHTML = "";

    if (like.length === 0) {
        likeItems.innerHTML = "<p>No liked items yet!</p>";
        console.log("Like list is empty.");
        return;
    }

    like.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:100px; height:100px; margin-right:10px;">
            ${item.name}
            <button onclick="removeFromlike('${item.name}')">Remove</button>`;
        likeItems.appendChild(li);
    });

    console.log("Loaded liked items:", like);
}

function removeFromlike(name) {
    let like = JSON.parse(localStorage.getItem("like")) || [];
    like = like.filter(item => item.name !== name);
    localStorage.setItem("like", JSON.stringify(like));
    loadlike();
}

function clearlike() {
    localStorage.removeItem("like");
    loadlike();
    alert("All liked items cleared!");
}