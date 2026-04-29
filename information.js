// 1. KHO DỮ LIỆU TỔNG HỢP (Chỉ khai báo 1 lần duy nhất)
const shapesData = {
  "hinh-hop-chu-nhat": {
    title: "Hình Hộp Chữ Nhật",
    concept: "là khối đa diện có 6 mặt đều là hình chữ nhật.",
    video: "eFbWUAw4Ae8",
    img: "../images.png",
  },
  "hinh-lap-phuong": {
    title: "Hình Lập Phương",
    concept: "là hình hộp chữ nhật có 6 mặt đều là hình vuông bằng nhau.",
    video: "Mv3u_j5Pz_o",
    img: "../hinh-lap-phuong.png",
  },
  "hinh-lang-tru-dung": {
    title: "Hình Lăng Trụ Đứng",
    concept: "có hai đáy là đa giác bằng nhau và các mặt bên là hình chữ nhật.",
    video: "ID_VIDEO_LANG_TRU",
    img: "../hinh-lang-tru.png",
  },
  "hinh-chop-tu-giac-deu": {
    title: "Hình Chóp Tứ Giác Đều",
    concept: "có đáy là hình vuông và các mặt bên là tam giác cân bằng nhau.",
    video: "ID_VIDEO_CHOP",
    img: "../hinh-chop-tgd.png",
  },
  "hinh-tru-tron": {
    title: "Hình Trụ Tròn",
    concept: "có hai đáy là hai hình tròn bằng nhau và song song với nhau.",
    video: "ID_VIDEO_TRU",
    img: "../hinh-tru.png",
  },
};

// 2. HÀM ĐỔ DỮ LIỆU VÀO GIAO DIỆN
function loadData() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("shape");
  const data = shapesData[key];

  if (data) {
    // Đổi Tiêu đề
    const titleEle = document.getElementById("shapeTitle");
    if (titleEle) titleEle.innerText = data.title;

    // Đổi Ảnh bìa (Trang 1)
    const mainImg = document.getElementById("mainShapeImg");
    if (mainImg) mainImg.src = data.img;

    // Đổi Ảnh sơ đồ (Trang 2)
    const conceptImg = document.getElementById("conceptImg");
    if (conceptImg) conceptImg.src = data.img;

    // Đổi Video (Trang 5)
    const videoFrame = document.getElementById("lessonVideo");
    if (videoFrame)
      videoFrame.src = `https://www.youtube.com/embed/${data.video}`;

    console.log("Đã tải dữ liệu cho: " + data.title);
  }
}

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function changeSlide(n) {
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove("active");
  currentSlide += n;

  // Giới hạn trang
  if (currentSlide >= slides.length) currentSlide = slides.length - 1;
  if (currentSlide < 0) currentSlide = 0;

  slides[currentSlide].classList.add("active");

  // 1. Cập nhật số trang
  const pageNum = document.getElementById("pageNumber");
  if (pageNum) pageNum.innerText = `Trang ${currentSlide + 1}/${slides.length}`;

  // 2. Thay đổi nút bên trái (Danh sách <-> Trang trước)
  const dynamicBtn = document.getElementById("dynamicBtn");
  if (currentSlide === 0) {
    dynamicBtn.innerHTML = `<a href="index.html" class="nav-btn-back"><i class="fas fa-th"></i> Danh sách</a>`;
  } else {
    dynamicBtn.innerHTML = `<button onclick="changeSlide(-1)"><i class="fas fa-chevron-left"></i> Trang trước</button>`;
  }

  // 3. Ẩn nút "Trang sau" ở trang cuối cùng
  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) {
    nextBtn.style.display =
      currentSlide === slides.length - 1 ? "none" : "block";
  }
}
// Tìm đến đoạn thay đổi nút trong hàm changeSlide
const dynamicBtn = document.getElementById("dynamicBtn");

if (dynamicBtn) { // Thêm dòng này để kiểm tra xem có tồn tại dynamicBtn không
    if (currentSlide === 0) {
        dynamicBtn.innerHTML = `<a href="index.html" class="nav-btn-back"><i class="fas fa-th"></i> Danh sách</a>`;
    } else {
        dynamicBtn.innerHTML = `<button onclick="changeSlide(-1)"><i class="fas fa-chevron-left"></i> Trang trước</button>`;
    }
}