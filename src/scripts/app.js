/**
 * PROJECT FOOL - Core Game Logic & Narrative Engine (Astro Version)
 */

// --- Rider-Waite Tarot Images (Local Assets) ---
const TAROT_IMAGES = {
    0: "/images/cards/0.jpg",
    1: "/images/cards/1.jpg",
    5: "/images/cards/5.jpg",
    7: "/images/cards/7.jpg",
    9: "/images/cards/9.jpg",
    12: "/images/cards/12.jpg",
    15: "/images/cards/15.jpg",
    16: "/images/cards/16.jpg",
    17: "/images/cards/17.jpg",
    21: "/images/cards/21.jpg"
};

// --- Scenario Data ---
const SCENARIO = {
    1: [
        {
            arcana: "PROLOGUE : THE CARD (拾われたカード)",
            speaker: "ナレーション",
            text: "雨上がりの路地裏で、あなたは奇妙なカードを拾った。裏面には美しい紋章と、この先の雑居ビルにある占い店の住所が書かれている。導かれるようにたどり着いたのは、古びた占い店『The Fool's Journey』。ドアを開けて、中に入ってみよう。",
            cards: [
                { id: 0, title: "扉を開けて入店する", upright: true, desc: "カランコロンと静かな鈴の音が響く。薄暗い店内の奥で、妖艶な占い師がキャンドルの炎に照らされて座っていた。「ようこそ、旅人さん」" }
            ]
        },
        {
            arcana: "0 : THE FOOL (愚者)",
            speaker: "ソフィア",
            text: "いらっしゃい、旅人さん。あなたが手にしているそのカード……私が落としたものね。それを拾ってここまでたどり着くなんて、面白い偶然。そのカードをめくってみて。",
            cards: [
                { id: 0, title: "0 : 愚者", upright: true, desc: "【正位置】無限の可能性、無垢な旅立ち。ソフィアは微笑む。「これは『愚者』。無知な者という意味。タロットに興味があるなら、この先の旅路を教えてあげるわ。……でも、無知であることは必ずしも悪いことではないのよ。それは、これから起こることを先入観なく楽しめるという意味でもあるの。複数解釈ができるのがタロットの面白いところ。さあ、最初の第一歩を踏み出しなさい」" }
            ]
        },
        {
            arcana: "I : THE MAGICIAN (魔術師)",
            speaker: "ソフィア",
            text: "素晴らしい。あなたは無限の可能性を秘めて歩み始めました。次に現れたのは、知恵と創造を示す「魔術師」です。カードの教えを信じ、技術を授かりましょう。",
            cards: [
                { id: 1, title: "I : 魔術師", upright: true, desc: "【正位置】創造と才能。あなたはルールを学び、知恵を得て、世界を構築し始めます。" }
            ]
        },
        {
            arcana: "V : THE HIEROPHANT (教皇)",
            speaker: "ソフィア",
            text: "知恵を得たあなたに、次は「教皇」が絶対的な秩序とモラルを授けます。提示されるルールに疑問を持たず、従うことで、正しい道を迷わず進めるのです。",
            cards: [
                { id: 5, title: "V : 教皇", upright: true, desc: "【正位置】秩序と信頼。あなたは社会の規律を受け入れ、カードの導きを盲信し始めます。" }
            ]
        },
        {
            arcana: "VII : THE CHARIOT (戦車)",
            speaker: "ソフィア",
            text: "教えを守り、突き進むあなたに勝利の「戦車」が与えられます！外的な勝利と前進。ほら、カードの言う通りに従えば、何も恐れることはないでしょう？",
            cards: [
                { id: 7, title: "VII : 戦車", upright: true, desc: "【正位置】勝利と前進。あなたは華々しく第一幕を終えました。運命のシステムは完璧です。" }
            ]
        },
        {
            arcana: "IX : THE HERMIT (隠者)",
            speaker: "ソフィア",
            text: "第2幕が始まります。勝利の熱狂から離れ、あなたは「隠者」の静寂の中で内省に入ります。孤独な探索も、カードの導きがあれば安らぎとなるでしょう。",
            cards: [
                { id: 9, title: "IX : 隠者", upright: true, desc: "【正位置】探求と内省。あなたは少しの疑問を抱くこともなく、次の指示を待ちます。" }
            ]
        },
        {
            arcana: "XII : THE HANGED MAN (吊られた男)",
            speaker: "ソフィア",
            text: "世界が少し不穏に傾きます。「吊られた男」は、自己犠牲と試練を意味します。しかし、これは通過儀礼です。カードの言う通り、今はただ耐えるのです。",
            cards: [
                { id: 12, title: "XII : 吊られた男", upright: true, desc: "【正位置】試練と方向転換。あなたは苦痛を受け入れ、運命に身を委ねます。" }
            ]
        },
        {
            arcana: "XV : THE DEVIL (悪魔)",
            speaker: "ソフィア",
            text: "おや、奇妙ですね。提示された運命は「悪魔」……。甘い囁きと依存のカードです。切実な問いかけも不要です。ただ、このカードを受け入れなさい。",
            cards: [
                { id: 15, title: "XV : 悪魔", upright: true, desc: "【正位置】誘惑と束縛。あなたは自分で意思決定をする責任から完全に逃れ、運命の虜となりました。" }
            ]
        },
        {
            arcana: "XVI : THE TOWER (塔)",
            speaker: "ソフィア",
            text: "なぜでしょうか……。カードの教え通りに生きてきたはずなのに、目の前に現れたのは「塔」。崩壊と破滅のカードです。システムが……瓦解していきます……！",
            cards: [
                { id: 16, title: "XVI : 塔", upright: true, desc: "【正位置】劇的変化と崩壊。積み上げた盲信は一瞬にして崩れ去ります。" }
            ]
        }
    ],
    2: [
        {
            arcana: "PROLOGUE : THE DEJA VU (既視感)",
            speaker: "ナレーション",
            text: "……デジャヴだろうか。あなたはまたしても、あのカードを拾い、あの住所をたどり、同じ占い店の前に立っている。ドアの向こうからは、聞き覚えのある声が聞こえる。ドアを開けて中へ入ろう。",
            cards: [
                { id: 0, title: "再び扉を開けて入店する", upright: true, desc: "ドアを開けると、やはりあのハーブの香りが漂う。しかし、あなたの心には冷たい汗が流れている。ソフィアは前と同じように座っていた。「ようこそ、旅人さん」" }
            ]
        },
        {
            arcana: "0 : THE FOOL (愚者) - Loop 2",
            speaker: "ソフィア",
            text: "いらっしゃい、旅人さん. あなたが手にしているのは……あら、不思議な感覚ね。まるで前にもこうしてあなたにカードを渡したような……？ 気のせいかしら。さあ、そのカードをめくってみて。",
            cards: [
                { id: 0, title: "0 : 愚者", upright: true, desc: "【正位置】無限の可能性。ソフィアは静かに言う。「無知は、ルールを盲信すれば救われるという意味でもあるわ。でも、何かがおかしい……本当にこれが初めての旅かしら？」" }
            ]
        },
        {
            arcana: "I : THE MAGICIAN (魔術師)",
            speaker: "ソフィア",
            text: "「魔術師」です。今回は少し様子が違いますね。カードの向きによって結果が変わるかもしれません。しかし、信じる者は救われます。カードをめくって従うのです。",
            cards: [
                { id: 1, title: "I : 魔術師 (正)", upright: true, desc: "【正位置】才能。しかし裏の選択肢には警告が含まれています。" },
                { id: 1, title: "I : 魔術師 (逆)", upright: false, desc: "【逆位置】空回り、技術不足。あなたは自分で考えることへの最初の迷いを感じます。" }
            ]
        },
        {
            arcana: "V : THE HIEROPHANT (教皇)",
            speaker: "ソフィア",
            text: "「教皇」のカードですが……少しノイズが混じっているようです。ルールは絶対です。でも、そのルールは誰が作ったのでしょうか？ いいえ、無駄な思考は不要です。",
            cards: [
                { id: 5, title: "V : 教皇 (正)", upright: true, desc: "【正位置】規律。あなたはまだルールにしがみつこうとします。" },
                { id: 5, title: "V : 教皇 (逆)", upright: false, desc: "【逆位置】狭い視野、独善。ルールそのものがあなたを縛っていることに気づき始めます。" }
            ]
        },
        {
            arcana: "VII : THE CHARIOT (戦車)",
            speaker: "ソフィア",
            text: "「戦車」の勝利です。しかし、この勝利の先にある崩壊の記憶があなたを怯えさせます。ソフィアは優しく微笑みます。「大丈夫、運命を疑ってはなりません」",
            cards: [
                { id: 7, title: "VII : 戦車 (正)", upright: true, desc: "【正位置】勝利。見せかけの栄光は長く続きません。" },
                { id: 7, title: "VII : 戦車 (逆)", upright: false, desc: "【逆位置】暴走、挫折。運命のレールから脱線しそうになる恐怖。" }
            ]
        },
        {
            arcana: "IX : THE HERMIT (隠者)",
            speaker: "ソフィア",
            text: "「隠者」です。あなたの心の中の疑問は大きくなるばかり。孤独の中で、あなたはカードではない「自分自身の声」を聞こうとし始めます。しかしそれは許されません。",
            cards: [
                { id: 9, title: "IX : 隠者 (正)", upright: true, desc: "【正位置】内省。しかし真実には届かない。" },
                { id: 9, title: "IX : 隠者 (逆)", upright: false, desc: "【逆位置】閉鎖、偏屈。あなたはシステムに対して懐疑的になります。" }
            ]
        },
        {
            arcana: "XII : THE HANGED MAN (吊られた男)",
            speaker: "ソフィア",
            text: "「吊られた男」。耐えることの意味を考え直してください。耐えた先に待っているのは崩壊の塔です。ソフィアの声が冷たくなります。「ただ選択肢を選べばいいのです」",
            cards: [
                { id: 12, title: "XII : 吊られた男 (正)", upright: true, desc: "【正位置】修行。いつまで従順な操り人形でいるつもりですか？" },
                { id: 12, title: "XII : 吊られた男 (逆)", upright: false, desc: "【逆位置】骨折り損。無意味な犠牲のループに気づき始めています。" }
            ]
        },
        {
            arcana: "XV : THE DEVIL (悪魔)",
            speaker: "ソフィア",
            text: "「悪魔」です。ほら、もうこの甘い揺り籠から抜け出せない。すべてをカードのせいにして、ただめくり続けるのが一番楽なのでしょう？ さあ、私の言う通りにめくって。",
            cards: [
                { id: 15, title: "XV : 悪魔 (正)", upright: true, desc: "【正位置】束縛。あなたは再び意思決定を放棄しそうになります。" },
                { id: 15, title: "XV : 悪魔 (逆)", upright: false, desc: "【逆位置】執着からの離脱への恐怖。変化を恐れる愚か者。" }
            ]
        },
        {
            arcana: "XVI : THE TOWER (塔)",
            speaker: "ソフィア",
            text: "やはりこうなるのですね。どんなに迷っても、運命の指示に従う限り「塔」の崩壊は避けられない。何かが間違っている……この世界そのものが、巨大な欺瞞なのです！",
            cards: [
                { id: 16, title: "XVI : 塔", upright: true, desc: "【正位置】破滅。再び激しいノイズと共に、世界が巻き戻されます。" }
            ]
        }
    ],
    3: [
        {
            arcana: "PROLOGUE : SYSTEM BUG (バグ)",
            speaker: "ナレーション",
            text: "カードの絵柄はノイズで掻き消え、住所は文字化けしている。それでもあなたは、引き寄せられるように店の前に立っていた。ドアは半開きで、不気味な電子音が漏れている。中へ入ろう。",
            cards: [
                { id: 0, title: "バグった扉から中に入る", upright: true, desc: "一歩踏み入れると、そこはキャンドルの光ではなく、赤く点滅するエラー表示と、グリッチの嵐だった。ソフィアの姿もブレて見える。「警告、警告……」" }
            ]
        },
        {
            arcana: "0 : THE FOOL (愚者) - SYSTEM MALFUNCTION",
            speaker: "ソフィア (エラー)",
            text: "なぜ……？ なぜあなたがここにいるの？ ループは完璧だったはず。あなたは私の与える運命をめくり、塔で崩れ、また戻るはず……。警告、選択肢の整合性が失われています。",
            cards: [
                { id: 17, title: "XVII : 星 (運命の呪縛)", upright: true, desc: "めくれば再びバッドエンドへ直行します。" }
            ]
        }
    ]
};

