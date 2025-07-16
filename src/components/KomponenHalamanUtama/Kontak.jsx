import { Clock, Mail, MapPin, Phone } from "lucide-react";

const Kontak = () => {
  return (
    <>
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-600 mb-4">
              Hubungi Kami
            </h2>
            <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
              Siap memulai perjalanan pendidikan di Santriverse? Hubungi kami
              untuk informasi lebih lanjut
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-emerald-600">
                    Telepon
                  </h4>
                  <p className="text-emerald-700">+62 123 4567 8900</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-emerald-600">
                    Email
                  </h4>
                  <p className="text-emerald-700">info@santriverse.ac.id</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-emerald-600">
                    Alamat
                  </h4>
                  <p className="text-emerald-700">
                    JL. Ambatron, RT.03/RW.01, Sigma, Kec.Ohio,Kabupaten
                    Ambatukam, Android Selatan
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-emerald-600">
                    Jam Operasional
                  </h4>
                  <p className="text-emerald-700">
                    Senin - Jumat: 08:00 - 16:00
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-emerald-600 mb-6">
                Kirim Pesan
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <textarea
                  placeholder="Pesan Anda"
                  rows="4"
                  className="w-full p-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                ></textarea>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Kirim Pesan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Kontak;
