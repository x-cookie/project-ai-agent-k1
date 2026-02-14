"use client";

import Link from "next/link";

interface TopNavProps {
  crumb?: React.ReactNode;
  progress?: number;
  total?: number;
  backHref?: string;
  backLabel?: string;
}

export function TopNav({ crumb, progress, total = 14, backHref, backLabel }: TopNavProps) {
  const pct = progress !== undefined ? `${progress}/${total}` : `0/${total}`;

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        height: "44px",
        borderBottom: "0.5px solid var(--bd)",
        background: "var(--bg)",
        flexShrink: 0,
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "7px", textDecoration: "none" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              background: "var(--acc)",
              borderRadius: "3px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M5.5 1L10 9.5H1L5.5 1Z" fill="#000" />
            </svg>
          </div>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--t1)", letterSpacing: "-0.01em" }}>
            agents from scratch
          </span>
        </Link>

        {crumb && (
          <>
            <div style={{ width: "0.5px", height: "16px", background: "var(--bd2)" }} />
            <div style={{ fontSize: "12px", color: "var(--t3)", fontFamily: "var(--mono)" }}>{crumb}</div>
          </>
        )}
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {backHref && (
          <Link
            href={backHref}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "12px",
              color: "var(--t2)",
              padding: "4px 8px",
              borderRadius: "4px",
              border: "0.5px solid var(--bd2)",
              background: "transparent",
              textDecoration: "none",
            }}
          >
            ← {backLabel ?? "back"}
          </Link>
        )}
        <div
          style={{
            fontSize: "11px",
            padding: "3px 9px",
            borderRadius: "3px",
            background: "var(--bg3)",
            border: "0.5px solid var(--bd2)",
            color: "var(--t3)",
            fontFamily: "var(--mono)",
          }}
        >
          {pct}
        </div>
        <div
          style={{
            fontSize: "11px",
            padding: "3px 9px",
            borderRadius: "3px",
            color: "var(--green)",
            borderColor: "#166534",
            background: "#0a1f0f",
            border: "0.5px solid #166534",
            fontFamily: "var(--mono)",
          }}
        >
          ● ready
        </div>
      </div>
    </nav>
  );
}
