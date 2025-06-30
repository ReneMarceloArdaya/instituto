import { VideoCourseProps } from "./VideoCourse.type";


export function VideoCourse(props: VideoCourseProps) {
    const { videoUrl } = props;
  return (
    <video
      src={videoUrl}
      controls
      controlsList="nodownload"
      disablePictureInPicture
      className="w-full rounded-md shadow-md"
    ></video>
  )
}
