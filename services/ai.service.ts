/**
 * CortexPress — AI Summary Service
 *
 * Currently a PLACEHOLDER. Replace the implementation inside
 * `generatePostSummary` with the real Google Gemini API call.
 *
 * ---------------------------------------------------------------
 * TODO (AI Integration):
 *   1. Install: npm install @google/generative-ai
 *   2. Add GOOGLE_AI_API_KEY to .env.local
 *   3. Uncomment the Gemini implementation below
 * ---------------------------------------------------------------
 */

// import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Generates a ~200-word summary of the given blog post body.
 * In demo mode, it uses a heuristic to generate a believable summary.
 * 
 * @param body   - Full post body text
 * @returns      - Summary string
 */
export async function generateSummary(body: string): Promise<string> {
  console.log("[AI] generateSummary triggered with content length:", body?.length);

  // Simulate a slight delay for "AI thinking"
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!body || body.trim().length < 20) {
    return "The story is currently too short for a meaningful AI summary. Please add more detail to engage your readers!";
  }

  // Heuristic: Extract key sentences and wrap with professional intro/outro
  const cleanBody = body.replace(/\s+/g, ' ').trim();
  const sentences = cleanBody.match(/[^.!?]+[.!?]+/g) || [cleanBody];
  
  const selectedSentences = sentences.slice(0, 3).join(" ");
  
  const intros = [
    "This insightful piece delves into",
    "An engaging exploration of",
    "A profound look at",
    "This narrative captures the essence of"
  ];
  const randomIntro = intros[Math.floor(Math.random() * intros.length)];

  return `${randomIntro} ${selectedSentences.charAt(0).toLowerCase() + selectedSentences.slice(1)} Through this lens, the author provides a fresh perspective on the evolving digital landscape.`;
}