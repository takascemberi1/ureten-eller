"use client";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { query } = useRouter();
  const role = query.role === "seller" ? "seller" : "customer";

  return (
    <div style={{maxWidth:420,margin:"24px auto",padding:16}}>
      <h1 style={{fontSize:24,marginBottom:12}}>
        {role === "seller" ? "Üreten El Girişi" : "Müşteri Girişi"}
      </h1>
      <SignIn
        afterSignInUrl={`/onboard?role=${role}`}
        signUpUrl={`/register?role=${role}`}
      />
    </div>
  );
}
