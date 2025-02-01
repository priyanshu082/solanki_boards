import { Button } from "./ui/button";
import video from "../assets/videos/introVideo.mp4"
import { Link } from "react-router-dom";
const IntroVideo = () => {
  return (
    <div className="relative w-[100vw] h-[50vw] md:h-[55vw] overflow-hidden  md:mt-[0vw] lg:mt-[0vw]">
      {/* Video container with overlay */}
      <div className="absolute z-4  ">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      {/* Text overlay centered */}
      <div className="relative z-6 h-full flex items-center justify-center bg-black/50">
        <div className="text-center flex flex-col justify-center text-white font-serif font-bold tracking-tight bg-blue-900 bg-opacity-40 p-4 rounded-md ">
          <h1 className="text-lg md:text-3xl font-sans tracking-tighter ">
           SOLANKI BROTHERS COUNCIL FOR OPEN AND DISTANCE LEARNING
          </h1>
          <p className="text-lg md:text-md mt-4 w-[65vw]">
          The Solanki Brothers Council for Open and Distance Learning is committed to shaping lifelong learners who not only thrive in their pursuits but also contribute meaningfully to building a better, more inclusive world
          </p>
          <Link to="/why-sbcodl">
          <Button className="mt-2 w-fit mx-auto text-xl bg-blue-500" >
           Why SBCODL is Unique ?
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroVideo;