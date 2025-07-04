import { Home, ArrowLeft, BookOpen } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-green-100 rounded-full flex items-center justify-center border-4 border-green-200">
            <BookOpen className="w-16 h-16 text-green-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">!</span>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-6xl font-bold text-green-700 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-green-600 text-lg leading-relaxed">
            Maaf, halaman yang Anda cari tidak dapat ditemukan dalam sistem
            pesantren kami.
          </p>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </button>

          <button className="w-full bg-white hover:bg-green-50 text-green-600 font-medium py-3 px-6 rounded-lg border-2 border-green-200 hover:border-green-300 transition-colors duration-200 flex items-center justify-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Halaman Sebelumnya
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-green-200">
          <p className="text-green-600 text-sm mb-4">
            Atau kunjungi halaman lain:
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
            >
              Santri
            </a>
            <a
              href="#"
              className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
            >
              Keuangan
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-green-500 text-xs">
            © 2025 Sistem Manajemen Pesantren
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
