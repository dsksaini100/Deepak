import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Mascot } from '../mascots/Mascot';
import { sound } from '../../services/sound';
import { 
  ArrowLeft, RotateCcw, Download, Sparkles, 
  Palette, Brush, Eraser, Heart, Star, Smile, Sparkle
} from 'lucide-react';

interface CreativePlayProps {
  onBack: () => void;
  onEarnStar: (amount?: number) => void;
  onSaveDrawing: (dataUrl: string) => void;
  savedDrawings: string[];
}

export const CreativePlay: React.FC<CreativePlayProps> = ({
  onBack,
  onEarnStar,
  onSaveDrawing,
}) => {
  const [activeTab, setActiveTab] = useState<'draw' | 'color' | 'stickers' | 'dots'>('draw');

  /* ----------------------------------------------------
     SUB-TAB 1: DRAWING STUDIO
  ---------------------------------------------------- */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [brushColor, setBrushColor] = useState('#EF4444');
  const [brushSize, setBrushSize] = useState(14);
  const [isEraser, setIsEraser] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);

  const colors = [
    '#EF4444', '#F97316', '#FACC15', '#22C55E', 
    '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', 
    '#92400E', '#1E293B'
  ];

  const clearDrawing = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
  }, []);

  useEffect(() => {
    if (activeTab === 'draw') {
      clearDrawing();
    }
  }, [activeTab, clearDrawing]);

  const handleStartDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const rect = cvs.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    if (selectedStamp) {
      // Place stamp
      ctx.font = '36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedStamp, x, y);
      sound.playPop();
      return;
    }

    setIsDrawing(true);
    sound.playTap();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isEraser ? '#FFFFFF' : brushColor;
  };

  const handleMoveDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || selectedStamp) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const rect = cvs.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleEndDraw = () => {
    setIsDrawing(false);
  };

  const handleSave = () => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const dataUrl = cvs.toDataURL('image/png');
    onSaveDrawing(dataUrl);
    sound.playSuccess();
    confetti({ particleCount: 40 });
    sound.speak('Drawing saved to your Wonder portfolio!');
    onEarnStar(2);
  };

  const renderDrawingStudio = () => (
    <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
      {/* Canvas Box */}
      <div className="bg-white p-4 rounded-3xl shadow-xl border-4 border-indigo-300 w-full flex flex-col items-center">
        {/* Tool bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 w-full pb-3 border-b border-slate-100">
          {/* Colors */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setBrushColor(c);
                  setIsEraser(false);
                  setSelectedStamp(null);
                  sound.playTap();
                }}
                style={{ backgroundColor: c }}
                className={`w-8 h-8 rounded-full shadow-sm transition-transform ${
                  !isEraser && !selectedStamp && brushColor === c ? 'scale-125 ring-2 ring-indigo-500' : 'hover:scale-110'
                }`}
              />
            ))}
          </div>

          {/* Tools: Eraser, Brush sizes, Stamps */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsEraser(true);
                setSelectedStamp(null);
                sound.playTap();
              }}
              className={`p-2 rounded-xl flex items-center gap-1 text-xs font-bold ${
                isEraser ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Eraser className="w-4 h-4" /> Eraser
            </button>

            {/* Sizes */}
            {[8, 16, 28].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setBrushSize(s);
                  sound.playTap();
                }}
                className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center ${
                  brushSize === s ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {s === 8 ? 'S' : s === 16 ? 'M' : 'L'}
              </button>
            ))}

            {/* Stamps */}
            {['⭐', '💖', '🌸', '🐾', '🎈'].map((stamp) => (
              <button
                key={stamp}
                onClick={() => {
                  setSelectedStamp(stamp);
                  setIsEraser(false);
                  sound.playTap();
                }}
                className={`w-8 h-8 rounded-xl text-lg flex items-center justify-center ${
                  selectedStamp === stamp ? 'bg-amber-200 ring-2 ring-amber-400' : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                {stamp}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Element */}
        <div className="w-full my-3 flex justify-center">
          <canvas
            ref={canvasRef}
            width={640}
            height={380}
            onMouseDown={handleStartDraw}
            onMouseMove={handleMoveDraw}
            onMouseUp={handleEndDraw}
            onMouseLeave={handleEndDraw}
            onTouchStart={handleStartDraw}
            onTouchMove={handleMoveDraw}
            onTouchEnd={handleEndDraw}
            className="w-full max-w-[640px] h-[320px] sm:h-[380px] bg-white rounded-2xl border-2 border-slate-200 shadow-inner cursor-crosshair touch-none"
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between w-full pt-2">
          <button
            onClick={clearDrawing}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" /> Clear Canvas
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-black text-base rounded-2xl shadow-md flex items-center gap-2 btn-bouncy"
          >
            <Download className="w-5 h-5" /> Save Artwork ⭐
          </button>
        </div>
      </div>
    </div>
  );

  /* ----------------------------------------------------
     SUB-TAB 2: COLORING BOOK
  ---------------------------------------------------- */
  const COLORING_PAGES = [
    { id: 'lion', name: 'Happy Little Lion', icon: '🦁' },
    { id: 'rocket', name: 'Cosmic Rocket', icon: '🚀' },
    { id: 'cat', name: 'Fluffy Kitten', icon: '🐱' },
    { id: 'butterfly', name: 'Garden Butterfly', icon: '🦋' },
  ];

  const [coloringPageIdx, setColoringPageIdx] = useState(0);
  const [coloredSections, setColoredSections] = useState<Record<string, string>>({});
  const [paintColor, setPaintColor] = useState('#EF4444');

  const curColoring = COLORING_PAGES[coloringPageIdx];

  const handleFillSection = (sectionId: string) => {
    setColoredSections(prev => ({ ...prev, [sectionId]: paintColor }));
    sound.playPop();
  };

  const renderColoringBook = () => (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-rose-300 w-full text-center">
        {/* Page selector */}
        <div className="flex gap-2 justify-center mb-4">
          {COLORING_PAGES.map((pg, i) => (
            <button
              key={pg.id}
              onClick={() => {
                setColoringPageIdx(i);
                setColoredSections({});
                sound.playTap();
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 ${
                coloringPageIdx === i ? 'bg-rose-500 text-white shadow' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <span>{pg.icon}</span>
              <span>{pg.name}</span>
            </button>
          ))}
        </div>

        {/* Color Palette */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => {
                setPaintColor(c);
                sound.playTap();
              }}
              style={{ backgroundColor: c }}
              className={`w-9 h-9 rounded-full shadow transition-transform ${
                paintColor === c ? 'scale-125 ring-2 ring-rose-500' : 'hover:scale-105'
              }`}
            />
          ))}
        </div>

        {/* Interactive SVG Coloring Page */}
        <div className="w-72 h-72 mx-auto bg-slate-50 rounded-3xl border-4 border-slate-200 p-4 flex items-center justify-center">
          {curColoring.id === 'rocket' ? (
            <svg viewBox="0 0 100 100" className="w-full h-full cursor-pointer">
              {/* Rocket Nose */}
              <polygon
                points="50,10 65,35 35,35"
                fill={coloredSections['nose'] || '#FFFFFF'}
                stroke="#1E293B"
                strokeWidth="2.5"
                onClick={() => handleFillSection('nose')}
              />
              {/* Rocket Body */}
              <rect
                x="35"
                y="35"
                width="30"
                height="40"
                fill={coloredSections['body'] || '#FFFFFF'}
                stroke="#1E293B"
                strokeWidth="2.5"
                onClick={() => handleFillSection('body')}
              />
              {/* Window */}
              <circle
                cx="50"
                cy="52"
                r="8"
                fill={coloredSections['window'] || '#FFFFFF'}
                stroke="#1E293B"
                strokeWidth="2"
                onClick={() => handleFillSection('window')}
              />
              {/* Left Fin */}
              <polygon
                points="35,60 20,78 35,75"
                fill={coloredSections['leftFin'] || '#FFFFFF'}
                stroke="#1E293B"
                strokeWidth="2"
                onClick={() => handleFillSection('leftFin')}
              />
              {/* Right Fin */}
              <polygon
                points="65,60 80,78 65,75"
                fill={coloredSections['rightFin'] || '#FFFFFF'}
                stroke="#1E293B"
                strokeWidth="2"
                onClick={() => handleFillSection('rightFin')}
              />
              {/* Flame */}
              <polygon
                points="42,75 50,92 58,75"
                fill={coloredSections['flame'] || '#FFFFFF'}
                stroke="#1E293B"
                strokeWidth="2"
                onClick={() => handleFillSection('flame')}
              />
            </svg>
          ) : (
            /* Lion / Animal SVG */
            <svg viewBox="0 0 100 100" className="w-full h-full cursor-pointer">
              {/* Mane */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill={coloredSections['mane'] || '#FFFFFF'}
                stroke="#1E293B"
                strokeWidth="3"
                onClick={() => handleFillSection('mane')}
              />
              {/* Face */}
              <circle
                cx="50"
                cy="52"
                r="24"
                fill={coloredSections['face'] || '#FFFFFF'}
                stroke="#1E293B"
                strokeWidth="2.5"
                onClick={() => handleFillSection('face')}
              />
              {/* Ears */}
              <circle
                cx="32"
                cy="30"
                r="7"
                fill={coloredSections['ear1'] || '#FFFFFF'}
                stroke="#1E293B"
                strokeWidth="2"
                onClick={() => handleFillSection('ear1')}
              />
              <circle
                cx="68"
                cy="30"
                r="7"
                fill={coloredSections['ear2'] || '#FFFFFF'}
                stroke="#1E293B"
                strokeWidth="2"
                onClick={() => handleFillSection('ear2')}
              />
              {/* Eyes & nose */}
              <circle cx="43" cy="48" r="3" fill="#1E293B" />
              <circle cx="57" cy="48" r="3" fill="#1E293B" />
              <polygon points="47,54 53,54 50,57" fill="#1E293B" />
              <path d="M 46 59 Q 50 63 54 59" stroke="#1E293B" strokeWidth="2" fill="none" />
            </svg>
          )}
        </div>

        <p className="text-xs text-slate-500 font-bold mt-3">
          Tap each section of the drawing to color it!
        </p>

        {Object.keys(coloredSections).length >= 4 && (
          <button
            onClick={() => {
              confetti({ particleCount: 35 });
              sound.playSuccess();
              onEarnStar(1);
            }}
            className="mt-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-amber-950 font-black rounded-2xl shadow btn-bouncy"
          >
            Finished Coloring! +1 Star ⭐
          </button>
        )}
      </div>
    </div>
  );

  /* ----------------------------------------------------
     SUB-TAB 3: STICKER WORLD
  ---------------------------------------------------- */
  const [stickersOnCanvas, setStickersOnCanvas] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const [activeBackground, setActiveBackground] = useState<'meadow' | 'space' | 'sea'>('meadow');

  const availableStickers = ['🐼', '🐰', '🐱', '🐢', '🦁', '⭐', '🌈', '🍎', '🎈', '🚀', '🌸'];

  const handleAddSticker = (emoji: string) => {
    const x = Math.floor(Math.random() * 60) + 20;
    const y = Math.floor(Math.random() * 50) + 25;
    setStickersOnCanvas(prev => [...prev, { id: Date.now(), emoji, x, y }]);
    sound.playPop();
  };

  const renderStickers = () => (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-300 w-full text-center">
        {/* Background picker */}
        <div className="flex justify-center gap-2 mb-3">
          <button
            onClick={() => setActiveBackground('meadow')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
              activeBackground === 'meadow' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            🌳 Meadow Park
          </button>
          <button
            onClick={() => setActiveBackground('sea')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
              activeBackground === 'sea' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            🌊 Undersea
          </button>
          <button
            onClick={() => setActiveBackground('space')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
              activeBackground === 'space' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            🌌 Deep Space
          </button>
        </div>

        {/* Sticker Canvas Area */}
        <div
          className={`relative w-full h-72 rounded-3xl overflow-hidden border-4 border-slate-200 shadow-inner ${
            activeBackground === 'meadow'
              ? 'bg-gradient-to-b from-sky-300 to-emerald-300'
              : activeBackground === 'sea'
              ? 'bg-gradient-to-b from-cyan-400 to-blue-600'
              : 'bg-gradient-to-b from-slate-900 to-indigo-900'
          }`}
        >
          {stickersOnCanvas.map((s) => (
            <div
              key={s.id}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              className="absolute text-5xl transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform"
              onClick={() => {
                sound.playPop();
                setStickersOnCanvas(prev => prev.filter(item => item.id !== s.id));
              }}
              title="Tap to remove sticker"
            >
              {s.emoji}
            </div>
          ))}
        </div>

        {/* Sticker Tray */}
        <div className="mt-4">
          <div className="text-xs font-bold text-slate-500 uppercase mb-2">
            Tap to place stickers on the world:
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {availableStickers.map((stk) => (
              <button
                key={stk}
                onClick={() => handleAddSticker(stk)}
                className="w-11 h-11 rounded-2xl bg-slate-50 hover:bg-amber-100 border border-slate-200 flex items-center justify-center text-2xl btn-bouncy"
              >
                {stk}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setStickersOnCanvas([])}
          className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-700 underline"
        >
          Clear All Stickers
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-indigo-50/60 pb-16 pt-4 px-4">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-4">
        <button
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-slate-800 font-bold shadow-md hover:bg-slate-50 btn-bouncy"
        >
          <ArrowLeft className="w-5 h-5" /> Back Home
        </button>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 flex items-center justify-center gap-2">
            🖌️ Creative Play
          </h2>
          <span className="text-xs sm:text-sm font-semibold text-indigo-800">
            Drawing Studio, Coloring Book & Stickers!
          </span>
        </div>

        <div className="w-24" />
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-center gap-2">
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('draw');
          }}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeTab === 'draw'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-indigo-50 shadow-sm'
          }`}
        >
          🎨 Drawing Studio
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('color');
          }}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeTab === 'color'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-indigo-50 shadow-sm'
          }`}
        >
          📖 Coloring Book
        </button>
        <button
          onClick={() => {
            sound.playTap();
            setActiveTab('stickers');
          }}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            activeTab === 'stickers'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-indigo-50 shadow-sm'
          }`}
        >
          🌟 Sticker World
        </button>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'draw' && renderDrawingStudio()}
        {activeTab === 'color' && renderColoringBook()}
        {activeTab === 'stickers' && renderStickers()}
      </div>

      {/* Mascot Friend */}
      <div className="max-w-md mx-auto mt-8 flex items-center justify-center gap-3 bg-white/70 backdrop-blur px-4 py-2.5 rounded-2xl border border-indigo-200 shadow-sm">
        <Mascot id="coco" size="sm" mood="happy" />
        <span className="text-xs sm:text-sm font-bold text-indigo-950">
          Coco the Cat loves painting with bright vibrant colors!
        </span>
      </div>
    </div>
  );
};
