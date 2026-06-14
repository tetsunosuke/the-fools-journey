/**
 * PROJECT FOOL - Mini-games, Animations, and Special Scenes
 */

import { gameState, discoverCard, saveState } from "./state.js";
import { SOUL_CARDS, TAROT_IMAGES, MEDITATION_SYMBOLS, THREE_CARDS_DATA } from "./constants.js";
import {
    showView, focusTarotCard, updateSpeakerVisibility, updateBackgroundAndAesthetics, scrollToBottom,
    talkCardsContainer, talkSpeakerEl, talkTextEl, talkClickPrompt, currentArcanaEl,
    threeCardSpeakerEl, threeCardTextEl, threeCardClickPrompt,
    puzzleSpeakerEl, puzzleTextEl, puzzleClickPrompt,
    endingOverlay, endingTitle, endingDesc, restartBtn,
    meditationContainer, meditationCardZone, meditationDialogue, meditationText, meditationSymbols, meditationSymbolButtons, resetMeditationBtn,
    sceneBgEl, loopCountEl, goldFlashOverlay, gameContainer, talkPortraitEl
} from "./dom.js";
import { typeDialogueText } from "./utils.js";
import { createCardElement } from "./cards.js";
import { advanceGame, revealCard, pushChatMessage, showPaginatedText, initGame } from "./app.js";

