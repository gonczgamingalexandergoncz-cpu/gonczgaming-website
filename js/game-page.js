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

            const all = [];
            for (const file of entryFiles) {
                try {
                    await loadScript(`../devlogs/${slug}/${file}`);
                    all.push(entry);
                } catch (e) {
                    // skip a missing entry file
                }
            }

            all.sort((a, b) => String(b.date).localeCompare(String(a.date)));
            const latest = all[0];
            if (!latest) throw new Error("no entries");

            const devlogContainer = document.getElementById("latest-devlog");
            devlogContainer.textContent = "";

            const heading = document.createElement("p");
            heading.className = "latest-devlog-meta";
            heading.textContent = `${latest.title} — ${latest.date}`;
            devlogContainer.appendChild(heading);

            const text = document.createElement("p");
            text.textContent = latest.content;
            devlogContainer.appendChild(text);

            if (latest.images && latest.images.length > 0) {
                const gallery = document.createElement("div");
                gallery.className = "devlog-entry-gallery";

                latest.images.forEach(imgSrc => {
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
    function setUpSignupForm(selector, formId, stage, isOpen) {
        const form = document.querySelector(selector);
        if (!form) return;

        if (!isOpen) {
            form.remove();
            return;
        }

        form.action = SIGNUP_ENDPOINT;
        form.querySelector('[name="accessKey"]').value = formId;
        form.querySelector('[name="game"]').value = currentGame.name;
        form.querySelector('[name="subject"]').value = `${stage} signup — ${currentGame.name}`;
        form.style.display = "flex";

        const status = form.querySelector(".signup-status");
        const submitButton = form.querySelector("button[type='submit']");

        form.addEventListener("submit", async event => {
            event.preventDefault();

            if (!form.checkValidity()) {
                status.className = "signup-status is-error";
                status.textContent = "Please add your name, a valid email address, and answer the updates question.";
                return;
            }

            submitButton.disabled = true;
            status.className = "signup-status is-pending";
            status.textContent = "Sending…";

            try {
                const response = await fetch(SIGNUP_ENDPOINT, {
                    method: "POST",
                    body: new FormData(form),
                });

                if (!response.ok) throw new Error(response.status);

                form.classList.add("is-sent");
                status.className = "signup-status is-success";
                status.textContent = `You're on the ${stage.toLowerCase()} list for ${currentGame.name} — thanks!`;
                submitButton.textContent = "Signed up";
            } catch (err) {
                submitButton.disabled = false;
                status.className = "signup-status is-error";
                status.textContent = "That didn't go through. Please try again in a moment.";
            }
        });
    }

    setUpSignupForm(".form-alpha", ALPHA_FORM_ID, "Alpha", currentGame.alphaOpen);
    setUpSignupForm(".form-beta", BETA_FORM_ID, "Beta", currentGame.betaOpen);

    const formsSection = document.querySelector(".signup-forms");
    if (formsSection && !formsSection.querySelector(".signup-form")) {
        formsSection.remove();
    }
    if (!currentGame.steamAppId) {
        document.querySelector(".btn-steam").style.display = "none";
    }
}