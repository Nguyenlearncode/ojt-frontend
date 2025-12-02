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

// @ts-ignore: CSS module declarations are not present in this project
import "swiper/css";
// @ts-ignore: CSS module declarations are not present in this project
import "swiper/css/navigation";
// @ts-ignore: CSS module declarations are not present in this project
import "swiper/css/pagination";
import Header from "../components/HomePage/Header";
import Footer from "../components/HomePage/Footer";
import ServiceSection from "./Services/ServiceSection";



import { useLocation } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();

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
    y: window.innerHeight - 140
  });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDragging(true);
    setDragged(false); // bắt đầu kéo -> chưa biết có kéo thật không
    setOffset({
      x: e.clientX - buttonPos.x,
      y: e.clientY - buttonPos.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;

    setDragged(true); // di chuyển -> xác nhận là kéo thật

    requestAnimationFrame(() => {
      setButtonPos({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="font-sans bg-white text-gray-900">

      {/* ================= HEADER ================= */}
      <Header scrolled={scrolled} />

      {/* ================= HERO (SWIPER) ================= */}
      <section id="home" className="h-screen w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
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
            }
          ].map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full bg-cover bg-center flex items-center justify-center relative select-text"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="relative z-10 text-4xl md:text-6xl text-white font-bold drop-shadow-2xl text-center max-w-3xl select-text"
                >
                  {slide.text}
                </motion.h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= Giới thiệu ================= */}
      <section
        id="introduction"
        className="
    pt-36 pb-40 relative overflow-hidden
    bg-[#f7f9fb]      /* SÁNG + sạch kiểu Apple */
    text-slate-800
  "
      >
        {/* KEYFRAMES */}
        <style>{`
    @keyframes auroraLight {
      0% { background-position: 0% 50%; opacity: .35; }
      50% { background-position: 100% 50%; opacity: .6; }
      100% { background-position: 0% 50%; opacity: .35; }
    }

    @keyframes lightSweep {
      0%   { transform: translateX(-140%) skewX(-15deg); opacity: 0; }
      50%  { opacity: .35; }
      100% { transform: translateX(180%) skewX(-15deg); opacity: 0; }
    }

    @keyframes particleFloat {
      0% { transform: translateY(0) translateX(0); opacity: .25; }
      50% { transform: translateY(-25px) translateX(12px); opacity: .7; }
      100% { transform: translateY(0) translateX(0); opacity: .25; }
    }

    @keyframes softFloat {
      0% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
      100% { transform: translateY(0); }
    }
  `}</style>

        {/* ===== BACKGROUND LAYERS (Bright, Premium) ===== */}
        <div className="absolute inset-0 pointer-events-none">

          {/* PREMIUM APPLE-LIKE AURORA */}
          <div
            className="
        absolute inset-0
        bg-gradient-to-r
        from-[#d3efff]/80 via-[#e7f3ff]/70 to-[#f0f5ff]/80
        blur-[90px]
        bg-[length:260%_260%]
      "
            style={{ animation: "auroraLight 11s ease-in-out infinite" }}
          ></div>

          {/* CYAN REFLECTION (premium glow) */}
          <div className="
      absolute -top-24 left-1/2 -translate-x-1/2
      w-[550px] h-[320px]
      bg-gradient-to-b from-cyan-200/60 to-transparent
      blur-[110px]
      opacity-60
    "></div>

          {/* SUBTLE GRID – Modern Medical */}
          <div className="
      absolute inset-0 opacity-[0.07]
      bg-[linear-gradient(90deg,#cbd5e1_1px,transparent_1px),
          linear-gradient(#cbd5e1_1px,transparent_1px)]
      bg-[size:80px_80px]
    "></div>

          {/* FLOATING PARTICLES (very subtle, premium) */}
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-400/20 blur-[2px]"
              style={{
                width: `${4 + Math.random() * 6}px`,
                height: `${4 + Math.random() * 6}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `particleFloat ${6 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative">

          {/* ============ TITLE AREA ============ */}
          <div className="text-center mb-24 select-none relative">

            {/* Light sweep */}
            <div
              className="
      absolute inset-x-0 top-1/2 h-[150px]
      bg-gradient-to-r from-transparent via-white/50 to-transparent
      opacity-0
    "
              style={{ animation: "lightSweep 7s infinite linear" }}
            ></div>

            {/* KEYFRAMES FOR HOVER GRADIENT SHIFT */}
            <style>{`
    @keyframes titleGradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}</style>

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="
      text-[28px] md:text-[34px] lg:text-[34px]
      font-extrabold leading-tight tracking-tight
      bg-gradient-to-r from-sky-700 via-cyan-700 to-indigo-800
      bg-[length:200%_200%]
      bg-clip-text text-transparent
      transition-all duration-700
      drop-shadow-[0_4px_22px_rgba(56,189,248,0.25)]
      hover:bg-gradient-to-r hover:from-green-500 hover:via-pink-500 hover:to-purple-600
      hover:bg-[length:250%_250%]
    "
              style={{
                animation: "titleGradientMove 7s ease-in-out infinite",
              }}
            >
              Chào mừng đến với Trung Tâm Xét Nghiệm Máu OJT
            </motion.h2>

            {/* Subtitle */}
            <motion.h3
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-6 text-3xl font-semibold text-slate-600"
            >
              Chuyên sâu trong lĩnh vực xét nghiệm máu
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              viewport={{ once: true }}
              className="
      max-w-3xl mx-auto mt-6 text-lg leading-relaxed
      text-slate-500
    "
            >
              Chúng tôi cung cấp dịch vụ xét nghiệm máu hiện đại, nhanh chóng và chính xác
              với hệ thống máy móc tiên tiến, đảm bảo kết quả tin cậy và phục vụ tận tâm.
            </motion.p>

            {/* Underline */}
            <div className="mt-10 flex justify-center">
              <div
                className="
        w-48 h-[3px] rounded-full
        bg-gradient-to-r from-cyan-500 to-indigo-500
        shadow-[0_0_15px_rgba(56,189,248,0.45)]
      "
              ></div>
            </div>
          </div>


          {/* ============ FEATURE CARDS ============ */}
          <div className="grid md:grid-cols-3 gap-12 mt-14">

            {[
              {
                title: "Chuyên Sâu Về Xét Nghiệm Máu",
                desc: "Thực hiện đầy đủ xét nghiệm máu từ cơ bản đến nâng cao như CBC, sinh hóa, đường huyết, lipid máu và nhiều chỉ số quan trọng khác.",
                icon: Squares2X2Icon,
              },
              {
                title: "An Toàn – Chính Xác – Tối Ưu",
                desc: "Quy trình chuẩn hóa, máy móc tự động và kiểm tra chéo đảm bảo kết quả có độ tin cậy cao nhất.",
                icon: ShieldCheckIcon,
              },
              {
                title: "Quy Trình Lấy Mẫu Chuẩn Quốc Tế",
                desc: "Tuân thủ tiêu chuẩn ISO 15189 với kiểm soát chất lượng nghiêm ngặt ở mọi bước.",
                icon: ClipboardDocumentCheckIcon,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .7, delay: i * 0.12 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  y: -6,
                  boxShadow: "0 20px 60px rgba(56,189,248,0.25)",
                }}
                className="
            relative overflow-hidden
            bg-white/85 backdrop-blur-2xl
            border border-slate-200
            rounded-2xl p-10
            shadow-[0_8px_30px_rgba(0,0,0,0.05)]
            transition-all duration-300
          "
                style={{ animation: "softFloat 7s ease-in-out infinite" }}
              >
                {/* Accent top line */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-500 to-blue-500 opacity-70" />

                {/* ICON */}
                <div className="w-16 h-16 flex items-center justify-center bg-white border border-slate-200 rounded-xl mb-6 shadow-sm">
                  <item.icon className="h-8 w-8 text-sky-700" />
                </div>

                <h3 className="text-xl font-bold text-slate-700">{item.title}</h3>
                <p className="mt-3 text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== DỊCH VỤ =================== */}
      <ServiceSection />

      {/* ================= ĐỘI NGŨ BÁC SĨ ================= */}
      <section
        id="team"
        className="
          py-32 relative overflow-hidden
          bg-[#eaf2ff] text-slate-800
        "
      >
        {/* Background gradient + particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top_left,rgba(0,120,255,0.25),transparent_70%)]
            opacity-40
          "></div>

          <div className="
      absolute inset-0
      bg-[linear-gradient(90deg,#6fb7ff30_1px,transparent_1px),
          linear-gradient(#6fb7ff30_1px,transparent_1px)]
      bg-[size:90px_90px]
      opacity-10
    "></div>

          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-cyan-400/40 rounded-full blur-[2px]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float${i} ${4 + Math.random() * 6}s ease-in-out infinite`,
              }}
            ></div>
          ))}

          <style>{`
      ${[...Array(20)]
              .map(
                (_, i) => `
        @keyframes float${i} {
          0% { transform: translateY(0) translateX(0); opacity: .4; }
          50% { transform: translateY(-18px) translateX(14px); opacity: .9; }
          100% { transform: translateY(0) translateX(0); opacity: .4; }
        }
      `
              )
              .join("")}
    `}</style>
        </div>

        <div className="container mx-auto px-6 relative">

          {/* TITLE */}
          <style>{`
      @keyframes teamTitleMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}</style>

          <h2
            className="
        text-[28px] md:text-[34px] lg:text-[34px]
        font-extrabold text-center tracking-tight
        bg-gradient-to-r from-sky-700 via-cyan-700 to-indigo-800
        bg-clip-text text-transparent
        bg-[length:200%_200%]
        drop-shadow-[0_4px_22px_rgba(56,189,248,0.25)]
        transition-all duration-700
      "
            style={{ animation: "teamTitleMove 7s ease-in-out infinite" }}
          >
            Đội Ngũ Y Bác Sĩ
          </h2>

          <p className="text-center text-slate-600 mt-3 text-lg tracking-wide">
            Chuyên gia hàng đầu – Kinh nghiệm chuyên sâu – Tận tâm vì sức khỏe của bạn
          </p>

          <div
            className="
        w-50 h-[3px] bg-gradient-to-r from-cyan-500 to-blue-600
        mx-auto mt-6 rounded-full
        shadow-[0_0_18px_rgba(0,150,255,0.45)]
      "
          ></div>

          {/* GRID */}
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
              gap-14 mt-20
            "
          >
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
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{
                  scale: 1.07,
                  y: -12,
                }}
                className="
                  relative group
                  bg-white/60 backdrop-blur-2xl
                  rounded-2xl overflow-hidden
                  border border-slate-300
                  shadow-[0_10px_35px_rgba(0,0,0,0.08)]
                  hover:shadow-[0_18px_55px_rgba(0,150,255,0.22)]
                  transition-all duration-500
                "
              >
                {/* TOP LIGHT LINE */}
                <div
                  className="
                    absolute inset-x-0 top-0 h-[3px]
                    bg-gradient-to-r from-cyan-400 to-blue-500
                    opacity-70
                  "
                ></div>

                {/* IMAGE */}
                <div className="relative w-full h-[300px] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-20"
                  ></div>

                  <img
                    src={doc.img}
                    className="
                      w-full h-full object-cover
                      transition-all duration-500
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* INFO */}
                <div className="p-6 text-center">
                  <h3 className="text-l font-bold text-slate-900">
                    {doc.name}
                  </h3>

                  <p className="text-cyan-700 mt-1 font-medium tracking-wide">
                    {doc.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CƠ SỞ VẬT CHẤT ================= */}
      <section
        id="equipment"
        className="
          py-32 relative overflow-hidden
          bg-[#f4f7fb] text-slate-800
        "
      >
        <div className="container mx-auto px-6 relative">

          {/* TITLE */}
          <h2
            className="
              text-[28px] md:text-[34px] lg:text-[34px]
              font-extrabold text-center tracking-tight
              bg-gradient-to-r from-sky-700 via-cyan-700 to-indigo-800
              bg-clip-text text-transparent
              bg-[length:200%_200%]
              drop-shadow-[0_4px_22px_rgba(56,189,248,0.25)]
            "
            style={{
              animation: "equipTitleMove 7s ease-in-out infinite",
            }}
          >
            Cơ Sở Vật Chất Hiện Đại
          </h2>

          <p className="text-center text-slate-600 mt-3 text-lg tracking-wide">
            Trang thiết bị công nghệ cao – tự động hóa – chuẩn quốc tế ISO 15189
          </p>

          <div className="
            w-48 h-[3px] bg-gradient-to-r from-cyan-500 to-blue-600
            mx-auto mt-6 rounded-full
            shadow-[0_0_15px_rgba(0,150,255,0.45)]
          "></div>

          {/* LIST THIẾT BỊ */}
          <div className="grid md:grid-cols-3 gap-12 mt-20">

            {[
              {
                name: "Máy Miễn Dịch Tự Động",
                img: "/image/machine1.jpg",
                desc: "Công nghệ phát quang hóa học CLIA tiên tiến – độ nhạy cực cao trong đo hormon và marker ung thư.",
              },
              {
                name: "Máy Phân Tích Sinh Hóa",
                img: "/image/machine3.jpg",
                desc: "Hệ thống đo sinh hóa tự động, xử lý nhanh mẫu bệnh phẩm với độ chính xác cao.",
              },
              {
                name: "Máy Huyết Học 5 Thành Phần",
                img: "/image/machine2.jpg",
                desc: "Công nghệ laser đa kênh – phân tích 5 loại bạch cầu, hỗ trợ chẩn đoán chuyên sâu.",
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
            overflow-hidden flex flex-col transition-all duration-500
            hover:shadow-[0_14px_50px_rgba(0,150,255,0.25)]
          "
              >
                {/* IMAGE */}
                <div className="relative w-full h-[370px] overflow-hidden">
                  <img
                    src={item.img}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                </div>

                {/* INFO */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-sky-700">{item.name}</h3>
                  <p className="text-slate-600 mt-2 flex-grow">{item.desc}</p>

                  {/* BUTTON */}
                  <button
                    onClick={() => setOpenEquipment(item)}
                    className="
                mt-6 px-4 py-2 rounded-lg text-sm font-semibold
                text-cyan-700 border border-cyan-400
                hover:bg-cyan-500 hover:text-white
                transition-all duration-300
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

      {/* ================= POPUP THIẾT BỊ ================= */}
      {openEquipment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">

          <div className="
      bg-white rounded-2xl w-[90%] md:w-[80%] 
      h-[85vh] max-h-[800px]
      shadow-2xl overflow-hidden relative
      animate-zoom
      grid grid-cols-1 md:grid-cols-2
    ">

            {/* NÚT ĐÓNG */}
            <button
              onClick={() => setOpenEquipment(null)}
              className="
          absolute top-4 right-4 
          w-10 h-10 flex items-center justify-center
          bg-white/80 backdrop-blur-md
          rounded-full shadow-md
          text-gray-600 hover:text-red-500
          text-2xl font-bold transition
        "
            >
              ✕
            </button>

            {/* LEFT — IMAGE FULL HEIGHT */}
            <div className="h-full w-full">
              <img
                src={openEquipment.img}
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT — CONTENT */}
            <div className="p-8 overflow-y-auto">

              <h2 className="text-3xl font-extrabold text-sky-700">
                {openEquipment.name}
              </h2>

              <p className="text-slate-600 mt-4 text-lg leading-relaxed">
                {openEquipment.desc}
              </p>

              {/* NỘI DUNG CHI TIẾT THÊM */}
              <div className="mt-6 space-y-4 text-slate-700 text-[15px]">

                <p>
                  <strong className="text-sky-700">Công nghệ:{" "}</strong>
                  Máy sử dụng hệ thống phân tích tự động với độ chính xác cao, kiểm soát chất lượng theo chuẩn quốc tế ISO 15189.
                </p>

                <p>
                  <strong className="text-sky-700">Ứng dụng trong xét nghiệm:{" "}</strong>
                  Hỗ trợ phân tích mẫu nhanh chóng, cho phép thực hiện nhiều xét nghiệm cùng lúc với sai số cực thấp.
                </p>

                <p>
                  <strong className="text-sky-700">Hiệu suất hoạt động:{" "}</strong>
                  Khả năng xử lý mẫu liên tục, thiết kế tối ưu giảm thời gian chờ và tăng tốc độ trả kết quả.
                </p>

                <p>
                  <strong className="text-sky-700">An toàn & Độ bền:{" "}</strong>
                  Bảo vệ người vận hành, chống nhiễm chéo và hệ thống cảnh báo sớm khi có sai số.
                </p>

              </div>

            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes equipTitleMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>


      {/* NÚT CUỘN LÊN ĐẦU TRANG (NHỎ + VUÔNG + BO GÓC 3PX) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="
          fixed bottom-6 right-6 z-[999]
          w-10 h-10
          flex items-center justify-center
          bg-gradient-to-br from-cyan-400 to-blue-600
          text-black text-lg font-bold
          shadow-[0_0_12px_rgba(0,200,255,0.5)]
          hover:shadow-[0_0_20px_rgba(0,200,255,0.8)]
          transition-all
          rounded-[5px]
        "
        >
          ↑
        </button>
      )}

      {/* ====================== NÚT TƯ VẤN NỔI =============================== */}
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
          transition: dragging ? "none" : "transform 0.15s ease-out",
        }}
        className="
    p-3 rounded-full
    bg-gradient-to-r from-cyan-500 to-blue-600
    shadow-xl hover:shadow-2xl
    text-white
  "
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />
      </button>

      {/* =========================== POPUP TƯ VẤN =========================== */}

      {openConsult && (
        <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm flex items-center justify-center animate-fade">

          <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-xl animate-zoom relative">

            {/* Nút đóng */}
            <button
              onClick={() => setOpenConsult(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            {/* Tiêu đề */}
            <h2 className="text-xl font-bold text-center text-sky-700">Đăng ký tư vấn</h2>
            <p className="text-gray-500 text-center text-sm mt-1 mb-2">
              Điền thông tin của bạn để được hỗ trợ sớm nhất
            </p>

            {/* FORM */}
            <form className="space-y-4">

              {/* Họ tên */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Họ và tên</label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm outline-none focus:border-cyan-500"
                />
              </div>

              {/* SĐT */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
                <input
                  type="text"
                  placeholder="0123 456 789"
                  className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm outline-none focus:border-cyan-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm outline-none focus:border-cyan-500"
                />
              </div>

              {/* 2 cột: Giới tính + Ngày sinh */}
              <div className="grid grid-cols-2 gap-4">

                {/* Giới tính */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Giới tính</label>
                  <select
                    className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm outline-none focus:border-cyan-500"
                  >
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>

                {/* Ngày sinh */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Ngày sinh</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm outline-none focus:border-cyan-500"
                  />
                </div>

              </div>

              {/* Nút gửi */}
              <button
                className="
            w-full py-2.5 mt-4 text-sm font-semibold
            bg-gradient-to-r from-cyan-500 to-blue-600
            text-white rounded-xl
            shadow-[0_0_12px_rgba(0,180,255,0.5)]
            hover:shadow-[0_0_20px_rgba(0,180,255,0.7)]
            transition-all
          "
              >
                Gửi thông tin →
              </button>

            </form>

          </div>
        </div>
      )}

      {/* Tailwind Animations */}
      <style>
        {`
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
        `}
      </style>

      {/* =================FOOTER ================= */}
      <Footer />
    </div>
  );
}
