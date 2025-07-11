import { SignIn } from "@clerk/nextjs";
import React from "react"


export default function SignInPage() {
  return <div className="flex flex-col items-center justify-center gap-4 p-4">
    <h1 className="font-semibold text-4xl">Welcome</h1>
    <p className="text-xl">Sign in to continue to your account</p>
    <SignIn/>
  </div>;
}