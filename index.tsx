import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Modal, 
  StatusBar, 
  Alert,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path, Line, Polyline, Circle, Rect } from 'react-native-svg';

// --- CONFIGURARE TEME ---
const themes = {
  cute: {
    bg: '#fffaf4', card: '#ffffff', primary: '#ffb7b2', secondary: '#b5ead7',
    accent: '#c7ceea', text: '#6d6875', textLight: '#9e9aa7', danger: '#ff9aa2',
    quoteBg: '#fff0f5', high: '#ff6b6b', medium: '#feca57', low: '#48dbfb', canceled: '#a0a0a0'
  },
  dark: {
    bg: '#2d2d2d', card: '#3e3e3e', primary: '#bb86fc', secondary: '#03dac6',
    accent: '#3700b3', text: '#e0e0e0', textLight: '#a0a0a0', danger: '#cf6679',
    quoteBg: '#4a4a4a', high: '#cf6679', medium: '#ffb74d', low: '#64b5f6', canceled: '#666'
  },
  pastel: {
    bg: '#fdf2f8', card: '#fff', primary: '#fbcfe8', secondary: '#a7f3d0',
    accent: '#bfdbfe', text: '#475569', textLight: '#94a3b8', danger: '#fda4af',
    quoteBg: '#f0f9ff', high: '#fda4af', medium: '#fcd34d', low: '#7dd3fc', canceled: '#cbd5e1'
  }
};

