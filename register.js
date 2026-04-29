import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Cấu hình Firebase (Dùng cấu hình giống file login.js của bạn)
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

const registerForm = document.getElementById("registerForm");

// XỬ LÝ ĐĂNG KÝ EMAIL/PASS
registerForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("displayName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Mật khẩu xác nhận không khớp!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // Cập nhật tên hiển thị cho người dùng
    await updateProfile(userCredential.user, { displayName: name });

    alert("Đăng ký thành công! Chào mừng " + name);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Lỗi đăng ký:", error.code);
    if (error.code === "auth/email-already-in-use") {
      alert("Email này đã được sử dụng!");
    } else {
      alert("Đã có lỗi xảy ra. Hãy thử lại!");
    }
  }
});

// XỬ LÝ ĐĂNG KÝ GOOGLE (Giống Đăng nhập)
document
  .getElementById("btnGoogleRegister")
  ?.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error("Lỗi Google Auth:", error.message);
    }
  });
