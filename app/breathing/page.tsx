"use client";

import { useState, useEffect } from "react";

const Breathing = () => {

  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("4-7-8-method");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [time, setTime] = useState(4);
  const [animate, setAnimate] = useState(true);

  // breathing patterns
  const patterns: any = {
    "4-7-8-method": [
      { label: "Inhale", duration: 4 },
      { label: "Hold", duration: 7 },
      { label: "Exhale", duration: 8 },
    ],
    "box-breathing": [
      { label: "Inhale", duration: 4 },
      { label: "Hold", duration: 4 },
      { label: "Exhale", duration: 4 },
      { label: "Hold", duration: 4 },
    ],
  };

  const currentPattern = patterns[mode];
  const totalDuration = currentPattern.reduce(
    (sum: number, step: any) => sum + step.duration,
    0
  );

  // turn off transition on phase change, re-enable after 1 frame
useEffect(() => {
  setAnimate(false);
  const id = requestAnimationFrame(() => setAnimate(true));
  return () => cancelAnimationFrame(id);
}, [phaseIndex]);

  //  TIMER
useEffect(() => {
  let interval: NodeJS.Timeout;

  if (isRunning) {
    interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          const nextIndex = (phaseIndex + 1) % currentPattern.length;
          setPhaseIndex(nextIndex);
          return currentPattern[nextIndex].duration; //  same nextIndex for both
        }
        return prev - 1;
      });
    }, 1000);
  }

  return () => clearInterval(interval);
}, [isRunning, mode, phaseIndex]); // phaseIndex in deps so it's never stale


  const phase = currentPattern[phaseIndex].label;



  //  MODE SWITCH
  const handleMode = (newMode: string) => {
    setMode(newMode);
    setPhaseIndex(0);
    setTime(patterns[newMode][0].duration); // first phase of new mode
    setIsRunning(false);
  };

  const progress = (time / currentPattern[phaseIndex].duration) * 100;

  return (
    <div className="text-white min-h-[86vh] flex flex-col justify-center items-center">
      <h2 className="text-3xl mb-6 text-gray-300">Breathing Exercise</h2>
      <div className="p-3 min-w-[40vw] min-h-[60vh] bg-gray-900/70 border border-gray-500/30 rounded-2xl shadow-xl shadow-gray-700/30 text-center pb-4 md:pb-0">



        {/* MODE BUTTONS */}
        <div className="flex justify-center gap-9 mt-6 mb-6 flex-wrap">
          {Object.keys(patterns).map((m) => (
            <button
              key={m}
              onClick={() => handleMode(m)}
              className={`px-4 py-2 bg-gray-600 shadow-base shadow-gray-700  rounded-xl hover: hover:cursor-pointer hover:scale-102 active:scale-95 
                 ${mode === m ? "border border-white/80 shadow-lg" : ""
                }`}
            >
              {m === "4-7-8-method" ? "4-7-8 Method" : "Box Breathing"}
            </button>
          ))}
        </div>

        {/* CIRCLE */}
        <div className="relative w-40 h-40 mx-auto">

          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="text-gray-300"
              stroke="currentColor"
              strokeWidth="1"
            />

            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="text-blue-800"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
              strokeLinecap="round"
              style={{ transition: animate ? "stroke-dashoffset 1s linear" : "none" }}
            />
          </svg>

          {/* TIMER */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-semibold">{time}</span>
            <span className="text-lg text-blue-400 mt-1">{phase}</span>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="mt-6 flex justify-center gap-7 flex-wrap">
          {!isRunning && (
            <button
              onClick={() => setIsRunning(true)}
              className="px-3 py-2 bg-white text-black rounded-2xl  hover:cursor-pointer hover:scale-103 active:scale-95"
            >
              START
            </button>
          )}

          {isRunning && (
            <button
              onClick={() => setIsRunning(false)}
              className="px-3 py-2 bg-white text-black rounded-2xl  hover:cursor-pointer hover:scale-103 active:scale-95"
            >
              PAUSE
            </button>
          )}

          <button
            onClick={() => {
              setIsRunning(false);
              setPhaseIndex(0);
              setTime(currentPattern[0].duration);
            }}
            className="px-3 py-2 bg-white text-black rounded-2xl  hover:cursor-pointer hover:scale-103 active:scale-95"
          >
            RESET
          </button>
        </div>

      </div>
    </div>
  );
};

export default Breathing;


