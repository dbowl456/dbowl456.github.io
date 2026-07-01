import { blogs } from "./blogs.js";

const datePicker = document.getElementById("blog-date");

const now = new Date()
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
datePicker.value = today;

function loadBlogPost(date) {
    const blogBottom = document.querySelector(".blog-bottom");
    blogBottom.innerHTML = "";

    const post = blogs[date];

    if (post) {
        const title = document.createElement("h2");
        title.textContent = post.title;
        title.className = "blog-heading";
        blogBottom.appendChild(title);

        if (post.image) {
            const img = document.createElement("img");
            img.src = post.image;
            img.alt = post.imageAlt;
            img.className = "blog-image";
            blogBottom.appendChild(img);
        }

        const text = document.createElement("p");
        text.textContent = post.body;
        text.className = "blog-text";
        blogBottom.appendChild(text);
    } else {
        blogBottom.innerHTML = "<span class=blog-text>No blog post found for that date.</span>"
    }
}

datePicker.addEventListener("change", (e) => loadBlogPost(e.target.value));
loadBlogPost(today);