/**
 * Offline-first Sound & Voice Engine for WonderKids World
 * Uses Web Audio API for rich procedural sound effects and Web Speech API for voice prompts.
 */

class SoundService {
  private audioCtx: AudioContext | null = null;
  public sfxEnabled: boolean = true;
  public voiceEnabled: boolean = true;
  public musicEnabled: boolean = true;

  private initAudio() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Playful pop sound for balloons, bubbles, buttons
  public playPop() {
    if (!this.sfxEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // AudioContext not allowed before user gesture
    }
  }

  // Cheerful chime / correct answer sound (Ascending major arpeggio)
  public playSuccess() {
    if (!this.sfxEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const start = this.audioCtx.currentTime + idx * 0.08;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(start);
        osc.stop(start + 0.28);
      });
    } catch {
      // Ignored
    }
  }

  // Soft woodblock tap
  public playTap() {
    if (!this.sfxEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignored
    }
  }

  // Grand celebration fanfare / star award
  public playFanfare() {
    if (!this.sfxEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      const chordNotes = [
        { f: 523.25, t: 0 },
        { f: 659.25, t: 0.1 },
        { f: 783.99, t: 0.2 },
        { f: 1046.50, t: 0.35 },
        { f: 1318.51, t: 0.45 },
      ];
      chordNotes.forEach(({ f, t }) => {
        if (!this.audioCtx) return;
        const start = this.audioCtx.currentTime + t;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, start);

        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(start);
        osc.stop(start + 0.48);
      });
    } catch {
      // Ignored
    }
  }

  // Gentle, friendly "boing" hint for retry (never scary or harsh)
  public playGentleBoing() {
    if (!this.sfxEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // Ignored
    }
  }

  // Specific musical tone (for xylophone or piano games)
  public playTone(freq: number, duration: number = 0.3) {
    if (!this.sfxEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {
      // Ignored
    }
  }

  // Animal voice synthesizer effects
  public playAnimalSound(type: string) {
    if (!this.sfxEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;

      if (type === 'cat') {
        // Meow glide
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.linearRampToValueAtTime(800, now + 0.2);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.5);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.52);
      } else if (type === 'dog') {
        // Friendly woof
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.15);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'lion') {
        // Playful baby roar
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.4);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.42);
      } else {
        // Standard friendly animal chirp
        this.playPop();
      }
    } catch {
      // Ignored
    }
  }

  // Voice narration using Web Speech API with child-friendly settings
  public speak(text: string) {
    if (!this.voiceEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92; // Slightly slower, very clear for toddlers
      utterance.pitch = 1.25; // Warm, friendly, higher-pitched for kids
      utterance.lang = 'en-US';

      // Pick a friendly English voice if available
      const voices = window.speechSynthesis.getVoices();
      const childFriendlyVoice = voices.find(v => 
        (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Victoria')))
      ) || voices.find(v => v.lang.startsWith('en'));

      if (childFriendlyVoice) {
        utterance.voice = childFriendlyVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignored
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const sound = new SoundService();
