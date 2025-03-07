import { type NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const { resumeData, jobDescription } = await req.json();
    
    if (!resumeData || !jobDescription) {
      return NextResponse.json({ error: "Resume data and job description are required" }, { status: 400 });
    }
    
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    const prompt = `
      I have a resume and a job description. I need you to analyze them and provide suggestions to optimize my resume for this specific job.
      
      Resume:
      ${JSON.stringify(resumeData)}
      
      Job Description:
      ${jobDescription}
      
      Please provide:
      1. 3-5 specific suggestions to improve my resume for this job
      2. Key skills mentioned in the job description that I should highlight
      3. Any potential gaps between my experience and the job requirements
      
      Format your response as a JSON object with the following structure:
      {
        "suggestions": ["suggestion1", "suggestion2", ...],
        "keySkills": ["skill1", "skill2", ...],
        "gaps": ["gap1", "gap2", ...]
      }
    `;
    
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });
    
    // Parse the response as JSON
    const analysis = JSON.parse(response.choices[0]?.message?.content || "{}");
    
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error analyzing job description:", error);
    return NextResponse.json({ error: "Failed to analyze job description" }, { status: 500 });
  }
}
