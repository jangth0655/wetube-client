/* eslint-disable react/no-unknown-property */
import { NextPage } from "next";
import PageNav from "../../../components/PageNav";
const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");

import { FaVideo } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

const Recorder: NextPage = () => {
  const router = useRouter();
  const [preview, setPreview] = useState(false);
  const [startRecord, setStartRecord] = useState(false);
  const [streamObj, setStreamObj] = useState<MediaStream>();
  const [recordObj, setRecordObj] = useState<MediaRecorder>();
  const [isDownLoad, setIsDownLoad] = useState(false);
  const [isCompile, setIsCompile] = useState(false);

  const [recodingFile, setRecodingFile] = useState("");
  const [ffCompiledFile, setFFCompiledFile] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

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
      setRecodingFile(recordingFileUrl);
      videoRef.current.play();
      videoRef.current.loop = true;
    };
  };

  const convertMP4file = async (recodingFile: any) => {
    if (!recodingFile) return;
    setIsCompile(true);
    const ffmpeg = createFFmpeg({
      log: true,
      corePath: "https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js",
    });

    try {
      await ffmpeg.load();
      ffmpeg.FS(
        "writeFile",
        "RecodingFile.webm",
        await fetchFile(recodingFile)
      );
      await ffmpeg.run("-i", "RecodingFile.webm", "-r", "60", "output.mp4");
      const mp4File = ffmpeg.FS("readFile", "output.mp4");
      const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
      const mp4URL = URL.createObjectURL(mp4Blob);
      setFFCompiledFile(mp4URL);
      setIsDownLoad(true);
      setIsCompile(false);
    } catch (error) {
      console.log(error);
      if (error) {
        window.confirm("Please reload window");
      }
    }
  };

  const onDownLoadRecodingFile = async () => {
    // nextjs.config & nextjs headers 확인
    console.log("download recodingfile", recodingFile);
    if (!anchorRef.current || !ffCompiledFile) return;
    console.log("onDownload", ffCompiledFile);
    anchorRef.current.href = ffCompiledFile;
    anchorRef.current.download = "recodingFile.mp4";
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
            Preview
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
            <div className="p-1 text-sm bg-orange-500 hover:bg-orange-600 transition-all rounded-lg cursor-pointer">
              <a
                className="text-zinc-50"
                ref={anchorRef}
                onClick={onDownLoadRecodingFile}
                download
              >
                Start Download
              </a>
            </div>
          )}
        </div>
      </div>
    </PageNav>
  );
};
export default Recorder;
