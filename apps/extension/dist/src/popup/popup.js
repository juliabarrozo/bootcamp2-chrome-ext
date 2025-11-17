// Aguardar DOM carregar completamente ANTES de fazer qualquer coisa
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTimer);
} else {
    initializeTimer();
}

// Variáveis globais
let currentTime = 25 * 60;
let isRunning = false;
let isPaused = false;
let timerInterval = null;
let elements = {};

// Função principal de inicialização
function initializeTimer() {
    elements = {
        timeDisplay: document.getElementById('timeDisplay'),
        statusText: document.getElementById('statusText'),
        startBtn: document.getElementById('startBtn'),
        pauseBtn: document.getElementById('pauseBtn'),
        resetBtn: document.getElementById('resetBtn'),
        workTimeInput: document.getElementById('workTime'),
        breakTimeInput: document.getElementById('breakTime')
    };

    if (!elements.timeDisplay || !elements.startBtn) {
        setTimeout(initializeTimer, 100);
        return;
    }

    elements.startBtn.addEventListener('click', startTimer);
    elements.pauseBtn.addEventListener('click', pauseTimer);
    elements.resetBtn.addEventListener('click', resetTimer);
    elements.workTimeInput.addEventListener('change', updateWorkTime);

    updateDisplay();
    updateButtons();
    updateStatus();
}

// Inicia o cronômetro
function startTimer() {
    if (!isPaused) {
        currentTime = parseInt(elements.workTimeInput.value) * 60;
    }

    isRunning = true;
    isPaused = false;

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (currentTime > 0) {
            currentTime--;
            updateDisplay();
        } else {
            timerComplete();
        }
    }, 1000);

    updateButtons();
    updateStatus();
}

// Pausa o cronômetro
function pauseTimer() {
    isRunning = false;
    isPaused = true;

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    updateButtons();
    updateStatus();
}

// Reseta o cronômetro
function resetTimer() {
    isRunning = false;
    isPaused = false;
    currentTime = parseInt(elements.workTimeInput.value) * 60;

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    updateDisplay();
    updateButtons();
    updateStatus();
}

// Função chamada quando o timer termina
async function timerComplete() {
    isRunning = false;
    isPaused = false;

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    if (elements.statusText) {
        elements.statusText.textContent = '🎉 Completado!';
    }

    updateButtons();

    // Mostra Pokémon ao finalizar
    await showRandomPokemon();

    // Reset automático após 3 segundos
    setTimeout(() => {
        currentTime = parseInt(elements.workTimeInput.value) * 60;
        updateDisplay();
        updateStatus();
    }, 3000);
}

// Função que busca um Pokémon da API e mostra
async function showRandomPokemon() {
    try {
        const res = await fetch("http://localhost:3001/capture", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) throw new Error("Erro ao capturar Pokémon");

        const data = await res.json();

        let container = document.getElementById("pokemon-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "pokemon-container";
            container.style.textAlign = "center";
            container.style.marginTop = "10px";
            document.body.appendChild(container);
        }

        container.innerHTML = `
            <h3>${data.name.toUpperCase()}</h3>
            <img src="${data.sprites.front_default}" alt="${data.name}" />
        `;
    } catch (err) {
        console.error(err);
    }
}

// Atualiza tempo do cronômetro
function updateWorkTime() {
    if (!isRunning && !isPaused) {
        currentTime = parseInt(elements.workTimeInput.value) * 60;
        updateDisplay();
    }
}

// Atualiza display do cronômetro
function updateDisplay() {
    if (!elements.timeDisplay) return;

    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

    elements.timeDisplay.textContent = timeString;
}

// Atualiza botões
function updateButtons() {
    if (!elements.startBtn || !elements.pauseBtn || !elements.resetBtn) return;

    if (isRunning) {
        elements.startBtn.disabled = true;
        elements.pauseBtn.disabled = false;
        elements.resetBtn.disabled = false;
    } else {
        elements.startBtn.disabled = false;
        elements.pauseBtn.disabled = true;
        elements.resetBtn.disabled = !isPaused;
    }
}

// Atualiza status
function updateStatus() {
    if (!elements.statusText) return;

    if (isRunning) {
        elements.statusText.textContent = "🔥 Focando...";
    } else if (isPaused) {
        elements.statusText.textContent = "⏸️ Pausado";
    } else {
        elements.statusText.textContent = "Pronto para começar";
    }
}

console.log("Script popup.js carregado!");
