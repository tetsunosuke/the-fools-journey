/**
 * PROJECT FOOL - Rebuilt Game Engine with Multi-Scene UI & Chatbot Mechanics
 */

// --- Rider-Waite Tarot Images (Local Assets) ---
const TAROT_IMAGES = {
    0: "/images/cards/0.jpg",
    1: "/images/cards/1.jpg",
    2: "/images/cards/2.jpg",
    3: "/images/cards/3.jpg",
    4: "/images/cards/4.jpg",
    5: "/images/cards/5.jpg",
    6: "/images/cards/6.jpg",
    7: "/images/cards/7.jpg",
    8: "/images/cards/8.jpg",
    9: "/images/cards/9.jpg",
    10: "/images/cards/10.jpg",
    11: "/images/cards/11.jpg",
    12: "/images/cards/12.jpg",
    13: "/images/cards/13.jpg",
    14: "/images/cards/14.jpg",
    15: "/images/cards/15.jpg",
    16: "/images/cards/16.jpg",
    17: "/images/cards/17.jpg",
    18: "/images/cards/18.jpg",
    19: "/images/cards/19.jpg",
    20: "/images/cards/20.jpg",
    21: "/images/cards/21.jpg"
};

/// --- Soul Cards Mapping ---
const SOUL_CARDS = {
    0: { name: "0 : 愚者", desc: "無限の可能性と無計画。君は常に新しい旅を求め、他者のルールに染まりやすい脆弱さを持っています。", trueDesc: "自由、純粋、無限の可能性。先入観にとらわれず、未知の旅へ踏み出す勇気。" },
    1: { name: "I : 魔術師", desc: "知恵と技術。君は優れた能力を持っていますが、それゆえに完璧なシステムによる統制を望んでしまうのです。", trueDesc: "創造力、技術、意志の具体化。自らの可能性を信じ、能動的に現実を作り出す力。" },
    2: { name: "II : 女教皇", desc: "直感と知識。君は真実を見通す力がありながら、自ら思考を閉ざし、静観という名の盲信を選びがちです。", trueDesc: "直感、知恵、内省。自らの内なる声に耳を傾け、客観的に真実を見極める静かな洞察力。" },
    3: { name: "III : 女帝", desc: "豊穣と愛. 君は物質的・精神的な満たしを求め、それを約束してくれるシステムに身を委ねてしまいます。", trueDesc: "豊穣、愛、育み。精神的・物質的な豊かさを感じ、生命や関係性を育む慈愛。" },
    4: { name: "IV : 皇帝", desc: "支配と社会的責任。君は安定した秩序を重んじるがゆえに、アプリの提示する強力なルールを歓迎します。", trueDesc: "秩序、責任、自己統治。自らを律し、現実世界で強固な基盤と安定した意思決定を確立する力。" },
    5: { name: "V : 法王", desc: "規律と指導. 君は正解を教えてくれる絶対的な存在を信じることで、自ら考える責任を放棄します。", trueDesc: "教え、精神的導き、信念。知識やルールを学びつつも、それを自らの生きる知恵として統合する姿勢。" },
    6: { name: "VI : 恋人たち", desc: "選択と調和。君は運命的な出会いや情動に流されやすく、愛のためにすべてを投げ出す危険があります。", trueDesc: "選択、調和、真の結びつき。自らの価値観に基づいて能動的に選択し、他者や環境と調和する力。" },
    7: { name: "VII : 戦車", desc: "勝利と前進。君は目に見える成果を急ぐあまり、そのレールがどこへ続くかを確かめることを忘れます。", trueDesc: "前進、克服、自己制御。目的意識を持って能動的に進み、困難や矛盾を乗り越える強い意志。" },
    8: { name: "VIII : 力", desc: "忍耐と信念。君は苦境に耐える強さを持っていますが、それが不条理なシステムへの服従に変わる恐れがあります。", trueDesc: "精神的な強さ、忍耐、自己受容。衝動や恐れを否定せず、優しさと対話をもってコントロールする内なる力。" },
    9: { name: "IX : 隠者", desc: "探求と静寂。君は自己の内省を深めようとしますが、孤独への恐れからシステムの灯火にすがりつきます。", trueDesc: "探求、静寂、精神逆立。外的な喧騒から距離を置き、自らの心の内奥にある真実を照らす灯火を見つけること。" },
    10: { name: "X : 運命の輪", desc: "変化と好機。君は状況の移り変わりに一喜一憂し、自ら車輪を回すのではなく運命任せになります。", trueDesc: "変化、転換、タイミング。自らの行動と周囲の流れの相互作用を理解し、主体的に運命の車輪を回すこと。" },
    11: { name: "XI : 正義", desc: "客観性と決断。君は正しさに固執するあまり、冷酷な裁きを下し、孤立と罪悪感に苛まれます。", trueDesc: "均衡、決断、客観的真実。自らの行動と結果の因果関係を客観的に受け止め、公正な決断を下すこと。" },
    12: { name: "XII : 吊られた男", desc: "試練と自己犠牲。君は耐えることを美徳とし、システムのために自分を犠牲にする愚行を受け入れます。", trueDesc: "視点の転換、手放し、自発的受容。これまでの執着を捨て去ることで、新しい視点や深い洞察を得ること。" },
    13: { name: "XIII : 死神", desc: "終焉と再生。君は変化を恐れるあまり、終わらせるべき関係やシステムにしがみつき続けます。", trueDesc: "古いものの終焉と新たな始まり。不要になった関係や思考パターンを手放し、再生を受け入れるプロセス。" },
    14: { name: "XIV : 節制", desc: "調和と純化。君はバランスを好みますが、それは葛藤を避けて現状維持に甘んじることでもあります。", trueDesc: "調和、統合、節度。対立する要素を巧みに組み合わせ、自らの心身の最適なバランスを保ち続ける力。" },
    15: { name: "XV : 悪魔", desc: "束縛と物質欲。君は甘美な檻と依存の心地よさに完全に絡め取られ、抜け出せなくなっています。", trueDesc: "欲望の自覚、囚われからの解放。自らを縛る執着や依存の影（シャドウ）を認識し、真の自由を取り戻す出発点。" },
    16: { name: "XVI : 塔", desc: "崩壊と劇変。君は積み上げた偽りが崩れ去る恐怖を知りながら、なお再建の約束をシステムに求めます。", trueDesc: "崩壊、覚醒、真実の露呈。偽りの塔が壊れることで、囚われていた自己が解放され、真の現実に直面すること。" },
    17: { name: "XVII : 星", desc: "希望と憧れ。君は遠い理想を夢見ながら、足元の現実を直視せず、美しい幻影を盲信します。", trueDesc: "希望、インスピレーション、心の安らぎ。嵐のあとに輝く星のように、内なる無限のインスピレーションと未来への希望。" },
    18: { name: "XVIII : 月", desc: "不安と欺瞞。君は不確かさに怯え、偽りの真実を提示する占い師の言葉を鵜呑みにしてしまいます。", trueDesc: "深層心理、欺瞞の打破、心の闇との対峙。不確かさや不安を直視し、幻想に惑わされずに自らの本質を探ること。" },
    19: { name: "XIX : 太陽", desc: "活力と祝福。君は明るい未来を信じて疑いませんが、それは影（シャドウ）を無視した盲目的楽観です。", trueDesc: "活力、光、成功、無邪気さ。自らの影をも受け入れたうえで、無垢な生命力と自己表現を満開に輝かせること。" },
    20: { name: "XX : 審判", desc: "復活と覚醒。君は過去の過ちからの救済を望み、システムの審判に自らの免罪を委ねます。", trueDesc: "自己再評価、覚醒、真の解放。過去の歩みを統合し、新しい呼び声に応じて本来の自分として目覚めること。" },
    21: { name: "XXI : 世界", desc: "完成と全体性。君は完璧な調和を求めますが、それは自律意思を失ったディストピアでの完成にすぎません。", trueDesc: "全体性、統合、完成。自律的な旅を経て、自己と世界のすべてが調和し、完成されたひとつの宇宙となること。" }
};