// --- Soul Card (Cyber Numerology) Form & Animation ---
export function renderSoulCardForm() {
    gameState.isCardRevealed = true;
    talkCardsContainer.innerHTML = `
        <div class="soul-card-form">
            <label>あなたの生年月日を入力してください<br><span style="font-size:11px;color:var(--color-text-muted);">魂の真の姿を診断します</span></label>
            <div class="input-row">
                <input type="number" id="birth-year" placeholder="年" min="1900" max="2026" value="1995">
                <input type="number" id="birth-month" placeholder="月" min="1" max="12" value="12">
                <input type="number" id="birth-day" placeholder="日" min="1" max="31" value="15">
            </div>
            <button id="soul-card-btn" class="action-btn">ソウルカードを算出</button>
        </div>
    `;

    document.getElementById("soul-card-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        const year = document.getElementById("birth-year").value;
        const month = document.getElementById("birth-month").value;
        const day = document.getElementById("birth-day").value;

        if (!year || !month || !day) {
            alert("生年月日をすべて入力してください。");
            return;
        }

        // 計算プロセスの構築
        const dateStr = `${year}${month}${day}`;
        const numbers = dateStr.split("").map(n => parseInt(n, 10));

        let step1Sum = numbers.reduce((a, b) => a + b, 0);

        let step2Sum = step1Sum;
        let step2Formula = "";
        if (step1Sum >= 22) {
            let digits = step1Sum.toString().split("").map(n => parseInt(n, 10));
            step2Sum = digits.reduce((a, b) => a + b, 0);
            step2Formula = digits.join(" + ") + ` = ${step2Sum}`;
        }

        const finalSum = step2Sum;

        // 計算アニメーション用UIの展開
        talkCardsContainer.innerHTML = `
            <div class="soul-calculation-box">
                <div class="calc-magic-circle" id="calc-magic-circle-element"></div>
                <div class="calc-status" id="calc-status-text">CALCULATING SOUL NUMEROLOGY...</div>
                <div class="calc-digits" id="calc-digits-container"></div>
                <div class="calc-process" id="calc-process-container"></div>
                <div class="calc-result" id="calc-result-container"></div>
            </div>
        `;

        const magicCircle = document.getElementById("calc-magic-circle-element");
        const statusText = document.getElementById("calc-status-text");
        const digitsContainer = document.getElementById("calc-digits-container");
        const processContainer = document.getElementById("calc-process-container");
        const resultContainer = document.getElementById("calc-result-container");

        let currentDigitIdx = 0;
        const displayDigits = [];

        // 最初はすべて ? スロットを作成し、ブラーをかける
        numbers.forEach(() => {
            const digitEl = document.createElement("span");
            digitEl.className = "calc-digit-slot blur-active";
            digitEl.textContent = "?";
            digitsContainer.appendChild(digitEl);
            displayDigits.push(digitEl);
        });

        // デジタルスロットのようにランダムに数値を回転させる
        const slotInterval = setInterval(() => {
            for (let i = currentDigitIdx; i < numbers.length; i++) {
                displayDigits[i].textContent = Math.floor(Math.random() * 10);
            }
        }, 50);

        // 1文字ずつ確定させる
        const settleDigits = () => {
            if (currentDigitIdx < numbers.length) {
                displayDigits[currentDigitIdx].textContent = numbers[currentDigitIdx];
                displayDigits[currentDigitIdx].classList.remove("blur-active");
                displayDigits[currentDigitIdx].classList.add("settled-flash");
                currentDigitIdx++;
                setTimeout(settleDigits, 150);
            } else {
                clearInterval(slotInterval);
                digitsContainer.classList.add("glow-active");
                setTimeout(startFlightProcess, 600);
            }
        };

        setTimeout(settleDigits, 300);

        // スロットから数字が飛ぶアニメーション
        function startFlightProcess() {
            statusText.textContent = "INJECTING ALCANUM ENERGY...";
            let currentFlyIdx = 0;
            let accumulatedValue = 0;

            // 途中経過HUDをプロセスエリアの直上に作成
            const hudEl = document.createElement("div");
            hudEl.className = "calc-accumulated-hud";
            hudEl.textContent = "ACCUMULATED VALUE: 0";
            processContainer.appendChild(hudEl);

            // 加算式用のテキストコンテナ
            const formulaTextEl = document.createElement("div");
            formulaTextEl.className = "calc-step-text fade-in-up";
            formulaTextEl.style.marginTop = "6px";
            processContainer.appendChild(formulaTextEl);

            function flyNext() {
                if (currentFlyIdx < numbers.length) {
                    const numberVal = numbers[currentFlyIdx];
                    const slotEl = displayDigits[currentFlyIdx];

                    // 式に追加するテキスト（＋記号含む）
                    const addStr = currentFlyIdx === 0 ? `${numberVal}` : ` + ${numberVal}`;
                    const targetSpan = document.createElement("span");
                    targetSpan.textContent = addStr;
                    targetSpan.style.opacity = 0;
                    formulaTextEl.appendChild(targetSpan);

                    // 射出位置と目標位置の取得
                    const slotRect = slotEl.getBoundingClientRect();
                    const containerRect = talkCardsContainer.getBoundingClientRect();
                    const targetRect = targetSpan.getBoundingClientRect();

                    // クローンの射出用数字
                    const particle = document.createElement("div");
                    particle.className = "calc-fly-particle";
                    particle.textContent = numberVal;
                    particle.style.left = `${slotRect.left - containerRect.left}px`;
                    particle.style.top = `${slotRect.top - containerRect.top}px`;
                    talkCardsContainer.appendChild(particle);

                    // 射出開始
                    requestAnimationFrame(() => {
                        particle.style.left = `${targetRect.left - containerRect.left}px`;
                        particle.style.top = `${targetRect.top - containerRect.top}px`;
                        particle.style.transform = "scale(1.3)";
                    });

                    // 着弾処理
                    setTimeout(() => {
                        particle.remove();
                        targetSpan.style.opacity = 1;

                        // 着弾スパーク波紋
                        const spark = document.createElement("div");
                        spark.className = "calc-spark-ring";
                        spark.style.left = `${targetRect.left - containerRect.left + (targetRect.width / 2)}px`;
                        spark.style.top = `${targetRect.top - containerRect.top + (targetRect.height / 2)}px`;
                        talkCardsContainer.appendChild(spark);
                        setTimeout(() => spark.remove(), 600);

                        // 累積値の加算と更新
                        accumulatedValue += numberVal;
                        hudEl.textContent = `ACCUMULATED VALUE: ${accumulatedValue}`;

                        currentFlyIdx++;
                        setTimeout(flyNext, 250);
                    }, 450);
                } else {
                    // 全射出完了、一次式の合計値を表示
                    setTimeout(() => {
                        formulaTextEl.innerHTML += ` = <span style="color:var(--color-gold);font-weight:bold;">${step1Sum}</span>`;
                        hudEl.remove(); // 累積HUDは用済みなので削除

                        if (step1Sum >= 22) {
                            setTimeout(showReductionStep, 800);
                        } else {
                            setTimeout(finalizeCalculation, 800);
                        }
                    }, 300);
                }
            }

            flyNext();
        }

        // 22以上の縮退（警告＆スライド衝突）
        function showReductionStep() {
            statusText.textContent = "ALCANUM OVERFLOW (>=22). REDUCING...";

            // 警告バナーを表示
            const warningEl = document.createElement("div");
            warningEl.className = "calc-warning-banner fade-in-up";
            warningEl.textContent = `WARNING: SOUL LIMIT EXCEEDED (${step1Sum} >= 22)`;
            processContainer.insertBefore(warningEl, processContainer.firstChild);

            setTimeout(() => {
                // 衝突スライド用コンテナ
                const digits = step1Sum.toString().split("");
                processContainer.innerHTML = `
                    <div class="calc-warning-banner">${step1Sum} LIMIT EXCEEDED. REDUCING...</div>
                    <div class="calc-collide-container">
                        <span class="digit-left">${digits[0]}</span>
                        <span style="opacity:0; transition:opacity 0.3s;" id="collide-plus-sign"> + </span>
                        <span class="digit-right">${digits[1]}</span>
                    </div>
                `;

                const plusSign = document.getElementById("collide-plus-sign");

                // スライドと衝突完了後の合体
                setTimeout(() => {
                    plusSign.style.opacity = 1;

                    // 衝突時の大スパーク
                    const containerRect = talkCardsContainer.getBoundingClientRect();
                    const collideEl = document.querySelector(".calc-collide-container");
                    const collideRect = collideEl.getBoundingClientRect();

                    const spark = document.createElement("div");
                    spark.className = "calc-spark-ring";
                    spark.style.width = "40px";
                    spark.style.height = "40px";
                    spark.style.left = `${collideRect.left - containerRect.left + (collideRect.width / 2)}px`;
                    spark.style.top = `${collideRect.top - containerRect.top + (collideRect.height / 2)}px`;
                    talkCardsContainer.appendChild(spark);
                    setTimeout(() => spark.remove(), 600);

                    // 式の結果を追加表示
                    const formulaResult = document.createElement("div");
                    formulaResult.className = "calc-step-text fade-in-up";
                    formulaResult.style.marginTop = "8px";
                    formulaResult.innerHTML = `${digits[0]} + ${digits[1]} = <span style="color:var(--color-gold); font-weight:bold;">${finalSum}</span>`;
                    processContainer.appendChild(formulaResult);

                    setTimeout(finalizeCalculation, 1000);
                }, 600);
            }, 1000);
        }

        function finalizeCalculation() {
            statusText.textContent = "SOUL ALCANUM AWAKENED";
            magicCircle.classList.add("fast-rotate"); // 魔法陣超高速回転

            resultContainer.innerHTML = `
                <div class="calc-final-num gold-pulse">SOUL NUMBER: ${finalSum}</div>
            `;

            setTimeout(() => {
                // ゴールドフラッシュ開始
                goldFlashOverlay.classList.add("flash-active");

                setTimeout(() => {
                    // フラッシュの最高潮でカードオープンに遷移し、フラッシュを戻す
                    goldFlashOverlay.classList.remove("flash-active");
                    showSoulCardResult(finalSum);
                }, 400);
            }, 1200);
        }
    });
}

