import { UserCheck, HeartPulse, AlertCircle, Activity } from "lucide-react";

const Fitur = () => {
  const fiturData = [
    {
      title: "Pantau Perizinan dan Aktivitas Anak",
      description:
        "Lihat status izin keluar, waktu kembali, dan riwayat aktivitas santri secara real-time tanpa perlu datang ke pesantren.",
      icon: UserCheck,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Lihat Catatan Pelanggaran",
      description:
        "Orang tua bisa melihat daftar pelanggaran yang pernah dilakukan anak beserta poin pelanggaran dan tindakan pembinaan yang diambil.",
      icon: AlertCircle,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Akses Data Kesehatan Santri",
      description:
        "Pantau kondisi kesehatan dan riwayat pengobatan anak di pesantren.",
      icon: HeartPulse,
      color: "from-emerald-600 to-teal-600",
    },
    {
      title: "Data Real-Time",
      description:
        "Semua informasi santri seperti izin, kesehatan, dan pelanggaran diperbarui secara otomatis tanpa perlu refresh.",
      icon: Activity,
      color: "from-emerald-600 to-teal-600",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-emerald-600">
            Fitur yang Didapat Orang Tua
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {fiturData.map((data, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div
                className={`w-16 h-16 bg-gradient-to-br ${data.color} flex items-center justify-center mb-4 rounded-lg `}
              >
                <data.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-emerald-600 mb-3">
                {data.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {data.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Fitur;
