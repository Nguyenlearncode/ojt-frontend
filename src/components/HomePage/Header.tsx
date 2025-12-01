import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ scrolled }: { scrolled: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const handleNavigate = (section: string) => {
    setOpenMenu(false); // đóng menu khi chọn item

    if (location.pathname !== "/") {
      navigate(`/?scroll=${section}`);
    } else {
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

        {/* LOGO */}
        <div className="flex items-center gap-3 select-none">
          <img src="/logo.svg" alt="Logo" className="h-16 w-auto" />
          <h1 className="text-3xl font-extrabold transition">
            <span className={`bg-clip-text text-transparent 
              ${scrolled 
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500" 
                : "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"}
            `}>
              Blood Test
            </span>

            <span className={`bg-clip-text text-transparent ml-1
              ${scrolled
                ? "bg-gradient-to-r from-fuchsia-400 via-purple-600 to-blue-500"
                : "bg-gradient-to-r from-green-400 via-lime-500 to-emerald-600"}
            `}>
              OJT Team3
            </span>
          </h1>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex space-x-8 font-semibold">

          <button
            onClick={() => handleNavigate("home")}
            className={`${scrolled ? "text-gray-700 hover:text-blue-500" : "text-white hover:text-gray-200"}`}
          >
            Trang Chủ
          </button>

          <button
            onClick={() => handleNavigate("introduction")}
            className={`${scrolled ? "text-gray-700 hover:text-blue-500" : "text-white hover:text-gray-200"}`}
          >
            Giới Thiệu
          </button>

          <button
            onClick={() => handleNavigate("service")}
            className={`${scrolled ? "text-gray-700 hover:text-blue-500" : "text-white hover:text-gray-200"}`}
          >
            Dịch Vụ
          </button>

          <a
            href="/login"
            className={`${scrolled ? "text-gray-700 hover:text-blue-500" : "text-white hover:text-gray-200"}`}
          >
            Đăng Nhập
          </a>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setOpenMenu(!openMenu)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {openMenu && (
        <div
          className={`md:hidden bg-white shadow-lg px-6 py-4 space-y-4 text-lg font-semibold 
            ${scrolled ? "text-gray-700" : "text-gray-800"}
          `}
        >
          <button onClick={() => handleNavigate("home")} className="block w-full text-left">
            Trang Chủ
          </button>

          <button onClick={() => handleNavigate("introduction")} className="block w-full text-left">
            Giới Thiệu
          </button>

          <button onClick={() => handleNavigate("service")} className="block w-full text-left">
            Dịch Vụ
          </button>

          <a href="/login" className="block">
            Đăng Nhập
          </a>
        </div>
      )}
    </header>
  );
}