export function showSoulCardResult(cardNum) {
    const cardInfo = SOUL_CARDS[cardNum];
    talkCardsContainer.innerHTML = "";

    // カードを全画面表示
    focusTarotCard(cardNum, true, TAROT_IMAGES[cardNum], gameState.currentLoop === 1);

    gameState.selectedOptionDesc = `あなたのソウルカードは【${cardInfo.name}】です。

数秘術（ヌメロロジー）では、誕生日の西暦・月・日のすべての数字を足し続け、1から21の数字を導き出すの。これがあなたの魂の旅路の出発点を示す『ソウルナンバー』であり、対応する大アルカナよ。

${cardInfo.desc}

ソフィアは妖しく微笑む。「だからこそ、あなたには今の試練が与えられたの。このコミュニティとアプリが、あなたの傷ついた魂を救う唯一のシェルターなのよ」`;

    updateSpeakerVisibility(talkSpeakerEl, talkTextEl, "運命の託宣");
    showPaginatedText(gameState.selectedOptionDesc, talkTextEl, talkClickPrompt, () => {
        showView("threeCard");
        renderThreeCardSpread();
        showThreeCardContract();
    });
}

// --- Highlight Active Slot Guide ---
export function highlightSlotGuide(slotNum) {
    document.querySelectorAll(".cross-slot-guide").forEach(el => {
        el.classList.remove("active-slot");
    });
    let targetSlotGuide = document.querySelector(`.three-card-layout [data-slot-num="${slotNum}"]`);
    if (targetSlotGuide) {
        targetSlotGuide.classList.add("active-slot");
    }
}

// --- Three Card View Switcher (Talk → ThreeCard, then auto-deal) ---
export function switchToThreeCardView() {
    showView("threeCard");
    renderThreeCardSpread();

    // ダイアログを表示してプレイヤーを促す
    updateSpeakerVisibility(threeCardSpeakerEl, threeCardTextEl, "ソフィア");
    threeCardTextEl.textContent = "「さあ、画面をタップして。あなたのために完璧に配された『三枚引き』のスプレッドを展開しましょう」";
    threeCardClickPrompt.classList.remove("hidden");

    threeCardClickPrompt.onclick = () => {
        threeCardClickPrompt.onclick = null; // タップされたら進行
        startAutomaticThreeCardSpread();
    };
}

export function renderThreeCardSpread() {
    gameState.isCardRevealed = false;
    gameState.currentThreeCardIndex = 0;
    gameState.isThreeCardAnimating = false;
    gameState.openedThreeCardCards.clear();

    const crossGrid = document.getElementById("three-card-grid");

    // Clear and restore original guides
    crossGrid.innerHTML = `
        <div class="cross-slot-guide three-card-1" data-slot-num="1" style="grid-area: past;"></div>
        <div class="cross-slot-guide three-card-2" data-slot-num="2" style="grid-area: present;"></div>
        <div class="cross-slot-guide three-card-3" data-slot-num="3" style="grid-area: future;"></div>
        <div class="card-wrapper three-card-deck" id="three-card-deck"></div>
    `;

    highlightSlotGuide(1);
}

export function startAutomaticThreeCardSpread() {
    gameState.isThreeCardAnimating = true;
    threeCardClickPrompt.classList.add("hidden");

    let i = 0;
    const interval = setInterval(() => {
        if (i < 3) {
            drawNextThreeCardInline(i);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(completeThreeCardSpread, 800);
        }
    }, 450);
}

