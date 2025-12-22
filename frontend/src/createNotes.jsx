// import { useState } from "react";

// function CreateNote({onCreate}){
// const [note,setNote]=useState({title:"",content:""})
// const [expand,setExpand]=useState(false)

// const submit=()=>{
//     if(!note.title && !note.content) return
//     onCreate(note)
//     setNote({title:"",content:""})
//     setExpand(false)
    


//       return (
//     <div onClick={() => setExpand(true)}>
//       {expand && (
//         <input
//           placeholder="Title"
//           value={note.title}
//           onChange={(e) => setNote({ ...note, title: e.target.value })}
//         />
//       )}
//       <textarea
//         placeholder="Take a note..."
//         value={note.content}
//         onChange={(e) => setNote({ ...note, content: e.target.value })}
//       />
//       {expand && <button onClick={submit}>Save</button>}
//     </div>
//       )
// }
// }


// export default CreateNote;

import { useState } from "react";
import "./style/createNote.css";

function CreateNote({ onCreate }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [expand, setExpand] = useState(false);

  const submit = () => {
    if (!note.title && !note.content) return;
    onCreate(note);
    setNote({ title: "", content: "" });
    setExpand(false);
  };

  return (
    <div
      className={`create-note ${expand ? "expanded" : ""}`}
      onClick={() => setExpand(true)}
    >
      {expand && (
        <input
          className="create-note-title"
          placeholder="Title"
          value={note.title}
          onChange={(e) =>
            setNote({ ...note, title: e.target.value })
          }
        />
      )}

      <textarea
        className="create-note-content"
        placeholder="Take a note..."
        value={note.content}
        onChange={(e) =>
          setNote({ ...note, content: e.target.value })
        }
      />

      {expand && (
        <div className="create-note-actions">
          <button onClick={submit}>Save</button>
        </div>
      )}
    </div>
  );
}

export default CreateNote;
