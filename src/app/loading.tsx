"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1000);
    const timer2 = setTimeout(() => setStage(2), 1800);
    const timer3 = setTimeout(() => setStage(3), 2600);
    const timer4 = setTimeout(() => setStage(4), 3400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <main className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6 w-full h-full bg-background overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .pulse-ring {
            animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(1.5); opacity: 0; }
        }

        .spin-slow {
            animation: spin 8s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes load-progress {
            0% { transform: scaleX(0); }
            20% { transform: scaleX(0.4); }
            60% { transform: scaleX(0.7); }
            80% { transform: scaleX(0.9); }
            100% { transform: scaleX(1); }
        }
      `}} />
      
      {/* Center Geometric Loading Indicator */}
      <div className="relative flex items-center justify-center w-32 h-32 mb-12">
        {/* Pulsing outer rings */}
        <div className="absolute inset-0 rounded-full border border-primary opacity-20 pulse-ring"></div>
        <div className="absolute inset-2 rounded-full border border-primary/40 pulse-ring" style={{ animationDelay: '-1s' }}></div>
        
        {/* Spinning Hexagon Outline */}
        <div className="absolute w-24 h-24 spin-slow text-primary">
          <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 100 100">
            <polygon points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25" strokeLinejoin="round"></polygon>
          </svg>
        </div>
        
        {/* Inner Brackets */}
        <div className="font-mono text-sm font-bold text-primary tracking-widest flex gap-1">
          <span>{'{'}</span>
          <span className="animate-pulse">_</span>
          <span>{'}'}</span>
        </div>
      </div>
      
      {/* Prominent Loading Text */}
      <div className="mb-24 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-heading flex items-baseline justify-center gap-4 font-[family-name:var(--font-headline)]">
          <span className="text-muted-foreground/30 font-light font-mono text-2xl md:text-4xl">01 //</span>
          <span>LOADING...</span>
        </h1>
      </div>
      
      {/* Terminal Log Area */}
      <div className="w-full max-w-md glass border border-border rounded-lg p-6 shadow-sm font-mono text-sm">
        <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">System Status</span>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-border"></div>
            <div className="w-2 h-2 rounded-full bg-border"></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 text-muted-foreground/70">
          <div className="flex justify-between transition-opacity duration-300" style={{ opacity: stage >= 0 ? 1 : 0 }}>
            <span>&gt; INITIALIZING_CORE_SERVICES...</span>
            <span className="text-primary">[OK]</span>
          </div>
          <div className="flex justify-between transition-opacity duration-300" style={{ opacity: stage >= 1 ? 1 : 0 }}>
            <span>&gt; ESTABLISHING_SECURE_CONNECTION...</span>
            <span className="text-primary">[OK]</span>
          </div>
          <div className="flex justify-between transition-opacity duration-300" style={{ opacity: stage >= 2 ? 1 : 0 }}>
            <span>&gt; FETCHING_PORTFOLIO_ASSETS...</span>
            <span className="text-primary">[OK]</span>
          </div>
          <div className="flex justify-between transition-opacity duration-300" style={{ opacity: stage >= 3 ? 1 : 0 }}>
            <span>&gt; COMPILING_UI_COMPONENTS...</span>
            <span className="text-primary">[OK]</span>
          </div>
          <div className={`flex justify-between font-bold mt-2 pt-2 border-t border-border/50 transition-all duration-300 ${stage >= 4 ? 'text-primary' : ''}`} style={{ opacity: stage >= 4 ? 1 : 0 }}>
            <span>&gt; SYSTEM_OPTIMIZED_AND_READY</span>
            <span>[200]</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-muted rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary w-full transform origin-left" style={{ animation: 'load-progress 4s ease-out forwards' }}></div>
        </div>
      </div>
    </main>
  );
}
