console.log("✅ landing.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const modal = document.getElementById("privacyModal");
  const acceptBtn = document.getElementById("acceptPrivacy");

  console.log("startBtn:", startBtn);
  console.log("modal:", modal);
  console.log("acceptBtn:", acceptBtn);

  if (!startBtn || !modal || !acceptBtn) {
    console.error("❌ Required landing elements missing");
    return;
  }

  startBtn.addEventListener("click", () => {
    console.log("👉 Start chatting clicked");
    modal.classList.remove("hidden");
  });

  acceptBtn.addEventListener("click", () => {
    console.log("✅ Privacy accepted");
    localStorage.setItem("blinkPrivacyAccepted", "true");
    window.location.href = "/app";
  });
});
