export default function SignOut(){
  if (typeof window !== 'undefined') window.location.replace('/logout');
  return null;
}
