// Global state to store games once fetched
let allGames = [];

const gameGrid = document.getElementById('gameGrid');
const searchBar = document.getElementById('searchBar');
const modal = document.getElementById('playerModal');
const gameFrame = document.getElementById('gameFrame');

// Fetch and initialize games
async function init() {
    try {
        const response = await fetch('games.json');
        allGames = await response.json();
        renderGames(allGames);
    } catch (err) {
        console.error("Could not load games:", err);
        gameGrid.innerHTML = "<p>Failed to load games. Ensure games.json exists.</p>";
    }
}

// Create the HTML for each game card
function renderGames(games) {
    gameGrid.innerHTML = '';
    
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}" loading="lazy">
            <h3>${game.title}</h3>
        `;
        card.onclick = () => openGame(game.url);
        gameGrid.appendChild(card);
    });
}

// Search filter
searchBar.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allGames.filter(game => 
        game.title.toLowerCase().includes(query)
    );
    renderGames(filtered);
});

// Modal Logic
function openGame(url) {
    gameFrame.src = url;
    modal.style.display = 'flex';
}

function closeGame() {
    modal.style.display = 'none';
    gameFrame.src = ''; // Clear source to stop audio/processing
}

// Close modal if user clicks outside the game window
window.onclick = (event) => {
    if (event.target === modal) closeGame();
};

init();