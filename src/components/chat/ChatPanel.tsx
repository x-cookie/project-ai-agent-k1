"use client";

import { useState, useRef, useEffect } from "react";
import type { Lesson } from "@/lib/lessons";

interface Msg {
  role: "user" | "ai" | "thinking";
  text: string;
}

const QUICK_QUESTIONS = [
  "Why does this pattern matter?",
  "How does this connect to the next lesson?",
  "Where would I use this in production?",
];

interface Props {
  lesson: Lesson;
  concept: string;
}

export function ChatPanel({ lesson, concept }: Props) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs]);

  async function ask(question?: string) {
    const q = question ?? input.trim();
    if (!q || loading) return;
    setInput("");
    setShowQuick(false);
    setMsgs(prev => [...prev, { role: "user", text: q }, { role: "thinking", text: "…" }]);
    setLoading(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, lesson, concept }),
      });
      const data = await res.json();
      setMsgs(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "ai", text: data.answer ?? "Something went wrong." };
        return copy;
      });
    } catch {
      setMsgs(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "ai", text: "Connection error — try again." };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside
      style={{
        width: "220px",
        minWidth: "220px",
        borderLeft: "0.5px solid var(--bd)",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg2)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "12px 13px", borderBottom: "0.5px solid var(--bd)" }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--green)", flexShrink: 0 }} />
        <span style={{ fontSize: "11.5px", fontWeight: 500, color: "var(--t1)" }}>AI tutor</span>
        <span style={{ fontSize: "10.5px", color: "var(--t3)", fontFamily: "var(--mono)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
          {lesson.title.toLowerCase()}
        </span>
      </div>

      {/* Messages */}
      <div ref={msgsRef} style={{ flex: 1, overflowY: "auto", padding: "10px 11px", display: "flex", flexDirection: "column", gap: "6px", minHeight: 0 }}>
        {msgs.map((m, i) => (
          <div
            key={i}
            style={{
              fontSize: "11.5px",
              lineHeight: 1.6,
              padding: "7px 9px",
              borderRadius: "4px",
              maxWidth: "96%",
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#1e1a4a" : m.role === "thinking" ? "transparent" : "var(--bg3)",
              color: m.role === "user" ? "#aba6f0" : m.role === "thinking" ? "var(--t4)" : "var(--t2)",
              border: m.role === "user" ? "0.5px solid #3d3680" : m.role === "thinking" ? "none" : "0.5px solid var(--bd2)",
              fontStyle: m.role === "thinking" ? "italic" : ("normal" as const),
              fontFamily: m.role === "thinking" ? "var(--mono)" : "inherit",
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Quick questions */}
      {showQuick && (
        <div style={{ padding: "0 10px 6px", display: "flex", flexDirection: "column", gap: "3px" }}>
          {QUICK_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => ask(q)}
              style={{
                fontSize: "10.5px",
                padding: "4px 8px",
                border: "0.5px solid var(--bd2)",
                borderRadius: "3px",
                background: "transparent",
                color: "var(--t3)",
                cursor: "pointer",
                textAlign: "left",
                lineHeight: 1.4,
                fontFamily: "var(--mono)",
              }}
            >
              ↗ {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ display: "flex", gap: "6px", padding: "7px 10px", borderTop: "0.5px solid var(--bd)" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && ask()}
          placeholder="Ask anything…"
          style={{
            flex: 1,
            fontSize: "11px",
            padding: "5px 8px",
            borderRadius: "3px",
            border: "0.5px solid var(--bd2)",
            background: "var(--bg)",
            color: "var(--t1)",
            outline: "none",
            fontFamily: "var(--sans)",
          }}
        />
        <button
          onClick={() => ask()}
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "3px",
            background: "var(--acc)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <i className="ti ti-send" style={{ fontSize: "12px", color: "#000" }} aria-hidden />
        </button>
      </div>
    </aside>
  );
}
