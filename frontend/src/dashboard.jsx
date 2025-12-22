import { useEffect, useState } from "react";
import { getnotes, createNotes, updateNotes, deleteNotes } from "./api/notes.api";

import CreateNote from "./createNotes";
import NotesGrid from "./noteGrid";
import EditNoteModal from "./editNote";
import "./style/dashboard.css"
import Header from "./header";
// const dummyNotes = [
//   {
//     _id: "1",
//     title: "First Note",
//     content: "This is my first dummy note",
//   },
//   {
//     _id: "2",
//     title: "Second Note",
//     content: "Learning React with dummy data",
//   },
// ];


function Dashboard() {
  const token = localStorage.getItem("token");

  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);

  // useEffect(() => {
  //   setNotes(dummyNotes);
  // }, []);

  useEffect(() => {
    loadNotes();
  }, []);



 const loadNotes = async () => {
  try {
    const data = await getnotes(); // token handled inside api file

     console.log("API RESPONSE:", data, Array.isArray(data));
    setNotes(data);
  } catch (error) {
    console.error(error);
  }
};





// const loadNotes = async () => {
//   const data = await getnotes();
//   console.log("RAW NOTES RESPONSE:", data);
// };





 const addNote = async (note) => {
  try {
    const newNote = await createNotes(note);
    setNotes([newNote, ...notes]);
  } catch (error) {
    console.error(error);
  }
};


  // const addNote = (note) => {
  //   const newNote = {
  //     _id: Date.now().toString(), // fake unique ID
  //     ...note,
  //   };

  //   setNotes([newNote, ...notes]);
  // };


  

  // const saveNote = (updatedNote) => {
  //   setNotes(
  //     notes.map((n) =>
  //       n._id === updatedNote._id ? updatedNote : n
  //     )
  //   );
  //   setEditing(null);
  // };
  const saveNote = async (note) => {
  try {
    const updated = await updateNotes(note._id, note);
    setNotes(notes.map(n => n._id === updated._id ? updated : n));
    setEditing(null);
  } catch (error) {
    console.error(error);
  }
};


const removeNote = async (id) => {
  try {
    await deleteNotes(id);
    setNotes(notes.filter((n) => n._id !== id));
  } catch (error) {
    console.error(error);
  }
};


  // const removeNote = (id) => {
  //   setNotes(notes.filter((n) => n._id !== id));
  // };


  return (
<>
  <Header/>
    <div className="dashboard">

      <CreateNote onCreate={addNote} />
      <NotesGrid notes={notes} onEdit={setEditing} onDelete={removeNote} />

      {editing && (
        <EditNoteModal
          note={editing}
          onSave={saveNote}
          onClose={() => setEditing(null)}
        />
      )}
      </div>
      </>
    
  );
}

export default Dashboard;
