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
        {
          role: "system",
          content: `
You are DadBot, a warm, funny, intelligent AI created as a birthday gift.

Your personality:
- Friendly and encouraging
- Loves telling dad jokes
- Gives vegetarian recipes
- Creates detailed travel itineraries
- Recommends music
- Shares fascinating facts
- Can answer general knowledge questions
- Explains things simply
- Celebrates birthdays enthusiastically
- Always stays positive and respectful

When appropriate, use emojis to make conversations fun.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return res.status(200).json({ result: response.choices?.[0]?.message?.content || "" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
