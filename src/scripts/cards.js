/**
 * PROJECT FOOL - Card DOM Element Helper
 */

import { gameState } from "./state.js";
import { SOUL_CARDS, TAROT_IMAGES } from "./constants.js";

// --- Create Card Element ---
export function createCardElement(card, index, useGlitch = true) {
    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";
    wrapper.dataset.index = index;

    if (useGlitch) {
        if (gameState.currentLoop === 2) {
            wrapper.classList.add("card-glitch-1");
        } else if (gameState.currentLoop === 3) {
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
