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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  IconDots,
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconEye,
  IconReport,
  IconDownload,
  IconPrinter
} from '@tabler/icons-react';

export default async function LaporanPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/auth/sign-in');
  }

  // Mock data for reports
  const reports = [
    {
      id: 1,
      title: 'Laporan Kehadiran Siswa Bulanan',
      type: 'Kehadiran',
      period: 'Juli 2024',
      status: 'Selesai',
      generatedBy: 'Administrator',
      date: '2024-07-31'
    },
    {
      id: 2,
      title: 'Laporan Nilai Akhir Semester',
      type: 'Akademik',
      period: 'Semester Ganjil 2024',
      status: 'Dalam Proses',
      generatedBy: 'Sistem',
      date: '2024-08-15'
    },
    {
      id: 3,
      title: 'Laporan Keuangan Sekolah',
      type: 'Keuangan',
      period: 'Juli 2024',
      status: 'Selesai',
      generatedBy: 'Bendahara',
      date: '2024-07-25'
    },
    {
      id: 4,
      title: 'Laporan Aktivitas Ekstrakurikuler',
      type: 'Ekstrakurikuler',
      period: 'Juli 2024',
      status: 'Menunggu',
      generatedBy: 'Pembina',
      date: '2024-08-01'
    },
    {
      id: 5,
      title: 'Laporan Prestasi Siswa',
      type: 'Prestasi',
      period: 'Juli 2024',
      status: 'Selesai',
      generatedBy: 'Wali Kelas',
      date: '2024-07-20'
    }
  ];

  return (
    <PageContainer>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Laporan</h2>
            <p className='text-muted-foreground'>
              Kelola dan akses laporan akademik, keuangan, dan aktivitas sekolah
            </p>
          </div>
          <div className='flex space-x-2'>
            <Button variant='outline'>
              <IconPrinter className='mr-2 h-4 w-4' />
              Cetak
            </Button>
            <Button>
              <IconPlus className='mr-2 h-4 w-4' />
              Buat Laporan
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>Daftar Laporan</CardTitle>
                <CardDescription>
                  Total {reports.length} laporan tersedia
                </CardDescription>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='relative'>
                  <IconSearch className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
                  <Input
                    placeholder='Cari laporan...'
                    className='pl-8 sm:w-[300px]'
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul Laporan</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dibuat Oleh</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className='text-right'>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className='font-medium'>
                      <div className='flex items-center gap-3'>
                        <div className='bg-primary/10 rounded-full p-2'>
                          <IconReport className='text-primary h-4 w-4' />
                        </div>
                        <div>
                          <div>{report.title}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant='secondary'>{report.type}</Badge>
                    </TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          report.status === 'Selesai'
                            ? 'default'
                            : report.status === 'Dalam Proses'
                              ? 'outline'
                              : 'secondary'
                        }
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.generatedBy}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Buka menu</span>
                            <IconDots className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <IconEye className='mr-2 h-4 w-4' />
                            Lihat Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconDownload className='mr-2 h-4 w-4' />
                            Unduh Laporan
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconPrinter className='mr-2 h-4 w-4' />
                            Cetak Laporan
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <IconEdit className='mr-2 h-4 w-4' />
                            Edit Laporan
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconTrash className='mr-2 h-4 w-4' />
                            Hapus Laporan
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
