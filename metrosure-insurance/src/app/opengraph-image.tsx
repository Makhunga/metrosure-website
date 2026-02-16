import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Metrosure Insurance Brokers - Taking You to the Future";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoPath = join(process.cwd(), "public", "images", "logo.png");
  const logoData = await readFile(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFDF7",
        }}
      >
        <img
          src={logoBase64}
          width={480}
          height={135}
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "rgba(0,0,0,0.55)",
            fontFamily: "sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          Taking You to the Future
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
