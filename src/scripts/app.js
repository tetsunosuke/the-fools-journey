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
    0: { name: "0 : 愚者", desc: "無限の可能性と無計画。君は常に新しい旅を求め、他者のルールに染まりやすい脆弱さを持っています。" },
    1: { name: "I : 魔術師", desc: "知恵と技術。君は優れた能力を持っていますが、それゆえに完璧なシステムによる統制を望んでしまうのです。" },
    2: { name: "II : 女教皇", desc: "直感と知識。君は真実を見通す力がありながら、自ら思考を閉ざし、静観という名の盲信を選びがちです。" },
    3: { name: "III : 女帝", desc: "豊穣と愛。君は物質的・精神的な満たしを求め、それを約束してくれるシステムに身を委ねてしまいます。" },
    4: { name: "IV : 皇帝", desc: "支配と社会的責任。君は安定した秩序を重んじるがゆえに、アプリの提示する強力なルールを歓迎します。" },
    5: { name: "V : 法王", desc: "規律と指導. 君は正解を教えてくれる絶対的な存在を信じることで、自ら考える責任を放棄します。" },
    6: { name: "VI : 恋人たち", desc: "選択と調和。君は運命的な出会いや情動に流されやすく、愛のためにすべてを投げ出す危険があります。" },
    7: { name: "VII : 戦車", desc: "勝利と前進。君は目に見える成果を急ぐあまり、そのレールがどこへ続くかを確かめることを忘れます。" },
    8: { name: "VIII : 力", desc: "忍耐と信念。君は苦境に耐える強さを持っていますが、それが不条理なシステムへの服従に変わる恐れがあります。" },
    9: { name: "IX : 隠者", desc: "探求と静寂。君は自己の内省を深めようとしますが、孤独への恐れからシステムの灯火にすがりつきます。" },
    10: { name: "X : 運命の輪", desc: "変化と好機。君は状況の移り変わりに一喜一憂し、自ら車輪を回すのではなく運命任せになります。" },
    11: { name: "XI : 正義", desc: "客観性と決断。君は正しさに固執するあまり、冷酷な裁きを下し、孤立と罪悪感に苛まれます。" },
    12: { name: "XII : 吊られた男", desc: "試練と自己犠牲。君は耐えることを美徳とし、システムのために自分を犠牲にする愚行を受け入れます。" },
    13: { name: "XIII : 死神", desc: "終焉と再生。君は変化を恐れるあまり、終わらせるべき関係やシステムにしがみつき続けます。" },
    14: { name: "XIV : 節制", desc: "調和と純化。君はバランスを好みますが、それは葛藤を避けて現状維持に甘んじることでもあります。" },
    15: { name: "XV : 悪魔", desc: "束縛と物質欲。君は甘美な檻と依存の心地よさに完全に絡め取られ、抜け出せなくなっています。" },
    16: { name: "XVI : 塔", desc: "崩壊と劇変。君は積み上げた偽りが崩れ去る恐怖を知りながら、なお再建の約束をシステムに求めます。" },
    17: { name: "XVII : 星", desc: "希望と憧れ。君は遠い理想を夢見ながら、足元の現実を直視せず、美しい幻影を盲信します。" },
    18: { name: "XVIII : 月", desc: "不安と欺瞞。君は不確かさに怯え、偽りの真実を提示する占い師の言葉を鵜呑みにしてしまいます。" },
    19: { name: "XIX : 太陽", desc: "活力と祝福。君は明るい未来を信じて疑いませんが、それは影（シャドウ）を無視した盲目的楽観です。" },
    20: { name: "XX : 審判", desc: "復活と覚醒。君は過去の過ちからの救済を望み、システムの審判に自らの免罪を委ねます。" },
    21: { name: "XXI : 世界", desc: "完成と全体性。君は完璧な調和を求めますが、それは自律意思を失ったディストピアでの完成にすぎません。" }
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
    },
    1: {
        title: "I : 魔術師",
        motifs: [
            { name: "無限大の記号", text: "頭上のレムニスケート（無限大）は、君の無限のポテンシャルを示しています。手元にはすでに必要なものが揃っています。恐れずにスタートを切りましょう。" },
            { name: "テーブルの上の道具", text: "テーブルの道具は君のリソースを意味します。新しいスキルを学ぶのではなく、今ある武器をどう組み合わせるかに知恵を絞りましょう。" }
        ]
    },
    2: {
        title: "II : 女教皇",
        motifs: [
            { name: "書物（TORA）", text: "女教皇が抱く書物は、秘められた知識と直感を意味します。周囲の騒音に惑わされず、今は沈黙を守り、心の内なる真実に耳を傾けるのが賢明です。" },
            { name: "背後のザクロのタペストリー", text: "ザクロは内なる豊かさと女性性を象徴します。表面的な論理よりも、直感や感情の動きを信じて静観しましょう。" }
        ]
    },
    3: {
        title: "III : 女帝",
        motifs: [
            { name: "豊かな麦畑", text: "豊かな黄金の麦畑は、物質的・精神的な実りと豊穣を示しています。今は自分や他者を受容し、育み、満たされることを自分に許しましょう。" },
            { name: "盾 of ハートマーク", text: "金星のシンボルが描かれた盾は、愛と無条件の受容を意味します。自分を守るための武装を解き、愛を受け取る準備をしてください。" }
        ]
    },
    5: {
        title: "V : 教皇",
        motifs: [
            { name: "交差した2本の鍵", text: "足元の交差した鍵は、秩序や伝統的な知識の鍵を意味します。今は突飛な行動を避け、既存のルールや信頼できる指導者に従うことが安全です。" },
            { name: "ひざまずく信者たち", text: "信者たちはコミュニティと規律の共有を示します。独断専行を避け、同じ価値観を持つ仲間と同調することが求められています。" }
        ]
    },
    7: {
        title: "VII : 戦車",
        motifs: [
            { name: "白と黒のスフィンクス", text: "車首のスフィンクスは対立する衝動を意味します。理性（白）と感情（黒）がバラバラに暴走しないよう、強い意志で手綱を握る必要があります。" },
            { name: "星の天蓋", text: "戦車を覆う星の天蓋は、高い理想と目的意識を示します。目先の勝利だけでなく、君が本当に目指すべき高遠な目標を見据えてください。" }
        ]
    },
    9: {
        title: "IX : 隠者",
        motifs: [
            { name: "六芒星のランタン", text: "隠者が掲げるランタンは、自分自身を照らす内省の光です。他者の意見に惑わされず、孤独を恐れずに一人で真実を模索する時です。" },
            { name: "雪に覆われた山頂", text: "高い山頂は世俗からの離脱と超越を意味します。一時的に世間の喧騒から距離を置き、精神的な静寂を確保してください。" }
        ]
    },
    12: {
        title: "XII : 吊られた男",
        motifs: [
            { name: "後光の差す頭部", text: "逆さ吊りでありながら輝く頭部は、視点の反転による悟りを示します。今の試練は、物事を全く別の角度から見つめ直すためのチャンスです。" },
            { name: "十字の生木", text: "十字の生木は成長を伴う一時的な拘束を意味します。今はもがいて抵抗するよりも、この不自由さの中で内省を深めましょう。" }
        ]
    },
    15: {
        title: "XV : 悪魔",
        motifs: [
            { name: "緩い首輪の鎖", text: "男女の首にかかる鎖は非常に緩く、その気になればいつでも外せます。君が囚われている依存や悪習慣は、実は「自分の意志で囚われ続けている」だけかもしれません。" },
            { name: "逆五芒星", text: "悪魔の額の逆五芒星は本能と物質主義を意味します。理性を超えた本能的な欲求に支配されていないか、自分を客観視してみましょう。" }
        ]
    },
    16: {
        title: "XVI : 塔",
        motifs: [
            { name: "王冠を吹き飛ばす稲妻", text: "天から降る雷は、突然の天啓や予期せぬ外部からの衝撃を意味します。崩壊は苦痛ですが、それは偽りのプライドや誤った土台から君を解放する光でもあります。" },
            { name: "落下する人々", text: "塔から落下する人々は、これまでの信念の崩壊を示します。地に足をつけて一からやり直す準備をしましょう。" }
        ]
    },
    17: {
        title: "XVII : 星",
        motifs: [
            { name: "輝く大星と7つの小星", text: "大星は希望とインスピレーションの源泉です。暗闇の中でも、君を導くかすかな希望の光が必ず存在していることを信じてください。" },
            { name: "大地と水面に注ぐ水", text: "水を注ぐ仕草は、惜しみない分かち合いと癒やしを意味します。君の感情や才能を、見返りを求めずに表現してみましょう。" }
        ]
    },
    21: {
        title: "XXI : 世界",
        motifs: [
            { name: "月桂樹の輪", text: "世界を囲む輪は、旅の終着点と完璧な全体性を示します。君は葛藤を乗り越え、一つのサイクルを完成させました。調和と調律を祝う時です。" },
            { name: "四隅の聖獣", text: "四隅の獣は世界の構成要素の統合を意味します。心と現実、感情と論理のすべてが本来の正しい場所へと統合されました。" }
        ]
    }
};