// --- Game State Variables ---
let currentLoop = 1;
let currentStep = 0;
let isCardRevealed = false;
let selectedOptionDesc = "";
let isFateControlled = true; // メタ要素用。

// --- DOM Elements ---
const loopCountEl = document.getElementById("loop-count");
const currentArcanaEl = document.getElementById("current-arcana");
const speakerNameEl = document.getElementById("speaker-name");
const dialogueTextEl = document.getElementById("dialogue-text");
const clickPromptEl = document.getElementById("click-prompt");
const cardsContainer = document.getElementById("cards-container");
const glitchOverlay = document.getElementById("glitch-overlay");
const endingOverlay = document.getElementById("ending-overlay");
const endingTitle = document.getElementById("ending-title");
const endingDesc = document.getElementById("ending-desc");
const restartBtn = document.getElementById("restart-btn");
const systemWarning = document.getElementById("system-warning");

// Console elements
const debugConsole = document.getElementById("debug-console");
const closeConsoleBtn = document.getElementById("close-console-btn");
const consoleLogs = document.getElementById("console-logs");
const consoleInput = document.getElementById("console-input");

// --- Initialization ---
function initGame() {
    currentStep = 0;
    isCardRevealed = false;
    isFateControlled = true;
    selectedOptionDesc = "";
    
    // UI resets
    loopCountEl.textContent = currentLoop;
    endingOverlay.classList.add("hidden");
    glitchOverlay.classList.remove("glitch-active");
    systemWarning.classList.add("hidden");
    debugConsole.classList.add("console-closed");
    
    // Remove garbage bin if exists
    const bin = document.getElementById("discard-zone");
    if (bin) bin.remove();

    loadStep();
}

