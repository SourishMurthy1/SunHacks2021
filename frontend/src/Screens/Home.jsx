import React, { useState } from "react";
import styled from "styled-components";
import { FilePicker } from 'react-file-picker'
const https = require('https')

const Home = (props) => {

    const transoptions = {
        hostname: 'localhost',
        port: 3003,
        path: '/trans',
        method: 'GET'
      }

      const polloptions = {
        hostname: 'localhost',
        port: 3003,
        path: '/poll',
        method: 'GET'
      }

    const addFile = () => {
        
        // const req = https.request(transoptions, res => {
        //   console.log(`statusCode: ${res.statusCode}`)
        
        //   res.on('data', d => {
        //     console.log(d)
        //   })
        // })
        
        // req.on('error', error => {
        //   console.error(error)
        // })
        
        // req.end()
    }

    const poll = () => {
        // const req = https.request(polloptions, res => {
        //     console.log(`statusCode: ${res.statusCode}`)
          
        //     res.on('data', d => {
        //       console.log(d)
        //     })
        //   })
          
        //   req.on('error', error => {
        //     console.error(error)
        //   })
          
        //   req.end()
    }

    

return (
    <div>
        <h1>Home</h1>
        <div>
            <button onClick={addFile}>upload File</button>
        </div>
        <div>
            <button onClick={poll}>Poll</button>
        </div>
        {/* <FilePicker
            extensions={['mp3']}
            onChange={FileObject => (console.log(FileObject))}
            onError={errMsg => (console.log(errMsg))}
                >
                <button>
                    Upload Mp3 file
                </button>
            </FilePicker> */}
            

    </div>
);
}

export default Home;