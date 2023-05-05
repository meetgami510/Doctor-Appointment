import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';


function VideoMeeting() {
    const { roomId } = useParams();
    console.log(roomId);
    const fun = async (element) => {
        const appId = 870658956;
        const serverSecret = "e53c3721913aa21586e3fb29dff3e2a6";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, Date.now().toString(), "Drumil");
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "Copy Link",
                    url: `http://localhost:3000/video-meeting/${roomId}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            }
        }
        )
    }
    return (
        <div className="App">
            <div ref={fun} />
        </div>
    )
}

export default VideoMeeting