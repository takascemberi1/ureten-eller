export async function getServerSideProps() {
  return { redirect: { destination: '/home.html', permanent: false } };
}
export default function Index(){ return null; }
