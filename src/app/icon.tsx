import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#070B14",
          borderRadius: 8,
          border: "1px solid rgba(245, 185, 66, 0.45)",
          color: "#F04452",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        CP
      </div>
    ),
    {
      ...size,
    }
  );
}
