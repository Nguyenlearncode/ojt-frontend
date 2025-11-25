// src/components/HomePage/Header.tsx

import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ scrolled }: { scrolled: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (section: string) => {
    if (location.pathname !== "/") {
      // Nếu đang ở trang khác → quay về HomePage và truyền section muốn cuộn đến
      navigate(`/?scroll=${section}`);
    } else {
      // Nếu ở Home rồi → cuộn luôn
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${scrolled ? "bg-white/90 backdrop-blur-md shadow" : "bg-transparent shadow-none"}
      `}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO + TEXT */}
        <div className="flex items-center gap-3 select-none">
          <img src="/logo.svg" alt="Logo" className="h-16 w-auto" />

          <h1 className="text-3xl font-extrabold transition">
            <span
              className={`bg-clip-text text-transparent transition-all duration-700 
                ${scrolled
                  ? "bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500 animate-gradient"
                  : "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-gradient"}
              `}
            >
              Blood Test
            </span>

            <span
              className={`bg-clip-text text-transparent transition-all duration-700 ml-1
                ${scrolled
                  ? "bg-gradient-to-r from-fuchsia-400 via-purple-600 to-blue-500 animate-gradient"
                  : "bg-gradient-to-r from-green-400 via-lime-500 to-emerald-600 animate-gradient"}
              `}
            >
              OJT Team3
            </span>
          </h1>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex space-x-8 font-semibold">

          {/* Trang Chủ */}
          <button
            onClick={() => handleNavigate("home")}
            className={`bg-transparent cursor-pointer transition 
              ${scrolled ? "text-gray-700 hover:text-blue-500" : "text-white hover:text-gray-200"}
            `}
          >
            Trang Chủ
          </button>

          {/* Giới Thiệu */}
          <button
            onClick={() => handleNavigate("introduction")}
            className={`bg-transparent cursor-pointer transition 
              ${scrolled ? "text-gray-700 hover:text-blue-500" : "text-white hover:text-gray-200"}
            `}
          >
            Giới Thiệu
          </button>

          {/* Dịch Vụ */}
          <button
            onClick={() => handleNavigate("service")}
            className={`bg-transparent cursor-pointer transition 
              ${scrolled ? "text-gray-700 hover:text-blue-500" : "text-white hover:text-gray-200"}
            `}
          >
            Dịch Vụ
          </button>

          {/* Đăng Nhập */}
          <a
            href="/login"
            className={`transition 
              ${scrolled ? "text-gray-700 hover:text-blue-500" : "text-white hover:text-gray-200"}
            `}
          >
            Đăng Nhập
          </a>

        </nav>
      </div>
    </header>
  );
}
