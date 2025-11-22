import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  BeakerIcon,
  HeartIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  ClipboardDocumentCheckIcon,
  FireIcon,
  PresentationChartLineIcon,
  AdjustmentsHorizontalIcon,
  BugAntIcon,

} from "@heroicons/react/24/outline";

// @ts-ignore: CSS module declarations are not present in this project
import "swiper/css";
// @ts-ignore: CSS module declarations are not present in this project
import "swiper/css/navigation";
// @ts-ignore: CSS module declarations are not present in this project
import "swiper/css/pagination";


export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);

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
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
          ${scrolled ? "bg-white/90 backdrop-blur-md shadow" : "bg-transparent shadow-none"
          }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO + TEXT GROUP */}
          <div className="flex items-center gap-3 select-none">
            <img src="/logo.svg" alt="Logo" className="h-16 w-auto" />

            <h1 className="text-3xl font-extrabold transition">
              <span
                className={`bg-clip-text text-transparent transition-all duration-700 
        ${scrolled
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500 animate-gradient"
                    : "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-gradient"
                  }`}
              >
                Blood Test
              </span>

              <span
                className={`bg-clip-text text-transparent transition-all duration-700 ml-1
        ${scrolled
                    ? "bg-gradient-to-r from-fuchsia-400 via-purple-600 to-blue-500 animate-gradient"
                    : "bg-gradient-to-r from-green-400 via-lime-500 to-emerald-600 animate-gradient"
                  }`}
              >
                OJT Team3
              </span>
            </h1>
          </div>


          {/* NAVIGATION */}
          <nav className="hidden md:flex space-x-8 font-semibold">
            {[
              { vi: "Trang Chủ", en: "home" },
              { vi: "Giới Thiệu", en: "introduction" },
              { vi: "Dịch Vụ", en: "service" },
              { vi: "Đội ngũ", en: "team" },
              { vi: "Thiết bị", en: "equipment" },
              { vi: "Liên hệ", en: "contact" },
              { vi: "Đăng Nhập", en: "login" },
            ].map((item) => (
              <a
                key={item.en}
                href={item.en === "login" ? "/login" : `#${item.en}`}
                className={`transition ${scrolled ? "text-gray-700 hover:text-blue-500" : "text-white hover:text-gray-200"
                  }`}
              >
                {item.vi}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ================= HERO (SWIPER) ================= */}
      <section id="home" className="h-screen w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          speed={2000}
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
      <section
        id="service"
        className="
    py-28 relative overflow-hidden
    bg-gradient-to-b from-[#f7fbff] to-[#dfeafb]
    text-slate-800
  "
      >

        {/* AURORA BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="
      absolute inset-0 
      bg-[radial-gradient(circle_at_top_right,rgba(120,180,255,0.30),transparent_70%)]
    "></div>

          {/* Floating particles */}
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/30 blur-[2px]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatParticle ${6 + Math.random() * 6}s infinite linear`,
                opacity: 0.5,
              }}
            ></div>
          ))}

          <style>{`
      @keyframes floatParticle {
        0% { transform: translateY(0); opacity: .4; }
        50% { transform: translateY(-20px); opacity: .9; }
        100% { transform: translateY(0); opacity: .4; }
      }
    `}</style>
        </div>

        <div className="container mx-auto px-6 relative">

          {/* TITLE */}
          <div className="text-center mb-20">

            {/* Inline keyframes cho animation chạy màu */}
            <style>{`
    @keyframes serviceTitleGradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}</style>

            <h2
              className="
      text-[28px] md:text-[34px] lg:text-[34px]
      font-extrabold tracking-tight
      whitespace-nowrap
      bg-gradient-to-r from-sky-700 via-cyan-700 to-indigo-800
      bg-[length:200%_200%] 
      bg-clip-text text-transparent
      transition-all duration-700
      drop-shadow-[0_4px_20px_rgba(56,189,248,0.25)]

      hover:bg-gradient-to-r hover:from-green-500 hover:via-pink-500 hover:to-purple-600
      hover:bg-[length:250%_250%]
    "
              style={{
                animation: "serviceTitleGradientMove 7s ease-in-out infinite",
              }}
            >
              Danh Mục Xét Nghiệm
            </h2>

            <p className="max-w-2xl mx-auto mt-2 text-slate-600 text-lg">
              Công nghệ xét nghiệm thế hệ mới – tốc độ nhanh – độ chính xác cao – chuẩn phòng Lab quốc tế.
            </p>

            <div
              className="
      w-52 h-[3px] mx-auto mt-6
      bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full
      shadow-[0_0_10px_rgba(56,189,248,0.45)]
    "
            ></div>

          </div>



          {/* GRID SERVICE CARDS */}
          <div className="grid md:grid-cols-3 gap-10">

            {[
              {
                title: "Xét Nghiệm Máu Tổng Quát (CBC)",
                desc: "Đo lường hồng cầu, bạch cầu, tiểu cầu — phát hiện thiếu máu, nhiễm trùng, rối loạn huyết học.",
                icon: FireIcon,
              },
              {
                title: "Sinh Hóa Máu Chuyên Sâu",
                desc: "Đánh giá chức năng gan, thận, điện giải, enzyme, mỡ máu theo chuẩn quốc tế ISO 15189.",
                icon: BeakerIcon,
              },
              {
                title: "Đường Huyết & HbA1c",
                desc: "Theo dõi đường huyết và HbA1c để chẩn đoán & kiểm soát bệnh tiểu đường chính xác.",
                icon: PresentationChartLineIcon,
              },
              {
                title: "Đánh Giá Nguy Cơ Tim Mạch",
                desc: "Phân tích lipid, CRP, Homocysteine nhằm phát hiện sớm nguy cơ nhồi máu & xơ vữa.",
                icon: HeartIcon,
              },
              {
                title: "Xét Nghiệm Nội Tiết – Hormon",
                desc: "Đo hormon tuyến giáp, sinh dục, thượng thận giúp phát hiện rối loạn nội tiết.",
                icon: AdjustmentsHorizontalIcon,
              },
              {
                title: "Viêm & Nhiễm Trùng",
                desc: "Định lượng CRP, ESR, Procalcitonin — đánh giá tình trạng viêm và đáp ứng điều trị.",
                icon: BugAntIcon,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="
            p-10 rounded-2xl
            bg-white/40 backdrop-blur-xl
            border border-white/60
            shadow-[0_10px_35px_rgba(0,40,90,0.10)]
            hover:shadow-[0_15px_55px_rgba(30,120,255,0.30)]
            transition-all duration-300
            flex flex-col
          "
              >

                {/* ICON WRAPPER */}
                <div className="
            w-16 h-16 mb-6
            flex items-center justify-center
            bg-gradient-to-br from-white/80 to-white/40
            border border-slate-200
            rounded-xl shadow-sm
            backdrop-blur-xl
          ">
                  <item.icon className="h-10 w-10 text-cyan-600" />
                </div>

                {/* TEXT */}
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{item.desc}</p>

                <button className="
            mt-auto px-5 py-2 rounded-lg text-sm font-semibold
            text-cyan-700 border border-cyan-400
            hover:bg-cyan-500 hover:text-white
            transition-all duration-300
          ">
                  Đọc thêm →
                </button>

              </motion.div>
            ))}

          </div>

        </div>
      </section>



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
              { name: "BS. Nguyễn Minh Khoa", role: "Huyết Học – Truyền Máu", img: "/src/assets/image/d1.jpg" },
              { name: "BS. Trần Hải Yến", role: "Sinh Hóa – Miễn Dịch", img: "/src/assets/image/d2.jpg" },
              { name: "BS. Phạm Đức Long", role: "Ung Bướu – Miễn Dịch", img: "/src/assets/image/d3.jpg" },
              { name: "BS. Lưu Thanh Hà", role: "Tim Mạch – Huyết Áp", img: "/src/assets/image/d4.jpg" },
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
        {/* BACKGROUND LAYERS */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Aurora premium */}
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_top_left,rgba(140,200,255,0.45),transparent_70%)]
              blur-[90px] opacity-60
            "
          ></div>

          {/* Soft grid */}
          <div
            className="
              absolute inset-0
              opacity-[0.09]
              bg-[linear-gradient(90deg,#cbd5e160_1px,transparent_1px),
                  linear-gradient(#cbd5e160_1px,transparent_1px)]
              bg-[size:90px_90px]
            "
          ></div>

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/40 rounded-full blur-[2px]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatParticle${i} ${5 + Math.random() * 5}s ease-in-out infinite`,
              }}
            ></div>
          ))}

          <style>{`
          ${[...Array(20)]
              .map(
                (_, i) => `
            @keyframes floatParticle${i} {
              0% { transform: translateY(0) translateX(0); opacity:.3; }
              50% { transform: translateY(-25px) translateX(15px); opacity:.85; }
              100% { transform: translateY(0) translateX(0); opacity:.3; }
            }
            `
              )
              .join("")}
    `}</style>
        </div>

        <div className="container mx-auto px-6 relative">

          {/* TITLE */}
          <style>{`
          @keyframes equipTitleMove {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100%{ background-position: 0% 50% }
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
          "
            style={{ animation: "equipTitleMove 7s ease-in-out infinite" }}
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
          ">
          </div>

          {/* CONTENT */}
          <div className="mt-28 space-y-32">

            {/* ITEM 1 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .7 }}
                className="relative"
              >
                {/* Glow behind image */}
                <div className="
                  absolute inset-0 
                  bg-gradient-to-br from-cyan-300/40 to-blue-300/40
                  blur-2xl rounded-3xl
                ">
                </div>

                <img
                  src="/src/assets/image/machine3.jpg"
                  className="
                  relative w-full rounded-2xl
                  shadow-[0_12px_45px_rgba(0,150,255,0.25)]
                  border border-slate-200
                  object-cover transition-all duration-500
                  hover:scale-[1.03]
                "
                />
              </motion.div>

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .7 }}
                className="
                  bg-white/70 backdrop-blur-2xl
                  p-10 rounded-2xl 
                  border border-slate-200
                  shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                "
              >
                <h3 className="text-2xl font-bold text-sky-700 mb-4">
                  Máy Phân Tích Sinh Hóa Tự Động
                </h3>

                <p className="text-slate-600 leading-relaxed">
                Máy Phân Tích Sinh Hóa Tự Động thế hệ mới sở hữu khả năng vận hành hoàn toàn khép kín,
                giúp đo lường hàng chục chỉ số sinh hóa quan trọng như men gan, chức năng thận, điện giải,
                mỡ máu và enzyme chuyển hóa. Hệ thống tự động hóa toàn diện cho phép xử lý số lượng mẫu lớn
                trong thời gian ngắn với độ chính xác cao và khả năng lặp lại ổn định. Nhờ tích hợp công nghệ
                quang học đa bước sóng và AI kiểm soát lỗi, máy đảm bảo kết quả tin cậy cho cả các xét nghiệm
                chuyên sâu. Đây là thiết bị được sử dụng rộng rãi trong các phòng xét nghiệm đạt chuẩn ISO 15189.
              </p>
              </motion.div>
            </div>

            {/* ITEM 2 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* TEXT LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .7 }}
                className="
                  bg-white/70 backdrop-blur-2xl
                  p-10 rounded-2xl 
                  border border-slate-200
                  shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                  order-last md:order-first
                "
              >
                <h3 className="text-2xl font-bold text-sky-700 mb-4">
                  Máy Huyết Học 5 Thành Phần
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  Máy Huyết Học 5 Thành Phần ứng dụng công nghệ laser đa kênh và hệ thống phân tích lưu lượng tế bào
                  (Flow Cytometry) tiên tiến, cho phép phân biệt chi tiết 5 loại bạch cầu và các chỉ số huyết học mở rộng.
                  Thiết bị giúp đánh giá tình trạng thiếu máu, nhiễm trùng, rối loạn tủy xương và nhiều bệnh lý huyết học khác
                  với độ chính xác cực cao. Bộ xử lý thông minh hỗ trợ tự động phát hiện bất thường hình thái tế bào,
                  cảnh báo sớm nguy cơ bệnh lý. Đây là công cụ không thể thiếu trong quy trình kiểm tra máu chuyên sâu,
                  đạt chuẩn quốc tế trong chẩn đoán và điều trị.
                </p>
              </motion.div>

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .7 }}
                className="relative"
              >
                <div className="
                  absolute inset-0 
                  bg-gradient-to-br from-cyan-300/40 to-blue-300/40
                  blur-2xl rounded-3xl
                ">
                </div>

                <img
                  src="/src/assets/image/machine2.jpg"
                  className="
                    relative w-full rounded-2xl
                    shadow-[0_12px_45px_rgba(0,150,255,0.25)]
                    border border-slate-200
                    object-cover transition-all duration-500
                    hover:scale-[1.03]
                  "
                />
              </motion.div>

            </div>

            {/* ITEM 3 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .7 }}
                className="relative"
              >
                <div className="
                  absolute inset-0 
                  bg-gradient-to-br from-cyan-300/40 to-blue-300/40
                  blur-2xl rounded-3xl
                ">
          </div>

                <img
                  src="/src/assets/image/machine1.jpg"
                  className="
                    relative w-full rounded-2xl
                    shadow-[0_12px_45px_rgba(0,150,255,0.25)]
                    border border-slate-200
                    object-cover transition-all duration-500
                    hover:scale-[1.03]
                  "
                />
              </motion.div>

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .7 }}
                className="
                  bg-white/70 backdrop-blur-2xl
                  p-10 rounded-2xl 
                  border border-slate-200
                  shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                "
              >
                <h3 className="text-2xl font-bold text-sky-700 mb-4">
                  Máy Miễn Dịch Tự Động
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  Máy Miễn Dịch Tự Động sử dụng công nghệ phát quang hóa học (CLIA) thế hệ mới,
                  mang đến độ nhạy vượt trội trong đo lường hormon nội tiết, dấu ấn ung thư, chỉ số viêm
                  và nhiều marker sinh học quan trọng khác. Hệ thống có khả năng phân tích nhanh với độ ổn định cao,
                  cho phép phát hiện bất thường từ giai đoạn rất sớm. Ngoài ra, thiết bị còn tích hợp bộ xử lý thông minh
                  giúp giảm sai số thao tác, tự động kiểm soát chất lượng và lưu trữ dữ liệu mẫu theo tiêu chuẩn quốc tế.
                  Đây là công nghệ không thể thiếu trong phòng xét nghiệm hiện đại, hỗ trợ chẩn đoán toàn diện và chính xác.
                </p>

              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= FORM MINI ================= */}
      <section
        id="contact"
        className="
          py-28 relative overflow-hidden
          bg-[#f5f8fc] text-slate-800
        "
      >
        {/* BACKGROUND PREMIUM */}
        <div className="absolute inset-0 pointer-events-none">

          {/* Aurora glow */}
          <div
            className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top_left,rgba(150,200,255,0.45),transparent_70%)]
            blur-[90px] opacity-70
          "
          ></div>

          {/* Grid y tế */}
          <div
            className="
            absolute inset-0 opacity-[0.06]
            bg-[linear-gradient(90deg,#94a3b820_1px,transparent_1px),
                linear-gradient(#94a3b820_1px,transparent_1px)]
            bg-[size:75px_75px]
          "
          ></div>

          {/* Floating micro particles */}
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-cyan-400/30 blur-[1px]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatParticle${i} ${5 + Math.random() * 5}s infinite ease-in-out`,
              }}
            ></div>
          ))}

          <style>{`
      ${[...Array(14)]
              .map(
                (_, i) => `
        @keyframes floatParticle${i} {
          0% { transform: translateY(0) translateX(0); opacity:.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity:.8; }
          100% { transform: translateY(0) translateX(0); opacity:.3; }
        }
      `
              )
              .join("")}
    `}</style>
        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-6 max-w-xl relative">

          {/* TITLE */}
          <style>{`
      @keyframes formTitleMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes lightSweepForm {
        0% { transform: translateX(-140%) skewX(-15deg); opacity:0; }
        50% { opacity:.35; }
        100% { transform: translateX(170%) skewX(-15deg); opacity:0; }
      }
    `}</style>

          <div className="relative text-center mb-14">

            {/* Light sweep */}
            <div
              className="
                absolute inset-x-0 top-1/2 h-[120px]
                bg-gradient-to-r from-transparent via-white/40 to-transparent
                opacity-0
              "
              style={{ animation: "lightSweepForm 6s infinite linear" }}
            ></div>

            <h2
              className="
              text-[26px] md:text-[30px] font-extrabold tracking-tight
              bg-gradient-to-r from-sky-700 via-cyan-700 to-indigo-800
              bg-[length:200%_200%] bg-clip-text text-transparent
              drop-shadow-[0_4px_20px_rgba(56,189,248,0.25)]
            "
              style={{ animation: "formTitleMove 7s ease-in-out infinite" }}
            >
              Đăng ký tư vấn
            </h2>

            <p className="text-slate-500 mt-3 text-base">
              Vui lòng điền đầy đủ thông tin bên dưới
            </p>

            <div className="
              w-40 h-[3px] mx-auto mt-5
              bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full
              shadow-[0_0_12px_rgba(56,189,248,0.35)]
            ">
            </div>
          </div>

          {/* FORM */}
          <form
            className="
              mt-8 space-y-5
              bg-white/70 backdrop-blur-2xl
              border border-slate-200
              p-8 rounded-2xl
              shadow-[0_8px_35px_rgba(0,0,0,0.06)]
            "
          >
            {[
              { label: "Họ và Tên", placeholder: "Nguyễn Văn A", type: "text" },
              { label: "Số Điện Thoại", placeholder: "0123 456 789", type: "text" },
              { label: "Email", placeholder: "example@gmail.com", type: "email" },
            ].map((field, i) => (
              <div key={i} className="space-y-1">
                <label className="text-slate-700 text-sm font-semibold">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="
                    w-full px-4 py-3 rounded-xl bg-white/50 text-slate-800
                    border border-slate-300 outline-none text-sm
                    focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(0,180,255,0.4)]
                    transition-all
                  "
                />
              </div>
            ))}

            {/* GIỚI TÍNH */}
            <div className="space-y-1">
              <label className="text-slate-700 text-sm font-semibold">Giới Tính</label>
              <select
                className="
                  w-full px-4 py-3 rounded-xl bg-white/50 text-slate-800
                  border border-slate-300 outline-none text-sm
                  focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(0,180,255,0.4)]
                  transition-all
                "
              >
                <option>Nam</option>
                <option>Nữ</option>
                <option>Khác</option>
              </select>
            </div>

            {/* NGÀY SINH */}
            <div className="space-y-1">
              <label className="text-slate-700 text-sm font-semibold">Ngày Sinh</label>
              <input
                type="date"
                className="
                  w-full px-4 py-3 rounded-xl bg-white/50 text-slate-800
                  border border-slate-300 outline-none text-sm
                  focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(0,180,255,0.4)]
                  transition-all
                "
              />
            </div>

            {/* SUBMIT */}
            <button
              className="
          w-full py-3 mt-3 text-sm font-semibold
          bg-gradient-to-r from-cyan-500 to-blue-600 
          text-white rounded-xl
          shadow-[0_0_15px_rgba(0,180,255,0.5)]
          hover:shadow-[0_0_25px_rgba(0,180,255,0.75)]
          transition-all duration-300
        "
            >
              Gửi →
            </button>

          </form>
        </div>
      </section>



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

      {/* ================= PREMIUM FOOTER ================= */}
      <footer
        className="
        relative overflow-hidden
        bg-[#eef3f8] 
        text-slate-700
        pt-20 pb-14
      "
      >
        {/* BACKGROUND LAYERS */}
        <div className="absolute inset-0 pointer-events-none">

          {/* Aurora Glow */}
          <div
            className="
        absolute inset-0
        bg-[radial-gradient(circle_at_bottom_left,rgba(120,190,255,0.45),transparent_70%)]
        blur-[90px] opacity-60
      "
          ></div>

          {/* Subtle Medical Grid */}
          <div
            className="
        absolute inset-0 opacity-[0.08]
        bg-[linear-gradient(90deg,#94a3b820_1px,transparent_1px),
            linear-gradient(#94a3b820_1px,transparent_1px)]
        bg-[size:75px_75px]
      "
          ></div>

          {/* Moving Light Sweep */}
          <style>{`
      @keyframes footerSweep {
        0% { transform: translateX(-150%) skewX(-15deg); opacity:0; }
        50% { opacity:.35; }
        100% { transform: translateX(180%) skewX(-15deg); opacity:0; }
      }
    `}</style>

          <div
            className="
        absolute top-1/3 inset-x-0 h-[150px]
        bg-gradient-to-r from-transparent via-white/40 to-transparent
        opacity-0
      "
            style={{ animation: "footerSweep 8s infinite linear" }}
          ></div>
        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-14 relative">

          {/* ==== COL 1 – LOGO & DESCRIPTION ==== */}
          <div className="space-y-4">
            <h3 className="
  text-2xl font-bold
  bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400
  bg-clip-text text-transparent
">
              Blood Test OJT
            </h3>


            <p className="text-slate-600 text-sm leading-relaxed">
              Trung tâm xét nghiệm máu hiện đại – công nghệ tiên tiến – đảm bảo kết quả
              chính xác và an toàn theo tiêu chuẩn quốc tế.
            </p>
          </div>

          {/* ==== COL 2 – SERVICES ==== */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-4 text-lg">Dịch Vụ Chính</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#service" className="hover:text-sky-600 transition">Xét Nghiệm Máu Tổng Quát</a></li>
              <li><a href="#service" className="hover:text-sky-600 transition">Sinh Hóa – Miễn Dịch</a></li>
              <li><a href="#service" className="hover:text-sky-600 transition">Nội Tiết – Hormon</a></li>
              <li><a href="#service" className="hover:text-sky-600 transition">Đánh Giá Tim Mạch</a></li>
            </ul>
          </div>

          {/* ==== COL 3 – POLICY ==== */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-4 text-lg">Hỗ Trợ & Chính Sách</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:text-sky-600 transition">Hướng Dẫn Đặt Lịch</a></li>
              <li><a href="#" className="hover:text-sky-600 transition">Chính Sách Bảo Mật</a></li>
              <li><a href="#" className="hover:text-sky-600 transition">Điều Khoản Dịch Vụ</a></li>
              <li><a href="#contact" className="hover:text-sky-600 transition">Hỗ Trợ Khách Hàng</a></li>
            </ul>
          </div>

          {/* ==== COL 4 – CONTACT ==== */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-4 text-lg">Thông Tin Liên Hệ</h4>

            <ul className="space-y-2 text-slate-600 text-sm">

              {/* ĐỊA CHỈ 1 HÀNG */}
              <li className="whitespace-nowrap flex gap-2 items-start overflow-hidden">
                <span className="font-semibold ext-sky-600">Địa chỉ:</span>
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>


              {/* HOTLINE */}
              <li className="flex gap-2">
                <span className="font-semibold text-slate-700">Hotline:</span>
                <a href="tel:0258741369" className="hover:text-sky-600 transition">
                  0258 741 369
                </a>
              </li>

            </ul>


            {/* SOCIAL ICONS */}
            <div className="flex space-x-5 text-xl mt-4">

              <a
                href="#"
                className="
            text-slate-500 hover:text-sky-600
            transition-all
          "
              >
                <i className="fab fa-facebook"></i>
              </a>

              <a
                href="#"
                className="
            text-slate-500 hover:text-indigo-500
            transition-all
          "
              >
                <i className="fab fa-facebook-messenger"></i>
              </a>

              <a
                href="#"
                className="
            text-slate-500 hover:text-cyan-500
            transition-all
          "
              >
                <i className="fas fa-comment-dots"></i>
              </a>

            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <p className="text-center text-slate-500 mt-14 text-sm relative">
          © Sản phẩm thực tập demo - Tất cả hình ảnh do AI tạo ra.
        </p>
      </footer>


    </div>
  );
}
