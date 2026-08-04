export const SUPABASE_URL = 'https://nsacgpcnhqzxassfvuts.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_R228vwOOokXUE9Uzrqnnqg_FwfnkXXH';

let OR_KEY = '';
try { OR_KEY = require('./keys').OPENROUTER_API_KEY; } catch {}
export const OPENROUTER_API_KEY = OR_KEY;

export const SUBJECTS = [
  { id: 1, name: 'Matemática', icon: 'matematica.png' },
  { id: 2, name: 'Português', icon: 'portugues.png' },
  { id: 3, name: 'Física', icon: 'fisica.png' },
  { id: 4, name: 'Química', icon: 'quimica.png' },
  { id: 5, name: 'Biologia', icon: 'biologia.png' },
  { id: 6, name: 'História', icon: 'historia.png' },
  { id: 7, name: 'Geografia', icon: 'geografia.png' },
  { id: 8, name: 'Inglês', icon: 'ingles.png' },
  { id: 9, name: 'Artes', icon: 'artes.png' },
  { id: 10, name: 'Espanhol', icon: 'espanhol.png' },
  { id: 11, name: 'Filosofia', icon: 'filosofia.png' },
  { id: 12, name: 'Sociologia', icon: 'sociologia.png' },
];

export const VESTIBULAR_TYPES = ['ENEM', 'VUNESP', 'FUVEST', 'UNICAMP', 'ITA/IME'];
