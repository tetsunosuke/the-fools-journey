/**
 * PROJECT FOOL - DOM elements and UI controller functions
 */

import { gameState } from "./state.js";
import { SOUL_CARDS, TAROT_IMAGES } from "./constants.js";

// --- DOM Elements ---
export const sceneBgEl = document.getElementById("scene-bg");
export const loopCountEl = document.getElementById("loop-count");
export const currentArcanaEl = document.getElementById("current-arcana");
export const glitchOverlay = document.getElementById("glitch-overlay");
export const goldFlashOverlay = document.getElementById("gold-flash-overlay");
export const endingOverlay = document.getElementById("ending-overlay");
export const endingTitle = document.getElementById("ending-title");
export const endingDesc = document.getElementById("ending-desc");
export const restartBtn = document.getElementById("restart-btn");
export const stressGaugeEl = document.getElementById("stress-gauge");
export const luckGaugeEl = document.getElementById("luck-gauge");
export const psycheScanOverlay = document.getElementById("psyche-scan-overlay");
export const gameContainer = document.getElementById("game-container");
export const viewTalk = document.getElementById("view-talk");
export const viewChat = document.getElementById("view-chat");
export const viewCeltic = document.getElementById("view-celtic");
export const viewPuzzle = document.getElementById("view-puzzle");
export const talkPortraitEl = document.getElementById("talk-portrait");
export const talkSpeakerEl = document.getElementById("talk-speaker");
export const talkTextEl = document.getElementById("talk-text");
export const talkClickPrompt = document.getElementById("talk-click-prompt");
export const talkCardsContainer = document.getElementById("talk-cards-container");
export const chatHistoryEl = document.getElementById("chat-history");
export const chatInteractiveZoneEl = document.getElementById("chat-interactive-zone");
export const cardDrawOverlay = document.getElementById("card-draw-overlay");
export const cardDrawDeckContainer = document.getElementById("card-draw-deck-container");
export const celticSpeakerEl = document.getElementById("celtic-speaker");
export const celticTextEl = document.getElementById("celtic-text");
export const celticClickPrompt = document.getElementById("celtic-click-prompt");
export const puzzleSpeakerEl = document.getElementById("puzzle-speaker");
export const puzzleTextEl = document.getElementById("puzzle-text");
export const puzzleClickPrompt = document.getElementById("puzzle-click-prompt");
export const meditationContainer = document.getElementById("meditation-container");
export const drawMeditationBtn = document.getElementById("draw-meditation-btn");
export const meditationCardZone = document.getElementById("meditation-card-zone");
export const meditationDialogue = document.getElementById("meditation-dialogue");
export const meditationText = document.getElementById("meditation-text");
export const meditationMotifs = document.getElementById("meditation-motifs");
export const meditationMotifButtons = document.getElementById("meditation-motif-buttons");
export const resetMeditationBtn = document.getElementById("reset-meditation-btn");
export const startScreenEl = document.getElementById("start-screen");
export const startNewBtn = document.getElementById("start-new-btn");
export const startContinueBtn = document.getElementById("start-continue-btn");
export const startCardTrigger = document.getElementById("start-card-trigger");
export const startInfoZone = document.getElementById("start-info-zone");
export const showInstructionsBtn = document.getElementById("show-instructions-btn");
export const instructionsModal = document.getElementById("instructions-modal");
export const closeInstructionsBtn = document.getElementById("close-instructions-btn");
export const cardFocusModal = document.getElementById("card-focus-modal");
export const focusCardImg = document.getElementById("focus-card-img");
export const focusCardName = document.getElementById("focus-card-name");
export const focusCardDirection = document.getElementById("focus-card-direction");
export const focusCardDesc = document.getElementById("focus-card-desc");
export const focusCardTabs = document.getElementById("focus-card-tabs");
export const tabGameDesc = document.getElementById("tab-game-desc");
export const tabTrueDesc = document.getElementById("tab-true-desc");

// --- UI Operations ---

