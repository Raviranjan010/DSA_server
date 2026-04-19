import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert Data Structures and Algorithms tutor. 
      The student is asking: "${message}"
      Context about what they are looking at: ${context ? JSON.stringify(context) : "None"}
      
      Provide a highly educational, encouraging, and clear response. Use Markdown for formatting. 
      If they ask for code, provide clean, commented code. If they ask for explanations, use analogies.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI response: " + error.message },
      { status: 500 }
    );
  }
}
