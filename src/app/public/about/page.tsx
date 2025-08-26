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
  IconUsers,
  IconAward,
  IconBook,
  IconHeart,
  IconTarget,
  IconChevronRight
} from '@tabler/icons-react';

export default function AboutPage() {
  const historyData = [
    {
      year: '1985',
      title: 'Berdiri',
      description:
        'SD Muhammadiyah 20 Surabaya didirikan dengan visi membentuk generasi berkarakter.'
    },
    {
      year: '1995',
      title: 'Pengembangan Kurikulum',
      description:
        'Mengembangkan kurikulum unggulan yang seimbang antara akademik dan karakter.'
    },
    {
      year: '2005',
      title: 'Ekspansi Fasilitas',
      description:
        'Menambah fasilitas belajar mengajar dan laboratorium untuk mendukung pembelajaran.'
    },
    {
      year: '2015',
      title: 'Prestasi Nasional',
      description:
        'Mendapatkan pengakuan nasional atas prestasi akademik dan non-akademik siswa.'
    },
    {
      year: '2023',
      title: 'Teknologi Pendidikan',
      description:
        'Mengintegrasikan teknologi dalam proses pembelajaran untuk meningkatkan kualitas pendidikan.'
    }
  ];

  const values = [
    {
      icon: IconHeart,
      title: 'Kasih Sayang',
      description:
        'Mendidik dengan penuh kasih sayang dan perhatian terhadap setiap siswa.'
    },
    {
      icon: IconBook,
      title: 'Kepedulian',
      description: 'Mengembangkan rasa peduli terhadap sesama dan lingkungan.'
    },
    {
      icon: IconTarget,
      title: 'Keteladanan',
      description: 'Menjadi teladan dalam sikap, perilaku, dan akhlak mulia.'
    },
    {
      icon: IconAward,
      title: 'Kesungguhan',
      description:
        'Menjalani segala aktivitas dengan kesungguhan dan ketekunan.'
    }
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
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
            <Link href='/public' className='text-gray-600 hover:text-blue-600'>
              Beranda
            </Link>
            <Link href='/public/about' className='font-medium text-blue-600'>
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
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='mb-6 text-4xl font-bold md:text-5xl'>
              Tentang SD Muhammadiyah 20 Surabaya
            </h1>
            <p className='mb-8 text-xl'>
              Sebuah lembaga pendidikan dasar yang berkomitmen untuk membentuk
              generasi berkarakter, berprestasi, dan berakhlak mulia sejak dini.
            </p>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-4xl'>
            <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
              <div>
                <h2 className='mb-6 text-3xl font-bold text-gray-900'>Visi</h2>
                <p className='text-lg text-gray-700'>
                  Menjadi lembaga pendidikan dasar unggulan yang menghasilkan
                  generasi berkarakter, berprestasi, dan berakhlak mulia.
                </p>
              </div>
              <div>
                <h2 className='mb-6 text-3xl font-bold text-gray-900'>Misi</h2>
                <ul className='space-y-4'>
                  <li className='flex items-start'>
                    <IconChevronRight className='mt-1 mr-2 h-5 w-5 flex-shrink-0 text-blue-600' />
                    <span className='text-gray-700'>
                      Menyelenggarakan pendidikan berkualitas yang berlandaskan
                      nilai-nilai Islam.
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <IconChevronRight className='mt-1 mr-2 h-5 w-5 flex-shrink-0 text-blue-600' />
                    <span className='text-gray-700'>
                      Mengembangkan potensi akademik dan non-akademik siswa
                      secara seimbang.
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <IconChevronRight className='mt-1 mr-2 h-5 w-5 flex-shrink-0 text-blue-600' />
                    <span className='text-gray-700'>
                      Membentuk karakter dan akhlak mulia melalui pembiasaan
                      nilai-nilai Muhammadiyah.
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <IconChevronRight className='mt-1 mr-2 h-5 w-5 flex-shrink-0 text-blue-600' />
                    <span className='text-gray-700'>
                      Menciptakan lingkungan sekolah yang kondusif dan
                      menyenangkan untuk belajar.
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <IconChevronRight className='mt-1 mr-2 h-5 w-5 flex-shrink-0 text-blue-600' />
                    <span className='text-gray-700'>
                      Mengembangkan kreativitas dan inovasi dalam proses
                      pembelajaran.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className='bg-gray-50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-4xl'>
            <h2 className='mb-12 text-center text-3xl font-bold text-gray-900'>
              Sejarah Kami
            </h2>
            <div className='relative'>
              {/* Vertical line */}
              <div className='absolute top-0 bottom-0 left-4 w-0.5 transform bg-blue-200 md:left-1/2 md:-translate-x-1/2'></div>

              {/* Timeline items */}
              {historyData.map((item, index) => (
                <div
                  key={item.year}
                  className={`mb-12 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  <div className='mb-4 md:mb-0 md:w-1/2'>
                    <div
                      className={`rounded-lg bg-white p-6 shadow-md ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
                    >
                      <span className='mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600'>
                        {item.year}
                      </span>
                      <h3 className='mb-2 text-xl font-bold text-gray-900'>
                        {item.title}
                      </h3>
                      <p className='text-gray-700'>{item.description}</p>
                    </div>
                  </div>
                  <div className='z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white md:absolute md:left-1/2 md:-translate-x-1/2 md:transform'>
                    {index + 1}
                  </div>
                  <div className='md:w-1/2'></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-4xl'>
            <h2 className='mb-12 text-center text-3xl font-bold text-gray-900'>
              Nilai-Nilai Inti
            </h2>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 p-3'>
                        <Icon className='h-6 w-6 text-blue-600' />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{value.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className='bg-gray-50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-4xl'>
            <h2 className='mb-12 text-center text-3xl font-bold text-gray-900'>
              Kepemimpinan
            </h2>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
              <Card>
                <div className='p-6'>
                  <div className='mx-auto mb-4 h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200' />
                  <CardHeader className='p-0 text-center'>
                    <CardTitle>Kepala Sekolah</CardTitle>
                    <CardDescription className='mt-2'>
                      Drs. Budi Santoso, M.Pd
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='mt-4 p-0 text-center'>
                    <p className='text-sm text-gray-700'>
                      Berpengalaman lebih dari 20 tahun dalam bidang pendidikan
                      dasar.
                    </p>
                  </CardContent>
                </div>
              </Card>
              <Card>
                <div className='p-6'>
                  <div className='mx-auto mb-4 h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200' />
                  <CardHeader className='p-0 text-center'>
                    <CardTitle>Wakil Kurikulum</CardTitle>
                    <CardDescription className='mt-2'>
                      Dra. Siti Aminah, M.Pd
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='mt-4 p-0 text-center'>
                    <p className='text-sm text-gray-700'>
                      Ahli dalam pengembangan kurikulum dan inovasi
                      pembelajaran.
                    </p>
                  </CardContent>
                </div>
              </Card>
              <Card>
                <div className='p-6'>
                  <div className='mx-auto mb-4 h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200' />
                  <CardHeader className='p-0 text-center'>
                    <CardTitle>Wakil Kesiswaan</CardTitle>
                    <CardDescription className='mt-2'>
                      Dedi Kusnadi, S.Pd
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='mt-4 p-0 text-center'>
                    <p className='text-sm text-gray-700'>
                      Fokus pada pengembangan karakter dan pembinaan siswa.
                    </p>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='mb-6 text-3xl font-bold md:text-4xl'>
            Bergabung dengan Kami
          </h2>
          <p className='mx-auto mb-8 max-w-2xl text-xl'>
            Jadikan anak Anda bagian dari komunitas pendidikan unggulan kami
            yang telah membentuk generasi berkualitas selama lebih dari 35
            tahun.
          </p>
          <Button
            asChild
            size='lg'
            className='bg-white text-blue-600 hover:bg-gray-100'
          >
            <Link href='/public/pendaftaran'>Daftar Sekarang</Link>
          </Button>
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
                  <Link href='/public/about' className='text-blue-400'>
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
