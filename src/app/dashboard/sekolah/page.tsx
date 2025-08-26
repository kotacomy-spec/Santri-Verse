import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function SekolahDashboard() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/auth/sign-in');
  }

  return redirect('/dashboard/sekolah/overview');
}
