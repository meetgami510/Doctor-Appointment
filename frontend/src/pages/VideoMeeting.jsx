import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';


function VideoMeeting() {
    const { roomId } = useParams();
    console.log(roomId);
    const fun = async (element) => {
        const appId = process.env.REACT_APP_appID;
        const serverSecret = process.env.REACT_APP_serverSecret;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, Date.now().toString(), "Drumil");
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "Copy Link",
                    url: `${process.env.REACT_APP_meetinglink}/${roomId}`
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