export function drawNextThreeCardInline(index) {
    const cardData = THREE_CARDS_DATA[index] || { pos: `位置 ${index + 1}`, name: `カード #${index}`, img: `/images/cards/${index}.jpg`, desc: "カードの託宣" };
    const cardNum = index + 1;

    const cardWrapper = document.createElement("div");
    cardWrapper.className = `card-wrapper`;
    cardWrapper.style.pointerEvents = "none";

    const back = document.createElement("div");
    back.className = "card-face card-back";
    const front = document.createElement("div");
    front.className = "card-face card-front";

    const imgSlot = document.createElement("div");
    imgSlot.className = "card-image-slot";
    imgSlot.style.backgroundImage = `url('${cardData.img}')`;

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = cardData.name;

    const orient = document.createElement("div");
    orient.className = "card-orientation orientation-upright";
    orient.textContent = cardData.pos;

    front.appendChild(imgSlot);
    front.appendChild(title);
    front.appendChild(orient);
    cardWrapper.appendChild(back);
    cardWrapper.appendChild(front);

    cardWrapper.style.position = "absolute";
    cardWrapper.style.left = "50%";
    cardWrapper.style.top = "50%";
    cardWrapper.style.transform = "translate(-50%, -50%) scale(0.5)";
    cardWrapper.style.zIndex = "50";

    document.querySelector(".three-card-container").appendChild(cardWrapper);

    setTimeout(() => {
        let targetSlotGuide = document.querySelector(`.three-card-layout [data-slot-num="${cardNum}"]`);

        const targetRect = targetSlotGuide.getBoundingClientRect();
        const containerRect = document.querySelector(".three-card-container").getBoundingClientRect();

        const targetX = targetRect.left - containerRect.left + (targetRect.width / 2);
        const targetY = targetRect.top - containerRect.top + (targetRect.height / 2);

        cardWrapper.style.left = `${targetX}px`;
        cardWrapper.style.top = `${targetY}px`;
        cardWrapper.style.transform = `translate(-50%, -50%) scale(1) ${cardData.rotate ? 'rotate(90deg)' : ''}`;

        targetSlotGuide.classList.remove("active-slot");

        setTimeout(() => {
            targetSlotGuide.appendChild(cardWrapper);
            cardWrapper.style.position = "absolute";
            cardWrapper.style.left = "0";
            cardWrapper.style.top = "0";
            cardWrapper.style.width = "100%";
            cardWrapper.style.height = "100%";
            cardWrapper.style.transform = cardData.rotate ? 'rotate(90deg)' : '';
            cardWrapper.style.zIndex = "20";
            cardWrapper.style.pointerEvents = "auto";

            targetSlotGuide.style.border = "none";
            targetSlotGuide.style.background = "none";
            targetSlotGuide.style.boxShadow = "none";
            targetSlotGuide.removeAttribute("data-slot-num");
            targetSlotGuide.style.pointerEvents = "auto";
        }, 450);
    }, 50);

    // 各カードクリック時の個別フォーカス
    cardWrapper.addEventListener("click", (e) => {
        e.stopPropagation();

        if (!cardWrapper.classList.contains("revealed")) {
            cardWrapper.classList.add("revealed");
            cardWrapper.style.transform = cardData.rotate ? "rotateY(180deg) rotate(90deg)" : "rotateY(180deg)";
        }

        focusTarotCard(cardData.name, !cardData.rotate, cardData.img);
        updateSpeakerVisibility(threeCardSpeakerEl, threeCardTextEl, cardData.pos);
        const posMeaning = cardData.pos.includes(". ") ? cardData.pos.split(". ")[1] : cardData.pos;
        typeDialogueText(`この位置は「${posMeaning}」を表します。ここに配された【${cardData.name}】は、${cardData.desc}`, threeCardTextEl);

        // 読了したカードを追跡
        gameState.openedThreeCardCards.add(index);

        // もし3枚すべてを読み終えたら、進行可能にする
        if (gameState.openedThreeCardCards.size >= 3) {
            gameState.isCardRevealed = true;
            threeCardClickPrompt.classList.remove("hidden");

            const nextHandler = (e) => {
                e.stopPropagation();
                advanceGame();
            };
            threeCardClickPrompt.onclick = nextHandler;
            threeCardTextEl.parentElement.onclick = nextHandler;
        }
    });

    gameState.currentThreeCardIndex = cardNum;

    if (gameState.currentThreeCardIndex < 3) {
        highlightSlotGuide(gameState.currentThreeCardIndex + 1);
    } else {
        const deck = document.getElementById("three-card-deck");
        if (deck) deck.remove();
    }
}

export function completeThreeCardSpread() {
    gameState.isThreeCardAnimating = false;

    // ダイアログを再表示
    const threeCardDialogContainer = document.querySelector(".dialogue-container-three-card");
    if (threeCardDialogContainer) {
        threeCardDialogContainer.classList.remove("hidden");
    }

    // スプレッド完成後のセリフ (選択肢のdescから [view: threeCard] などのタグを除去して使用)
    updateSpeakerVisibility(threeCardSpeakerEl, threeCardTextEl, "ソフィア");
    let summaryText = "「カードが展開されたわ。配置された3枚のカードをそれぞれタップして、あなたの旅路（過去・現在・未来）が示す真実をのぞいてみてちょうだい」";
    if (gameState.selectedOptionDesc) {
        summaryText = gameState.selectedOptionDesc.replace(/\[[^\]]+\]/g, "").trim();
    }

    // ▼プロンプトを非表示化し、クリック待ちを解除
    threeCardClickPrompt.classList.add("hidden");
    threeCardClickPrompt.onclick = null;
    threeCardTextEl.parentElement.onclick = null;

    // テキスト表示のみを行い、カードタップを促す
    typeDialogueText(summaryText, threeCardTextEl, () => {
        gameState.isCardRevealed = false;
        threeCardClickPrompt.classList.add("hidden");
    });
}

