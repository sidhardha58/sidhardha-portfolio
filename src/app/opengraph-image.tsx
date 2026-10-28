import { ImageResponse } from "next/og";

export const alt = "Sidhardha's portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#070b14",
          color: "#f4f4f5",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -1 }}>
          Sidhardha&apos;s portfolio
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#a1a1aa" }}>
          Full-stack developer. React, Next.js, and the work behind them.
        </div>
      </div>
    ),
    { ...size },
  );
}
