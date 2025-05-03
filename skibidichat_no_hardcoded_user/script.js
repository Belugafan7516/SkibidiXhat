
const USERS = {}; // No hardcoded users

const channels = ["general", "random", "admin"];
let currentUser = null;
let currentChannel = "general";

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simulated user lookup via Supabase or external API (placeholder)
  if (!USERS[username]) {
    document.getElementById("error-message").innerText = "Your Email or Password is incorrect.";
    return;
  }

  if (USERS[username].password === password) {
    currentUser = { username, ...USERS[username] };
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("display-name").innerText = username;
    if (currentUser.isAdmin) {
      document.getElementById("admin-link").style.display = "block";
      document.getElementById("admin-controls").style.display = "block";
    }
    loadChannels();
    loadMessages(currentChannel);
    sendBotMessage("BassBall 2000™", `Welcome ${username}!`);
  } else {
    document.getElementById("error-message").innerText = "Incorrect password.";
  }
}

function loadChannels() {
  const list = document.getElementById("channel-list");
  list.innerHTML = "";
  channels.forEach(ch => {
    if (ch === "admin" && !(currentUser?.isAdmin)) return;
    const li = document.createElement("li");
    li.innerText = "#" + ch;
    li.onclick = () => {
      currentChannel = ch;
      loadMessages(ch);
    };
    list.appendChild(li);
  });
}

function saveMessages(channel, messages) {
  localStorage.setItem(`channel_${channel}`, JSON.stringify(messages));
}

function loadMessages(channel) {
  const container = document.getElementById("messages");
  container.innerHTML = "";
  const messages = JSON.parse(localStorage.getItem(`channel_${channel}`) || "[]");
  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<strong>${msg.user}</strong> [${msg.time}]: ${msg.text}`;
    container.appendChild(div);
  });
}

function sendMessage() {
  const input = document.getElementById("msg-input");
  const text = input.value;
  if (!text.trim()) return;
  const messages = JSON.parse(localStorage.getItem(`channel_${currentChannel}`) || "[]");
  const now = new Date().toLocaleTimeString();
  const message = { user: currentUser.username, text, time: now };
  messages.push(message);
  saveMessages(currentChannel, messages);
  loadMessages(currentChannel);
  input.value = "";
  checkBotTrigger(text);
}

function checkBotTrigger(text) {
  if (text.includes(":sparkles:")) {
    sendBotMessage("BassBall 2000™", "Here's a random quote: Believe in yourself!");
  } else if (text.includes(":lock:")) {
    sendBotMessage("BassBall 2000™", "Channel has been locked (not really, but looks cool).");
  } else if (text.startsWith("!quote")) {
    sendBotMessage("BassBall 2000™", "Random quote: Keep pushing forward!");
  }
}

function sendBotMessage(user, text) {
  const messages = JSON.parse(localStorage.getItem(`channel_${currentChannel}`) || "[]");
  const now = new Date().toLocaleTimeString();
  messages.push({ user, text, time: now });
  saveMessages(currentChannel, messages);
  loadMessages(currentChannel);
}

function showTyping() {
  const el = document.getElementById("typing-indicator");
  el.style.display = "block";
  clearTimeout(window.typingTimeout);
  window.typingTimeout = setTimeout(() => el.style.display = "none", 1000);
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

function broadcast() {
  sendBotMessage("BassBall 2000™", "Admin broadcast: Be kind and have fun!");
}
