import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { parseTime, getProgress } from "../utils/helper";

const ARC_RADIUS = 170;
const STROKE = 16
const ORDER = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

// convert angle to SVG arc coordinates
function polarToCartesian(cx, cy, r, angle) {
  const rad = (Math.PI / 180) * angle;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

// create arc path between angles
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function TymingArc({ timings }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // --- Correct prayer timing progress ---
  const activeIndex = useMemo(() => {
    if (!timings) return 0;

    const base = ORDER.map((p) => parseTime(timings[p]));
    if (base.some((d) => d === null)) return 0;

    // Normalize times across midnight
    const norm = base.map((d) => new Date(d.getTime()));
    for (let i = 1; i < norm.length; i++) {
      while (norm[i] <= norm[i - 1]) {
        norm[i] = new Date(norm[i].getTime() + 86400000);
      }
    }

    const ext = [...norm, new Date(norm[0].getTime() + 86400000)];

    // Find which prayer we are currently in
    for (let i = 0; i < 5; i++) {
      if (now >= norm[i] && now < ext[i + 1]) {
        return i;
      }
    }

    return 0;
  }, [timings, now]);

  // Make arc full width of the card
const WIDTH = 360; // SVG width (wider to match design)
const CENTER_X = WIDTH / 2;
const CENTER_Y = 190; // move center lower to stretch arc
const start = -180; // widen left
const end = 0; // widen right
const total = 5;
const gap = 12;

// new sweep calculation
const sweep = (end - start - gap * (total - 1)) / total;

// no center timing text — progress is shown by the arc itself

  return (
    <div className="w-full flex justify-center items-center z-1">
      <svg width={WIDTH} height={180} viewBox={`0 0 ${WIDTH} 180`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const s = start + i * (sweep + gap);
          const e = s + sweep;

          const path = describeArc(CENTER_X, CENTER_Y, ARC_RADIUS, s, e);

          // determine progress for this segment
          let progress = 0;
          if (!timings) progress = 0;
          else if (i < activeIndex) progress = 1;
          else if (i === activeIndex) {
            progress = getProgress(timings, ORDER[i], ORDER[(i + 1) % total]);
          } else progress = 0;

          // approximate arc length in px (r * theta)
          const sweepAngle = e - s; // degrees
          const arcLen = ARC_RADIUS * Math.abs((sweepAngle * Math.PI) / 180);

          return (
            <g key={i}>
              <motion.path
                d={path}
                fill="none"
                stroke="#ffffff33"
                strokeWidth={STROKE}
                strokeLinecap="round"
                opacity={0.45}
              />

              <motion.path
                d={path}
                fill="none"
                stroke="#fff"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={arcLen}
                initial={{ strokeDashoffset: arcLen }}
                animate={{ strokeDashoffset: -arcLen * (1 - progress) }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );

}

export default TymingArc;
