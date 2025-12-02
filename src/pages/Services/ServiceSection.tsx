// src/pages/Services/ServiceSection.tsx
import { motion } from "framer-motion";
import {
    BeakerIcon,
    HeartIcon,
    FireIcon,

} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function ServiceSection() {
    return (
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
                        drop-shadow-[0_4px_20px_rgba(56,189,248,0.25)]
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

                {/* GRID 6 CARDS */}
                <div className="grid md:grid-cols-3 gap-10">

                    {[
                        {
                            title: "Xét Nghiệm Máu Tổng Quát (CBC)",
                            desc: "Đo lường hồng cầu, bạch cầu, tiểu cầu — phát hiện thiếu máu, nhiễm trùng, rối loạn huyết học.",
                            icon: FireIcon,
                            link: "/service/cbc"
                        },
                        {
                            title: "Sinh Hóa Máu Chuyên Sâu",
                            desc: "Đánh giá chức năng gan, thận, điện giải, enzyme, mỡ máu theo chuẩn quốc tế ISO 15189.",
                            icon: BeakerIcon,
                            link: "/service/sinh-hoa"
                        },
                        
                        {
                            title: "Đánh Giá Nguy Cơ Tim Mạch",
                            desc: "Phân tích lipid, CRP, Homocysteine nhằm phát hiện sớm nguy cơ nhồi máu & xơ vữa.",
                            icon: HeartIcon,
                            link: "/service/tim-mach"
                        },
                    ]
                        .map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                
                                className="
                                    p-10 rounded-2xl
                                    bg-white/40 backdrop-blur-xl
                                    border border-white/60
                                    shadow-[0_10px_35px_rgba(0,40,90,0.10)]
                                   
                                    transition-all duration-300
                                    flex flex-col
                                "
                            >

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

                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed mb-6">{item.desc}</p>

                                <Link to={item.link} className="mt-auto">
                                    <button
                                        className="
                                            w-full
                                            px-5 py-2 rounded-lg text-sm font-semibold
                                            text-cyan-700 border border-cyan-400
                                            hover:bg-cyan-500 hover:text-white
                                            transition-all duration-300
                                            "
                                    >
                                        Đọc thêm →
                                    </button>
                                </Link>


                            </motion.div>
                        ))}

                </div>
            </div>
        </section>
    );
}