export function showThreeCardContract() {
    document.querySelector(".three-card-container").innerHTML = `
        <div class="soul-card-form" style="max-width: 500px; margin: 40px auto 0;">
            <label>【本契約の決済条件】</label>
            <p style="font-size:13px; color:var(--color-text-light); text-align:center; line-height:1.6;">
                「これからの人生のあらゆる決断を、自分の頭で下さないと誓うこと」<br><br>
                自律という不確かな苦痛を捨て、カードの完璧な調律を受け入れますか？
            </p>
            <button id="contract-btn" class="action-btn" style="margin-top:10px;">すべてを委ね、契約する</button>
        </div>
    `;

    // ソフィアからの契約を促すセリフを表示
    updateSpeakerVisibility(threeCardSpeakerEl, threeCardTextEl, "ソフィア");
    const contractPromptText = "さあ、これが「本契約」の決済条件よ。提示された条件をよく読んで、そのスマートフォンからすべてを委ねる誓いを立ててちょうだい";

    // プロンプトを非表示化し、クリック待ちを解除
    threeCardClickPrompt.classList.add("hidden");
    threeCardClickPrompt.onclick = null;
    threeCardTextEl.parentElement.onclick = null;

    typeDialogueText(contractPromptText, threeCardTextEl);

    document.getElementById("contract-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        gameState.isCardRevealed = true;
        gameState.selectedOptionDesc = "契約は完了しました。おめでとう。これであなたの運命は、コミュニティの完璧な計画線へと固定されました。もう、何も思い悩む必要はありません。";
        const form = document.querySelector(".three-card-container .soul-card-form");
        if (form) form.remove();
        updateSpeakerVisibility(threeCardSpeakerEl, threeCardTextEl, "ソフィア");
        typeDialogueText(gameState.selectedOptionDesc, threeCardTextEl);
        threeCardClickPrompt.classList.remove("hidden");
    });
}

// --- symbol Selection (In Chat View) ---
export function renderSymbolSelection(step) {
    const chatInteractiveZoneEl = document.getElementById("chat-interactive-zone");
    chatInteractiveZoneEl.innerHTML = "";

    // Show symbols buttons dynamically in chat bottom
    const symbolContainer = document.createElement("div");
    symbolContainer.className = "symbol-container";
    symbolContainer.style.marginTop = "0";

    const btnWrapper = document.createElement("div");
    btnWrapper.className = "symbol-buttons";

    if (step === 11) {
        const scaleBtn = document.createElement("button");
        scaleBtn.className = "symbol-btn";
        scaleBtn.textContent = "天秤（因果応報）";
        scaleBtn.addEventListener("click", () => {
            pushChatMessage("Player", "天秤を選択する", true);
            triggerPsycheScan("scale");
        });

        const swordBtn = document.createElement("button");
        swordBtn.className = "symbol-btn";
        swordBtn.textContent = "剣（感情の排除）";
        swordBtn.addEventListener("click", () => {
            pushChatMessage("Player", "剣を選択する", true);
            triggerPsycheScan("sword");
        });

        btnWrapper.appendChild(scaleBtn);
        btnWrapper.appendChild(swordBtn);
    } else {
        const chainsBtn = document.createElement("button");
        chainsBtn.className = "symbol-btn";
        chainsBtn.textContent = "緩い首輪の鎖（依存）";
        chainsBtn.addEventListener("click", () => {
            pushChatMessage("Player", "緩い首輪の鎖を選択する", true);
            triggerPsycheScan("chains");
        });
        btnWrapper.appendChild(chainsBtn);
    }

    symbolContainer.appendChild(btnWrapper);
    chatInteractiveZoneEl.appendChild(symbolContainer);
    scrollToBottom();
}

export function triggerPsycheScan(choice) {
    const chatInteractiveZoneEl = document.getElementById("chat-interactive-zone");
    chatInteractiveZoneEl.innerHTML = "";
    psycheScanOverlay.classList.remove("hidden");

    let dataset = [];
    if (choice === "scale") {
        dataset = [
            { label: "孤立への恐怖度", val: "92% [HIGH]" },
            { label: "自己正当化への欲求", val: "85%" },
            { label: "他者攻撃の親和性", val: "78%" }
        ];
    } else if (choice === "sword") {
        dataset = [
            { label: "罪悪感の抑圧度", val: "88% [WARNING]" },
            { label: "論理武装化率", val: "94%" },
            { label: "感情乖離指数", val: "81%" }
        ];
    } else {
        dataset = [
            { label: "決断放棄への欲求", val: "99% [CRITICAL]" },
            { label: "自律意思の損失率", val: "90%" },
            { label: "システムへの盲従同調率", val: "98%" }
        ];
    }

    psycheScanOverlay.innerHTML = `
        <div class="psyche-scan-box">
            <div class="psyche-scan-title">PSYCHE ANALYSIS SCANNING...</div>
            <div class="psyche-data-list">
                ${dataset.map(item => `
                    <div class="psyche-data-item">
                        <span>${item.label}</span>
                        <span>${item.val}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    setTimeout(() => {
        psycheScanOverlay.classList.add("hidden");

        let desc = "";
        if (choice === "scale") {
            desc = "【天秤のシンボルを選択】 「因果応報」の背景が脳内に流し込まれる。同僚の不正を徹底的に暴き、相手を吊るし上げるべきとの指示。➔ 勝利しましたが、冷酷な告発者として職場内での孤立が始まりました。";
        } else if (choice === "sword") {
            desc = "【剣のシンボルを選択】 「感情の排除と決別」の哲学を学ぶ。裏で上層部に冷徹に根回しを行い、同僚を静かに排除する指示。➔ 目的は達成しましたが、冷酷な手段に心に罪悪感が残りました。";
        } else if (choice === "chains") {
            desc = "【緩い鎖のシンボルを選択】 「彼らは自分の意志で囚われ続けている」という逆説を学ぶ。『今のままでいいの。考えるのをやめて、この甘い檻に身を委ねなさい』 ➔ 完全な思考停止の完成。";
        }

        gameState.isCardRevealed = true;
        gameState.selectedOptionDesc = desc;
        pushChatMessage("The Journey", gameState.selectedOptionDesc);

        chatInteractiveZoneEl.innerHTML = `<button class="action-btn" id="chat-next-btn">トークを進める</button>`;
        document.getElementById("chat-next-btn").addEventListener("click", advanceGame);
        scrollToBottom();
    }, 2000);
}

