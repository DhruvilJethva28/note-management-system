import { useState } from "react";

function EditNoteModal({ note, onSave, onClose }) {
  const [edit, setEdit] = useState(note);

  return (
    <div>
      <input
        value={edit.title}
        onChange={(e) => setEdit({ ...edit, title: e.target.value })}
      />
      <textarea
        value={edit.content}
        onChange={(e) => setEdit({ ...edit, content: e.target.value })}
      />
      <button onClick={() => onSave(edit)}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default EditNoteModal;