// --- Celtic Cross Configuration ---
const CELTIC_CARDS_DATA = [
    { pos: "1. 現在の状況", name: "0 : 愚者 (正)", img: "/images/cards/0.jpg", desc: "君は今、盲目的に日常の旅に出発したばかりの無垢なる愚者です。", area: "present" },
    { pos: "2. 直面する障害", name: "ソードのA (正)", img: "/images/cards/swords01.jpg", desc: "【ソードの要素】理性的に切り裂こうとする意志が、逆に君の直感を阻む障害となっています。考えることはノイズなのです。", area: "present", rotate: true },
    { pos: "3. 意識していること", name: "カップの3 (正)", img: "/images/cards/cups03.jpg", desc: "【カップの要素】君は周囲との調和や仲間との楽しい時間を表面的に求めています。", area: "conscious" },
    { pos: "4. 潜在意識・根底", name: "ペンタクルの5 (逆)", img: "/images/cards/pents05.jpg", desc: "【ペンタクルの要素】物質的・精神的な欠乏感や、見捨てられることへの強い不安が君の行動原理になっています。", area: "unconscious" },
    { pos: "5. 過去の要因", name: "ワンドの2 (正)", img: "/images/cards/wands02.jpg", desc: "【ワンドの要素】君はかつて野心を抱き、新たな地平へ踏み出そうと決断しました。", area: "past" },
    { pos: "6. 近い未来", name: "XV : 悪魔 (正)", img: "/images/cards/15.jpg", desc: "近い未来、君は甘美な依存と束縛を受け入れ、自律意思を手放すでしょう。", area: "future" },
    { pos: "7. 君の立場", name: "ソード of 5 (正)", img: "/images/cards/swords05.jpg", desc: "【ソードの要素】君は利己的に勝利を収めようとして、孤独や敗北感を味わうことになります。", area: "staff-1" },
    { pos: "8. 周囲の環境", name: "カップ of 10 (正)", img: "/images/cards/cups10.jpg", desc: "【カップの要素】周囲は偽りの満ち足りた幸福感に包まれており、君がコミュニティに同調することを求めています。", area: "staff-2" },
    { pos: "9. 望みと恐れ", name: "ワンド of 9 (正)", img: "/images/cards/wands09.jpg", desc: "【ワンドの要素】君は傷つきながらも身を守ろうとし、他者を警戒しています。", area: "staff-3" },
    { pos: "10. 最終結果", name: "XXI : 世界 (正)", img: "/images/cards/21.jpg", desc: "最終的に、君はシステムと同調し、一切の葛藤がない『ディストピア的な完成』へと至るでしょう。", area: "staff-4" }
];

// --- Meditation Mode ---
const MEDITATION_MOTIFS = {
    0: {
        title: "0 : 愚者",
        motifs: [
            { name: "崖の縁", text: "君が崖の縁に惹かれたのは、今まさに新しい一歩を踏み出したい、あるいは現状を打破したいという無意識のサインです。踏み出す前に、自分の足元を信じましょう。" },
            { name: "白い薔薇", text: "白い薔薇は純粋な動機を象徴します。他人の評価や利害関係から離れ、純粋な好奇心や初心に立ち返る時期かもしれません。" }
        ]
    }
};

// --- Multi-Scene Game Scenario (with View flags) ---
const SCENARIO = window.SCENARIO_DATA || { 1: [], 2: [] };

// --- Game State Variables ---
let currentLoop = 1;
let currentStep = 0;
let isCardRevealed = false;
let selectedOptionDesc = "";
let isFateControlled = true;
let trueEndCleared = false;
let currentView = "talk";
let currentDialoguePages = [];
let currentDialoguePageIndex = 0;
let currentCelticIndex = 0;
let isCelticAnimating = false;
let activeDialogueSpeaker = "";
let isTyping = false;
let skipTyping = null;
let pendingStepLoad = null;
let debugPageCounter = 0; // デバッグ用テキスト連番
let pendingPageCallback = null; // ページ送り中の「次ページを表示する」コールバック

// カード図鑑（一度引いたカードのIDを格納するセット）
let discoveredCards = new Set();
// チュートリアルモーダルの表示完了フラグ
let hasSeenCollectionTutorial = false;

// Gauge values
let stressVal = 80;
let luckVal = 15;

// --- DOM Elements ---
const sceneBgEl = document.getElementById("scene-bg");
const loopCountEl = document.getElementById("loop-count");
const currentArcanaEl = document.getElementById("current-arcana");
const glitchOverlay = document.getElementById("glitch-overlay");
const goldFlashOverlay = document.getElementById("gold-flash-overlay");
const endingOverlay = document.getElementById("ending-overlay");
const endingTitle = document.getElementById("ending-title");
const endingDesc = document.getElementById("ending-desc");
const restartBtn = document.getElementById("restart-btn");

// --- Game Save/Load via LocalStorage & URL Params ---
function loadSaveState() {
    const savedLoop = localStorage.getItem("fools_journey_loop");
    const savedStep = localStorage.getItem("fools_journey_step");
    const isCleared = localStorage.getItem("fools_journey_cleared");
    const savedCards = localStorage.getItem("fools_journey_discovered_cards");
    const seenTutorial = localStorage.getItem("fools_journey_seen_col_tutorial");

    if (isCleared === "true") {
        trueEndCleared = true;
    }
    if (savedLoop) {
        currentLoop = parseInt(savedLoop, 10);
    }
    if (savedStep) {
        currentStep = parseInt(savedStep, 10);
    }
    if (savedCards) {
        discoveredCards = new Set(JSON.parse(savedCards));
    } else {
        discoveredCards = new Set();
    }
    if (seenTutorial === "true") {
        hasSeenCollectionTutorial = true;
    }

    // URLパラメータによる上書き (デバッグ・個別起動用)
    const params = new URLSearchParams(window.location.search);
    const paramLoop = params.get('loop');
    const paramStep = params.get('step');
    if (paramLoop) {
        currentLoop = parseInt(paramLoop, 10);
    }
    if (paramStep) {
        currentStep = parseInt(paramStep, 10);
    }
}

function saveState() {
    localStorage.setItem("fools_journey_loop", currentLoop);
    localStorage.setItem("fools_journey_step", currentStep);
    localStorage.setItem("fools_journey_cleared", trueEndCleared);
    localStorage.setItem("fools_journey_discovered_cards", JSON.stringify(Array.from(discoveredCards)));
    localStorage.setItem("fools_journey_seen_col_tutorial", hasSeenCollectionTutorial ? "true" : "false");

    // URLのパラメータを更新
    const url = new URL(window.location.href);
    url.searchParams.set('loop', currentLoop);
    url.searchParams.set('step', currentStep);
    window.history.replaceState({}, '', url.toString());
}

// カードの発見登録ヘルパー
function discoverCard(cardId) {
    if (cardId === undefined || cardId === null) return;
    const numericId = parseInt(cardId, 10);
    if (!isNaN(numericId) && numericId >= 0 && numericId <= 21) {
        if (!discoveredCards.has(numericId)) {
            discoveredCards.add(numericId);
            saveState();
        }
    }
}

// Status gauges in header
const stressGaugeEl = document.getElementById("stress-gauge");
const luckGaugeEl = document.getElementById("luck-gauge");

// Psyche scan overlay
const psycheScanOverlay = document.getElementById("psyche-scan-overlay");

// Scene Container DOMs
const gameContainer = document.getElementById("game-container");
const viewTalk = document.getElementById("view-talk");
const viewChat = document.getElementById("view-chat");
const viewCeltic = document.getElementById("view-celtic");
const viewPuzzle = document.getElementById("view-puzzle");

// Dialogue elements per View
const talkPortraitEl = document.getElementById("talk-portrait");
const talkSpeakerEl = document.getElementById("talk-speaker");
const talkTextEl = document.getElementById("talk-text");
const talkClickPrompt = document.getElementById("talk-click-prompt");
const talkCardsContainer = document.getElementById("talk-cards-container");

const chatHistoryEl = document.getElementById("chat-history");
const chatInteractiveZoneEl = document.getElementById("chat-interactive-zone");

const cardDrawOverlay = document.getElementById("card-draw-overlay");
const cardDrawDeckContainer = document.getElementById("card-draw-deck-container");

const celticSpeakerEl = document.getElementById("celtic-speaker");
const celticTextEl = document.getElementById("celtic-text");
const celticClickPrompt = document.getElementById("celtic-click-prompt");

const puzzleSpeakerEl = document.getElementById("puzzle-speaker");
const puzzleTextEl = document.getElementById("puzzle-text");
const puzzleClickPrompt = document.getElementById("puzzle-click-prompt");

