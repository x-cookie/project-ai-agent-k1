import Link from "next/link";
import { TopNav } from "@/components/shared/TopNav";

const stats = [
  { icon: "ti-book",             value: "14 lessons" },
  { icon: "ti-clock",            value: "~6 hours" },
  { icon: "ti-brand-javascript", value: "Node.js" },
  { icon: "ti-cpu",              value: "local LLMs" },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <TopNav crumb={<span style={{ color: "var(--t2)" }}>home</span>} />

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "64px 32px" }}>
        <div style={{ maxWidth: "600px", width: "100%" }}>
          {/* Tag */}
          <div
            style={{
              fontSize: "10px",
              color: "var(--t3)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontFamily: "var(--mono)",
              marginBottom: "16px",
            }}
          >
            learning path
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 500,
              color: "var(--t1)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: "20px",
            }}
          >
            AI agents<br />from scratch
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "15px",
              color: "var(--t2)",
              lineHeight: 1.75,
              maxWidth: "480px",
              marginBottom: "32px",
            }}
          >
            Build AI agents from first principles using local LLMs.
            Understand what happens under the hood before reaching for frameworks.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "40px" }}>
            {stats.map(s => (
              <div
                key={s.value}
                style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--t3)", fontFamily: "var(--mono)" }}
              >
                <i className={`ti ${s.icon}`} style={{ fontSize: "13px" }} aria-hidden />
                <span style={{ color: "var(--t2)" }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link
              href="/learn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                padding: "9px 20px",
                borderRadius: "5px",
                background: "var(--acc)",
                color: "#000",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              <i className="ti ti-player-play" style={{ fontSize: "14px" }} aria-hidden />
              Start learning
            </Link>
            <Link
              href="/docs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                padding: "9px 20px",
                borderRadius: "5px",
                background: "transparent",
                color: "var(--t2)",
                border: "0.5px solid var(--bd2)",
                textDecoration: "none",
              }}
            >
              <i className="ti ti-book" style={{ fontSize: "14px" }} aria-hidden />
              Read the docs
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom divider + footnote */}
      <footer
        style={{
          padding: "16px 32px",
          borderTop: "0.5px solid var(--bd)",
          fontSize: "11px",
          color: "var(--t3)",
          fontFamily: "var(--mono)",
        }}
      >
        14 lessons · 3 stages · Node.js + local LLMs
      </footer>
    </div>
  );
}
