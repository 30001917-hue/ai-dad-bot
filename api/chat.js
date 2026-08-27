export default async function handler(req, res) {
  try {
    // Only allow POST
    if (req.method !== "POST") {
      return res.status(200).json({ reply: "DadBot ready 🤖" });
    }

    // Get messages safely
    let messages = req.body?.messages;

    // Ensure array
    if (!Array.isArray(messages)) {
      messages = [];
    }

    // Clean + validate messages (prevents Groq errors)
    messages = messages
      .map(m => ({
        role: m?.role,
        content: m?.content
      }))
      .filter(m =>
        typeof m.role === "string" &&
        typeof m.content === "string"
      )
      .slice(-6);

    // IMPORTANT: prevent empty message crash
    if (messages.length === 0) {
      messages = [
        {
          role: "user",
          content: "Hello"
        }
      ];
    }

    // Call Groq API
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages,
          temperature: 0.7,
          // gpt-oss is a reasoning model: reasoning tokens count toward the
          // completion limit, so keep effort low and leave enough headroom
          // that long answers (travel plans, recipes) aren't truncated.
          reasoning_effort: "low",
          max_completion_tokens: 3000
        })
      }
    );

    const data = await response.json();

    // Handle API errors properly
    if (!response.ok) {
      return res.status(200).json({
        reply: "❌ API Error: " + (data?.error?.message || "Unknown error")
      });
    }

    // Extract reply safely
    const reply =
      data?.choices?.[0]?.message?.content ||
      "No response";

    // finish_reason "length" means the token budget ran out mid-sentence.
    // Surfaced so truncation is diagnosable instead of silent; the frontend
    // ignores these extra fields.
    return res.status(200).json({
      reply,
      finish_reason: data?.choices?.[0]?.finish_reason,
      usage: data?.usage
    });

  } catch (err) {
    console.error("DadBot API Error:", err);

    return res.status(200).json({
      reply: "Server error 😅"
    });
  }
}