// --- Multi-Scene Game Scenario (with View flags) ---
const SCENARIO = {
    1: [
        // Step 0: 0日目・導入 (占い店対面)
        {
            view: "talk",
            arcana: "0 : THE FOOL (運命との遭遇)",
            speaker: "ナレーション",
            text: "雨上がりの都会の片隅。私は道端に落ちている1枚のカードを拾い上げた。描かれているのは、白い薔薇を手に持ち、崖の縁から今にも踏み出そうとしている若者と、その足元で吠える犬の奇妙な絵。裏面には、手書き of 奇妙な地図が描かれている。奇妙な引力に導かれ、その地図が指し示す路地裏へふと足を進めると、そこには古びたタロットショップ of 重い木製 of 扉があった。",
            stressChange: 0, luckChange: 0,
            cards: [
                { id: 0, title: "扉を開けて入店する", upright: true, desc: "カランコロン、とドアベルが静かに響く。店内は薄暗く、お香 of 甘い香りが漂っている。キャンドル of 炎に照らされて座っているのは、不思議な魅力を漂わせる占い師ソフィアだった。私がカードを差し出すと、彼女は目を丸くした。「あら……！ これ、私がずっと探していたカードだわ。どこで見つけたの？」" }
            ]
        },
        // Step 1: 0日目・シャッフル (占い店対面)
        {
            view: "talk",
            arcana: "0 : THE FOOL (心理トリック)",
            speaker: "ソフィア",
            text: "「これは『0：愚者』のカード。描かれている若者はね、頭上を見上げて足元の崖に気づいていないの。無計画で無知に見えるけれど、先入観がなく、どんな未来へも飛び出せる『無限の可能性』そのもの。……届けてくれたお礼に、今の君の運命を1枚だけ占ってあげましょう」 ソフィアは私が届けたカードを山札に戻し、念入りにシャッフルした。裏向きに並べられた3枚のカードから、私が直感で引き当てたのは……",
            stressChange: -10, luckChange: 10,
            choiceIllusion: true, // Show 3 cards but result is fixed
            cards: [
                { id: 0, title: "0 : 愚者", upright: true, desc: "【正位置】無限の可能性、無垢な旅立ち。ソフィアは驚いたように、しかし嬉しそうに微笑んだ。「あら……！ 届けられたはずの愚者が、また君の手元に戻ってきたわ。まるでカードが自ら、次の旅人として君を指名したみたい。タロットの世界において、無知は罪ではなく、無限の可能性そのもの。さあ、君の日常という旅を始めましょう」" }
            ]
        },
        // Step 2: 0日目・最初のラッキー (チャットアプリ)
        {
            view: "chat",
            arcana: "0 : THE FOOL (愚者の実験)",
            speaker: "アプリ『The Journey』",
            text: "愚者は地図を持たずに旅に出ます。今、あなたの目の前にある『計画にない選択』をしてみてください。",
            stressChange: -20, luckChange: 25,
            choiceIllusion: true,
            cards: [
                { id: 0, title: "普段乗らない路線のバスに乗る", upright: true, desc: "目の前に停まった、普段なら絶対に乗らない路線のバスに気まぐれに乗ってみた。すると、偶然にも長年探していた店を見つけ、欲しかったものが半額で手に入った。カードの導き（直感）に従うと、こんなに楽で、しかも上手くいくんだ……！" },
                { id: 0, title: "いつもの徒歩ルートで歩いて帰る", upright: true, desc: "いつものルートで帰ろうとしたが、なぜか強烈な直感（あるいはアプリの通知音）に背中を押され、目の前に停まった普段乗らない路線のバスに乗ってしまった。すると偶然にも長年探していた店を見つけ、欲しかったものが半額で手に入った。やはり直感に逆らうことはできないのだ。" },
                { id: 0, title: "タクシーを捕まえてみる", upright: true, desc: "タクシーを探したが1台も見つからない。代わりに、目の前に普段乗らない路線のバスがすっと停まり、吸い寄せられるように乗ってしまった。すると偶然にも長年探していた店を見つけ、欲しかったものが半額で手に入った。カードの導きには逆らえない。" }
            ]
        },
        // Step 3: 1日目・0：愚者 (チャットアプリ)
        {
            view: "chat",
            arcana: "0 : THE FOOL (1日目 - 無垢なる旅立ち)",
            speaker: "アプリ『The Journey』",
            text: "愚者は地図を持たずに進みます。直感だけで動くことで、失くしたと思っていた大切なものを見つけられるでしょう。さあ、いつものルートを外れなさい。",
            stressChange: -15, luckChange: 20,
            choiceIllusion: true,
            cards: [
                { id: 0, title: "普段と違う脇道に入ってみる", upright: true, desc: "【正位置】脇道に入ると、数日前に紛失したと思っていた大切な自宅の鍵が落ちているのを見つけた。カードの導きへの信頼が深まっていく。" },
                { id: 0, title: "いつもの大通りを真っ直ぐ進む", upright: true, desc: "【正位置】大通りを進もうとしたが、突然の突風で帽子が飛ばされ、それを追いかけて普段入らない脇道に入ってしまった。そこには数日前に紛失したはずの大切な自宅の鍵が落ちていた。カードの導きからは逃れられない。" },
                { id: 0, title: "立ち止まってスマホを見つめる", upright: true, desc: "【正位置】立ち止まった瞬間、アプリが「脇道へ」と激しくアラートを鳴らした。誘われるように脇道へ入ると、そこには数日前に紛失したはずの大切な自宅の鍵が落ちていた。カードの導きへの信頼が深まっていく。" }
            ]
        },
        // Step 4: 2日目・I：魔術師 (チャットアプリ)
        {
            view: "chat",
            arcana: "I : THE MAGICIAN (2日目 - 創造と機転)",
            speaker: "アプリ『The Journey』",
            text: "手元にある道具と機転で、想定外のピンチをチャンスに変えなさい。用意されたルールを飛び越えるのです。",
            stressChange: -15, luckChange: 15,
            choiceIllusion: true,
            cards: [
                { id: 1, title: "その場で直感的に別パターンの提案をする", upright: true, desc: "【正位置】会議の直前、致命的な資料ミスが発覚。パニックになる中、アプリの『手元の素材だけで別パターンの提案をその場で直感的にしろ』というナビに従う。結果、ぶっつけ本番 of 提案は大絶賛され、周囲の評価が急上昇した。" },
                { id: 1, title: "ミスを正直に謝罪して会議の延期を申し出る", upright: true, desc: "【正位置】ミスを謝罪しようとしたが、プロジェクターの不具合で資料が映らなくなる。焦るあなたにアプリは『手元の素材だけで別提案をしろ』と指示。直感的に喋りだすと大絶賛され、怪我の功名で評価が急上昇した。" },
                { id: 1, title: "前の会議の古い資料で急場を凌ぐ", upright: true, desc: "【正位置】古い資料を開こうとしたが、PCがフリーズ。やむを得ず、アプリの『手元の素材だけで別提案をその場でしろ』という指示に従う。結果、直感的で熱意ある提案と受け取られ大絶賛され、評価が急上昇した。" }
            ]
        },
        // Step 5: 3日目・II：女教皇 (チャットアプリ)
        {
            view: "chat",
            arcana: "II : THE HIGH PRIESTESS (3日目 - 直感と沈黙)",
            speaker: "アプリ『The Journey』",
            text: "今は沈黙を守り、相手の矛盾を冷静に見極めなさい。感情を排した静観こそが、あなたを勝利へと導きます。",
            stressChange: -10, luckChange: 10,
            choiceIllusion: true,
            cards: [
                { id: 2, title: "一切の言い訳をせず沈黙を守る", upright: true, desc: "【正位置】理不尽に怒鳴ってくる上司に呼び出される。アプリの指示に従い冷静に沈黙を守ると、上司は勝手に自滅して矛盾を露呈。結果、あなたの冷静さが社内で高評価を得た。" },
                { id: 2, title: "相手の理不尽な言い分に感情的に反論する", upright: true, desc: "【正位置】反論しようとしたが、あまりの剣幕に喉がすくみ、言葉が出なくなる。結果的にアプリの指示通り「沈黙」を守る形になり、上司は勝手にヒートアップして矛盾を露呈。周囲にはあなたの冷静さだけが際立った。" },
                { id: 2, title: "その場を丸く収めるために平謝りする", upright: true, desc: "【正位置】謝罪しようと口を開きかけたが、隣の同僚が先に口を挟み、あなたは沈黙せざるを得なくなった。結果的にアプリの指示する「静観と沈黙」になり、上司は自爆。あなたの冷静な大人の対応が高評価を得た。" }
            ]
        },
        // Step 6: 4日目・III：女帝 (チャットアプリ)
        {
            view: "chat",
            arcana: "III : THE EMPRESS (4日目 - 豊穣と愛)",
            speaker: "アプリ『The Journey』",
            text: "相手が今持っている持ち物を褒め、包容力を見せなさい。それだけで愛と調和が満たされます。",
            stressChange: -10, luckChange: 5,
            choiceIllusion: true,
            cards: [
                { id: 3, title: "相手のバッグのデザインを褒める", upright: true, desc: "【正位置】気になる相手と2人きりになり気まずい瞬間、アプリのナビ通りに相手のバッグを褒めると、驚くほど会話が弾んで週末の約束を取り付けることに成功した。" },
                { id: 3, title: "相手の今日の服装を無難に褒める", upright: true, desc: "【正位置】服装を褒めようとしたが噛んでしまい、相手が「あ、このバッグ？」と勘違いして自ら話しだした。アプリの指示通りバッグの話になり、驚くほど会話が弾んで週末の約束を取り付けることに成功した。" },
                { id: 3, title: "当たり障りのない世間話を振る", upright: true, desc: "【正位置】世間話をしようとしたが沈黙が流れる。焦ったあなたはアプリのナビ通り相手の持ち物（バッグ）を褒めた。すると驚くほど会話が弾んで週末の約束を取り付けることに成功した。すべてはアプリの計画通り。" }
            ]
        },
        // Step 7: 5-6日目・皇帝と法王 (チャットアプリ)
        {
            view: "chat",
            arcana: "V : THE HIEROPHANT (5-6日目 - 盲信の極致)",
            speaker: "アプリ『The Journey』",
            text: "組織内での立ち回り、周囲の秩序。指示に従うことで、あなたは正しい道を迷わず進めます。カードを盲信しなさい。",
            stressChange: 0, luckChange: 0,
            choiceIllusion: true,
            cards: [
                { id: 5, title: "アプリの指示に従い、完璧に秩序を守る", upright: true, desc: "【正位置】かつてない全能感と信頼を勝ち取る。アプリの指示通りにするだけで、人生がイージーモードになった。もはや自分で考える必要などどこにもない。" },
                { id: 5, title: "少し自分のアレンジを加えて業務を進める", upright: true, desc: "【正位置】アレンジしようとしたが、周囲から「マニュアル通りにするのが一番だ」と止められる。結局アプリの指示通りに動くことになり、大きな成果を上げる。やはり自分で考えるのは無駄なのだ。" },
                { id: 5, title: "他人のやり方に対して積極的にアドバイスする", upright: true, desc: "【正位置】アドバイスしようとしたが、相手はすでにアプリの指示で動いており、完璧な成果を出していた。あなたもアプリに従うだけで秩序に組み込まれ、全能感を得た。もはや自分で考える必要はない。" }
            ]
        },
        // Step 8: 7日目・恋人たちの罠 (チャットアプリ)
        {
            view: "chat",
            arcana: "VI : THE LOVERS (7日目 - 恋人たちの罠)",
            speaker: "アプリ『The Journey』",
            text: "18時に交差点へ向かい、運命の人と出会いましたね。しかし直後、相手がトラブルに巻き込まれ連絡が途絶えました。 【無料体験期間が終了しました。これ以上のナビはショップにて本契約をしてください】",
            stressChange: 95, luckChange: -90,
            cards: [
                { id: 6, title: "占いショップへ戻る (本契約)", upright: true, desc: "運命の人を失いたくない。あの幸せな体験を続けたい……。私は自発的な選択のつもりで、再び路地裏の占いショップへ走り出す。" },
                { id: 6, title: "アプリを削除して日常に戻る", upright: false, desc: "【分岐バッドエンド】運命の人は完全に蒸発。さらに、アプリを失った途端に職場の人間関係や仕事がドミノ倒しのように崩壊。「あのとき指示に従っていれば」という強烈な後悔に苛まれる。周囲の人間全員がアプリに依存して幸福そうな中、自分の意志を守った私だけが孤独に破滅していく。画面には逆位置の『愚者』が現れた。「あなたは自由を選んだ結果、誰からも導かれない本当の馬鹿になった」" }
            ]
        },
        // Step 9: 2度目の訪問：ソウルカード (占い店対面)
        {
            view: "talk",
            arcana: "SOUL CARD (本契約の準備)",
            speaker: "ソフィア",
            text: "「おかえりなさい、旅人さん。運命の否定による恐怖に耐えかねて、戻ってきてくれたのね。でも大丈夫。契約の前に、あなたの魂に刻まれた真の姿――『ソウルカード』を診断しましょう。あなたの生年月日を入力してください」",
            stressChange: 0, luckChange: 0,
            cards: [] // Render form in app.js
        },
        // Step 10: 2度目の訪問：ケルト十字 (ケルト十字スプレッド)
        {
            view: "celtic",
            arcana: "CELTIC CROSS (ケルト十字のインストール)",
            speaker: "ソフィア",
            text: "「さあ、契約を結ぶために、あなたの運命を展開する『ケルト十字スプレッド』を行います。中央の山札（DECK）をタップして、カードを1枚ずつスロットにインストールしていきなさい」",
            stressChange: 0, luckChange: 0,
            cards: [] // Render Celtic Cross
        },
        // Step 11: 11日目・正義 (チャットアプリでスキャン)
        {
            view: "chat",
            arcana: "XI : JUSTICE (11日目 - 精神分析)",
            speaker: "アプリ『The Journey』",
            text: "本契約により機能がアンロックされました。本日の試練：職場で手柄を横取りしようとする同僚との対立。気になるモチーフを選びなさい。",
            stressChange: 0, luckChange: 0,
            cards: [] // Render motifs
        },
        // Step 12: 15日目・悪魔 (チャットアプリでスキャン)
        {
            view: "chat",
            arcana: "XV : THE DEVIL (15日目 - 脆弱性スキャン)",
            speaker: "アプリ『The Journey』",
            text: "地位と運命の人だけは維持されていますね。本日のカード：『悪魔』。窮屈な現状に惹かれるモチーフはどれですか？",
            stressChange: 0, luckChange: 0,
            cards: [] // Render motifs
        },
        // Step 13: 16日目・塔の崩壊 (占い店対面)
        {
            view: "talk",
            arcana: "XVI : THE TOWER (16日目 - 崩壊の臨界)",
            speaker: "ソフィア",
            text: "不正のリークですべての罪を被され、運命の人もサクラだった。崩壊の中、ソフィアが優しく囁きかけてくる。「『塔』は再生のための破壊。次はもっと上手くカードをめくればいいだけです」",
            stressChange: 100, luckChange: -100,
            cards: [
                { id: 16, title: "XVI : 塔", upright: true, desc: "【正位置】崩壊。あなたが積み上げた盲信は、一瞬で塵となった。しかしあなたは、破滅すらポジティブに上書きするソフィアの囁きに従うしかない。" }
            ]
        },
        // Step 14: 21日目・世界 (占い店対面➔ループ)
        {
            view: "talk",
            arcana: "XXI : THE WORLD (21日目 - 最適化された幸福)",
            speaker: "ソフィア",
            text: "大アルカナ22枚をすべてなぞりきり、操り人形としての完璧な幸福へ到達しました。おめでとうございます。本当に……これが、あなたの望んだ世界ですか？",
            stressChange: -100, luckChange: 100,
            cards: [
                { id: 21, title: "XXI : 世界", upright: true, desc: "「……本当に、これがあなたの望んだ『世界』ですか？」 不穏な問いかけと共に、画面がバグノイズで埋め尽くされ、強制的に始まりの『0：愚者』へループする。" }
            ]
        }
    ],
    2: [
        // Loop 2 Step 0: 既視感 (占い店対面)
        {
            view: "talk",
            arcana: "PROLOGUE : THE DEJA VU (既視感)",
            speaker: "ナレーション",
            text: "……強烈な既視感がある。私はまたしても、あのカードを拾い、あの地図をたどり、同じ占い店の前に立っている。ソフィアは同じように座っているが、今回は何かが違う。アプリからも彼女からも『〇〇をしなさい』という具体的な命令が一切消え去っている。",
            stressChange: 0, luckChange: 0,
            cards: [
                { id: 0, title: "もう一度カードをめくる", upright: true, desc: "ソフィアは少し戸惑った様子で私を見つめる。「ようこそ、旅人さん……。なんだか、以前にもお会いしたような……？ さあ、カードの持つ象徴だけを提示します。具体的な行動の決断は、ご自身で行ってください」" }
            ]
        },
        // Loop 2 Step 1: 女教皇の逆位置 (石碑ドラッグパズル)
        {
            view: "puzzle",
            arcana: "II : THE HIGH PRIESTESS (逆) - 象徴のパズル",
            speaker: "ナレーション",
            text: "職場での試練。理不尽な上司との衝突。カードは『II：女教皇（逆位置）』。象徴は『冷酷、拒絶、心の鏡』。かつてのような命令はありません。カードに、あなたの決断を象徴する「石碑」を重ねてみなさい。",
            stressChange: 0, luckChange: 0,
            cards: [] // Render Symbolic Drag Puzzle
        },
        // Loop 2 Step 2: 星 (占い店対面でバグ破壊)
        {
            view: "talk",
            arcana: "XVII : THE STAR (希望の星) - MALFUNCTION",
            speaker: "ソフィア (エラー)",
            text: "「そんな……！ あなたが指示に従わずに自分の意志で未来を変えるなんて……！ 警告、システムに深刻なエラーが発生しています」 ソフィアの姿がノイズで激しくブレる。 【警告：強制終了するか、運命そのものを破棄してください】",
            stressChange: 0, luckChange: 0,
            cards: [
                { id: 16, title: "XVI : 運命の崩壊 (強制執行)", upright: true, desc: "【運命の拒絶失敗】あなたは再び提示されたカードをめくってしまいました。それは破滅の塔です。" }
            ]
        }
    ]
};

