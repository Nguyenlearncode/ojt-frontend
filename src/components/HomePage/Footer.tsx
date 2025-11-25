// src/components/HomePage/Footer.tsx

export default function Footer() {
  return (
    <footer
      className="
        relative overflow-hidden
        bg-[#eef3f8] 
        text-slate-700
        pt-20 pb-14
      "
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_bottom_left,rgba(120,190,255,0.45),transparent_70%)]
            blur-[90px] opacity-60
          "
        ></div>

        <div
          className="
            absolute inset-0 opacity-[0.08]
            bg-[linear-gradient(90deg,#94a3b820_1px,transparent_1px),
                linear-gradient(#94a3b820_1px,transparent_1px)]
            bg-[size:75px_75px]
          "
        ></div>

        <style>{`
        @keyframes footerSweep {
          0% { transform: translateX(-150%) skewX(-15deg); opacity:0; }
          50% { opacity:.35; }
          100% { transform: translateX(180%) skewX(-15deg); opacity:0; }
        }`}</style>

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

        {/* LOGO */}
        <div className="space-y-4">
          <h3
            className="
              text-2xl font-bold
              bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400
              bg-clip-text text-transparent
            "
          >
            Blood Test OJT
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed">
            Trung tâm xét nghiệm máu hiện đại – công nghệ tiên tiến – đảm bảo kết quả chính xác và an toàn theo tiêu chuẩn quốc tế.
          </p>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-4 text-lg">Dịch Vụ Chính</h4>
          <ul className="space-y-2 text-slate-600">
            <li><a href="#service" className="hover:text-sky-600 transition">Xét Nghiệm Máu Tổng Quát</a></li>
            <li><a href="#service" className="hover:text-sky-600 transition">Sinh Hóa – Miễn Dịch</a></li>
            <li><a href="#service" className="hover:text-sky-600 transition">Nội Tiết – Hormon</a></li>
            <li><a href="#service" className="hover:text-sky-600 transition">Đánh Giá Tim Mạch</a></li>
          </ul>
        </div>

        {/* POLICY */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-4 text-lg">Hỗ Trợ & Chính Sách</h4>
          <ul className="space-y-2 text-slate-600">
            <li><a href="#" className="hover:text-sky-600 transition">Hướng Dẫn Đặt Lịch</a></li>
            <li><a href="#" className="hover:text-sky-600 transition">Chính Sách Bảo Mật</a></li>
            <li><a href="#" className="hover:text-sky-600 transition">Điều Khoản Dịch Vụ</a></li>
            <li><a href="#contact" className="hover:text-sky-600 transition">Hỗ Trợ Khách Hàng</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold text-slate-800 mb-4 text-lg">Thông Tin Liên Hệ</h4>

          <ul className="space-y-2 text-slate-600 text-sm">

            <li className="flex gap-2 items-start">
              <span className="font-semibold whitespace-nowrap">Địa chỉ:</span>
              <span className="whitespace-normal break-words">
                123 Đường ABC, Quận 1, TP.HCM
              </span>
            </li>

            <li className="flex gap-2">
              <span className="font-semibold">Hotline:</span>
              <a href="tel:0258741369" className="hover:text-sky-600 transition">
                0258 741 369
              </a>
            </li>
          </ul>

          {/* SOCIAL ICONS */}
          <div className="flex space-x-5 text-xl mt-4">
            <a className="text-slate-500 hover:text-sky-600 transition-all" href="#"><i className="fab fa-facebook"></i></a>
            <a className="text-slate-500 hover:text-indigo-500 transition-all" href="#"><i className="fab fa-facebook-messenger"></i></a>
            <a className="text-slate-500 hover:text-cyan-500 transition-all" href="#"><i className="fas fa-comment-dots"></i></a>
          </div>
        </div>
      </div>

      <p className="text-center text-slate-500 mt-14 text-sm relative">
        © Sản phẩm thực tập demo - Tất cả hình ảnh do AI tạo ra.
      </p>
    </footer>
  );
}
