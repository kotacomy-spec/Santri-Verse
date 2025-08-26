import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  IconSchool,
  IconCalendar,
  IconUser,
  IconTag,
  IconSearch,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react';

export default function BlogPage() {
  // Mock blog data
  const blogPosts = [
    {
      id: 1,
      title: 'Perayaan Hari Pendidikan Nasional di SD Muhammadiyah 20',
      excerpt:
        'Siswa-siswi SD Muhammadiyah 20 Surabaya merayakan Hari Pendidikan Nasional dengan berbagai kegiatan menarik yang bertujuan untuk meningkatkan semangat belajar.',
      date: '10 Mei 2024',
      author: 'Admin Sekolah',
      category: 'Kegiatan Sekolah',
      image:
        'https://placehold.co/600x300/3b82f6/white?text=Hari+Pendidikan+Nasional'
    },
    {
      id: 2,
      title: 'Prestasi Membanggakan dari Olimpiade Sains SD',
      excerpt:
        'Tim olimpiade sains SD Muhammadiyah 20 berhasil meraih juara kedua dalam Olimpiade Sains Tingkat Kota Surabaya. Prestasi ini menjadi bukti kualitas pendidikan di sekolah kami.',
      date: '5 Mei 2024',
      author: 'Tim Akademik',
      category: 'Prestasi',
      image: 'https://placehold.co/600x300/1d4ed8/white?text=Olimpiade+Sains'
    },
    {
      id: 3,
      title: 'Kegiatan Ekstrakurikuler Seni dan Budaya',
      excerpt:
        'Siswa-siswi SD Muhammadiyah 20 aktif mengikuti berbagai kegiatan ekstrakurikuler seni dan budaya yang bertujuan untuk mengembangkan bakat dan minat mereka di bidang seni.',
      date: '1 Mei 2024',
      author: 'Pembina Ekstrakurikuler',
      category: 'Ekstrakurikuler',
      image: 'https://placehold.co/600x300/6366f1/white?text=Seni+dan+Budaya'
    },
    {
      id: 4,
      title: 'Pelatihan Guru dalam Pemanfaatan Teknologi Pembelajaran',
      excerpt:
        'Guru-guru SD Muhammadiyah 20 mengikuti pelatihan intensif dalam pemanfaatan teknologi untuk meningkatkan kualitas pembelajaran di kelas.',
      date: '25 April 2024',
      author: 'Kepala Sekolah',
      category: 'Pengembangan Guru',
      image: 'https://placehold.co/600x300/8b5cf6/white?text=Pelatihan+Guru'
    },
    {
      id: 5,
      title: 'Peringatan Hari Kartini dengan Lomba Busana Adat',
      excerpt:
        'Dalam rangka memperingati Hari Kartini, SD Muhammadiyah 20 menyelenggarakan lomba busana adat yang diikuti dengan antusias oleh seluruh siswa.',
      date: '20 April 2024',
      author: 'Admin Sekolah',
      category: 'Kegiatan Sekolah',
      image: 'https://placehold.co/600x300/ec4899/white?text=Hari+Kartini'
    },
    {
      id: 6,
      title: 'Program Bantuan PIP untuk Siswa Kurang Mampu',
      excerpt:
        'SD Muhammadiyah 20 kembali melaksanakan program Bantuan Indonesia Pintar (PIP) untuk membantu siswa kurang mampu dalam membiayai pendidikan.',
      date: '15 April 2024',
      author: 'Tim Administrasi',
      category: 'Program Sosial',
      image: 'https://placehold.co/600x300/10b981/white?text=Bantuan+PIP'
    }
  ];

  const categories = [
    'Kegiatan Sekolah',
    'Prestasi',
    'Ekstrakurikuler',
    'Pengembangan Guru',
    'Program Sosial',
    'Fasilitas Sekolah'
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
            <Link
              href='/public/about'
              className='text-gray-600 hover:text-blue-600'
            >
              Tentang Kami
            </Link>
            <Link href='/public/berita' className='font-medium text-blue-600'>
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
              Berita dan Artikel
            </h1>
            <p className='mb-8 text-xl'>
              Temukan informasi terkini seputar kegiatan, prestasi, dan
              perkembangan di SD Muhammadiyah 20 Surabaya.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col gap-8 lg:flex-row'>
            {/* Main Content */}
            <div className='lg:w-2/3'>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                {blogPosts.map((post) => (
                  <Card key={post.id} className='flex flex-col'>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='h-48 w-full rounded-t-lg object-cover'
                    />
                    <CardHeader>
                      <div className='mb-2 flex items-center text-sm text-gray-500'>
                        <IconCalendar className='mr-1 h-4 w-4' />
                        <span>{post.date}</span>
                        <IconUser className='mr-1 ml-3 h-4 w-4' />
                        <span>{post.author}</span>
                      </div>
                      <CardTitle className='text-xl'>
                        <Link
                          href={`/public/berita/${post.id}`}
                          className='hover:text-blue-600'
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='flex-grow'>
                      <CardDescription className='mb-4'>
                        {post.excerpt}
                      </CardDescription>
                      <div className='flex items-center'>
                        <IconTag className='mr-1 h-4 w-4 text-gray-500' />
                        <span className='text-sm text-gray-500'>
                          {post.category}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className='mt-12 flex justify-center'>
                <nav className='flex items-center space-x-2'>
                  <Button variant='outline' size='sm' disabled>
                    <IconChevronLeft className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-blue-600 text-white'
                  >
                    1
                  </Button>
                  <Button variant='outline' size='sm'>
                    2
                  </Button>
                  <Button variant='outline' size='sm'>
                    3
                  </Button>
                  <Button variant='outline' size='sm'>
                    <IconChevronRight className='h-4 w-4' />
                  </Button>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <div className='lg:w-1/3'>
              {/* Search */}
              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle className='text-lg'>Cari Artikel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='relative'>
                    <Input
                      placeholder='Masukkan kata kunci...'
                      className='pl-10'
                    />
                    <IconSearch className='absolute top-2.5 left-3 h-4 w-4 text-gray-400' />
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className='mb-8'>
                <CardHeader>
                  <CardTitle className='text-lg'>Kategori</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2'>
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link
                          href='#'
                          className='flex items-center justify-between text-gray-700 hover:text-blue-600'
                        >
                          <span>{category}</span>
                          <span className='rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800'>
                            {Math.floor(Math.random() * 10) + 1}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Artikel Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-4'>
                    {blogPosts.slice(0, 3).map((post) => (
                      <li key={post.id} className='flex items-start'>
                        <img
                          src={post.image}
                          alt={post.title}
                          className='mr-4 h-16 w-16 rounded object-cover'
                        />
                        <div>
                          <Link
                            href={`/public/berita/${post.id}`}
                            className='line-clamp-2 font-medium text-gray-900 hover:text-blue-600'
                          >
                            {post.title}
                          </Link>
                          <div className='mt-1 flex items-center text-xs text-gray-500'>
                            <IconCalendar className='mr-1 h-3 w-3' />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
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
                  <Link href='/public/berita' className='text-blue-400'>
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
