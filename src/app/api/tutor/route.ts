import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/tutor";
import type { Lesson } from "@/lib/lessons";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const { question, lesson, concept } = (await req.json()) as {
    question: string;
    lesson: Lesson;
    concept: string;
  };

  if (!question || !lesson) {
    return Response.json({ error: "Missing question or lesson" }, { status: 400 });
  }

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: buildSystemPrompt(lesson, concept ?? ""),
    messages: [{ role: "user", content: question }],
  });

  const answer = message.content
    .filter(b => b.type === "text")
    .map(b => (b as { type: "text"; text: string }).text)
    .join("");

  return Response.json({ answer });
}
