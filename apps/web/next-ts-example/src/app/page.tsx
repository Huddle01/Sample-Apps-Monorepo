"use client";
import Button from "./components/Button";
import { useEffect, useRef, useState } from "react";
import VideoElem from "./components/VideoElem";

import {
  useAudio,
  useHuddle01,
  useLobby,
  usePeers,
  useRoom,
  useVideo,
  useEventListener,
  useAcl,
} from "@huddle01/react/hooks";

import { useAppUtils } from "@huddle01/react/app-utils";
import AudioElem from "./components/AudioElem";
import Input from "./components/Input";

export default function Home() {
  // state
  const [peerId, setPeerId] = useState("");
  const [dName, setDName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [avatarLink, setAvatarLink] = useState("");
  const [peerIdToKick, setPeerIdToKick] = useState("");

  // refs
  const videoRef = useRef<HTMLVideoElement>(null);

  // react
  const { roomState, initialize, me } = useHuddle01();
  const { joinLobby, leaveLobby, isLobbyJoined } = useLobby();
  const { joinRoom, leaveRoom } = useRoom();
  const {
    fetchAudioStream,
    stopAudioStream,
    produceAudio,
    stopProducingAudio,
    stream: audioStream,
    micDevices,
    enumerateMicDevices,
    isAudioOn,
  } = useAudio();
  const {
    produceVideo,
    fetchVideoStream,
    stopVideoStream,
    stopProducingVideo,
    stream: videoStream,
    camDevices,
    enumerateCamDevices,
    isVideoOn,
  } = useVideo();
  const { peers } = usePeers();

  const { changePeerRole, kickPeer } = useAcl();

  const COLORS: { [key in typeof roomState]: string } = {
    IDLE: "text-red-500",
    INIT: "text-pink-500",
    LOBBY: "text-yellow-500",
    ROOM: "text-green-500",
  };
  const MEDIA_COLORS = {
    false: "text-red-500",
    true: "text-green-500",
  };

  useEffect(() => {
    if (videoStream && videoRef.current)
      videoRef.current.srcObject = videoStream;
  }, [videoStream]);

  useEventListener("app:mic-on", () => {
    console.log("app:mice-on", { audioStream });
  });
  useEventListener("room:me-role-update", (role) => {
    console.log("room:me-role-update", { role });
  });

  useEventListener("room:data-received", (data) => {
    console.log("Data recvvvvvved", { data });
  });

  const { setDisplayName, changeAvatarUrl, sendData } = useAppUtils();

  useEffect(() => {
    const localRoomId = localStorage.getItem("roomId");
    const localProjectId = localStorage.getItem("projectId");

    setRoomId(localRoomId || "");
    setProjectId(localProjectId || "");
  }, []);

  return (
    <main className="grid min-h-screen flex-col place-items-center ">
      <div className="lg:grid-cols-3  grid w-full p-16">
        <div className="grid gap-3 place-items-center">
          <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Room State:&nbsp;
              <code className={`font-mono font-bold ${COLORS[roomState]}`}>
                {roomState}
              </code>
            </p>
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              isVideoOn:&nbsp;
              <code>{isVideoOn.toString()}</code>
            </p>
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              isAudioOn:&nbsp;
              <code>{isAudioOn.toString()}</code>
            </p>
          </div>
          <div>Peers: {JSON.stringify(peers)}</div>
          <div>Me: {JSON.stringify(me)}</div>
          <div className="relative bg-zinc-800 aspect-video rounded-lg w-96 overflow-hidden">
            <video
              className="absolute w-full top-1/2 -translate-y-1/2"
              ref={videoRef}
              autoPlay
            />
            {/* <audio ref={audioRef} autoPlay className="" /> */}
          </div>
          <div className=" flex gap-3">
            {Object.values(peers).map(({ cam, peerId, avatarUrl }, i) => (
              <>{cam && <VideoElem key={`cam-${peerId}`} track={cam} />}</>
            ))}
            {Object.values(peers).map(({ mic, peerId }, i) => (
              <>{mic && <AudioElem key={`mic-${peerId}`} track={mic} />}</>
            ))}
          </div>
        </div>

        <div className="col-span-2	">
          <Input
            type="text"
            placeholder="Project ID"
            value={projectId}
            onChange={(e) => {
              localStorage.setItem("projectId", e.target.value);
              setProjectId(e.target.value);
            }}
          />
          <Input
            type="text"
            value={roomId}
            placeholder="Room ID "
            onChange={(e) => {
              localStorage.setItem("roomId", e.target.value);
              setRoomId(e.target.value);
            }}
          />

          <div>Room</div>
          <div className="flex gap-3  w-full">
            <Button
              disabled={!initialize.isCallable}
              onClick={() => {
                // initialize(projectId);
                // initialize("FZH_PxAeQNgac-tWxjRJPWHBs_uuMSRw");
                initialize("pSNb4vwvAz7bbzQdVYCpHWHPO-BTV2oz"); // Prod
              }}
            >
              initialize()
            </Button>
            <Button
              disabled={!joinLobby.isCallable}
              onClick={() => {
                // joinLobby(roomId);
                // joinLobby("bui-itha-bta");
                joinLobby("sun-yyot-hus"); // Prod
              }}
            >
              joinLobby()
            </Button>
            <Button disabled={!joinRoom.isCallable} onClick={joinRoom}>
              joinRoom()
            </Button>
            <Button disabled={!leaveLobby.isCallable} onClick={leaveLobby}>
              leaveLobby()
            </Button>
            <Button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
              leaveRoom()
            </Button>
          </div>

          <div>Audio</div>
          <div className="flex gap-3">
            <Button
              disabled={!enumerateMicDevices.isCallable}
              onClick={async () => {
                const enumMicDevices = await enumerateMicDevices();
                console.log({ enumMicDevices });
              }}
            >
              enumerateMicDevices()
            </Button>
            <Button
              disabled={!fetchAudioStream.isCallable}
              onClick={async () => {
                const fetchedStream = await fetchAudioStream(
                  micDevices[0]?.deviceId
                );
                console.log({ fetchedStream });
              }}
            >
              fetchAudioStream()
            </Button>
            <Button
              disabled={!produceAudio.isCallable}
              onClick={() => {
                audioStream && produceAudio(audioStream);
              }}
            >
              produceAudio()
            </Button>

            <Button
              disabled={!stopAudioStream.isCallable}
              onClick={stopAudioStream}
            >
              stopAudioStream()
            </Button>
            <Button
              disabled={!stopProducingAudio.isCallable}
              onClick={() => {
                stopProducingAudio();
              }}
            >
              stopProducingAudio()
            </Button>
          </div>

          <div>Video</div>
          <div className="flex gap-3">
            <Button
              disabled={!enumerateCamDevices.isCallable}
              onClick={async () => {
                const enumCamDevices = await enumerateCamDevices();
                console.log({ enumCamDevices });
              }}
            >
              enumerateCamDevices()
            </Button>

            <Button
              disabled={!fetchVideoStream.isCallable}
              onClick={async () => {
                const fetchedStream = await fetchVideoStream(
                  camDevices[0]?.deviceId
                );
                console.log({ fetchedStream });
              }}
            >
              fetchVideoStream()
            </Button>

            <Button
              disabled={!produceVideo.isCallable}
              onClick={() => produceVideo(videoStream)}
            >
              produceVideo()
            </Button>

            <Button
              disabled={!stopVideoStream.isCallable}
              onClick={stopVideoStream}
            >
              stopVideoStream()
            </Button>

            <Button
              disabled={!stopProducingVideo.isCallable}
              onClick={stopProducingVideo}
            >
              stopProducingVideo()
            </Button>
          </div>
          <div>ACL</div>
          <div className="gap-3">
            <Input
              type="text"
              value={peerId}
              placeholder="Peer ID"
              onChange={(e) => setPeerId(e.target.value)}
            />

            <Button
              disabled={!changePeerRole.isCallable}
              onClick={() => changePeerRole(peerId, "host")}
            >
              changePeerRole(host)
            </Button>
            <Button
              disabled={!changePeerRole.isCallable}
              onClick={() => changePeerRole(peerId, "peer")}
            >
              changePeerRole(peer)
            </Button>

            <Button
              disabled={!changePeerRole.isCallable}
              onClick={() => changePeerRole(peerId, "peer")}
            >
              changePeerRole(peer)
            </Button>

            <br />
            <Input
              type="text"
              value={peerIdToKick}
              placeholder="Peer ID to kick"
              onChange={(e) => setPeerIdToKick(e.target.value)}
            />

            <Button
              disabled={!kickPeer.isCallable}
              onClick={() => kickPeer(peerIdToKick)}
            >
              kickPeer()
            </Button>
          </div>
          <div>App Utils</div>
          <div className="flex gap-3">
            <Input
              type="text"
              value={dName}
              placeholder="Display Name"
              onChange={(e) => setDName(e.target.value)}
            />

            <Button
              disabled={!setDisplayName.isCallable}
              onClick={() => setDisplayName(dName)}
            >
              setDisplayName()
            </Button>
            <Input
              type="text"
              value={avatarLink}
              placeholder="Avatar URL"
              onChange={(e) => setAvatarLink(e.target.value)}
            />

            <Button
              disabled={!changeAvatarUrl.isCallable}
              onClick={() => changeAvatarUrl(avatarLink)}
            >
              changeAvatarUrl()
            </Button>
          </div>
          <Button
            disabled={!sendData.isCallable}
            onClick={() => sendData("*", { hello: "hello workrk" })}
          >
            sendData()
          </Button>
        </div>
      </div>
    </main>
  );
}
