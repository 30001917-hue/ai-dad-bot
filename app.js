const chatbox = document.getElementById("chatbox");

// =========================
// 🎬 START APP
// =========================
function startApp() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("app").style.display = "block";

  addMsg("🤖 DadBot: Welcome Dad 🎉 This is your Final Boss Birthday Experience!", "bot");

  launchBalloons();
  launchConfetti();
  loadGallery();
}

// =========================
// 💬 CHAT SYSTEM
// =========================
function addMsg(text, type) {
  const div = document.createElement("div");
  div.className = type;
  div.innerText = text;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function send() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;

  addMsg("You: " + text, "user");
  input.value = "";

  const reply = brain(text);

  setTimeout(() => {
    addMsg("🤖 DadBot: " + reply, "bot");
    speak(reply);
  }, 400);
}

// =========================
// ⚡ QUICK ACTIONS
// =========================
function quick(type) {
  addMsg("You clicked: " + type, "user");

  setTimeout(() => {
    const reply = brain(type);
    addMsg("🤖 DadBot: " + reply, "bot");
    speak(reply);
  }, 400);
}

// =========================
// 🧠 FINAL BOSS BRAIN
// =========================
function brain(input) {
  input = input.toLowerCase();

  if (input.includes("birthday")) {
    launchConfetti();
    launchBalloons();
    return "🎂 HAPPY BIRTHDAY!! You are loved, appreciated, and absolutely amazing ❤️";
  }

  if (input.includes("joke")) {
    return "😂 Why did the dad sit on the clock? He wanted to be on time!";
  }

  if (input.includes("recipe")) {
    return "🍳 Try Paneer Butter Masala, Veg Biryani, Pasta Alfredo, or Veg Wraps!";
  }

  if (input.includes("travel")) {
    return "🌍 Japan 🇯🇵, Italy 🇮🇹, Switzerland 🇨🇭, and NYC 🇺🇸 are amazing trips!";
  }

  if (input.includes("music")) {
    return "🎵 Coldplay, Ed Sheeran, Arijit Singh, Imagine Dragons, Lo-fi beats!";
  }

  if (input.includes("fact")) {
    return "📚 Octopuses have 3 hearts ❤️ | Honey never spoils | Sharks predate trees 🦈";
  }

  return "🤖 I’m DadBot Final Boss — try joke, recipe, travel, music, fact, or birthday 🎉";
}

// =========================
// 🔊 VOICE OUTPUT
// =========================
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1;
  speechSynthesis.speak(msg);
}

// =========================
// 🎤 VOICE INPUT
// =========================
function startVoice() {
  const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  rec.start();

  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    addMsg("You: " + text, "user");
    const reply = brain(text);
    addMsg("🤖 DadBot: " + reply, "bot");
    speak(reply);
  };
}

// =========================
// 🎊 EFFECTS
// =========================
function launchConfetti() {
  for (let i = 0; i < 50; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = randomColor();
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3000);
  }
}

function launchBalloons() {
  for (let i = 0; i < 20; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    b.style.left = Math.random() * 100 + "vw";
    b.style.background = randomColor();
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 6000);
  }
}

function randomColor() {
  return ["#ff6b6b","#6c5ce7","#00b894","#fdcb6e"][Math.floor(Math.random()*4)];
}

// =========================
// 🎁 SECRET GIFT
// =========================
function gift() {
  launchConfetti();
  alert("🎁 Surprise! You are the best dad in the world ❤️");
}

// =========================
// 📸 GALLERY
// =========================
function loadGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = `
    <img src="https://via.placeholder.com/120x120?text=Memory+1">
    <img src="https://via.placeholder.com/120x120?text=Memory+2">
    <img src="https://via.placeholder.com/120x120?text=Memory+3">
  `;
}