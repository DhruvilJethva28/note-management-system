import NoteCard from "./noteCard";
import "./style/grid.css"

function NotesGrid({ notes = [], onEdit, onDelete }) {
  if (!Array.isArray(notes)) return null;

  return (
    <div className="notes-grid"style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 200px)", gap: "10px" }}>
      {notes.map((note) => (
        <NoteCard
          key={note?._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
export default NotesGrid