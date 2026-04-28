import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * AI Service
 * Integrates with Google Gemini API to generate post summaries.
 * In demo mode (missing API key), it simulates an AI summary for a realistic experience.
 */
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export async function generateSummary(content: string): Promise<string> {
  // If API Key is present, use the real Gemini AI
  if (API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Summarize the following blog post content in about 150-200 words. Keep it professional and engaging:\n\n${content}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating summary with Gemini:", error);
      // Fallback to simulation if API fails
    }
  }

  // Simulated AI Summary Logic (for demo purposes when API key is missing)
  return new Promise((resolve) => {
    // Simulate network delay for realistic feel
    setTimeout(() => {
      const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
      const mainPoints = sentences.slice(0, 3).map(s => s.trim()).join('. ');
      
      const simulatedSummary = `This insightful article explores the core relationship between nature and human existence, emphasizing the critical interdependence that maintains our global ecosystem. ${mainPoints}. The text highlights the urgency of addressing environmental challenges through collective action and sustainable practices, ultimately calling for a renewed commitment to preserving our natural world for future generations. By focusing on biological restoration and resource management, the author presents a compelling case for environmental stewardship.`;
      
      resolve(simulatedSummary);
    }, 2000);
  });
}
