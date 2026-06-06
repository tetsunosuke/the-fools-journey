import { gameState, discoverCard } from "./state.js";
import { SOUL_CARDS, TAROT_IMAGES } from "./constants.js";
import { focusTarotCard } from "./dom.js";

// DOM Elements
let appBubble = null;
let appModal = null;
let closeAppBtn = null;
let appTabCollection = null;
let appTabVital = null;
let appPanelCollection = null;
let appPanelVital = null;
let appCollectionGrid = null;
let vitalBarStress = null;
let vitalBarLuck = null;
let vitalTextStress = null;
let vitalTextLuck = null;
let vitalConsoleLog = null;
let appTime = null;

let isAppInitialized = false;
let consoleInterval = null;

export function initAppView() {
    if (isAppInitialized) return;

    // Cache elements
    appBubble = document.getElementById("app-notification-bar");
    appModal = document.getElementById("app-device-modal");
    closeAppBtn = document.getElementById("close-app-btn");
    appTabCollection = document.getElementById("app-tab-collection");
    appTabVital = document.getElementById("app-tab-vital");
    appPanelCollection = document.getElementById("app-panel-collection");
    appPanelVital = document.getElementById("app-panel-vital");
    appCollectionGrid = document.getElementById("app-collection-grid");
    vitalBarStress = document.getElementById("vital-bar-stress");
    vitalBarLuck = document.getElementById("vital-bar-luck");
    vitalTextStress = document.getElementById("vital-text-stress");
    vitalTextLuck = document.getElementById("vital-text-luck");
    vitalConsoleLog = document.getElementById("vital-console-log");
    appTime = document.querySelector(".app-status-time");

    if (!appBubble || !appModal) return;

    // Event Listeners
    appBubble.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleAppView();
    });

    const triggerBtn = document.getElementById("app-bar-trigger");
    if (triggerBtn) {
        triggerBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleAppView();
        });
    }

    closeAppBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleAppView(true);
    });

    document.getElementById("app-device-overlay").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleAppView(true);
    });

    // Tab Switch
    const tabBtns = [appTabCollection, appTabVital];
    tabBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const tabName = btn.getAttribute("data-tab");
                switchTab(tabName);
            });
        }
    });

    // Time Updater
    updateTime();
    setInterval(updateTime, 60000);

    isAppInitialized = true;
}

function updateTime() {
    if (!appTime) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    appTime.textContent = `${hh}:${mm}`;
}

export function toggleAppView(forceClose = false) {
    if (!appModal) return;

    const isOpen = !appModal.classList.contains("hidden");
    if (isOpen || forceClose) {
        appModal.classList.add("hidden");
        gameState.isAppViewOpen = false;
        clearInterval(consoleInterval);
    } else {
        appModal.classList.remove("hidden");
        gameState.isAppViewOpen = true;
        updateAppView();
        switchTab("collection"); // デフォルトタブ
    }
}

function switchTab(tabName) {
    if (!appTabCollection || !appTabVital) return;
    
    if (tabName === "collection") {
        appTabCollection.classList.add("active");
        appTabVital.classList.remove("active");
        appPanelCollection.classList.add("active");
        appPanelVital.classList.remove("active");
        renderCollectionGrid();
    } else if (tabName === "vital") {
        appTabCollection.classList.remove("active");
        appTabVital.classList.add("active");
        appPanelCollection.classList.remove("active");
        appPanelVital.classList.add("active");
        renderVitalData();
    }
}

export function updateAppView() {
    // 起動バーの表示非表示制御（Step 4 以降で表示）
    const bar = document.getElementById("app-notification-bar");
    if (bar) {
        if (gameState.currentStep >= 4 || gameState.currentLoop >= 2) {
            bar.classList.remove("hidden");
        } else {
            bar.classList.add("hidden");
        }
    }
}


