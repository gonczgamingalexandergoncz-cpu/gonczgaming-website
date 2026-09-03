const donateContainer = document.getElementById("donate-buttons");

if (donateContainer) {
    const general = document.createElement("a");
    general.className = "btn btn-donate";
    general.href = KOFI_BASE_URL;
    general.target = "_blank";
    general.rel = "noopener";
    general.textContent = "Support the studio";
    donateContainer.appendChild(general);
}

const donateGameList = document.getElementById("donate-game-list");

if (donateGameList) {
    games
        .filter(game => game.active)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .forEach(game => {
            const item = document.createElement("li");
            item.textContent = game.name;
            donateGameList.appendChild(item);
        });
}
