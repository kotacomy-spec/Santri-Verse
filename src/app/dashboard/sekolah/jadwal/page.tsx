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
  IconCalendar
} from '@tabler/icons-react';

export default async function JadwalPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/auth/sign-in');
  }

  // Mock data for schedules
  const schedules = [
    {
      id: 1,
      className: 'XII IPA 1',
      day: 'Senin',
      time: '07:30 - 09:00',
      subject: 'Matematika',
      teacher: 'Drs. Bambang Suharto',
      room: 'Ruang 101'
    },
    {
      id: 2,
      className: 'XII IPA 1',
      day: 'Senin',
      time: '09:00 - 10:30',
      subject: 'Fisika',
      teacher: 'Dedi Kusnadi, S.Pd',
      room: 'Ruang 201'
    },
    {
      id: 3,
      className: 'XII IPA 1',
      day: 'Senin',
      time: '10:45 - 12:15',
      subject: 'Kimia',
      teacher: 'Agus Setiawan, S.Si',
      room: 'Ruang 301'
    },
    {
      id: 4,
      className: 'XII IPS 2',
      day: 'Selasa',
      time: '07:30 - 09:00',
      subject: 'Bahasa Indonesia',
      teacher: 'Dra. Sri Wahyuni',
      room: 'Ruang 102'
    },
    {
      id: 5,
      className: 'XII IPS 2',
      day: 'Selasa',
      time: '09:00 - 10:30',
      subject: 'Sejarah',
      teacher: 'Rina Mardiyah, S.Pd.I',
      room: 'Ruang 202'
    }
  ];

  return (
    <PageContainer>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Jadwal Pelajaran
            </h2>
            <p className='text-muted-foreground'>
              Kelola jadwal pelajaran untuk setiap kelas
            </p>
          </div>
          <Button>
            <IconPlus className='mr-2 h-4 w-4' />
            Tambah Jadwal
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>Daftar Jadwal</CardTitle>
                <CardDescription>
                  Total {schedules.length} jadwal terdaftar
                </CardDescription>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='relative'>
                  <IconSearch className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
                  <Input
                    placeholder='Cari jadwal...'
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
                  <TableHead>Kelas</TableHead>
                  <TableHead>Hari</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead>Mata Pelajaran</TableHead>
                  <TableHead>Guru</TableHead>
                  <TableHead>Ruang</TableHead>
                  <TableHead className='text-right'>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className='font-medium'>
                      <div className='flex items-center gap-3'>
                        <div className='bg-primary/10 rounded-full p-2'>
                          <IconCalendar className='text-primary h-4 w-4' />
                        </div>
                        <div>
                          <div>{schedule.className}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{schedule.day}</TableCell>
                    <TableCell>{schedule.time}</TableCell>
                    <TableCell>{schedule.subject}</TableCell>
                    <TableCell>{schedule.teacher}</TableCell>
                    <TableCell>{schedule.room}</TableCell>
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
                            <IconEdit className='mr-2 h-4 w-4' />
                            Edit Jadwal
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconTrash className='mr-2 h-4 w-4' />
                            Hapus Jadwal
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