function renderCollectionGrid() {
    if (!appCollectionGrid) return;
    appCollectionGrid.innerHTML = "";

    // 0〜21枚の大アルカナ図鑑の描画
    for (let i = 0; i <= 21; i++) {
        const cardItem = document.createElement("div");
        const isDiscovered = gameState.discoveredCards.has(i);

        if (isDiscovered) {
            cardItem.className = "app-card-item";
            cardItem.innerHTML = `
                <div class="app-card-image" style="background-image: url('${TAROT_IMAGES[i]}');"></div>
                <div class="app-card-label">${SOUL_CARDS[i] ? SOUL_CARDS[i].name.split(" : ")[1] || SOUL_CARDS[i].name : "CARD"}</div>
            `;
            // クリックで詳細モーダル表示
            cardItem.addEventListener("click", (e) => {
                e.stopPropagation();
                // 1周目の場合は「本来の意味」を非表示にする
                focusTarotCard(i, true, TAROT_IMAGES[i], gameState.currentLoop === 1);
            });
        } else {
            cardItem.className = "app-card-item locked";
        }
        appCollectionGrid.appendChild(cardItem);
    }
}

function renderVitalData() {
    if (!vitalBarStress || !vitalBarLuck) return;

    // 現在のストレス・LUCKを反映
    const stress = gameState.stressVal;
    const luck = gameState.luckVal;

    // 2周目はERR, NaN
    if (gameState.currentLoop === 2) {
        vitalBarStress.style.width = "100%";
        vitalBarLuck.style.width = "0%";
        vitalTextStress.textContent = "ERR";
        vitalTextStress.style.color = "#ef4444";
        vitalTextLuck.textContent = "NaN";
        vitalTextLuck.style.color = "var(--color-gold)";
    } else {
        vitalBarStress.style.width = `${stress}%`;
        vitalBarLuck.style.width = `${luck}%`;
        vitalTextStress.textContent = `${stress}%`;
        vitalTextStress.style.color = "";
        vitalTextLuck.textContent = `${luck}%`;
        vitalTextLuck.style.color = "";
    }

    // ログのタイピング開始
    startConsoleOutput();
}

function startConsoleOutput() {
    if (!vitalConsoleLog) return;
    clearInterval(consoleInterval);
    vitalConsoleLog.innerHTML = "";
    vitalConsoleLog.classList.remove("warning-mode");

    const logs = [];

    if (gameState.currentLoop === 2) {
        // 2周目はバグログ
        vitalConsoleLog.classList.add("warning-mode");
        logs.push(
            ">> SYSTEM DECRYPTION MALFUNCTION",
            ">> ACCESS DENIED BY PHILO_GATE",
            ">> ERROR: HEART_RATE (NaN bpm)",
            ">> ERROR: BRAIN_WAVE (OUT_OF_RANGE)",
            ">> FATAL: SOUL_ALIGNMENT_BROKEN",
            ">> WARNING: AUTONOMOUS_WILL_DETECTED",
            ">> CRITICAL: DESTINY_CONTROL_FAILURE",
            ">> REBOOTING SOUL MATRIX..."
        );
    } else {
        // 1周目
        const stress = gameState.stressVal;
        const hr = 60 + Math.floor(stress * 0.4) + Math.floor(Math.random() * 10);
        
        logs.push(
            ">> CONNECTED TO TARGET_SOUL_ID: 1009",
            `>> BIOMETRICS: HEART_RATE (${hr} bpm)`,
            stress > 80 ? ">> WARNING: STRESS LEVEL DANGEROUS" : ">> STRESS INDEX: WITHIN_PLAN_BOUNDS",
            ">> BRAIN_WAVE: SYNCHRONIZED_WITH_CARDS",
            gameState.currentStep >= 14 ? ">> SYSTEM INTRUSION: 95% COMPLETE" : ">> OPTIMIZING SOUL COMPLIANCE...",
            gameState.currentStep >= 14 ? ">> WARNING: THOUGHT_ROUTINE_DEPRECATED" : ">> CRITICAL_THINKS: STABLE",
            ">> ALIGNMENT: SOFIA_DESTINY_LOADED",
            ">> status: ACTIVE_AND_DEPENDENT"
        );
    }

    let lineIdx = 0;
    function printLine() {
        if (lineIdx < logs.length) {
            vitalConsoleLog.innerHTML += logs[lineIdx] + "\n";
            vitalConsoleLog.scrollTop = vitalConsoleLog.scrollHeight;
            lineIdx++;
            consoleInterval = setTimeout(printLine, 400 + Math.random() * 300);
        }
    }
    printLine();
}
