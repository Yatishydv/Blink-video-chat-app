const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

/* =========================
   ROUTES FIRST
========================= */

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/landing.html");
});

app.get("/app", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static("public"));

/* =========================
   MATCHING STATE
========================= */

// Queue of users waiting to be matched
const waitingQueue = [];

/* =========================
   SOCKET LOGIC
========================= */

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.partner = null;
  socket.matched = false;

  /* ---------- JOIN ---------- */
  socket.on("join", () => {
    // Ignore if already matched
    if (socket.matched) return;

    // Remove self from queue if already there
    removeFromQueue(socket);

    // Find someone free
    const partner = waitingQueue.find(
      (s) => s.id !== socket.id && !s.matched
    );

    if (partner) {
      // Lock both users
      socket.partner = partner.id;
      partner.partner = socket.id;

      socket.matched = true;
      partner.matched = true;

      removeFromQueue(partner);

      socket.emit("role", "caller");
      partner.emit("role", "receiver");

      console.log("Matched:", socket.id, "↔", partner.id);
    } else {
      // No partner available → wait
      waitingQueue.push(socket);
      console.log("Waiting:", socket.id);
    }
  });

  /* ---------- WEBRTC ---------- */
  socket.on("offer", (offer) => {
    if (socket.partner) io.to(socket.partner).emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    if (socket.partner) io.to(socket.partner).emit("answer", answer);
  });

  socket.on("ice", (candidate) => {
    if (socket.partner) io.to(socket.partner).emit("ice", candidate);
  });

  /* ---------- CHAT ---------- */
  socket.on("message", (text) => {
    if (socket.partner) io.to(socket.partner).emit("message", text);
  });

  socket.on("typing", () => {
    if (socket.partner) io.to(socket.partner).emit("typing");
  });

  socket.on("stopTyping", () => {
    if (socket.partner) io.to(socket.partner).emit("stopTyping");
  });

  /* ---------- NEXT ---------- */
  socket.on("next", () => {
    disconnectPair(socket, true);
  });

  /* ---------- DISCONNECT ---------- */
  socket.on("disconnect", () => {
    disconnectPair(socket, false);
    removeFromQueue(socket);
    console.log("User disconnected:", socket.id);
  });
});

/* =========================
   HELPERS
========================= */

function disconnectPair(socket, manual) {
  if (!socket.matched || !socket.partner) return;

  const partner = io.sockets.sockets.get(socket.partner);

  if (partner) {
    partner.partner = null;
    partner.matched = false;

    partner.emit("strangerDisconnected");
    partner.emit("end");

    // Put partner back in queue
    waitingQueue.push(partner);
  }

  socket.partner = null;
  socket.matched = false;

  if (manual) {
    waitingQueue.push(socket);
  }
}

function removeFromQueue(socket) {
  const index = waitingQueue.findIndex((s) => s.id === socket.id);
  if (index !== -1) waitingQueue.splice(index, 1);
}

/* =========================
   START SERVER
========================= */

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
