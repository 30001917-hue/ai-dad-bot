import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a funny AI dad bot." },
        { role: "user", content: message }
      ],
    });

    res.status(200).json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: "AI request failed" });
  }
}