// --- Loop 2 Step 1: Drag-and-drop Word Puzzle ---
export function renderSymbolicDragPuzzle() {
    gameState.isCardRevealed = false;

    const slotsArea = document.getElementById("puzzle-slots");
    const paletteArea = document.getElementById("puzzle-palette");

    slotsArea.innerHTML = "";
    paletteArea.innerHTML = `
        <div class="symbolic-stone" id="stone-self">内省の鏡 (自律)</div>
        <div class="symbolic-stone" id="stone-control">他者拒逆 (盲従)</div>
    `;

    const selfStone = document.getElementById("stone-self");
    const controlStone = document.getElementById("stone-control");

    // Load High Priestess card
    const cardData = { id: 2, title: "II : 女教皇", upright: false, desc: "" };
    const cardWrapper = createCardElement(cardData, 0, false);
    cardWrapper.classList.add("revealed");
    slotsArea.appendChild(cardWrapper);

    // カードを全画面表示
    focusTarotCard(2, false, TAROT_IMAGES[2]);

    setupStoneDrag(selfStone, cardWrapper, "self");
    setupStoneDrag(controlStone, cardWrapper, "control");
}

export function setupStoneDrag(stone, targetCard, type) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;

    stone.addEventListener("pointerdown", (e) => {
        isDragging = true;
        stone.setPointerCapture(e.pointerId);
        stone.classList.add("dragging");

        startX = e.clientX;
        startY = e.clientY;
        stone.style.transition = "none";
    });

    stone.addEventListener("pointermove", (e) => {
        if (!isDragging) return;

        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        stone.style.transform = `translate(${currentX}px, ${currentY}px)`;
    });

    stone.addEventListener("pointerup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        stone.releasePointerCapture(e.pointerId);
        stone.classList.remove("dragging");

        const stoneRect = stone.getBoundingClientRect();
        const targetRect = targetCard.getBoundingClientRect();

        if (
            stoneRect.right > targetRect.left &&
            stoneRect.left < targetRect.right &&
            stoneRect.bottom > targetRect.top &&
            stoneRect.top < targetRect.bottom
        ) {
            handlePuzzleChoice(type, stone);
        } else {
            stone.style.transition = "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)";
            stone.style.transform = "translate(0px, 0px)";
        }
    });
}

export function handlePuzzleChoice(type, stoneEl) {
    const palette = document.getElementById("puzzle-palette");
    if (palette) palette.remove();

    stoneEl.style.transition = "all 0.5s ease-out";
    stoneEl.style.transform = "scale(0) rotate(180deg)";
    stoneEl.style.opacity = "0";

    gameState.isCardRevealed = true;

    if (type === "self") {
        gameState.selectedOptionDesc = "【自律ルート】あなたは気づいた。冷酷になっているのは相手ではなく、対話を拒絶している自分自身の心の影（投影）ではないか。あなたは上司と誠実に対話することを選択した。運命の歯車が初めて本来の軌道から外れた！";
    } else {
        gameState.selectedOptionDesc = "【盲従ルート】あなたはカードの言葉を『相手の冷酷さ』と解釈し、冷たい沈黙で相手を拒絶した。しかしそれはあなたの「相手を拒絶する心」を映した鏡だった。関係はさらに悪化し、再び『悪魔』の依存と『塔』の崩壊バッドエンドへ向かう。";
    }

    setTimeout(() => {
        stoneEl.remove();
        updateSpeakerVisibility(puzzleSpeakerEl, puzzleTextEl, "運命の託宣");
        typeDialogueText(gameState.selectedOptionDesc, puzzleTextEl);
        puzzleClickPrompt.classList.remove("hidden");
    }, 500);
}

