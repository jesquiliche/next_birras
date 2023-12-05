'use client'
import ButtonAuth from "@/components/ButtonAuth";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  console.log(session);

  return (
    <div>
       <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <ButtonAuth />
    </div>
  );
};

export default page;
