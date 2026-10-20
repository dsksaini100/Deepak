import React, { useState } from 'react';
import { UserProgress } from '../../types';
import { sound } from '../../services/sound';
import { 
  ArrowLeft, ShieldCheck, Volume2, Music, EyeOff, 
  Clock, RotateCcw, Award, CheckCircle2, Lock
} from 'lucide-react';

interface ParentZoneProps {
  onBack: () => void;
  progress: UserProgress;
  onUpdateSettings: (settings: UserProgress['settings']) => void;
  onResetProgress: () => void;
}

export const ParentZone: React.FC<ParentZoneProps> = ({
  onBack,
  progress,
  onUpdateSettings,
  onResetProgress,
}) => {
  // Adult gate question
  const [num1] = useState(6);
  const [num2] = useState(7);
  const [userAnswer, setUserAnswer] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer, 10) === num1 + num2) {
      setIsUnlocked(true);
      setErrorMsg('');
      sound.playSuccess();
    } else {
      sound.playGentleBoing();
      setErrorMsg('Incorrect answer. Please calculate to enter Parent Zone.');
    }
  };

  const toggleSfx = () => {
    const next = !progress.settings.soundEffects;
    sound.sfxEnabled = next;
    onUpdateSettings({ ...progress.settings, soundEffects: next });
    sound.playTap();
  };

  const toggleVoice = () => {
    const next = !progress.settings.voicePrompts;
    sound.voiceEnabled = next;
    onUpdateSettings({ ...progress.settings, voicePrompts: next });
    sound.playTap();
  };

  const toggleMusic = () => {
    const next = !progress.settings.backgroundMusic;
    sound.musicEnabled = next;
    onUpdateSettings({ ...progress.settings, backgroundMusic: next });
    sound.playTap();
  };

  const toggleReducedMotion = () => {
    const next = !progress.settings.reducedMotion;
    onUpdateSettings({ ...progress.settings, reducedMotion: next });
    sound.playTap();
  };

  const handleSetTimer = (minutes: number) => {
    onUpdateSettings({ ...progress.settings, screenTimeMinutes: minutes });
    sound.playTap();
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl border-2 border-slate-200 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-1">
            Parent & Educator Gate
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Please solve this math question to enter settings and view progress:
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="text-3xl font-black text-slate-800 bg-slate-50 py-3 rounded-2xl border border-slate-200">
              {num1} + {num2} = ?
            </div>

            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
              className="w-full text-center text-2xl font-bold py-3 rounded-2xl border-2 border-slate-300 focus:border-indigo-500 outline-none"
              autoFocus
            />

            {errorMsg && (
              <p className="text-xs font-bold text-rose-600">{errorMsg}</p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onBack}
                className="w-1/2 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Back to Play
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 rounded-2xl font-black text-white bg-indigo-600 hover:bg-indigo-700 shadow-md"
              >
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16 pt-4 px-4 text-slate-800">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <button
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-slate-800 font-bold shadow-md hover:bg-slate-100"
        >
          <ArrowLeft className="w-5 h-5" /> Back to App
        </button>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Parent & Educator Zone
          </h2>
          <span className="text-xs sm:text-sm text-slate-500 font-semibold">
            Learning Analytics, Audio & Privacy Controls
          </span>
        </div>

        <div className="w-24" />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Child Privacy & Safety Pledge */}
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 flex items-start gap-4">
          <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-black text-emerald-950">
              100% Safe, Private & Offline-First Learning
            </h3>
            <p className="text-sm text-emerald-800 mt-1">
              WonderKids World is designed strictly for children. No advertising, no third-party trackers, no account registration, and zero data leaves this device. All progress and drawings are saved locally in private storage.
            </p>
          </div>
        </div>

        {/* Learning Progress Overview */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
          <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-indigo-600" /> Child Learning Progress
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
              <span className="text-3xl font-black text-amber-700">
                {progress.lettersExplored.length} / 26
              </span>
              <div className="text-xs font-bold text-amber-900 mt-1">
                Letters Explored
              </div>
            </div>

            <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 text-center">
              <span className="text-3xl font-black text-sky-700">
                {progress.numbersExplored.length} / 21
              </span>
              <div className="text-xs font-bold text-sky-900 mt-1">
                Numbers Practiced
              </div>
            </div>

            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-center">
              <span className="text-3xl font-black text-rose-700">
                {progress.colorsCompleted.length} / 11
              </span>
              <div className="text-xs font-bold text-rose-900 mt-1">
                Colors Discovered
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center">
              <span className="text-3xl font-black text-emerald-700">
                {progress.animalsExplored.length} / 25
              </span>
              <div className="text-xs font-bold text-emerald-900 mt-1">
                Animals Learned
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm bg-slate-50 p-3 rounded-2xl">
            <span className="font-bold text-slate-700">Total Stars Earned:</span>
            <span className="font-black text-amber-600 text-base">⭐ {progress.stars} Stars</span>
          </div>
        </div>

        {/* Audio & Display Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
          <h3 className="text-xl font-black text-slate-900 mb-2">
            Audio & Accessibility Settings
          </h3>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="font-bold text-slate-800">Sound Effects (SFX)</div>
              <div className="text-xs text-slate-500">Pops, chimes, and celebration fanfares</div>
            </div>
            <button
              onClick={toggleSfx}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                progress.settings.soundEffects ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-transform ${
                progress.settings.soundEffects ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="font-bold text-slate-800">Voice Pronunciation & Guidance</div>
              <div className="text-xs text-slate-500">Clear child-friendly speech for letters and words</div>
            </div>
            <button
              onClick={toggleVoice}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                progress.settings.voicePrompts ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-transform ${
                progress.settings.voicePrompts ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="font-bold text-slate-800">Reduced Motion</div>
              <div className="text-xs text-slate-500">Minimizes bouncy and floating animations</div>
            </div>
            <button
              onClick={toggleReducedMotion}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                progress.settings.reducedMotion ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-transform ${
                progress.settings.reducedMotion ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Screen-Time Reminder */}
          <div className="py-2">
            <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" /> Screen-Time Break Reminder
            </div>
            <div className="text-xs text-slate-500 mb-3">
              Shows a gentle sleepy mascot screen reminding the child to take a rest:
            </div>
            <div className="flex gap-2">
              {[0, 15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleSetTimer(mins)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                    progress.settings.screenTimeMinutes === mins
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {mins === 0 ? 'Off' : `${mins} min`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reset Progress Action */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-800">Reset Learning Data</div>
            <div className="text-xs text-slate-500">Resets stars and progress back to initial default state</div>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all learning progress?')) {
                onResetProgress();
                sound.playTap();
                alert('Progress has been reset.');
              }
            }}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-sm"
          >
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
};
