import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../stroe/journal"

import { ImageGallery } from "../components"
import { useState } from "react"


export const NoteView = () => {

    const [isUploadingImages, setIsUploadingImages] = useState(false)
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    const dispatch = useDispatch();
   

    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        
        return newDate.toUTCString(); 
    }, [date])


    const fileInputRef = useRef();

    useEffect(() => {
      dispatch( setActiveNote(formState) )
    

    }, [formState])

    useEffect(() => {
      
        if( messageSaved.length <= 0 ) return;
         
        Swal.fire('Nota actualizada', messageSaved, 'success')

    }, [messageSaved])
    
    
    const onSaveNote = () => {
       dispatch( startSaveNote() );
    };

    useEffect(() => {
        
        if( !isUploadingImages ) return Swal.update({ title: 'Archivos subidos correctamente', text: '', icon: 'success'});

        Swal.fire({title: 'Subiendo', text:'Sus archivos se están subiendo',didOpen: () => { Swal.showLoading()}, didRender: () => { Swal.hideLoading()} })
        
      
    }, [isUploadingImages])
    
    useEffect(() => {
      
        setIsUploadingImages( false )
      
        
    }, [note.imageUrls])
    

   const onFileInputChange = ({target}) => {
        if( target.files === 0 )return;

       setIsUploadingImages( true )
       
        
        dispatch(startUploadingFiles(target.files))
        
   }; 

   const onDelete = () => {

       dispatch( startDeletingNote());
       Swal.fire({
        title: 'Nota Borrada', 
        text:'Su nota fue borrada correctamente', 
        icon: 'success', 
        showClass: { popup: 'animate__animated animate__fadeInLeftBig'}, 
        hideClass: {popup: 'animate__animated animate__backOutRight' }})
   }

  return (
    <Grid container className="animate__animated animate__fadeIn animate__faster" direction="row" justifyContent="space-between" alignItems="center" sx={{mb:1, height: '87.5vh'}}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{dateString}</Typography>
        </Grid>
        <Grid item>
            <input type="file" ref={ fileInputRef } multiple  onChange={ onFileInputChange } style={{ display: 'none'}}/>

            <IconButton color="primary" disabled={ isSaving } onClick={ () => fileInputRef.current.click() } >
                <UploadOutlined/>
            </IconButton>

            <Button color="primary" sx={{ padding: 2 }} onClick={onSaveNote} disabled={ isSaving} >
                <SaveOutlined sx={{fontSize: 30, mr: 1}} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Titulo"
                sx={{ border: 'none', mb: 1}}
                value={ title }
                name="title"
                onChange={ onInputChange }
            />
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="Que sucedió en el dia de hoy?"
                minRows={ 5 }
                value={ body }
                name="body"
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent="end">
            <Button onClick={ onDelete } sx={{mt: 2}} color="error">
                <DeleteOutline/>
                Delete
            </Button>
        </Grid>

        <ImageGallery images={ note.imageUrls}/>

    </Grid>
  )
}
