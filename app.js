const chat = document.getElementById("chat");
const prompt = document.getElementById("prompt");
const send = document.getElementById("send");
const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcome");
const typing = document.getElementById("typing");
const clearBtn = document.getElementById("clearBtn");
const voiceBtn = document.getElementById("voiceBtn");

let messages = [];

/* ---------------- START BUTTON FIX ---------------- */
if (startBtn) {
  startBtn.addEventListener("click", () => {
    if (welcome) welcome.style.display = "none";
    if (chat) chat.style.display = "block";
    if (document.querySelector("footer")) {
      document.querySelector("footer").style.display = "flex";
    }

    addMessage("👋 DadBot is online!", "bot");
  });
}

/* ---------------- CLEAR CHAT ---------------- */
if (clearBtn) {
  clearBtn.onclick = () => {
    messages = [];
    chat.innerHTML = "";
  };
}

/* ---------------- SEND MESSAGE ---------------- */
if (send) send.onclick = sendMessage;

if (prompt) {
  prompt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

async function sendMessage() {
  const text = prompt.value.trim();
  if (!text) return;

  addMessage(text, "user");

  messages.push({ role: "user", content: text });

  prompt.value = "";

  typing.style.display = "block";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.slice(-6)
      })
    });

    const data = await res.json();

    typing.style.display = "none";

    const reply = data?.reply || "No response";

    addMessage(reply, "bot");

    messages.push({ role: "assistant", content: reply });

  } catch (err) {
    typing.style.display = "none";
    addMessage("⚠️ Connection error", "bot");
  }
}

/* ---------------- UI ---------------- */
function addMessage(text, type) {
  if (!chat) return;

  const div = document.createElement("div");
  div.className = "message " + type;
  div.innerHTML = window.marked ? marked.parse(text) : text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

/* ---------------- VOICE ---------------- */
if (voiceBtn && "webkitSpeechRecognition" in window) {
  const rec = new webkitSpeechRecognition();
  rec.lang = "en-US";

  voiceBtn.onclick = () => rec.start();

  rec.onresult = (e) => {
    prompt.value = e.results[0][0].transcript;
  };
}