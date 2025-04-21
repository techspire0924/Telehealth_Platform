// import { useEffect, useRef } from 'react'
// import { useParams } from 'react-router-dom'
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
// import { useAuth } from '../../context/AuthContext'


// const ConsultDoctor = () => {
//   const { roomId } = useParams()
//   const { user } = useAuth()
//   const meetingRef = useRef(null)

//   useEffect(() => {
//     const myMeeting = async (element) => {
//       const appID = 576620555
//       const serverSecret = '5e71e525873207a400c3557dc9b687b8'
//       const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//         appID,
//         serverSecret,
//         roomId,
//         Date.now().toString(),
//         user?.name || 'guest'
//       )
//       const zc = ZegoUIKitPrebuilt.create(kitToken)
//       zc.joinRoom({
//         container: element,
//         sharedLinks: [
//           {
//             name: 'Copy Link',
//             url: `http://localhost:5173/room/${roomId}`,
//           },
//         ],
//         scenario: {
//           mode: ZegoUIKitPrebuilt.OneONoneCall,
//         },
//         showScreenSharingButton: true,
//       })
//     }

//     if (meetingRef.current) {
//       myMeeting(meetingRef.current)
//     }
//   }, [roomId, user])

//   return <div ref={meetingRef} />
// }

// export default ConsultDoctor



import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useAuth } from '../../context/AuthContext';
import { io } from 'socket.io-client';
import ringingSound from '../../assets/sounds/ringing.wav';

const socket = io('http://localhost:8000'); // Ensure the correct port is used

const ConsultDoctor = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const meetingRef = useRef(null);
  const ringingRef = useRef(new Audio(ringingSound));

  useEffect(() => {
    if (user?._id) {
      socket.emit('join', { userId: user._id });
    }

    socket.on('incomingCall', (data) => {
      ringingRef.current.play();
      alert(`Incoming call from ${data.patientName}`);
    });

    const myMeeting = async (element) => {
      const appID = 882539136;
      const serverSecret = '38097328a35d0598cbf0021550f019b2';
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        user?.name || 'guest'
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);

      zc.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy Link',
            url: `http://localhost:5173/room/${roomId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
        videoResolutionList: [
          ZegoUIKitPrebuilt.VideoResolution_360P,
          ZegoUIKitPrebuilt.VideoResolution_180P,
          ZegoUIKitPrebuilt.VideoResolution_480P,
          ZegoUIKitPrebuilt.VideoResolution_720P,
        ],
     videoResolutionDefault: ZegoUIKitPrebuilt.VideoResolution_360P, 

      });

      zc.on('roomStateUpdate', (state) => {
        if (state === 'CONNECTED') {
          ringingRef.current.pause();
          ringingRef.current.currentTime = 0;
        }
      });
    };

    if (meetingRef.current) {
      myMeeting(meetingRef.current);
    }
  }, [roomId, user]);

  return <div ref={meetingRef} />;
};

export default ConsultDoctor;
