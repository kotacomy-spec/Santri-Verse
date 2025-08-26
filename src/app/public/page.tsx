import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  IconSchool,
  IconBook,
  IconCalendar,
  IconUsers,
  IconAward,
  IconMapPin,
  IconPhone,
  IconMail
} from '@tabler/icons-react';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white'>
      {/* Header */}
      <header className='bg-white shadow-sm'>
        <div className='container mx-auto flex items-center justify-between px-4 py-4'>
          <div className='flex items-center space-x-3'>
            <IconSchool className='h-10 w-10 text-blue-600' />
            <div>
              <h1 className='text-xl font-bold text-gray-900'>
                SD Muhammadiyah 20 Surabaya
              </h1>
              <p className='text-sm text-gray-600'>
                Membentuk Generasi Berkarakter dan Berprestasi
              </p>
            </div>
          </div>
          <nav className='hidden space-x-6 md:flex'>
            <Link href='/public' className='font-medium text-blue-600'>
              Beranda
            </Link>
            <Link
              href='/public/about'
              className='text-gray-600 hover:text-blue-600'
            >
              Tentang Kami
            </Link>
            <Link
              href='/public/berita'
              className='text-gray-600 hover:text-blue-600'
            >
              Berita
            </Link>
            <Link
              href='/public/kegiatan'
              className='text-gray-600 hover:text-blue-600'
            >
              Kegiatan
            </Link>
            <Link
              href='/public/kontak'
              className='text-gray-600 hover:text-blue-600'
            >
              Kontak
            </Link>
          </nav>
          <Button asChild>
            <Link href='/auth/sign-in'>Login</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className='bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white md:py-24'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='mb-6 text-4xl font-bold md:text-6xl'>
            Selamat Datang di SD Muhammadiyah 20 Surabaya
          </h1>
          <p className='mx-auto mb-8 max-w-3xl text-xl md:text-2xl'>
            Membentuk generasi berkarakter, berprestasi, dan berakhlak mulia
            sejak dini
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Button
              asChild
              size='lg'
              className='bg-white text-blue-600 hover:bg-gray-100'
            >
              <Link href='/public/pendaftaran'>Daftar Sekarang</Link>
            </Button>
            <Button
              asChild
              size='lg'
              variant='outline'
              className='border-white text-white hover:bg-white/10'
            >
              <Link href='/public/about'>Pelajari Lebih Lanjut</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='mb-12 text-center text-3xl font-bold'>
            Mengapa Memilih Kami?
          </h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <Card>
              <CardHeader>
                <IconBook className='mb-4 h-12 w-12 text-blue-600' />
                <CardTitle>Kurikulum Terbaik</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Kurikulum yang dirancang untuk mengembangkan potensi akademik
                  dan non-akademik siswa secara seimbang.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <IconUsers className='mb-4 h-12 w-12 text-blue-600' />
                <CardTitle>Guru Profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Didukung oleh tenaga pendidik yang berkualifikasi tinggi dan
                  berpengalaman dalam mendidik anak.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <IconAward className='mb-4 h-12 w-12 text-blue-600' />
                <CardTitle>Prestasi Terbaik</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Banyak prestasi yang diraih oleh siswa kami di tingkat kota,
                  provinsi, dan nasional.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className='bg-gray-50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='mb-8 flex items-center justify-between'>
            <h2 className='text-3xl font-bold'>Berita Terkini</h2>
            <Button asChild variant='outline'>
              <Link href='/public/berita'>Lihat Semua</Link>
            </Button>
          </div>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <img
                  src={`https://placehold.co/400x200/${item % 2 === 0 ? '3b82f6' : '1d4ed8'}/white?text=Berita+${item}`}
                  alt={`Berita ${item}`}
                  className='h-48 w-full rounded-t-lg object-cover'
                />
                <CardHeader>
                  <CardTitle className='text-lg'>
                    Perayaan Hari Pendidikan Nasional
                  </CardTitle>
                  <CardDescription>10 Mei 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-600'>
                    SD Muhammadiyah 20 Surabaya merayakan Hari Pendidikan
                    Nasional dengan berbagai kegiatan menarik...
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='mb-12 text-center text-3xl font-bold'>Hubungi Kami</h2>
          <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
            <div>
              <h3 className='mb-6 text-2xl font-semibold'>Informasi Kontak</h3>
              <div className='space-y-4'>
                <div className='flex items-start'>
                  <IconMapPin className='mt-1 mr-3 h-6 w-6 text-blue-600' />
                  <div>
                    <h4 className='font-medium'>Alamat</h4>
                    <p className='text-gray-600'>
                      Jl. Raya Kendalsari No. 20, Surabaya, Jawa Timur 60291
                    </p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <IconPhone className='mt-1 mr-3 h-6 w-6 text-blue-600' />
                  <div>
                    <h4 className='font-medium'>Telepon</h4>
                    <p className='text-gray-600'>(031) 12345678</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <IconMail className='mt-1 mr-3 h-6 w-6 text-blue-600' />
                  <div>
                    <h4 className='font-medium'>Email</h4>
                    <p className='text-gray-600'>info@sdmuh20-sby.sch.id</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className='mb-6 text-2xl font-semibold'>Kirim Pesan</h3>
              <form className='space-y-4'>
                <div>
                  <label
                    htmlFor='name'
                    className='mb-1 block text-sm font-medium text-gray-700'
                  >
                    Nama
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    placeholder='Nama Anda'
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='mb-1 block text-sm font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    placeholder='email@contoh.com'
                  />
                </div>
                <div>
                  <label
                    htmlFor='message'
                    className='mb-1 block text-sm font-medium text-gray-700'
                  >
                    Pesan
                  </label>
                  <textarea
                    id='message'
                    rows={4}
                    className='w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    placeholder='Tulis pesan Anda...'
                  ></textarea>
                </div>
                <Button type='submit' className='w-full'>
                  Kirim Pesan
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 py-12 text-white'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
            <div>
              <div className='mb-4 flex items-center space-x-3'>
                <IconSchool className='h-8 w-8 text-blue-400' />
                <span className='text-xl font-bold'>SD Muhammadiyah 20</span>
              </div>
              <p className='text-gray-400'>
                Membentuk generasi berkarakter dan berprestasi sejak dini.
              </p>
            </div>
            <div>
              <h3 className='mb-4 text-lg font-semibold'>Tautan Cepat</h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/public'
                    className='text-gray-400 hover:text-white'
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    href='/public/about'
                    className='text-gray-400 hover:text-white'
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href='/public/berita'
                    className='text-gray-400 hover:text-white'
                  >
                    Berita
                  </Link>
                </li>
                <li>
                  <Link
                    href='/public/kegiatan'
                    className='text-gray-400 hover:text-white'
                  >
                    Kegiatan
                  </Link>
                </li>
                <li>
                  <Link
                    href='/public/kontak'
                    className='text-gray-400 hover:text-white'
                  >
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='mb-4 text-lg font-semibold'>Program</h3>
              <ul className='space-y-2'>
                <li>
                  <Link href='#' className='text-gray-400 hover:text-white'>
                    TK
                  </Link>
                </li>
                <li>
                  <Link href='#' className='text-gray-400 hover:text-white'>
                    SD
                  </Link>
                </li>
                <li>
                  <Link href='#' className='text-gray-400 hover:text-white'>
                    Program Ekstrakurikuler
                  </Link>
                </li>
                <li>
                  <Link href='#' className='text-gray-400 hover:text-white'>
                    Program Beasiswa
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='mb-4 text-lg font-semibold'>Hubungi Kami</h3>
              <address className='text-gray-400 not-italic'>
                <p>Jl. Raya Kendalsari No. 20</p>
                <p>Surabaya, Jawa Timur 60291</p>
                <p className='mt-2'>Telp: (031) 12345678</p>
                <p>Email: info@sdmuh20-sby.sch.id</p>
              </address>
            </div>
          </div>
          <div className='mt-8 border-t border-gray-800 pt-8 text-center text-gray-400'>
            <p>
              &copy; {new Date().getFullYear()} SD Muhammadiyah 20 Surabaya. Hak
              Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
