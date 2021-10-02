import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const MaterialUIDrawer = (props) => {
    
    const [open,setOpen] = useState(false)

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
            <Button onClick={() => setOpen(true)}>
                <MenuRoundedIcon/>
            </Button>
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