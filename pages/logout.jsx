import { getAuth, clerkClient } from "@clerk/nextjs/server";

export async function getServerSideProps(ctx) {
  try {
    const { sessionId } = getAuth(ctx.req);
    if (sessionId) await clerkClient.sessions.revokeSession(sessionId);
  } catch {}
  return { redirect: { destination: "/", permanent: false } };
}
export default function Logout(){ return null; }
