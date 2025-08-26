import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconBook,
  IconCalendar,
  IconReport
} from '@tabler/icons-react';

export default async function SekolahOverview() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/auth/sign-in');
  }

  // Mock data for the dashboard
  const stats = [
    {
      title: 'Total Siswa',
      value: '1,240',
      description: '+12% dari bulan lalu',
      icon: IconUsers,
      trend: 'up'
    },
    {
      title: 'Total Guru',
      value: '85',
      description: '+3% dari bulan lalu',
      icon: IconUsers,
      trend: 'up'
    },
    {
      title: 'Kelas Aktif',
      value: '24',
      description: 'Tidak ada perubahan',
      icon: IconBook,
      trend: 'neutral'
    },
    {
      title: 'Presensi Hari Ini',
      value: '92%',
      description: '-2% dari kemarin',
      icon: IconCalendar,
      trend: 'down'
    }
  ];

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Selamat Datang di Dashboard Sekolah! 👋
          </h2>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className='from-primary/5 to-card bg-gradient-to-t shadow-xs'
              >
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {stat.title}
                  </CardTitle>
                  <Icon className='text-muted-foreground h-4 w-4' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{stat.value}</div>
                  <p className='text-muted-foreground text-xs'>
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>
            <Card>
              <CardHeader>
                <CardTitle>Grafik Kehadiran Siswa</CardTitle>
                <CardDescription>
                  Kehadiran siswa dalam 30 hari terakhir
                </CardDescription>
              </CardHeader>
              <CardContent className='pl-2'>
                <div className='flex h-[300px] items-center justify-center'>
                  <p className='text-muted-foreground'>
                    Grafik kehadiran akan ditampilkan di sini
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='col-span-4 md:col-span-3'>
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>Aktivitas terakhir di sekolah</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[
                    {
                      title: 'Penjadwalan UTS',
                      description:
                        'Jadwal UTS semester ganjil telah diterbitkan',
                      time: '2 jam yang lalu'
                    },
                    {
                      title: 'Pembayaran SPP',
                      description: 'Batas akhir pembayaran SPP bulan Juli',
                      time: '1 hari yang lalu'
                    },
                    {
                      title: 'Rapat Guru',
                      description: 'Rapat koordinasi guru hari Jumat',
                      time: '2 hari yang lalu'
                    },
                    {
                      title: 'Pengumuman Libur',
                      description: 'Libur nasional tanggal 17 Agustus',
                      time: '3 hari yang lalu'
                    }
                  ].map((activity, index) => (
                    <div key={index} className='flex items-start gap-3'>
                      <div className='bg-primary/10 mt-1 rounded-full p-2'>
                        <IconCalendar className='text-primary h-4 w-4' />
                      </div>
                      <div>
                        <p className='font-medium'>{activity.title}</p>
                        <p className='text-muted-foreground text-sm'>
                          {activity.description}
                        </p>
                        <p className='text-muted-foreground mt-1 text-xs'>
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='col-span-4'>
            <Card>
              <CardHeader>
                <CardTitle>Statistik Akademik</CardTitle>
                <CardDescription>
                  Performa akademik siswa per semester
                </CardDescription>
              </CardHeader>
              <CardContent className='pl-2'>
                <div className='flex h-[300px] items-center justify-center'>
                  <p className='text-muted-foreground'>
                    Grafik statistik akademik akan ditampilkan di sini
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='col-span-4 md:col-span-3'>
            <Card>
              <CardHeader>
                <CardTitle>Laporan Keuangan</CardTitle>
                <CardDescription>Ringkasan keuangan bulan ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium'>Pendapatan</p>
                      <p className='text-muted-foreground text-sm'>
                        Total SPP dan donasi
                      </p>
                    </div>
                    <p className='font-medium text-green-600'>Rp 120.000.000</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium'>Pengeluaran</p>
                      <p className='text-muted-foreground text-sm'>
                        Gaji guru dan operasional
                      </p>
                    </div>
                    <p className='font-medium text-red-600'>Rp 95.000.000</p>
                  </div>
                  <div className='flex items-center justify-between border-t pt-4'>
                    <div>
                      <p className='font-medium'>Total</p>
                      <p className='text-muted-foreground text-sm'>
                        Keuntungan bersih
                      </p>
                    </div>
                    <p className='font-bold text-green-600'>Rp 25.000.000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
