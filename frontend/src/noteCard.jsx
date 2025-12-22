import "./style/noteCard.css";

function NoteCard({ note, onEdit, onDelete }) {
  if (!note) return null;

  return (
    <div className="note-card">
      {note.title && <h4 className="note-title">{note.title}</h4>}
      <p className="note-content">{note.content}</p>

      <div className="note-actions">
        <button className="edit-btn" onClick={() => onEdit(note)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(note._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
