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

export default async function SiswaPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/auth/sign-in');
  }

  // Mock data for students
  const students = [
    {
      id: 1,
      name: 'Budi Santoso',
      nis: '12345',
      class: 'XII IPA 1',
      status: 'Aktif',
      phone: '081234567890',
      email: 'budi.santoso@email.com'
    },
    {
      id: 2,
      name: 'Siti Aminah',
      nis: '12346',
      class: 'XII IPS 2',
      status: 'Aktif',
      phone: '081234567891',
      email: 'siti.aminah@email.com'
    },
    {
      id: 3,
      name: 'Andi Prasetyo',
      nis: '12347',
      class: 'XI IPA 3',
      status: 'Cuti',
      phone: '081234567892',
      email: 'andi.prasetyo@email.com'
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      nis: '12348',
      class: 'X IPS 1',
      status: 'Aktif',
      phone: '081234567893',
      email: 'dewi.lestari@email.com'
    },
    {
      id: 5,
      name: 'Joko Widodo',
      nis: '12349',
      class: 'XI IPS 2',
      status: 'Aktif',
      phone: '081234567894',
      email: 'joko.widodo@email.com'
    }
  ];

  return (
    <PageContainer>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Manajemen Siswa
            </h2>
            <p className='text-muted-foreground'>
              Kelola data siswa, lihat informasi, dan pantau status akademik
            </p>
          </div>
          <Button>
            <IconPlus className='mr-2 h-4 w-4' />
            Tambah Siswa
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>Daftar Siswa</CardTitle>
                <CardDescription>
                  Total {students.length} siswa terdaftar
                </CardDescription>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='relative'>
                  <IconSearch className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
                  <Input
                    placeholder='Cari siswa...'
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
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>NIS</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead className='text-right'>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className='font-medium'>
                      <div className='flex items-center gap-3'>
                        <div className='bg-primary/10 rounded-full p-2'>
                          <IconUser className='text-primary h-4 w-4' />
                        </div>
                        <div>
                          <div>{student.name}</div>
                          <div className='text-muted-foreground text-xs'>
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.nis}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.status === 'Aktif' ? 'default' : 'secondary'
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className='text-sm'>{student.phone}</div>
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
                            Edit Siswa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <IconTrash className='mr-2 h-4 w-4' />
                            Hapus Siswa
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