export function showView(viewName) {
    viewTalk.classList.add("hidden");
    viewChat.classList.add("hidden");
    viewCeltic.classList.add("hidden");
    viewPuzzle.classList.add("hidden");

    if (viewName === "talk") viewTalk.classList.remove("hidden");
    if (viewName === "chat") viewChat.classList.remove("hidden");
    if (viewName === "celtic") viewCeltic.classList.remove("hidden");
    if (viewName === "puzzle") viewPuzzle.classList.remove("hidden");

    gameState.currentView = viewName;
}

export function updateGauges(stressChange, luckChange) {
    if (gameState.currentLoop === 2) {
        stressGaugeEl.textContent = "ERR";
        luckGaugeEl.textContent = "NaN";
        return;
    }

    gameState.stressVal = Math.max(0, Math.min(100, gameState.stressVal + stressChange));
    gameState.luckVal = Math.max(0, Math.min(100, gameState.luckVal + luckChange));

    stressGaugeEl.textContent = `${gameState.stressVal}%`;
    luckGaugeEl.textContent = `${gameState.luckVal}%`;

    stressGaugeEl.classList.add("gauge-changing");
    luckGaugeEl.classList.add("gauge-changing");
    setTimeout(() => {
        stressGaugeEl.classList.remove("gauge-changing");
        luckGaugeEl.classList.remove("gauge-changing");
    }, 800);
}

export function updateBackgroundAndAesthetics() {
    if (gameState.currentLoop === 1) {
        if (gameState.currentStep === 0) {
            sceneBgEl.style.backgroundImage = "url('/images/city_street.png')";
        } else {
            sceneBgEl.style.backgroundImage = "url('/images/tarot_room.png')";
        }
        sceneBgEl.style.opacity = 0.35;
        talkPortraitEl.classList.remove("card-glitch-1", "card-glitch-2");
    } else if (gameState.currentLoop === 2) {
        sceneBgEl.style.backgroundImage = "url('/images/tarot_room.png')";
        sceneBgEl.style.opacity = 0.25;
        talkPortraitEl.classList.add("card-glitch-1");
        talkPortraitEl.classList.remove("card-glitch-2");
    } else {
        sceneBgEl.style.backgroundImage = "url('/images/glitch_matrix.png')";
        sceneBgEl.style.opacity = 0.55;
        talkPortraitEl.classList.add("card-glitch-2");
    }
}

export function changeBackground(bgName) {
    let url = "";
    if (bgName === "tarot_room") url = "/images/tarot_room.png";
    else if (bgName === "home_morning") url = "/images/home_morning.png";
    else if (bgName === "modern_office") url = "/images/modern_office.png";
    else if (bgName === "city_street") url = "/images/city_street.png";
    else if (bgName === "glitch_matrix") url = "/images/glitch_matrix.png";
    
    if (url) {
        sceneBgEl.style.backgroundImage = `url('${url}')`;
    }
}

export function updateSpeakerVisibility(speakerEl, textEl, speakerName) {
    speakerEl.textContent = speakerName;
    
    // dialogue-container-talk の背景色変更
    const container = speakerEl.closest(".dialogue-container-talk");
    if (container) {
        // すべての話者用クラスを一旦クリア
        container.classList.remove("speaker-player", "speaker-app", "speaker-sophia", "speaker-philo");
        
        if (speakerName === "プレイヤー") {
            container.classList.add("speaker-player");
        } else if (speakerName && speakerName.includes("アプリ")) {
            container.classList.add("speaker-app");
        } else if (speakerName === "ソフィア" || (speakerName && speakerName.includes("ソフィア"))) {
            container.classList.add("speaker-sophia");
        } else if (speakerName === "フィロ" || (speakerName && speakerName.includes("フィロ"))) {
            container.classList.add("speaker-philo");
        }
    }

    if (!speakerName || speakerName === "ナレーション") {
        speakerEl.classList.add("hidden");
        textEl.classList.add("narration-style");
    } else {
        speakerEl.classList.remove("hidden");
        textEl.classList.remove("narration-style");
    }
}

