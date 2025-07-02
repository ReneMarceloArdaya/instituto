
import { DetectLocation, ExploreCourse, SetUserMetadata } from "./Components";

export default async function Home() {


  return (
    <div>
      <DetectLocation />
      <SetUserMetadata/>
      <ExploreCourse />
    </div>
  );
}
