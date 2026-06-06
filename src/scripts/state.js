/**
 * PROJECT FOOL - Game State Management
 */

export const gameState = {
    currentLoop: 1,
    currentStep: 0,
    isCardRevealed: false,
    selectedOptionDesc: "",
    isFateControlled: true,
    trueEndCleared: false,
    currentView: "talk",
    currentDialoguePages: [],
    currentDialoguePageIndex: 0,
    currentThreeCardIndex: 0,
    isThreeCardAnimating: false,
    activeDialogueSpeaker: "",
    isTyping: false,
    skipTyping: null,
    pendingStepLoad: null,
    debugPageCounter: 0, // デバッグ用テキスト連番
    pendingPageCallback: null, // ページ送り中の「次ページを表示する」コールバック

    // カード図鑑（一度引いたカードのIDを格納するセット）
    discoveredCards: new Set(),
    // 読了したスリーカードのセット
    openedThreeCardCards: new Set(),
    // チュートリアルモーダルの表示完了フラグ
    hasSeenCollectionTutorial: false,

    // Gauge values
    stressVal: 80,
    luckVal: 15
};

export function loadSaveState() {
    const savedLoop = localStorage.getItem("fools_journey_loop");
    const savedStep = localStorage.getItem("fools_journey_step");
    const isCleared = localStorage.getItem("fools_journey_cleared");
    const savedCards = localStorage.getItem("fools_journey_discovered_cards");
    const seenTutorial = localStorage.getItem("fools_journey_seen_col_tutorial");

    if (isCleared === "true") {
        gameState.trueEndCleared = true;
    }
    if (savedLoop) {
        gameState.currentLoop = parseInt(savedLoop, 10);
    }
    if (savedStep) {
        gameState.currentStep = parseInt(savedStep, 10);
    }
    if (savedCards) {
        gameState.discoveredCards = new Set(JSON.parse(savedCards));
    } else {
        gameState.discoveredCards = new Set();
    }
    if (seenTutorial === "true") {
        gameState.hasSeenCollectionTutorial = true;
    }

    // URLパラメータによる上書き (デバッグ・個別起動用)
    const params = new URLSearchParams(window.location.search);
    const paramLoop = params.get('loop');
    const paramStep = params.get('step');
    if (paramLoop) {
        gameState.currentLoop = parseInt(paramLoop, 10);
    }
    if (paramStep) {
        gameState.currentStep = parseInt(paramStep, 10);
    }
}

export function saveState() {
    localStorage.setItem("fools_journey_loop", gameState.currentLoop);
    localStorage.setItem("fools_journey_step", gameState.currentStep);
    localStorage.setItem("fools_journey_cleared", gameState.trueEndCleared);
    localStorage.setItem("fools_journey_discovered_cards", JSON.stringify(Array.from(gameState.discoveredCards)));
    localStorage.setItem("fools_journey_seen_col_tutorial", gameState.hasSeenCollectionTutorial ? "true" : "false");

    // URLのパラメータを更新
    const url = new URL(window.location.href);
    url.searchParams.set('loop', gameState.currentLoop);
    url.searchParams.set('step', gameState.currentStep);
    window.history.replaceState({}, '', url.toString());
}

export function discoverCard(cardId) {
    if (cardId === undefined || cardId === null) return;
    const numericId = parseInt(cardId, 10);
    if (!isNaN(numericId) && numericId >= 0 && numericId <= 21) {
        if (!gameState.discoveredCards.has(numericId)) {
            gameState.discoveredCards.add(numericId);
            saveState();
        }
    }
}
