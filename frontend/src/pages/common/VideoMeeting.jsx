import React, { useContext, useEffect } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utilities/axiosInstance';
import { message } from 'antd';
import { CookiesContext } from '../../context/CookiesProvider';
import { vidoeMeetingLink } from '../../Action/users/paymentVerification';
import { useSelector } from 'react-redux';


function VideoMeeting() {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const { roomId } = useParams();
    const { cookies } = useContext(CookiesContext);
    useEffect(() => {
        const { token } = cookies;
        const fun1 = async () => {
            try {
                const response = await vidoeMeetingLink(token, roomId);
                console.log(response);
                if (response.type === 'error') {
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


    const fun = async (element) => {
        const appId = Number(process.env.REACT_APP_appID);
        const serverSecret = process.env.REACT_APP_serverSecret;

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, Date.now().toString(), `${user.firstName}`);
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
        })
    }
    return (
        <div className="App">
            <div ref={fun} />
        </div>
    )
}

export default VideoMeeting