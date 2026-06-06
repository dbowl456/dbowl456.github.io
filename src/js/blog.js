const datePicker = document.getElementById("blog-date");

const today = new Date().toISOString().split('T')[0];
datePicker.value = today;

function loadBlogPost(date) {
    const blogBottom = document.querySelector(".blog-bottom");
    blogBottom.innerHTML = "";

    const post = blogs[date];

    if (post) {
        const title = document.createElement("h2");
        title.textContent = post.title;
        title.className = "blog-heading";

        const text = document.createElement("p");
        text.textContent = post.body;
        text.className = "blog-text";

        blogBottom.appendChild(title);
        blogBottom.appendChild(text);
    } else {
        blogBottom.innerHTML = "<p class=blog-text>No blog post found for that date.</p>"
    }
}

datePicker.addEventListener("change", (e) => loadBlogPost(e.target.value));
loadBlogPost(today);