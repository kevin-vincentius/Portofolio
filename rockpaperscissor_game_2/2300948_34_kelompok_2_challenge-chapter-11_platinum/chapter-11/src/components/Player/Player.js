import React from "react";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
// import '@/components/Player/Player.module.css';


function Player() {
    return(
       <div className="con">
        <VideoPlayer src={'tutorial.mp4'}/>
       </div> 
    )
}

export default Player;