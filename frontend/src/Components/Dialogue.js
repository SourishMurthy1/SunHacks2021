import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ActionCards from '../Components/ScriptCards';
import Highlights from '../Assets/Highlights.PNG'
import Topics from '../Assets/Topics.PNG'
import LiveTrans from '../Assets/LiveTrans.PNG'

export default function ResponsiveDialog(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const name = props.name ;
    return (
        <div>
            
            {/* {Choose(props)} */}
            <Button variant="outlined" onClick={handleClickOpen}>
        {props.name}
      </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {props.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Content
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function Choose(props) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    if (props.name == "Highlights") {
        <img src={Highlights} alt="Highlights" onClick={handleClickOpen} />
    } else if (props.name == "Topics") {
        <img src={Topics} alt="Topics" onClick={handleClickOpen} />
    } else if (props.name == "LiveTrans") {
        <img src={LiveTrans} alt="Live Transcription" onClick={handleClickOpen} />
    }
}
