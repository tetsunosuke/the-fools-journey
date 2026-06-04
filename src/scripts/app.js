/**
 * PROJECT FOOL - Rebuilt Game Engine with Multi-Scene UI & Chatbot Mechanics
 */

import { gameState, loadSaveState, saveState, discoverCard } from "./state.js";
import { SOUL_CARDS, THREE_CARDS_DATA, TAROT_IMAGES } from "./constants.js";
import {
    showView, updateGauges, updateBackgroundAndAesthetics, changeBackground,
    updateSpeakerVisibility, focusTarotCard, scrollToBottom,
    sceneBgEl, loopCountEl, currentArcanaEl, glitchOverlay, goldFlashOverlay,
    endingOverlay, endingTitle, endingDesc, restartBtn, stressGaugeEl, luckGaugeEl,
    psycheScanOverlay, gameContainer, viewTalk, viewChat, viewCeltic, viewPuzzle,
    talkPortraitEl, talkSpeakerEl, talkTextEl, talkClickPrompt, talkCardsContainer,
    chatHistoryEl, chatInteractiveZoneEl, cardDrawOverlay, cardDrawDeckContainer,
    celticSpeakerEl, celticTextEl, celticClickPrompt, puzzleSpeakerEl, puzzleTextEl,
    puzzleClickPrompt, meditationContainer, drawMeditationBtn, meditationCardZone,
    meditationDialogue, meditationText, meditationMotifs, meditationMotifButtons,
    resetMeditationBtn, startScreenEl, startNewBtn, startContinueBtn, showInstructionsBtn,
    instructionsModal, closeInstructionsBtn, cardFocusModal, focusCardImg, focusCardName,
    focusCardDirection, focusCardDesc, focusCardTabs, tabGameDesc, tabTrueDesc
} from "./dom.js";
import { parseMarkdown, getSubHtml, typeDialogueText, autoSplitTextIntoPages, processPageTags } from "./utils.js";
import { createCardElement } from "./cards.js";
import {
    renderSoulCardForm, showSoulCardResult, highlightSlotGuide, switchToCelticCrossView,
    renderCelticCross, startAutomaticCelticSpread, drawNextCelticCardInline, completeCelticSpread,
    showCelticCrossContract, renderMotifSelection, triggerPsycheScan, renderSymbolicDragPuzzle,
    setupStoneDrag, handlePuzzleChoice, loadMetaStarStep, setupCardDrag, triggerFateBrokenByDrag,
    triggerTrueEndingUnlock, showTrueEndingOverlay, initMeditationMode, drawMeditationCard, selectMeditationMotif
} from "./puzzle.js";

// --- Multi-Scene Game Scenario (with View flags) ---
export const SCENARIO = window.SCENARIO_DATA || { 1: [], 2: [] };

// --- Initialization ---
export function initGame(skipLoad = false) {
    if (!skipLoad) loadSaveState();

    if (gameState.trueEndCleared) {
        initMeditationMode();
        return;
    }

    gameState.isCardRevealed = false;
    gameState.isFateControlled = true;
    gameState.selectedOptionDesc = "";
    
    // UI resets
    endingOverlay.classList.add("hidden");
    glitchOverlay.classList.remove("glitch-active");
    meditationContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");

    // Restore gauge states
    if (gameState.currentLoop === 2) {
        stressGaugeEl.textContent = "ERR";
        luckGaugeEl.textContent = "NaN";
    } else {
        stressGaugeEl.textContent = `${gameState.stressVal}%`;
        luckGaugeEl.textContent = `${gameState.luckVal}%`;
    }

    // Restore background & setup starting views
    updateBackgroundAndAesthetics();
    loadStep();
}

// --- Load Single Story/View Step ---
export function loadStep() {
    saveState();
    
    loopCountEl.textContent = gameState.currentLoop;
    const stepData = SCENARIO[gameState.currentLoop][gameState.currentStep];
    
    if (!stepData) {
        console.error(`Step not found! Loop: ${gameState.currentLoop}, Step: ${gameState.currentStep}`);
        return;
    }

    // 日付が変わるタイミング（日目）を検知してデイリー・トランジションを再生
    // 先頭の [bg:...] タグ等を許容しつつ、その直後の「（X日目」や「―― X日目」から日数を抽出する
    const dayMatch = stepData.text ? stepData.text.match(/^(?:\[[^\]]+\]\s*)*[（――\s]*(\d+)日目/) : null;
    if (dayMatch) {
        const dayNum = dayMatch[1];
        showDayTransition(dayNum, () => {
            executeLoadStep(stepData);
        });
    } else {
        executeLoadStep(stepData);
    }
}

// --- Day Transition eye-catch animation ---
export function showDayTransition(dayNum, onComplete) {
    let dayOverlay = document.getElementById("day-transition-overlay");
    if (!dayOverlay) {
        dayOverlay = document.createElement("div");
        dayOverlay.id = "day-transition-overlay";
        dayOverlay.className = "day-transition-overlay";
        dayOverlay.innerHTML = `
            <div class="day-transition-content">
                <div class="day-num-text" id="day-overlay-text"></div>
                <div class="day-sub-text" id="day-overlay-sub"></div>
            </div>
        `;
        document.getElementById("game-wrapper").appendChild(dayOverlay);
    }
    
    document.getElementById("day-overlay-text").textContent = `― ${dayNum}日目 ―`;
    document.getElementById("day-overlay-sub").textContent = "THE TAROT JOURNEY";

    dayOverlay.style.opacity = "0";
    dayOverlay.style.display = "flex";
    
    requestAnimationFrame(() => { dayOverlay.style.opacity = "1"; });
    setTimeout(() => {
        dayOverlay.style.opacity = "0";
        setTimeout(() => {
            dayOverlay.style.display = "none";
            onComplete();
        }, 600);
    }, 1800);
}

