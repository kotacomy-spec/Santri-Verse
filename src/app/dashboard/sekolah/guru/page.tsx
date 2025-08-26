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
  IconUser
} from '@tabler/icons-react';

export default async function GuruPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/auth/sign-in');
  }

  // Mock data for teachers
  const teachers = [
    {
      id: 1,
      name: 'Drs. Bambang Suharto',
      nip: '196512311990121001',
      subject: 'Matematika',
      status: 'Aktif',
      phone: '081234567890',
      email: 'bambang.suharto@sekolah.sch.id'
    },
    {
      id: 2,
      name: 'Dra. Sri Wahyuni',
      nip: '197011252005102001',
      subject: 'Bahasa Indonesia',
      status: 'Aktif',
      phone: '081234567891',
      email: 'sri.wahyuni@sekolah.sch.id'
    },
    {
      id: 3,
      name: 'Dedi Kusnadi, S.Pd',
      nip: '197505152008051001',
      subject: 'Fisika',
      status: 'Cuti',
      phone: '081234567892',
      email: 'dedi.kusnadi@sekolah.sch.id'
    },
    {
      id: 4,
      name: 'Rina Mardiyah, S.Pd.I',
      nip: '198008202010082001',
      subject: 'Agama Islam',
      status: 'Aktif',
      phone: '081234567893',
      email: 'rina.mardiyah@sekolah.sch.id'
    },
    {
      id: 5,
      name: 'Agus Setiawan, S.Si',
      nip: '198203172009031001',
      subject: 'Biologi',
      status: 'Aktif',
      phone: '081234567894',
      email: 'agus.setiawan@sekolah.sch.id'
    }
  ];

  return (
    <PageContainer>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Manajemen Guru
            </h2>
            <p className='text-muted-foreground'>
              Kelola data guru, lihat informasi, dan pantau status mengajar
            </p>
          </div>
          <Button>
            <IconPlus className='mr-2 h-4 w-4' />
            Tambah Guru
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>Daftar Guru</CardTitle>
                <CardDescription>
                  Total {teachers.length} guru terdaftar
                </CardDescription>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='relative'>
                  <IconSearch className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
                  <Input
                    placeholder='Cari guru...'
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
                  <TableHead>Nama Guru</TableHead>
                  <TableHead>NIP</TableHead>
                  <TableHead>Mata Pelajaran</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead className='text-right'>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className='font-medium'>
                      <div className='flex items-center gap-3'>
                        <div className='bg-primary/10 rounded-full p-2'>
                          <IconUser className='text-primary h-4 w-4' />
                        </div>
                        <div>
                          <div>{teacher.name}</div>
                          <div className='text-muted-foreground text-xs'>
                            {teacher.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{teacher.nip}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          teacher.status === 'Aktif' ? 'default' : 'secondary'
                        }
                      >
                        {teacher.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className='text-sm'>{teacher.phone}</div>
                    </TableCell>
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
                            Edit Guru
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconTrash className='mr-2 h-4 w-4' />
                            Hapus Guru
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
