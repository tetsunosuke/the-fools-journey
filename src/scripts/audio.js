/**
 * PROJECT FOOL - Web Audio API Procedural Audio Engine
 * Generates BGM and SE dynamically without external asset dependencies.
 */

class AudioEngine {
    constructor() {
        this.ctx = null;
        this.muted = localStorage.getItem("fools_journey_muted") === "true";
        this.currentBgmType = null; // 'sophia', 'philo', 'glitch', or null
        
        // Nodes for BGM
        this.bgmSource = null;
        this.bgmGain = null;
        this.bgmInterval = null;
        
        // Master Gain
        this.masterGain = null;
        
        // Initialize on DOM load and user interaction
        if (typeof window !== "undefined") {
            window.addEventListener("click", () => this.initContext(), { once: true });
            window.addEventListener("touchstart", () => this.initContext(), { once: true });
            
            // Listen for page visibility changes
            document.addEventListener("visibilitychange", () => this.handleVisibilityChange());
        }
    }

    initContext() {
        if (this.ctx) return;
        
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContextClass();
            
            // Setup master control
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.6, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);
            
            console.log("Audio Engine context initialized.");
            
            // Enable UI button
            this.updateButtonUI();
            
            // Resume/Start current BGM if queued
            if (this.currentBgmType) {
                const type = this.currentBgmType;
                this.currentBgmType = null;
                this.playBGM(type);
            }
        } catch (e) {
            console.error("Failed to initialize Web Audio API", e);
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem("fools_journey_muted", this.muted ? "true" : "false");
        
        if (this.masterGain && this.ctx) {
            const targetGain = this.muted ? 0 : 0.6;
            this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.1);
        }
        
        this.updateButtonUI();
        
        // If unmuting and context is suspended, resume it
        if (!this.muted && this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    }

    updateButtonUI() {
        const btn = document.getElementById("sound-btn");
        if (!btn) return;
        
        btn.disabled = false;
        btn.title = this.muted ? "音声 (ミュート中 - クリックでオン)" : "音声 (オン - クリックでミュート)";
        
        if (this.muted) {
            btn.classList.add("muted");
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
            `;
        } else {
            btn.classList.remove("muted");
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
            `;
        }
    }

    handleVisibilityChange() {
        if (!this.ctx) return;
        if (document.hidden) {
            this.ctx.suspend();
        } else if (!this.muted) {
            this.ctx.resume();
        }
    }

    // --- Sound Effects (SE) ---
    
    // Play a sound effect wrapper
    playSE(type) {
        if (!this.ctx) return;
        if (this.ctx.state === "suspended") {
            this.ctx.resume().then(() => this._triggerSE(type));
        } else {
            this._triggerSE(type);
        }
    }

    _triggerSE(type) {
        const now = this.ctx.currentTime;
        
        switch (type) {
            case "click": {
                // Gentle button click sound
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = "sine";
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
                
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                
                osc.connect(gain);
                gain.connect(this.masterGain);
                
                osc.start(now);
                osc.stop(now + 0.08);
                break;
            }
            case "type": {
                // Short typewriter click
                const bufferSize = this.ctx.sampleRate * 0.01; // 10ms buffer
                const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                const data = buffer.getChannelData(0);
                
                // White noise with exponential decay
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
                }
                
                const noise = this.ctx.createBufferSource();
                noise.buffer = buffer;
                
                const filter = this.ctx.createBiquadFilter();
                filter.type = "bandpass";
                // Randomize frequency slightly for more natural typing feel
                filter.frequency.setValueAtTime(1200 + Math.random() * 400, now);
                filter.Q.setValueAtTime(3, now);
                
                const gain = this.ctx.createGain();
                gain.gain.setValueAtTime(0.04 + Math.random() * 0.02, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);
                
                noise.connect(filter);
                filter.connect(gain);
                gain.connect(this.masterGain);
                
                noise.start(now);
                noise.stop(now + 0.01);
                break;
            }
            case "cardFlip": {
                // Swoosh and light snap
                const osc = this.ctx.createOscillator();
                const noiseNode = this.ctx.createBufferSource();
                const filter = this.ctx.createBiquadFilter();
                const gain = this.ctx.createGain();
                
                // Swoosh noise buffer
                const dur = 0.25;
                const bufferSize = this.ctx.sampleRate * dur;
                const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
                }
                noiseNode.buffer = buffer;
                
                filter.type = "bandpass";
                filter.frequency.setValueAtTime(1500, now);
                filter.frequency.exponentialRampToValueAtTime(300, now + dur);
                filter.Q.setValueAtTime(2, now);
                
                osc.type = "triangle";
                osc.frequency.setValueAtTime(180, now);
                osc.frequency.exponentialRampToValueAtTime(80, now + dur);
                
                const oscGain = this.ctx.createGain();
                oscGain.gain.setValueAtTime(0.08, now);
                oscGain.gain.exponentialRampToValueAtTime(0.001, now + dur);
                
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
                
                noiseNode.connect(filter);
                filter.connect(gain);
                
                osc.connect(oscGain);
                oscGain.connect(this.masterGain);
                gain.connect(this.masterGain);
                
                noiseNode.start(now);
                noiseNode.stop(now + dur);
                osc.start(now);
                osc.stop(now + dur);
                break;
            }
            case "dayTransition": {
                // Warm ambient low chime (temple gong)
                const frequencies = [110, 220, 330, 440, 550, 660];
                const duration = 3.5;
                
                frequencies.forEach((freq, index) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(freq, now);
                    
                    // Higher partials decay faster
                    const decay = duration / (index + 1);
                    const vol = 0.08 / (index + 1);
                    
                    gain.gain.setValueAtTime(vol, now);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);
                    
                    osc.connect(gain);
                    gain.connect(this.masterGain);
                    
                    osc.start(now);
                    osc.stop(now + duration);
                });
                break;
            }
            case "glitch": {
                // Digitized glitch sound effect
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(120, now);
                
                // Rapid frequency stepping
                for (let i = 0; i < 10; i++) {
                    const timeOffset = i * 0.03;
                    osc.frequency.setValueAtTime(100 + Math.random() * 800, now + timeOffset);
                }
                
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.setValueAtTime(0.15, now + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                
                osc.connect(gain);
                gain.connect(this.masterGain);
                
                osc.start(now);
                osc.stop(now + 0.35);
                break;
            }
        }
    }

    // --- Background Music (BGM) Loops ---

    playBGM(type) {
        if (this.currentBgmType === type) return; // Already playing
        
        this.stopBGM();
        this.currentBgmType = type;
        
        if (!this.ctx) return; // Context not ready, will play on initContext
        
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.bgmGain.connect(this.masterGain);
        
        // Fade in BGM
        this.bgmGain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 2.0);
        
        if (type === "sophia") {
            this._startSophiaBgm();
        } else if (type === "philo") {
            this._startPhiloBgm();
        } else if (type === "glitch") {
            this._startGlitchBgm();
        }
    }

    stopBGM() {
        if (this.bgmInterval) {
            clearInterval(this.bgmInterval);
            this.bgmInterval = null;
        }
        
        if (this.bgmGain && this.ctx) {
            const currentGain = this.bgmGain;
            const now = this.ctx.currentTime;
            currentGain.gain.cancelScheduledValues(now);
            currentGain.gain.setValueAtTime(currentGain.gain.value, now);
            currentGain.gain.linearRampToValueAtTime(0, now + 1.5);
            
            setTimeout(() => {
                try {
                    currentGain.disconnect();
                } catch(e){}
            }, 1600);
        }
        
        this.currentBgmType = null;
    }

    // Dynamic Procedural Ambient Pads
    _startSophiaBgm() {
        // Sophia's theme: Dreamy, sweet but slightly unstable/suspicious chords (Major/Minor shifts)
        // A slow chord progression (Am -> Dm -> G -> C -> E7)
        const chords = [
            [220, 261.63, 329.63], // Am (A3, C4, E4)
            [146.83, 293.66, 349.23], // Dm (D3, D4, F4)
            [196.00, 246.94, 293.66], // G (G3, B3, D4)
            [130.81, 261.63, 329.63], // C (C3, C4, E4)
            [164.81, 246.94, 329.63, 415.30] // E7 (E3, B3, E4, G#4)
        ];
        
        let chordIndex = 0;
        
        const playNextChord = () => {
            if (!this.bgmGain || !this.ctx || this.currentBgmType !== "sophia") return;
            
            const now = this.ctx.currentTime;
            const chord = chords[chordIndex];
            chordIndex = (chordIndex + 1) % chords.length;
            
            // Trigger notes in the chord with long slow envelopes
            chord.forEach((freq) => {
                const osc = this.ctx.createOscillator();
                const filter = this.ctx.createBiquadFilter();
                const noteGain = this.ctx.createGain();
                
                osc.type = "triangle";
                osc.frequency.setValueAtTime(freq, now);
                
                // Add a very subtle pitch modulation (vibrato) for a dreamy/unstable feel
                const lfo = this.ctx.createOscillator();
                const lfoGain = this.ctx.createGain();
                lfo.frequency.setValueAtTime(0.5 + Math.random() * 0.5, now);
                lfoGain.gain.setValueAtTime(1.5, now);
                
                lfo.connect(lfoGain);
                lfoGain.connect(osc.frequency);
                
                filter.type = "lowpass";
                filter.frequency.setValueAtTime(300 + Math.random() * 200, now);
                
                // Very slow envelope
                const attack = 2.0;
                const sustain = 3.0;
                const release = 3.0;
                
                noteGain.gain.setValueAtTime(0, now);
                noteGain.gain.linearRampToValueAtTime(0.08, now + attack);
                noteGain.gain.setValueAtTime(0.08, now + attack + sustain);
                noteGain.gain.exponentialRampToValueAtTime(0.0001, now + attack + sustain + release);
                
                osc.connect(filter);
                filter.connect(noteGain);
                noteGain.connect(this.bgmGain);
                
                lfo.start(now);
                osc.start(now);
                
                const totalDur = attack + sustain + release;
                osc.stop(now + totalDur);
                lfo.stop(now + totalDur);
            });
        };
        
        playNextChord();
        this.bgmInterval = setInterval(playNextChord, 6000); // Trigger a chord every 6s (chords overlap)
    }

    _startPhiloBgm() {
        // Philo's theme: Crystalline, self-reflective, clear, ambient bell/pluck progression in Major Pentatonic
        const scale = [196.00, 220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // G pentatonic scale
        
        const playPluck = () => {
            if (!this.bgmGain || !this.ctx || this.currentBgmType !== "philo") return;
            
            const now = this.ctx.currentTime;
            
            // Randomly choose 1 or 2 notes from scale to create ambient harmony
            const noteCount = Math.random() > 0.6 ? 2 : 1;
            for (let i = 0; i < noteCount; i++) {
                const note = scale[Math.floor(Math.random() * scale.length)];
                
                const osc = this.ctx.createOscillator();
                const noteGain = this.ctx.createGain();
                
                osc.type = "sine";
                osc.frequency.setValueAtTime(note, now);
                
                // Pluck envelope: fast attack, very long decay/reverb-like release
                const dur = 4.0 + Math.random() * 3.0;
                noteGain.gain.setValueAtTime(0, now);
                noteGain.gain.linearRampToValueAtTime(0.05, now + 0.1);
                noteGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
                
                osc.connect(noteGain);
                noteGain.connect(this.bgmGain);
                
                osc.start(now);
                osc.stop(now + dur);
            }
        };
        
        playPluck();
        // Play ambient bell pluck every 3.5s - 5.5s
        const scheduler = () => {
            if (this.currentBgmType !== "philo") return;
            playPluck();
            const delay = 3500 + Math.random() * 2000;
            this.bgmInterval = setTimeout(scheduler, delay);
        };
        this.bgmInterval = setTimeout(scheduler, 4000);
    }

    _startGlitchBgm() {
        // Glitch theme: eerie low hum, distorted oscillator sweeps, and random white noise bursts
        const playGlitchNode = () => {
            if (!this.bgmGain || !this.ctx || this.currentBgmType !== "glitch") return;
            
            const now = this.ctx.currentTime;
            
            const osc = this.ctx.createOscillator();
            const filter = this.ctx.createBiquadFilter();
            const noteGain = this.ctx.createGain();
            
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(50 + Math.random() * 40, now);
            osc.frequency.linearRampToValueAtTime(30 + Math.random() * 20, now + 4.0);
            
            // Resonance filter sweep
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(150, now);
            filter.frequency.exponentialRampToValueAtTime(80, now + 4.0);
            filter.Q.setValueAtTime(5, now);
            
            noteGain.gain.setValueAtTime(0.12, now);
            noteGain.gain.linearRampToValueAtTime(0.02, now + 4.0);
            
            osc.connect(filter);
            filter.connect(noteGain);
            noteGain.connect(this.bgmGain);
            
            osc.start(now);
            osc.stop(now + 4.0);
        };
        
        playGlitchNode();
        this.bgmInterval = setInterval(playGlitchNode, 4000);
    }
}

export const gameAudio = new AudioEngine();
if (typeof window !== "undefined") {
    window.gameAudio = gameAudio;
}

