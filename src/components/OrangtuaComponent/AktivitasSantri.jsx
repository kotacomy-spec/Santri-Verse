const AktivitasSementara = [
  {
    title: "Mengikuti Kajian Pagi",
    waktu: "08.00 WIB",
    variant: "text-green-700",
  },
  {
    title: "Setor Hafalan",
    waktu: "10.30 WIB",
    variant: "text-blue-700",
  },
  {
    title: "Mengikuti Pelajaran Bahasa Arab",
    waktu: "13.30 WIB",
    variant: "text-purple-700",
  },
];

export default function AktivitasSantri() {
  return (
    <>
      <div className="mx-4 p-6 border rounded-xl shadow">
        <h1 className="text-xl font-semibold">Aktivitas Terbaru</h1>
        {AktivitasSementara.map(function (aktivitas) {
          return (
            <div  className="flex items-start justify-start py-2 gap-2">
              <span className={`text-3xl ${aktivitas.variant}`}>•</span>
              <div className="flex flex-col">
                <h3>{aktivitas.title}</h3>
                <p className=" text-sm text-gray-600">{aktivitas.waktu}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
