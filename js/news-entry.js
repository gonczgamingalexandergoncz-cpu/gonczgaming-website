const params = new URLSearchParams(window.location.search);
const slug = (params.get("entry") || "").replace(/[^a-z0-9\-_]/gi, "");

const titleEl = document.getElementById("news-entry-title");
const dateEl = document.getElementById("news-entry-date");
const bodyEl = document.getElementById("news-entry-body");

function showMissing() {
    titleEl.textContent = "Update not found";
    bodyEl.innerHTML = '<p>That update could not be loaded. It may have been renamed or removed.</p>';
}

if (!slug) {
    showMissing();
} else {
    const script = document.createElement("script");
    script.src = `entries/${slug}.js`;

    script.onload = () => {
        document.title = `${newsEntry.title} - Goncz Gaming`;
        titleEl.textContent = newsEntry.title;
        dateEl.textContent = newsEntry.date;

        const paragraphs = Array.isArray(newsEntry.body) ? newsEntry.body : [newsEntry.body];
        paragraphs.forEach(text => {
            const p = document.createElement("p");
            p.textContent = text;
            bodyEl.appendChild(p);
        });
    };

    script.onerror = showMissing;
    document.head.appendChild(script);
}