// --- 誤選択時の囁き演出 ---
export function showWrongChoiceWhisper() {
    const whisperMessages = [
        "……それは本当に、あなた自身の選択ですか？",
        "……カードは、別の道を示していましたよ。",
        "……ふふ。でも、大丈夫。どんな道も、最後は同じ場所へ辿り着くの。",
        "……迷子の魂ほど、面白い旅をするものよ。",
    ];
    const msg = whisperMessages[Math.floor(Math.random() * whisperMessages.length)];
    
    let whisper = document.getElementById("sophia-whisper-overlay");
    if (!whisper) {
        whisper = document.createElement("div");
        whisper.id = "sophia-whisper-overlay";
        whisper.style.cssText = [
            "position:fixed", "top:0", "left:0", "right:0",
            "z-index:8888", "pointer-events:none",
            "display:flex", "justify-content:center", "padding:24px 16px",
            "opacity:0", "transform:translateY(-12px)",
            "transition:opacity 0.5s ease, transform 0.5s ease"
        ].join(";");
        document.body.appendChild(whisper);
    }
    
    whisper.innerHTML = `
        <div style="
            background: rgba(10,8,20,0.85);
            border: 1px solid rgba(201,168,76,0.3);
            border-radius: 8px;
            padding: 12px 20px;
            max-width: 480px;
            text-align: center;
            backdrop-filter: blur(8px);
        ">
            <div style="font-size:0.65rem; color:rgba(201,168,76,0.6); letter-spacing:0.15em; margin-bottom:6px;">― ソフィアの声 ―</div>
            <div style="font-size:0.85rem; color:rgba(220,210,255,0.85); font-style:italic; line-height:1.6;">${msg}</div>
        </div>
    `;
    
    // フェードイン
    requestAnimationFrame(() => {
        whisper.style.opacity = "1";
        whisper.style.transform = "translateY(0)";
    });
    
    // 3.5秒後にフェードアウト
    setTimeout(() => {
        whisper.style.opacity = "0";
        whisper.style.transform = "translateY(-8px)";
    }, 3500);
}

