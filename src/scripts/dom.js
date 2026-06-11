/**
 * PROJECT FOOL - DOM elements and UI controller functions
 */

import { gameState } from "./state.js";
import { SOUL_CARDS, TAROT_IMAGES, MEDITATION_MOTIFS } from "./constants.js";



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
export const viewThreeCard = document.getElementById("view-three-card");
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
export const threeCardSpeakerEl = document.getElementById("three-card-speaker");
export const threeCardTextEl = document.getElementById("three-card-text");
export const threeCardClickPrompt = document.getElementById("three-card-click-prompt");
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
export const exitMeditationBtn = document.getElementById("exit-meditation-btn");
export const startScreenEl = document.getElementById("start-screen");
export const startNewBtn = document.getElementById("start-new-btn");
export const startMeditationBtn = document.getElementById("start-meditation-btn");
export const constructionModal = document.getElementById("construction-modal");
export const closeConstructionBtn = document.getElementById("close-construction-btn");
export const startSlotsBtn = document.getElementById("start-slots-btn");
export const startChaptersBtn = document.getElementById("start-chapters-btn");
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
    viewThreeCard.classList.add("hidden");
    viewPuzzle.classList.add("hidden");

    if (viewName === "talk") viewTalk.classList.remove("hidden");
    if (viewName === "chat") viewChat.classList.remove("hidden");
    if (viewName === "threeCard" || viewName === "celtic") viewThreeCard.classList.remove("hidden");
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
    if (gameState.currentLoop === 2) {
        document.body.classList.add("loop-2");
    } else {
        document.body.classList.remove("loop-2");
    }

    const isEarlyStep = (gameState.currentLoop === 1 && gameState.currentStep === 0) || 
                        (gameState.currentLoop === 2 && gameState.currentStep < 3);

    if (isEarlyStep) {
        sceneBgEl.style.backgroundImage = "url('/images/city_street.png')";
    } else {
        if (gameState.currentLoop === 2 && gameState.currentStep >= 3) {
            sceneBgEl.style.backgroundImage = "url('/images/tarot_room_philo.png')";
        } else if (gameState.currentLoop === 1 || gameState.currentLoop === 2) {
            sceneBgEl.style.backgroundImage = "url('/images/tarot_room.png')";
        } else {
            sceneBgEl.style.backgroundImage = "url('/images/glitch_matrix.png')";
        }
    }

    if (gameState.currentLoop === 1) {
        sceneBgEl.style.opacity = 0.35;
        talkPortraitEl.classList.remove("card-glitch-1", "card-glitch-2");
    } else if (gameState.currentLoop === 2) {
        sceneBgEl.style.opacity = 0.25;
        talkPortraitEl.classList.add("card-glitch-1");
        talkPortraitEl.classList.remove("card-glitch-2");
    } else {
        sceneBgEl.style.opacity = 0.55;
        talkPortraitEl.classList.add("card-glitch-2");
    }
}

