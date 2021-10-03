import React, { useState } from "react";
import styled from "styled-components";
import {MaterialUIDropzone} from '../Components'
const https = require('https')
const axios = require('axios')

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
    
    async function audioToBase64(audioFile) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onerror = reject;
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(audioFile);
        });
    }

    async function getData(audioFile){

        const base64File = await audioToBase64(audioFile)
        let binary = atob(base64File.split(",")[1]);
        let array = [];
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        let blobData = new Blob([new Uint8Array(array)], {
          type: 'audio/mpeg'
        });
        
        return blobData
    }

    const addFile = async (file) => {
        
        const fileName = file.name
        const fileType = file.type
        var signedRequest;
        var uploadURL;
        var options = {
            headers: {
            'Content-Type': fileType,
            }
        };
        axios.post("http://localhost:3003/sign_s3",{
            fileName, //parameter 1
            fileType  //parameter 2
        })
        .then(response => {
            var returnData = response.data.data.returnData;
            signedRequest = returnData.signedRequest;
            uploadURL = returnData.url;
            var url = returnData.url;
        })

        const encodedFile = await getData(file)

        axios.put(signedRequest,encodedFile,options)
        .then(result => {
            alert("audio uploaded")
            axios.post("http://localhost:3003/trans",{
                audio_url:uploadURL
            })
            .then(result => {
                console.log("successful")
            })
            .catch(error => {
                console.log("error :- ",error)
            })
        })
        .catch(error => {
            alert("ERROR " + JSON.stringify(error));
            })

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
        <MaterialUIDropzone onSave={addFile}/>
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