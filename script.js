import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {
  apiKey: "AIzaSyAlY1PW-xs_QhTqjtMwRrVqOXoFSA3LHaQ",
  authDomain: "manhle-project-2026.firebaseapp.com",
  projectId: "manhle-project-2026",
  storageBucket: "manhle-project-2026.firebasestorage.app",
  messagingSenderId: "785813167950",
  appId: "1:785813167950:web:97142ecea716f42ff0481f",
  measurementId: "G-R89YDYQJVB",
};

/* =========================
   KHỞI TẠO FIREBASE
========================= */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* =========================
   ĐĂNG NHẬP / ĐĂNG XUẤT
========================= */

const loggedOutView = document.getElementById("logged-out-view");
const loggedInView = document.getElementById("logged-in-view");
const userNameDisplay = document.getElementById("user-name");
const logoutBtn = document.getElementById("logout-btn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (loggedOutView) loggedOutView.style.display = "none";
    if (loggedInView) loggedInView.style.display = "flex";

    if (userNameDisplay) {
      userNameDisplay.textContent =
        "Chào, " + (user.displayName || user.email.split("@")[0]);
    }
  } else {
    if (loggedOutView) loggedOutView.style.display = "block";
    if (loggedInView) loggedInView.style.display = "none";
  }
});

logoutBtn?.addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("Bạn đã đăng xuất thành công!");
    window.location.reload();
  });
});

/* =========================
   HEADER SCROLL EFFECT
========================= */

window.addEventListener("scroll", () => {
  const header = document.querySelector(".top-nav");

  if (!header) return;

  if (window.scrollY > 50) {
    header.style.height = "60px";
    header.style.backgroundColor = "rgba(255,255,255,0.95)";
  } else {
    header.style.height = "70px";
    header.style.backgroundColor = "#ffffff";
  }
});

/* =========================
   VIDEO MODAL
========================= */

const cards = document.querySelectorAll(".card");

const modal = document.getElementById("videoModal");
const closeBtn = document.querySelector(".close-btn");

const mainVideo = document.getElementById("mainVideo");
const modalTitle = document.getElementById("modalTitle");
const modalInfo = document.getElementById("modalInfo");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.getAttribute("data-title");
    const info = card.getAttribute("data-info");
    const videoSrc = card.getAttribute("data-video");

    if (modalTitle) {
      modalTitle.innerText = title || "";
    }

    if (modalInfo) {
      modalInfo.innerText = info || "";
    }

    if (mainVideo && videoSrc) {
      mainVideo.src = videoSrc;
      mainVideo.play();
    }

    if (modal) {
      modal.style.display = "flex";
    }
  });
});

function closeModal() {
  if (modal) {
    modal.style.display = "none";
  }

  if (mainVideo) {
    mainVideo.pause();
    mainVideo.src = "";
  }
}

closeBtn?.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

/* =========================
   YOUTUBE POPUP VIDEO
========================= */

function openVideo(videoId) {
  const modal = document.getElementById("videoModal");
  const player = document.getElementById("youtubePlayer");

  if (!modal || !player) return;

  player.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";

  modal.style.display = "block";
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const player = document.getElementById("youtubePlayer");

  if (!modal || !player) return;

  player.src = "";
  modal.style.display = "none";
}

/* =========================
   VIDEO PLAY INLINE
========================= */

function playVideoInline(cardElement, videoId) {
  if (cardElement.classList.contains("playing")) return;

  cardElement.classList.add("playing");

  const container = cardElement.querySelector(".video-container");

  if (!container) return;

  container.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>

    <button
      class="close-inline-video"
      onclick="stopVideoInline(event, this)">
      ×
    </button>
  `;

  container.style.display = "block";
}

function stopVideoInline(event, btn) {
  event.stopPropagation();

  const card = btn.closest(".card");

  if (!card) return;

  const container = card.querySelector(".video-container");

  if (!container) return;

  card.classList.remove("playing");

  container.style.display = "none";
  container.innerHTML = "";
}

/* =========================
   VIDEO SECTION
========================= */

const cardItems = document.querySelectorAll(".card-item");

const videoSection = document.getElementById("video-section");

const videoTag = document.getElementById("detail-video");

const titleTag = document.getElementById("playing-title");

cardItems.forEach((card) => {
  card.addEventListener("click", () => {
    const name = card.getAttribute("data-n");
    const src = card.getAttribute("data-v");

    if (titleTag) {
      titleTag.innerText = "Đang xem: " + name;
    }

    if (videoTag) {
      videoTag.src = src;
      videoTag.play();
    }

    if (videoSection) {
      videoSection.style.display = "block";

      videoSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

/* =========================
   PLAY VIDEO INSIDE CARD
========================= */

function playVideo(element, videoId) {
  if (element.classList.contains("is-playing")) return;

  element.classList.add("is-playing");

  const target = element.querySelector(".video-target");

  if (!target) return;

  target.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${videoId}?autoplay=1"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  `;

  target.style.display = "block";
}
window.playVideo = playVideo;