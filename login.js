import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword, // Dùng hàm này để đăng nhập
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// 1. Cấu hình Firebase (Giữ nguyên như bên Register)
const firebaseConfig = {
  apiKey: "AIzaSyAlY1PW-xs_QhTqjtMwRrVqOXoFSA3LHaQ",
  authDomain: "manhle-project-2026.firebaseapp.com",
  projectId: "manhle-project-2026",
  storageBucket: "manhle-project-2026.firebasestorage.app",
  messagingSenderId: "785813167950",
  appId: "1:785813167950:web:97142ecea716f42ff0481f",
  measurementId: "G-R89YDYQJVB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 2. Lấy các thành phần từ HTML Login
const loginForm = document.getElementById("loginForm");
const btnGoogleLogin = document.getElementById("btnGoogleLogin");

// 3. XỬ LÝ ĐĂNG NHẬP EMAIL/PASS
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Gọi hàm đăng nhập của Firebase
    await signInWithEmailAndPassword(auth, email, password);

    alert("Đăng nhập thành công!");
    window.location.href = "index.html"; // Chuyển về trang chủ
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.code);
    // Xử lý một số lỗi phổ biến
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password"
    ) {
      alert("Email hoặc mật khẩu không chính xác!");
    } else if (error.code === "auth/user-not-found") {
      alert("Tài khoản không tồn tại!");
    } else {
      alert("Đã có lỗi xảy ra. Hãy thử lại!");
    }
  }
});

// 4. XỬ LÝ ĐĂNG NHẬP GOOGLE
btnGoogleLogin?.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      console.log("Đăng nhập Google thành công:", result.user.displayName);
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error("Lỗi Google Auth:", error.message);
    alert("Không thể đăng nhập bằng Google!");
  }
});
