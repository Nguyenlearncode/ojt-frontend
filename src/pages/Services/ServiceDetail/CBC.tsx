import Header from "../../../components/HomePage/Header";
import Footer from "../../../components/HomePage/Footer";

export default function CBC() {
  return (
    <div className="font-sans bg-white text-slate-800">

      <Header scrolled={true} />

      <section className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-sky-700">
          Xét Nghiệm Máu Tổng Quát (CBC)
        </h1>

        {/* MAIN IMAGE */}
        <div className="mt-6">
          <img
            src="/image/CBC1.jpg"
            alt="CBC Test"
            className="rounded-xl shadow-lg w-full"
          />
        </div>

        {/* INTRO */}
        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
          CBC (<b>Complete Blood Count</b>) là xét nghiệm máu tổng quát giúp đánh giá
          <b> toàn diện tình trạng sức khỏe</b> thông qua 3 thành phần chính của máu:
          <b> hồng cầu – bạch cầu – tiểu cầu</b>. Đây là xét nghiệm phổ biến nhất trong y khoa,
          thường dùng để tầm soát bệnh, theo dõi điều trị và phát hiện sớm nhiều rối loạn quan trọng
          như thiếu máu, viêm nhiễm hay các bệnh về máu.
        </p>

        {/* SECTION */}
        <h2 className="mt-10 text-3xl font-bold text-sky-700">1. CBC gồm những chỉ số nào?</h2>
        <p className="mt-3 text-slate-700">
          CBC không chỉ đo số lượng tế bào máu mà còn đánh giá <b>kích thước, thể tích, nồng độ hemoglobin</b>…
          giúp phân tích sâu hơn tình trạng máu của cơ thể.
        </p>

        {/* GRID IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div className="text-center">
            <img
              src="/image/RBC.jpg"
              alt="RBC"
              className="rounded-lg shadow-md w-full h-40 object-cover"
            />
            <p className="mt-2 font-semibold text-sky-700">Hồng cầu (RBC)</p>
          </div>

          <div className="text-center">
            <img
              src="/image/WBC.jpg"
              alt="WBC"
              className="rounded-lg shadow-md w-full h-40 object-cover"
            />
            <p className="mt-2 font-semibold text-sky-700">Bạch cầu (WBC)</p>
          </div>

          <div className="text-center">
            <img
              src="/image/PLT.jpg"
              alt="Platelet"
              className="rounded-lg shadow-md w-full h-40 object-cover"
            />
            <p className="mt-2 font-semibold text-sky-700">Tiểu cầu (PLT)</p>
          </div>
        </div>

        {/* RBC */}
        <h3 className="mt-10 text-2xl font-bold text-sky-700">🔴 Hồng cầu (RBC)</h3>
        <p className="mt-2 leading-relaxed text-slate-700">
          Hồng cầu có nhiệm vụ vận chuyển <b>oxy</b> từ phổi đến các mô trong cơ thể và mang <b>CO₂</b> trở lại phổi.
          Đây là thành phần chiếm số lượng lớn nhất trong máu và có vai trò duy trì sự sống của tế bào.
          <br /><br />
          Một số chỉ số quan trọng liên quan đến hồng cầu:
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-700">
          <li><b>RBC (Số lượng hồng cầu):</b> Phản ánh tổng số hồng cầu đang lưu thông.</li>
          <li><b>Hb (Hemoglobin):</b> Cho biết khả năng mang oxy của máu. Là chỉ số quan trọng nhất để chẩn đoán thiếu máu.</li>
          <li><b>Hct (Hematocrit):</b> Tỷ lệ thể tích khối hồng cầu trong máu.</li>
          <li><b>MCV:</b> Thể tích trung bình hồng cầu – giúp phân loại thiếu máu.</li>
          <li><b>MCH, MCHC:</b> Lượng hemoglobin trung bình trong hồng cầu.</li>
          <li><b>RDW:</b> Độ phân bố kích thước hồng cầu – tăng trong thiếu máu hỗn hợp.</li>
        </ul>

        <p className="mt-3 leading-relaxed text-slate-700">
          🔽 <b>Giảm RBC/Hb/Hct</b> thường gặp trong:
        </p>

        <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-700">
          <li>Thiếu máu thiếu sắt, thiếu B12 hoặc folate</li>
          <li>Xuất huyết cấp hoặc mạn</li>
          <li>Bệnh lý tủy xương</li>
          <li>Thalassemia (tan máu bẩm sinh)</li>
        </ul>

        <p className="mt-3 leading-relaxed text-slate-700">
          🔼 <b>Tăng RBC</b> có thể gặp ở:
        </p>

        <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-700">
          <li>Mất nước</li>
          <li>Bệnh đa hồng cầu (polycythemia vera)</li>
          <li>Sống ở vùng núi cao</li>
          <li>Người hút thuốc lá nhiều</li>
        </ul>

        {/* WBC */}
        <h3 className="mt-10 text-2xl font-bold text-sky-700">⚪ Bạch cầu (WBC)</h3>
        <p className="mt-2 leading-relaxed text-slate-700">
          Bạch cầu là “hệ thống phòng thủ” của cơ thể, giúp chống lại vi khuẩn, virus, ký sinh trùng và tác nhân gây viêm.
          CBC đo tổng số bạch cầu và từng loại bạch cầu trong công thức bạch cầu (<b>WBC Differential</b>).
        </p>

        <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-700">
          <li><b>Neutrophils (Đoạn trung tính):</b> Tăng trong nhiễm trùng vi khuẩn cấp.</li>
          <li><b>Lymphocytes (Lympho):</b> Tăng trong nhiễm virus; giảm trong suy giảm miễn dịch.</li>
          <li><b>Monocytes:</b> Tăng trong viêm mạn, lupus, lao.</li>
          <li><b>Eosinophils:</b> Tăng trong dị ứng, hen suyễn, nhiễm ký sinh trùng.</li>
          <li><b>Basophils:</b> Tăng trong rối loạn tủy xương.</li>
        </ul>

        <p className="mt-4 leading-relaxed text-slate-700">
          🔼 <b>Tăng WBC</b> thường gặp trong:
        </p>

        <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-700">
          <li>Nhiễm trùng cấp (đặc biệt vi khuẩn)</li>
          <li>Viêm cấp/mạn</li>
          <li>Stress, mất nước</li>
          <li>Bệnh bạch cầu cấp/mạn (leukemia)</li>
        </ul>

        <p className="mt-3 leading-relaxed text-slate-700">
          🔽 <b>Giảm WBC</b> có thể do:
        </p>

        <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-700">
          <li>Suy tủy xương (aplastic anemia)</li>
          <li>Nhiễm virus (đặc biệt dengue, hepatitis, HIV)</li>
          <li>Tác dụng phụ hóa trị, xạ trị</li>
          <li>Suy dinh dưỡng nặng</li>
        </ul>

        {/* PLATELET */}
        <h3 className="mt-10 text-2xl font-bold text-sky-700">🟡 Tiểu cầu (PLT)</h3>
        <p className="mt-2 leading-relaxed text-slate-700">
          Tiểu cầu có nhiệm vụ <b>đông máu</b> và ngăn ngừa xuất huyết.
          Xét nghiệm PLT giúp phát hiện nguy cơ chảy máu hoặc hình thành cục máu đông.
        </p>

        <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-700">
          <li><b>PLT thấp:</b> xuất huyết dưới da, bầm tím tự nhiên, chảy máu chân răng, chảy máu mũi.</li>
          <li><b>PLT cao:</b> tăng nguy cơ tắc mạch, nhồi máu tim, đột quỵ.</li>
        </ul>

        <p className="mt-3 leading-relaxed text-slate-700">
          Một số bệnh lý liên quan đến tiểu cầu:
        </p>

        <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-700">
          <li>Giảm tiểu cầu miễn dịch (ITP)</li>
          <li>Sốt xuất huyết Dengue</li>
          <li>Bệnh lý tủy xương (myelofibrosis, leukemia)</li>
          <li>Thiếu sắt (PLT có thể tăng bù trừ)</li>
        </ul>


        {/* SECTION WHEN TO DO */}
        <h2 className="mt-12 text-3xl font-bold text-sky-700">2. Khi nào cần xét nghiệm CBC?</h2>

        <ul className="list-disc pl-6 mt-4 space-y-3 text-slate-700">
          <li>Khi có dấu hiệu thiếu máu: mệt mỏi, chóng mặt, da xanh, đánh trống ngực.</li>
          <li>Nghi ngờ nhiễm trùng: sốt, gai lạnh, đau họng, viêm phổi, nhiễm trùng tiểu.</li>
          <li>Theo dõi bệnh mãn tính: suy thận, bệnh gan, bệnh tự miễn.</li>
          <li>Trước phẫu thuật để kiểm tra tình trạng máu.</li>
          <li>Khi có biểu hiện bầm tím bất thường, chảy máu kéo dài.</li>
          <li>Theo dõi tác dụng phụ của thuốc ức chế miễn dịch, hóa trị.</li>
          <li>Kiểm tra sức khỏe tổng quát định kỳ (6–12 tháng/lần).</li>
        </ul>


        {/* BENEFITS */}
        <h2 className="mt-12 text-3xl font-bold text-sky-700">3. CBC giúp phát hiện những bệnh gì?</h2>

        <p className="mt-3 leading-relaxed text-slate-700">
          Xét nghiệm CBC là công cụ <b>đầu tay</b> trong chẩn đoán các bệnh lý về máu và nhiều bệnh toàn thân:
        </p>

        <ul className="list-disc pl-6 mt-3 space-y-3 text-slate-700">
          <li>Các loại thiếu máu: thiếu sắt, thiếu B12, thiếu folate, tan máu.</li>
          <li>Nhiễm trùng cấp/mạn: vi khuẩn, virus, ký sinh trùng.</li>
          <li>Bệnh lý viêm: viêm khớp, viêm hệ thống, bệnh tự miễn.</li>
          <li>Ung thư máu (leukemia), lymphoma.</li>
          <li>Rối loạn đông máu, xuất huyết giảm tiểu cầu.</li>
          <li>Bệnh lý tủy xương: suy tủy, loạn sản tủy, đa hồng cầu.</li>
          <li>Đánh giá tác dụng phụ của thuốc ảnh hưởng tủy xương.</li>
        </ul>

        {/* HOW IT'S DONE */}
        <h2 className="mt-12 text-3xl font-bold text-sky-700">4. Quy trình thực hiện xét nghiệm CBC</h2>

        <p className="mt-3 leading-relaxed text-slate-700">
          Quy trình xét nghiệm CBC rất nhanh chóng, an toàn và gần như không gây đau:
        </p>

        <ol className="list-decimal pl-6 mt-3 space-y-3 text-slate-700">
          <li><b>Chuẩn bị:</b> Không cần nhịn ăn. Nghỉ ngơi 10–15 phút trước khi lấy máu.</li>
          <li><b>Lấy máu:</b> Máu tĩnh mạch được lấy bằng kim nhỏ tại khuỷu tay.</li>
          <li><b>Bảo quản mẫu:</b> Mẫu được cho vào ống EDTA có chất chống đông tím.</li>
          <li><b>Phân tích:</b> Máy huyết học tự động đếm và phân loại tế bào máu.</li>
          <li><b>Trả kết quả:</b> Sau 30–120 phút tùy theo quy trình phòng Lab.</li>
          <li><b>Tư vấn:</b> Bác sĩ giải thích bất thường và chỉ định xét nghiệm bổ sung nếu cần.</li>
        </ol>


        {/* LAST NOTE */}
        <p className="mt-10 p-5 bg-sky-50 border border-sky-200 rounded-xl text-sky-800 leading-relaxed">
          🔎 <b>Lời khuyên chuyên môn:</b><br /><br />
          CBC là xét nghiệm đơn giản nhưng cực kỳ quan trọng, có thể phát hiện sớm nhiều rối loạn trước khi
          xuất hiện triệu chứng lâm sàng. Để theo dõi sức khỏe tối ưu, người trưởng thành nên kiểm tra:
          <br /><br />
          • <b>Định kỳ 6 tháng/lần</b> nếu sức khỏe tốt. <br />
          • <b>3 tháng/lần</b> nếu có bệnh mạn tính (gan, thận, tim mạch, tự miễn). <br />
          • <b>Hằng tuần</b> đối với bệnh nhân hóa trị hoặc điều trị ức chế miễn dịch.
        </p>

      </section>

      <Footer />
    </div>
  );
}
