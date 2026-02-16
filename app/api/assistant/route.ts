import { NextResponse } from "next/server";
import OpenAI from "openai";

const FALLBACK_MESSAGE =
  "Assistente indisponivel no momento. Voce pode continuar usando os filtros e mensagens normalmente.";
const DEFAULT_MODEL = "gpt-4.1-mini";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;

  if (!apiKey) {
    return NextResponse.json({ answer: FALLBACK_MESSAGE });
  }

  try {
    const { question } = (await request.json()) as { question?: string };
    if (!question) {
      return NextResponse.json({ answer: "Escreva uma pergunta para receber orientacao." }, { status: 400 });
    }

    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "Voce e um assistente especializado em cuidados de idosos no Brasil. Responda em pt-BR, com no maximo 120 palavras, de forma acolhedora e pratica. Nao substitui orientacao medica.",
        },
        {
          role: "user",
          content: question,
        },
      ],
      temperature: 0.5,
      max_tokens: 220,
    });

    const answer = completion.choices[0]?.message?.content?.trim() || FALLBACK_MESSAGE;

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({ answer: FALLBACK_MESSAGE });
  }
}
