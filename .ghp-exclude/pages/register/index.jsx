"use client";
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const { query } = useRouter();
  const role = query.role === "seller" ? "seller" : "customer";

  return (
    <div style={{maxWidth:420,margin:"24px auto",padding:16}}>
      <h1 style={{fontSize:24,marginBottom:12}}>
        {role === "seller" ? "Üreten El Kaydı" : "Müşteri Kaydı"}
      </h1>
      <SignUp
        afterSignUpUrl={`/onboard?role=${role}`}
        signInUrl={`/login?role=${role}`}
      />
    </div>
  );
}
