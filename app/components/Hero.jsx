// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function Hero () {
//     return(
//         <div>
//             <div className="hero bg-base-200 py-16">
//   <div className="hero-content flex-col lg:flex-row-reverse">
//     <img
//       // src="https://images.pexels.com/photos/7948038/pexels-photo-7948038.jpeg"
//       // src = "https://indoanalytica.com/static/images/data-science-5.gif"
//       href = "/hero.jpg"
//       className="max-w-sm rounded-lg shadow-2xl"
//     />
//     <div>
//       <h1 className="text-5xl font-bold">Collaborative Annotating Tool</h1>
//       <p className="py-6">
//       Join forces with researchers and engineers to annotate, label, and query Earth observation data in a unified, cloud-native environment.
//       </p>
//       <Link href="/auth"><button className="btn btn-neutral">Get Started</button></Link>
//     </div>
//   </div>
// </div>
//         </div>
//     )
// }

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="hero bg-base-200 py-16">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8 lg:gap-12">
        {/* Replace your <Image> tag with this */}
        <div className="relative w-full h-[280px] sm:h-[350px] lg:h-[420px] rounded-2xl overflow-hidden border border-slate-700/50"
          style={{ background: "#0a1628" }}>

          {/* Grid background */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }} />

          {/* Glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #22c55e, #0ea5e9, transparent 70%)" }} />

          {/* Mock annotation UI */}
          <div className="absolute inset-4 rounded-xl border border-slate-600/40 bg-slate-900/60 backdrop-blur p-4 flex flex-col gap-3">
            
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs font-mono text-slate-500">sentinel-2 · band-4 · 10m</span>
            </div>

            {/* Fake image area with bounding boxes */}
            <div className="relative flex-1 rounded-lg overflow-hidden bg-slate-800/80 border border-slate-700/40">
              
              {/* Simulated terrain blocks */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 gap-px opacity-30">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="rounded-sm" style={{
                    background: `hsl(${140 + (i % 5) * 15}, ${30 + (i % 3) * 10}%, ${15 + (i % 4) * 5}%)`
                  }} />
                ))}
              </div>

              {/* Annotation bounding boxes */}
              <div className="absolute top-[15%] left-[10%] w-[35%] h-[30%] border-2 border-green-400 rounded"
                style={{ boxShadow: "0 0 8px rgba(34,197,94,0.4)" }}>
                <span className="absolute -top-5 left-0 text-[10px] font-mono text-green-400 bg-slate-900/80 px-1 rounded">
                  Cropland · 94%
                </span>
              </div>

              <div className="absolute top-[50%] left-[50%] w-[28%] h-[25%] border-2 border-sky-400 rounded"
                style={{ boxShadow: "0 0 8px rgba(14,165,233,0.4)" }}>
                <span className="absolute -top-5 left-0 text-[10px] font-mono text-sky-400 bg-slate-900/80 px-1 rounded">
                  Water · 88%
                </span>
              </div>

              <div className="absolute top-[20%] left-[58%] w-[30%] h-[28%] border-2 border-orange-400 rounded"
                style={{ boxShadow: "0 0 8px rgba(251,146,60,0.4)" }}>
                <span className="absolute -top-5 left-0 text-[10px] font-mono text-orange-400 bg-slate-900/80 px-1 rounded">
                  Urban · 91%
                </span>
              </div>

              {/* Crosshair cursor */}
              <div className="absolute top-[52%] left-[62%] w-4 h-4">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/60" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/60" />
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                3 collaborators active
              </span>
              <span>zoom 2.4x · 47.3°N 8.5°E</span>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-5xl font-bold">Collaborative Annotating Tool</h1>
          <p className="py-6">
            Join forces with researchers and engineers to annotate, label, and query Earth observation data in a unified, cloud-native environment.
          </p>

          <Link href="/auth">
            <button className="btn btn-neutral">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}