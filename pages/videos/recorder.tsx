/* eslint-disable react/no-unknown-property */
import { NextPage } from "next";
import PageNav from "../../components/PageNav";

import { FaVideo } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
import { useRef, useState } from "react";

const Recorder: NextPage = () => {
  const [startRecord, setStartRecord] = useState(false);
  const [streamObj, setStreamObj] = useState<MediaStream>();
  const [recordObj, setRecordObj] = useState<MediaRecorder>();
  const [isDownLoad, setIsDownLoad] = useState(false);
  const [recodingFile, setRecodingFile] = useState("");

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
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const onStartRecording = () => {
    if (!streamObj) return;
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
      const recordingFile = URL.createObjectURL(event.data);
      videoRef.current.srcObject = null;
      videoRef.current.src = recordingFile;
      setRecodingFile(recodingFile);
      videoRef.current.play();
      videoRef.current.loop = true;
      setIsDownLoad(true);
    };
  };

  const onDownLoadRecodingFile = () => {
    if (!anchorRef.current) return;
    anchorRef.current.download = "Recoding File.webm";
    anchorRef.current.href = "RecodingFile";
  };

  return (
    <PageNav title="Recorder">
      <div className="w-full h-[34rem]">
        <video ref={videoRef} className="w-full h-[90%] border-2"></video>
        <div className="h-[10%] border-2 flex justify-center items-center">
          <div className="text-lg p-2 flex items-center justify-evenly w-full">
            <span
              onClick={onRecordingReq}
              className="bg-orange-500 hover:bg-orange-600 transition-all rounded-lg px-2 py-1 text-sm cursor-pointer"
            >
              Preview
            </span>

            <div className="p-2 bg-orange-500 hover:bg-orange-600 transition-all rounded-full cursor-pointer">
              {startRecord ? (
                <FaVideoSlash onClick={onStopVideoStream} />
              ) : (
                <FaVideo onClick={onStartRecording} />
              )}
            </div>
            {isDownLoad && (
              <div className="p-1 text-sm bg-orange-500 hover:bg-orange-600 transition-all rounded-lg cursor-pointer">
                <a ref={anchorRef} onClick={onDownLoadRecodingFile} download>
                  Start Download
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageNav>
  );
};
export default Recorder;
