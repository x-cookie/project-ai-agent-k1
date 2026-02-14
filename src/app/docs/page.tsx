import Link from "next/link";
import { TopNav } from "@/components/shared/TopNav";
import { LESSONS, STAGES } from "@/lib/lessons";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "40px" }}>
      <h2 style={{ fontSize: "10px", fontWeight: 500, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--mono)", marginBottom: "12px" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "13px", color: "var(--t2)", lineHeight: 1.75, marginBottom: "10px", maxWidth: "640px" }}>
      {children}
    </p>
  );
}

const GLOSSARY = [
  { term: "context window",    def: "The maximum number of tokens (input + output) a model can process in a single inference call. Determines what fits in memory." },
  { term: "KV cache",          def: "A key-value store of past attention computations. Reusing it avoids re-processing tokens already seen, speeding up multi-turn inference." },
  { term: "function calling",  def: "A protocol where the model outputs a structured JSON call to a named tool rather than natural language. The runtime executes the tool and feeds the result back." },
  { term: "ReAct",             def: "Reason + Act. An agent pattern where the model alternates between generating a thought, picking an action, and observing the result — iterating until done." },
  { term: "DAG",               def: "Directed Acyclic Graph. A way to represent task dependencies with no cycles. Steps whose deps are resolved can run in parallel." },
  { term: "GGUF",              def: "A binary format for quantized LLM weights. Designed for CPU/GPU inference with node-llama-cpp and llama.cpp." },
  { term: "system prompt",     def: "Instructions prepended to every conversation that define the model's role, constraints, and output format. The agent's identity." },
  { term: "token",             def: "The smallest unit of text the model operates on — roughly a word-piece. A rough rule: 1 token ≈ 0.75 words in English." },
];

const FAQ = [
  { q: "Do I need a GPU?",           a: "No. All local examples use CPU inference via node-llama-cpp. A GPU speeds things up but isn't required for learning." },
  { q: "Which model should I use?",  a: "Llama-3.1-8B-Instruct.Q4_K_M.gguf is a good starting point — 5 GB, runs on most machines, strong instruction following." },
  { q: "Local vs hosted — which for production?", a: "Hosted (OpenAI, Anthropic) for capability and scale. Local for privacy, cost control, or offline environments. Lessons 1–6 teach both." },
  { q: "Does this course use LangChain?", a: "No. The entire course builds agents from scratch using raw model APIs. Frameworks like LangChain are abstractions over exactly what you build here." },
];

