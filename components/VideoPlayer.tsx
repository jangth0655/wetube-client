/* eslint-disable react/no-unknown-property */

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

import { FaUser } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { MdFullscreenExit } from "react-icons/md";
import { User, Video } from "../libs/interface";
import useUser from "../libs/useUser";

interface VideoWithUser extends Video {
  user: User;
}

interface VideoPlayerProps {
  video?: VideoWithUser;
}

let defaultVolume = 0.5;

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(true);
  const [mute, setMute] = useState(false);
  const [volumeValue, setVolumeValue] = useState(defaultVolume);
  const [completeTime, setCompleteItem] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const { user } = useUser({ isPrivate: false });

  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
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
    if (!videoRef.current) return;
    setCompleteItem(videoRef.current.duration);
  };

  const onTimeUpdate = (e: any) => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const onCurrentTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const value = Number(event.target.value);
    videoRef.current.currentTime = value;
  };

  const onFullScreen = async () => {
    if (!videoRef.current) return;
    try {
      await videoRef.current.requestFullscreen();
    } catch (e) {
      console.error;
      return;
    }
  };

  const onProfile = (userId?: string) => {
    router.push(`/users/${userId}`);
  };

  const confirmVideoUser = video?.user._id === user?._id;

  return (
    <div>
      {confirmVideoUser && (
        <div className="mb-4 flex justify-end items-center px-2">
          <Link
            href={{
              pathname: "/videos/editVideo",
              query: {
                videoFile: video?.url,
                videoTitle: video?.title,
                videoHashTags: video?.hashtags,
                videoId: video?._id,
              },
            }}
            as="/videos/editVideo"
          >
            <a className="rounded-lg bg-rose-400 hover:bg-rose-500 transition-all px-2 py-1 cursor-pointer shadow-black shadow-md">
              Edit
            </a>
          </Link>
        </div>
      )}
      <div className="w-[25rem] h-[27rem]  sm:w-full sm:h-[34rem] shadow-black shadow-lg bg-zinc-900 rounded-md relative">
        <div className="w-full h-[80%] flex justify-center items-center py-2 ">
          <video
            className="w-full h-full"
            ref={videoRef}
            src={video?.url}
            muted={mute}
            onEnded={onEnded}
            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={onTimeUpdate}
          ></video>
        </div>

        <div className="h-[20%] w-full px-4 flex flex-col justify-center bg-zinc-800 rounded-md">
          <div className="flex flex-col cursor-pointer items-center space-y-2">
            <div className="w-full mb-3">
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
                <div onClick={onPlay}>
                  {isPlaying ? <FaPlay /> : <FaStop />}
                </div>
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
                    {formatTime(currentTime)
                      ? formatTime(currentTime)
                      : `00:00`}
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

      <div className="mt-10 space-y-8 px-4">
        <div className="space-x-2 flex items-center justify-between">
          <div
            onClick={() => onProfile(video?.user?._id)}
            className="space-x-2 flex items-center cursor-pointer"
          >
            {video?.user?.avatarId ? (
              <div className="w-10 h-10 relative ">
                <Image
                  src={video.user?.avatarId}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-zinc-600 rounded-full flex justify-center items-center">
                <FaUser />
              </div>
            )}
            <span>{video?.user.username}</span>
          </div>
          <div></div>
        </div>

        <div className="space-y-4">
          <span className="text-sm text-blue-400">{video?.hashtags}</span>
          <p>{video?.description}</p>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;
