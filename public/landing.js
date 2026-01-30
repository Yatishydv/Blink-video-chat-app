// console.log("✅ landing.js loaded");

// document.addEventListener("DOMContentLoaded", () => {
//   const startBtn = document.getElementById("startBtn");
//   const modal = document.getElementById("privacyModal");
//   const acceptBtn = document.getElementById("acceptPrivacy");

//   console.log("startBtn:", startBtn);
//   console.log("modal:", modal);
//   console.log("acceptBtn:", acceptBtn);

//   if (!startBtn || !modal || !acceptBtn) {
//     console.error("❌ Required landing elements missing");
//     return;
//   }

//   startBtn.addEventListener("click", () => {
//     console.log("👉 Start chatting clicked");
//     modal.classList.remove("hidden");
//   });

//   acceptBtn.addEventListener("click", () => {
//     console.log("✅ Privacy accepted");
//     localStorage.setItem("blinkPrivacyAccepted", "true");
//     window.location.href = "/app";
//   });
// });


document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const modal = document.getElementById("privacyModal");
  const acceptBtn = document.getElementById("acceptPrivacy");

  // Start chatting
  startBtn.addEventListener("click", () => {
    gtag("event", "start_chat_clicked", {
      event_category: "engagement",
      event_label: "landing"
    });

    modal.classList.remove("hidden");
  });

  // Accept privacy (KEEP WORKING)
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("blinkPrivacyAccepted", "true");
    window.location.href = "/app";
  });

  // ✅ CLOSE MODAL WHEN CLICKING OUTSIDE (SAFE)
  modal.addEventListener("click", (e) => {
    // Only close if clicking the backdrop, NOT the modal box
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // COOKIE CONSENT — USER ACTION ONLY (KEEP WORKING)
  const cookieNotice = document.getElementById("cookieNotice");
  const acceptCookies = document.getElementById("acceptCookies");

  acceptCookies.addEventListener("click", () => {
    localStorage.setItem("blinkCookiesAccepted", "true");
    cookieNotice.remove();
  });
});
