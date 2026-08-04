import { useState, useRef, useEffect } from "react";
import { Pause, Play } from "lucide-react";

const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(duration || 0);
  const [isHovering, setIsHovering] = useState(false);

  const formatTime = (seconds = 0) => {
    if (!seconds || isNaN(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlayPause = async () => {
    if (!videoRef.current) return;

    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);

    const handlePause = () => setIsPlaying(false);

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  if (!secureUrl) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl bg-gray-200 text-gray-600">
        No editorial video available.
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl shadow-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        src={secureUrl}
        poster={thumbnailUrl}
        onClick={togglePlayPause}
        className="aspect-video w-full cursor-pointer bg-black"
      />

      <div
        className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          isHovering || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={togglePlayPause}
          className="btn btn-circle btn-primary mb-3"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <div className="flex items-center gap-3">
          <span className="w-10 text-sm text-white">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min={0}
            max={videoDuration}
            value={currentTime}
            onChange={(e) => {
              const time = Number(e.target.value);
              videoRef.current.currentTime = time;
              setCurrentTime(time);
            }}
            className="range range-primary range-xs flex-1"
          />

          <span className="w-10 text-right text-sm text-white">
            {formatTime(videoDuration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Editorial;