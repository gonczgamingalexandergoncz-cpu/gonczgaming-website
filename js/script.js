const gridContainer = document.getElementById("games-grid");

const activeGames = games.filter(game => game.active);
activeGames.sort((a, b) => a.sortOrder - b.sortOrder);

activeGames.forEach(game => {
    const card = document.createElement("a");
    card.className = "game-card";
    card.href = `games/${game.slug}.html`;
    card.innerHTML = `
        <div class="card-image-placeholder"></div>
        <h2>${game.name}</h2>
    `;
    gridContainer.appendChild(card);
});