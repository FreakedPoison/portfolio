const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const addBtn = document.getElementById("addBtn");
const notesDiv = document.getElementById("notes");
const searchInput = document.getElementById("search");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editingNoteId = null;

// -------------------- SAVE --------------------
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// -------------------- RENDER --------------------
function renderNotes(notesToRender = notes) {
  notesDiv.innerHTML = "";

  notesToRender.forEach(note => {
    const noteEl = document.createElement("div");
    noteEl.className = "note";

    noteEl.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="editNote(${note.id})">Edit</button>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `;

    notesDiv.appendChild(noteEl);
  });
}

// -------------------- ADD / UPDATE --------------------
addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) return;

  if (editingNoteId === null) {
    notes.push({
      id: Date.now(),
      title,
      content
    });
  } else{
    const note = notes.find(n => n.id === editingNoteId);
    note.title = title;
    note.content = content;

    editingNoteId = null;
    addBtn.innerText = "Add Note";
  }
  saveNotes();
  renderNotes();

  titleInput.value = "";
  contentInput.value = "";
});

// -------------------- EDIT --------------------
function editNote(id) {
  const note = notes.find(n => n.id === id);

  titleInput.value = note.title;
  contentInput.value = note.content;

  editingNoteId = id;
  addBtn.innerText = "Update Note";
}

// -------------------- DELETE --------------------
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  renderNotes();
}

// -------------------- SEARCH --------------------
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query)
  );

  renderNotes(filteredNotes);
});

// initial render
renderNotes();
