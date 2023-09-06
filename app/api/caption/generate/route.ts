import { OpenAIStream, StreamingTextResponse } from "ai"
import { getServerSession } from "next-auth/next"
import OpenAI from "openai"

import { env } from "@/env.mjs"
import { authOptions } from "@/lib/auth"

export const runtime = "edge"

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new Response("Unauthorized", { status: 403 })
    // }
    const { prompt } = await req.json()

    const response = await openai.completions.create({
      model: "text-davinci-003",
      stream: true,
      temperature: 0.6,
      max_tokens: 300,
      prompt: `Create Instagram caption based on this description:
      ${prompt}.`,
    })
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
