
import React, {useEffect, useRef} from 'react';
import ReactHlsPlayer from 'react-hls-player/dist';


function App(props: any) {
    const video = useRef<HTMLVideoElement>(null);
    const src = 'http://192.168.0.77/live/test.m3u8'



    return (
        <div className = "App">
            <h1>hello</h1>
            <ReactHlsPlayer
                playerRef={video}
                src={src}
            />

        </div>
    );
}

export default App;
