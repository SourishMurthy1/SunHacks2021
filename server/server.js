const express = require('express')
const app = express()

const axios = require("axios");
const fs = require("fs");
const cors = require('cors')

var aws = require('aws-sdk');
var bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())

require('dotenv').config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
region: 'us-west-1', // Put your aws region here
accessKeyId: process.env.AWS_ACCESS_KEY_ID,
secretAccessKey: process.env.AWS_SECRET_KEY
})

const S3_BUCKET = process.env.BUCKET_NAME


const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: process.env.ASSEMBLY_AI_AUTHORIZATION,
        "content-type": "application/json",
        "transfer-encoding": "chunked",
    },
});

var id = ""

function sendFileForTranscription(req,res) {
    
    assembly
        .post(`/transcript`, {
            audio_url: req.body["audio_url"],
            auto_highlights: true, 
            speaker_labels: true,
            filter_profanity: true,
            iab_categories: true
        })
        .then((res) => {
            id = res.data["id"];
        })
        .catch((err) => console.error(err));
                
}

function poll(id){
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


const sign_s3 = (req,res) => {
    const s3 = new aws.S3();  // Create a new instance of S3
    console.log("REQ BODY:- ",req.body)
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 3000,
    ContentType: fileType,
    ACL: 'public-read'
    };
    // Make a request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
        console.log(err);
        res.json({error: err})
        }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
        const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.json({data:{returnData}});
    });
}


app.post('/trans', function (req, res) {
   sendFileForTranscription(req,res)
})

app.get('/poll', function (req, res) {
    poll(id);
    res.send('Hello World')
})

app.post('/sign_s3',function(req,res){
    sign_s3(req,res)
})

app.listen(3003)