// --- Loop 2 Step 2: Meta-Puzzle Setup ---
export function loadMetaStarStep() {
    currentArcanaEl.textContent = "XVII : THE STAR (希望の星)";
    talkSpeakerEl.textContent = "ソフィア (エラー状態)";

    updateBackgroundAndAesthetics();
    typeDialogueText("警告。ここから先は定められた運命にはありません。しかし、システムはあなたに再び「塔」の破滅を引かせようとしています。従ってはならない……！", talkTextEl);

    talkCardsContainer.innerHTML = "";

    const doomCard = document.createElement("div");
    doomCard.className = "card-wrapper draggable card-glitch-2";
    doomCard.id = "doomed-card";

    const back = document.createElement("div");
    back.className = "card-face card-back";
    const front = document.createElement("div");
    front.className = "card-face card-front";

    const imgSlot = document.createElement("div");
    imgSlot.className = "card-image-slot";
    imgSlot.style.backgroundImage = `url('${TAROT_IMAGES[16]}')`;

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = "XVI : 運命の崩壊";

    const orient = document.createElement("div");
    orient.className = "card-orientation orientation-reversed";
    orient.textContent = "強制執行";

    front.appendChild(imgSlot);
    front.appendChild(title);
    front.appendChild(orient);
    doomCard.appendChild(back);
    doomCard.appendChild(front);

    talkCardsContainer.appendChild(doomCard);

    doomCard.addEventListener("click", () => {
        if (gameState.isCardRevealed) return;
        revealCard(doomCard, "【運命の拒絶失敗】あなたは再び提示されたカードをめくってしまいました。それは破滅の塔です。");
    });

    let discardZone = document.getElementById("discard-zone");
    if (!discardZone) {
        discardZone = document.createElement("div");
        discardZone.id = "discard-zone";
        discardZone.innerHTML = "<span>ここにカードをドラッグして「運命」を捨てる</span>";
        document.getElementById("game-wrapper").appendChild(discardZone);
    }
    discardZone.classList.add("visible");

    setupCardDrag(doomCard, discardZone);
}

// --- Pointer Events Drag & Drop for Meta-puzzle ---
export function setupCardDrag(card, dropzone) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;

    card.addEventListener("pointerdown", (e) => {
        if (gameState.isCardRevealed) return;
        isDragging = true;
        card.setPointerCapture(e.pointerId);

        startX = e.clientX;
        startY = e.clientY;
        card.style.transition = "none";
        card.style.zIndex = "1000";
    });

    card.addEventListener("pointermove", (e) => {
        if (!isDragging) return;

        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        card.style.transform = `translate(${currentX}px, ${currentY}px) scale(0.95)`;

        const cardRect = card.getBoundingClientRect();
        const zoneRect = dropzone.getBoundingClientRect();

        if (
            cardRect.right > zoneRect.left &&
            cardRect.left < zoneRect.right &&
            cardRect.bottom > zoneRect.top &&
            cardRect.top < zoneRect.bottom
        ) {
            dropzone.classList.add("dragover");
        } else {
            dropzone.classList.remove("dragover");
        }
    });

    card.addEventListener("pointerup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        card.releasePointerCapture(e.pointerId);

        card.style.transition = "transform 0.3s ease";

        const cardRect = card.getBoundingClientRect();
        const zoneRect = dropzone.getBoundingClientRect();

        if (
            cardRect.right > zoneRect.left &&
            cardRect.left < zoneRect.right &&
            cardRect.bottom > zoneRect.top &&
            cardRect.top < zoneRect.bottom
        ) {
            triggerFateBrokenByDrag(card, dropzone);
        } else {
            card.style.transform = "translate(0px, 0px)";
            card.style.zIndex = "";
            dropzone.classList.remove("dragover");
        }
    });
}

export function triggerFateBrokenByDrag(card, dropzone) {
    gameState.isFateControlled = false;
    dropzone.classList.remove("dragover");
    dropzone.classList.remove("visible");

    card.style.transition = "all 0.5s ease-in";
    card.style.transform = "translate(0, 150px) scale(0) rotate(720deg)";
    card.style.opacity = "0";

    setTimeout(() => {
        card.remove();
        advanceGame();
    }, 600);
}

// --- True Ending Unlock ---
export function triggerTrueEndingUnlock() {
    // 既存の進行用イベントリスナーをクリアして無限ループを防止
    talkClickPrompt.onclick = null;
    talkClickPrompt.classList.add("hidden");
    talkTextEl.parentElement.onclick = null;

    gameState.isCardRevealed = false; // カードめくりフラグをリセット

    sceneBgEl.style.opacity = 0.15;

    // step-30 で最終カード（愚者）を引き終わっているので、すぐにエンディングオーバーレイを表示する
    showTrueEndingOverlay();
}

