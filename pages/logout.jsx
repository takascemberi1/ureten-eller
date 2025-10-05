import { clerkClient, getAuth } from "@clerk/nextjs/server";

export async function getServerSideProps(ctx) {
  try {
    const { sessionId } = getAuth(ctx.req);
    if (sessionId) {
      await clerkClient.sessions.revokeSession(sessionId);
    }
  } catch (e) {}
  return { redirect: { destination: "/", permanent: false } };
}

export default function Logout() { return null; }
