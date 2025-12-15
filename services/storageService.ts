import { FileItem } from '../types';

// STORAGE KEYS
const KEY_FILES = 'fenta_files_v1';
const KEY_PASSWORD = 'fenta_password_v1';

// Initial Demo Files
const DEMO_FILES: FileItem[] = [
  { id: '1', name: 'Projekt_Titan.pdf', type: 'document', size: 2400000, url: '#', date: new Date('2024-03-10') },
  { id: '2', name: 'Deep_Dive_Log.mp4', type: 'video', size: 154000000, url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', date: new Date('2024-03-12') },
  { id: '3', name: 'Sonar_Scan_Alpha.png', type: 'image', size: 4500000, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', date: new Date('2024-03-14') },
];

// In-Memory State (keeps Blob URLs alive during navigation)
let memoryFiles: FileItem[] = [];
let isInitialized = false;

// --- FILE MANAGEMENT ---

export const getStoredFiles = (): FileItem[] => {
  if (!isInitialized) {
    const storedJson = localStorage.getItem(KEY_FILES);
    if (storedJson) {
      try {
        const parsed = JSON.parse(storedJson);
        // Revive Dates
        memoryFiles = parsed.map((f: any) => ({
          ...f,
          date: new Date(f.date)
        }));
      } catch (e) {
        console.error("Failed to parse files", e);
        memoryFiles = [...DEMO_FILES];
      }
    } else {
      memoryFiles = [...DEMO_FILES];
    }
    isInitialized = true;
  }
  return memoryFiles;
};

export const addStoredFile = (file: FileItem) => {
  // Add to memory
  memoryFiles = [file, ...memoryFiles];
  
  // Persist to LocalStorage
  // Note: We filter out huge Blob URLs for localStorage to avoid quota errors, 
  // keeping only the metadata or Base64 images if they are small enough.
  const filesToSave = memoryFiles.map(f => {
    // If it's a blob url (video/large image), we can't really save the data permanently in localStorage
    // So we save the entry, but if the user refreshes (F5), the link will be broken.
    // For a real app, this needs IndexedDB or a backend. 
    // For this demo: We save it, but we know blob: urls expire on refresh.
    return f; 
  });
  
  try {
    localStorage.setItem(KEY_FILES, JSON.stringify(filesToSave));
  } catch (e) {
    console.warn("Storage quota exceeded, file metadata only in session.");
  }
};

export const removeStoredFile = (id: string) => {
  memoryFiles = memoryFiles.filter(f => f.id !== id);
  localStorage.setItem(KEY_FILES, JSON.stringify(memoryFiles));
};

// --- AUTH MANAGEMENT ---

export const verifyPassword = (input: string): boolean => {
  const storedPw = localStorage.getItem(KEY_PASSWORD);
  // Default passwords
  if (!storedPw) {
    return input === 'admin' || input === '1234';
  }
  return input === storedPw;
};

export const updatePassword = (newPassword: string) => {
  localStorage.setItem(KEY_PASSWORD, newPassword);
};

export const checkResetCommand = (input: string): boolean => {
    return input.toLowerCase() === 'reset' || input.toLowerCase() === 'hilfe';
};