export function executeLoadStep(stepData) {
    currentArcanaEl.textContent = stepData.arcana;
    
    // ケルト十字 (Step 11) の開始時は、セリフ表示と演出を分けるため、まずは Talkビューとして表示する
    let viewToLoad = stepData.view;
    if (viewToLoad === "chat") {
        viewToLoad = "talk"; // チャット画面は廃止し、会話・ナレーション画面に統一
    }
    if (gameState.currentLoop === 1 && gameState.currentStep === 13) {
        viewToLoad = "talk";
    }
    showView(viewToLoad);

    // Apply gauge changes
    if (stepData.stressChange !== 0 || stepData.luckChange !== 0) {
        updateGauges(stepData.stressChange, stepData.luckChange);
    }

    if (gameState.currentView === "talk") {
        talkClickPrompt.classList.add("hidden");
        talkCardsContainer.innerHTML = ""; // Clear choices during typing

        // ポートレートエリアは常に非表示（ソフィアの登場はfocusポップアップで表現）
        talkPortraitEl.style.backgroundImage = "none";
        talkPortraitEl.style.opacity = "0";
        document.querySelector(".visual-area-talk").style.display = "none";

        gameState.activeDialogueSpeaker = stepData.speaker;
        updateSpeakerVisibility(talkSpeakerEl, talkTextEl, gameState.activeDialogueSpeaker);

        // テキストを改ページ(\n\n)で分割し、さらに長い段落を自動分割
        const rawPages = stepData.text.split(/\r?\n\s*\r?\n/).map(p => p.trim()).filter(p => p.length > 0);
        gameState.currentDialoguePages = rawPages.flatMap(page => {
            // [focus:...]タグは分割しない
            if (/^\[focus:/.test(page)) return [page];
            return autoSplitTextIntoPages(page);
        });
        console.log("Parsed dialogue pages:", gameState.currentDialoguePages);
        gameState.currentDialoguePageIndex = 0;
        
        showNextDialoguePage(stepData);
    } 
    else if (gameState.currentView === "chat") {
        chatInteractiveZoneEl.innerHTML = "";
        
        // 2周目 Step12 でのみ、チャット欄にモチーフボタンを直接表示して進行
        if (gameState.currentLoop === 2 && gameState.currentStep === 12) {
            pushChatMessage("The Journey", stepData.text, false, null, () => {
                renderMotifSelection(12);
            });
            return;
        }

        // ポップアップ画像の自動遷移をフックするためのダミーコールバック
        const triggerNextPage = () => {
            // もし選択肢（cards）があれば表示、無ければ「トークを進める」ボタンを配置して進行
            if (stepData.cards && stepData.cards.length > 0) {
                renderChoiceCards(stepData.cards, chatInteractiveZoneEl, true);
            } else {
                chatInteractiveZoneEl.innerHTML = `<button class="action-btn" id="chat-next-btn">トークを進める</button>`;
                document.getElementById("chat-next-btn").addEventListener("click", advanceGame);
            }
        };

        const pages = stepData.text.split(/\r?\n\s*\r?\n/).map(p => p.trim()).filter(p => p.length > 0);
        let appStarted = false; // アプリ（カードやチャット）が本格起動したかどうかのフラグ
        
        const showNextChatPage = (idx, currentSpeaker) => {
            if (idx >= pages.length) {
                triggerNextPage();
                return;
            }
            
            const nextCallback = () => {
                showNextChatPage(idx + 1, parsedResult.speaker);
            };
            
            const parsedResult = processPageTags(pages[idx], currentSpeaker, nextCallback);
            
            if (parsedResult.handled) {
                appStarted = true; // カード等のアクションが発生したためアプリ起動
                return; // Wait for modal action
            }
            
            if (parsedResult.skip || !parsedResult.text) {
                showNextChatPage(idx + 1, parsedResult.speaker);
                return;
            }
            
            const isNarrative = parsedResult.speaker === "ナレーション" || 
                                parsedResult.speaker === "" ||
                                parsedResult.text.startsWith("（");

            if (!isNarrative) {
                appStarted = true; // アプリやプレイヤーの発言が開始されたためアプリ起動
            }

            if (isNarrative && !appStarted) {
                // アプリ起動前のナレーションは talk ビューで表示
                showView("talk");
                updateSpeakerVisibility(talkSpeakerEl, talkTextEl, "");
                talkClickPrompt.classList.add("hidden");

                typeDialogueText(parsedResult.text, talkTextEl, () => {
                    talkClickPrompt.classList.remove("hidden");
                    const nextHandler = (e) => {
                        if (e) e.stopPropagation();
                        talkClickPrompt.onclick = null;
                        talkTextEl.parentElement.onclick = null;
                        gameState.advanceChatPage = null;
                        nextCallback();
                    };
                    talkClickPrompt.onclick = nextHandler;
                    talkTextEl.parentElement.onclick = nextHandler;
                    gameState.advanceChatPage = nextHandler;
                });
            } else {
                // アプリ起動後は chat ビューで表示
                showView("chat");
                
                let isSelf = false;
                if (parsedResult.speaker === "プレイヤー") {
                    isSelf = true;
                } else if (isNarrative) {
                    isSelf = "system"; // アプリ起動後のナレーションはシステムログ風
                }
                
                pushChatMessage(parsedResult.speaker, parsedResult.text, isSelf, null, () => {
                    const nextHandler = (e) => {
                        if (e) e.stopPropagation();
                        gameState.advanceChatPage = null;
                        chatInteractiveZoneEl.innerHTML = "";
                        nextCallback();
                    };
                    gameState.advanceChatPage = nextHandler;
                    
                    const isLastPage = idx === pages.length - 1;
                    if (isLastPage && stepData.cards && stepData.cards.length > 0) {
                        gameState.advanceChatPage = null;
                        triggerNextPage();
                    } else {
                        chatInteractiveZoneEl.innerHTML = `<button class="action-btn" id="chat-click-to-advance">タップして進む</button>`;
                        document.getElementById("chat-click-to-advance").addEventListener("click", nextHandler);
                    }
                });
            }
        };
        
        showNextChatPage(0, "The Journey");
    }
    else if (gameState.currentView === "celtic") {
        if (gameState.currentLoop === 1 && gameState.currentStep === 13) {
            // 盤面を描画し、本契約UIを表示
            renderCelticCross();
            showCelticCrossContract();
        } else {
            // 2周目では自動的にケルト十字を展開する
            renderCelticCross();
            startAutomaticCelticSpread();
        }
    }
    else if (gameState.currentView === "puzzle") {
        renderSymbolicDragPuzzle();
    }
}

export function showPaginatedText(text, textEl, promptEl, onAllDone, defaultSpeaker = "") {
    gameState.isReadingResult = true;
    const rawPages = text.split(/\r?\n\s*\r?\n/).map(p => p.trim()).filter(p => p.length > 0);
    const pages = rawPages.flatMap(page => {
        if (/^\[focus:/.test(page)) return [page];
        return autoSplitTextIntoPages(page);
    });

    let index = 0;
    promptEl.classList.add("hidden");

    function showPage() {
        promptEl.classList.add("hidden");
        const currentSpeaker = defaultSpeaker;
        
        const result = processPageTags(pages[index], currentSpeaker, () => {
            if (index < pages.length - 1) {
                index++;
                showPage();
            } else {
                promptEl.onclick = null;
                textEl.parentElement.onclick = null;
                gameState.isReadingResult = false;
                onAllDone();
            }
        });

        if (result.handled) return;
        if (result.skip) {
            if (index < pages.length - 1) {
                index++;
                showPage();
            } else {
                promptEl.onclick = null;
                textEl.parentElement.onclick = null;
                gameState.isReadingResult = false;
                onAllDone();
            }
            return;
        }

        // 話者名のUI表示を適用
        const talkSpeaker = document.getElementById("talk-speaker");
        const talkText = document.getElementById("talk-text");
        const celticSpeaker = document.getElementById("celtic-speaker");
        const celticText = document.getElementById("celtic-text");
        const puzzleSpeaker = document.getElementById("puzzle-speaker");
        const puzzleText = document.getElementById("puzzle-text");

        if (gameState.currentView === "talk" && talkSpeaker && talkText) {
            updateSpeakerVisibility(talkSpeaker, talkText, result.speaker);
        } else if (gameState.currentView === "celtic" && celticSpeaker && celticText) {
            updateSpeakerVisibility(celticSpeaker, celticText, result.speaker);
        } else if (gameState.currentView === "puzzle" && puzzleSpeaker && puzzleText) {
            updateSpeakerVisibility(puzzleSpeaker, puzzleText, result.speaker);
        }

        typeDialogueText(result.text, textEl, () => {
            promptEl.classList.remove("hidden");
            const nextHandler = (e) => {
                if (e) e.stopPropagation();
                promptEl.onclick = null;
                textEl.parentElement.onclick = null;
                gameState.advanceReadingResultPage = null;
                
                if (index < pages.length - 1) {
                    index++;
                    showPage();
                } else {
                    gameState.isReadingResult = false;
                    onAllDone();
                }
            };
            promptEl.onclick = nextHandler;
            textEl.parentElement.onclick = nextHandler;
            gameState.advanceReadingResultPage = nextHandler;
        });
    }

    showPage();
}

export function showNextDialoguePage(stepData) {
    talkClickPrompt.classList.add("hidden");

    function goNext() {
        if (gameState.currentDialoguePageIndex < gameState.currentDialoguePages.length - 1) {
            gameState.currentDialoguePageIndex++;
            showNextDialoguePage(stepData);
        } else {
            finishStepText(stepData);
        }
    }

    const result = processPageTags(
        gameState.currentDialoguePages[gameState.currentDialoguePageIndex],
        gameState.activeDialogueSpeaker,
        goNext
    );
    gameState.activeDialogueSpeaker = result.speaker;

    if (result.handled) return; // フォーカス等で処理済み
    if (result.skip) { goNext(); return; } // スキップ対象

    updateSpeakerVisibility(talkSpeakerEl, talkTextEl, gameState.activeDialogueSpeaker);

    const pageId = `L${gameState.currentLoop}-S${gameState.currentStep}-P${gameState.currentDialoguePageIndex + 1}`;
    console.log(`[Dialogue ID] ${pageId} | Length: ${result.text.length} | Content: ${result.text}`);
    typeDialogueText(result.text, talkTextEl, () => {
        if (gameState.currentDialoguePageIndex < gameState.currentDialoguePages.length - 1) {
            talkClickPrompt.classList.remove("hidden");
            const nextHandler = (e) => {
                e.stopPropagation();
                goNext();
            };
            talkClickPrompt.onclick = nextHandler;
            talkTextEl.parentElement.onclick = nextHandler;
        } else {
            talkClickPrompt.onclick = null;
            talkTextEl.parentElement.onclick = null;
            // 最後のページ: stepData.focusImage があれば表示
            if (stepData.focusImage) {
                gameState.pendingStepLoad = () => { gameState.pendingStepLoad = null; finishStepText(stepData); };
                setTimeout(() => { if (gameState.pendingStepLoad) focusTarotCard(stepData.focusTitle || "", undefined, stepData.focusImage); }, 500);
            } else {
                finishStepText(stepData);
            }
        }
    });
}

export function finishStepText(stepData) {
    if (gameState.currentLoop === 1 && gameState.currentStep === 13) {
        renderSoulCardForm();
    } else if (gameState.currentLoop === 2 && gameState.currentStep === 2) {
        loadMetaStarStep();
    } else {
        if (stepData.cards && stepData.cards.length > 0) {
            gameState.isCardRevealed = false;
            renderChoiceCards(stepData.cards, talkCardsContainer);
        } else {
            gameState.isCardRevealed = true;
            talkClickPrompt.classList.remove("hidden");
            const nextHandler = (e) => {
                e.stopPropagation();
                advanceGame();
            };
            talkClickPrompt.onclick = nextHandler;
            talkTextEl.parentElement.onclick = nextHandler;
        }
    }
}

// --- Push message to Chat Timeline ---
export function pushChatMessage(speaker, text, isSelf = false, cardData = null, onComplete = null) {
    if (chatHistoryEl) {
        chatHistoryEl.innerHTML = ""; // Clear old messages to make it behave like a dialogue window
    }

    // If cardData is provided, render card display above the message bubble
    if (cardData && chatHistoryEl) {
        const cardDisplay = document.createElement("div");
        cardDisplay.className = "dialogue-card-display";
        
        const cardImg = document.createElement("div");
        cardImg.className = "dialogue-card-image";
        cardImg.style.backgroundImage = `url('${TAROT_IMAGES[cardData.id]}')`;
        if (!cardData.upright) {
            cardImg.style.transform = "rotate(180deg)";
        }
        
        cardDisplay.appendChild(cardImg);
        chatHistoryEl.appendChild(cardDisplay);
    }

    const isSystem = isSelf === "system";
    const bubble = document.createElement("div");
    if (isSystem) {
        bubble.className = "chat-bubble msg-system";
    } else {
        bubble.className = `chat-bubble ${isSelf ? 'msg-self' : 'msg-other'}`;
    }

    if (!isSelf && !isSystem) {
        const avatar = document.createElement("div");
        avatar.className = "bubble-avatar";
        avatar.style.backgroundImage = "url('/images/sophia_portrait.png')";
        bubble.appendChild(avatar);
    }

    const content = document.createElement("div");
    content.className = "bubble-content";
    bubble.appendChild(content);

    // Child element to type text into
    const textNode = document.createElement("div");
    textNode.className = "bubble-text-node";
    content.appendChild(textNode);

    if (chatHistoryEl) {
        chatHistoryEl.appendChild(bubble);
    }
    scrollToBottom();

    // Type text inside the textNode, fire callback when done
    const pageId = `L${gameState.currentLoop}-S${gameState.currentStep}-P1`;
    console.log(`[Dialogue ID] ${pageId} | Length: ${text.length} | Content: ${text}`);
    typeDialogueText(text, textNode, onComplete);
}

// --- Render Cards with choice/no-choice Illusion ---
export function renderChoiceCards(cardsList, container, isInChat = false) {
    container.innerHTML = "";
    
    const stepData = SCENARIO[gameState.currentLoop][gameState.currentStep];
    const isIllusion = stepData.choiceIllusion && cardsList.length > 0;

    // Ensure the card-draw-overlay is hidden
    if (cardDrawOverlay) {
        cardDrawOverlay.classList.add("hidden");
    }

    // Build Quiz style choices container
    const choicesContainer = document.createElement("div");
    choicesContainer.className = "quiz-choices-container";

    if (isIllusion && cardsList.length === 1) {
        const cardObj = cardsList[0];
        
        for (let i = 0; i < 3; i++) {
            const btn = document.createElement("button");
            btn.className = "quiz-choice-btn";
            
            const textSpan = document.createElement("span");
            textSpan.className = "quiz-choice-text";
            textSpan.textContent = `カードを引く (カード #${i + 1} を選択)`;
            
            btn.appendChild(textSpan);
            choicesContainer.appendChild(btn);

            btn.addEventListener("click", () => {
                handleQuizChoiceSelected(cardObj, `カード #${i + 1} を引く`, isInChat);
            });
        }
    } else {
        // Standard actual branches (Remove alphabet badges/labels)
        cardsList.forEach((card, index) => {
            const btn = document.createElement("button");
            btn.className = "quiz-choice-btn";
            
            const textSpan = document.createElement("span");
            textSpan.className = "quiz-choice-text";
            textSpan.textContent = card.title;
            
            btn.appendChild(textSpan);
            choicesContainer.appendChild(btn);

            btn.addEventListener("click", () => {
                handleQuizChoiceSelected(card, card.title, isInChat);
            });
        });
    }

    container.appendChild(choicesContainer);
    scrollToBottom();
}

// --- Handle Quiz-Style Selection Event ---
export function handleQuizChoiceSelected(card, choiceText, isInChat) {
    gameState.isCardRevealed = true;
    gameState.selectedOptionDesc = card.desc;
    
    // correct: false の選択肢を選んだ時に囁き演出
    if (card.correct === false || card.correct === "false") {
        showWrongChoiceWhisper();
        gameState.isCardRevealed = false;
        return; // 進行をブロックし、選択肢画面を維持する
    }

    if (card && card.id !== undefined) {
        discoverCard(card.id);
    }

    const tarotName = SOUL_CARDS[card.id] ? SOUL_CARDS[card.id].name : "タロットカード";
    const orientationText = card.upright ? "正位置" : "逆位置";

    // skipFocus: true の選択肢はカードポップアップをスキップする
    if (!card.skipFocus) {
        // カードを全画面表示する
        focusTarotCard(card.id, card.upright, TAROT_IMAGES[card.id], gameState.currentLoop === 1);
    }

    if (isInChat) {
        // Clear interactive zone instantly
        chatInteractiveZoneEl.innerHTML = "";
        
        // Show player choice in dialogue box
        pushChatMessage("Player", `選択: ${choiceText}`, true, null, () => {
            setTimeout(() => {
                // もし desc が空ならば、チャット応答を生成せず自動的に次のステップへ遷移する
                if (!card.desc) {
                    advanceGame();
                    return;
                }

                // Show result text with tarot card preview image embedded in bubble
                const narrativeText = card.skipFocus ? card.desc : `【${tarotName} (${orientationText})】を引きました。<br><br>${card.desc}`;
                pushChatMessage("The Journey", narrativeText, false, card.skipFocus ? null : card, () => {
                    // Generate Next Button after typing finishes
                    chatInteractiveZoneEl.innerHTML = `<button class="action-btn" id="chat-next-btn">トークを進める</button>`;
                    document.getElementById("chat-next-btn").addEventListener("click", advanceGame);
                    scrollToBottom();
                });
            }, 1000);
        });
    } else {
        // Fallback for non-chat views (e.g., Sophia talk view)
        if (gameState.currentView === "talk") {
            talkCardsContainer.innerHTML = "";
            
            // もし desc が空ならば、会話ページを生成せず自動的に次のステップへ遷移する
            if (!card.desc) {
                advanceGame();
                return;
            }
            // 現在のステップのスピーカーを維持（narration-styleを回避）
            const stepSpeaker = SCENARIO[gameState.currentLoop][gameState.currentStep]?.speaker || "";
            updateSpeakerVisibility(talkSpeakerEl, talkTextEl, stepSpeaker);
            
            // skipFocus: true の場合はカード名ヘッダーを表示しない
            const displayText = card.skipFocus ? card.desc : `【${tarotName} (${orientationText})】\n\n${card.desc}`;
            
            // Show result text（ページ送り対応）
            showPaginatedText(
                displayText,
                talkTextEl, talkClickPrompt,
                () => { talkClickPrompt.classList.remove("hidden"); },
                stepSpeaker
            );
        } else {
            advanceGame();
        }
    }
}

export function revealCard(cardElement, card, isInChat = false) {
    gameState.isCardRevealed = true;
    cardElement.classList.add("revealed");

    // Support legacy string parameter
    const isLegacy = typeof card === "string";
    const desc = isLegacy ? card : card.desc;
    gameState.selectedOptionDesc = desc;

    const cardId = isLegacy ? 16 : card.id; // Fallback to Tower if legacy
    discoverCard(cardId);

    const tarotName = SOUL_CARDS[cardId] ? SOUL_CARDS[cardId].name : (isLegacy ? "" : card.title);
    const orientationText = isLegacy ? "" : (card.upright ? "正位置" : "逆位置");

    // カードを全画面表示する
    focusTarotCard(cardId, isLegacy ? true : card.upright, TAROT_IMAGES[cardId], gameState.currentLoop === 1);

    setTimeout(() => {
        if (isInChat) {
            // 1. Show the drawn card name first in the dialog
            pushChatMessage("The Journey", `【${tarotName} (${orientationText})】を引きました。`);

            // 2. Render choice button based on card.title
            chatInteractiveZoneEl.innerHTML = `
                <button class="action-btn" id="chat-choice-btn">${isLegacy ? "進む" : card.title}</button>
            `;
            
            document.getElementById("chat-choice-btn").addEventListener("click", () => {
                // Clear interactive zone
                chatInteractiveZoneEl.innerHTML = "";
                
                // Show player choice bubble
                pushChatMessage("Player", `選択: ${isLegacy ? "進む" : card.title}`, true);
                
                setTimeout(() => {
                    // Show result narrative (desc)
                    pushChatMessage("The Journey", desc);
                    
                    // Show next button
                    chatInteractiveZoneEl.innerHTML = `<button class="action-btn" id="chat-next-btn">トークを進める</button>`;
                    document.getElementById("chat-next-btn").addEventListener("click", advanceGame);
                    scrollToBottom();
                }, 1000);
            });
            scrollToBottom();
        } else {
            if (gameState.currentView === "talk") {
                updateSpeakerVisibility(talkSpeakerEl, talkTextEl, "");
                
                if (isLegacy) {
                    showPaginatedText(desc, talkTextEl, talkClickPrompt, () => {
                        talkClickPrompt.classList.remove("hidden");
                    });
                } else {
                    // Show drawn card info first
                    typeDialogueText(`【${tarotName} (${orientationText})】`, talkTextEl);
                    
                    // Create choice button in cards-area-talk (talkCardsContainer)
                    talkCardsContainer.innerHTML = `
                        <button class="action-btn" id="talk-choice-btn" style="margin-top: 15px;">${card.title}</button>
                    `;
                    
                    document.getElementById("talk-choice-btn").addEventListener("click", () => {
                        talkCardsContainer.innerHTML = "";
                        showPaginatedText(desc, talkTextEl, talkClickPrompt, () => {
                            talkClickPrompt.classList.remove("hidden");
                        });
                    });
                }
            } else if (gameState.currentView === "celtic") {
                updateSpeakerVisibility(celticSpeakerEl, celticTextEl, "運命の託宣");
                showPaginatedText(gameState.selectedOptionDesc, celticTextEl, celticClickPrompt, () => {
                    celticClickPrompt.classList.remove("hidden");
                });
            } else if (gameState.currentView === "puzzle") {
                updateSpeakerVisibility(puzzleSpeakerEl, puzzleTextEl, "運命の託宣");
                showPaginatedText(gameState.selectedOptionDesc, puzzleTextEl, puzzleClickPrompt, () => {
                    puzzleClickPrompt.classList.remove("hidden");
                });
            }
        }
    }, 600);
}

export function advanceGame() {
    const currentScenarioLength = SCENARIO[gameState.currentLoop].length;

    // Bad End branch at Step 11 (Chariot)
    if (gameState.currentLoop === 1 && gameState.currentStep === 11) {
        if (gameState.selectedOptionDesc.includes("逆位置の『愚者』")) {
            gameState.stressVal = 100;
            gameState.luckVal = 0;
            stressGaugeEl.textContent = "999% [OVERFLOW]";
            luckGaugeEl.textContent = "0%";
            triggerLoversBadEnd();
            return;
        } else {
            gameState.stressVal = 0;
            gameState.luckVal = 100;
            stressGaugeEl.textContent = "STABILIZED";
            luckGaugeEl.textContent = "MAX (FIXED)";
        }
    }

    // Fail Meta-Puzzle click check
    if (gameState.currentLoop === 2 && gameState.currentStep === 2 && gameState.isFateControlled && gameState.isCardRevealed) {
        triggerDevilLoopEnd();
        return;
    }

    if (gameState.currentStep >= currentScenarioLength - 1) {
        if (gameState.currentLoop === 1) {
            triggerTowerBadEnd();
        } else {
            triggerDevilLoopEnd();
        }
        return;
    }

    gameState.currentStep++;
    loadStep();
}

// --- Lovers Bad End ---
export function triggerLoversBadEnd() {
    glitchOverlay.classList.add("glitch-active");
    
    setTimeout(() => {
        endingOverlay.classList.remove("hidden");
        endingTitle.textContent = "0 : THE FOOL (逆位置)";
        endingTitle.style.color = "var(--color-accent-red)";
        endingDesc.innerHTML = `
            君は自由を選んだつもりでした。<br>
            しかし、ナビゲーションを失った日常はあっけなく崩壊し、孤独が君を包みます。<br><br>
            <span style="color: var(--color-accent-red);">「君は導きを失い、ただの本当の馬鹿（逆位置）になったのだ」</span>
        `;
        restartBtn.textContent = "8日目をやり直す";
        restartBtn.onclick = () => {
            gameState.currentStep = 11;
            saveState();
            initGame();
        };
    }, 1200);
}

// --- Tower Bad End (End of Loop 1) ---
export function triggerTowerBadEnd() {
    glitchOverlay.classList.add("glitch-active");

    setTimeout(() => {
        endingOverlay.classList.remove("hidden");
        endingTitle.textContent = "XVI : THE TOWER (崩壊)";
        endingTitle.style.color = "var(--color-accent-red)";
        endingDesc.innerHTML = `
            完璧だったはずのシステムは、君を贄として崩壊しました。<br>
            自分で考えることを放棄し、誰かが用意した「運命」を盲信した結末です。<br><br>
            <span style="color: var(--color-gold);">「本当にこれが, 君の望んだ世界ですか？」</span>
        `;
        restartBtn.textContent = "2周目を開始する (違和感の獲得)";
        restartBtn.onclick = () => {
            gameState.currentLoop = 2;
            gameState.currentStep = 0;
            saveState();
            initGame();
        };
    }, 1500);
}

// --- Devil Loop End (Loop Fail) ---
export function triggerDevilLoopEnd() {
    glitchOverlay.classList.add("glitch-active");
    sceneBgEl.style.backgroundImage = "url('/images/glitch_matrix.png')";
    sceneBgEl.style.opacity = 0.85;

    setTimeout(() => {
        endingOverlay.classList.remove("hidden");
        endingTitle.textContent = "XV : THE DEVIL (盲信ループ)";
        endingTitle.style.color = "var(--color-accent-red)";
        endingDesc.innerHTML = `
            君は再び、提示された運命をめくってしまいました。<br>
            用意された選択肢から選ぶという行為自体が、すでに依存と囚われの檻です。<br><br>
            <span style="color: var(--color-gold);">システムに抗うのです。カードそのものをドラッグして「破棄」し、<br>
            運命の糸を物理的に切り離しなさい。</span>
        `;
        restartBtn.textContent = "もう一度運命に抗う";
        restartBtn.onclick = () => {
            gameState.currentLoop = 2;
            gameState.currentStep = 2;
            saveState();
            initGame();
        };
    }, 1200);
}

export function applyDynamicAdjustments() {
    // SCENARIO text replacement: "あなた" -> "君", "ナレーション" -> ""
    for (let loopKey in SCENARIO) {
        SCENARIO[loopKey].forEach(step => {
            if (step.speaker === "ナレーション") {
                step.speaker = "";
            }
            if (step.text) {
                step.text = step.text.replace(/あなた/g, "君");
            }
            if (step.cards) {
                step.cards.forEach(card => {
                    if (card.desc) {
                        card.desc = card.desc.replace(/あなた/g, "君");
                    }
                });
            }
        });
    }
    
    // SOUL_CARDS replacement: "あなた" -> "君"
    for (let cardId in SOUL_CARDS) {
        if (SOUL_CARDS[cardId].desc) {
            SOUL_CARDS[cardId].desc = SOUL_CARDS[cardId].desc.replace(/あなた/g, "君");
        }
    }

    // THREE_CARDS_DATA replacement: "あなた" -> "君"
    THREE_CARDS_DATA.forEach(card => {
        if (card.desc) {
            card.desc = card.desc.replace(/あなた/g, "君");
        }
    });
}

export function showStartScreen() {
    // URLパラメータによる上書き (デバッグ・個別起動用)
    const params = new URLSearchParams(window.location.search);
    const paramLoop = params.get('loop');
    const paramStep = params.get('step');

    if (paramLoop !== null && paramStep !== null) {
        startScreenEl.classList.add("hidden");
        initGame();
        return;
    }

    const savedLoop = localStorage.getItem("fools_journey_loop");
    const savedStep = localStorage.getItem("fools_journey_step");
    
    if (startContinueBtn) {
        if (savedLoop !== null && savedStep !== null) {
            startContinueBtn.classList.remove("hidden");
        } else {
            startContinueBtn.classList.add("hidden");
        }
    }
    
    startScreenEl.classList.remove("hidden");
    gameContainer.classList.add("hidden");
    meditationContainer.classList.add("hidden");
}

export function setupEventListeners() {
    if (startNewBtn) {
        startNewBtn.addEventListener("click", () => {
            localStorage.clear();
            gameState.currentLoop = 1;
            gameState.currentStep = 0;
            gameState.trueEndCleared = false;
            // URLパラメータも消去（デバッグ用パラメータが残っていても無視）
            window.history.replaceState({}, '', window.location.pathname);
            startScreenEl.classList.add("hidden");
            initGame(true); // 新規スタート：saveState読み込みをスキップ
        });
    }

    if (startContinueBtn) {
        startContinueBtn.addEventListener("click", () => {
            startScreenEl.classList.add("hidden");
            initGame();
        });
    }

    if (showInstructionsBtn) {
        showInstructionsBtn.addEventListener("click", () => {
            instructionsModal.classList.remove("hidden");
        });
    }

    if (closeInstructionsBtn) {
        closeInstructionsBtn.addEventListener("click", () => {
            instructionsModal.classList.add("hidden");
        });
    }
    if (instructionsModal) {
        const overlay = instructionsModal.querySelector(".custom-modal-overlay");
        if (overlay) {
            overlay.addEventListener("click", () => {
                instructionsModal.classList.add("hidden");
            });
        }
    }

    if (cardFocusModal) {
        cardFocusModal.addEventListener("click", () => {
            cardFocusModal.classList.add("hidden");
            if (gameState.pendingStepLoad) {
                gameState.pendingStepLoad();
            }
        });
    }

    // --- カード図鑑（コレクション）関連のイベントリスナー ---
    const collectionBtn = document.getElementById("collection-btn");
    const collectionModal = document.getElementById("collection-modal");
    const closeCollectionBtn = document.getElementById("close-collection-btn");
    const collectionOverlay = document.getElementById("collection-modal-overlay");

    if (collectionBtn) {
        collectionBtn.addEventListener("click", () => {
            openCollectionModal();
        });
    }

    if (closeCollectionBtn) {
        closeCollectionBtn.addEventListener("click", () => {
            if (collectionModal) collectionModal.classList.add("hidden");
        });
    }

    if (collectionOverlay) {
        collectionOverlay.addEventListener("click", () => {
            if (collectionModal) collectionModal.classList.add("hidden");
        });
    }
}

// 図鑑モーダルを開く
export function openCollectionModal() {
    const collectionModal = document.getElementById("collection-modal");
    const collectionGrid = document.getElementById("collection-grid");
    if (!collectionModal || !collectionGrid) return;

    collectionGrid.innerHTML = "";

    // 0〜21の大アルカナ全てについて描画
    for (let i = 0; i <= 21; i++) {
        const hasCard = gameState.discoveredCards.has(i);
        const cardMeta = SOUL_CARDS[i] || { name: `No. ${i}`, desc: "未知のカード" };
        
        const item = document.createElement("div");
        item.className = `collection-grid-item ${hasCard ? "" : "locked"}`;
        
        const img = document.createElement("div");
        img.className = "collection-card-img";
        if (hasCard) {
            img.style.backgroundImage = `url('${TAROT_IMAGES[i]}')`;
        }
        
        const name = document.createElement("div");
        name.className = "collection-card-name";
        name.textContent = hasCard ? cardMeta.name : "???";

        item.appendChild(img);
        item.appendChild(name);
        collectionGrid.appendChild(item);

        // 発見済みのカードは、クリック時に詳細（拡大）ポップアップを開いて意味を表示
        if (hasCard) {
            item.addEventListener("click", () => {
                collectionModal.classList.add("hidden"); // 図鑑を一旦隠す
                focusTarotCard(i, true, TAROT_IMAGES[i]); // 正位置で拡大表示
                
                // 拡大表示が閉じられたら図鑑に戻るようにする
                gameState.pendingStepLoad = () => {
                    gameState.pendingStepLoad = null;
                    collectionModal.classList.remove("hidden");
                };
            });
        }
    }

    collectionModal.classList.remove("hidden");
}

// --- 画面全体タップでページ送り ---
// ボタン・カード・モーダルなどインタラクティブ要素は除外
const SKIP_SELECTORS = "button, a, .card-wrapper, .quiz-choice-btn, .symbolic-stone, #card-focus-modal, #card-draw-overlay, .start-screen-overlay, input, label, .soul-card-form";

document.addEventListener("click", (e) => {
    // 生年月日入力フォームや計算アニメーション中は画面全体クリックでの進行を完全にブロックする
    if (document.querySelector(".soul-card-form") || document.querySelector(".soul-calculation-box")) {
        return;
    }

    // ケルト十字ビューの場合は、手動カード確認（クリック）以外の「画面全体タップによる進行」を透過させます。
    if (gameState.currentView === "celtic" && !gameState.isCelticAnimating) {
        // カードをクリックした場合はstopPropagationされるためここには来ず、
        // 盤面上のその他やデッキの上のタップでも進行を発生させます。
    } else {
        if (e.target.closest(SKIP_SELECTORS)) return;
    }

    if (gameState.isTyping && gameState.skipTyping) {
        gameState.skipTyping();
        return;
    }

    if (gameState.isReadingResult) {
        if (gameState.advanceReadingResultPage) {
            gameState.advanceReadingResultPage();
        }
        return;
    }

    if (gameState.advanceChatPage) {
        gameState.advanceChatPage();
        return;
    }

    // 占い師対話シーン（talkビュー）でのクリック進行
    if (gameState.currentView === "talk") {
        const stepData = SCENARIO[gameState.currentLoop][gameState.currentStep];
        
        if (gameState.currentDialoguePageIndex < gameState.currentDialoguePages.length - 1) {
            gameState.currentDialoguePageIndex++;
            showNextDialoguePage(stepData);
        } else {
            if (gameState.isCardRevealed) {
                // 選択決定後の結果テキスト表示が完了している、またはカードがめくられた後にクリックされたら次のステップへ
                advanceGame();
            }
        }
    }
    // チャット画面でのクリック進行
    else if (gameState.currentView === "chat") {
        // chat画面では、入力エリア（chatInteractiveZoneEl）が空かつ、カードがすでにめくられている状態（自動進行対象外の通常の進行）のみ、クリック進行を許容します
        if (chatInteractiveZoneEl.innerHTML === "" && gameState.isCardRevealed) {
            advanceGame();
        }
    }
    // ケルト十字ビューでのクリック進行（全て配り終えてソフィアのトーク表示時など）
    else if (gameState.currentView === "celtic") {
        if (gameState.isCardRevealed && !gameState.isCelticAnimating) {
            advanceGame();
        }
    }
    // 意思決定パズルビューでのクリック進行
    else if (gameState.currentView === "puzzle") {
        if (gameState.isCardRevealed) {
            advanceGame();
        }
    }
});

// --- Window load initialize ---
window.addEventListener("load", () => {
    applyDynamicAdjustments();
    setupEventListeners();
    showStartScreen();
});
