"use client";

const variants = [
  { id: "1", label: "Logo · Cream" },
  { id: "2", label: "Logo · Red" },
  { id: "3", label: "Logo · Maroon" },
  { id: "4", label: "Logo + Tagline · Cream" },
  { id: "5", label: "Logo + Tagline · Red" },
  { id: "6", label: "Logo + Tagline · Maroon" },
];

export default function OgPreview() {
  return (
    <div style={{ padding: "40px", fontFamily: "system-ui", background: "#111", minHeight: "100vh" }}>
      <h1 style={{ color: "#fff", marginBottom: 8 }}>OG Image Variants</h1>
      <p style={{ color: "#999", marginBottom: 40 }}>Pick your favourite. All 1200×630px.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {variants.map((v) => (
          <div key={v.id}>
            <p style={{ color: "#ccc", marginBottom: 8, fontWeight: 600 }}>
              #{v.id} — {v.label}
            </p>
            <img
              src={`/api/og?variant=${v.id}`}
              alt={v.label}
              style={{ width: "100%", borderRadius: 8, border: "1px solid #333" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
