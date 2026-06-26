import React, { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    if (editId !== null) {
      setNotes(
        notes.map((n) =>
          n.id === editId ? { ...n, title, content } : n
        )
      );
      setEditId(null);
    } else {
      setNotes([
        {
          id: Date.now(),
          title,
          content,
        },
        ...notes,
      ]);
    }

    setTitle("");
    setContent("");
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  };

  const deleteNote = (id) => {
    if (window.confirm("Delete this note?")) {
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        background: "#f4f4f4",
        minHeight: "100vh",
        padding: 30,
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center" }}>📝 Notes Maker</h1>

      <div
        style={{
          maxWidth: 700,
          margin: "20px auto",
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 0 10px gray",
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
          }}
        />

        <textarea
          rows="5"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
          }}
        ></textarea>

        <button
          onClick={saveNote}
          style={{
            marginTop: 15,
            width: "100%",
            padding: 12,
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {editId ? "Update Note" : "Save Note"}
        </button>

        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 10,
          }}
        />
      </div>

      <div
        style={{
          maxWidth: 700,
          margin: "auto",
        }}
      >
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center" }}>No Notes Found</p>
        ) : (
          filtered.map((note) => (
            <div
              key={note.id}
              style={{
                background: "#fff",
                marginTop: 15,
                padding: 15,
                borderRadius: 10,
                boxShadow: "0 0 5px gray",
              }}
            >
              <h3>{note.title}</h3>
              <p>{note.content}</p>

              <button
                onClick={() => editNote(note)}
                style={{
                  marginRight: 10,
                  background: "green",
                  color: "#fff",
                  border: "none",
                  padding: "8px 15px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteNote(note.id)}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "8px 15px",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}