// Meditation Mode Elements
const meditationContainer = document.getElementById("meditation-container");
const drawMeditationBtn = document.getElementById("draw-meditation-btn");
const meditationCardZone = document.getElementById("meditation-card-zone");
const meditationDialogue = document.getElementById("meditation-dialogue");
const meditationText = document.getElementById("meditation-text");
const meditationMotifs = document.getElementById("meditation-motifs");
const meditationMotifButtons = document.getElementById("meditation-motif-buttons");
const resetMeditationBtn = document.getElementById("reset-meditation-btn");



// --- View Router ---
function showView(viewName) {
    viewTalk.classList.add("hidden");
    viewChat.classList.add("hidden");
    viewCeltic.classList.add("hidden");
    viewPuzzle.classList.add("hidden");

    if (viewName === "talk") viewTalk.classList.remove("hidden");
    if (viewName === "chat") viewChat.classList.remove("hidden");
    if (viewName === "celtic") viewCeltic.classList.remove("hidden");
    if (viewName === "puzzle") viewPuzzle.classList.remove("hidden");

    currentView = viewName;
}

// --- Gauge controller ---
function updateGauges(stressChange, luckChange) {
    if (currentLoop === 2) {
        stressGaugeEl.textContent = "ERR";
        luckGaugeEl.textContent = "NaN";
        return;
    }

    stressVal = Math.max(0, Math.min(100, stressVal + stressChange));
    luckVal = Math.max(0, Math.min(100, luckVal + luckChange));

    stressGaugeEl.textContent = `${stressVal}%`;
    luckGaugeEl.textContent = `${luckVal}%`;

    stressGaugeEl.classList.add("gauge-changing");
    luckGaugeEl.classList.add("gauge-changing");
    setTimeout(() => {
        stressGaugeEl.classList.remove("gauge-changing");
        luckGaugeEl.classList.remove("gauge-changing");
    }, 800);
}

// --- Initialization ---
function initGame(skipLoad = false) {
    if (!skipLoad) loadSaveState();

    if (trueEndCleared) {
        initMeditationMode();
        return;
    }

    isCardRevealed = false;
    isFateControlled = true;
    selectedOptionDesc = "";
    
    // UI resets
    loopCountEl.textContent = currentLoop;
    endingOverlay.classList.add("hidden");
    glitchOverlay.classList.remove("glitch-active");
    gameContainer.classList.remove("hidden");
    meditationContainer.classList.add("hidden");
    psycheScanOverlay.classList.add("hidden");

    // Clear chat logs
    chatHistoryEl.innerHTML = "";

    if (currentLoop === 1) {
        stressVal = 80;
        luckVal = 15;
        stressGaugeEl.textContent = `${stressVal}%`;
        luckGaugeEl.textContent = `${luckVal}%`;
    } else {
        stressGaugeEl.textContent = "ERR";
        luckGaugeEl.textContent = "NaN";
    }
    
    // Remove garbage bin if exists
    const bin = document.getElementById("discard-zone");
    if (bin) bin.remove();

    updateBackgroundAndAesthetics();
    loadStep();
}

function updateBackgroundAndAesthetics() {
    if (currentLoop === 1) {
        if (currentStep === 0) {
            sceneBgEl.style.backgroundImage = "url('/images/city_street.png')";
        } else {
            sceneBgEl.style.backgroundImage = "url('/images/tarot_room.png')";
        }
        sceneBgEl.style.opacity = 0.35;
        talkPortraitEl.classList.remove("card-glitch-1", "card-glitch-2");
    } else if (currentLoop === 2) {
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

// --- Dynamic Background Changer ---
function changeBackground(bgName) {
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

// --- ページタグ処理ユーティリティ ---
// 各種タグを処理し、テキスト表示に必要な情報を返す
// @param pageText      処理対象のページテキスト
// @param currentSpeaker 現在の話者名（更新して返す）
// @param onFocusDone   フォーカス画像を閉じた後に呼ぶコールバック
// @returns { text, speaker, skip, handled }
//   text:    タグ除去後のテキスト（表示用）
//   speaker: 更新後の話者名
//   skip:    true → このページをスキップして次へ
//   handled: true → フォーカス等でページ処理済み（テキスト表示不要）
function processPageTags(pageText, currentSpeaker, onFocusDone) {
    // [bg:画像名] → 背景変更して除去
    const bgMatch = pageText.match(/\[bg:([^\]]+)\]/);
    if (bgMatch) {
        changeBackground(bgMatch[1].trim());
        pageText = pageText.replace(/\[bg:[^\]]+\]/g, "").trim();
    }

    // [view:X] → talk ビュー内では無視してスキップ
    if (/^\[view:[^\]]+\]$/.test(pageText)) {
        return { text: pageText, speaker: currentSpeaker, skip: true, handled: false };
    }

    // [card_btn:N] → カード画像をフォーカス表示
    const cardBtnMatch = pageText.match(/^\[card_btn:(\d+)\]$/);
    if (cardBtnMatch) {
        const cardNum = cardBtnMatch[1];
        pendingStepLoad = () => { pendingStepLoad = null; onFocusDone(); };
        focusTarotCard(`カード #${cardNum}`, undefined, `/images/cards/${cardNum}.jpg`);
        return { text: "", speaker: currentSpeaker, skip: false, handled: true };
    }

    // [focus:画像パス:タイトル] → 画像をフォーカス表示
    const focusMatch = pageText.match(/^\[focus:([^:\]]+):?(.*)\]$/);
    if (focusMatch) {
        pendingStepLoad = () => { pendingStepLoad = null; onFocusDone(); };
        focusTarotCard(focusMatch[2].trim() || "", undefined, focusMatch[1].trim());
        return { text: "", speaker: currentSpeaker, skip: false, handled: true };
    }

    // [speaker:名前] → 話者更新（本文が続く場合はそのまま表示）
    const speakerMatch = pageText.match(/^\[speaker:([^\]]+)\]\r?\n?([\s\S]*)$/);
    if (speakerMatch) {
        currentSpeaker = speakerMatch[1].trim();
        pageText = speakerMatch[2].trim();
    }

    // 残留タグをすべて除去（安全フォールバック）
    pageText = pageText.replace(/\[[^\]]+\]/g, "").trim();

    // 空ページ → スキップ
    if (pageText.length === 0) {
        return { text: "", speaker: currentSpeaker, skip: true, handled: false };
    }

    return { text: pageText, speaker: currentSpeaker, skip: false, handled: false };
}

// --- 長いセリフを約3行（MAX_LINE_CHARS文字）で自動分割 ---
const MAX_LINE_CHARS = 80; // この文字数を超えたら次のページへ

function autoSplitTextIntoPages(text, maxChars = MAX_LINE_CHARS) {
    // まず明示的な段落区切り(\n\n)があれば先にそこで分割し再帰処理
    if (/\n[\s]*\n/.test(text)) {
        return text.split(/\n[\s]*\n/)
            .map(p => p.trim())
            .filter(p => p.length > 0)
            .flatMap(p => autoSplitTextIntoPages(p, maxChars));
    }

    if (text.length <= maxChars) return [text];

    const pages = [];
    let remaining = text;

    while (remaining.length > maxChars) {
        // maxChars〜maxChars*1.8の範囲で自然な文末を後ろから探す
        const searchEnd = Math.min(remaining.length - 1, Math.floor(maxChars * 1.8));
        let breakPoint = -1;

        for (let i = searchEnd; i >= Math.floor(maxChars * 0.5); i--) {
            const ch = remaining[i];
            if (ch === '。' || ch === '！' || ch === '？' || ch === '」' || ch === '\n') {
                breakPoint = i + 1;
                break;
            }
        }

        // 自然な区切りが見つからなければmaxCharsで強制改ページ
        if (breakPoint === -1) breakPoint = maxChars;

        pages.push(remaining.substring(0, breakPoint).trim());
        remaining = remaining.substring(breakPoint).trim();
    }

    if (remaining.length > 0) pages.push(remaining);
    return pages;
}

