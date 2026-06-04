/**
 * PROJECT FOOL - Helper & Utility Functions
 */

import { gameState } from "./state.js";
import { MAX_LINE_CHARS } from "./constants.js";
import { changeBackground, focusTarotCard, scrollToBottom } from "./dom.js";

export function parseMarkdown(text) {
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
export function getSubHtml(html, visibleCount) {
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
export function typeDialogueText(text, container, onComplete = null) {
    const htmlText = parseMarkdown(text);
    container.innerHTML = "";
    
    // Calculate total visible characters by parsing html
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlText;
    const totalVisibleChars = tempDiv.textContent.length;
    
    let visibleCount = 0;
    const speed = 15;
    gameState.isTyping = true;
    
    gameState.skipTyping = () => {
        gameState.isTyping = false;
        gameState.skipTyping = null;
        container.innerHTML = htmlText;
        scrollToBottom();
        if (onComplete) onComplete();
    };

    function type() {
        if (!gameState.isTyping) return;
        if (visibleCount <= totalVisibleChars) {
            container.innerHTML = getSubHtml(htmlText, visibleCount);
            visibleCount++;
            scrollToBottom();
            setTimeout(type, speed);
        } else {
            gameState.isTyping = false;
            gameState.skipTyping = null;
            scrollToBottom();
            if (onComplete) onComplete();
        }
    }
    type();
}

export function autoSplitTextIntoPages(text, maxChars = MAX_LINE_CHARS) {
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

export function processPageTags(pageText, currentSpeaker, onFocusDone) {
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
        gameState.pendingStepLoad = () => { gameState.pendingStepLoad = null; onFocusDone(); };
        focusTarotCard(parseInt(cardNum, 10), true);
        return { text: "", speaker: currentSpeaker, skip: false, handled: true };
    }

    // [focus:画像パス:タイトル] → 画像をフォーカス表示
    const focusMatch = pageText.match(/^\[focus:([^:\]]+):?(.*)\]$/);
    if (focusMatch) {
        gameState.pendingStepLoad = () => { gameState.pendingStepLoad = null; onFocusDone(); };
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

    return { text: pageText, speaker: currentSpeaker, skip: false, handled: false };
}