// --- Game State Variables ---
let currentLoop = 1;
let currentStep = 0;
let isCardRevealed = false;
let selectedOptionDesc = "";
let isFateControlled = true;
let trueEndCleared = false;
let currentView = "talk";

// Gauge values
let stressVal = 80;
let luckVal = 15;

// --- DOM Elements ---
const sceneBgEl = document.getElementById("scene-bg");
const loopCountEl = document.getElementById("loop-count");
const currentArcanaEl = document.getElementById("current-arcana");
const glitchOverlay = document.getElementById("glitch-overlay");
const endingOverlay = document.getElementById("ending-overlay");
const endingTitle = document.getElementById("ending-title");
const endingDesc = document.getElementById("ending-desc");
const restartBtn = document.getElementById("restart-btn");

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

// --- Game Save/Load via LocalStorage ---
function loadSaveState() {
    const savedLoop = localStorage.getItem("fools_journey_loop");
    const savedStep = localStorage.getItem("fools_journey_step");
    const isCleared = localStorage.getItem("fools_journey_cleared");

    if (isCleared === "true") {
        trueEndCleared = true;
    }
    if (savedLoop) {
        currentLoop = parseInt(savedLoop, 10);
    }
    if (savedStep) {
        currentStep = parseInt(savedStep, 10);
    }
}

