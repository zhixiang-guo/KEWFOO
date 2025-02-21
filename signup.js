document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");
    const usericon = document.getElementById("user-icon");
    const logoutBtn = document.getElementById("logout-btn");
    const loginContainer = document.querySelector(".login-container");
    const validUsername={
        "naza" :"1021",
        "zhi" :"1021",
        "ben" :"1111",
        "joe" :"2222",
        "shahid" :"333333333333333",
        "sbxin":"sbsb"
    }
     function checkLoginStatus() {
        const loggedInUser = localStorage.getItem("loggedInUser");

        if(loggedInUser){
            if(usericon){
                usericon.textContent =loggedInUser;
                usericon.style.fontSize ="3rem";
            }
            if(logoutBtn){
                logoutBtn.style.display ="inline-block";
            }
            if(loginContainer){
                loginContainer.innerHTML= `
                <div class="welcomen-box" style="border: 2px solid rgb(97, 76, 175); padding:15px; border-radius: 40px; background:rgb(231, 185, 245); text-align:center; font-size:1.5rem;">
                <h2 style="margin:0; color:#black;">welcome, ${loggedInUser}!</h2>
                <p>you are logged in.</p>
                `;
            }
        }else{
            if(logoutBtn){
                logoutBtn.style.display="none";
            }
            if(loginContainer){
                loginContainer.style.display="block";
            }
        }
    }
    checkLoginStatus();
    if(loginForm){
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const username =document.getElementById("username").value.trim();
            const password =document.getElementById("password").value.trim();
            if(validUsername[username]&&validUsername[username]===password){
                localStorage.setItem("loggedInUser",username);
                errorMessage.style.color ="green";
                errorMessage.textContent = "login successful!";

                setTimeout(() => {
                    window.location.href="index.html";
                }, 2000);
            }else{
                errorMessage.style.color = "red"
                errorMessage.textContent ="inivalid username or password";
            } 
        });
    }
    logoutBtn.addEventListener("click", function(){
        localStorage.removeItem("loggedInUser"); // Remove user session
        localStorage.removeItem("cart"); // Clear cart items
        localStorage.removeItem("like"); // Clear liked items
        alert("You have been logged out. Your cart and likes have been saved.");
        window.location.href = "signup.html"; // Redirect to login page
    });
});