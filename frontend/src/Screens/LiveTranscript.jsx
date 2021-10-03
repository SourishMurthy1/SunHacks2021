import React, { Component } from 'react';
import MicGIF from '../Assets/MicGIF.gif'

const LiveTranscript = (props) => {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Live Transcription</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={MicGIF} style={{ paddingTop: '10px', width: '100px' }} />
            </div>
            <div>
                <textarea style={{paddingLeft: "10px", paddingTop: "10px", width: "1250px", height: "700px"}}>
                    This is simple textarea
                </textarea>
            </div>
        </div>
    );
}

export default LiveTranscript; 