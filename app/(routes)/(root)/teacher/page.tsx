import { currentUser } from "@clerk/nextjs/server";
import { Header } from "./components";



export default async function TeacherPage() {
  const user = await currentUser();
  if (!user) {
    return <p>not signed in</p>;
  }

  return <div>
    <Header/>
  </div>;
}
