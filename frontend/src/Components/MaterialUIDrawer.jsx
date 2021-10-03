import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MaterialUIDropzone } from '.';
import axios from 'axios'

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    menu:{
        main:'#ffffff'
    }
  },
});

const MaterialUIDrawer = (props) => {
    
    const [open,setOpen] = useState(false)

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


    const list = () => {
        return <Box
            role="presentation"
            sx={{ width: 250 }}
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
        >
            <List>
                {[{name:'Home',icon:<HomeRoundedIcon/>,link:"/"},{name:'Transcripts',icon:<ReceiptRoundedIcon/>,link:"/transcripts"},{name:'Visualizations',icon:<AutoGraphRoundedIcon/>,link:"/visualizations"},{name:'Live Transcript',icon:<LiveTvRoundedIcon/>,link:"/livetranscript"}].map((screen,index) => (
                    <Link to={screen.link} style={{textDecoration:"none",color:"black"}}>
                        <ListItem button key={screen.name}>
                            <ListItemIcon>
                                {screen.icon}
                            </ListItemIcon>
                            <ListItemText primary={screen.name}/>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    }

    return ( 
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <ThemeProvider theme={theme}>
                            <Button color="menu" onClick={() => setOpen(true)}>
                                <MenuRoundedIcon/>
                            </Button>
                            <MaterialUIDropzone onSave={addFile}/>
                        </ThemeProvider>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                variant="temporary"
                open={open}
                onClose={() => setOpen(false)}
            >
                {list()}
            </Drawer>
        </React.Fragment>
     );
}
 
export default MaterialUIDrawer;