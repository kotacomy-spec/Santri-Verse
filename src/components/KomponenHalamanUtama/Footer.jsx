import {
  BookOpenText,
  Facebook,
  Instagram,
  Phone,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white mx-4 sm:mx-20 my-6 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-3">
            Siap mendaftarkan anak Anda ke pesantren?
          </h2>
          <p className="text-lg leading-relaxed opacity-90 mb-6">
            Klik tombol di bawah untuk mulai proses pendaftaran dengan mudah dan
            cepat.
          </p>
          <button className="bg-white text-teal-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-md cursor-pointer">
            Daftar Sekarang!
          </button>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <BookOpenText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Santri Verse</h3>
              </div>
              <p className="text-gray-400 mb-4">
                JL. Ambatron, RT.03/RW.01, Sigma, Kec.Ohio,Kabupaten Ambatukam,
                Android Selatan
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>(0888-307-7077)</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Layanan Informasi</h4>
              <div className="space-y-2 text-gray-400">
                <p>0813-3622-2034 (Raiden Shogun)</p>
                <p>0821-4639-3907 (Nahida)</p>
                <p>0852-5880-0137 (Alhaitham)</p>
                <p>0822-4633-5137 (Furina)</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Media Sosial</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                  <Youtube className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>©Santri Verse</p>
            <p className="mt-1">
              Dikembangkan oleh{" "}
              <span className="text-gray-300 font-medium">Naufal</span> &amp;{" "}
              <span className="text-gray-300 font-medium">Dias</span> – SMKN 8
              Malang
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
