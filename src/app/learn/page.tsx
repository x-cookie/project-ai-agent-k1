import Link from "next/link";
import { TopNav } from "@/components/shared/TopNav";
import { LESSONS, STAGES } from "@/lib/lessons";

const stageGroups = {
  fundamentals:         LESSONS.filter(l => l.stage === "fundamentals"),
  "agent-patterns":     LESSONS.filter(l => l.stage === "agent-patterns"),
  "advanced-reasoning": LESSONS.filter(l => l.stage === "advanced-reasoning"),
};

function NodeCard({ lesson }: { lesson: (typeof LESSONS)[0] }) {
  return (
    <Link href={`/learn/${lesson.folder}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          width: "88px",
          flexShrink: 0,
          cursor: "pointer",
          border: "0.5px solid var(--bd2)",
          borderRadius: "6px",
          background: "var(--bg2)",
          padding: "12px 10px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "var(--bg3)",
            border: "0.5px solid var(--bd2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className={`ti ${lesson.icon}`} style={{ fontSize: "15px", color: "var(--t3)" }} aria-hidden />
        </div>
        <div style={{ fontSize: "10px", color: "var(--t3)", fontFamily: "var(--mono)" }}>
          {String(lesson.num).padStart(2, "0")}
        </div>
        <div style={{ fontSize: "10.5px", color: "var(--t2)", textAlign: "center", lineHeight: 1.3 }}>
          {lesson.title}
        </div>
        <div style={{ fontSize: "9px", color: "var(--t4)", fontFamily: "var(--mono)", textAlign: "center", marginTop: "2px" }}>
          {lesson.tag}
        </div>
      </div>
    </Link>
  );
}

function NodeConnector() {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "0 4px", paddingTop: "2px" }}>
      <div style={{ width: "16px", height: "0.5px", background: "var(--bd2)" }} />
      <div style={{ width: 0, height: 0, borderTop: "3px solid transparent", borderBottom: "3px solid transparent", borderLeft: "4px solid var(--bd2)" }} />
    </div>
  );
}

export default function BranchPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <TopNav crumb={<span style={{ color: "var(--t2)" }}>roadmap</span>} />

      <div style={{ padding: "32px 32px 24px", borderBottom: "0.5px solid var(--bd)" }}>
        <div style={{ fontSize: "10px", color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--mono)", marginBottom: "8px" }}>
          learning path
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: 500, color: "var(--t1)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          AI agents from scratch
        </h1>
        <p style={{ fontSize: "13px", color: "var(--t2)", marginTop: "8px", lineHeight: 1.65, maxWidth: "460px" }}>
          Build AI agents from first principles using local LLMs. Understand what happens under the hood before reaching for frameworks.
        </p>
        <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          {[
            { icon: "ti-book",             val: "14 lessons" },
            { icon: "ti-clock",            val: "~6 hours" },
            { icon: "ti-brand-javascript", val: "Node.js" },
            { icon: "ti-cpu",              val: "local LLMs" },
          ].map(s => (
            <div key={s.val} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--t3)", fontFamily: "var(--mono)" }}>
              <i className={`ti ${s.icon}`} style={{ fontSize: "13px" }} aria-hidden />
              <span style={{ color: "var(--t2)" }}>{s.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
        {STAGES.map(stage => {
          const lessons = stageGroups[stage.key as keyof typeof stageGroups];
          return (
            <div key={stage.key} style={{ marginBottom: "36px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "var(--t3)", background: "var(--bg3)", border: "0.5px solid var(--bd2)", padding: "2px 6px", borderRadius: "2px" }}>
                  {stage.num}
                </span>
                <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--t2)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  {stage.label}
                </span>
                <div style={{ flex: 1, height: "0.5px", background: "var(--bd)" }} />
              </div>
              <div style={{ display: "flex", alignItems: "stretch", flexWrap: "wrap" }}>
                {lessons.map((lesson, i) => (
                  <div key={lesson.id} style={{ display: "flex", alignItems: "center" }}>
                    <NodeCard lesson={lesson} />
                    {i < lessons.length - 1 && <NodeConnector />}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <Link
          href={`/learn/${LESSONS[0].folder}`}
          style={{
            marginTop: "24px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            padding: "8px 18px",
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
      </div>
    </div>
  );
}
