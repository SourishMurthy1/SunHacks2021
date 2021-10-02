const express = require('express')
const app = express()

const axios = require("axios");
const fs = require("fs");

const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: "02c1d3eec61740e0a7975f1e7213a167",
        "content-type": "application/json",
        "transfer-encoding": "chunked",
    },
});


const file = "C:\\Users\\bharath\\Downloads\\audio1.mp3"
var id = ""

function sendFile() {
    fs.readFile(file, (err, data) => {
        if (err) return console.error(err);

        assembly
            .post("/upload", data)
            .then((res) => {
              //  console.log(res.data["upload_url"])
                assembly
                    .post(`/transcript`, {
                        audio_url: res.data["upload_url"],
                        auto_highlights: true, 
                        speaker_labels: true,
                        filter_profanity: true,
                        iab_categories: true
                    })
                    .then((res) => {
                      console.log(res.data["id"])
                      id = res.data["id"];
                    })
                    .catch((err) => console.error(err));
                
            })
            .catch((err) => console.error(err));
    });
}

async function poll(id){
    assembly
    .get(`/transcript/${id}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
}

function transcribe() {
    assembly
        .post(`/transcript`, {
            audio_url: res.data["upload_url"]
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
}


app.get('/trans', function (req, res) {
    sendFile()
    res.send('Uploaded. Hit /poll to check for results')
})

app.get('/poll', function (req, res) {
    poll(id);
    res.send('Hello World')
})

app.listen(3003)