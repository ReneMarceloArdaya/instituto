import { currentUser } from "@clerk/nextjs/server";
import { VerificationUserId } from "./Components/VerificationUserId";

export default async function Home() {
  const user = await currentUser();
  const userId = user?.id ?? null;

  return (
    <div>
      <VerificationUserId userId={userId} />
    </div>
  );
}
