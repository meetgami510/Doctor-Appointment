import React, { useContext, useEffect } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utilities/axiosInstance';
import { message } from 'antd';
import { CookiesContext } from '../context/CookiesProvider';


function VideoMeeting() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const { cookies } = useContext(CookiesContext);
    useEffect(() => {
        const { token } = cookies;
        const fun1 = async () => {
            try {
                const response = await axiosInstance.post('/user/verify-video-meeting-id', { roomId },
                    {
                        headers: {
                            authorization: "Bearer " + token,
                        },
                    });
                if (false === response.data.success) {
                    navigate('/')
                }
            } catch (error) {
                console.log("filad")
                alert(error.message)
                if (error.message.includes("authenitication is failed")) {
                    navigate('/')
                }
                message.error(error.message);
            }
        }
        fun1();
    }, [roomId])
    console.log(roomId);
    const fun = async (element) => {
        const appId = Number(process.env.REACT_APP_appID);
        const serverSecret = process.env.REACT_APP_serverSecret;
        console.log(appId)
        console.log(serverSecret)
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