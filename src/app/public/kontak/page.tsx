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
import { Textarea } from '@/components/ui/textarea';
import {
  IconSchool,
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter
} from '@tabler/icons-react';

export default function ContactPage() {
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
            <Link href='/public/kontak' className='font-medium text-blue-600'>
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
              Hubungi Kami
            </h1>
            <p className='mb-8 text-xl'>
              Punya pertanyaan atau ingin berkonsultasi? Jangan ragu untuk
              menghubungi kami melalui berbagai channel yang tersedia.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {/* Contact Information */}
            <div className='lg:col-span-1'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-xl'>Informasi Kontak</CardTitle>
                  <CardDescription>
                    Hubungi kami melalui informasi kontak di bawah ini
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='flex items-start'>
                    <IconMapPin className='mt-1 mr-3 h-6 w-6 text-blue-600' />
                    <div>
                      <h3 className='font-medium'>Alamat</h3>
                      <p className='text-gray-600'>
                        Jl. Raya Kendalsari No. 20
                        <br />
                        Surabaya, Jawa Timur 60291
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start'>
                    <IconPhone className='mt-1 mr-3 h-6 w-6 text-blue-600' />
                    <div>
                      <h3 className='font-medium'>Telepon</h3>
                      <p className='text-gray-600'>(031) 12345678</p>
                    </div>
                  </div>
                  <div className='flex items-start'>
                    <IconMail className='mt-1 mr-3 h-6 w-6 text-blue-600' />
                    <div>
                      <h3 className='font-medium'>Email</h3>
                      <p className='text-gray-600'>info@sdmuh20-sby.sch.id</p>
                    </div>
                  </div>
                  <div className='flex items-start'>
                    <IconClock className='mt-1 mr-3 h-6 w-6 text-blue-600' />
                    <div>
                      <h3 className='font-medium'>Jam Operasional</h3>
                      <p className='text-gray-600'>
                        Senin - Jumat: 07:00 - 15:00
                        <br />
                        Sabtu: 07:00 - 12:00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className='mt-8'>
                <CardHeader>
                  <CardTitle className='text-xl'>Media Sosial</CardTitle>
                  <CardDescription>
                    Ikuti kami di media sosial untuk informasi terkini
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex space-x-4'>
                    <Button variant='outline' size='icon'>
                      <IconBrandFacebook className='h-5 w-5' />
                    </Button>
                    <Button variant='outline' size='icon'>
                      <IconBrandInstagram className='h-5 w-5' />
                    </Button>
                    <Button variant='outline' size='icon'>
                      <IconBrandTwitter className='h-5 w-5' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className='lg:col-span-2'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-xl'>Kirim Pesan</CardTitle>
                  <CardDescription>
                    Isi formulir di bawah ini untuk mengirim pesan kepada kami
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className='space-y-6'>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      <div>
                        <label
                          htmlFor='name'
                          className='mb-1 block text-sm font-medium text-gray-700'
                        >
                          Nama Lengkap
                        </label>
                        <Input type='text' id='name' placeholder='Nama Anda' />
                      </div>
                      <div>
                        <label
                          htmlFor='email'
                          className='mb-1 block text-sm font-medium text-gray-700'
                        >
                          Email
                        </label>
                        <Input
                          type='email'
                          id='email'
                          placeholder='email@contoh.com'
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor='subject'
                        className='mb-1 block text-sm font-medium text-gray-700'
                      >
                        Subjek
                      </label>
                      <Input
                        type='text'
                        id='subject'
                        placeholder='Subjek pesan'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='message'
                        className='mb-1 block text-sm font-medium text-gray-700'
                      >
                        Pesan
                      </label>
                      <Textarea
                        id='message'
                        rows={6}
                        placeholder='Tulis pesan Anda...'
                      ></Textarea>
                    </div>
                    <Button type='submit' className='w-full md:w-auto'>
                      Kirim Pesan
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className='mt-8'>
                <CardHeader>
                  <CardTitle className='text-xl'>Lokasi Kami</CardTitle>
                  <CardDescription>
                    Temukan lokasi SD Muhammadiyah 20 Surabaya di peta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex h-64 w-full items-center justify-center rounded-xl border-2 border-dashed bg-gray-200'>
                    <span className='text-gray-500'>Peta Lokasi</span>
                  </div>
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
                  <Link href='/public/kontak' className='text-blue-400'>
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
