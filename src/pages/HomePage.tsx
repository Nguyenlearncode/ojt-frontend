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
          pt-32 pb-28 relative overflow-hidden 
          bg-[#0f172a] text-gray-100
        "
      >

        {/* BACKGROUND HIỆU ỨNG TECH */}
        <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_top_left,rgba(0,160,255,0.25),transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,#3b82f6_1px,transparent_1px),linear-gradient(#3b82f6_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        <div className="container mx-auto px-6 relative">

          {/* TITLE SECTION */}
          <div className="text-center mb-16 select-none">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="
                text-5xl font-extrabold leading-tight
              "
            >
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,200,255,0.4)]">
                Chào mừng đến với Trung Tâm Xét Nghiệm Máu OJT
              </span>
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="
                mt-6 text-3xl font-bold text-cyan-100 tracking-wide
              "
            >
              Chuyên sâu trong lĩnh vực xét nghiệm máu
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="
                max-w-3xl mx-auto mt-6 text-lg text-gray-300 leading-relaxed
              "
            >
              Chúng tôi cung cấp dịch vụ xét nghiệm máu hiện đại, nhanh chóng và chính xác
              với hệ thống máy móc tiên tiến, đảm bảo kết quả tin cậy và phục vụ tận tâm.
            </motion.p>

            {/* Glow line */}
            <div className="mt-10 flex justify-center">
              <div className="w-48 h-[3px] bg-gradient-to-r from-cyan-300 to-blue-500 rounded-full shadow-[0_0_12px_rgba(0,200,255,0.6)]"></div>
            </div>
          </div>

          {/* ===== FEATURE CARDS – DARK GLASS STYLE ===== */}
          <div className="grid md:grid-cols-3 gap-10 mt-10">

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
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="
                  backdrop-blur-xl bg-white/5 
                  border border-cyan-400/20
                  p-10 rounded-2xl 
                  shadow-[0_10px_40px_rgba(0,200,255,0.10)]
                  hover:shadow-[0_15px_55px_rgba(0,200,255,0.22)]
                  transition-all duration-300
                  text-center flex flex-col items-center
                "
              >
                {/* ICON */}
                <div className="
                  w-20 h-20 flex items-center justify-center 
                  bg-gradient-to-br from-cyan-300/20 to-blue-400/20
                  border border-cyan-400/30
                  rounded-xl shadow-[0_0_25px_rgba(0,200,255,0.3)]
                  mb-6
                ">
                  <item.icon className="h-10 w-10 text-cyan-300" />
                </div>

                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-gray-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}

          </div>

        </div>
      </section>



      {/* ================= Dịch vụ ================= */}
      <section id="service" className="py-28 bg-[#0f172a] text-gray-100 relative overflow-hidden">

        {/* GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="container mx-auto px-6 relative">

          {/* TITLE */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
                Danh Mục Xét Nghiệm
              </span>
            </h2>

            <p className="max-w-2xl mx-auto mt-5 text-gray-400 text-lg">
              Công nghệ xét nghiệm thế hệ mới – tốc độ nhanh – độ chính xác cao – chuẩn phòng Lab quốc tế.
            </p>

            <div className="w-48 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-6 opacity-70"></div>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-8">

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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="
                  p-10
                  border border-gray-700
                  bg-[#1e293b]/50
                  shadow-[0_0_20px_rgba(0,0,0,0.45)]
                  hover:shadow-[0_0_40px_rgba(56,189,248,0.35)]
                  transition-all duration-300
                  flex flex-col
                  !rounded-none
                "
              >
                {/* ICON */}
                <div className="w-16 h-16 flex items-center justify-center bg-[#0f172a] border border-gray-700 mb-6 !rounded-none">
                  <item.icon className="h-10 w-10 text-cyan-400" />
                </div>

                {/* TEXT */}
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>

                <p className="text-gray-400 leading-relaxed mb-6">{item.desc}</p>

                <button className="
                  mt-auto px-5 py-2 border 
                  border-cyan-500
                  text-cyan-400 
                  hover:bg-cyan-500 hover:text-black
                  transition-all duration-300
                  !rounded-none font-semibold
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
          bg-[#0f172a] text-gray-100
        "
      >
        <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_top_left,rgba(0,150,255,0.30),transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,#3b82f6_1px,transparent_1px),linear-gradient(#3b82f6_1px,transparent_1px)] bg-[size:80px_80px]"></div>

        <div className="container mx-auto px-6 relative">

          {/* TITLE */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Đội Ngũ Y Bác Sĩ
            </span>
          </h2>

          <p className="text-center text-gray-300 mt-3 text-lg tracking-wide">
            Chuyên gia hàng đầu – Kinh nghiệm chuyên sâu – Tận tâm vì sức khỏe của bạn
          </p>

          <div className="w-48 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(0,200,255,0.6)]"></div>

          {/* GRID */}
          <div className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            gap-14 mt-20
          ">
            {[
              { name: "BS. Nguyễn Minh Khoa", role: "Huyết Học – Truyền Máu", img: "https://picsum.photos/id/1011/700/900" },
              { name: "BS. Trần Hải Yến", role: "Sinh Hóa – Miễn Dịch", img: "https://picsum.photos/id/1012/700/900" },
              { name: "BS. Phạm Đức Long", role: "Ung Bướu – Miễn Dịch", img: "https://picsum.photos/id/1015/700/900" },
              { name: "BS. Lưu Thanh Hà", role: "Tim Mạch – Huyết Áp", img: "https://picsum.photos/id/1016/700/900" },
            ].map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.06, y: -10 }}
                className="
                  group 
                  bg-white/5 backdrop-blur-xl
                  border border-cyan-400/20
                  shadow-[0_10px_40px_rgba(0,200,255,0.15)]
                  hover:shadow-[0_15px_55px_rgba(0,200,255,0.35)]
                  rounded-xl overflow-hidden
                  transition-all duration-500
                  w-[290px] h-[400px] mx-auto flex flex-col
                "
              >

                {/* IMAGE */}
                <div className="w-full h-[300px] overflow-hidden">
                  <img
                    src={doc.img}
                    className="
                      w-full h-full object-cover 
                      transition-all duration-500
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* INFO */}
                <div className="p-5 text-center flex flex-col">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
                    {doc.name}
                  </h3>
                  <p className="text-cyan-300 mt-1 font-medium tracking-wide">
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
          py-28 relative overflow-hidden 
          bg-[#0f172a]  /* navy dark */
          text-gray-100
        "
      >

        {/* TECH GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_top_left,rgba(0,150,255,0.30),transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,#3b82f6_1px,transparent_1px),linear-gradient(#3b82f6_1px,transparent_1px)] bg-[size:70px_70px]"></div>

        <div className="container mx-auto px-6 relative">

          {/* TITLE */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Cơ Sở Vật Chất Hiện Đại
            </span>
          </h2>

          <p className="text-center text-gray-300 mt-3 text-lg tracking-wide">
            Trang thiết bị công nghệ cao – tự động hóa – chuẩn quốc tế ISO 15189
          </p>

          <div className="w-48 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(0,200,255,0.7)]"></div>


          <div className="mt-24 space-y-32">

            {/* ========== ITEM 1 ========== */}
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* IMAGE LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 blur-2xl rounded-3xl"></div>
                <img
                  src="https://picsum.photos/id/1043/700/500"
                  className="relative w-full rounded-xl border border-cyan-400/20 shadow-[0_12px_50px_rgba(0,200,255,0.25)] object-cover"
                />
              </motion.div>

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="
                  backdrop-blur-xl bg-white/5 
                  p-10 rounded-xl border border-cyan-400/20 
                  shadow-[0_6px_30px_rgba(0,150,255,0.25)]
                "
              >
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">
                  Máy Phân Tích Sinh Hóa Tự Động
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Phân tích sinh hóa tự động hóa hoàn toàn, tốc độ cao – chính xác – xử lý nhiều chỉ số sinh học chỉ trong vài phút.
                </p>
              </motion.div>

            </div>

            {/* ========== ITEM 2 ========== */}
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* TEXT LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="
                  backdrop-blur-xl bg-white/5 
                  p-10 rounded-xl border border-cyan-400/20 
                  shadow-[0_6px_30px_rgba(0,150,255,0.25)]
                  order-last md:order-first
                "
              >
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">
                  Máy Huyết Học 5 Thành Phần
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Công nghệ laser đa kênh giúp đếm & phân loại tế bào máu chi tiết – hỗ trợ chẩn đoán huyết học với độ chính xác cao.
                </p>
              </motion.div>

              {/* IMAGE RIGHT */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 blur-2xl rounded-3xl"></div>
                <img
                  src="https://picsum.photos/id/1074/700/500"
                  className="relative w-full rounded-xl border border-cyan-400/20 shadow-[0_12px_50px_rgba(0,200,255,0.25)] object-cover"
                />
              </motion.div>

            </div>


            {/* ========== ITEM 3 ========== */}
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* IMAGE LEFT */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 blur-2xl rounded-3xl"></div>
                <img
                  src="https://picsum.photos/id/1050/700/500"
                  className="relative w-full rounded-xl border border-cyan-400/20 shadow-[0_12px_50px_rgba(0,200,255,0.25)] object-cover"
                />
              </motion.div>

              {/* TEXT RIGHT */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="
                backdrop-blur-xl bg-white/5 
                p-10 rounded-xl border border-cyan-400/20 
                shadow-[0_6px_30px_rgba(0,150,255,0.25)]
              "
              >
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">
                  Máy Miễn Dịch Tự Động
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Hệ thống phát quang thế hệ mới, cho phép chẩn đoán nội tiết – viêm – marker ung thư với độ nhạy tối đa.
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
          bg-[#0f172a] text-gray-100
        "
      >
        {/* ⭐ BACKGROUND GIỐNG NHƯ CƠ SỞ VẬT CHẤT ⭐ */}
        <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_top_left,rgba(0,150,255,0.30),transparent_70%)]"></div>
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,#3b82f6_1px,transparent_1px),linear-gradient(#3b82f6_1px,transparent_1px)] bg-[size:70px_70px]"></div>

        <div className="container mx-auto px-6 max-w-xl relative">

          {/* TITLE */}
          <h2 className="text-3xl font-extrabold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Đăng ký tư vấn
            </span>
          </h2>

          <p className="text-center text-gray-400 mt-2 text-base">
            Vui lòng điền đầy đủ thông tin bên dưới
          </p>

          {/* FORM */}
          <form
            className="
              mt-10 space-y-5
              backdrop-blur-xl bg-white/5 
              border border-cyan-400/20 
              p-6 rounded-xl
              shadow-[0_0_25px_rgba(0,150,255,0.15)]
            "
          >

            {/* Họ và tên */}
            <div className="space-y-1">
              <label className="text-gray-200 text-sm font-semibold">Họ và Tên</label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                className="
                  w-full px-4 py-2.5 rounded-md bg-white/10 text-gray-100
                  border border-gray-500/30 outline-none text-sm
                  focus:border-cyan-400 
                  focus:shadow-[0_0_10px_rgba(0,200,255,0.5)]
                  transition-all
                "
              />
            </div>

            {/* Số điện thoại */}
            <div className="space-y-1">
              <label className="text-gray-200 text-sm font-semibold">Số Điện Thoại</label>
              <input
                type="text"
                placeholder="0123 456 789"
                className="
                  w-full px-4 py-2.5 rounded-md bg-white/10 text-gray-100
                  border border-gray-500/30 outline-none text-sm
                  focus:border-cyan-400 
                  focus:shadow-[0_0_10px_rgba(0,200,255,0.5)]
                  transition-all
                "
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-gray-200 text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="
                  w-full px-4 py-2.5 rounded-md bg-white/10 text-gray-100
                  border border-gray-500/30 outline-none text-sm
                  focus:border-cyan-400 
                  focus:shadow-[0_0_10px_rgba(0,200,255,0.5)]
                  transition-all
                "
              />
            </div>

            {/* Giới tính */}
            <div className="space-y-1">
              <label className="text-gray-200 text-sm font-semibold">Giới Tính</label>
              <select
                className="
                  w-full px-4 py-2.5 rounded-md bg-white/10 text-gray-100
                  border border-gray-500/30 outline-none text-sm
                  focus:border-cyan-400 
                  focus:shadow-[0_0_10px_rgba(0,200,255,0.5)]
                  transition-all
                "
              >
                <option className="text-gray-900">Nam</option>
                <option className="text-gray-900">Nữ</option>
                <option className="text-gray-900">Khác</option>
              </select>
            </div>

            {/* Ngày sinh */}
            <div className="space-y-1">
              <label className="text-gray-200 text-sm font-semibold">Ngày Sinh</label>
              <input
                type="date"
                className="
                  w-full px-4 py-2.5 rounded-md bg-white/10 text-gray-100
                  border border-gray-500/30 outline-none text-sm
                  focus:border-cyan-400 
                  focus:shadow-[0_0_10px_rgba(0,200,255,0.5)]
                  transition-all
                "
              />
            </div>

            {/* Submit */}
            <button
              className="
                w-full py-2.5 mt-3 text-sm font-semibold
                bg-gradient-to-r from-cyan-500 to-blue-600 
                text-black rounded-md
                shadow-[0_0_18px_rgba(0,200,255,0.6)]
                hover:shadow-[0_0_25px_rgba(0,200,255,0.9)]
                transition-all
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

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 py-14">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">

          {/* Cột 1 –  mô tả */}
          <div className="space-y-4">
            <h3 className="text-white text-2xl font-bold">Blood Test OJT</h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              Trung tâm xét nghiệm máu hiện đại, ứng dụng công nghệ tiên tiến giúp chẩn đoán
              nhanh – chính xác – an toàn.
            </p>
          </div>

          {/* Cột 2 – Dịch vụ chính */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Dịch Vụ Chính</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#service" className="hover:text-white">Xét Nghiệm Máu Tổng Quát</a></li>
              <li><a href="#service" className="hover:text-white">Sinh Hóa – Miễn Dịch</a></li>
              <li><a href="#service" className="hover:text-white">Nội Tiết – Hormon</a></li>
              <li><a href="#service" className="hover:text-white">Đánh Giá Tim Mạch</a></li>
            </ul>
          </div>

          {/* Cột 3 – Hỗ trợ & Chính sách */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Hỗ Trợ & Chính Sách</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Hướng Dẫn Đặt Lịch</a></li>
              <li><a href="#" className="hover:text-white">Chính Sách Bảo Mật</a></li>
              <li><a href="#" className="hover:text-white">Điều Khoản Dịch Vụ</a></li>
              <li><a href="#contact" className="hover:text-white">Hỗ Trợ Khách Hàng</a></li>
            </ul>
          </div>

          {/* Cột 4 – Thông tin liên hệ */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Thông Tin Liên Hệ</h4>

            <ul className="space-y-2 text-gray-400">
              <li className="flex gap-2 whitespace-nowrap">
                <span className="font-semibold text-gray-300">Địa chỉ:</span>
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>

              <li className="flex gap-2 whitespace-nowrap">
                <span className="font-semibold text-gray-300">Hotline:</span>
                <a href="tel:0258741369" className="text-gray-400 hover:text-white">
                  0258 741 369
                </a>
              </li>
            </ul>

            {/* ICON LIÊN HỆ */}
            <div className="flex space-x-4 text-2xl mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition" title="Facebook">
                <i className="fab fa-facebook"></i>
              </a>

              <a href="#" className="text-gray-400 hover:text-blue-400 transition" title="Messenger">
                <i className="fab fa-facebook-messenger"></i>
              </a>

              <a href="#" className="text-gray-400 hover:text-cyan-400 transition" title="Zalo">
                <i className="fas fa-comment-dots"></i>
              </a>
            </div>
          </div>

        </div>

        <p className="text-center text-gray-500 mt-10 text-sm">
          © {new Date().getFullYear()} Blood Test OJT — All Rights Reserved
        </p>
      </footer>

    </div>
  );
}