export function focusTarotCard(cardIdOrName, upright, imgUrl, forceHideTrueDesc = false) {
    let name = "";
    let imageSrc = "";
    let descText = "";
    
    if (typeof cardIdOrName === "number") {
        name = SOUL_CARDS[cardIdOrName] ? SOUL_CARDS[cardIdOrName].name : `カード #${cardIdOrName}`;
        imageSrc = imgUrl || TAROT_IMAGES[cardIdOrName] || "";
        descText = SOUL_CARDS[cardIdOrName] ? SOUL_CARDS[cardIdOrName].desc : "";
    } else {
        name = cardIdOrName || "";
        imageSrc = imgUrl || "";
    }
    
    focusCardName.textContent = name;

    if (focusCardDesc) {
        if (typeof cardIdOrName === "number" && SOUL_CARDS[cardIdOrName] && SOUL_CARDS[cardIdOrName].trueDesc && !forceHideTrueDesc) {
            const cardMeta = SOUL_CARDS[cardIdOrName];
            focusCardTabs.classList.remove("hidden");
            focusCardDesc.style.display = "block";
            
            // Set Game tab active handler
            tabGameDesc.onclick = (e) => {
                e.stopPropagation();
                tabGameDesc.style.background = "rgba(255,255,255,0.1)";
                tabGameDesc.style.border = "1px solid var(--color-gold)";
                tabGameDesc.style.color = "var(--color-gold)";
                tabTrueDesc.style.background = "transparent";
                tabTrueDesc.style.border = "1px solid rgba(255,255,255,0.2)";
                tabTrueDesc.style.color = "var(--color-text-light)";
                focusCardDesc.innerHTML = cardMeta.desc;
            };
            
            // Set True tab active handler
            tabTrueDesc.onclick = (e) => {
                e.stopPropagation();
                tabTrueDesc.style.background = "rgba(255,255,255,0.1)";
                tabTrueDesc.style.border = "1px solid var(--color-gold)";
                tabTrueDesc.style.color = "var(--color-gold)";
                tabGameDesc.style.background = "transparent";
                tabGameDesc.style.border = "1px solid rgba(255,255,255,0.2)";
                tabGameDesc.style.color = "var(--color-text-light)";
                focusCardDesc.innerHTML = `<strong>【本来の意味（ポジティブな側面）】</strong><br>${cardMeta.trueDesc}`;
            };
            
            // Default to Game description
            tabGameDesc.click();
        } else {
            focusCardTabs.classList.add("hidden");
            if (descText) {
                focusCardDesc.innerHTML = descText;
                focusCardDesc.style.display = "block";
            } else {
                focusCardDesc.innerHTML = "";
                focusCardDesc.style.display = "none";
            }
        }
    }

    // uprightが明示的にboolean値のときのみ正逆位置を表示（画像演出など非カード表示時は非表示）
    if (typeof upright === "boolean") {
        focusCardDirection.style.display = "";
        focusCardDirection.textContent = upright ? "正位置" : "逆位置";
        if (upright) {
            focusCardDirection.className = "focus-card-direction orientation-upright";
            focusCardImg.style.transform = "none";
        } else {
            focusCardDirection.className = "focus-card-direction orientation-reversed";
            focusCardImg.style.transform = "rotate(180deg)";
        }
    } else {
        // 純粋な画像表示（ソフィアのポートレートなど）は向きインジケーターを非表示
        focusCardDirection.style.display = "none";
        focusCardImg.style.transform = "none";
    }

    focusCardImg.style.backgroundImage = `url('${imageSrc}')`;
    cardFocusModal.classList.remove("hidden");
}

export function scrollToBottom() {
    if (chatHistoryEl && gameState.currentView === "chat") {
        chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
        // Dual scroll trigger to handle instant DOM sizing lag
        setTimeout(() => {
            chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
        }, 40);
    }
}
