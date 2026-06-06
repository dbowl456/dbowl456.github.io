const datePicker = document.getElementById("blog-date");

datePicker.addEventListener("change", (e) => {
    const date = e.target.value;
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
});