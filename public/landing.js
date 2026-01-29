console.log("Landing JS loaded");

const modal = document.getElementById("privacyModal");
const startBtn = document.getElementById("startLanding");
const acceptBtn = document.getElementById("acceptPrivacy");

// SAFETY CHECKS
if (!startBtn) {
  console.error("Start button not found");
}

if (!acceptBtn) {
  console.error("Accept privacy button not found");
}

// Open privacy modal
startBtn.addEventListener("click", () => {
  console.log("Start chatting clicked");
  modal.classList.remove("hidden");
});

// Accept privacy & redirect
acceptBtn.addEventListener("click", () => {
  console.log("Privacy accepted");
  localStorage.setItem("blinkPrivacyAccepted", "true");

  // ✅ CORRECT REDIRECT
  window.location.href = "/app";
});
