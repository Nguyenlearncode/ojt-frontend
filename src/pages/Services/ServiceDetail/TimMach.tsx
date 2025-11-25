import Header from "../../../components/HomePage/Header";
import Footer from "../../../components/HomePage/Footer";

export default function TimMach() {
  return (
    <div className="font-sans bg-white text-slate-800">
      <Header scrolled={true} />

      {/* HERO SECTION */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            
            {/* TEXT */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-sky-700 leading-tight">
                Đánh Giá Nguy Cơ Tim Mạch
              </h1>

              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Bộ xét nghiệm tim mạch chuyên sâu giúp phát hiện sớm nguy cơ 
                <b> xơ vữa động mạch</b>, <b>nhồi máu cơ tim</b> và <b>đột quỵ</b>. 
                Đây là xét nghiệm quan trọng trong tầm soát và phòng ngừa bệnh lý tim mạch hiện nay.
              </p>

              <div className="mt-6 p-4 bg-sky-100 border-l-4 border-sky-500 rounded-lg">
                <p className="text-sky-800 font-semibold">
                  ❤️ Hệ tim mạch khỏe mạnh giúp bảo vệ sự sống và giảm nguy cơ biến chứng nguy hiểm.
                </p>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div>
              <img
                src="/image/tim-mach-main.jpg"
                className="rounded-xl shadow-xl w-full h-72 object-cover"
                alt="Đánh giá nguy cơ tim mạch"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-16 container mx-auto px-6 max-w-5xl">

        {/* Title 1 */}
        <h2 className="text-3xl font-bold text-sky-700 text-center">
          Các Xét Nghiệm Tim Mạch Chuyên Sâu
        </h2>
        <p className="mt-3 text-center text-slate-600 max-w-3xl mx-auto">
          Được thực hiện trên hệ thống phân tích hiện đại, giúp đánh giá chính xác các yếu tố nguy cơ.
        </p>

        {/* GRID 3 CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          
          {/* CARD 1 */}
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <img
              src="/image/lipid.jpg"
              className="rounded-lg w-full h-40 object-cover"
              alt="Lipid máu"
            />
            <h3 className="mt-4 text-xl font-bold text-slate-800">Hồ sơ mỡ máu</h3>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Đánh giá cholesterol toàn phần, LDL, HDL và triglyceride — các chỉ số quan trọng trong
              dự đoán nguy cơ xơ vữa.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <img
              src="/image/crp.jpg"
              className="rounded-lg w-full h-40 object-cover"
              alt="CRP độ nhạy cao"
            />
            <h3 className="mt-4 text-xl font-bold text-slate-800">CRP độ nhạy cao (hs-CRP)</h3>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Chỉ số phản ánh tình trạng viêm âm ỉ mạch máu — liên quan trực tiếp đến nguy cơ nhồi máu cơ tim.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <img
              src="/image/homocysteine.jpg"
              className="rounded-lg w-full h-40 object-cover"
              alt="Homocysteine"
            />
            <h3 className="mt-4 text-xl font-bold text-slate-800">Homocysteine</h3>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Nồng độ cao làm tổn thương nội mạc mạch máu, tăng nguy cơ huyết khối và đột quỵ.
            </p>
          </div>
        </div>

        {/* SECTION 2 - DEEP DETAIL */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-sky-700">1. Hồ sơ mỡ máu (Lipid Profile)</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Hồ sơ mỡ máu phản ánh tình trạng lipid trong cơ thể, từ đó đánh giá nguy cơ mắc các bệnh
            tim mạch chuyển hóa. Mỡ máu cao kéo dài là nguyên nhân chính của xơ vữa động mạch.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700">
            <li><b>LDL-C – cholesterol xấu:</b> gây hẹp lòng mạch.</li>
            <li><b>HDL-C – cholesterol tốt:</b> bảo vệ thành mạch.</li>
            <li><b>Triglyceride:</b> tăng khi rối loạn chuyển hóa, béo phì.</li>
          </ul>
        </div>

        {/* SECTION 3 */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-sky-700">2. CRP độ nhạy cao (hs-CRP)</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            hs-CRP là chỉ dấu viêm được dùng để phát hiện tình trạng viêm mạch máu mức độ thấp, 
            ngay cả khi bệnh nhân chưa có triệu chứng rõ ràng.
          </p>

          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <b>Mức hs-CRP cao</b> → Nguy cơ nhồi máu cơ tim **tăng gấp 2–3 lần**.
          </div>
        </div>

        {/* SECTION 4 */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-sky-700">3. Homocysteine</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Homocysteine tăng cao làm tổn thương nội mạc mạch máu, thúc đẩy hình thành huyết khối. 
            Đây là xét nghiệm quan trọng trong tầm soát nguy cơ đột quỵ và bệnh mạch vành.
          </p>
        </div>

        {/* SECTION 5 - WHEN TO TEST */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-sky-700">4. Khi nào cần xét nghiệm tim mạch?</h2>
          <ul className="list-disc pl-6 mt-4 space-y-3 text-slate-700 leading-relaxed">
            <li>Cảm giác đau ngực, khó thở, tim đập nhanh bất thường.</li>
            <li>Béo phì, tăng huyết áp, tiểu đường, hút thuốc lá.</li>
            <li>Gia đình có người mắc bệnh tim mạch sớm.</li>
            <li>Kiểm tra định kỳ từ 30 tuổi trở lên.</li>
          </ul>
        </div>

        {/* SECTION 6 */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-sky-700">5. Ý nghĩa khi kết quả bất thường</h2>
          <ul className="list-disc pl-6 mt-4 space-y-3 text-slate-700 leading-relaxed">
            <li>LDL tăng → nguy cơ xơ vữa và nhồi máu cơ tim.</li>
            <li>HDL thấp → thành mạch ít được bảo vệ.</li>
            <li>CRP cao → viêm mạch máu, nguy cơ biến chứng.</li>
            <li>Homocysteine cao → nguy cơ huyết khối và đột quỵ.</li>
          </ul>
        </div>

        {/* LAST NOTE */}
        <div className="mt-16 p-6 bg-sky-50 rounded-xl border border-sky-200">
          <p className="text-sky-800 leading-relaxed">
            🔎 <b>Lời khuyên:</b>  
            Xét nghiệm tim mạch là công cụ quan trọng giúp phát hiện sớm nguy cơ và bảo vệ sức khỏe lâu dài.
            Nên tầm soát 6–12 tháng/lần, đặc biệt khi có yếu tố nguy cơ.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
