import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { startNewNote } from "../../store/journal/thunks";
import { useDispatch, useSelector } from "react-redux";

export const JournalPage = () => {
  const dispatch = useDispatch();
  const {isSaving, active} = useSelector(state => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      {/* <Typography>Mollit id sint mollit amet eu ex proident. Ut enim nostrud ut qui adipisicing cupidatat mollit esse culpa sunt qui dolor aute. Pariatur consectetur voluptate enim nisi incididunt non anim cupidatat ad excepteur ea laboris occaecat. Laborum non anim elit sit. Adipisicing excepteur eu ea veniam deserunt cillum enim nisi. Duis nostrud nisi ex enim in fugiat est eu aliquip irure enim sint. Eu velit est pariatur laboris occaecat eiusmod exercitation amet qui nostrud ad nulla.</Typography> */}
      
      {
        (!!active)
          ? <NoteView/>
          : <NothingSelectedView/>
      }

      {/* <NothingSelectedView /> */}
      {/* <NoteView /> */}

      <IconButton
        onClick={onClickNewNote}
        size='large'
        disabled={isSaving}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
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