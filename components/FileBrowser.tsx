import React, { useState, useRef, useEffect } from 'react';
import { Upload, File, Image as ImageIcon, Music, Video, Trash2, Download, Eye, X, PlayCircle, AlertTriangle } from 'lucide-react';
import { FileItem } from '../types';
import { getStoredFiles, addStoredFile, removeStoredFile } from '../services/storageService';

const FileBrowser: React.FC = () => {
  // Initialize from Service instead of hardcoded state
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load files on mount
  useEffect(() => {
    setFiles(getStoredFiles());
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="text-white" size={24} />;
      case 'video': return <Video className="text-ocean-glow" size={24} />;
      case 'audio': return <Music className="text-white" size={24} />;
      default: return <File className="text-zinc-400" size={24} />;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    Array.from(uploadedFiles).forEach(file => {
        let type: FileItem['type'] = 'document';
        if (file.type.startsWith('image')) type = 'image';
        else if (file.type.startsWith('video')) type = 'video';
        else if (file.type.startsWith('audio')) type = 'audio';

        const newFile: FileItem = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type,
            size: file.size,
            // Creating a Blob URL that persists for the browser session
            url: URL.createObjectURL(file), 
            date: new Date()
        };

        // Save to Service
        addStoredFile(newFile);
    });

    // Update local state from service
    setFiles(getStoredFiles());
  };

  const handleDelete = (id: string) => {
    removeStoredFile(id);
    setFiles(getStoredFiles());
    if (selectedFile?.id === id) setSelectedFile(null);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const openPreview = (file: FileItem) => {
    if (file.type === 'image' || file.type === 'video') {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 pt-32 flex flex-col items-center relative">
      <div className="max-w-6xl w-full">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-4xl font-bold mb-2 border-l-4 border-ocean-glow pl-4 text-white">Dateimanager</h2>
                <p className="text-zinc-400 pl-5">Upload und Verwaltung von Medien.</p>
            </div>
            <div>
                <input 
                    type="file" 
                    multiple 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileUpload} 
                />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-ocean-glow hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(139,0,0,0.3)]"
                >
                    <Upload size={20} />
                    <span>Upload</span>
                </button>
            </div>
        </div>

        {/* Upload Area */}
        <div 
            className="border-2 border-dashed border-zinc-800 rounded-xl p-12 text-center mb-8 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-ocean-glow/50 transition-all cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
        >
            <Upload className="mx-auto text-zinc-500 mb-4" size={48} />
            <h3 className="text-xl font-bold text-zinc-300">Dateien hier ablegen</h3>
            <p className="text-zinc-500 text-sm mt-2">Unterstützt Videos, Musik, Bilder und Dokumente</p>
        </div>

        {/* File List */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-zinc-800 bg-black/50 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Typ</div>
                <div className="col-span-2">Größe</div>
                <div className="col-span-2 text-right">Aktion</div>
            </div>
            
            <div className="divide-y divide-zinc-800">
                {files.map(file => (
                    <div key={file.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-zinc-800/50 transition-colors group">
                        <div className="col-span-6 flex items-center gap-4 overflow-hidden cursor-pointer" onClick={() => openPreview(file)}>
                            <div className="p-2 bg-black rounded border border-zinc-800 relative">
                                {getIcon(file.type)}
                                {(file.type === 'video' || file.type === 'image') && (
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                                    {file.type === 'video' ? <PlayCircle size={12} className="text-white"/> : <Eye size={12} className="text-white"/>}
                                  </div>
                                )}
                            </div>
                            <div className="truncate">
                                <div className="font-medium text-zinc-200 truncate group-hover:text-ocean-glow transition-colors">{file.name}</div>
                                <div className="text-xs text-zinc-500">{file.date.toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div className="col-span-2 text-sm text-zinc-400 capitalize bg-black/30 px-2 py-1 rounded w-fit h-fit">
                            {file.type}
                        </div>
                        <div className="col-span-2 font-mono text-sm text-zinc-400">
                            {formatSize(file.size)}
                        </div>
                        <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {(file.type === 'image' || file.type === 'video') && (
                              <button 
                                onClick={() => openPreview(file)}
                                className="p-2 hover:bg-zinc-700 rounded text-white"
                                title="Vorschau"
                              >
                                <Eye size={18} />
                              </button>
                            )}
                            {file.url !== '#' && !file.url.startsWith('blob:') && (
                                <a href={file.url} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-zinc-700 rounded text-ocean-glow" title="Download">
                                    <Download size={18} />
                                </a>
                            )}
                            <button 
                                onClick={() => handleDelete(file.id)}
                                className="p-2 hover:bg-red-900/30 rounded text-red-500"
                                title="Löschen"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                
                {files.length === 0 && (
                    <div className="p-12 text-center text-zinc-500 italic">
                        Keine Dateien vorhanden.
                    </div>
                )}
            </div>
            {files.length > 3 && (
                <div className="p-2 bg-red-900/20 text-red-400 text-xs text-center border-t border-red-900/30 flex items-center justify-center gap-2">
                    <AlertTriangle size={12} />
                    Hinweis: Große Dateien (Videos) werden temporär für diese Sitzung gespeichert.
                </div>
            )}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-5xl bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-black">
               <div className="flex items-center gap-3">
                  {getIcon(selectedFile.type)}
                  <h3 className="font-bold text-white truncate max-w-md">{selectedFile.name}</h3>
               </div>
               <button 
                 onClick={() => setSelectedFile(null)}
                 className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
               >
                 <X size={24} />
               </button>
            </div>
            
            <div className="flex-1 bg-black flex items-center justify-center p-2 overflow-hidden relative group">
               {selectedFile.type === 'video' ? (
                 <video 
                   key={selectedFile.url} // CRITICAL FIX: Forces React to re-mount the video player when file changes
                   controls 
                   autoPlay 
                   playsInline
                   className="max-w-full max-h-[70vh] rounded outline-none"
                 >
                    <source src={selectedFile.url} />
                    Dein Browser unterstützt dieses Video nicht.
                 </video>
               ) : (
                 <img 
                   src={selectedFile.url} 
                   alt={selectedFile.name}
                   className="max-w-full max-h-[70vh] object-contain rounded"
                 />
               )}
            </div>

            <div className="p-4 bg-black border-t border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-500">
               <div>TYPE: {selectedFile.type.toUpperCase()}</div>
               <div>SIZE: {formatSize(selectedFile.size)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileBrowser;