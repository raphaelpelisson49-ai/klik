import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
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
          backgroundColor: "#0E0E10",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: "50%",
            border: "9px solid #F4F0E8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 84,
            color: "#F4F0E8",
            position: "relative",
          }}
        >
          k
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 8,
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: "#CDB07A",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
