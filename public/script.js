const socket = io();

/* =========================
   ELEMENTS
========================= */

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const muteBtn = document.getElementById("muteBtn");
const camBtn = document.getElementById("camBtn");

const msgInput = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");
const typingIndicator = document.getElementById("typingIndicator");
const timerEl = document.getElementById("connectionTimer");

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

/* =========================
   STATE
========================= */

let localStream;
let peerConnection;
let muted = false;
let camOff = false;
let typingTimeout;

let searching = false;
let timerInterval;
let seconds = 0;

const matchSound = new Audio("/match.mp3");

const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

/* =========================
   INIT
========================= */

disableChat();
hideTimer();

/* =========================
   START
========================= */

startBtn.onclick = async () => {
  if (!localStream) {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    localVideo.srcObject = localStream;
  }

  startSearching();
  socket.emit("join");
};

/* =========================
   SOCKET EVENTS
========================= */

socket.on("role", async (role) => {
  stopSearching();
  resetChat();
  enableChat();
  startTimer();
  matchSound.play();

  createPeer();

  if (role === "caller") {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", offer);
  }
});

socket.on("offer", async (offer) => {
  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit("answer", answer);
});

socket.on("answer", async (answer) => {
  await peerConnection.setRemoteDescription(answer);
});

socket.on("ice", async (candidate) => {
  if (candidate) await peerConnection.addIceCandidate(candidate);
});

/* =========================
   CHAT
========================= */

socket.on("message", (text) => {
  addMessage("Stranger", text, "other");
});

socket.on("typing", () => {
  typingIndicator.style.display = "block";
});

socket.on("stopTyping", () => {
  typingIndicator.style.display = "none";
});

/* =========================
   DISCONNECT
========================= */

socket.on("strangerDisconnected", () => {
  resetChat();
  disableChat();
  stopTimer();
  addSystemMessage("Stranger disconnected.");
  startSearching();
});

socket.on("end", () => {
  resetChat();
  cleanupVideo();
  disableChat();
  stopTimer();
  startSearching();
  setTimeout(() => socket.emit("join"), 800);
});

/* =========================
   SEND MESSAGE
========================= */

sendBtn.onclick = sendMessage;

msgInput.onkeypress = (e) => {
  if (e.key === "Enter") sendMessage();
};

msgInput.oninput = () => {
  socket.emit("typing");
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => socket.emit("stopTyping"), 800);
};

function sendMessage() {
  if (msgInput.disabled) return;

  const text = msgInput.value.trim();
  if (!text) return;

  socket.emit("message", text);
  socket.emit("stopTyping");

  addMessage("You", text, "me");
  msgInput.value = "";
}

/* =========================
   NEXT
========================= */

nextBtn.onclick = () => {
  socket.emit("next");
  resetChat();
  cleanupVideo();
  disableChat();
  stopTimer();
  startSearching();
};

/* =========================
   CONTROLS
========================= */

muteBtn.onclick = () => {
  muted = !muted;
  localStream.getAudioTracks()[0].enabled = !muted;
  muteBtn.innerText = muted ? "Unmute" : "Mute";
};

camBtn.onclick = () => {
  camOff = !camOff;
  localStream.getVideoTracks()[0].enabled = !camOff;
  camBtn.innerText = camOff ? "Camera On" : "Camera Off";
};

/* =========================
   WEBRTC
========================= */

function createPeer() {
  peerConnection = new RTCPeerConnection(config);

  localStream.getTracks().forEach(track =>
    peerConnection.addTrack(track, localStream)
  );

  peerConnection.ontrack = (e) => {
    remoteVideo.srcObject = e.streams[0];
  };

  peerConnection.onicecandidate = (e) => {
    if (e.candidate) socket.emit("ice", e.candidate);
  };
}

function cleanupVideo() {
  if (peerConnection) peerConnection.close();
  peerConnection = null;
  remoteVideo.srcObject = null;
}

/* =========================
   SEARCHING
========================= */

function startSearching() {
  if (searching) return;
  searching = true;

  const div = document.createElement("div");
  div.id = "searchingMsg";
  div.className = "system searching dots";
  div.innerText = "Searching for a stranger";
  messagesDiv.appendChild(div);
}

function stopSearching() {
  searching = false;
  const el = document.getElementById("searchingMsg");
  if (el) el.remove();
}

/* =========================
   TIMER
========================= */

function startTimer() {
  seconds = 0;
  timerEl.classList.remove("hidden");

  timerInterval = setInterval(() => {
    seconds++;
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    timerEl.innerText = `${m}:${s}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  hideTimer();
}

function hideTimer() {
  timerEl.classList.add("hidden");
}

/* =========================
   CHAT STATE
========================= */

function resetChat() {
  messagesDiv.innerHTML = "";
  typingIndicator.style.display = "none";
}

function disableChat() {
  msgInput.disabled = true;
  sendBtn.disabled = true;
  msgInput.placeholder = "Waiting for a stranger…";
}

function enableChat() {
  msgInput.disabled = false;
  sendBtn.disabled = false;
  msgInput.placeholder = "Type a message…";
}

/* =========================
   UI HELPERS
========================= */

function addMessage(sender, text, cls) {
  const div = document.createElement("div");
  div.className = `message ${cls}`;
  div.innerText = `${sender}: ${text}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addSystemMessage(text) {
  const div = document.createElement("div");
  div.className = "system";
  div.innerText = text;
  messagesDiv.appendChild(div);
}

/* =========================
   MOBILE KEYBOARD POLISH
========================= */

msgInput.addEventListener("focus", () => {
  setTimeout(() => {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, 300);
});
