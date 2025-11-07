import React from "react";
import "../styles/dunut.css"; // ✅ import CSS tách riêng

export default function dunut({ value = 70, size = 200, strokeWidth = 14 }) {
  const r = 36;
  const C = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const dashoffset = C * (1 - pct / 100);

  return (
    <div
      className="donut-container"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg viewBox="0 0 120 120" className="donut-svg">
        <circle
          cx={60}
          cy={60}
          r={r}
          className="donut-track"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={60}
          cy={60}
          r={r}
          className="donut-bar"
          strokeWidth={strokeWidth}
          style={{
            strokeDasharray: C,
            strokeDashoffset: dashoffset,
          }}
        />
      </svg>

      <div className="donut-text">{pct}%</div>
    </div>
  );
}