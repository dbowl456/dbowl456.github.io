const datePicker = document.getElementById("blog-date");

const now = new Date()
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
datePicker.value = today;
console.log(today);

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
        blogBottom.innerHTML = "<span class=blog-text>No blog post found for that date.</span>"
    }
}

datePicker.addEventListener("change", (e) => loadBlogPost(e.target.value));
loadBlogPost(today);