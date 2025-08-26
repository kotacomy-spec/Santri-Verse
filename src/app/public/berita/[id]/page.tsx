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
  IconCalendar,
  IconUser,
  IconTag,
  IconArrowLeft,
  IconShare
} from '@tabler/icons-react';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // Mock blog post data
  const blogPost = {
    id: params.id,
    title: 'Perayaan Hari Pendidikan Nasional di SD Muhammadiyah 20',
    content: `
      <p>SD Muhammadiyah 20 Surabaya kembali merayakan Hari Pendidikan Nasional dengan penuh semangat dan antusiasme. Acara yang diselenggarakan pada tanggal 2 Mei 2024 ini diikuti oleh seluruh siswa, guru, dan staf sekolah.</p>
      
      <p>Kegiatan dimulai dengan upacara bendera yang dipimpin langsung oleh Kepala Sekolah, Drs. Budi Santoso, M.Pd. Dalam sambutannya, beliau menekankan pentingnya perayaan Hari Pendidikan Nasional sebagai bentuk penghargaan terhadap jasa para pahlawan pendidikan Indonesia.</p>
      
      <p>Setelah upacara, dilanjutkan dengan berbagai kegiatan menarik seperti lomba membaca puisi, lomba mewarnai, dan pameran karya seni siswa. Para siswa menunjukkan kreativitas dan bakat mereka melalui berbagai karya yang luar biasa.</p>
      
      <p>Salah satu highlight dari acara ini adalah penampilan tari tradisional yang dibawakan oleh para siswa kelas 4 dan 5. Penampilan yang memukau ini mendapat tepuk tangan meriah dari seluruh peserta.</p>
      
      <p>"Kami sangat senang bisa merayakan Hari Pendidikan Nasional dengan cara yang menyenangkan dan edukatif," ujar Siti Aminah, salah satu guru kelas 3 yang ikut memandu kegiatan.</p>
      
      <p>Acara ditutup dengan penyerahan hadiah kepada para pemenang lomba yang diselenggarakan. Kepala Sekolah berpesan agar semangat belajar yang tinggi tetap terjaga sepanjang tahun ajaran.</p>
    `,
    date: '10 Mei 2024',
    author: 'Admin Sekolah',
    category: 'Kegiatan Sekolah',
    image:
      'https://placehold.co/800x400/3b82f6/white?text=Hari+Pendidikan+Nasional'
  };

  // Related posts
  const relatedPosts = [
    {
      id: 2,
      title: 'Prestasi Membanggakan dari Olimpiade Sains SD',
      date: '5 Mei 2024',
      image: 'https://placehold.co/300x150/1d4ed8/white?text=Olimpiade+Sains'
    },
    {
      id: 3,
      title: 'Kegiatan Ekstrakurikuler Seni dan Budaya',
      date: '1 Mei 2024',
      image: 'https://placehold.co/300x150/6366f1/white?text=Seni+dan+Budaya'
    },
    {
      id: 4,
      title: 'Pelatihan Guru dalam Pemanfaatan Teknologi Pembelajaran',
      date: '25 April 2024',
      image: 'https://placehold.co/300x150/8b5cf6/white?text=Pelatihan+Guru'
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

      {/* Back to Blog */}
      <section className='border-b bg-white py-6'>
        <div className='container mx-auto px-4'>
          <Button asChild variant='ghost' className='pl-0'>
            <Link href='/public/berita'>
              <IconArrowLeft className='mr-2 h-4 w-4' />
              Kembali ke Berita
            </Link>
          </Button>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col gap-8 lg:flex-row'>
            {/* Main Content */}
            <div className='lg:w-2/3'>
              <article className='overflow-hidden rounded-lg bg-white shadow-md'>
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className='h-64 w-full object-cover md:h-96'
                />
                <div className='p-6 md:p-8'>
                  <div className='mb-4 flex flex-wrap items-center text-sm text-gray-500'>
                    <div className='mr-4 flex items-center'>
                      <IconCalendar className='mr-1 h-4 w-4' />
                      <span>{blogPost.date}</span>
                    </div>
                    <div className='mr-4 flex items-center'>
                      <IconUser className='mr-1 h-4 w-4' />
                      <span>{blogPost.author}</span>
                    </div>
                    <div className='flex items-center'>
                      <IconTag className='mr-1 h-4 w-4' />
                      <span>{blogPost.category}</span>
                    </div>
                  </div>
                  <h1 className='mb-6 text-2xl font-bold text-gray-900 md:text-3xl'>
                    {blogPost.title}
                  </h1>
                  <div
                    className='prose max-w-none text-gray-700'
                    dangerouslySetInnerHTML={{ __html: blogPost.content }}
                  />
                  <div className='mt-8 flex items-center justify-between border-t border-gray-200 pt-6'>
                    <Button variant='outline'>
                      <IconShare className='mr-2 h-4 w-4' />
                      Bagikan
                    </Button>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className='lg:w-1/3'>
              {/* Related Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Artikel Terkait</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-4'>
                    {relatedPosts.map((post) => (
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