// --- 汎用ページ送り表示 ---
function showPaginatedText(text, textEl, promptEl, onAllDone, defaultSpeaker = "") {
    const pages = autoSplitTextIntoPages(text);
    let idx = 0;
    const isTalkView = textEl === talkTextEl;
    let currentSpeakerState = defaultSpeaker;

    function goNext() {
        if (idx < pages.length - 1) { idx++; showPage(); }
        else { onAllDone(); }
    }

    function showPage() {
        promptEl.classList.add("hidden");

        const result = processPageTags(pages[idx], currentSpeakerState, goNext);
        currentSpeakerState = result.speaker;

        if (result.handled) return; // フォーカス等で処理済み
        if (result.skip) { goNext(); return; } // スキップ対象

        if (isTalkView) {
            updateSpeakerVisibility(talkSpeakerEl, talkTextEl, currentSpeakerState);
        }

        const pageId = `L${currentLoop}-S${currentStep}-P${idx + 1}`;
        console.log(`[Dialogue ID] ${pageId} | Length: ${result.text.length} | Content: ${result.text}`);
        typeDialogueText(result.text, textEl, () => {
            if (idx < pages.length - 1) {
                promptEl.classList.remove("hidden");
                pendingPageCallback = () => { pendingPageCallback = null; idx++; showPage(); };
            } else {
                onAllDone();
            }
        });
    }

    showPage();
}

// --- Load current scenario step ---
function loadStep() {
    isCardRevealed = false;
    selectedOptionDesc = "";
    
    const stepData = SCENARIO[currentLoop][currentStep];
    
    // arcana フィールドに「N日目」が含まれる場合は日付トランジションを表示
    const dayMatch = stepData.arcana ? stepData.arcana.match(/(\d+)日目/) : null;
    if (dayMatch) {
        showDayTransition(dayMatch[1], () => executeLoadStep(stepData));
    } else {
        executeLoadStep(stepData);
    }
}

// --- 日付トランジションオーバーレイ ---
function showDayTransition(dayNum, onComplete) {
    let dayOverlay = document.getElementById("day-transition-overlay");
    if (!dayOverlay) {
        dayOverlay = document.createElement("div");
        dayOverlay.id = "day-transition-overlay";
        dayOverlay.style.cssText = [
            "position:fixed", "inset:0", "z-index:9999",
            "background:#000", "display:flex", "flex-direction:column",
            "align-items:center", "justify-content:center",
            "opacity:0", "transition:opacity 0.6s ease", "pointer-events:none"
        ].join(";");
        dayOverlay.innerHTML = [
            '<div id="day-overlay-text" style="font-family:serif;color:#c9a84c;',
            'font-size:clamp(1.2rem,4vw,2rem);letter-spacing:0.3em;',
            'text-shadow:0 0 20px rgba(201,168,76,0.8);"></div>',
            '<div id="day-overlay-sub" style="font-size:clamp(0.7rem,2vw,0.9rem);',
            'color:rgba(255,255,255,0.5);letter-spacing:0.2em;margin-top:12px;"></div>'
        ].join("");
        document.body.appendChild(dayOverlay);
    }
    document.getElementById("day-overlay-text").textContent = "\u2015 " + dayNum + "日目 \u2015";
    document.getElementById("day-overlay-sub").textContent = "THE FOOL'S JOURNEY";
    
    requestAnimationFrame(() => { dayOverlay.style.opacity = "1"; });
    setTimeout(() => {
        dayOverlay.style.opacity = "0";
        setTimeout(onComplete, 600);
    }, 1800);
}

// --- 誤選択時の囁き演出 ---
function showWrongChoiceWhisper() {
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

function executeLoadStep(stepData) {
    currentArcanaEl.textContent = stepData.arcana;
    
    // ケルト十字 (Step 11) の開始時は、セリフ表示と演出を分けるため、まずは Talkビューとして表示する
    let viewToLoad = stepData.view;
    if (currentLoop === 1 && currentStep === 13) {
        viewToLoad = "talk";
    }
    showView(viewToLoad);

    // Apply gauge changes
    if (stepData.stressChange !== 0 || stepData.luckChange !== 0) {
        updateGauges(stepData.stressChange, stepData.luckChange);
    }

    if (currentView === "talk") {
        talkClickPrompt.classList.add("hidden");
        talkCardsContainer.innerHTML = ""; // Clear choices during typing

        // ポートレートエリアは常に非表示（ソフィアの登場はfocusポップアップで表現）
        talkPortraitEl.style.backgroundImage = "none";
        talkPortraitEl.style.opacity = "0";
        document.querySelector(".visual-area-talk").style.display = "none";

        activeDialogueSpeaker = stepData.speaker;
        updateSpeakerVisibility(talkSpeakerEl, talkTextEl, activeDialogueSpeaker);

        // テキストを改ページ(\n\n)で分割し、さらに長い段落を自動分割
        const rawPages = stepData.text.split(/\r?\n\s*\r?\n/).map(p => p.trim()).filter(p => p.length > 0);
        currentDialoguePages = rawPages.flatMap(page => {
            // [focus:...]タグは分割しない
            if (/^\[focus:/.test(page)) return [page];
            return autoSplitTextIntoPages(page);
        });
        console.log("Parsed dialogue pages:", currentDialoguePages);
        currentDialoguePageIndex = 0;
        
        showNextDialoguePage(stepData);
    } 
    else if (currentView === "chat") {
        chatInteractiveZoneEl.innerHTML = "";
        
        // [bg:画像名] タグの検知と背景変更
        let chatText = stepData.text;
        const bgMatch = chatText.match(/\[bg:([^\]]+)\]/);
        if (bgMatch) {
            const bgName = bgMatch[1].trim();
            changeBackground(bgName);
            chatText = chatText.replace(/\[bg:[^\]]+\]/g, "").trim();
        }
        
        // Push incoming message into Chat Timeline, render choices after typing completes
        pushChatMessage(stepData.speaker, chatText, false, null, () => {
            if (currentStep === 17 || currentStep === 21) {
                renderMotifSelection(currentStep);
            } else {
                renderChoiceCards(stepData.cards, chatInteractiveZoneEl, true);
            }
        });
    } 
    else if (currentView === "celtic") {
        updateSpeakerVisibility(celticSpeakerEl, celticTextEl, stepData.speaker);
        showPaginatedText(stepData.text, celticTextEl, celticClickPrompt, () => {
            celticClickPrompt.classList.remove("hidden");
            renderCelticCross();
        });
    } 
    else if (currentView === "puzzle") {
        updateSpeakerVisibility(puzzleSpeakerEl, puzzleTextEl, stepData.speaker);
        showPaginatedText(stepData.text, puzzleTextEl, puzzleClickPrompt, () => {
            puzzleClickPrompt.classList.remove("hidden");
            renderSymbolicDragPuzzle();
        });
    }

    saveState();
}

function showNextDialoguePage(stepData) {
    talkClickPrompt.classList.add("hidden");

    function goNext() {
        if (currentDialoguePageIndex < currentDialoguePages.length - 1) {
            currentDialoguePageIndex++;
            showNextDialoguePage(stepData);
        } else {
            finishStepText(stepData);
        }
    }

    const result = processPageTags(
        currentDialoguePages[currentDialoguePageIndex],
        activeDialogueSpeaker,
        goNext
    );
    activeDialogueSpeaker = result.speaker;

    if (result.handled) return; // フォーカス等で処理済み
    if (result.skip) { goNext(); return; } // スキップ対象

    updateSpeakerVisibility(talkSpeakerEl, talkTextEl, activeDialogueSpeaker);

    const pageId = `L${currentLoop}-S${currentStep}-P${currentDialoguePageIndex + 1}`;
    console.log(`[Dialogue ID] ${pageId} | Length: ${result.text.length} | Content: ${result.text}`);
    typeDialogueText(result.text, talkTextEl, () => {
        if (currentDialoguePageIndex < currentDialoguePages.length - 1) {
            talkClickPrompt.classList.remove("hidden");
        } else {
            // 最後のページ: stepData.focusImage があれば表示
            if (stepData.focusImage) {
                pendingStepLoad = () => { pendingStepLoad = null; finishStepText(stepData); };
                setTimeout(() => { if (pendingStepLoad) focusTarotCard(stepData.focusTitle || "", undefined, stepData.focusImage); }, 500);
            } else {
                finishStepText(stepData);
            }
        }
    });
}

function finishStepText(stepData) {
    if (currentLoop === 1 && currentStep === 12) {
        renderSoulCardForm();
    } else if (currentLoop === 2 && currentStep === 2) {
        loadMetaStarStep();
    } else {
        if (stepData.cards && stepData.cards.length > 0) {
            isCardRevealed = false;
            renderChoiceCards(stepData.cards, talkCardsContainer);
        } else {
            isCardRevealed = true;
            talkClickPrompt.classList.remove("hidden");
        }
    }
}

