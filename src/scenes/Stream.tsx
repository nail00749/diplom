import {Box, Button} from '@mui/material';
import React, {FC, useRef, useState} from 'react';
import Webcam from "react-webcam";


const Stream: FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [capturing, setCapturing] = useState<boolean>(false);


    const handleStartCaptureClick = React.useCallback(async () => {
        await setIsActive(true)
        if (webcamRef.current) {
            setCapturing(true);
            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream as MediaStream, {
                mimeType: "video/webm"
            });
            mediaRecorderRef.current.start();
        }
    }, [webcamRef, setCapturing, mediaRecorderRef]);


    const handleStopCaptureClick = React.useCallback(() => {
        setIsActive(false)
        mediaRecorderRef.current?.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    return (
        <>
            {
                isActive &&
				<Webcam
					audio = {false}
					ref = {webcamRef}
                    //width = {isActive ? 360 : 0}
                    //height = {isActive ? 240 : 0}
					screenshotFormat = "image/jpeg"
					videoConstraints = {{
                        width: 240,
                        height: 300,
                        facingMode: "user",
                        aspectRatio: 16 / 9
                    }}
				/>
            }
            <Box>
                {capturing ? (
                    <Button onClick = {handleStopCaptureClick}>Stop Capture</Button>
                ) : (
                    <Button onClick = {handleStartCaptureClick}>Start Capture</Button>
                )}
            </Box>
        </>
    );
};

export default Stream;
