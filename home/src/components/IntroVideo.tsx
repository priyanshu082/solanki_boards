import { Button } from "./ui/button";
import video from "../assets/videos/introVideo.mp4";
import { Link } from "react-router-dom";

const IntroVideo = () => {
  return (
    <div className="relative w-full h-[80vh] sm:h-[70vh] md:h-[55vw] overflow-hidden">
      {/* Video container */}
      <div className="absolute inset-0">
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

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text overlay centered */}
      <div className="relative h-full z-10 flex items-center justify-center">
        <div className="text-center px-4 py-6 mx-4 max-w-4xl text-white bg-blue-900/40 backdrop-blur-sm rounded-md">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans font-bold tracking-tight">
            SOLANKI BROTHERS COUNCIL FOR OPEN AND DISTANCE LEARNING
          </h1>
          <p className="text-sm sm:text-base md:text-lg mt-3 md:mt-4 mx-auto">
            The Solanki Brothers Council for Open and Distance Learning is committed to shaping lifelong learners who not only thrive in their pursuits but also contribute meaningfully to building a better, more inclusive world
          </p>
          <Link to="/why-sbcodl">
            <Button className="mt-4 md:mt-6 px-4 py-2 text-sm sm:text-base md:text-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
              Why SBCODL is Unique?
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroVideo;