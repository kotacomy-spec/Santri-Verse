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
  IconSchool
} from '@tabler/icons-react';

export default async function KelasPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/auth/sign-in');
  }

  // Mock data for classes
  const classes = [
    {
      id: 1,
      name: 'XII IPA 1',
      level: 'Kelas 12',
      major: 'IPA',
      studentCount: 32,
      homeroomTeacher: 'Drs. Bambang Suharto',
      status: 'Aktif'
    },
    {
      id: 2,
      name: 'XII IPS 2',
      level: 'Kelas 12',
      major: 'IPS',
      studentCount: 28,
      homeroomTeacher: 'Dra. Sri Wahyuni',
      status: 'Aktif'
    },
    {
      id: 3,
      name: 'XI IPA 3',
      level: 'Kelas 11',
      major: 'IPA',
      studentCount: 30,
      homeroomTeacher: 'Dedi Kusnadi, S.Pd',
      status: 'Aktif'
    },
    {
      id: 4,
      name: 'X IPS 1',
      level: 'Kelas 10',
      major: 'IPS',
      studentCount: 35,
      homeroomTeacher: 'Rina Mardiyah, S.Pd.I',
      status: 'Aktif'
    },
    {
      id: 5,
      name: 'XI IPS 2',
      level: 'Kelas 11',
      major: 'IPS',
      studentCount: 29,
      homeroomTeacher: 'Agus Setiawan, S.Si',
      status: 'Aktif'
    }
  ];

  return (
    <PageContainer>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Manajemen Kelas
            </h2>
            <p className='text-muted-foreground'>
              Kelola data kelas, lihat informasi, dan pantau kapasitas
            </p>
          </div>
          <Button>
            <IconPlus className='mr-2 h-4 w-4' />
            Tambah Kelas
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>Daftar Kelas</CardTitle>
                <CardDescription>
                  Total {classes.length} kelas terdaftar
                </CardDescription>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='relative'>
                  <IconSearch className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
                  <Input
                    placeholder='Cari kelas...'
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
                  <TableHead>Nama Kelas</TableHead>
                  <TableHead>Tingkat</TableHead>
                  <TableHead>Jurusan</TableHead>
                  <TableHead>Jumlah Siswa</TableHead>
                  <TableHead>Wali Kelas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell className='font-medium'>
                      <div className='flex items-center gap-3'>
                        <div className='bg-primary/10 rounded-full p-2'>
                          <IconSchool className='text-primary h-4 w-4' />
                        </div>
                        <div>
                          <div>{classItem.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{classItem.level}</TableCell>
                    <TableCell>{classItem.major}</TableCell>
                    <TableCell>{classItem.studentCount} siswa</TableCell>
                    <TableCell>{classItem.homeroomTeacher}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          classItem.status === 'Aktif' ? 'default' : 'secondary'
                        }
                      >
                        {classItem.status}
                      </Badge>
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
                            Edit Kelas
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconTrash className='mr-2 h-4 w-4' />
                            Hapus Kelas
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
