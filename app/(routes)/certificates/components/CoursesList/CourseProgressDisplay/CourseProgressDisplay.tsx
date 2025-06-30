import { Progress } from "@/components/ui/progress";
import { CourseProgressDisplayProps } from "./CourseProgressDisplay.type";
import { DownloadCertificate } from "./DownloadCertificate";


export function CourseProgressDisplay(props: CourseProgressDisplayProps) {
  const { progress, titleCourse, userName } = props;

  const showProress = progress === 100;


  return showProress ?(
    <DownloadCertificate titleCourse={titleCourse} userName={userName}/>
  ) : (
    <>
        <Progress value={progress} className="[&>*]:bg-violet-300" />
        <p className="text-xs">{progress}% Completado</p>
    </>
  )
}
