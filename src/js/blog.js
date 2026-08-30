import { blogs } from "./blogs.js";

const POSTS_PER_PAGE = 5;
let currentPage = 0;
let sortedEntries = []

function loadBlogPage() {
    sortedEntries = Object.entries(blogs).sort(
        ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
    );

    renderPage(currentPage);
}

function renderPage(page) {
    const blogArea = document.querySelector("#blog-area");
    blogArea.innerHTML = "";

    const start = page * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const pageEntries = sortedEntries.slice(start, end);

    for (const [date, blog] of pageEntries) {
        blogArea.appendChild(createBlogCard(date, blog));
    }

    renderPagination(page);
}

function renderPagination(page) {
    const pagination = document.querySelector("#blog-pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(sortedEntries.length / POSTS_PER_PAGE);

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "<";
    prevBtn.classList.add("pagination-arrow");
    prevBtn.disabled = page === 0;
    prevBtn.addEventListener("click", () => {
        currentPage--;
        renderPage(currentPage);
    });

    const pageLabel = document.createElement("span");
    pageLabel.classList.add("pagination-arrow", "text");
    pageLabel.textContent = `${page + 1} / ${totalPages}`;

    const nextBtn = document.createElement("button");
    nextBtn.textContent = ">";
    nextBtn.classList.add("pagination-arrow");
    nextBtn.disabled = page >= totalPages - 1;
    nextBtn.addEventListener("click", () => {
        currentPage++;
        renderPage(currentPage);
    });

    pagination.appendChild(prevBtn);
    pagination.appendChild(pageLabel);
    pagination.appendChild(nextBtn);
}

function createBlogCard(date, blog) {
    const link = document.createElement("a");
    link.href = `/blog/${blog.link}`;
    link.classList.add("text-decoration-none", "blog-card-link");

    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h2");
    title.textContent = blog.title;
    title.classList.add("heading", "mb-1");
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = blog.description;
    description.classList.add("text", "m-0");
    card.appendChild(description);

    const dateEl = document.createElement("p");
    dateEl.textContent = formatDate(date);
    dateEl.classList.add("subtext", "m-0");
    card.appendChild(dateEl);

    link.appendChild(card);
    return link;
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function loadBlogPost() {
    const blogpost = document.querySelector("#blog-post");

    const name = getBlogFolderName();

    for (blog of Object.entries(blogs)) {
        if (blog.link == name) {
            const title = document.createElement("h1");
            title.textContent = blog.title;
            title.classList.add("blog-heading", "pt-1", "text-center");
            blogpost.appendChild(title);

            if (blog.image) {
                const img = document.createElement("img");
                img.src = blog.image;
                img.alt = blog.imageAlt;
                img.className = "blog-image";
                blogpost.appendChild(img);
            }

            const text = document.createElement("p");
            text.textContent = blog.body;
            text.className = "blog-text";
            blogpost.appendChild(text);
        }
    }
}

function getBlogFolderName() {
    const segments = window.location.pathname.split("/").filter((s) => s);
    let last = segments[segments.length - 1];
    if (last === "index.html") {
        segments.pop();
        last = segments[segments.length - 1];
    }
    return last;
}

loadBlogPage();