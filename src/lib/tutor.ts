import type { Lesson } from "./lessons";

export function buildSystemPrompt(lesson: Lesson, concept: string): string {
  return `You are a concise expert tutor for "AI Agents from Scratch", a Node.js course on building AI agents from first principles.

Lesson ${lesson.num}: ${lesson.title} (${lesson.tag})
Description: ${lesson.desc}
Key concepts: ${lesson.keys.join(", ")}
${concept ? `\nConcept overview:\n${concept.slice(0, 1200)}` : ""}

Reply in 2–4 sentences. Direct and technical. Plain prose only — no markdown, no bullets. Mention connections to other lessons when relevant.`;
}
