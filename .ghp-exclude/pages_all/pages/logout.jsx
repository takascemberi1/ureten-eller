export default function Logout(){
  if (typeof window !== 'undefined') window.location.replace('/');
  return null;
}