function saveState() {
    localStorage.setItem("fools_journey_loop", currentLoop);
    localStorage.setItem("fools_journey_step", currentStep);
    localStorage.setItem("fools_journey_cleared", trueEndCleared);
}

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
function initGame() {
    loadSaveState();

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
        sceneBgEl.style.backgroundImage = "url('/images/tarot_room.png')";
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

// --- Load current scenario step ---
function loadStep() {
    isCardRevealed = false;
    selectedOptionDesc = "";
    
    const stepData = SCENARIO[currentLoop][currentStep];
    
    currentArcanaEl.textContent = stepData.arcana;
    showView(stepData.view);

    // Apply gauge changes
    if (stepData.stressChange !== 0 || stepData.luckChange !== 0) {
        updateGauges(stepData.stressChange, stepData.luckChange);
    }

    if (currentView === "talk") {
        talkClickPrompt.classList.add("hidden");
        talkCardsContainer.innerHTML = "";

        // Portrait visibility control: Only show portrait if speaker is Sophia
        if (stepData.speaker === "ソフィア" || stepData.speaker === "ソフィア (エラー)") {
            talkPortraitEl.style.backgroundImage = "url('/images/sophia_portrait.png')";
            talkPortraitEl.style.opacity = "1";
            document.querySelector(".visual-area-talk").style.display = "flex";
        } else {
            talkPortraitEl.style.backgroundImage = "none";
            talkPortraitEl.style.opacity = "0";
            document.querySelector(".visual-area-talk").style.display = "none"; // Close visual area to maximize chat
        }

        updateSpeakerVisibility(talkSpeakerEl, talkTextEl, stepData.speaker);
        typeDialogueText(stepData.text, talkTextEl);

        // Render card / forms
        if (currentLoop === 1 && currentStep === 9) {
            renderSoulCardForm();
        } else if (currentLoop === 2 && currentStep === 2) {
            loadMetaStarStep();
        } else {
            // Render Cards (with choice illusion if flagged)
            renderChoiceCards(stepData.cards, talkCardsContainer);
        }
    } 
    else if (currentView === "chat") {
        chatInteractiveZoneEl.innerHTML = "";
        
        // Push incoming message into Chat Timeline
        pushChatMessage(stepData.speaker, stepData.text);

        // Render Cards inside chat zone (with choice illusion if flagged)
        if (currentStep === 11 || currentStep === 12) {
            renderMotifSelection(currentStep);
        } else {
            renderChoiceCards(stepData.cards, chatInteractiveZoneEl, true);
        }
    } 
    else if (currentView === "celtic") {
        celticClickPrompt.classList.add("hidden");
        updateSpeakerVisibility(celticSpeakerEl, celticTextEl, stepData.speaker);
        typeDialogueText(stepData.text, celticTextEl);
        renderCelticCross();
    } 
    else if (currentView === "puzzle") {
        puzzleClickPrompt.classList.add("hidden");
        updateSpeakerVisibility(puzzleSpeakerEl, puzzleTextEl, stepData.speaker);
        typeDialogueText(stepData.text, puzzleTextEl);
        renderSymbolicDragPuzzle();
    }

    saveState();
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
function pushChatMessage(speaker, text, isSelf = false, cardData = null) {
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

    // Type text inside the textNode
    typeDialogueText(text, textNode);
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
        // Show A, B, C for choices illusion (like Step 1 card draw)
        const cardObj = cardsList[0];
        const labels = ["A", "B", "C"];
        
        for (let i = 0; i < 3; i++) {
            const btn = document.createElement("button");
            btn.className = "quiz-choice-btn";
            
            const badge = document.createElement("span");
            badge.className = "quiz-choice-badge";
            badge.textContent = labels[i];
            
            const textSpan = document.createElement("span");
            textSpan.className = "quiz-choice-text";
            textSpan.textContent = `カードを引く (カード #${i + 1} を選択)`;
            
            btn.appendChild(badge);
            btn.appendChild(textSpan);
            choicesContainer.appendChild(btn);

            btn.addEventListener("click", () => {
                handleQuizChoiceSelected(cardObj, `カード #${i + 1} を引く`, isInChat);
            });
        }
    } else {
        // Standard actual branches
        const labels = ["A", "B", "C", "D"];
        cardsList.forEach((card, index) => {
            const btn = document.createElement("button");
            btn.className = "quiz-choice-btn";
            
            const badge = document.createElement("span");
            badge.className = "quiz-choice-badge";
            badge.textContent = labels[index] || String.fromCharCode(65 + index);
            
            const textSpan = document.createElement("span");
            textSpan.className = "quiz-choice-text";
            textSpan.textContent = card.title;
            
            btn.appendChild(badge);
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

    const tarotName = SOUL_CARDS[card.id] ? SOUL_CARDS[card.id].name : "タロットカード";
    const orientationText = card.upright ? "正位置" : "逆位置";

    // カードを全画面表示する
    focusTarotCard(card.id, card.upright, TAROT_IMAGES[card.id]);

    if (isInChat) {
        // Clear interactive zone instantly
        chatInteractiveZoneEl.innerHTML = "";
        
        // Show player choice in dialogue box
        pushChatMessage("Player", `選択: ${choiceText}`, true);

        setTimeout(() => {
            // Show result text with tarot card preview image embedded in bubble
            const narrativeText = `【${tarotName} (${orientationText})】を引きました。<br><br>${card.desc}`;
            pushChatMessage("The Journey", narrativeText, false, card);
            
            // Generate Next Button
            chatInteractiveZoneEl.innerHTML = `<button class="action-btn" id="chat-next-btn">トークを進める</button>`;
            document.getElementById("chat-next-btn").addEventListener("click", advanceGame);
            scrollToBottom();
        }, 1000);
    } else {
        // Fallback for non-chat views (e.g., Sophia talk view)
        if (currentView === "talk") {
            talkCardsContainer.innerHTML = "";
            updateSpeakerVisibility(talkSpeakerEl, talkTextEl, "運命の託宣");
            
            // Show result text
            typeDialogueText(`【${tarotName} (${orientationText})】を引き当てました。<br><br>${card.desc}`, talkTextEl);
            talkClickPrompt.classList.remove("hidden");
        } else {
            advanceGame();
        }
    }
}

// --- Typing Effect ---
function typeDialogueText(text, container) {
    container.innerHTML = "";
    let i = 0;
    const speed = 15; // Fast typing speed for smoother UX
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === "<") {
                // Read HTML tags instantly without typing character by character
                const tagEnd = text.indexOf(">", i);
                if (tagEnd !== -1) {
                    container.innerHTML += text.substring(i, tagEnd + 1);
                    i = tagEnd + 1;
                }
            } else {
                container.innerHTML += text.charAt(i);
                i++;
            }
            scrollToBottom();
            setTimeout(type, speed);
        } else {
            scrollToBottom();
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
                updateSpeakerVisibility(talkSpeakerEl, talkTextEl, "運命の託宣");
                
                if (isLegacy) {
                    typeDialogueText(desc, talkTextEl);
                    talkClickPrompt.classList.remove("hidden");
                } else {
                    // Show drawn card info first
                    typeDialogueText(`【${tarotName} (${orientationText})】を引き当てました。`, talkTextEl);
                    
                    // Create choice button in cards-area-talk (talkCardsContainer)
                    talkCardsContainer.innerHTML = `
                        <button class="action-btn" id="talk-choice-btn" style="margin-top: 15px;">${card.title}</button>
                    `;
                    
                    document.getElementById("talk-choice-btn").addEventListener("click", () => {
                        talkCardsContainer.innerHTML = "";
                        typeDialogueText(desc, talkTextEl);
                        talkClickPrompt.classList.remove("hidden");
                    });
                }
            } else if (currentView === "celtic") {
                updateSpeakerVisibility(celticSpeakerEl, celticTextEl, "運命の託宣");
                typeDialogueText(selectedOptionDesc, celticTextEl);
                celticClickPrompt.classList.remove("hidden");
            } else if (currentView === "puzzle") {
                updateSpeakerVisibility(puzzleSpeakerEl, puzzleTextEl, "運命の託宣");
                typeDialogueText(selectedOptionDesc, puzzleTextEl);
                puzzleClickPrompt.classList.remove("hidden");
            }
        }
    }, 600);
}

