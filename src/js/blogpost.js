import { blogs } from "./blogs.js";

function loadBlogPost() {
    const blogpost = document.querySelector(".blog-container");
    console.log(blogpost);

    const name = getBlogFolderName();

    for (const [date, blogData] of Object.entries(blogs)) {
        if (blogData.link == name) {
            const title = document.createElement("h1");
            title.textContent = blogData.title;
            title.classList.add("blog-heading", "pt-3", "text-center");
            blogpost.appendChild(title);

            if (blogData.image) {
                const img = document.createElement("img");
                img.src = blogData.image;
                img.alt = blogData.imageAlt;
                img.className = "blog-image";
                blogpost.appendChild(img);
            }

            const card = document.createElement("div");
            card.className = "card";

            const text = document.createElement("p");
            text.textContent = blogData.body;
            text.classList.add("text", "m-0");
            card.appendChild(text);
            blogpost.appendChild(card);
        }
    }
}

function getBlogFolderName() {
    const segments = window.location.pathname.split("/").filter((s) => s);
    if (segments[segments.length - 1] === "index.html") {
        segments.pop();
    }
    return segments.pop();
}

loadBlogPost();