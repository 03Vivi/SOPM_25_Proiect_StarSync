import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// --- ICONIȚE SVG INTERNE ---
const IconList = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const IconEdit = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;
const IconPin = ({fill}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>;
const IconPalette = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
const IconChart = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IconLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IconRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IconQuote = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 .5-.5 1-1 1c-1 0-2-.5-2-1.5"/><path d="M20 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 .5-.5 1-1 1c-1 0-2-.5-2-1.5"/></svg>;
const IconMagic = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 6-2.5 2.5"/><path d="m21 8-2.5-2.5"/><path d="m17 4 3 3"/><path d="m14 7-2.5 2.5"/><path d="m16.5 9.5-2.5-2.5"/><path d="m11.5 7 3 3"/><path d="m3 21 9-9"/><path d="m2 22 10-10"/></svg>;

// --- LISTA DE CITATE ---
const motivationalQuotes = [
  { text: "Nu renunța niciodată la un vis doar pentru că necesită timp. Timpul va trece oricum.", author: "Earl Nightingale" },
  { text: "Succesul nu este final, eșecul nu este fatal: curajul de a continua este ceea ce contează.", author: "Winston Churchill" },
  { text: "Crede că poți și ești deja la jumătatea drumului.", author: "Theodore Roosevelt" },
  { text: "Viitorul aparține celor care cred în frumusețea visurilor lor.", author: "Eleanor Roosevelt" },
  { text: "Singurul mod de a realiza lucruri minunate este să iubești ceea ce faci.", author: "Steve Jobs" },
  { text: "Fii schimbarea pe care vrei să o vezi în lume.", author: "Mahatma Gandhi" },
  { text: "Nu te uita la ceas; fă ce face el. Continuă să mergi.", author: "Sam Levenson" },
  { text: "Fericirea nu este ceva deja făcut. Ea vine din propriile tale acțiuni.", author: "Dalai Lama" },
  { text: "Totul pare imposibil până când este făcut.", author: "Nelson Mandela" },
  { text: "Nu poți traversa marea doar stând și privind apa.", author: "Rabindranath Tagore" }
];

// --- COMPONENTA MASCOTĂ (STARPET) ---
const StarPet = ({ mood, xp, level }) => {
  // SVG-uri diferite în funcție de mood
  const HappyFace = () => (
    <svg className="pet-svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#fffdac" stroke="#ffb7b2" strokeWidth="3" />
      <circle cx="35" cy="40" r="5" fill="#333" />
      <circle cx="65" cy="40" r="5" fill="#333" />
      <path d="M 30 60 Q 50 75 70 60" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="50" r="5" fill="#ffb7b2" opacity="0.6" />
      <circle cx="80" cy="50" r="5" fill="#ffb7b2" opacity="0.6" />
    </svg>
  );

  const SadFace = () => (
    <svg className="pet-svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#e0e0e0" stroke="#999" strokeWidth="3" />
      <circle cx="35" cy="45" r="5" fill="#333" />
      <circle cx="65" cy="45" r="5" fill="#333" />
      <path d="M 30 70 Q 50 55 70 70" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
      <path d="M 30 35 L 40 40" stroke="#333" strokeWidth="2" />
      <path d="M 70 35 L 60 40" stroke="#333" strokeWidth="2" />
    </svg>
  );

  return (
    <div className="star-pet-container">
      {mood === 'happy' ? <HappyFace /> : <SadFace />}
      <div>
        <div className="pet-dialog">
          {mood === 'happy' ? "Sunt fericit! Continuă așa! ✨" : "Mă simt neglijat... ai task-uri expirate. 😢"}
        </div>
        <div className="xp-text" style={{fontSize:'0.75rem', marginTop: '5px'}}>
          Nivelul {level} • {xp} XP
        </div>
        <div className="xp-container">
          <div className="xp-bar" style={{width: `${Math.min(xp, 100)}%`}}></div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // --- STATE INITIALIZATION ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('starSyncTasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  // App Config States
  const [activeTab, setActiveTab] = useState('tasks');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterMode, setFilterMode] = useState('all'); // all, today, week, overdue
  const [theme, setTheme] = useState('cute'); // cute, dark, pastel
  const [showStats, setShowStats] = useState(false);
  
  // Gamification States
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('starSyncXP')) || 0);
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem('starSyncLevel')) || 1);
  const [petMood, setPetMood] = useState('happy');

  // Input States
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  // Quotes State
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);

  // Editing & Undo States
  const [editingTask, setEditingTask] = useState(null); // Task object being edited
  const [deletedTask, setDeletedTask] = useState(null); // For Undo
  const [showUndo, setShowUndo] = useState(false);

  // Drag & Drop Refs
  const dragItem = useRef();
  const dragOverItem = useRef();

  // --- EFFECTS ---

  useEffect(() => {
    localStorage.setItem('starSyncTasks', JSON.stringify(tasks));
    
    // Check overdue for Pet Mood
    const now = new Date();
    const hasOverdue = tasks.some(t => new Date(t.deadline) < now && t.status !== 'completed');
    setPetMood(hasOverdue ? 'sad' : 'happy');

  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('starSyncXP', xp);
    localStorage.setItem('starSyncLevel', level);
  }, [xp, level]);

  // Apply Theme
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // --- ACTIONS ---

  const switchTheme = () => {
    const themes = ['cute', 'pastel', 'dark'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setCurrentQuote(motivationalQuotes[randomIndex]);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskDeadline) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      deadline: newTaskDeadline,
      desc: newTaskDesc,
      status: 'upcoming',
      isPinned: false,
      notified: false
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDeadline('');
    setNewTaskDesc('');
  };

  const handleDelete = (id) => {
    const taskToDelete = tasks.find(t => t.id === id);
    setDeletedTask(taskToDelete);
    setTasks(tasks.filter(t => t.id !== id));
    
    // Show Snackbar
    setShowUndo(true);
    setTimeout(() => setShowUndo(false), 5000);
  };

  const handleUndo = () => {
    if (deletedTask) {
      setTasks([...tasks, deletedTask]);
      setDeletedTask(null);
      setShowUndo(false);
    }
  };

  const togglePin = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isPinned: !t.isPinned } : t));
  };

  const completeTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task && task.status !== 'completed') {
      // Gamification Reward
      setXp(prev => {
        const newXp = prev + 20;
        if (newXp >= 100) {
          setLevel(l => l + 1);
          return newXp - 100;
        }
        return newXp;
      });
      setTasks(tasks.map(t => t.id === id ? { ...t, status: 'completed' } : t));
    }
  };

  // --- EDIT MODAL LOGIC ---
  const openEditModal = (task) => {
    setEditingTask({ ...task }); // Create a copy
  };

  const saveEdit = () => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? editingTask : t));
      setEditingTask(null);
    }
  };

  // --- DRAG & DROP LOGIC ---
  const handleDragStart = (e, position) => {
    dragItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const handleDrop = (e) => {
    if (filterMode !== 'all') return; // Disable sort when filtered

    const copyListItems = [...tasks];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTasks(copyListItems);
  };

  // --- FILTERING ---
  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // 1. Apply Time Filters
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (filterMode === 'today') {
      filtered = filtered.filter(t => {
        const d = new Date(t.deadline);
        return d.toDateString() === new Date().toDateString();
      });
    } else if (filterMode === 'week') {
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(t => {
        const d = new Date(t.deadline);
        return d >= today && d <= nextWeek;
      });
    } else if (filterMode === 'overdue') {
      filtered = filtered.filter(t => new Date(t.deadline) < now && t.status !== 'completed');
    }

    // 2. Sort Logic (Pinned First, then by DragOrder if All, else by Date)
    // Separation: Pinned vs Unpinned
    const pinned = filtered.filter(t => t.isPinned);
    const unpinned = filtered.filter(t => !t.isPinned);

    // If "All" and manual sort is desired, we rely on array order for unpinned
    // If filtered by date context, we might want to sort by time. 
    // For simplicity, we keep array order for D&D to work in 'all', and date sort for others.
    if (filterMode !== 'all') {
        unpinned.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }

    return [...pinned, ...unpinned];
  };

  const visibleTasks = getFilteredTasks();
  const activeTasks = visibleTasks.filter(t => t.status !== 'completed');
  const completedTasks = visibleTasks.filter(t => t.status === 'completed');

  // --- STATS LOGIC ---
  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  // --- CALENDAR HELPERS ---
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay() || 7; 
    
    const daysArray = [];
    for (let i = 1; i < firstDayOfMonth; i++) { daysArray.push(null); }
    for (let i = 1; i <= daysInMonth; i++) { daysArray.push(new Date(year, month, i)); }
    return daysArray;
  };
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header>
        <div className="top-controls">
          <button className="stats-btn" onClick={() => setShowStats(true)} title="Statistici">
            <IconChart />
          </button>
          <button className="theme-btn" onClick={switchTheme} title="Schimbă Tema">
            <IconPalette />
          </button>
        </div>
        <h1>✨ StarSync</h1>
      </header>

      {/* MASCOTA */}
      <StarPet mood={petMood} xp={xp} level={level} />

      {/* TABS PRINCIPALE */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
          <IconList /> Sarcini
        </button>
        <button className={`tab ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>
          <IconCalendar /> Calendar
        </button>
        <button className={`tab ${activeTab === 'quotes' ? 'active' : ''}`} onClick={() => setActiveTab('quotes')}>
          <IconQuote /> Citate
        </button>
      </div>

      {/* === TAB SARCINI === */}
      {activeTab === 'tasks' && (
        <>
          {/* FILTRE */}
          <div className="filters">
            <button className={`filter-chip ${filterMode==='all'?'active':''}`} onClick={()=>setFilterMode('all')}>Toate</button>
            <button className={`filter-chip ${filterMode==='overdue'?'active':''}`} onClick={()=>setFilterMode('overdue')}>Expirate</button>
          </div>

          {/* INPUT */}
          <div className="input-card">
            <form onSubmit={addTask}>
              <div className="form-group">
                <label>Nume activitate</label>
                <input type="text" placeholder="Adauga un task" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Termen limită</label>
                <input type="datetime-local" value={newTaskDeadline} onChange={(e) => setNewTaskDeadline(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Detalii (opțional)</label>
                <textarea rows="2" placeholder="Notițe..." value={newTaskDesc} onChange={(e) => setNewTaskDesc(e.target.value)}></textarea>
              </div>
              <button type="submit" className="btn-add"><IconPlus /> Adaugă</button>
            </form>
          </div>

          {/* LISTA SARCINI */}
          <div className="lists-container">
            {activeTasks.map((task, index) => {
              const isOverdue = new Date(task.deadline) < new Date();
              const dateObj = new Date(task.deadline);
              return (
                <li 
                  key={task.id} 
                  className={`task-card ${isOverdue ? 'overdue' : ''} ${task.isPinned ? 'pinned' : ''}`}
                  draggable={filterMode === 'all'}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {task.isPinned && <div className="pin-indicator"><IconPin fill={true} size={12}/></div>}
                  <div className="task-content">
                    <div className="task-title">{task.title}</div>
                    <div className="task-meta">
                      <span>📅 {dateObj.toLocaleDateString('ro-RO', {day:'2-digit', month:'short'})}</span>
                      <span>⏰ {dateObj.toLocaleTimeString('ro-RO', {hour:'2-digit', minute:'2-digit'})}</span>
                    </div>
                    {task.desc && <div className="task-desc">{task.desc}</div>}
                  </div>
                  <div className="task-actions">
                    <button onClick={() => completeTask(task.id)} className="icon-btn btn-check" title="Finalizează"><IconCheck /></button>
                    <button onClick={() => togglePin(task.id)} className={`icon-btn btn-pin ${task.isPinned?'active':''}`} title="Fixează"><IconPin /></button>
                    <button onClick={() => openEditModal(task)} className="icon-btn btn-edit" title="Editează"><IconEdit /></button>
                    <button onClick={() => handleDelete(task.id)} className="icon-btn btn-delete" title="Șterge"><IconTrash /></button>
                  </div>
                </li>
              );
            })}

            {completedTasks.length > 0 && <h3 className="section-title">✅ Completate</h3>}
            {completedTasks.map(task => (
              <li key={task.id} className="task-card completed">
                <div className="task-content">
                  <div className="task-title">{task.title}</div>
                  <div className="task-meta">Finalizat</div>
                </div>
                <div className="task-actions">
                  <button onClick={() => handleDelete(task.id)} className="icon-btn btn-delete"><IconTrash /></button>
                </div>
              </li>
            ))}
          </div>
        </>
      )}

      {/* === TAB CALENDAR === */}
      {activeTab === 'calendar' && (
        <div className="calendar-container">
          <div className="calendar-header">
            <button className="nav-btn" onClick={() => changeMonth(-1)}><IconLeft /></button>
            <h2>{currentDate.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' })}</h2>
            <button className="nav-btn" onClick={() => changeMonth(1)}><IconRight /></button>
          </div>
          <div className="calendar-grid">
            {['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'].map(d => <div key={d} className="day-name">{d}</div>)}
            {getDaysInMonth(currentDate).map((day, index) => {
              if (!day) return <div key={`empty-${index}`}></div>;
              const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
              const daysTasks = tasks.filter(t => t.deadline.startsWith(dateStr));
              let statusClass = '';
              if (daysTasks.length > 0) {
                 const allDone = daysTasks.every(t => t.status === 'completed');
                 statusClass = allDone ? 'status-green' : 'status-red';
              }
              const isToday = day.toDateString() === new Date().toDateString();
              return (
                <div key={index} className={`calendar-day ${statusClass} ${isToday ? 'today' : ''}`} title={`${daysTasks.length} task-uri`}>
                  {day.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* === TAB CITATE === */}
      {activeTab === 'quotes' && (
        <div className="quotes-container">
          <div className="quote-card">
            <div className="quote-icon-large">
              <IconQuote size={40} />
            </div>
            <div className="quote-text">
              "{currentQuote.text}"
            </div>
            <div className="quote-author">
              — {currentQuote.author}
            </div>
          </div>
          <button className="btn-generate" onClick={generateQuote}>
            <IconMagic /> Citat Nou
          </button>
        </div>
      )}

      {/* --- EDIT MODAL --- */}
      {editingTask && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editează Activitatea ✏️</h2>
            <div className="form-group">
              <label>Titlu</label>
              <input type="text" value={editingTask.title} onChange={(e) => setEditingTask({...editingTask, title: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Deadline</label>
              <input type="datetime-local" value={editingTask.deadline} onChange={(e) => setEditingTask({...editingTask, deadline: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Descriere</label>
              <textarea rows="3" value={editingTask.desc} onChange={(e) => setEditingTask({...editingTask, desc: e.target.value})} />
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setEditingTask(null)}>Anulează</button>
              <button className="btn-save" onClick={saveEdit}>Salvează</button>
            </div>
          </div>
        </div>
      )}

      {/* --- STATS MODAL --- */}
      {showStats && (
        <div className="modal-overlay" onClick={() => setShowStats(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>📊 Statisticile Tale</h2>
            <div className="stats-content">
              <div className="stats-row">
                <span>Task-uri Totale:</span> <strong>{totalTasks}</strong>
              </div>
              <div className="stats-row">
                <span>Completate:</span> <strong>{completedCount}</strong>
              </div>
              <p>Rată de succes ({completionRate}%)</p>
              <div className="stat-bar-bg">
                <div className="stat-bar-fill" style={{width: `${completionRate}%`}}></div>
              </div>

              <h3>Insigne (Badges) 🏅</h3>
              <div className="badges">
                {level >= 1 && <span className="badge" title="Început">🌱</span>}
                {level >= 2 && <span className="badge" title="Serios">⭐</span>}
                {level >= 5 && <span className="badge" title="Maestru">🔥</span>}
                {level >= 10 && <span className="badge" title="Legendar">👑</span>}
                {completedCount >= 50 ? <span className="badge">💎</span> : <span style={{opacity:0.3, fontSize:'1.5rem'}}>💎</span>}
              </div>
            </div>
            <button className="btn-cancel" style={{marginTop: '20px', width: '100%'}} onClick={() => setShowStats(false)}>Închide</button>
          </div>
        </div>
      )}

      {/* --- SNACKBAR UNDO --- */}
      {showUndo && (
        <div className="snackbar">
          <span>Task șters!</span>
          <button className="undo-btn" onClick={handleUndo}>UNDO ↩</button>
        </div>
      )}

    </div>
  );
};

export default App;
