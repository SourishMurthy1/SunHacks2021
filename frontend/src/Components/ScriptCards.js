import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import meetingIMG from '../Assets/meetings.jpg'
import Transcripts from '../Screens/Transcripts'
import { Link } from 'react-router-dom'

export default function ActionAreaCard(props) {
  return (
    <Link to={'transcripts'}> 
      <Card sx={{ maxWidth: 1500 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image='https://sloanreview.mit.edu/wp-content/uploads/2020/05/GEN-Rogelberg-Remote-Virtual-Zoom-Meeting-Video-Conference-1290x860-1.jpg'
            alt="meeting"
          />
          <CardContent>
            <Typography textAlign='center' gutterBottom variant="h5" component="div">
              {props.meeting}
            </Typography>
            <Typography textAlign='center' variant="body2" color="text.secondary">
              {props.date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>

  );
}
