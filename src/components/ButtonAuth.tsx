"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        
        <button
          onClick={() => signOut()}
          className="px-4"
        >
          Log out
        </button>
      </>
    );
  }
  return (
    <>
    
      <button
        onClick={() => signIn()}
        className="px-4"
      >
        Log in
      </button>
    </>
  );
}
