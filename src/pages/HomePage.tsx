// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import {
  ShieldCheckIcon,
  Squares2X2Icon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";

import Header from "../components/HomePage/Header";
import Footer from "../components/HomePage/Footer";
import ServiceSection from "./Services/ServiceSection";

import { useLocation } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [openEquipment, setOpenEquipment] = useState<null | {
    name: string;
    img: string;
    desc: string;
  }>(null);

  const [openConsult, setOpenConsult] = useState(false);
  const [dragged, setDragged] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [buttonPos, setButtonPos] = useState({
    x: window.innerWidth - 90,
    y: window.innerHeight - 140,
  });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // ================= SCROLL =================
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scroll");

    if (scrollTo) {
      setTimeout(() => {
        const section = document.getElementById(scrollTo);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    }
  }, [location]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ================= DRAG BUTTON =================
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDragging(true);
    setDragged(false);
    setOffset({
      x: e.clientX - buttonPos.x,
      y: e.clientY - buttonPos.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;

    setDragged(true);

    requestAnimationFrame(() => {
      setButtonPos({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  return (
    <div className="font-sans bg-white text-gray-900">

      {/* HEADER */}
      <Header scrolled={scrolled} />

      {/* HERO */}
      <section id="home" className="h-screen w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={1000}
          loop
          allowTouchMove={false}
          className="h-full"
        >
          {[
            {
              img: "https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg",
              text: "Xét nghiệm máu độ chính xác cao dành cho mọi người",
            },
            {
              img: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg",
              text: "Phân tích y khoa tiên tiến ứng dụng AI",
            },
            {
              img: "https://images.pexels.com/photos/3735702/pexels-photo-3735702.jpeg",
              text: "Công nghệ phòng thí nghiệm hiện đại cho chẩn đoán chính xác",
            },
            {
              img: "https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg",
              text: "Thiết bị nghiên cứu cao cấp dành cho đổi mới y học",
            },
            {
              img: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg",
              text: "Hệ thống phân tích tiên tiến cho xét nghiệm lâm sàng",
            },
          ].map((slide, i) => (
            <SwiperSlide key={i}>
              <div
                className="h-full bg-cover bg-center flex items-center justify-center relative select-text"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                <div className="absolute inset-0 bg-black/40"></div>

                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="relative z-10 text-4xl md:text-6xl text-white font-bold text-center max-w-3xl"
                >
                  {slide.text}
                </motion.h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* INTRO */}
      <section id="introduction" className="pt-36 pb-40 relative overflow-hidden bg-[#f7f9fb] text-slate-800">

        {/* BACKGROUND ANIMATION */}
        <style>{`
          @keyframes auroraLight {
            0% { background-position: 0% 50%; opacity: .35; }
            50% { background-position: 100% 50%; opacity: .6; }
            100% { background-position: 0% 50%; opacity: .35; }
          }
          @keyframes softFloat {
            0% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0); }
          }
        `}</style>

        <div className="absolute inset-0 pointer-events-none">
          <div
            className="
              absolute inset-0 bg-gradient-to-r
              from-[#d3efff]/80 via-[#e7f3ff]/70 to-[#f0f5ff]/80
              blur-[90px]
              bg-[length:260%_260%]
            "
            style={{ animation: "auroraLight 11s ease-in-out infinite" }}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative">

          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="
              text-[34px] font-extrabold text-center
              bg-gradient-to-r from-sky-700 via-cyan-700 to-indigo-800
              bg-clip-text text-transparent
            "
          >
            Chào mừng đến với Trung Tâm Xét Nghiệm Máu OJT
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-6 text-3xl font-semibold text-slate-600 text-center"
          >
            Chuyên sâu trong lĩnh vực xét nghiệm máu
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-6 text-lg text-slate-500 text-center"
          >
            Chúng tôi cung cấp dịch vụ xét nghiệm máu hiện đại, nhanh chóng và chính xác.
          </motion.p>

          {/* FEATURES */}
          <div className="grid md:grid-cols-3 gap-12 mt-20">
            {[
              {
                title: "Chuyên Sâu Về Xét Nghiệm Máu",
                desc: "Đầy đủ xét nghiệm từ cơ bản đến nâng cao.",
                icon: Squares2X2Icon,
              },
              {
                title: "An Toàn – Chính Xác – Tối Ưu",
                desc: "Quy trình chuẩn hóa – máy móc tự động.",
                icon: ShieldCheckIcon,
              },
              {
                title: "Quy Trình Lấy Mẫu Chuẩn Quốc Tế",
                desc: "Tuân thủ tiêu chuẩn ISO 15189.",
                icon: ClipboardDocumentCheckIcon,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="
                  relative overflow-hidden bg-white/85 backdrop-blur-2xl
                  border border-slate-200 rounded-2xl p-10
                  shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                "
                style={{ animation: "softFloat 7s ease-in-out infinite" }}
              >
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-500 to-blue-500 opacity-70" />

                <div className="w-16 h-16 flex items-center justify-center bg-white border border-slate-200 rounded-xl mb-6 shadow-sm">
                  <item.icon className="h-8 w-8 text-sky-700" />
                </div>

                <h3 className="text-xl font-bold text-slate-700">{item.title}</h3>
                <p className="mt-3 text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE SECTION */}
      <ServiceSection />

      {/* DOCTOR TEAM */}
      <section id="team" className="py-32 bg-[#eaf2ff] relative">
        <div className="container mx-auto px-6 relative">
          <h2
            className="
              text-[34px] font-extrabold text-center
              bg-gradient-to-r from-sky-700 via-cyan-700 to-indigo-800
              bg-clip-text text-transparent
            "
          >
            Đội Ngũ Y Bác Sĩ
          </h2>

          <p className="text-center text-slate-600 mt-3 text-lg">
            Chuyên gia hàng đầu – Kinh nghiệm chuyên sâu – Tận tâm
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 mt-20">
            {[
              { name: "BS. Nguyễn Minh Khoa", role: "Huyết Học – Truyền Máu", img: "/image/d1.jpg" },
              { name: "BS. Trần Hải Yến", role: "Sinh Hóa – Miễn Dịch", img: "/image/d2.jpg" },
              { name: "BS. Phạm Đức Long", role: "Ung Bướu – Miễn Dịch", img: "/image/d3.jpg" },
              { name: "BS. Lưu Thanh Hà", role: "Tim Mạch – Huyết Áp", img: "/image/d4.jpg" },
            ].map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="
                  bg-white/60 backdrop-blur-2xl rounded-2xl overflow-hidden
                  border border-slate-300 shadow-[0_10px_35px_rgba(0,0,0,0.08)]
                "
              >
                <div className="relative w-full h-[300px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-20"></div>
                  <img src={doc.img} className="w-full h-full object-cover" />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-l font-bold text-slate-900">{doc.name}</h3>
                  <p className="text-cyan-700 mt-1 font-medium tracking-wide">
                    {doc.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section id="equipment" className="py-32 bg-[#f4f7fb] relative">
        <div className="container mx-auto px-6 relative">

          <h2
            className="
              text-[34px] font-extrabold text-center
              bg-gradient-to-r from-sky-700 via-cyan-700 to-indigo-800
              bg-clip-text text-transparent
            "
          >
            Cơ Sở Vật Chất Hiện Đại
          </h2>

          <p className="text-center text-slate-600 mt-3 text-lg">
            Trang thiết bị công nghệ cao – Tự động hóa – Chuẩn ISO 15189
          </p>

          <div className="grid md:grid-cols-3 gap-12 mt-20">
            {[
              {
                name: "Máy Miễn Dịch Tự Động",
                img: "/image/machine1.jpg",
                desc: "Công nghệ CLIA tiên tiến.",
              },
              {
                name: "Máy Phân Tích Sinh Hóa",
                img: "/image/machine3.jpg",
                desc: "Hệ thống đo sinh hóa tự động.",
              },
              {
                name: "Máy Huyết Học 5 Thành Phần",
                img: "/image/machine2.jpg",
                desc: "Công nghệ laser phân tích 5 loại bạch cầu.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="
                  bg-white/70 backdrop-blur-xl
                  rounded-2xl border border-slate-200
                  shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                  overflow-hidden flex flex-col
                "
              >
                <div className="relative w-full h-[370px] overflow-hidden">
                  <img src={item.img} className="w-full h-full object-cover" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-sky-700">{item.name}</h3>
                  <p className="text-slate-600 mt-2 flex-grow">{item.desc}</p>

                  <button
                    onClick={() => setOpenEquipment(item)}
                    className="
                      mt-6 px-4 py-2 rounded-lg text-sm font-semibold
                      text-cyan-700 border border-cyan-400
                    "
                  >
                    Đọc thêm →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POPUP EQUIPMENT */}
      {openEquipment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">

          <div className="
            bg-white rounded-2xl w-[90%] md:w-[80%]
            h-[85vh] max-h-[800px]
            shadow-2xl overflow-hidden relative
            grid grid-cols-1 md:grid-cols-2 animate-zoom
          ">

            <button
              onClick={() => setOpenEquipment(null)}
              className="
                absolute top-4 right-4 w-10 h-10 flex items-center justify-center
                bg-white/80 rounded-full text-gray-600 text-2xl
              "
            >
              ✕
            </button>

            <div className="h-full w-full">
              <img src={openEquipment.img} className="w-full h-full object-cover" />
            </div>

            <div className="p-8 overflow-y-auto">
              <h2 className="text-3xl font-extrabold text-sky-700">
                {openEquipment.name}
              </h2>

              <p className="text-slate-600 mt-4 text-lg">{openEquipment.desc}</p>

              <div className="mt-6 space-y-4 text-slate-700 text-[15px]">
                <p>
                  <strong className="text-sky-700">Công nghệ: </strong>
                  Hệ thống phân tích tự động chuẩn ISO 15189.
                </p>

                <p>
                  <strong className="text-sky-700">Ứng dụng: </strong>
                  Phân tích mẫu nhanh, sai số thấp.
                </p>

                <p>
                  <strong className="text-sky-700">Hiệu suất: </strong>
                  Xử lý mẫu liên tục – tăng tốc độ trả kết quả.
                </p>

                <p>
                  <strong className="text-sky-700">An toàn: </strong>
                  Chống nhiễm chéo – cảnh báo sai số.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCROLL TO TOP */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-6 right-6 z-[999]
            w-10 h-10 flex items-center justify-center
            bg-gradient-to-br from-cyan-400 to-blue-600
            text-black text-lg font-bold rounded-[5px]
          "
        >
          ↑
        </button>
      )}

      {/* FLOAT CONSULT BUTTON */}
      <button
        onMouseDown={handleMouseDown}
        onClick={() => {
          if (!dragged) setOpenConsult(true);
        }}
        style={{
          position: "fixed",
          left: buttonPos.x,
          top: buttonPos.y,
          zIndex: 999,
          cursor: "grab",
        }}
        className="
          p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600
          shadow-xl text-white
        "
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
      </button>

      {/* POPUP CONSULT */}
      {openConsult && (
        <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm flex items-center justify-center animate-fade">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-xl animate-zoom relative">

            <button
              onClick={() => setOpenConsult(false)}
              className="absolute top-2 right-3 text-gray-400 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-center text-sky-700">
              Đăng ký tư vấn
            </h2>

            <p className="text-gray-500 text-center text-sm mt-1 mb-2">
              Điền thông tin để được hỗ trợ sớm nhất
            </p>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Họ và tên</label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
                <input
                  type="text"
                  placeholder="0123 456 789"
                  className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Giới tính</label>
                  <select className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm">
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Ngày sinh</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <button
                className="
                  w-full py-2.5 mt-4 text-sm font-semibold
                  bg-gradient-to-r from-cyan-500 to-blue-600
                  text-white rounded-xl
                "
              >
                Gửi thông tin →
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .animate-fade { animation: fadeIn .25s ease-out; }
        .animate-zoom { animation: zoomIn .25s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