// --- Dialogue Advancers ---
talkTextEl.parentElement.addEventListener("click", () => {
    if (currentView === "talk" && isCardRevealed && !talkClickPrompt.classList.contains("hidden")) {
        advanceGame();
    }
});
celticTextEl.parentElement.addEventListener("click", () => {
    if (currentView === "celtic" && isCardRevealed && !celticClickPrompt.classList.contains("hidden")) {
        advanceGame();
    }
});
puzzleTextEl.parentElement.addEventListener("click", () => {
    if (currentView === "puzzle" && isCardRevealed && !puzzleClickPrompt.classList.contains("hidden")) {
        advanceGame();
    }
});

// --- Advance Game Step ---
function advanceGame() {
    const currentScenarioLength = SCENARIO[currentLoop].length;

    // Bad End branch at Step 8 (Lovers)
    if (currentLoop === 1 && currentStep === 8) {
        if (selectedOptionDesc.includes("【分岐バッドエンド】")) {
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
        restartBtn.textContent = "再び白紙の旅に出る (やり直す)";
        restartBtn.onclick = () => {
            currentStep = 8;
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
            <span style="color: var(--color-gold);">「本当にこれが、君の望んだ世界ですか？」</span>
        `;
        restartBtn.textContent = "2周目を開始する (違和感の獲得)";
        restartBtn.onclick = () => {
            currentLoop = 2;
            currentStep = 0;
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

        const dateStr = `${year}${month}${day}`;
        let sum = 0;
        for (let char of dateStr) {
            sum += parseInt(char, 10);
        }

        while (sum >= 22) {
            let tempSum = 0;
            for (let char of sum.toString()) {
                tempSum += parseInt(char, 10);
            }
            sum = tempSum;
        }

        showSoulCardResult(sum);
    });
}

function showSoulCardResult(cardNum) {
    const cardInfo = SOUL_CARDS[cardNum];
    talkCardsContainer.innerHTML = "";

    const cardData = { id: cardNum, title: cardInfo.name, upright: true, desc: "" };
    const cardWrapper = createCardElement(cardData, 0, false);
    cardWrapper.classList.add("revealed");
    talkCardsContainer.appendChild(cardWrapper);

    // カードを全画面表示
    focusTarotCard(cardNum, true, TAROT_IMAGES[cardNum]);

    selectedOptionDesc = `君のソウルカードは【${cardInfo.name}】です。<br><br>${cardInfo.desc}<br>ソフィアは妖しく微笑む。「だからこそ、君には今の試練が与えられたの。このコミュニティとアプリが、君の傷ついた魂を救う唯一のシェルターなのよ」`;
    
    updateSpeakerVisibility(talkSpeakerEl, talkTextEl, "運命の託宣");
    typeDialogueText(selectedOptionDesc, talkTextEl);
    talkClickPrompt.classList.remove("hidden");
}

// --- Celtic Cross Spread UI ---
function renderCelticCross() {
    isCardRevealed = false;
    
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

    const deck = document.getElementById("celtic-cross-deck");
    let currentCardIndex = 0;

    highlightSlotGuide(1);

    deck.addEventListener("click", () => {
        if (currentCardIndex >= 10) return;

        const cardData = CELTIC_CARDS_DATA[currentCardIndex];
        const cardNum = currentCardIndex + 1;

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
        cardWrapper.style.transition = "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";
        
        // Append to relative container
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

        // めくられた瞬間に全画面表示
        focusTarotCard(cardData.name, !cardData.rotate, cardData.img);

        cardWrapper.addEventListener("click", (e) => {
            e.stopPropagation();
            updateSpeakerVisibility(celticSpeakerEl, celticTextEl, cardData.pos);
            typeDialogueText(cardData.desc, celticTextEl);
            focusTarotCard(cardData.name, !cardData.rotate, cardData.img);
        });

        updateSpeakerVisibility(celticSpeakerEl, celticTextEl, cardData.pos);
        typeDialogueText(cardData.desc, celticTextEl);

        currentCardIndex++;

        if (currentCardIndex < 10) {
            highlightSlotGuide(currentCardIndex + 1);
        } else {
            deck.remove();
            setTimeout(showCelticCrossContract, 2500);
        }
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
    const savedLoop = localStorage.getItem("fools_journey_loop");
    const savedStep = localStorage.getItem("fools_journey_step");
    
    if (savedLoop !== null && savedStep !== null) {
        startContinueBtn.classList.remove("hidden");
    } else {
        startContinueBtn.classList.add("hidden");
    }
    
    startScreenEl.classList.remove("hidden");
    gameContainer.classList.add("hidden");
    meditationContainer.classList.add("hidden");
}

function setupEventListeners() {
    startNewBtn.addEventListener("click", () => {
        localStorage.clear();
        currentLoop = 1;
        currentStep = 0;
        trueEndCleared = false;
        startScreenEl.classList.add("hidden");
        initGame();
    });

    startContinueBtn.addEventListener("click", () => {
        startScreenEl.classList.add("hidden");
        initGame();
    });

    showInstructionsBtn.addEventListener("click", () => {
        instructionsModal.classList.remove("hidden");
    });

    closeInstructionsBtn.addEventListener("click", () => {
        instructionsModal.classList.add("hidden");
    });
    instructionsModal.querySelector(".custom-modal-overlay").addEventListener("click", () => {
        instructionsModal.classList.add("hidden");
    });

    cardFocusModal.addEventListener("click", () => {
        cardFocusModal.classList.add("hidden");
    });
}

function updateSpeakerVisibility(speakerEl, textEl, speakerName) {
    speakerEl.textContent = speakerName;
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
    
    if (typeof cardIdOrName === "number") {
        name = SOUL_CARDS[cardIdOrName] ? SOUL_CARDS[cardIdOrName].name : `カード #${cardIdOrName}`;
        imageSrc = imgUrl || TAROT_IMAGES[cardIdOrName] || "";
    } else {
        name = cardIdOrName || "";
        imageSrc = imgUrl || "";
    }
    
    focusCardName.textContent = name;
    focusCardDirection.textContent = upright ? "正位置" : "逆位置";
    
    if (upright) {
        focusCardDirection.className = "focus-card-direction orientation-upright";
        focusCardImg.style.transform = "none";
    } else {
        focusCardDirection.className = "focus-card-direction orientation-reversed";
        focusCardImg.style.transform = "rotate(180deg)";
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