export function changeBackground(bgName) {
    let url = "";
    if (bgName === "tarot_room") url = "/images/tarot_room.png";
    else if (bgName === "tarot_room_philo") url = "/images/tarot_room_philo.png";
    else if (bgName === "home_morning") url = "/images/home_morning.png";
    else if (bgName === "home_night") url = "/images/home_night.png";
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

    const imageContainer = document.querySelector(".focus-card-image-container");
    if (imageContainer) {
        if (imageSrc && imageSrc.includes("compare")) {
            imageContainer.classList.add("is-compare");
        } else {
            imageContainer.classList.remove("is-compare");
        }
    }

    if (focusCardDesc) {
        if (typeof cardIdOrName === "number" && SOUL_CARDS[cardIdOrName] && SOUL_CARDS[cardIdOrName].trueDesc && !forceHideTrueDesc && (gameState.currentLoop === 2 || gameState.trueEndCleared)) {
            const cardMeta = SOUL_CARDS[cardIdOrName];
            // 2周目以降で両方の解釈がある場合はタブを表示して切り替え可能にする
            if (focusCardTabs) {
                focusCardTabs.classList.remove("hidden");
                // デフォルトは「本来の意味」タブをアクティブにする（2周目のため）
                const tabGame = document.getElementById("tab-game-desc");
                const tabTrue = document.getElementById("tab-true-desc");
                if (tabGame && tabTrue) {
                    tabGame.classList.remove("active");
                    tabTrue.classList.add("active");
                }
            }
            focusCardDesc.dataset.desc = descText;
            focusCardDesc.dataset.trueDesc = cardMeta.trueDesc;
            focusCardDesc.innerHTML = `<strong>【本来の意味】</strong><br>${cardMeta.trueDesc}`;
            focusCardDesc.style.display = "block";
        } else {
            if (focusCardTabs) focusCardTabs.classList.add("hidden");
            // 1周目の場合、もしくは trueDesc がない場合は通常の desc のみ表示
            let contentText = descText;
            // 2周目で trueDesc はあるがタブを出さない（forceHideTrueDesc）場合は本来の意味を表示
            if (typeof cardIdOrName === "number" && SOUL_CARDS[cardIdOrName] && SOUL_CARDS[cardIdOrName].trueDesc && forceHideTrueDesc) {
                contentText = `<strong>【本来の意味】</strong><br>${SOUL_CARDS[cardIdOrName].trueDesc}`;
            }
            
            if (contentText) {
                focusCardDesc.innerHTML = contentText;
                focusCardDesc.style.display = "block";
            } else {
                focusCardDesc.innerHTML = "";
                focusCardDesc.style.display = "none";
            }
        }
    }

    // --- 注目モチーフの表示セクションとズーム・ハイライト制御の初期化 ---
    const motifsSection = document.getElementById("focus-card-motifs-section");
    const motifButtonsContainer = document.getElementById("focus-card-motif-buttons");
    const motifExplanation = document.getElementById("focus-card-motif-explanation");
    const highlightBox = document.getElementById("focus-card-highlight-box");

    if (highlightBox) {
        highlightBox.classList.add("hidden");
        highlightBox.style.top = "0";
        highlightBox.style.left = "0";
        highlightBox.style.width = "0";
        highlightBox.style.height = "0";
    }
    if (motifsSection) motifsSection.classList.add("hidden");

    if (typeof cardIdOrName === "number" && MEDITATION_MOTIFS[cardIdOrName] && (gameState.currentLoop === 2 || gameState.trueEndCleared)) {
        const motifData = MEDITATION_MOTIFS[cardIdOrName];
        if (motifsSection && motifButtonsContainer && motifExplanation) {
            motifsSection.classList.remove("hidden");
            motifButtonsContainer.innerHTML = "";
            motifExplanation.classList.add("hidden");
            motifExplanation.textContent = "";

            motifData.motifs.forEach((motif) => {
                const btn = document.createElement("button");
                btn.className = "focus-motif-btn";
                btn.textContent = motif.name;

                btn.addEventListener("click", (e) => {
                    e.stopPropagation(); // モーダルを閉じない
                    if (window.gameAudio) window.gameAudio.playSE("click");

                    const activeBtn = motifButtonsContainer.querySelector(".focus-motif-btn.active");
                    if (activeBtn) {
                        activeBtn.classList.remove("active");
                        if (activeBtn === btn) {
                            focusCardImg.style.transform = (typeof upright === "boolean" && !upright) ? "rotate(180deg) scale(1)" : "scale(1)";
                            if (highlightBox) highlightBox.classList.add("hidden");
                            motifExplanation.classList.add("hidden");
                            return;
                        }
                    }
                    btn.classList.add("active");

                    motifExplanation.textContent = motif.text;
                    motifExplanation.classList.remove("hidden");

                    if (motif.rect) {
                        if (highlightBox) {
                            highlightBox.style.top = motif.rect.top;
                            highlightBox.style.left = motif.rect.left;
                            highlightBox.style.width = motif.rect.width;
                            highlightBox.style.height = motif.rect.height;
                            highlightBox.classList.remove("hidden");
                        }

                        const leftPercent = parseFloat(motif.rect.left);
                        const topPercent = parseFloat(motif.rect.top);
                        const widthPercent = parseFloat(motif.rect.width);
                        const heightPercent = parseFloat(motif.rect.height);

                        const centerX = leftPercent + widthPercent / 2;
                        const centerY = topPercent + heightPercent / 2;

                        const transX = (50 - centerX) * 1.5;
                        const transY = (50 - centerY) * 1.5;

                        let transformStr = `scale(1.8) translate(${transX}%, ${transY}%)`;
                        if (typeof upright === "boolean" && !upright) {
                            transformStr = `rotate(180deg) scale(1.8) translate(${-transX}%, ${-transY}%)`;
                        }
                        focusCardImg.style.transform = transformStr;
                    } else {
                        focusCardImg.style.transform = (typeof upright === "boolean" && !upright) ? "rotate(180deg) scale(1.3)" : "scale(1.3)";
                        if (highlightBox) highlightBox.classList.add("hidden");
                    }
                });

                motifButtonsContainer.appendChild(btn);
            });
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
    if (window.gameAudio) {
        window.gameAudio.playSE("cardFlip");
    }

    if (gameState.isSkipActive) {
        setTimeout(() => {
            if (cardFocusModal && !cardFocusModal.classList.contains("hidden")) {
                cardFocusModal.click();
            }
        }, 500);
    }
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
