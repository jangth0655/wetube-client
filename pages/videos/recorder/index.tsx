/* eslint-disable react/no-unknown-property */
import { NextPage } from "next";
import PageNav from "../../../components/PageNav";
const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");

import { FaVideo } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const Recorder: NextPage = () => {
  const router = useRouter();
  const [preview, setPreview] = useState(false);
  const [startRecord, setStartRecord] = useState(false);
  const [streamObj, setStreamObj] = useState<MediaStream>();
  const [recordObj, setRecordObj] = useState<MediaRecorder>();
  const [isDownLoad, setIsDownLoad] = useState(false);
  const [isCompile, setIsCompile] = useState(false);

  const [ffCompiledFile, setFFCompiledFile] = useState("");
  const [ffImageFile, setFFImageFile] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoAnchorRef = useRef<HTMLAnchorElement>(null);
  const thumbnailAnchorRef = useRef<HTMLAnchorElement>(null);

  const onRecordingReq = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      setStreamObj(stream);
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream ? stream : null;
      videoRef.current.play();
      setPreview(true);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const onStartRecording = () => {
    if (!streamObj || !preview) return;
    setStartRecord(true);
    const record = new MediaRecorder(streamObj);
    setRecordObj(record);
    record.start();
  };

  const onStopVideoStream = () => {
    if (!recordObj || recordObj.state === "inactive" || !videoRef.current)
      return;
    recordObj.stop();
    setStartRecord(false);
    recordObj.ondataavailable = (event) => {
      if (videoRef.current === null) return;
      const recordingFileUrl = URL.createObjectURL(event.data);
      videoRef.current.srcObject = null;
      videoRef.current.src = recordingFileUrl;
      convertMP4file(recordingFileUrl);
      videoRef.current.play();
      videoRef.current.loop = true;
    };
  };

  const convertMP4file = async (recodingFile: any) => {
    // nextjs.config & nextjs headers 확인
    if (!recodingFile) return;
    setIsCompile(true);
    const ffmpeg = createFFmpeg({
      log: true,
      corePath: "https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js",
    });

    try {
      await ffmpeg.load();
      ffmpeg.FS("writeFile", files.input, await fetchFile(recodingFile));
      await ffmpeg.run("-i", files.input, "-r", "60", files.output);
      await ffmpeg.run(
        "-i",
        files.input,
        "-ss",
        "00:00:01",
        "-frames:v",
        "1",
        files.thumb
      );

      const mp4File = ffmpeg.FS("readFile", files.output);
      const thumbFile = ffmpeg.FS("readFile", files.thumb);

      const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
      const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

      const thumbURL = URL.createObjectURL(thumbBlob);
      const mp4URL = URL.createObjectURL(mp4Blob);

      setFFCompiledFile(mp4URL);
      setFFImageFile(thumbURL);
      setIsDownLoad(true);
      setIsCompile(false);

      ffmpeg.FS("unlink", files.output);
      ffmpeg.FS("unlink", files.thumb);
      ffmpeg.FS("unlink", files.input);
    } catch (error) {
      console.log(error);
      if (error) {
        window.confirm("Please reload window");
      }
    }
  };

  const onDownLoadRecodingFile = () => {
    if (!videoAnchorRef.current || !ffCompiledFile) return;
    videoAnchorRef.current.href = ffCompiledFile;
    videoAnchorRef.current.download = "recodingFile.mp4";
  };

  const onDownLoadThumbnailFile = () => {
    if (!thumbnailAnchorRef.current || !ffImageFile) return;
    thumbnailAnchorRef.current.href = ffImageFile;
    thumbnailAnchorRef.current.download = "thumbnail.jpg";
  };

  const onHome = () => {
    router.replace("/");
  };

  return (
    <PageNav title="Recorder">
      <div className="w-full h-[34rem]">
        <video
          ref={videoRef}
          className="w-full h-[90%] bg-black opacity-80"
        ></video>
        <div className="h-[10%] flex justify-evenly items-center bg-zinc-900">
          <span
            onClick={onRecordingReq}
            className="bg-orange-500 hover:bg-orange-600 transition-all rounded-lg px-2 py-1 text-sm cursor-pointer text-zinc-50"
          >
            Start
          </span>

          <div className="p-2 bg-orange-500 hover:bg-orange-600 transition-all rounded-full cursor-pointer text-zinc-50">
            {startRecord ? (
              <FaVideoSlash onClick={onStopVideoStream} />
            ) : (
              <FaVideo onClick={onStartRecording} />
            )}
          </div>
          {isCompile && <span className="text-zinc-50">loading...</span>}
          {isDownLoad && (
            <>
              <div className="p-1 text-sm bg-orange-500 hover:bg-orange-600 transition-all rounded-lg cursor-pointer">
                <a
                  className="text-zinc-50"
                  ref={videoAnchorRef}
                  onClick={onDownLoadRecodingFile}
                  download
                >
                  DownLoad Video.
                </a>
              </div>
              <div className="p-1 text-sm bg-orange-500 hover:bg-orange-600 transition-all rounded-lg cursor-pointer">
                <a
                  className="text-zinc-50"
                  ref={thumbnailAnchorRef}
                  onClick={onDownLoadThumbnailFile}
                  download
                >
                  DownLoad Thumbnail.
                </a>
              </div>

              <div
                onClick={onHome}
                className="p-1 text-sm bg-orange-500 hover:bg-orange-600 transition-all rounded-lg cursor-pointer"
              >
                <a>Done.</a>
              </div>
            </>
          )}
        </div>
      </div>
    </PageNav>
  );
};
export default Recorder;
