import "./App.css"
import { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [notes, setNotes] = useState
    <
    Note[]
    >([ 
    // loads default notes
    // {
    //   id: 1,
    //   title: "Recipe Ideas",
    //   content: "Attempted to make homemade pizza; accidentally created a pizza monster. It grew eyes and started singing Italian opera. Not sure if I've created life or just a really cheesy mess. May need an exorcist.",
    // },
    // {
    //   id: 2,
    //   title: "Meeting Notes",
    //   content: "Attempted to decipher Bob's mysterious meeting doodles. Came to the conclusion that they may be secret maps to the office snack stash. Must investigate further and potentially form a snack heist team!",
    // },
    // {
    //   id: 3,
    //   title: "Project Ideas",
    //   content: "Brainstormed app ideas: a 'Where Did I Leave My Keys?' tracker to end the eternal key hunt and a 'Socks Pairing' app to match socks that have lost their soulmates. The world clearly needs these innovations.",
    // },
    // {
    //   id: 4,
    //   title: "Gift Ideas",
    //   content: "Birthday gift ideas for mom: a 'World's Okayest Mom' mug to keep her humble and a lifetime supply of dad jokes because her sense of humor is second to none. Also considering a 'How to Text Emojis' handbook for comedic value.",
    // }
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = 
    useState<Note | null>(null);
  
  useEffect(()=> {
    const fetchNotes = async ()=> {
      try {
        const response =
          await fetch("http://localhost:5001/api/notes")
        
        const notes: Note[] = await response.json()

        setNotes(notes)

      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, []);

  // sets selected note if a note is clicked on
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }



  // function to create a new note when 'submit' button is pressed
  const handleAddNote = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {

      const response =
      await fetch(
        "http://localhost:5001/api/notes",
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content
          })
        }
      );
      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };



  // updates note if a note is selected and saved, then resets form
  const handleUpdateNote = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const response =
      await fetch(
        `http://localhost:5001/api/notes/${selectedNote.id}`,
        {
          method:"PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content
          })
        }
      );
      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id ? updatedNote : note
    );

      // resets form when array is updated
      setNotes(updatedNotesList)
      setTitle("")
      setContent("")
      setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }
  };


  // resets form if updating a note is canceled
  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null);
  }



  // deletes a note
  const deleteNote = async (
    event: React.MouseEvent,
    noteId: number
  ) => {
    event.stopPropagation();

    try {
      await fetch(
        `http://localhost:5001/api/notes/${noteId}`,
        {
          method:"DELETE",
        }
      );

      const updatedNotes = notes.filter(
        (note)=> note.id !== noteId
      )
  
      setNotes(updatedNotes);
    } catch (error) {
      
    }

  }

  return(
  // format of the note form
  <div className="app-container">
    <form 
    className="note-form"
    onSubmit={(event) => 
      selectedNote ? handleUpdateNote(event) : handleAddNote(event)
    }
    >
      <input 
      value={title}
      onChange={(event)=>
        setTitle(event.target.value)
      }
      placeholder="title" 
      required
      ></input>
      <textarea
        value={content}
        onChange={(event)=>
          setContent(event.target.value)
        }
        placeholder="Content"
        rows={10}
        required
        ></textarea>

        
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>
              Cancel
            </button> 
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}


    </form>
    <div className="notes-grid">
      {notes.map((note) => (
      <div 
      className="note-item"
      onClick={() => handleNoteClick(note)}
      >
        <div className="notes-header">
        <button 
        onClick={(event)=>
          deleteNote(event, note.id)
        }>x</button>
      </div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
    ))}
  </div>
  </div>
  );
};

export default App;