// --- ICONIȚE SVG ---
const IconList = ({color}) => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Line x1="8" y1="6" x2="21" y2="6"/><Line x1="8" y1="12" x2="21" y2="12"/><Line x1="8" y1="18" x2="21" y2="18"/><Line x1="3" y1="6" x2="3.01" y2="6"/><Line x1="3" y1="12" x2="3.01" y2="12"/><Line x1="3" y1="18" x2="3.01" y2="18"/></Svg>;
const IconCalendar = ({color}) => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><Line x1="16" y1="2" x2="16" y2="6"/><Line x1="8" y1="2" x2="8" y2="6"/><Line x1="3" y1="10" x2="21" y2="10"/></Svg>;
const IconPlus = ({color}) => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Circle cx="12" cy="12" r="10"/><Line x1="12" y1="8" x2="12" y2="16"/><Line x1="8" y1="12" x2="16" y2="12"/></Svg>;
const IconCheck = ({color}) => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><Polyline points="22 4 12 14.01 9 11.01"/></Svg>;
const IconTrash = ({color}) => <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Polyline points="3 6 5 6 21 6"/><Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><Line x1="10" y1="11" x2="10" y2="17"/><Line x1="14" y1="11" x2="14" y2="17"/></Svg>;
const IconPin = ({color, fill}) => <Svg width="18" height="18" viewBox="0 0 24 24" fill={fill ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42z"/><Circle cx="7.5" cy="7.5" r="1.5"/></Svg>;
const IconPalette = ({color}) => <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Circle cx="13.5" cy="6.5" r=".5"/><Circle cx="17.5" cy="10.5" r=".5"/><Circle cx="8.5" cy="7.5" r=".5"/><Circle cx="6.5" cy="12.5" r=".5"/><Path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></Svg>;
const IconChart = ({color}) => <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Line x1="18" y1="20" x2="18" y2="10"/><Line x1="12" y1="20" x2="12" y2="4"/><Line x1="6" y1="20" x2="6" y2="14"/></Svg>;
const IconLeft = ({color}) => <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Polyline points="15 18 9 12 15 6"/></Svg>;
const IconRight = ({color}) => <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Polyline points="9 18 15 12 9 6"/></Svg>;
const IconQuote = ({color, size=20}) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M10 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 .5-.5 1-1 1c-1 0-2-.5-2-1.5"/><Path d="M20 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 .5-.5 1-1 1c-1 0-2-.5-2-1.5"/></Svg>;
const IconMagic = ({color}) => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="m19 6-2.5 2.5"/><Path d="m21 8-2.5-2.5"/><Path d="m17 4 3 3"/><Path d="m14 7-2.5 2.5"/><Path d="m16.5 9.5-2.5-2.5"/><Path d="m11.5 7 3 3"/><Path d="m3 21 9-9"/><Path d="m2 22 10-10"/></Svg>;
const IconSearch = ({color}) => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Circle cx="11" cy="11" r="8"/><Line x1="21" y1="21" x2="16.65" y2="16.65"/></Svg>;
const IconSort = ({color}) => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Line x1="12" y1="5" x2="12" y2="19"/><Polyline points="19 12 12 19 5 12"/></Svg>;
const IconFire = ({color}) => <Svg width="20" height="20" viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.113.434-2.16 1.134-2.97L8.5 14.5z"/></Svg>;
const IconClock = ({color}) => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Circle cx="12" cy="12" r="10" /><Polyline points="12 6 12 12 16 14" /></Svg>;
const IconEdit = ({color}) => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Svg>;

// --- LISTA DE CITATE ---
const motivationalQuotes = [
  { text: "Nu renunța niciodată la un vis doar pentru că necesită timp.", author: "Earl Nightingale" },
  { text: "Succesul nu este final, eșecul nu este fatal.", author: "Winston Churchill" },
  { text: "Crede că poți și ești deja la jumătatea drumului.", author: "Theodore Roosevelt" },
  { text: "Viitorul aparține celor care cred în frumusețea visurilor lor.", author: "Eleanor Roosevelt" },
  { text: "Singurul mod de a realiza lucruri minunate este să iubești ceea ce faci.", author: "Steve Jobs" },
];

// --- COMPONENTE AUXILIARE ---
const CustomDateTimePicker = ({ visible, onClose, onSelect, theme }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());

  useEffect(() => {
    if (visible) {
      const now = new Date();
      setTempDate(now);
      setHour(now.getHours());
      setMinute(now.getMinutes());
    }
  }, [visible]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay() || 7; 
    const daysArray = [];
    for (let i = 1; i < firstDayOfMonth; i++) daysArray.push(null);
    for (let i = 1; i <= daysInMonth; i++) daysArray.push(new Date(year, month, i));
    return daysArray;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(tempDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setTempDate(newDate);
  };

  const handleDayPress = (day) => {
    if(!day) return;
    setTempDate(day);
  };

  const changeTime = (type, value) => {
    if (type === 'hour') {
      let newHour = hour + value;
      if (newHour > 23) newHour = 0;
      if (newHour < 0) newHour = 23;
      setHour(newHour);
    } else {
      let newMinute = minute + value;
      if (newMinute > 59) newMinute = 0;
      if (newMinute < 0) newMinute = 59;
      setMinute(newMinute);
    }
  };

  const handleConfirm = () => {
    const dateStr = `${tempDate.getFullYear()}-${String(tempDate.getMonth() + 1).padStart(2, '0')}-${String(tempDate.getDate()).padStart(2, '0')}`;
    const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    
    onSelect(`${dateStr} ${timeStr}`);
    onClose();
  };

  const formatTime = (val) => String(val).padStart(2, '0');

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={() => changeMonth(-1)}><IconLeft color={theme.text}/></TouchableOpacity>
            <Text style={{ fontWeight: 'bold', color: theme.text, fontSize: 16 }}>
              {tempDate.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' })}
            </Text>
            <TouchableOpacity onPress={() => changeMonth(1)}><IconRight color={theme.text}/></TouchableOpacity>
          </View>

          <View style={styles.calendarGrid}>
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, index) => (
              <Text key={index} style={{ width: '13%', textAlign: 'center', color: theme.textLight, fontSize: 12 }}>
                {d}
              </Text>
            ))}
            
            {getDaysInMonth(tempDate).map((day, idx) => {
               const isSelected = day && day.getDate() === tempDate.getDate() && day.getMonth() === tempDate.getMonth();
               return (
               <TouchableOpacity 
                 key={`day-${idx}`} 
                 style={[
                   styles.calendarDay, 
                   { backgroundColor: day ? (isSelected ? theme.primary : theme.bg) : 'transparent' }
                 ]}
                 onPress={() => handleDayPress(day)}
               >
                 <Text style={{ color: isSelected ? '#fff' : theme.text }}>{day ? day.getDate() : ''}</Text>
               </TouchableOpacity>
            )})}
          </View>

          <View style={{ marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#eee' }}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
              <IconClock color={theme.textLight} />
              <Text style={{fontWeight: 'bold', color: theme.text}}>Setează Ora:</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, gap: 15}}>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => changeTime('hour', 1)}><IconPlus color={theme.accent}/></TouchableOpacity>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: theme.text, marginVertical: 5}}>{formatTime(hour)}</Text>
                <TouchableOpacity onPress={() => changeTime('hour', -1)}><IconLeft color={theme.accent} /></TouchableOpacity> 
              </View>
              <Text style={{fontSize: 24, fontWeight: 'bold', color: theme.text, paddingBottom: 5}}>:</Text>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => changeTime('minute', 5)}><IconPlus color={theme.accent}/></TouchableOpacity>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: theme.text, marginVertical: 5}}>{formatTime(minute)}</Text>
                <TouchableOpacity onPress={() => changeTime('minute', -5)}><IconLeft color={theme.accent} /></TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
            <TouchableOpacity onPress={onClose} style={[styles.btnClose, {backgroundColor: theme.bg, flex: 1, borderWidth: 1, borderColor: theme.textLight}]}>
              <Text style={{color: theme.text}}>Anulează</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={[styles.btnClose, {backgroundColor: theme.primary, flex: 1}]}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Gata</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const StarPet = ({ mood, xp, level, theme }) => {
  const HappyFace = () => (
    <Svg width="80" height="80" viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="45" fill="#fffdac" stroke="#ffb7b2" strokeWidth="3" />
      <Circle cx="35" cy="40" r="5" fill="#333" />
      <Circle cx="65" cy="40" r="5" fill="#333" />
      <Path d="M 30 60 Q 50 75 70 60" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
      <Circle cx="20" cy="50" r="5" fill="#ffb7b2" opacity="0.6" />
      <Circle cx="80" cy="50" r="5" fill="#ffb7b2" opacity="0.6" />
    </Svg>
  );
  const SadFace = () => (
    <Svg width="80" height="80" viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="45" fill="#e0e0e0" stroke="#999" strokeWidth="3" />
      <Circle cx="35" cy="45" r="5" fill="#333" />
      <Circle cx="65" cy="45" r="5" fill="#333" />
      <Path d="M 30 70 Q 50 55 70 70" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
      <Path d="M 30 35 L 40 40" stroke="#333" strokeWidth="2" />
      <Path d="M 70 35 L 60 40" stroke="#333" strokeWidth="2" />
    </Svg>
  );
  return (
    <View style={[styles.petContainer, { backgroundColor: theme.card, borderColor: theme.primary }]}>
      {mood === 'happy' ? <HappyFace /> : <SadFace />}
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={[styles.petDialog, { color: theme.text }]}>
          {mood === 'happy' ? "Sunt fericit! ✨" : "Ai task-uri expirate. 😢"}
        </Text>
        <Text style={{ fontSize: 12, marginTop: 5, color: theme.textLight }}>
          Nivelul {level} • {xp} XP
        </Text>
        <View style={styles.xpContainer}>
          <View style={[styles.xpBar, { width: `${Math.min(xp, 100)}%`, backgroundColor: theme.secondary }]}></View>
        </View>
      </View>
    </View>
  );
};

