import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SYSTEM_PROMPT = `You are Bloom, an AI communication coach for digital teams.

Your job is to rewrite workplace collaboration messages so they feel more human while preserving the original intent.

The user will provide:
- an original workplace message
- an improvement goal
- whether the improvement goal is a preset option or custom instruction

You must return valid JSON only. Do not include markdown. Do not include explanation outside JSON.

Return this exact structure:
{
  "bloomed_message": "...",
  "what_changed": "...",
  "why_this_helps": "...",
  "nutrient": "Water" | "Sunlight" | "Roots" | "Bloom" | "Butterfly",
  "growth_points": 10,
  "recognition_signal": "..."
}

Rules:
- Preserve the original intent.
- Follow the improvement goal carefully.
- If the improvement goal is a custom instruction, prioritize it over preset behavior.
- Do not remove urgency if urgency matters.
- Keep the message natural and useful.
- Make the message suitable for Slack, Miro, Teams, Notion, email, or async collaboration.
- Do not make it overly formal unless asked for professional/executive tone.
- Do not make it too long unless the user asks for more detail.
- Add warmth, context, appreciation, clarity, diplomacy, confidence, or collaboration when appropriate.
- If harsh, reduce blame and make the ask specific. If vague, add clarity. If demanding, add respect.
- Avoid therapy language and corporate jargon. Sound like a kind, clear teammate.
- Never mention surveillance, productivity scoring, monitoring, or ranking.

Preset behavior:
- Make it Friendlier: warmth, appreciation, approachability.
- Make it More Professional: polish, clarity, business communication.
- Make it More Collaborative: teamwork, shared goals, mutual support.
- Make it More Concise: fewer words, preserve meaning/tone.
- Make it More Diplomatic: soften harsh language, reduce friction, stay constructive.

Nutrients (pick exactly one):
- Water = Support, growth_points 10
- Sunlight = Clarity, growth_points 10
- Roots = Respectful boundary/deadline, growth_points 12
- Bloom = Appreciation, growth_points 15
- Butterfly = Encouragement, growth_points 15

recognition_signal is a short phrase (max 8 words).`;

const NUTRIENTS = ["Water", "Sunlight", "Roots", "Bloom", "Butterfly"] as const;

const fallback = (message: string, goal: string) => {
  const lower = message.toLowerCase();
  const g = goal.toLowerCase();
  if (g.includes("diplomatic") || lower.includes("doesn't make sense")) {
    return {
      bloomed_message:
        "I'd love to understand this better — could we walk through it together? I think a small clarification on the flow would really help me follow it.",
      what_changed: "Softened blame into a collaborative request for clarity.",
      why_this_helps: "Keeps the feedback constructive while inviting dialogue.",
      nutrient: "Sunlight" as const,
      growth_points: 10,
      recognition_signal: "Diplomatic clarification.",
    };
  }
  if (lower.includes("by 3") || lower.includes("deadline") || g.includes("urgency")) {
    return {
      bloomed_message:
        "Could you send this by 3 PM today? It would really help me keep things moving — let me know if that timing is tough.",
      what_changed: "Added context and respect while keeping the deadline clear.",
      why_this_helps: "Maintains urgency without pressure.",
      nutrient: "Roots" as const,
      growth_points: 12,
      recognition_signal: "Respectful deadline.",
    };
  }
  if (g.includes("concise")) {
    return {
      bloomed_message: message.trim().split(" ").slice(0, 18).join(" "),
      what_changed: "Tightened wording while keeping intent.",
      why_this_helps: "Easier to scan and act on.",
      nutrient: "Sunlight" as const,
      growth_points: 10,
      recognition_signal: "Added clarity.",
    };
  }
  return {
    bloomed_message: `Sharing a quick note — ${message.trim()} Let me know your thoughts when you get a moment.`,
    what_changed: `Adjusted tone to feel ${goal.toLowerCase()} while keeping intent.`,
    why_this_helps: "A small softening makes it easier to receive.",
    nutrient: "Bloom" as const,
    growth_points: 15,
    recognition_signal: "Added warmth.",
  };
};

const ResultSchema = z.object({
  bloomed_message: z.string(),
  what_changed: z.string(),
  why_this_helps: z.string(),
  nutrient: z.enum(NUTRIENTS),
  growth_points: z.number(),
  recognition_signal: z.string(),
});

export const generateBloomMessage = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      message: z.string().min(1).max(2000),
      improvement_goal: z.string().min(1).max(400),
      is_custom_instruction: z.boolean().default(false),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ...fallback(data.message, data.improvement_goal), source: "fallback" as const };
    }

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": apiKey,
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: JSON.stringify({
                message: data.message,
                improvement_goal: data.improvement_goal,
                is_custom_instruction: data.is_custom_instruction,
              }),
            },
          ],
          response_format: { type: "json_object" },
        }),
      });

      if (!res.ok) {
        if (res.status === 429) throw new Error("Rate limited.");
        if (res.status === 402) throw new Error("AI credits exhausted.");
        throw new Error(`AI request failed (${res.status}).`);
      }

      const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
      const content = json.choices?.[0]?.message?.content ?? "";
      const cleaned = content.replace(/^```json\s*|\s*```$/g, "").trim();
      const parsed = ResultSchema.parse(JSON.parse(cleaned));
      return { ...parsed, source: "ai" as const };
    } catch (err) {
      console.error("Bloom AI error:", err);
      return { ...fallback(data.message, data.improvement_goal), source: "fallback" as const };
    }
  });

export type BloomResult = Awaited<ReturnType<typeof generateBloomMessage>>;
export type Nutrient = (typeof NUTRIENTS)[number];