// --- Chat Scrolling Helper ---
function scrollToBottom() {
    if (chatHistoryEl && currentView === "chat") {
        chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
        // Dual scroll trigger to handle instant DOM sizing lag
        setTimeout(() => {
            chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
        }, 40);
    }
}

// --- Push message to Chat Timeline ---
function pushChatMessage(speaker, text, isSelf = false, cardData = null, onComplete = null) {
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

    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${isSelf ? 'msg-self' : 'msg-other'}`;

    if (!isSelf) {
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
    const pageId = `L${currentLoop}-S${currentStep}-P1`;
    console.log(`[Dialogue ID] ${pageId} | Length: ${text.length} | Content: ${text}`);
    typeDialogueText(text, textNode, onComplete);
}

// --- Render Cards with choice/no-choice Illusion ---
function renderChoiceCards(cardsList, container, isInChat = false) {
    container.innerHTML = "";
    
    const stepData = SCENARIO[currentLoop][currentStep];
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
function handleQuizChoiceSelected(card, choiceText, isInChat) {
    isCardRevealed = true;
    selectedOptionDesc = card.desc;
    
    // correct: false の選択肢を選んだ時に囁き演出
    if (card.correct === false) {
        showWrongChoiceWhisper();
    }

    if (card && card.id !== undefined) {
        discoverCard(card.id);
    }

    const tarotName = SOUL_CARDS[card.id] ? SOUL_CARDS[card.id].name : "タロットカード";
    const orientationText = card.upright ? "正位置" : "逆位置";

    // skipFocus: true の選択肢はカードポップアップをスキップする
    if (!card.skipFocus) {
        // カードを全画面表示する
        focusTarotCard(card.id, card.upright, TAROT_IMAGES[card.id]);
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
        if (currentView === "talk") {
            talkCardsContainer.innerHTML = "";
            
            // もし desc が空ならば、会話ページを生成せず自動的に次のステップへ遷移する
            if (!card.desc) {
                advanceGame();
                return;
            }
            // 現在のステップのスピーカーを維持（narration-styleを回避）
            const stepSpeaker = SCENARIO[currentLoop][currentStep]?.speaker || "";
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


// --- Markdown Parser Helper ---
function parseMarkdown(text) {
    if (!text) return "";
    let html = text;
    // 太字: **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // 斜体: *text* -> <em>text</em>
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // 改行: \n -> <br>
    html = html.replace(/\r?\n/g, '<br>');
    return html;
}

// --- HTML string slicer by text length (ignores tags for count) ---
function getSubHtml(html, visibleCount) {
    let result = "";
    let count = 0;
    let inTag = false;
    
    for (let i = 0; i < html.length; i++) {
        const char = html.charAt(i);
        if (char === "<") {
            inTag = true;
        }
        
        result += char;
        
        if (char === ">") {
            inTag = false;
            continue;
        }
        
        if (!inTag) {
            count++;
            if (count >= visibleCount) {
                break;
            }
        }
    }
    return result;
}

// --- Typing Effect ---
function typeDialogueText(text, container, onComplete = null) {
    const htmlText = parseMarkdown(text);
    container.innerHTML = "";
    
    // Calculate total visible characters by parsing html
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlText;
    const totalVisibleChars = tempDiv.textContent.length;
    
    let visibleCount = 0;
    const speed = 15;
    isTyping = true;
    
    skipTyping = () => {
        isTyping = false;
        skipTyping = null;
        container.innerHTML = htmlText;
        scrollToBottom();
        if (onComplete) onComplete();
    };

    function type() {
        if (!isTyping) return;
        if (visibleCount <= totalVisibleChars) {
            container.innerHTML = getSubHtml(htmlText, visibleCount);
            visibleCount++;
            scrollToBottom();
            setTimeout(type, speed);
        } else {
            isTyping = false;
            skipTyping = null;
            scrollToBottom();
            if (onComplete) onComplete();
        }
    }
    type();
}

// --- Create Card Element ---
function createCardElement(card, index, useGlitch = true) {
    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";
    wrapper.dataset.index = index;

    if (useGlitch) {
        if (currentLoop === 2) {
            wrapper.classList.add("card-glitch-1");
        } else if (currentLoop === 3) {
            wrapper.classList.add("card-glitch-2");
        }
    }

    const back = document.createElement("div");
    back.className = "card-face card-back";

    const front = document.createElement("div");
    front.className = "card-face card-front";

    const imgSlot = document.createElement("div");
    imgSlot.className = "card-image-slot";
    imgSlot.style.backgroundImage = `url('${TAROT_IMAGES[card.id]}')`;
    if (!card.upright) {
        imgSlot.style.transform = "rotate(180deg)";
    }

    const title = document.createElement("div");
    title.className = "card-title";
    // Use authentic Tarot Card name (e.g. "0 : 愚者") for the card face
    const tarotName = SOUL_CARDS[card.id] ? SOUL_CARDS[card.id].name : card.title;
    title.textContent = tarotName;

    const orient = document.createElement("div");
    orient.className = `card-orientation ${card.upright ? 'orientation-upright' : 'orientation-reversed'}`;
    orient.textContent = card.upright ? "正位置" : "逆位置";

    front.appendChild(imgSlot);
    front.appendChild(title);
    front.appendChild(orient);

    wrapper.appendChild(back);
    wrapper.appendChild(front);

    return wrapper;
}

// --- Reveal Card (Flip) ---
function revealCard(cardElement, card, isInChat = false) {
    isCardRevealed = true;
    cardElement.classList.add("revealed");

    // Support legacy string parameter
    const isLegacy = typeof card === "string";
    const desc = isLegacy ? card : card.desc;
    selectedOptionDesc = desc;

    const cardId = isLegacy ? 16 : card.id; // Fallback to Tower if legacy
    discoverCard(cardId);

    const tarotName = SOUL_CARDS[cardId] ? SOUL_CARDS[cardId].name : (isLegacy ? "" : card.title);
    const orientationText = isLegacy ? "" : (card.upright ? "正位置" : "逆位置");

    // カードを全画面表示する
    focusTarotCard(cardId, isLegacy ? true : card.upright, TAROT_IMAGES[cardId]);

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
            if (currentView === "talk") {
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
            } else if (currentView === "celtic") {
                updateSpeakerVisibility(celticSpeakerEl, celticTextEl, "運命の託宣");
                showPaginatedText(selectedOptionDesc, celticTextEl, celticClickPrompt, () => {
                    celticClickPrompt.classList.remove("hidden");
                });
            } else if (currentView === "puzzle") {
                updateSpeakerVisibility(puzzleSpeakerEl, puzzleTextEl, "運命の託宣");
                showPaginatedText(selectedOptionDesc, puzzleTextEl, puzzleClickPrompt, () => {
                    puzzleClickPrompt.classList.remove("hidden");
                });
            }
        }
    }, 600);
}

// --- 画面全体タップでページ送り ---
// ボタン・カード・モーダルなどインタラクティブ要素は除外
const SKIP_SELECTORS = "button, a, .card-wrapper, .quiz-choice-btn, .symbolic-stone, #card-focus-modal, #card-draw-overlay, .start-screen-overlay";

document.addEventListener("click", (e) => {
    // ケルト十字ビューの場合は、手動カード確認（クリック）以外の「画面全体タップによる進行」を透過させます。
    if (currentView === "celtic" && !isCelticAnimating) {
        // カードをクリックした場合はstopPropagationされるためここには来ず、
        // 盤面上のその他やデッキの上のタップでも進行を発生させます。
    } else {
        if (e.target.closest(SKIP_SELECTORS)) return;
    }

    if (currentView === "talk") {
        if (isTyping && skipTyping) { skipTyping(); return; }
        if (talkClickPrompt.classList.contains("hidden")) return;
        if (pendingPageCallback) { pendingPageCallback(); return; }
        if (currentDialoguePageIndex < currentDialoguePages.length - 1) {
            currentDialoguePageIndex++;
            showNextDialoguePage(SCENARIO[currentLoop][currentStep]);
        } else if (isCardRevealed) {
            if (currentLoop === 1 && currentStep === 13) {
                switchToCelticCrossView();
            } else {
                advanceGame();
            }
        }

    } else if (currentView === "celtic") {
        if (isCelticAnimating) return;
        if (isTyping && skipTyping) { skipTyping(); return; }
        if (celticClickPrompt.classList.contains("hidden")) return;
        if (pendingPageCallback) { pendingPageCallback(); return; }
        
        if (isCardRevealed) {
            advanceGame();
        } else if (currentCelticIndex === 0) {
            startAutomaticCelticSpread();
        } else if (currentCelticIndex === 10) {
            currentCelticIndex = 11;
            celticClickPrompt.classList.add("hidden");
            showCelticCrossContract();
        }

    } else if (currentView === "puzzle") {
        if (isTyping && skipTyping) { skipTyping(); return; }
        if (puzzleClickPrompt.classList.contains("hidden")) return;
        if (pendingPageCallback) { pendingPageCallback(); return; }
        if (isCardRevealed) advanceGame();
    }
});

// --- Advance Game Step ---
function advanceGame() {
    const currentScenarioLength = SCENARIO[currentLoop].length;


    // Bad End branch at Step 11 (Chariot)
    if (currentLoop === 1 && currentStep === 11) {
        if (selectedOptionDesc.includes("逆位置の『愚者』")) {
            stressVal = 100;
            luckVal = 0;
            stressGaugeEl.textContent = "999% [OVERFLOW]";
            luckGaugeEl.textContent = "0%";
            triggerLoversBadEnd();
            return;
        } else {
            stressVal = 0;
            luckVal = 100;
            stressGaugeEl.textContent = "STABILIZED";
            luckGaugeEl.textContent = "MAX (FIXED)";
        }
    }

    // Fail Meta-Puzzle click check
    if (currentLoop === 2 && currentStep === 2 && isFateControlled && isCardRevealed) {
        triggerDevilLoopEnd();
        return;
    }

    if (currentStep >= currentScenarioLength - 1) {
        if (currentLoop === 1) {
            triggerTowerBadEnd();
        } else {
            triggerDevilLoopEnd();
        }
        return;
    }

    currentStep++;
    loadStep();
}

// --- Lovers Bad End ---
function triggerLoversBadEnd() {
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
            currentStep = 11;
            saveState();
            initGame();
        };
    }, 1200);
}

// --- Tower Bad End (End of Loop 1) ---
function triggerTowerBadEnd() {
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
            currentLoop = 2;
            currentStep = 0;
            saveState();
            initGame();
        };
    }, 1500);
}

// --- Devil Loop End (Loop Fail) ---
function triggerDevilLoopEnd() {
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
            currentLoop = 2;
            currentStep = 2;
            saveState();
            initGame();
        };
    }, 1200);
}

// --- Soul Card Form UI ---
function renderSoulCardForm() {
    isCardRevealed = true;
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

    document.getElementById("soul-card-btn").addEventListener("click", () => {
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
                        spark.style.left = `${targetRect.left - containerRect.left + (targetRect.width/2)}px`;
                        spark.style.top = `${targetRect.top - containerRect.top + (targetRect.height/2)}px`;
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
                    spark.style.left = `${collideRect.left - containerRect.left + (collideRect.width/2)}px`;
                    spark.style.top = `${collideRect.top - containerRect.top + (collideRect.height/2)}px`;
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
function showSoulCardResult(cardNum) {
    const cardInfo = SOUL_CARDS[cardNum];
    talkCardsContainer.innerHTML = "";

    const cardData = { id: cardNum, title: cardInfo.name, upright: true, desc: "" };
    const cardWrapper = createCardElement(cardData, 0, false);
    cardWrapper.classList.add("revealed");
    talkCardsContainer.appendChild(cardWrapper);

    // カードを全画面表示
    focusTarotCard(cardNum, true, TAROT_IMAGES[cardNum]);

    selectedOptionDesc = `君のソウルカードは【${cardInfo.name}】です。<br><br>数秘術（ヌメロロジー）では、誕生日の西暦・月・日のすべての数字を足し続け、1から21の数字を導き出すの。これがあなたの魂の旅路の出発点を示す『ソウルナンバー』であり、対応する大アルカナよ。<br><br>${cardInfo.desc}<br><br>【本来の意味（ポジティブな側面）】<br>${cardInfo.trueDesc}<br><br>ソフィアは妖しく微笑む。「だからこそ、君には今の試練が与えられたの。このコミュニティとアプリが、君の傷ついた魂を救う唯一のシェルターなのよ」`;
    
    updateSpeakerVisibility(talkSpeakerEl, talkTextEl, "運命の託宣");
    showPaginatedText(selectedOptionDesc, talkTextEl, talkClickPrompt, () => {
        talkClickPrompt.classList.remove("hidden");
    });
}

// --- Highlight Active Slot Guide ---
function highlightSlotGuide(slotNum) {
    document.querySelectorAll(".cross-slot-guide").forEach(el => {
        el.classList.remove("active-slot");
    });
    let targetSlotGuide;
    if (slotNum <= 6) {
        targetSlotGuide = document.querySelector(`.celtic-cross-layout [data-slot-num="${slotNum}"]`);
    } else {
        targetSlotGuide = document.getElementById(`slot-${slotNum}`);
    }
    if (targetSlotGuide) {
        targetSlotGuide.classList.add("active-slot");
    }
}

// --- Celtic Cross View Switcher (Talk → Celtic, then auto-deal) ---
function switchToCelticCrossView() {
    showView("celtic");
    
    // 演出中は下部ダイアログを非表示にして演出に集中させる
    const celticDialogContainer = document.querySelector(".dialogue-container-celtic");
    if (celticDialogContainer) {
        celticDialogContainer.classList.add("hidden");
    }
    
    renderCelticCross();
    
    // 少し間を置いてから自動ドロー開始
    setTimeout(() => {
        startAutomaticCelticSpread();
    }, 500);
}

// --- Celtic Cross Spread UI ---
// --- Celtic Cross Spread UI ---
function renderCelticCross() {
    isCardRevealed = false;
    currentCelticIndex = 0;
    isCelticAnimating = false;
    
    const crossGrid = document.getElementById("celtic-cross-grid");
    const staffGrid = document.getElementById("celtic-staff-grid");
    
    // Clear and restore original guides
    crossGrid.innerHTML = `
        <div class="cross-slot-guide celtic-1" data-slot-num="1" style="grid-area: present;"></div>
        <div class="cross-slot-guide celtic-2" data-slot-num="2" style="grid-area: present; transform: rotate(90deg);"></div>
        <div class="cross-slot-guide celtic-3" data-slot-num="3" style="grid-area: conscious;"></div>
        <div class="cross-slot-guide celtic-4" data-slot-num="4" style="grid-area: unconscious;"></div>
        <div class="cross-slot-guide celtic-5" data-slot-num="5" style="grid-area: past;"></div>
        <div class="cross-slot-guide celtic-6" data-slot-num="6" style="grid-area: future;"></div>
        <div class="card-wrapper celtic-deck" id="celtic-cross-deck"></div>
    `;
    staffGrid.innerHTML = `
        <div class="cross-slot-guide" data-slot-num="7" id="slot-7"></div>
        <div class="cross-slot-guide" data-slot-num="8" id="slot-8"></div>
        <div class="cross-slot-guide" data-slot-num="9" id="slot-9"></div>
        <div class="cross-slot-guide" data-slot-num="10" id="slot-10"></div>
    `;

    highlightSlotGuide(1);
}

function startAutomaticCelticSpread() {
    isCelticAnimating = true;
    celticClickPrompt.classList.add("hidden");

    let i = 0;
    const interval = setInterval(() => {
        if (i < 10) {
            drawNextCelticCardInline(i);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(completeCelticSpread, 800);
        }
    }, 450);
}

function drawNextCelticCardInline(index) {
    const cardData = CELTIC_CARDS_DATA[index];
    const cardNum = index + 1;

    const cardWrapper = document.createElement("div");
    cardWrapper.className = `card-wrapper revealed`;
    
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
    
    document.querySelector(".celtic-cross-container").appendChild(cardWrapper);

    setTimeout(() => {
        let targetSlotGuide;
        if (cardNum <= 6) {
            targetSlotGuide = document.querySelector(`.celtic-cross-layout [data-slot-num="${cardNum}"]`);
        } else {
            targetSlotGuide = document.getElementById(`slot-${cardNum}`);
        }

        const targetRect = targetSlotGuide.getBoundingClientRect();
        const containerRect = document.querySelector(".celtic-cross-container").getBoundingClientRect();

        const targetX = targetRect.left - containerRect.left + (targetRect.width / 2);
        const targetY = targetRect.top - containerRect.top + (targetRect.height / 2);

        cardWrapper.style.left = `${targetX}px`;
        cardWrapper.style.top = `${targetY}px`;
        cardWrapper.style.transform = `translate(-50%, -50%) scale(1) ${cardData.rotate ? 'rotate(90deg)' : ''}`;
        
        targetSlotGuide.classList.remove("active-slot");
        targetSlotGuide.style.opacity = 0;
    }, 50);

    // 各カードクリック時の個別フォーカスは残しておく（後から自由に見れるようにするため）
    cardWrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        focusTarotCard(cardData.name, !cardData.rotate, cardData.img);
        updateSpeakerVisibility(celticSpeakerEl, celticTextEl, cardData.pos);
        const posMeaning = cardData.pos.includes(". ") ? cardData.pos.split(". ")[1] : cardData.pos;
        typeDialogueText(`この位置は「${posMeaning}」を表します。ここに配された【${cardData.name}】は、${cardData.desc}`, celticTextEl);
    });

    currentCelticIndex = cardNum;

    if (currentCelticIndex < 10) {
        highlightSlotGuide(currentCelticIndex + 1);
    } else {
        const deck = document.getElementById("celtic-cross-deck");
        if (deck) deck.remove();
    }
}

function completeCelticSpread() {
    isCelticAnimating = false;
    
    // ダイアログを再表示
    const celticDialogContainer = document.querySelector(".dialogue-container-celtic");
    if (celticDialogContainer) {
        celticDialogContainer.classList.remove("hidden");
    }
    
    // スプレッド完成後のセリフ
    updateSpeakerVisibility(celticSpeakerEl, celticTextEl, "ソフィア");
    const summaryText = "「展開はすべて完了しました。これが君の『愚者の旅』の全貌……。過去の野心、現在の依存、そして未来の完成。この完璧な計画を受け入れる準備はできましたか？」";
    showPaginatedText(summaryText, celticTextEl, celticClickPrompt, () => {
        celticClickPrompt.classList.remove("hidden");
    });
}

function showCelticCrossContract() {
    document.querySelector(".celtic-cross-container").innerHTML = `
        <div class="soul-card-form" style="max-width: 500px; margin: 40px auto 0;">
            <label>【本契約の決済条件】</label>
            <p style="font-size:13px; color:var(--color-text-light); text-align:center; line-height:1.6;">
                「これからの人生のあらゆる決断を、自分の頭で下すと誓わないこと」<br><br>
                自律という不確かな苦痛を捨て、カードの完璧な調律を受け入れますか？
            </p>
            <button id="contract-btn" class="action-btn" style="margin-top:10px;">すべてを委ね、契約する</button>
        </div>
    `;

    document.getElementById("contract-btn").addEventListener("click", () => {
        isCardRevealed = true;
        selectedOptionDesc = "契約は完了しました。おめでとう。これで君の運命は, コミュニティの完璧な計画線へと固定されました。もう、何も思い悩む必要はありません。";
        updateSpeakerVisibility(celticSpeakerEl, celticTextEl, "ソフィア");
        typeDialogueText(selectedOptionDesc, celticTextEl);
        celticClickPrompt.classList.remove("hidden");
    });
}

// --- Motif Selection (In Chat View) ---
function renderMotifSelection(step) {
    chatInteractiveZoneEl.innerHTML = "";

    // Show motifs buttons dynamically in chat bottom
    const motifContainer = document.createElement("div");
    motifContainer.className = "motif-container";
    motifContainer.style.marginTop = "0";
    
    const btnWrapper = document.createElement("div");
    btnWrapper.className = "motif-buttons";

    if (step === 11) {
        const scaleBtn = document.createElement("button");
        scaleBtn.className = "motif-btn";
        scaleBtn.textContent = "天秤（因果応報）";
        scaleBtn.addEventListener("click", () => {
            pushChatMessage("Player", "天秤を選択する", true);
            triggerPsycheScan("scale");
        });

        const swordBtn = document.createElement("button");
        swordBtn.className = "motif-btn";
        swordBtn.textContent = "剣（感情の排除）";
        swordBtn.addEventListener("click", () => {
            pushChatMessage("Player", "剣を選択する", true);
            triggerPsycheScan("sword");
        });

        btnWrapper.appendChild(scaleBtn);
        btnWrapper.appendChild(swordBtn);
    } else {
        const chainsBtn = document.createElement("button");
        chainsBtn.className = "motif-btn";
        chainsBtn.textContent = "緩い首輪の鎖（依存）";
        chainsBtn.addEventListener("click", () => {
            pushChatMessage("Player", "緩い首輪の鎖を選択する", true);
            triggerPsycheScan("chains");
        });
        btnWrapper.appendChild(chainsBtn);
    }

    motifContainer.appendChild(btnWrapper);
    chatInteractiveZoneEl.appendChild(motifContainer);
    scrollToBottom();
}

function triggerPsycheScan(choice) {
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
            desc = "【天秤のモチーフを選択】 「因果応報」の背景が脳内に流し込まれる。同僚の不正を徹底的に暴き、相手を吊るし上げるべきとの指示。➔ 勝利しましたが、冷酷な告発者として職場内での孤立が始まりました。";
        } else if (choice === "sword") {
            desc = "【剣のモチーフを選択】 「感情の排除と決別」の哲学を学ぶ。裏で上層部に冷徹に根回しを行い、同僚を静かに排除する指示。➔ 目的は達成しましたが、冷酷な手段に心に罪悪感が残りました。";
        } else if (choice === "chains") {
            desc = "【緩い鎖のモチーフを選択】 「彼らは自分の意志で囚われ続けている」という逆説を学ぶ。『今のままでいいの。考えるのをやめて、この甘い檻に身を委ねなさい』 ➔ 完全な思考停止の完成。";
        }

        isCardRevealed = true;
        selectedOptionDesc = desc;
        pushChatMessage("The Journey", selectedOptionDesc);

        chatInteractiveZoneEl.innerHTML = `<button class="action-btn" id="chat-next-btn">トークを進める</button>`;
        document.getElementById("chat-next-btn").addEventListener("click", advanceGame);
        scrollToBottom();
    }, 2000);
}

// --- Loop 2 Step 1: Drag-and-drop Word Puzzle ---
function renderSymbolicDragPuzzle() {
    isCardRevealed = false;
    
    const slotsArea = document.getElementById("puzzle-slots");
    const paletteArea = document.getElementById("puzzle-palette");

    slotsArea.innerHTML = "";
    paletteArea.innerHTML = `
        <div class="symbolic-stone" id="stone-self">内省の鏡 (自律)</div>
        <div class="symbolic-stone" id="stone-control">他者拒絶 (盲従)</div>
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

function setupStoneDrag(stone, targetCard, type) {
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

function handlePuzzleChoice(type, stoneEl) {
    const palette = document.getElementById("puzzle-palette");
    if (palette) palette.remove();
    
    stoneEl.style.transition = "all 0.5s ease-out";
    stoneEl.style.transform = "scale(0) rotate(180deg)";
    stoneEl.style.opacity = "0";

    isCardRevealed = true;

    if (type === "self") {
        selectedOptionDesc = "【自律ルート】君は気づいた。冷酷になっているのは相手ではなく、対話を拒絶している自分自身の心の影（投影）ではないか。君は上司と誠実に対話することを選択した。運命の歯車が初めて本来の軌道から外れた！";
    } else {
        selectedOptionDesc = "【盲従ルート】君はカードの言葉を『相手の冷酷さ』と解釈し、冷たい沈黙で相手を拒絶した。しかしそれは君の「相手を拒絶する心」を映した鏡だった。関係はさらに悪化し、再び『悪魔』の依存と『塔』の崩壊バッドエンドへ向かう。";
    }

    setTimeout(() => {
        stoneEl.remove();
        updateSpeakerVisibility(puzzleSpeakerEl, puzzleTextEl, "運命の託宣");
        typeDialogueText(selectedOptionDesc, puzzleTextEl);
        puzzleClickPrompt.classList.remove("hidden");
    }, 500);
}

// --- Loop 2 Step 2: Meta-Puzzle Setup ---
function loadMetaStarStep() {
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
        if (isCardRevealed) return;
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
function setupCardDrag(card, dropzone) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;

    card.addEventListener("pointerdown", (e) => {
        if (isCardRevealed) return;
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

function triggerFateBrokenByDrag(card, dropzone) {
    isFateControlled = false;
    dropzone.classList.remove("dragover");
    dropzone.classList.remove("visible");
    
    card.style.transition = "all 0.5s ease-in";
    card.style.transform = "translate(0, 150px) scale(0) rotate(720deg)";
    card.style.opacity = "0";

    setTimeout(() => {
        card.remove();
        triggerTrueEndingUnlock();
    }, 600);
}

// --- True Ending Unlock ---
function triggerTrueEndingUnlock() {
    sceneBgEl.style.opacity = 0.15;
    
    showView("talk"); // Bring player back to shop for ending dialog
    talkPortraitEl.style.backgroundImage = "url('/images/sophia_portrait.png')";
    talkPortraitEl.style.opacity = "1";
    document.querySelector(".visual-area-talk").style.display = "flex";
    
    updateSpeakerVisibility(talkSpeakerEl, talkTextEl, "ソフィア");
    typeDialogueText("……運命の糸が……完全に千切れました。君は提示されたすべての檻を拒絶し、システムを超越しました。これが君の真の意志ですね……。", talkTextEl);

    setTimeout(() => {
        currentArcanaEl.textContent = "XXI : THE WORLD (自己実現)";
        talkCardsContainer.innerHTML = "";
        
        const worldCard = document.createElement("div");
        worldCard.className = "card-wrapper";
        worldCard.id = "world-card";

        const back = document.createElement("div");
        back.className = "card-face card-back";
        const front = document.createElement("div");
        front.className = "card-face card-front";

        const imgSlot = document.createElement("div");
        imgSlot.className = "card-image-slot";
        imgSlot.style.backgroundImage = `url('${TAROT_IMAGES[21]}')`; // The World

        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = "XXI : 世界";

        const orient = document.createElement("div");
        orient.className = "card-orientation orientation-upright";
        orient.textContent = "正位置";

        front.appendChild(imgSlot);
        front.appendChild(title);
        front.appendChild(orient);
        worldCard.appendChild(back);
        worldCard.appendChild(front);

        talkCardsContainer.appendChild(worldCard);

        worldCard.addEventListener("click", () => {
            if (isCardRevealed) return;
            revealCard(worldCard, "【トゥルーエンド】運命の超越。君はシステムを破壊し、自分で考え、決断する責任を取り戻しました。本当の『世界（自己実現）』の獲得です。愚者の旅は終わります。");
            
            setTimeout(() => {
                talkClickPrompt.classList.remove("hidden");
                talkClickPrompt.onclick = showTrueEndingOverlay;
                talkTextEl.parentElement.onclick = showTrueEndingOverlay;
            }, 1000);
        });
    }, 2500);
}

function showTrueEndingOverlay() {
    endingOverlay.classList.remove("hidden");
    endingTitle.textContent = "XXI : THE WORLD (自己実現)";
    endingTitle.style.color = "var(--color-gold)";
    endingDesc.innerHTML = `
        おめでとう。君は「運命のアプリ」という盲信のシステムを完全に脱却しました。<br>
        大アルカナの旅路は、与えられた指示に生きることではありません。<br>
        無垢な「愚者」が葛藤を経て、自律意思に基づいて自己（Self）を生きる力こそが、真の「世界」です。<br><br>
        <span style="color: var(--color-gold); font-size: 18px; font-weight: bold;">「これより先、君の道を決めるのは君自身です」</span>
    `;
    restartBtn.textContent = "対話鑑賞モードをアンロックする";
    restartBtn.onclick = () => {
        trueEndCleared = true;
        saveState();
        initGame();
    };
}

// --- Meditation Mode (Daily Tarot) ---
function initMeditationMode() {
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
    meditationMotifs.classList.add("hidden");
    resetMeditationBtn.classList.add("hidden");
    
    document.getElementById("draw-meditation-btn").addEventListener("click", drawMeditationCard);
}

function drawMeditationCard() {
    const availableKeys = [0, 1, 2, 3, 5, 7, 9, 12, 15, 16, 17, 21];
    const randKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
    const metadata = MEDITATION_MOTIFS[randKey];

    meditationCardZone.innerHTML = "";
    
    const cardData = { id: randKey, title: metadata.title, upright: true, desc: "" };
    const cardWrapper = createCardElement(cardData, 0, false);
    meditationCardZone.appendChild(cardWrapper);
    
    setTimeout(() => {
        cardWrapper.classList.add("revealed");
        
        // カードを全画面表示
        focusTarotCard(randKey, true, TAROT_IMAGES[randKey]);

        meditationMotifButtons.innerHTML = "";
        metadata.motifs.forEach((motif) => {
            const btn = document.createElement("button");
            btn.className = "motif-btn";
            btn.textContent = motif.name;
            btn.addEventListener("click", () => selectMeditationMotif(motif));
            meditationMotifButtons.appendChild(btn);
        });
        
        meditationDialogue.classList.remove("hidden");
        meditationMotifs.classList.remove("hidden");
        resetMeditationBtn.classList.remove("hidden");
        
        typeDialogueText(`今日の君のカードは『${metadata.title}』です。カードの絵柄から、今君の心が最も惹かれるモチーフを選んでください。`, meditationText);
    }, 500);
}

function selectMeditationMotif(motif) {
    meditationMotifs.classList.add("hidden");
    typeDialogueText(`【${motif.name}の象徴】<br>${motif.text}`, meditationText);
}

resetMeditationBtn.addEventListener("click", initMeditationMode);

// --- Added DOM Elements ---
const startScreenEl = document.getElementById("start-screen");
const startNewBtn = document.getElementById("start-new-btn");
const startContinueBtn = document.getElementById("start-continue-btn");
const showInstructionsBtn = document.getElementById("show-instructions-btn");

const instructionsModal = document.getElementById("instructions-modal");
const closeInstructionsBtn = document.getElementById("close-instructions-btn");

const cardFocusModal = document.getElementById("card-focus-modal");
const focusCardImg = document.getElementById("focus-card-img");
const focusCardName = document.getElementById("focus-card-name");
const focusCardDirection = document.getElementById("focus-card-direction");
const focusCardDesc = document.getElementById("focus-card-desc");
const focusCardTabs = document.getElementById("focus-card-tabs");
const tabGameDesc = document.getElementById("tab-game-desc");
const tabTrueDesc = document.getElementById("tab-true-desc");

// --- Added Helper & Adjustment Functions ---
function applyDynamicAdjustments() {
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

    // CELTIC_CARDS_DATA replacement: "あなた" -> "君"
    CELTIC_CARDS_DATA.forEach(card => {
        if (card.desc) {
            card.desc = card.desc.replace(/あなた/g, "君");
        }
    });
}

function showStartScreen() {
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

function setupEventListeners() {
    if (startNewBtn) {
        startNewBtn.addEventListener("click", () => {
            localStorage.clear();
            currentLoop = 1;
            currentStep = 0;
            trueEndCleared = false;
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
            if (pendingStepLoad) {
                pendingStepLoad();
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
function openCollectionModal() {
    const collectionModal = document.getElementById("collection-modal");
    const collectionGrid = document.getElementById("collection-grid");
    if (!collectionModal || !collectionGrid) return;

    collectionGrid.innerHTML = "";

    // 0〜21の大アルカナ全てについて描画
    for (let i = 0; i <= 21; i++) {
        const hasCard = discoveredCards.has(i);
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
                pendingStepLoad = () => {
                    pendingStepLoad = null;
                    collectionModal.classList.remove("hidden");
                };
            });
        }
    }

    collectionModal.classList.remove("hidden");
}

function updateSpeakerVisibility(speakerEl, textEl, speakerName) {
    speakerEl.textContent = speakerName;
    
    // dialogue-container-talk の背景色変更
    const container = speakerEl.closest(".dialogue-container-talk");
    if (container) {
        if (speakerName === "プレイヤー") {
            container.classList.add("speaker-player");
        } else {
            container.classList.remove("speaker-player");
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

function focusTarotCard(cardIdOrName, upright, imgUrl) {
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
        if (typeof cardIdOrName === "number" && SOUL_CARDS[cardIdOrName] && SOUL_CARDS[cardIdOrName].trueDesc) {
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

// --- Window load initialize ---
window.addEventListener("load", () => {
    applyDynamicAdjustments();
    setupEventListeners();
    showStartScreen();
});
