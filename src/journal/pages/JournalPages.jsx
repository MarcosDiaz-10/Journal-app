import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../stroe/journal"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"

export const  JournalPages = () => {

  const { isSaving, active } = useSelector( state => state.journal)
  const dispatch = useDispatch();


  const onClickNewNote = () => {
    
    dispatch(startNewNote());
  }


  return (
      <JournalLayout >

        {
          (!!active ) ? <NoteView/> : <NothingSelectedView/>
        }

        <IconButton
          onClick={ onClickNewNote }
          size='large'
          disabled={ isSaving }
          sx={{
            color: 'white',
            backgroundColor: 'buttonfloating.main',
            ':hover': { backgroundColor: 'buttonfloating.main', opacity: 0.9},
            position: 'fixed',
            right: 50,
            bottom: 50
          }}
        >
          <AddOutlined sx={{fontSize: 30}}/>
        </IconButton>
      </JournalLayout>
    
  )
}