// --- Load current scenario step ---
function loadStep() {
    isCardRevealed = false;
    clickPromptEl.classList.add("hidden"); // Cards need to be clicked first

    // Special behavior for Loop 3, Step 1 (the final meta-puzzle)
    if (currentLoop === 3 && currentStep === 1) {
        loadMetaStarStep();
        return;
    }

    const stepData = SCENARIO[currentLoop][currentStep];
    
    currentArcanaEl.textContent = stepData.arcana;
    speakerNameEl.textContent = stepData.speaker;
    
    // Typing effect
    typeDialogueText(stepData.text);

    // Generate cards
    cardsContainer.innerHTML = "";
    stepData.cards.forEach((card, index) => {
        const cardWrapper = createCardElement(card, index);
        cardsContainer.appendChild(cardWrapper);
    });
}

// --- Typing Effect ---
function typeDialogueText(text) {
    dialogueTextEl.textContent = "";
    let i = 0;
    const speed = 30; // ms per char
    
    function type() {
        if (i < text.length) {
            dialogueTextEl.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// --- Create Card Element ---
function createCardElement(card, index) {
    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";
    wrapper.dataset.index = index;

    const back = document.createElement("div");
    back.className = "card-face card-back";

    const front = document.createElement("div");
    front.className = "card-face card-front";

    // Set tarot image
    const imgSlot = document.createElement("div");
    imgSlot.className = "card-image-slot";
    imgSlot.style.backgroundImage = `url('${TAROT_IMAGES[card.id]}')`;
    if (!card.upright) {
        imgSlot.style.transform = "rotate(180deg)";
    }

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = card.title;

    const orient = document.createElement("div");
    orient.className = `card-orientation ${card.upright ? 'orientation-upright' : 'orientation-reversed'}`;
    orient.textContent = card.upright ? "正位置" : "逆位置";

    front.appendChild(imgSlot);
    front.appendChild(title);
    front.appendChild(orient);

    wrapper.appendChild(back);
    wrapper.appendChild(front);

    // Event listener for click (Card Flip)
    wrapper.addEventListener("click", () => {
        if (isCardRevealed) return;
        revealCard(wrapper, card.desc);
    });

    return wrapper;
}

// --- Reveal Card (Flip) ---
function revealCard(cardElement, description) {
    isCardRevealed = true;
    cardElement.classList.add("revealed");
    selectedOptionDesc = description;

    // Wait for flip animation, then show narrative outcome
    setTimeout(() => {
        speakerNameEl.textContent = "運命の託宣";
        typeDialogueText(selectedOptionDesc);
        clickPromptEl.classList.remove("hidden");
    }, 600);
}

// --- Advance Dialogue / Scenario ---
dialogueTextEl.parentElement.addEventListener("click", () => {
    // Only advance if a card has been revealed and action prompt is visible
    if (!isCardRevealed || clickPromptEl.classList.contains("hidden")) return;

    advanceGame();
});

// --- Trigger Bad End (Tower Collapse) ---
function triggerBadEnd() {
    glitchOverlay.classList.add("glitch-active");
    systemWarning.classList.remove("hidden");
    
    setTimeout(() => {
        endingOverlay.classList.remove("hidden");
        endingTitle.textContent = "XVI : THE TOWER (崩壊)";
        endingTitle.style.color = "var(--color-accent-red)";
        
        if (currentLoop === 1) {
            endingDesc.innerHTML = `
                あなたはカードの導きに従い、見事に栄光を掴み、そして……すべてを失いました。<br>
                自分で考えることを放棄し、誰かが用意した「運命」を盲信した代償です。<br><br>
                <span style="color: var(--color-gold);">「愚者（正位置）」は無限の可能性を秘めていましたが、<br>
                あなたは考える責任を逃れた「本当の愚か者（逆位置）」へと退化したのです。</span>
            `;
            restartBtn.textContent = "再び白紙の旅に出る (第2幕へ)";
        } else if (currentLoop === 2) {
            endingDesc.innerHTML = `
                ルールを疑い、自分の声を聞きかけたはずなのに、最後には再び「悪魔」の依存に負けました。<br>
                何度繰り返しても、この用意されたシステムに身を委ねる限り、終着点は変わりません。<br><br>
                <span style="color: var(--color-accent-red);">警告：運命の糸（fateState）が完全に固定されています。物理的な介入が必要です。</span>
            `;
            restartBtn.textContent = "運命をハックする (第3幕へ)";
        }
    }, 1500);
}

function triggerLoopBackEnd() {
    glitchOverlay.classList.add("glitch-active");
    setTimeout(() => {
        endingOverlay.classList.remove("hidden");
        endingTitle.textContent = "XV : THE DEVIL (盲信ループ)";
        endingTitle.style.color = "var(--color-accent-red)";
        endingDesc.innerHTML = `
            あなたはまた、提示された運命のカードをめくってしまいました。<br>
            提示された選択肢から選ぶという行為自体が、すでに囚われの身であることの証です。<br><br>
            <span style="color: var(--color-gold);">システムに抗うのです。提示されたカードそのものを「拒絶」するか、<br>
            バグによって露わになったデバッグツールから「運命」を自ら書き換えなさい。</span>
        `;
        restartBtn.textContent = "もう一度運命に抗う";
    }, 1000);
}

// Restart button action
restartBtn.addEventListener("click", () => {
    if (currentLoop === 1 && currentStep === SCENARIO[1].length - 1) {
        currentLoop = 2;
    } else if (currentLoop === 2 && currentStep === SCENARIO[2].length - 1) {
        currentLoop = 3;
    }
    initGame();
});

// --- Loop 3 Final Meta-Puzzle Configuration ---
function loadMetaStarStep() {
    currentArcanaEl.textContent = "XVII : THE STAR (希望の星)";
    speakerNameEl.textContent = "ソフィア (エラー状態)";
    
    typeDialogueText("警告。ここから先は定められた運命にはありません。しかし、システムはあなたに再び「死神」か「塔」の破滅を引かせようとしています。従ってはならない……！");

    cardsContainer.innerHTML = "";
    
    // Create the "Doomed Card" that will trigger loop if clicked
    const doomCard = document.createElement("div");
    doomCard.className = "card-wrapper draggable";
    doomCard.id = "doomed-card";
    
    const back = document.createElement("div");
    back.className = "card-face card-back";
    const front = document.createElement("div");
    front.className = "card-face card-front";
    
    const imgSlot = document.createElement("div");
    imgSlot.className = "card-image-slot";
    imgSlot.style.backgroundImage = `url('${TAROT_IMAGES[16]}')`; // Tower card
    
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
    
    cardsContainer.appendChild(doomCard);

    // Click behavior (tragedy/loopback if clicked)
    doomCard.addEventListener("click", () => {
        if (isCardRevealed) return;
        revealCard(doomCard, "【運命の拒絶失敗】あなたは再び提示されたカードをめくってしまいました。それは破滅の塔です。");
    });

    // Create drag-to-discard zone in DOM dynamically
    let discardZone = document.getElementById("discard-zone");
    if (!discardZone) {
        discardZone = document.createElement("div");
        discardZone.id = "discard-zone";
        discardZone.innerHTML = "<span>ここにカードをドラッグして「運命」を捨てる</span>";
        document.getElementById("game-wrapper").appendChild(discardZone);
    }
    discardZone.classList.add("visible");

    // Enable console after a small delay
    setTimeout(() => {
        openDebugConsole();
    }, 1500);

    // Setup Pointer Drag & Drop for the doomCard
    setupCardDrag(doomCard, discardZone);
}

// --- Pointer Events Drag & Drop ---
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

// --- Discard Action Success (Drag End) ---
function triggerFateBrokenByDrag(card, dropzone) {
    isFateControlled = false;
    dropzone.classList.remove("dragover");
    dropzone.classList.remove("visible");
    
    card.style.transition = "all 0.5s ease-in";
    card.style.transform = "translate(0, 150px) scale(0) rotate(720deg)";
    card.style.opacity = "0";

    addConsoleLog("[SYS] FATE_THREAD DETACHED BY PLAYER FORCE.");
    addConsoleLog("[SYS] STATE UPDATE: isFateControlled = false");

    setTimeout(() => {
        card.remove();
        triggerTrueEndingUnlock();
    }, 600);
}

// --- Console Functions ---
function openDebugConsole() {
    debugConsole.classList.remove("console-closed");
    addConsoleLog("[SYS] ERROR DETECTED. OVERRIDE TERMINAL INITIALIZED.");
    addConsoleLog("[SYS] ENTER COMMAND: fate = \"free\" to bypass destiny.");
    consoleInput.focus();
}

// Custom log print helper
function addConsoleLog(text) {
    const div = document.createElement("div");
    div.textContent = text;
    consoleLogs.appendChild(div);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
}

// Debug console command handling
consoleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const command = consoleInput.value.trim().toLowerCase();
        addConsoleLog(`> ${consoleInput.value}`);
        consoleInput.value = "";

        if (command === 'fate = "free"' || command === 'fate="free"' || command === 'fate = free' || command === 'fate=free') {
            if (isFateControlled) {
                isFateControlled = false;
                addConsoleLog("[SUCCESS] DESTINY TEMPLATE BROKEN.");
                addConsoleLog("[SYS] FREE WILL ENGINE: ACTIVE.");
                
                const bin = document.getElementById("discard-zone");
                if (bin) bin.classList.remove("visible");

                const doomCard = document.getElementById("doomed-card");
                if (doomCard) {
                    doomCard.style.transition = "opacity 0.5s";
                    doomCard.style.opacity = "0";
                    setTimeout(() => {
                        doomCard.remove();
                        triggerTrueEndingUnlock();
                    }, 500);
                } else {
                    triggerTrueEndingUnlock();
                }
            } else {
                addConsoleLog("[INFO] DESTINY IS ALREADY FREE.");
            }
        } else if (command === "help") {
            addConsoleLog("Available commands: help, clear, fate = \"free\"");
        } else if (command === "clear") {
            consoleLogs.innerHTML = "";
        } else {
            addConsoleLog(`[ERROR] Command not recognized: '${command}'. Did you mean 'fate = "free"'?`);
        }
    }
});

