document.addEventListener("DOMContentLoaded", function () {
    const writeReviewBtn = document.getElementById("write-review");
    const reviewForm = document.getElementById("review-form");
    const submitReviewBtn = document.getElementById("submit-review");
    const reviewsContainer = document.querySelector(".review .box-container");
    const starRating = document.querySelectorAll(".star");

    // original code from index.html
    let hardcodedReviewsHTML = reviewsContainer.innerHTML;
    
    let selectedRating = 5; // Default rating

    // star rating
    starRating.forEach((star, index) => {
        star.addEventListener("click", function () {
            selectedRating = index + 1;
            highlightStars(index);
        });
    });

    function highlightStars(index) {
        starRating.forEach((star, i) => {
            if (i <= index) {
                star.classList.add("selected");
            } else {
                star.classList.remove("selected");
            }
        });
    }

    // show the review form
    if (writeReviewBtn && reviewForm) {
        writeReviewBtn.addEventListener("click", function () {
            reviewForm.style.display = "block";
        });
    } else {
        console.error("🔴 ERROR: Write Review button or form not found!");
    }

    // review submission
    if (submitReviewBtn) {
        submitReviewBtn.addEventListener("click", function () {
            const name = document.getElementById("review-name").value.trim();
            const text = document.getElementById("review-text").value.trim();
            const randomImage = `r${Math.floor(Math.random() * 7) + 1}.jpg`; // Random profile pic
            const stars = `<i class="fas fa-star"></i>`.repeat(selectedRating);

            if (!name || !text) {
                alert("Please enter your name, review, and select a rating!");
                return;
            }

            let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
            reviews.push({ name, text, image: randomImage, stars });

            localStorage.setItem("reviews", JSON.stringify(reviews));
            alert("Your review has been submitted!");

            // Clear form and hide it
            document.getElementById("review-name").value = "";
            document.getElementById("review-text").value = "";
            reviewForm.style.display = "none";

            // Reset star rating to 5 by default
            highlightStars(4);
            selectedRating = 5;

            // Reload reviews
            loadReviews();
        });
    } else {
        console.error("🔴 ERROR: Submit Review button not found!");
    }

    // load and disply
    function loadReviews() {
        if (!reviewsContainer) {
            console.error("🔴 ERROR: Review section not found!");
            return;
        }

        // keep orignal review
        reviewsContainer.innerHTML = hardcodedReviewsHTML;

        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        if (reviews.length === 0) {
            return;
        }

        // new review with delete btn
        reviews.forEach((review, index) => {
            let div = document.createElement("div");
            div.classList.add("box");
            div.innerHTML = `
                <div class="stars">${review.stars}</div>
                <p>${review.text}</p>
                <div class="user">
                    <img src="${review.image}" alt="" class="circle-image">
                    <div class="user-info">
                        <h3>${review.name}</h3>
                        <span>verified customer</span>
                    </div>
                </div>
                <button class="delete-review-btn" data-index="${index}" 
                    style="background: blueviolet; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-top: 10px; border-radius: 5px;">
                    🗑️ Delete
                </button>
                <span class="fas far fa-quote-right"></span>`;
            reviewsContainer.appendChild(div);
        });

        // ensure delete btn work
        document.querySelectorAll(".delete-review-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = parseInt(this.getAttribute("data-index"));
                deleteReview(index);
            });
        });
    }

    // delete reviews funtion
    function deleteReview(index) {
        console.log(`🗑️ Delete button clicked for review index: ${index}`);

        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        if (index < 0 || index >= reviews.length) {
            console.error("🔴 ERROR: Invalid review index!");
            return;
        }

        reviews.splice(index, 1); 
        localStorage.setItem("reviews", JSON.stringify(reviews));

        loadReviews();
    }

    // load reviews on load page
    loadReviews();
});
