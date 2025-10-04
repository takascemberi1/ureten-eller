import { redirect } from 'next/navigation';

export const metadata = { title: 'Üreten Eller' };

export default function Page() {
  redirect('/home.html'); // kökten home'a git
}
