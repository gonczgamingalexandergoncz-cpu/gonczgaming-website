const pathParts = window.location.pathname.split("/");
const gameSlug = pathParts[pathParts.length - 2];

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function buildDevlogArchive() {
    await loadScript(`../${gameSlug}/entry-list.js`);

    const entries = [];

    for (const file of entryFiles) {
        await loadScript(`../${gameSlug}/${file}`);
        entries.push(entry);
    }

    const container = document.getElementById("devlog-list");

    entries.forEach((entryData, index) => {
        const item = document.createElement("div");
        item.className = "devlog-entry";

        const header = document.createElement("button");
        header.className = "devlog-entry-header";
        header.textContent = `${entryData.title} — ${entryData.date}`;

        const body = document.createElement("div");
        body.className = "devlog-entry-body";

        const text = document.createElement("p");
        text.textContent = entryData.content;
        body.appendChild(text);

        if (entryData.images && entryData.images.length > 0) {
            const gallery = document.createElement("div");
            gallery.className = "devlog-entry-gallery";

            entryData.images.forEach(imgSrc => {
                const img = document.createElement("img");
                img.src = imgSrc;
                gallery.appendChild(img);
            });

            body.appendChild(gallery);
        }

        body.style.display = "none";

        header.addEventListener("click", () => {
            const alreadyOpen = body.style.display === "block";

            document.querySelectorAll(".devlog-entry-body").forEach(el => {
                el.style.display = "none";
            });

            body.style.display = alreadyOpen ? "none" : "block";
        });

        item.appendChild(header);
        item.appendChild(body);
        container.appendChild(item);
    });
}

buildDevlogArchive();