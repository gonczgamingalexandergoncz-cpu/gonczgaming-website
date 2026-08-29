const path = window.location.pathname;
const filename = path.substring(path.lastIndexOf("/") + 1);
const currentSlug = filename.replace(".html", "");

const currentGame = games.find(game => game.slug === currentSlug);

if (currentGame) {
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async function loadLatestDevlog(slug) {
        try {
            await loadScript(`../devlogs/${slug}/entry-list.js`);
            await loadScript(`../devlogs/${slug}/${entryFiles[0]}`);

            const devlogContainer = document.getElementById("latest-devlog");
            devlogContainer.textContent = "";

            const text = document.createElement("p");
            text.textContent = entry.content;
            devlogContainer.appendChild(text);

            if (entry.images && entry.images.length > 0) {
                const gallery = document.createElement("div");
                gallery.className = "devlog-entry-gallery";

                entry.images.forEach(imgSrc => {
                    const img = document.createElement("img");
                    img.src = imgSrc;
                    gallery.appendChild(img);
                });

                devlogContainer.appendChild(gallery);
            }
        } catch (err) {
            document.getElementById("latest-devlog").textContent = "No updates yet — check back soon!";
        }
    }

    loadLatestDevlog(currentSlug);

    if (!currentGame.downloadReady) {
        document.querySelector(".btn-download").style.display = "none";
    }
    if (!currentGame.alphaOpen) {
        document.querySelector(".btn-alpha").style.display = "none";
    }
    if (!currentGame.betaOpen) {
        document.querySelector(".btn-beta").style.display = "none";
    }
    if (!currentGame.steamAppId) {
        document.querySelector(".btn-steam").style.display = "none";
    }
}