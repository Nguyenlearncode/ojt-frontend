import Header from "../../../components/HomePage/Header";
import Footer from "../../../components/HomePage/Footer";

export default function SinhHoa() {
  return (
    <div className="font-sans bg-white text-slate-800">

      <Header scrolled={true} />

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-10 items-center">
          
          {/* TEXT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-sky-700 leading-tight">
              Xét Nghiệm Sinh Hóa Máu Chuyên Sâu
            </h1>

            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Đánh giá toàn diện chức năng gan – thận – đường huyết – mỡ máu – điện giải
              bằng hệ thống máy phân tích tự động thế hệ mới.
            </p>

            <div className="mt-6 bg-sky-100 border-l-4 border-sky-500 p-4 rounded-lg shadow-sm">
              <p className="text-sky-800 font-semibold">
                🔬 Phát hiện sớm rối loạn chuyển hóa trước khi xuất hiện triệu chứng.
              </p>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div>
            <img
              src="https://storage.googleapis.com/prod-diagcorp/images/ckeditor/5VYhneQpHFddgXNuEOnPuR7B0yq7TMW4WexKL0zAHmRtWI5mNRRAKjXybkdsX2jsSt8OQj4NHROtuwqa_1620191521.jpg"
              className="rounded-xl shadow-xl w-full h-80 object-cover"
              alt="Xét nghiệm sinh hóa máu"
            />
          </div>
        </div>
      </section>


      {/* HIGHLIGHT BOX 3 CỘT */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-3 gap-8 text-center">
          
          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition bg-sky-50 border border-sky-100">
            <h3 className="text-xl font-bold text-sky-700">Chính xác cao</h3>
            <p className="mt-2 text-slate-600 text-sm">Ứng dụng máy phân tích tự động tiêu chuẩn ISO 15189</p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition bg-sky-50 border border-sky-100">
            <h3 className="text-xl font-bold text-sky-700">Thời gian nhanh</h3>
            <p className="mt-2 text-slate-600 text-sm">Trả kết quả trong 1–2 giờ tùy từng xét nghiệm</p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition bg-sky-50 border border-sky-100">
            <h3 className="text-xl font-bold text-sky-700">Đánh giá toàn diện</h3>
            <p className="mt-2 text-slate-600 text-sm">Phát hiện sớm bất thường chức năng các cơ quan</p>
          </div>

        </div>
      </section>


      {/* 3 CARDS CHÍNH */}
      <section className="py-14 container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl font-bold text-sky-700 text-center">
          Các Nhóm Xét Nghiệm Sinh Hóa Chính
        </h2>

        <p className="mt-3 text-center text-slate-600 max-w-3xl mx-auto">
          Được chia thành 3 nhóm nền tảng giúp đánh giá đầy đủ hoạt động chuyển hóa của cơ thể.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
            <img src="https://max-website20-images.s3.ap-south-1.amazonaws.com/Types_of_Liver_Function_Tests_642b4d0096.jpg"
              className="w-full h-40 object-cover rounded-lg" />
            <h3 className="mt-4 text-xl font-bold text-slate-800">Chức năng gan</h3>
            <p className="mt-2 text-slate-600 text-sm">Đo men gan, bilirubin, protein – phát hiện tổn thương gan.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
            <img src="https://images.openai.com/static-rsc-1/nlZpYAqCQDvJUmwkOGq9ZfG6Ck-UQ-BSxz-XYo6EhqUiGsNMU4OZT-naWWyWvfzTlNPFZrHZkb-X9j6hmZvOxixiGsdWB51q761VQcq36MDl4AWRUkyc5b1hGtOkVOFliBl8aeau4-xcaEsAM6gEwg"
              className="w-full h-40 object-cover rounded-lg" />
            <h3 className="mt-4 text-xl font-bold text-slate-800">Chức năng thận</h3>
            <p className="mt-2 text-slate-600 text-sm">Ure, Creatinine, eGFR – đánh giá mức lọc cầu thận.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
            <img src="https://cdn.vectorstock.com/i/1000v/05/09/medical-blood-test-cholesterol-in-tube-vector-47240509.jpg"
              className="w-full h-40 object-cover rounded-lg" />
            <h3 className="mt-4 text-xl font-bold text-slate-800">Mỡ máu & điện giải</h3>
            <p className="mt-2 text-slate-600 text-sm">Lipid máu, Na⁺, K⁺, Cl⁻, Ca²⁺ – kiểm tra cân bằng chất.</p>
          </div>

        </div>
      </section>


      {/* SECTION: CHI TIẾT TỪNG NHÓM */}
      <section className="py-14 bg-sky-50">
        <div className="container mx-auto px-6 max-w-5xl">

          {/* GAN */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-sky-700">1. Chức năng gan</h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Gan tham gia hầu hết quá trình chuyển hóa của cơ thể. Xét nghiệm chức năng gan giúp
              phát hiện sớm tổn thương do viêm gan, gan nhiễm mỡ, rượu, thuốc…
            </p>

            <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700">
              <li>AST – ALT: men gan, tăng khi tế bào gan tổn thương</li>
              <li>GGT: tăng trong bệnh gan do rượu</li>
              <li>Bilirubin: liên quan vàng da, tắc mật</li>
              <li>Albumin: đánh giá khả năng tổng hợp của gan</li>
            </ul>
          </div>

          {/* THẬN */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-sky-700">2. Chức năng thận</h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Thận duy trì cân bằng nước – điện giải và đào thải chất độc. 
              Xét nghiệm thận giúp đánh giá sớm suy thận và tiến triển bệnh.
            </p>

            <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700">
              <li>Ure tăng khi mất nước hoặc suy thận</li>
              <li>Creatinine: chỉ số đánh giá mức lọc thận</li>
              <li>eGFR: phân loại mức độ suy thận</li>
              <li>Acid Uric: tăng trong gout</li>
            </ul>
          </div>

          {/* ĐƯỜNG HUYẾT */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-sky-700">3. Đường huyết & chuyển hóa</h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Đường huyết phản ánh khả năng điều hòa glucose của cơ thể. Là xét nghiệm quan trọng trong tầm soát đái tháo đường.
            </p>

            <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700">
              <li>Glucose lúc đói</li>
              <li>Nghiệm pháp dung nạp đường</li>
              <li>HbA1c – phản ánh đường huyết 3 tháng</li>
            </ul>
          </div>

          {/* ĐIỆN GIẢI */}
          <div>
            <h2 className="text-3xl font-bold text-sky-700">4. Điện giải & ion</h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Điện giải giúp duy trì nhịp tim, huyết áp, chức năng cơ và thần kinh.
            </p>

            <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700">
              <li>Natri (Na⁺): điều hòa huyết áp</li>
              <li>Kali (K⁺): ảnh hưởng trực tiếp nhịp tim</li>
              <li>Clor (Cl⁻): cân bằng acid – base</li>
              <li>Canxi & Magie: quan trọng trong co cơ</li>
            </ul>
          </div>

        </div>
      </section>


      {/* WHEN TO TEST */}
      <section className="py-16 container mx-auto px-6 max-w-5xl">
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-red-700">📌 Khi nào nên xét nghiệm sinh hóa?</h2>
          <ul className="mt-3 list-disc pl-6 text-slate-700 space-y-2">
            <li>Triệu chứng: mệt mỏi, vàng da, đau bụng, phù chân, tiểu ít</li>
            <li>Bệnh nền: đái tháo đường, gan nhiễm mỡ, tăng huyết áp, tim mạch</li>
            <li>Trước phẫu thuật hoặc dùng thuốc kéo dài</li>
            <li>Kiểm tra sức khỏe định kỳ 6–12 tháng</li>
          </ul>
        </div>
      </section>


      {/* LAST MESSAGE */}
      <section className="pb-20 container mx-auto px-6 max-w-5xl">
        <div className="p-6 bg-sky-100 border border-sky-300 rounded-xl text-sky-900 shadow-sm">
          <p className="leading-relaxed">
            🔎 <b>Lời khuyên:{" "}</b>  
            Xét nghiệm sinh hóa là công cụ quan trọng giúp phát hiện bệnh sớm.
            Nên thực hiện định kỳ và kết hợp tư vấn bác sĩ để theo dõi sức khỏe toàn diện.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
