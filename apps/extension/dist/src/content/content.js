// Content Script - Focus Timer
console.log('Focus Timer: Content script carregado');

// Elemento do indicador
let focusIndicator = null;

// Estado do timer
let currentTimerState = {
    isRunning: false,
    currentTime: 0,
    mode: 'work'
};

// Inicializar quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Função de inicialização
async function init() {
    try {
        const response = await chrome.runtime.sendMessage({ action: 'getTimerState' });
        if (response && response.isRunning) {
            currentTimerState = response;
            showFocusIndicator();
        }
    } catch (error) {
        console.log('Focus Timer: Background script não disponível ainda');
    }
}

// Listener para mensagens do background script
chrome.runtime.onMessage.addListener((message) => {
    switch (message.action) {
        case 'timerUpdate':
            currentTimerState.currentTime = message.currentTime;
            updateIndicator();
            break;
            
        case 'timerComplete':
            hideFocusIndicator();
            showCompletionMessage();
            sendCaptureRequest(); // Chama a API
            break;
    }
});

// Função para capturar Pokémon via API
function sendCaptureRequest() {
    const randomPokemonId = Math.floor(Math.random() * 151) + 1; // Pokémon aleatório de 1 a 151

    fetch("http://localhost:3000/capture", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ pokemonId: randomPokemonId }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Pokémon capturado! Nome: ${data.name}, ID: ${data.id}`);
    })
    .catch(err => {
        console.error("Erro ao capturar Pokémon:", err);
    });
}
