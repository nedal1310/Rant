"use client"

import CalendarHeatmap from 'react-calendar-heatmap';
import React, { useState, useEffect, useRef } from 'react'
import 'react-calendar-heatmap/dist/styles.css';

const moods = [
  { id: 'happy', color: 'yellow', label: 'Happy', svg: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="10" r="1.2" fill="currentColor" /><circle cx="15" cy="10" r="1.2" fill="currentColor" /></svg> },
  { id: 'sad', color: 'blue', label: 'Sad', svg: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><path d="M8 16s1.5-2 4-2 4 2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="10" r="1.2" fill="currentColor" /><circle cx="15" cy="10" r="1.2" fill="currentColor" /></svg> },
  { id: 'angry', color: 'red', label: 'Angry', svg: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><path d="M8 16s1.5-2 4-2 4 2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M7.5 8.5l3 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M16.5 8.5l-3 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="11" r="1.2" fill="currentColor" /><circle cx="15" cy="11" r="1.2" fill="currentColor" /></svg> },
  {
    id: 'tired', color: 'purple', label: 'Tired', svg: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z" /><path d="M8.2,10 L7,8.8 L7.8,8 L9,9.2 L10.2,8 L11,8.8 L9.8,10 L11,11.2 L10.2,12 L9,10.8 L7.8,12 L7,11.2 Z" /><path d="M14.2,10 L13,8.8 L13.8,8 L15,9.2 L16.2,8 L17,8.8 L15.8,10 L17,11.2 L16.2,12 L15,10.8 L13.8,12 L13,11.2 Z" /><path d="M8.5,16 C9.5,14.5 14.5,14.5 15.5,16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    )
  },
  { id: 'calm', color: 'emerald', label: 'Calm', svg: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z M15,9c0.828,0,1.5-0.672,1.5-1.5S15.828,6,15,6s-1.5,0.672-1.5,1.5S14.172,9,15,9z M9,9c0.828,0,1.5-0.672,1.5-1.5S9.828,6,9,6S7.5,6.672,7.5,7.5S8.172,9,9,9z M12,17.5c2.5,0,4.5-2,4.5-4.5h-9C7.5,15.5,9.5,17.5,12,17.5z" /></svg> },
  { id: 'stressed', color: 'orange', label: 'Stressed',  svg: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z M8.5,10c-0.828,0-1.5-0.672-1.5-1.5S7.672,7,8.5,7S10,7.672,10,8.5S9.328,10,8.5,10z M15.5,10c-0.828,0-1.5-0.672-1.5-1.5S14.672,7,15.5,7S17,7.672,17,8.5S16.328,10,15.5,10z M7,16.5c0.5-2,2.5-3.5,5-3.5s4.5,1.5,5,3.5H7z" /></svg> },
]

const colorMap = {
  yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400 hover:from-yellow-500/30',
  blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400 hover:from-blue-500/30',
  red: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400 hover:from-red-500/30',
  purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400 hover:from-purple-500/30',
  emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400 hover:from-emerald-500/30',
  orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400 hover:from-orange-500/30',
}

const defaultBtn = 'from-white/5 to-white/10 border-white/10 text-gray-300 hover:from-white/10 hover:to-white/15 hover:text-white'
const baseBtn = 'inline-flex flex-col items-center justify-center gap-1.5 border bg-linear-to-br font-medium leading-5 rounded-xl text-base w-20 h-20 focus:outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
const baseIntensity = 'inline-flex items-center justify-center border font-medium leading-5 text-sm w-10 h-10 rounded-lg focus:outline-none transition-all duration-200'

type HeatmapItem = {
  date: string;
  count: number;
  mood: string;
  content: string;
}

const Moodtracker = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const [intensity, setIntensity] = useState<number | null>(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [heatmapData, setHeatmapData] = useState<HeatmapItem[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<HeatmapItem | null>(null);

  const getLocalDate = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getLocalDate();
  const alreadyLogged = heatmapData.some(d => d.date === today);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mood");
        const data = await res.json();
        const formatted = data.map((item: any) => ({
          date: item.date,
          count: item.intensity,
          mood: item.mood,
          content: item.content,
        }));
        setHeatmapData(formatted);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const sendMessage = async () => {
    if (!selected || !intensity) return;
    setLoading(true);

    const today = getLocalDate();

    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: selected,
          intensity,
          content,
          date: today,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      setHeatmapData(prev => {
        const filtered = prev.filter(d => d.date !== today);
        return [...filtered, { date: today, count: intensity, mood: selected, content }];
      });

      setSelected(null);
      setIntensity(null);
      setContent('');
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-900/10 via-gray-800/10 to-gray-900/10'>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent mb-5">
            How are you feeling today?
          </h1>
          <p className="text-gray-400 text-lg">Track your emotional journey and discover patterns</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Input Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
            {alreadyLogged && (
              <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-400 text-sm flex items-center gap-2">
                <span className="text-lg">✨</span>
                You’ve already logged today’s mood
              </div>
            )}

            {/* Mood selector */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">😊</span>
                What's your mood today?
              </h2>
              <div className="flex flex-wrap gap-3">
                {moods.map(({ id, color, svg, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelected(id)}
                    disabled={alreadyLogged}
                    className={`${baseBtn} bg-linear-to-br ${selected === id ? colorMap[color as keyof typeof colorMap] : defaultBtn} hover:cursor-pointer ${alreadyLogged ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    <div className="text-2xl">{svg}</div>
                    <span className="text-xs capitalize">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity selector */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Intensity level
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setIntensity(n)}
                    disabled={alreadyLogged}
                    className={`${baseIntensity} ${intensity === n
                      ? 'bg-linear-to-r from-yellow-500 to-orange-500 text-white border-transparent scale-110 shadow-lg'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:cursor-pointer'
                      } ${alreadyLogged ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {intensity && (
                <div className="mt-3 text-sm text-gray-400">
                  Intensity: {intensity}/10 - {intensity <= 3 ? 'Mild' : intensity <= 6 ? 'Moderate' : 'Intense'}
                </div>
              )}
            </div>

            {/* Input field */}
            {selected && intensity && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">💭</span>
                  Why are you feeling {moods.find(m => m.id === selected)?.label} today?
                </h3>
                <div className="relative">
                  <textarea
                    onChange={(e) => setContent(e.target.value)}
                    name="answer"
                    placeholder="Share your thoughts..."
                    rows={4}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 resize-none p-4 pr-14 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="absolute bottom-3 right-3 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Heatmap Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Your Mood Timeline
              </h3>
              <p className="text-gray-400 text-sm">Track your emotional patterns over time</p>
            </div>

            <div className="bg-black/30 rounded-xl p-8">
              <CalendarHeatmap
                startDate={new Date(new Date().setMonth(new Date().getMonth() - 3))}
                endDate={new Date()}
                values={heatmapData}
                classForValue={(value) => {
                  if (!value || !value.mood) return 'color-empty';
                  return `color-${value.mood}`;
                }}
                onClick={(value) => {
                  if (!value) return;
                  const entry = heatmapData.find(d => d.date === value.date);
                  setSelectedEntry(entry || null);
                }}
                gutterSize={5}
                showWeekdayLabels={true}
              />
            </div>

            {/* color theme */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-yellow-500" />
                <span className="text-xs text-gray-400 capitalize">Happy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-blue-500" />
                <span className="text-xs text-gray-400 capitalize">Sad</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-red-500" />
                <span className="text-xs text-gray-400 capitalize">Angry</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-purple-500" />
                <span className="text-xs text-gray-400 capitalize">Tired</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                <span className="text-xs text-gray-400 capitalize">Calm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-orange-500" />
                <span className="text-xs text-gray-400 capitalize">Stressed</span>
              </div>
            </div>


            {/* Selected entry details */}
            {selectedEntry && (
              <div className="mt-6 animate-fadeIn">
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <span className="text-lg">📋</span>
                      {new Date(selectedEntry.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-sm capitalize bg-${selectedEntry.mood === 'happy' ? 'yellow' : selectedEntry.mood === 'sad' ? 'blue' : selectedEntry.mood === 'angry' ? 'red' : selectedEntry.mood === 'tired' ? 'purple' : selectedEntry.mood === 'calm' ? 'emerald' : 'orange'}-500/20 text-${selectedEntry.mood === 'happy' ? 'yellow' : selectedEntry.mood === 'sad' ? 'blue' : selectedEntry.mood === 'angry' ? 'red' : selectedEntry.mood === 'tired' ? 'purple' : selectedEntry.mood === 'calm' ? 'emerald' : 'orange'}-400 border border-${selectedEntry.mood === 'happy' ? 'yellow' : selectedEntry.mood === 'sad' ? 'blue' : selectedEntry.mood === 'angry' ? 'red' : selectedEntry.mood === 'tired' ? 'purple' : selectedEntry.mood === 'calm' ? 'emerald' : 'orange'}-500/30`}>
                      {selectedEntry.mood}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gray-400 text-sm">Intensity</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i < selectedEntry.count ? 'bg-white' : 'bg-white/20'}`} />
                      ))}
                    </div>
                    <span className="text-white text-sm font-medium">{selectedEntry.count}/10</span>
                  </div>
                  {selectedEntry.content && (
                    <p className="text-gray-300 text-sm leading-relaxed bg-white/5 rounded-lg p-3 italic">
                      "{selectedEntry.content}"
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Moodtracker