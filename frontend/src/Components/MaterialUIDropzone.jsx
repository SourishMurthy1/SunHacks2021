import React,{useState} from 'react';
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary:{
          main:'#00FFFF'
      }
    },
});

const MaterialUIDropzone = props => {
    const [open, setOpen] = useState(false);
      
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button color="primary" onClick={() => setOpen(true)}>
                    Add audio file
                </Button>
            </ThemeProvider>

            <DropzoneDialog
                acceptedFiles={['audio/mpeg']}
                cancelButtonText={"cancel"}
                submitButtonText={"submit"}
                maxFileSize={5000000}
                open={open}
                onClose={() => setOpen(false)}
                onSave={(files) => {
                    console.log('Files:', files);
                    props.onSave(files[0])
                    setOpen(false);
                }}
                showPreviews={true}
                showFileNamesInPreview={true}
            />
        </div>
      )
}

export default MaterialUIDropzone