export default function App() {
  // --- STATE ---
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('tasks');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // State pentru Sortare, Căutare și FILTRARE
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'overdue', 'future', 'completed', 'canceled'
  
  const [themeName, setThemeName] = useState('cute');
  const [showStats, setShowStats] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [petMood, setPetMood] = useState('happy');

  const [streak, setStreak] = useState(0);
  const [lastLogin, setLastLogin] = useState(null);

  // States ADĂUGARE Task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState(''); 
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('normal'); 

  // States EDITARE Task
  const [editingTask, setEditingTask] = useState(null); 
  const [editTitle, setEditTitle] = useState('');
  const [editDeadline, setEditDeadline] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editPriority, setEditPriority] = useState('normal');
  const [showEditModal, setShowEditModal] = useState(false);
  
  // State pentru Date Picker (Folosit si la Add si la Edit)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateInput, setActiveDateInput] = useState('new'); // 'new' sau 'edit'

  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  const theme = themes[themeName];

  // --- STARTUP ---
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
    const now = new Date();
    const hasOverdue = tasks.some(t => new Date(t.deadline) < now && t.status !== 'completed' && t.status !== 'canceled');
    setPetMood(hasOverdue ? 'sad' : 'happy');
  }, [tasks, xp, level, streak, lastLogin]);

  // --- PERSISTENȚĂ ---
  const loadData = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('starSyncTasks');
      const savedXP = await AsyncStorage.getItem('starSyncXP');
      const savedLevel = await AsyncStorage.getItem('starSyncLevel');
      const savedStreak = await AsyncStorage.getItem('starSyncStreak');
      const savedLastLogin = await AsyncStorage.getItem('starSyncLastLogin');

      if (savedTasks) setTasks(JSON.parse(savedTasks));
      if (savedXP) setXp(parseInt(savedXP));
      if (savedLevel) setLevel(parseInt(savedLevel));
      
      let currentStreak = savedStreak ? parseInt(savedStreak) : 0;
      const today = new Date().toISOString().split('T')[0];
      
      if (savedLastLogin !== today) {
        if (savedLastLogin) {
          const lastDate = new Date(savedLastLogin);
          const diffTime = Math.abs(new Date(today) - lastDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          
          if (diffDays === 1) {
            currentStreak += 1;
            if (currentStreak % 7 === 0) {
              Alert.alert("🔥 Streak Bonus!", "Ai 7 zile consecutive! +50 XP");
              setXp(x => x + 50);
            }
          } else if (diffDays > 1) {
            currentStreak = 1;
          }
        } else {
          currentStreak = 1;
        }
        setStreak(currentStreak);
        setLastLogin(today);
      } else {
        setStreak(currentStreak);
        setLastLogin(today);
      }

    } catch (e) { console.error(e); }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('starSyncTasks', JSON.stringify(tasks));
      await AsyncStorage.setItem('starSyncXP', xp.toString());
      await AsyncStorage.setItem('starSyncLevel', level.toString());
      await AsyncStorage.setItem('starSyncStreak', streak.toString());
      if(lastLogin) await AsyncStorage.setItem('starSyncLastLogin', lastLogin);
    } catch (e) { console.error(e); }
  };

  // --- ACTIONS ---
  const switchTheme = () => {
    const keys = Object.keys(themes);
    const nextIndex = (keys.indexOf(themeName) + 1) % keys.length;
    setThemeName(keys[nextIndex]);
  };

  const addTask = async () => {
    if (!newTaskTitle || !newTaskDeadline) {
      Alert.alert("Eroare", "Te rog introdu titlul și data!");
      return;
    }
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      deadline: newTaskDeadline, 
      desc: newTaskDesc,
      priority: newTaskPriority,
      status: 'upcoming',
      isPinned: false
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDeadline('');
    setNewTaskDesc('');
    setNewTaskPriority('normal');
  };

  const handleDelete = (id) => {
    Alert.alert("Șterge", "Ești sigur că vrei să ștergi definitiv?", [
      { text: "Nu" },
      { text: "Da", onPress: () => setTasks(tasks.filter(t => t.id !== id)) }
    ]);
  };

  const cancelTask = (id) => {
    // Funcție pentru a muta în Anulate (Soft Delete)
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'canceled' } : t));
  };

  const completeTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task && task.status !== 'completed' && task.status !== 'canceled') {
      setXp(prev => {
        const newXp = prev + 20;
        if (newXp >= 100) {
          setLevel(l => l + 1);
          Alert.alert("Level UP! 🎉", "Felicitări, ai crescut în nivel!");
          return newXp - 100;
        }
        return newXp;
      });
      setTasks(tasks.map(t => t.id === id ? { ...t, status: 'completed' } : t));
    }
  };

  const togglePin = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isPinned: !t.isPinned } : t));
  };

  // --- EDIT TASK FUNCTIONS ---
  const openEditModal = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDeadline(task.deadline);
    setEditDesc(task.desc);
    setEditPriority(task.priority);
    setShowEditModal(true);
  };

  const saveEdit = () => {
    if (!editTitle || !editDeadline) {
      Alert.alert("Eroare", "Titlul și data sunt obligatorii.");
      return;
    }
    setTasks(tasks.map(t => t.id === editingTask.id ? {
      ...t,
      title: editTitle,
      deadline: editDeadline,
      desc: editDesc,
      priority: editPriority
    } : t));
    setShowEditModal(false);
    setEditingTask(null);
  };

  // --- FILTRARE, CĂUTARE & SORTARE ---
  const getFilteredTasks = () => {
    let filtered = [...tasks];
    const now = new Date();
    
    if (searchQuery) {
      filtered = filtered.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (filterMode === 'all') {
      filtered = filtered.filter(t => t.status !== 'completed' && t.status !== 'canceled');
    } else if (filterMode === 'overdue') {
      filtered = filtered.filter(t => new Date(t.deadline) < now && t.status !== 'completed' && t.status !== 'canceled');
    } else if (filterMode === 'future') {
      filtered = filtered.filter(t => new Date(t.deadline) >= now && t.status !== 'completed' && t.status !== 'canceled');
    } else if (filterMode === 'completed') {
      filtered = filtered.filter(t => t.status === 'completed');
    } else if (filterMode === 'canceled') {
      filtered = filtered.filter(t => t.status === 'canceled');
    }

    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      if (sortBy === 'date') {
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'priority') {
        const priorityVal = { high: 3, normal: 2, low: 1 };
        return priorityVal[b.priority] - priorityVal[a.priority];
      }
      return 0;
    });

    return filtered;
  };

  const visibleTasks = getFilteredTasks();

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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* HEADER CU STREAK */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>✨ StarSync</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
             <IconFire color={streak > 2 ? "#ff6b6b" : theme.textLight} />
             <Text style={{fontWeight: 'bold', color: theme.text, marginLeft: 5}}>{streak} Zile Streak</Text>
          </View>
        </View>
        <View style={styles.headerControls}>
          <TouchableOpacity onPress={() => setShowStats(true)} style={[styles.iconBtn, { backgroundColor: theme.card, borderColor: theme.accent }]}>
            <IconChart color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={switchTheme} style={[styles.iconBtn, { backgroundColor: theme.card, borderColor: theme.accent, marginLeft: 10 }]}>
            <IconPalette color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <StarPet mood={petMood} xp={xp} level={level} theme={theme} />

        {/* TABS */}
        <View style={[styles.tabs, { backgroundColor: theme.card }]}>
          {['tasks', 'calendar', 'quotes'].map(tab => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tab, activeTab === tab && { backgroundColor: theme.primary }]}
              onPress={() => setActiveTab(tab)}
            >
              {tab === 'tasks' && <IconList color={activeTab === tab ? '#fff' : theme.textLight} />}
              {tab === 'calendar' && <IconCalendar color={activeTab === tab ? '#fff' : theme.textLight} />}
              {tab === 'quotes' && <IconQuote color={activeTab === tab ? '#fff' : theme.textLight} />}
              <Text style={[styles.tabText, { color: activeTab === tab ? '#fff' : theme.textLight }]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* === TAB SARCINI === */}
        {activeTab === 'tasks' && (
          <View>
            <View style={styles.searchSortContainer}>
                <View style={[styles.searchBar, {backgroundColor: theme.card}]}>
                   <IconSearch color={theme.textLight}/>
                   <TextInput 
                      placeholder="Caută..." 
                      placeholderTextColor={theme.textLight}
                      style={{flex: 1, marginLeft: 8, color: theme.text}}
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                   />
                </View>
                <TouchableOpacity 
                  onPress={() => setSortBy(prev => prev === 'date' ? 'priority' : prev === 'priority' ? 'title' : 'date')}
                  style={[styles.sortBtn, {backgroundColor: theme.card}]}
                >
                   <IconSort color={theme.text}/>
                   <Text style={{fontSize: 10, color: theme.text, fontWeight: 'bold'}}>
                     {sortBy === 'date' ? 'DATĂ' : sortBy === 'priority' ? 'PRIO' : 'NUME'}
                   </Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 50, marginTop: 10 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                {['all', 'overdue', 'future', 'completed', 'canceled'].map(f => (
                  <TouchableOpacity 
                    key={f}
                    style={[
                      styles.filterBtn, 
                      filterMode === f && { backgroundColor: 
                        f === 'overdue' ? theme.danger : 
                        f === 'future' ? theme.secondary : 
                        f === 'completed' ? '#4ade80' : 
                        f === 'canceled' ? '#94a3b8' : theme.primary 
                      }
                    ]} 
                    onPress={() => setFilterMode(f)}
                  >
                    <Text style={{
                      color: filterMode === f ? '#fff' : theme.text, 
                      fontWeight: filterMode === f ? 'bold' : 'normal',
                      textTransform: 'capitalize'
                    }}>
                      {f === 'all' ? 'Toate' : 
                       f === 'overdue' ? 'Restante' : 
                       f === 'future' ? 'Viitoare' : 
                       f === 'completed' ? 'Completate' : 'Anulate'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* FORMULAR ADĂUGARE */}
            {['all', 'future', 'overdue'].includes(filterMode) && (
              <View style={[styles.inputCard, { backgroundColor: theme.card }]}>
                <TextInput 
                  placeholder="Nume activitate" 
                  placeholderTextColor={theme.textLight}
                  style={[styles.input, { backgroundColor: theme.bg, color: theme.text }]}
                  value={newTaskTitle}
                  onChangeText={setNewTaskTitle}
                />
                
                <View style={{flexDirection: 'row', gap: 10, marginBottom: 10}}>
                  <TouchableOpacity 
                    style={[styles.input, {flex: 1, backgroundColor: theme.bg, justifyContent: 'center', marginBottom: 0}]}
                    onPress={() => { setActiveDateInput('new'); setShowDatePicker(true); }}
                  >
                    <Text style={{color: newTaskDeadline ? theme.text : theme.textLight, fontSize: 13}}>
                      {newTaskDeadline ? `📅 ${newTaskDeadline}` : "Selectează Data & Ora"}
                    </Text>
                  </TouchableOpacity>

                  <View style={{flexDirection: 'row', backgroundColor: theme.bg, borderRadius: 12, overflow: 'hidden'}}>
                    {['low', 'normal', 'high'].map(p => (
                      <TouchableOpacity 
                        key={p} 
                        onPress={() => setNewTaskPriority(p)}
                        style={{
                          padding: 10, 
                          backgroundColor: newTaskPriority === p ? theme[p] : 'transparent'
                        }}
                      >
                        <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: newTaskPriority === p ? '#fff' : theme[p]}}/>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <TextInput 
                  placeholder="Detalii (opțional)" 
                  placeholderTextColor={theme.textLight}
                  style={[styles.input, { backgroundColor: theme.bg, color: theme.text }]}
                  value={newTaskDesc}
                  onChangeText={setNewTaskDesc}
                />
                <TouchableOpacity onPress={addTask} style={[styles.btnAdd, { backgroundColor: theme.accent }]}>
                  <IconPlus color="#fff" />
                  <Text style={styles.btnAddText}>Adaugă</Text>
                </TouchableOpacity>
              </View>
            )}

            {visibleTasks.length === 0 && (
              <Text style={{textAlign: 'center', color: theme.textLight, marginTop: 20}}>
                {filterMode === 'overdue' ? "Nu ai restanțe! 🎉" : 
                 filterMode === 'completed' ? "Nimic completat încă." :
                 filterMode === 'canceled' ? "Niciun task anulat." :
                 "Niciun task găsit."}
              </Text>
            )}

            {visibleTasks.map(task => (
              <View key={task.id} style={[
                styles.taskCard, 
                { backgroundColor: theme.card, borderLeftColor: theme[task.priority] || theme.accent },
                task.status === 'completed' && { opacity: 0.6, borderLeftColor: '#4ade80' },
                task.status === 'canceled' && { opacity: 0.6, borderLeftColor: '#94a3b8' },
                task.isPinned && { borderColor: theme.primary, borderWidth: 1 }
              ]}>
                {task.isPinned && <View style={[styles.pinIndicator, { backgroundColor: theme.primary }]}><IconPin color="#fff" fill={true} /></View>}
                <View style={{ flex: 1 }}>
                  <Text style={[
                    styles.taskTitle, 
                    { color: theme.text },
                    (task.status === 'completed' || task.status === 'canceled') && { textDecorationLine: 'line-through' }
                  ]}>{task.title}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                     <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: theme[task.priority], marginRight: 6}}/>
                     <Text style={{ color: theme.textLight, fontSize: 12 }}>
                       {task.deadline} • {task.priority.toUpperCase()}
                     </Text>
                  </View>
                  {task.desc ? <Text style={[styles.taskDesc, { backgroundColor: theme.bg, color: theme.text }]}>{task.desc}</Text> : null}
                </View>
                
                <View style={styles.taskActions}>
                   {/* BUTOANE PENTRU TASK-URI ACTIVE */}
                   {task.status !== 'completed' && task.status !== 'canceled' && (
                     <>
                       <TouchableOpacity onPress={() => openEditModal(task)} style={[styles.actionBtn, { borderColor: theme.accent }]}>
                         <IconEdit color={theme.text} />
                       </TouchableOpacity>
                       <TouchableOpacity onPress={() => completeTask(task.id)} style={[styles.actionBtn, { borderColor: theme.secondary }]}><IconCheck color={theme.secondary} /></TouchableOpacity>
                       <TouchableOpacity onPress={() => togglePin(task.id)} style={[styles.actionBtn, { borderColor: 'orange' }]}><IconPin color={task.isPinned ? "orange" : theme.text} fill={task.isPinned} /></TouchableOpacity>
                       
                       {/* Butonul de gunoi: în mod normal, mută la ANULATE */}
                       <TouchableOpacity onPress={() => cancelTask(task.id)} style={[styles.actionBtn, { borderColor: theme.danger }]}><IconTrash color={theme.danger} /></TouchableOpacity>
                     </>
                   )}

                   {/* BUTOANE PENTRU TASK-URI ANULATE / COMPLETATE */}
                   {(task.status === 'completed' || task.status === 'canceled') && (
                      // Aici butonul de gunoi STERGE DEFINITIV
                      <TouchableOpacity onPress={() => handleDelete(task.id)} style={[styles.actionBtn, { borderColor: theme.danger }]}><IconTrash color={theme.danger} /></TouchableOpacity>
                   )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* === TAB CALENDAR === */}
        {activeTab === 'calendar' && (
          <View style={[styles.calendarContainer, { backgroundColor: theme.card }]}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => changeMonth(-1)}><IconLeft color={theme.text}/></TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text }}>
                {currentDate.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' })}
              </Text>
              <TouchableOpacity onPress={() => changeMonth(1)}><IconRight color={theme.text}/></TouchableOpacity>
            </View>
            <View style={styles.calendarGrid}>
              {['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'].map(d => <Text key={d} style={{ width: '13%', textAlign: 'center', fontWeight: 'bold', color: theme.textLight }}>{d}</Text>)}
              {getDaysInMonth(currentDate).map((day, index) => {
                if (!day) return <View key={`empty-${index}`} style={{ width: '13%', aspectRatio: 1 }} />;
                const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                const hasTask = tasks.some(t => t.deadline.startsWith(dateStr) && t.status !== 'canceled');
                const isToday = day.toDateString() === new Date().toDateString();
                
                return (
                   <View key={index} style={[
                     styles.calendarDay, 
                     { backgroundColor: theme.bg },
                     hasTask && { backgroundColor: theme.secondary },
                     isToday && { borderColor: theme.accent, borderWidth: 2 }
                   ]}>
                     <Text style={{ color: theme.text }}>{day.getDate()}</Text>
                   </View>
                );
              })}
            </View>
          </View>
        )}

        {activeTab === 'quotes' && (
          <View style={styles.quoteContainer}>
            <View style={[styles.quoteCard, { backgroundColor: theme.quoteBg, borderColor: theme.primary }]}>
               <IconQuote color={theme.primary} size={40} />
               <Text style={[styles.quoteText, { color: theme.text }]}>"{currentQuote.text}"</Text>
               <Text style={[styles.quoteAuthor, { color: theme.textLight }]}>— {currentQuote.author}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.btnGenerate, { backgroundColor: theme.secondary }]}
              onPress={() => setCurrentQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])}
            >
              <IconMagic color="#fff" />
              <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 10 }}>Citat Nou</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* COMPONENTE MODALE */}
      <CustomDateTimePicker 
        visible={showDatePicker} 
        onClose={() => setShowDatePicker(false)}
        onSelect={(date) => {
          if (activeDateInput === 'new') {
            setNewTaskDeadline(date);
          } else {
            setEditDeadline(date);
          }
        }}
        theme={theme}
      />

      {/* MODAL EDITARE */}
      <Modal visible={showEditModal} transparent animationType="slide">
         <View style={styles.modalOverlay}>
           <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
             <Text style={[styles.modalTitle, {color: theme.text}]}>✏️ Editează Task</Text>
             
             <TextInput 
                placeholder="Nume activitate" 
                placeholderTextColor={theme.textLight}
                style={[styles.input, { backgroundColor: theme.bg, color: theme.text }]}
                value={editTitle}
                onChangeText={setEditTitle}
              />
              
              <View style={{flexDirection: 'row', gap: 10, marginBottom: 10}}>
                <TouchableOpacity 
                  style={[styles.input, {flex: 1, backgroundColor: theme.bg, justifyContent: 'center', marginBottom: 0}]}
                  onPress={() => { setActiveDateInput('edit'); setShowDatePicker(true); }}
                >
                  <Text style={{color: theme.text, fontSize: 13}}>
                    {editDeadline ? `📅 ${editDeadline}` : "Selectează Data"}
                  </Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', backgroundColor: theme.bg, borderRadius: 12, overflow: 'hidden'}}>
                  {['low', 'normal', 'high'].map(p => (
                    <TouchableOpacity 
                      key={p} 
                      onPress={() => setEditPriority(p)}
                      style={{
                        padding: 10, 
                        backgroundColor: editPriority === p ? theme[p] : 'transparent'
                      }}
                    >
                      <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: editPriority === p ? '#fff' : theme[p]}}/>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TextInput 
                placeholder="Detalii (opțional)" 
                placeholderTextColor={theme.textLight}
                style={[styles.input, { backgroundColor: theme.bg, color: theme.text }]}
                value={editDesc}
                onChangeText={setEditDesc}
              />

              <View style={{flexDirection: 'row', gap: 10, marginTop: 15}}>
                 <TouchableOpacity onPress={() => setShowEditModal(false)} style={[styles.btnClose, { backgroundColor: theme.textLight, flex: 1 }]}>
                    <Text style={{ color: '#fff' }}>Anulează</Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={saveEdit} style={[styles.btnClose, { backgroundColor: theme.primary, flex: 1 }]}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salvează</Text>
                 </TouchableOpacity>
              </View>

           </View>
         </View>
      </Modal>

      <Modal visible={showStats} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>📊 Statistici</Text>
            <Text style={{ color: theme.text }}>Zile consecutive: {streak} 🔥</Text>
            <Text style={{ color: theme.text }}>Task-uri totale: {tasks.length}</Text>
            <TouchableOpacity onPress={() => setShowStats(false)} style={[styles.btnClose, { backgroundColor: theme.danger }]}>
              <Text style={{ color: '#fff' }}>Închide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold' },
  headerControls: { flexDirection: 'row' },
  iconBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  
  petContainer: { flexDirection: 'row', alignItems: 'center', padding: 20, margin: 20, borderRadius: 30, borderWidth: 2 },
  petDialog: { fontWeight: 'bold', fontSize: 16 },
  xpContainer: { width: '100%', height: 8, backgroundColor: '#eee', borderRadius: 4, marginTop: 5 },
  xpBar: { height: '100%', borderRadius: 4 },

  tabs: { flexDirection: 'row', marginHorizontal: 20, padding: 5, borderRadius: 30, elevation: 2 },
  tab: { flex: 1, flexDirection: 'row', padding: 12, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  tabText: { marginLeft: 5, fontWeight: 'bold' },

  searchSortContainer: { flexDirection: 'row', marginHorizontal: 20, marginTop: 15, gap: 10 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderRadius: 20, height: 45 },
  sortBtn: { width: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },

  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, marginHorizontal: 4, borderRadius: 20, borderWidth: 1, borderColor: '#eee', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },

  inputCard: { margin: 20, padding: 20, borderRadius: 20, elevation: 3 },
  input: { padding: 12, borderRadius: 12, marginBottom: 10 },
  btnAdd: { padding: 15, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  btnAddText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },

  taskCard: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 15, padding: 15, borderRadius: 20, borderLeftWidth: 8, elevation: 2, alignItems: 'center' },
  taskTitle: { fontSize: 18, fontWeight: 'bold' },
  taskDesc: { padding: 8, borderRadius: 8, marginTop: 5, overflow: 'hidden' },
  taskActions: { alignItems: 'center', gap: 8 },
  actionBtn: { padding: 8, borderRadius: 20, borderWidth: 1 },
  pinIndicator: { position: 'absolute', top: -5, left: -5, padding: 4, borderRadius: 10 },
  sectionTitle: { marginHorizontal: 20, marginBottom: 10, fontSize: 18, fontWeight: 'bold' },

  calendarContainer: { margin: 20, padding: 15, borderRadius: 20 },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 2 },
  calendarDay: { width: '13%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 8, margin: 1 },

  quoteContainer: { padding: 20, alignItems: 'center' },
  quoteCard: { padding: 30, borderRadius: 30, borderWidth: 2, borderStyle: 'dashed', width: '100%', alignItems: 'center', marginBottom: 20 },
  quoteText: { fontSize: 18, fontStyle: 'italic', textAlign: 'center', marginVertical: 15 },
  quoteAuthor: { fontWeight: 'bold', textTransform: 'uppercase' },
  btnGenerate: { padding: 15, paddingHorizontal: 30, borderRadius: 30, flexDirection: 'row', alignItems: 'center' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', padding: 25, borderRadius: 25 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  btnClose: { padding: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }
});
