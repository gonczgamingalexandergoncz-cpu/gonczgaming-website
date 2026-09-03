const newsContainer = document.getElementById("news-list");
const NEWS_LIMIT = 5;

function loadNewsScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function buildNews() {
    if (!newsContainer) return;

    try {
        await loadNewsScript("news/entry-list.js");
    } catch (err) {
        newsContainer.innerHTML = '<p class="news-empty">No announcements yet — check back soon.</p>';
        return;
    }

    const loaded = [];

    for (const file of newsFiles) {
        try {
            await loadNewsScript(`news/${file}`);
            const slug = file.split("/").pop().replace(".js", "");
            loaded.push(Object.assign({ slug: slug }, newsEntry));
        } catch (err) {
            // skip a missing entry file
        }
    }

    if (loaded.length === 0) {
        newsContainer.innerHTML = '<p class="news-empty">No announcements yet — check back soon.</p>';
        return;
    }

    loaded.sort((a, b) => String(b.date).localeCompare(String(a.date)));

    loaded.slice(0, NEWS_LIMIT).forEach(item => {
        const article = document.createElement("a");
        article.className = "news-item";
        article.href = `news/entry.html?entry=${encodeURIComponent(item.slug)}`;

        const heading = document.createElement("h3");
        heading.textContent = item.title;

        const date = document.createElement("p");
        date.className = "news-date";
        date.textContent = item.date;

        const body = document.createElement("p");
        body.className = "news-body";
        body.textContent = item.summary || "";

        const more = document.createElement("span");
        more.className = "news-more";
        more.textContent = "Read the full update";

        article.appendChild(heading);
        article.appendChild(date);
        article.appendChild(body);
        article.appendChild(more);
        newsContainer.appendChild(article);
    });
}

buildNews();
