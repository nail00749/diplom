import {Box, Button} from '@mui/material';
import React, {FC, useRef, useState, useEffect} from 'react';
import Webcam from "react-webcam";

const Stream: FC = () => {
    const [isActiveWebCam, setIsActiveWebCam] = useState<boolean>(false);
    const [isActiveScreen, setIsActiveScreen] = useState<boolean>(false);
    const [capturing, setCapturing] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const screenRef = useRef<HTMLVideoElement | null>(null)
    const stream = useRef<MediaStream | null>(null)

    useEffect(() => {
        return () => {
            handleStopScreen()
            stream.current?.removeEventListener('inactive', handleStopScreen)
        }
    }, [])

    const handleStartCaptureClick = React.useCallback(async () => {
        await setIsActiveWebCam(true)
        if (webcamRef.current) {
            setCapturing(true);
            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream as MediaStream, {
                mimeType: "video/webm"
            });
            mediaRecorderRef.current.start();
        }
    }, [webcamRef, setCapturing, mediaRecorderRef]);


    const handleStopCaptureClick = React.useCallback(() => {
        setIsActiveWebCam(false)
        mediaRecorderRef.current?.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const handleStartScreen = async () => {
        try {
            if (screenRef.current) {
                let displayMediaOptions = {
                    video: {
                        cursor: "always"
                    },
                    audio: false
                };
                stream.current = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions as DisplayMediaStreamConstraints)
                stream.current.addEventListener('inactive', handleStopScreen)
                screenRef.current.srcObject = stream.current
                setIsActiveScreen(true)
            }
        } catch (e) {
            console.log(e)
        }

    }

    const handleStopScreen = () => {
        //todo fix after changing location
        if (stream && stream.current && screenRef && screenRef.current) {
            let tracks = stream.current.getTracks()
            tracks.forEach(t => t.stop())
            screenRef.current.srcObject = null
            setIsActiveScreen(false)
        }
    }

    return (
        <>
            <Box>
                {capturing ? (
                    <Button onClick = {handleStopCaptureClick}>Stop Capture</Button>
                ) : (
                    <Button onClick = {handleStartCaptureClick}>Start Capture</Button>
                )}
                {
                    isActiveWebCam &&
					<Webcam
						audio = {false}
						ref = {webcamRef}
                        //width = {isActiveWebCam ? 360 : 0}
                        //height = {isActiveWebCam ? 240 : 0}
						screenshotFormat = "image/jpeg"
						videoConstraints = {{
                            width: 240,
                            height: 300,
                            facingMode: "user",
                            aspectRatio: 16 / 9
                        }}
					/>
                }
            </Box>
            <Box>
                {
                    isActiveScreen ?
                        <Button
                            onClick = {handleStopScreen}
                        >
                            Stop screen
                        </Button>
                        : <Button
                            onClick = {handleStartScreen}
                        >
                            Start screen
                        </Button>
                }
            </Box>
            <video
                style = {{
                    width: 400,
                    height: 300
                }}
                ref = {screenRef}
                autoPlay
            />

        </>
    );
};

export default Stream;