export default function DocsPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <TopNav crumb={<span style={{ color: "var(--t2)" }}>docs</span>} />

      <div style={{ flex: 1, display: "flex" }}>
        {/* Sidebar TOC */}
        <aside
          style={{
            width: "200px",
            minWidth: "200px",
            borderRight: "0.5px solid var(--bd)",
            padding: "24px 0",
            position: "sticky",
            top: 0,
            alignSelf: "flex-start",
            height: "calc(100vh - 44px)",
          }}
        >
          {[
            { href: "#what",          label: "What this is" },
            { href: "#how",           label: "How it works" },
            { href: "#prereqs",       label: "Prerequisites" },
            { href: "#glossary",      label: "Glossary" },
            { href: "#stack",         label: "Stack" },
            { href: "#lesson-map",    label: "Lesson map" },
            { href: "#faq",           label: "FAQ" },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              style={{
                display: "block",
                padding: "5px 20px",
                fontSize: "12px",
                color: "var(--t2)",
                textDecoration: "none",
                borderLeft: "1.5px solid transparent",
              }}
            >
              {item.label}
            </a>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: "32px 40px", overflowY: "auto", maxWidth: "800px" }}>
          <div style={{ fontSize: "10px", color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--mono)", marginBottom: "12px" }}>
            technical reference
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 500, color: "var(--t1)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "32px" }}>
            Documentation
          </h1>

          <Section title="What this is">
            <Prose>
              AI agents from scratch is a 14-lesson Node.js course on building AI agents from first principles.
              An AI agent is any system where a language model can take actions — call tools, read memory, loop until done — rather than just returning a single response.
            </Prose>
            <Prose>
              The course uses local LLMs (via node-llama-cpp) and hosted APIs (OpenAI). Every pattern is implemented without frameworks so the mechanics are transparent.
              Once you understand how a ReAct loop or DAG executor works from the source up, using LangChain or LlamaIndex becomes a choice rather than a dependency.
            </Prose>
          </Section>

          <Section title="How it works">
            <Prose>
              Three stages, 14 lessons, ~6 hours total. Each lesson is a focused concept paired with a minimal working implementation.
            </Prose>
            <div style={{ background: "var(--bg2)", border: "0.5px solid var(--bd2)", borderRadius: "5px", padding: "14px 16px", fontFamily: "var(--mono)", fontSize: "11.5px", color: "var(--t3)", lineHeight: 2.1, marginBottom: "10px" }}>
              Stage 01 — Fundamentals (lessons 1–6)<br />
              {"  "}Raw inference → hosted APIs → system prompts → reasoning → batch → streaming<br />
              <br />
              Stage 02 — Agent patterns (lessons 7–10)<br />
              {"  "}Function calling → memory → ReAct → AoT / DAG planning<br />
              <br />
              Stage 03 — Advanced reasoning (lessons 11–14)<br />
              {"  "}Error handling → tree of thought → graph of thought → chain of thought
            </div>
          </Section>

          <Section title="Prerequisites">
            <Prose>Node.js 18+ and npm. Working knowledge of async/await and Promises.</Prose>
            <Prose>
              You should know what a REST API is and be comfortable reading JSON. No prior AI or ML experience is required — the course explains the model primitives from scratch.
            </Prose>
            <Prose>
              For local LLM lessons: a GGUF-format model file (4–8 GB). A GPU is optional but speeds things up.
              For hosted API lessons: an OpenAI API key or any OpenAI-compatible endpoint.
            </Prose>
          </Section>

          <Section title="Glossary">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {GLOSSARY.map(({ term, def }) => (
                <div key={term} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "16px", alignItems: "start" }}>
                  <code style={{ fontSize: "11px", color: "var(--t2)", fontFamily: "var(--mono)", paddingTop: "1px" }}>{term}</code>
                  <p style={{ fontSize: "12.5px", color: "var(--t2)", lineHeight: 1.65, margin: 0 }}>{def}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Stack">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", maxWidth: "500px" }}>
              {[
                { name: "node-llama-cpp",  role: "Local LLM inference" },
                { name: "openai",          role: "Hosted API SDK" },
                { name: "Next.js 14",      role: "Web layer (this app)" },
                { name: "Anthropic SDK",   role: "AI tutor backend" },
              ].map(({ name, role }) => (
                <div key={name} style={{ background: "var(--bg2)", border: "0.5px solid var(--bd2)", borderRadius: "5px", padding: "10px 12px" }}>
                  <div style={{ fontSize: "11px", color: "var(--t1)", fontFamily: "var(--mono)", marginBottom: "3px" }}>{name}</div>
                  <div style={{ fontSize: "11px", color: "var(--t3)" }}>{role}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Lesson map">
            {STAGES.map(stage => (
              <div key={stage.key} style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "10px", fontFamily: "var(--mono)", color: "var(--t3)", background: "var(--bg3)", border: "0.5px solid var(--bd2)", padding: "2px 6px", borderRadius: "2px" }}>{stage.num}</span>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--t2)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{stage.label}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {LESSONS.filter(l => l.stage === stage.key).map(l => (
                    <div key={l.id} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: "12px", padding: "6px 0", borderBottom: "0.5px solid var(--bd)" }}>
                      <span style={{ fontSize: "10px", color: "var(--t3)", fontFamily: "var(--mono)" }}>{String(l.num).padStart(2, "0")}</span>
                      <div>
                        <Link href={`/learn/${l.folder}`} style={{ fontSize: "12px", color: "var(--t1)", textDecoration: "none" }}>{l.title}</Link>
                        <span style={{ fontSize: "10px", color: "var(--t3)", fontFamily: "var(--mono)", marginLeft: "8px" }}>{l.tag}</span>
                        <p style={{ fontSize: "11.5px", color: "var(--t3)", margin: "2px 0 0", lineHeight: 1.5 }}>{l.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Section>

          <Section title="FAQ">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {FAQ.map(({ q, a }) => (
                <div key={q}>
                  <div style={{ fontSize: "12.5px", fontWeight: 500, color: "var(--t1)", marginBottom: "4px" }}>{q}</div>
                  <div style={{ fontSize: "12.5px", color: "var(--t2)", lineHeight: 1.65, maxWidth: "560px" }}>{a}</div>
                </div>
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}