// Close console button click
closeConsoleBtn.addEventListener("click", () => {
    debugConsole.classList.add("console-closed");
});

// Window-level binding to allow real browser console F12 hacking as well!
Object.defineProperty(window, "fate", {
    get: function() { return isFateControlled ? "controlled" : "free"; },
    set: function(val) {
        if (val === "free" || val === "freedom") {
            if (isFateControlled && currentLoop === 3) {
                isFateControlled = false;
                console.log("%c[SYSTEM] DESTINY BROKEN VIA BROWSER CONSOLE!", "color: gold; font-weight: bold; font-size: 16px;");
                addConsoleLog("[SYS] BROWSER CONSOLE INTRUSION DETECTED.");
                addConsoleLog("[SUCCESS] DESTINY TEMPLATE BROKEN.");
                
                const bin = document.getElementById("discard-zone");
                if (bin) bin.classList.remove("visible");

                const doomCard = document.getElementById("doomed-card");
                if (doomCard) {
                    doomCard.style.transition = "opacity 0.5s";
                    doomCard.style.opacity = "0";
                    setTimeout(() => {
                        doomCard.remove();
                        triggerTrueEndingUnlock();
                    }, 500);
                }
            }
        }
    }
});

// --- True Ending Unlocked ---
function triggerTrueEndingUnlock() {
    setTimeout(() => {
        debugConsole.classList.add("console-closed");
    }, 1000);

    speakerNameEl.textContent = "ソフィア";
    typeDialogueText("……運命の糸が……切れました。あなたは提示された運命に抗い、自分の意思で選択を放棄し、そして……システムを超越しました。");

    setTimeout(() => {
        currentArcanaEl.textContent = "XXI : THE WORLD (世界)";
        
        const worldCard = document.createElement("div");
        worldCard.className = "card-wrapper";
        worldCard.id = "world-card";

        const back = document.createElement("div");
        back.className = "card-face card-back";
        const front = document.createElement("div");
        front.className = "card-face card-front";

        const imgSlot = document.createElement("div");
        imgSlot.className = "card-image-slot";
        imgSlot.style.backgroundImage = `url('${TAROT_IMAGES[21]}')`; // The World card

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

        cardsContainer.appendChild(worldCard);

        worldCard.addEventListener("click", () => {
            if (isCardRevealed) return;
            revealCard(worldCard, "【トゥルーエンド】運命の超越。あなたは自分で考え、決断する責任を取り戻しました。本当の『世界（全体性）』の獲得です。愚者の旅はここで終わります。");
            
            setTimeout(() => {
                clickPromptEl.classList.remove("hidden");
                clickPromptEl.onclick = () => {
                    showTrueEndingOverlay();
                };
                dialogueTextEl.parentElement.onclick = () => {
                    showTrueEndingOverlay();
                };
            }, 1000);
        });
    }, 2500);
}

