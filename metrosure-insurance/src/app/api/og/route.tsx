import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";

const VARIANTS = {
  // Logo only
  "1": { bg: "#FFFDF7", logo: "dark", tagline: false, label: "Logo · Cream" },
  "2": { bg: "#BF0603", logo: "white", tagline: false, label: "Logo · Red" },
  "3": { bg: "#690025", logo: "white", tagline: false, label: "Logo · Maroon" },
  // Logo + tagline
  "4": { bg: "#FFFDF7", logo: "dark", tagline: true, label: "Logo+Tagline · Cream" },
  "5": { bg: "#BF0603", logo: "white", tagline: true, label: "Logo+Tagline · Red" },
  "6": { bg: "#690025", logo: "white", tagline: true, label: "Logo+Tagline · Maroon" },
} as const;

export async function GET(request: NextRequest) {
  const variant = request.nextUrl.searchParams.get("variant") || "1";
  const config = VARIANTS[variant as keyof typeof VARIANTS] || VARIANTS["1"];

  const logoFile = config.logo === "white" ? "logo-white.png" : "logo.png";
  const logoPath = join(process.cwd(), "public", "images", logoFile);
  const logoData = await readFile(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  const taglineColour = config.logo === "white" ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.55)";

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
          backgroundColor: config.bg,
        }}
      >
        <img
          src={logoBase64}
          width={480}
          height={135}
          style={{ objectFit: "contain" }}
        />
        {config.tagline && (
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              color: taglineColour,
              fontFamily: "sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Taking You to the Future
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
