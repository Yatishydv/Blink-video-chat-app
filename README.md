# 🚀 Blink — Random Video Chat App

**Blink** is a real-time random video chat web application that instantly connects strangers for anonymous video and text conversations.

No sign-up.
No history.
Just instant human connection.

---

## ✨ Features

* 🎥 **Random 1-to-1 Video Calling** (WebRTC)
* 💬 **Real-time Text Chat**
* 🔄 **Next / Skip Stranger**
* ⏳ **Connection Timer**
* 🔍 **“Searching for a stranger…” State**
* 🧠 **Typing Indicator**
* 🔔 **Match Sound on Connection**
* 📱 **Fully Responsive (Mobile + Desktop)**
* 🍪 **Privacy-friendly Cookie Consent**
* 📊 **Google Analytics (Ethical Tracking)**

---

## 🛡️ Privacy & Safety

Blink is designed with privacy as a priority:

* ❌ No user accounts
* ❌ No chat history stored
* ❌ No recordings
* ❌ No personal data collection
* ✅ Anonymous sessions only
* ✅ Privacy confirmation before starting chat

---

## 🧱 Tech Stack

### Frontend

* HTML5
* CSS3 (Responsive & Mobile-safe)
* Vanilla JavaScript

### Backend

* Node.js
* Express.js
* Socket.IO

### Real-Time Media

* WebRTC (Peer-to-Peer Video & Audio)

### Deployment & Monitoring

* Render
* UptimeRobot
* Google Analytics (GA4)

---

## 📁 Project Structure

```bash
random-video-call/
│
├── public/
│   ├── index.html        # Video chat app UI
│   ├── landing.html     # Landing page
│   ├── style.css        # App + landing styles
│   ├── script.js        # WebRTC + socket logic
│   └── landing.js       # Landing interactions
│
├── server.js            # Express + Socket.IO server
├── package.json
└── README.md
```

---

## 🔄 How It Works

1. User opens the **Landing Page**
2. Accepts privacy & cookie notice
3. Clicks **Start Chatting**
4. Server matches two waiting users
5. WebRTC peer connection is created
6. Users can:

   * Talk via video
   * Chat via text
   * Skip to the next stranger

---

## 🧪 Local Development

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Blink-video-chat-app.git
cd Blink-video-chat-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the server

```bash
node server.js
```

### 4️⃣ Open in browser

```text
http://localhost:3000
```

> Open the app in **two different browsers or devices** to test matching.

---

## 🌐 Live Demo

🔗 **Live Application**

```
https://blink-video-chat-app.onrender.com/app
```

> ⚠️ Note: First load may take a few seconds due to free hosting cold start.

---

## 📊 Analytics (Ethical Tracking)

Blink tracks **only anonymous usage data** to improve the product:

* Start Chat clicks
* Successful matches
* Drop-off events
* Session behavior

🚫 No messages
🚫 No video/audio data
🚫 No personal identifiers

---

## 📱 Mobile Experience

* Dynamic viewport (`100dvh`)
* iOS safe-area handling
* Fixed video layout
* Scroll-safe chat section
* Keyboard-friendly input

---

## 🧠 What This Project Demonstrates

* Real-time application architecture
* WebRTC peer connection handling
* Socket-based matchmaking
* Frontend state management
* Responsive UI design
* Debugging production-level UI issues
* Privacy-aware analytics integration

---

## 🔮 Future Improvements

* Dark mode
* Report / block system
* Language / region filters
* Moderation tools
* TURN server support
* Custom domain branding

---

## 👨‍💻 Author

**Yatish Yadav**
Built with ❤️ as a learning & portfolio project.

---

## 📄 License

This project is intended for **educational and demonstration purposes**.
Feel free to explore, learn, and build upon it.