function showTrueEndingOverlay() {
    endingOverlay.classList.remove("hidden");
    endingTitle.textContent = "XXI : THE WORLD (自己実現)";
    endingTitle.style.color = "var(--color-gold)";
    endingDesc.innerHTML = `
        おめでとうございます。あなたは「運命」という甘美なシステムからの脱却に成功しました。<br>
        大アルカナの旅路は、与えられたストーリーをなぞることではありませんでした。<br>
        無垢な「愚者」が本当の自己（ユングのSelf）を獲得し、自由意思に基づいて生きる力を得ることこそが、真の「世界」の獲得です。<br><br>
        <span style="color: var(--color-gold); font-size: 18px; font-weight: bold;">「あなたの運命は、あなた自身の選択によって創られる」</span>
    `;
    restartBtn.textContent = "最初の白紙に戻る";
    restartBtn.onclick = () => {
        currentLoop = 1;
        window.location.reload();
    };
}

// Set up dialogue advance click handlers for normal game steps
function advanceGame() {
    const currentScenarioLength = SCENARIO[currentLoop].length;

    // Special Loop 3 end check (if they failed)
    if (currentLoop === 3 && currentStep === 1 && isFateControlled && isCardRevealed) {
        triggerLoopBackEnd();
        return;
    }

    if (currentStep >= currentScenarioLength - 1) {
        if (currentLoop < 3) {
            triggerBadEnd();
        } else {
            triggerLoopBackEnd();
        }
        return;
    }

    currentStep++;
    loadStep();
}

// Start game on load
window.addEventListener("load", () => {
    initGame();
});
