/* eslint-disable react/no-unknown-property */

import React, { useRef, useState } from "react";
import { Video } from "../libs/interface";

import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { MdFullscreenExit } from "react-icons/md";

interface VideoPlayerProps {
  video: Video;
}

let defaultVolume = 0.5;
let defaultTime = 0;

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mute, setMute] = useState(false);
  const [volumeValue, setVolumeValue] = useState(defaultVolume);
  const [completeTime, setCompleteItem] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    videoRef.current.volume = Number(event.target.value);
    setVolumeValue(videoRef.current.volume);
  };

  const onMute = () => {
    if (!mute) {
      setMute(true);
      setVolumeValue(0);
    } else {
      setMute(false);
      setVolumeValue(defaultVolume);
    }
  };

  const onPlay = () => {
    if (!isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(true);
    } else {
      videoRef.current?.play();
      setIsPlaying(false);
    }
  };

  const onEnded = () => {
    setIsPlaying(true);
  };

  const formatTime = (second: number) => {
    if (!second) return;
    return new Date(second * 1000)?.toISOString().substring(14, 19);
  };

  const onLoadedMetadata = (e: any) => {
    setCompleteItem(videoRef.current?.duration);
  };

  const onTimeUpdate = (e: any) => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const onCurrentTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    videoRef.current.currentTime = value;
  };

  const onFullScreen = async () => {
    try {
      await videoRef.current.requestFullscreen();
    } catch (e) {
      console.error;
      return;
    }
  };

  return (
    <div className="w-[30rem] h-[24rem] shadow-black shadow-lg bg-zinc-900 rounded-md">
      <div className="w-full h-[80%] flex justify-center items-center py-2 ">
        <video
          className="w-full h-full"
          ref={videoRef}
          src={video.url}
          muted={mute}
          onEnded={onEnded}
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
        ></video>
      </div>

      <div className="h-[20%] w-full px-4 flex flex-col justify-center bg-zinc-800 rounded-md">
        <div className="flex flex-col cursor-pointer items-center space-y-2">
          <div className="w-full">
            <input
              ref={inputRef}
              className="w-full appearance-none rounded-md cursor-pointer bg-orange-600 h-2"
              type="range"
              max={Math.floor(completeTime)}
              min="0"
              step={1}
              onChange={onCurrentTime}
              value={currentTime}
            />
          </div>

          <div className="flex items-center  w-full justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div onClick={onPlay}>{isPlaying ? <FaPlay /> : <FaStop />}</div>
              <div onClick={onMute} className=" transition-all text-zinc-300">
                {mute ? <FaVolumeMute /> : <FaVolumeUp />}
              </div>
              <div>
                <input
                  className="appearance-none rounded-md cursor-pointer bg-gray-700 h-2"
                  type="range"
                  max="1"
                  min="0"
                  value={volumeValue}
                  step={0.1}
                  onChange={onInputChange}
                />
              </div>
              <div className="space-x-2 text-xs">
                <span>
                  {formatTime(currentTime) ? formatTime(currentTime) : `00:00`}
                </span>
                <span>|</span>
                <span>{formatTime(completeTime)}</span>
              </div>
            </div>
            <div onClick={onFullScreen} className="text-xl cursor-pointer">
              <MdFullscreenExit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;
