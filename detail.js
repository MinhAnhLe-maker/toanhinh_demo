// Lấy phần tử
const cards = document.querySelectorAll(".card");
const videoArea = document.getElementById("video-area");
const videoPlayer = document.getElementById("player");
const videoTitle = document.getElementById("video-title");

// Hàm phát video
function playGeometryVideo(card) {
  const title = card.getAttribute("data-title");
  const videoSrc = card.getAttribute("data-video");

  if (videoSrc && videoPlayer) {
    videoTitle.innerText = "Bài giảng: " + title;

    videoPlayer.src = videoSrc;

    videoPlayer.load();

    if (videoArea) {
      videoArea.style.display = "block";

      videoArea.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    videoPlayer.play().catch((err) => {
      console.log("Trình duyệt chặn tự động phát:", err);
    });
  }
}

// Click card
cards.forEach((card) => {
  card.addEventListener("click", () => {
    playGeometryVideo(card);
  });
});

// Đọc URL
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  const shapeFromUrl = urlParams.get("shape");

  if (shapeFromUrl && cards.length > 0) {
    const targetCard = Array.from(cards).find((c) =>
      c
        .getAttribute("data-title")
        ?.toLowerCase()
        .includes(shapeFromUrl.toLowerCase()),
    );

    if (targetCard) {
      playGeometryVideo(targetCard);
    }
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const lessonCards = document.querySelectorAll(".lesson-card");

  lessonCards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector("h3").innerText;
      // Chuyển "Hình Lập Phương" -> "hinh-lap-phuong"
      const shapeId = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/ /g, "-");

      window.location.href = `information.html?shape=${shapeId}`;
    });
  });
});
const shapeData = {
  "hinh-lap-phuong": {
    title: "Hình Lập Phương",
    video: "https://www.youtube.com/embed/ABCxyz", // Link bài giảng
    formula: "V = a³",
    realLife: ["cube-dice.png", "rubik.png"],
  },
  "hinh-hop-chu-nhat": {
    title: "Hình Hộp Chữ Nhật",
    video: "https://www.youtube.com/embed/123456",
    formula: "V = a × b × c",
    realLife: ["box.png", "fridge.png"],
  },
};

// Logic khi load trang information.html
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const shapeId = params.get("shape");

  if (shapeId && shapeData[shapeId]) {
    const data = shapeData[shapeId];
    document.getElementById("shapeTitle").innerText = data.title;
    document.getElementById("player").src = data.video;
    // Đổ thêm công thức và ảnh vào các trang tương ứng trong sơ đồ 9 trang
  }
});
