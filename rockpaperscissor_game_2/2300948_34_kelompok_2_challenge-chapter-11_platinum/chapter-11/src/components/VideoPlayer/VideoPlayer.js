import React from "react";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function VideoPlayer({src}) {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playVideo = () => {
    videoRef.current.play();
  };

  const pauseVideo = () => {
    videoRef.current.pause();
  };

  const fastForward = () => {
    videoRef.current.currentTime += 10;
  };

  const rewind = () => {
    videoRef.current.currentTime -= 10;
  };

  useEffect(() => {
    const video = videoRef.current;

    const timeUpdateHandler = () => {
      setCurrentTime(video.currentTime);
    };

    const loadedMetadataHandler = () => {
      setDuration(video.duration);
    };
    
    video.addEventListener("timeupdate", timeUpdateHandler);
    video.addEventListener("loadedmetadata", loadedMetadataHandler);

    return () => {
      video.removeEventListener("timeupdate", timeUpdateHandler);
      video.removeEventListener("loadedmetadata", loadedMetadataHandler);
    };
  }, []);

  return (
    <div className="video-container">
      <video className="video-player" ref={videoRef} src={src}></video>
      <div className="controls">
        <button className="control-button" onClick={playVideo}>
          Play
        </button>
        <button className="control-button" onClick={pauseVideo}>
          Pause
        </button>
        <button className="control-button" onClick={fastForward}>
          Fast Forward
        </button>
        <button className="control-button" onClick={rewind}>
          Rewind
        </button>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
        </div>
        </div>
      </div>
      <div className="time-indicator">
      <span className="current-time">{currentTime.toFixed(2)}</span>
        <span className="duration">{duration.toFixed(2)}</span>
      </div>
       
     
    </div>
  );
}
VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired, // Assuming src should be a string and is required
};

export default VideoPlayer;