export function showTrueEndingOverlay() {
    endingOverlay.classList.remove("hidden");
    
    // パーティクル生成
    const particlesContainer = document.getElementById("ending-particles");
    if (particlesContainer) {
        particlesContainer.innerHTML = "";
        for (let i = 0; i < 60; i++) {
            const particle = document.createElement("div");
            particle.className = "gold-particle";
            particle.style.left = Math.random() * 100 + "vw";
            const size = Math.random() * 5 + 2;
            particle.style.width = size + "px";
            particle.style.height = size + "px";
            particle.style.animationDuration = (Math.random() * 4 + 3) + "s";
            // マイナスのディレイを設定することで、アニメーションが既に進行している状態から開始し、最初から画面全体にパーティクルが存在するようにする
            particle.style.animationDelay = "-" + (Math.random() * 5) + "s";
            particlesContainer.appendChild(particle);
        }
    }

    endingTitle.textContent = "0 : THE FOOL (新たなはじまり)";
    endingTitle.style.color = "var(--color-gold)";

    // Generate cards retrospection flow (走馬灯)
    const cardsArray = Array.from(gameState.discoveredCards).slice(0, 10); // Limit to 10 for clean look
    const cardFlowHtml = `
        <style>
            @keyframes endingFadeInUp {
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
        <div style="margin: 15px 0; text-align: center;">
            <div style="font-size: 11px; color: var(--color-gold); letter-spacing: 2px; margin-bottom: 8px; font-family: var(--font-serif);">DISCOVERED PATHWAY</div>
            <div class="ending-card-flow" style="display: flex; gap: 8px; justify-content: center; overflow-x: auto; padding: 10px 5px; width: 100%; max-width: 450px; margin: 0 auto; scrollbar-width: none; -ms-overflow-style: none;">
                ${cardsArray.map((cardId, index) => {
                    const imgUrl = `/images/cards/${cardId}.jpg`;
                    return `
                        <div style="flex: 0 0 42px; height: 70px; border: 1px solid var(--color-gold); border-radius: 3px; background-image: url('${imgUrl}'); background-size: cover; background-position: center; box-shadow: 0 4px 8px rgba(0,0,0,0.4); opacity: 0; transform: translateY(8px); animation: endingFadeInUp 0.5s ease forwards; animation-delay: ${index * 150}ms;"></div>
                    `;
                }).join("")}
            </div>
        </div>
    `;

    endingDesc.innerHTML = `
        ${cardFlowHtml}
        <div style="text-align: left; line-height: 1.8; font-size: 14px; color: var(--color-text-light); max-width: 500px; margin: 0 auto;">
            プレイヤーとともに学ぶタロットの旅はどうでしたか。<br><br>
            占い師という「人の心に問いかける」存在は、盲信して従うべき「運命の支配者」ではありません。<br>
            時に迷い立ち止まったあなたの心へ、そっと鏡のようにアドバイスを映し出してくれるだけの存在です。<br><br>
            大切なのは、そのアドバイスを受け取ったうえで、<br>
            <span style="color: var(--color-gold); font-weight: bold;">「自らの意志で選択し、行動するのは自分自身だ」</span>ということに気づくこと。<br><br>
            そのことに気づできたあなたなら、これからの現実の旅路も、自分の足で力強く歩んでいけるはずです。<br><br>
            あなたのこれからの旅に、本物の祝福がありますように。
        </div>
    `;
    restartBtn.textContent = "対話鑑賞モードをアンロックする";
    restartBtn.onclick = () => {
        gameState.trueEndCleared = true;
        saveState();
        initGame();
    };
}

// --- Meditation Mode (Daily Tarot) ---
export function initMeditationMode() {
    gameContainer.classList.add("hidden");
    meditationContainer.classList.remove("hidden");
    endingOverlay.classList.add("hidden");

    document.querySelector(".status-title").textContent = "DAILY MEDITATION";
    document.getElementById("current-arcana").textContent = "DAILY TAROT";
    document.getElementById("loop-count").textContent = "CLEAR";

    sceneBgEl.style.backgroundImage = "url('/images/tarot_room.png')";
    sceneBgEl.style.opacity = 0.4;

    meditationCardZone.innerHTML = `<button id="draw-meditation-btn" class="action-btn">カードを1枚引く</button>`;
    meditationDialogue.classList.add("hidden");
    meditationSymbols.classList.add("hidden");
    resetMeditationBtn.classList.add("hidden");

    document.getElementById("draw-meditation-btn").addEventListener("click", drawMeditationCard);
}

export function drawMeditationCard() {
    // プレイヤーが発見した（discoveredCardsに含まれる）カードのうち、瞑想シンボルが定義されているものだけを対象にする
    let availableKeys = Array.from(gameState.discoveredCards).filter(key => MEDITATION_SYMBOLS[key] !== undefined);

    // もし1枚も発見されていない場合は、0 (愚者) をデフォルトとする
    if (availableKeys.length === 0) {
        availableKeys = [0];
    }

    const randKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
    const metadata = MEDITATION_SYMBOLS[randKey];

    meditationCardZone.innerHTML = "";

    const cardData = { id: randKey, title: metadata.title, upright: true, desc: "" };
    const cardWrapper = createCardElement(cardData, 0, false);
    meditationCardZone.appendChild(cardWrapper);

    setTimeout(() => {
        cardWrapper.classList.add("revealed");

        // カードを全画面表示
        focusTarotCard(randKey, true, TAROT_IMAGES[randKey]);

        meditationSymbolButtons.innerHTML = "";
        metadata.symbols.forEach((symbol) => {
            const btn = document.createElement("button");
            btn.className = "symbol-btn";
            btn.textContent = symbol.name;
            btn.addEventListener("click", () => selectMeditationSymbol(symbol));
            meditationSymbolButtons.appendChild(btn);
        });

        meditationDialogue.classList.remove("hidden");
        meditationSymbols.classList.remove("hidden");
        resetMeditationBtn.classList.remove("hidden");

        typeDialogueText(`今日のあなたのカードは『${metadata.title}』です。カードの絵柄から、今あなたの心が最も惹かれるシンボルを選んでください。`, meditationText);
    }, 500);
}

export function selectMeditationSymbol(symbol) {
    meditationSymbols.classList.add("hidden");
    typeDialogueText(`【${symbol.name}の象徴】<br>${symbol.text}`, meditationText);
}
