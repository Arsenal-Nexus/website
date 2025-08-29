export async function getServerSideProps() {
  return {
    redirect: { destination: '/main.html', permanent: false },
  };
}

export default function Home() {
  return null; // never rendered, it redirects
}
