export async function getServerSideProps() {
  return { redirect: { destination: "/logout", permanent: false } };
}
export default function SignOut(){ return null; }
