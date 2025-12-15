import React, { useState, useRef } from 'react';
import { Upload, File, Image as ImageIcon, Music, Video, Trash2, Download } from 'lucide-react';
import { FileItem } from '../types';

const FileBrowser: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: 'Projekt_Titan.pdf', type: 'document', size: 2400000, url: '#', date: new Date('2024-03-10') },
    { id: '2', name: 'Deep_Dive_Log.mp4', type: 'video', size: 154000000, url: '#', date: new Date('2024-03-12') },
    { id: '3', name: 'Sonar_Scan_Alpha.png', type: 'image', size: 4500000, url: '#', date: new Date('2024-03-14') },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="text-purple-400" size={24} />;
      case 'video': return <Video className="text-red-400" size={24} />;
      case 'audio': return <Music className="text-ocean-glow" size={24} />;
      default: return <File className="text-slate-400" size={24} />;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    const newFiles: FileItem[] = Array.from(uploadedFiles).map(file => {
        let type: FileItem['type'] = 'document';
        if (file.type.startsWith('image')) type = 'image';
        else if (file.type.startsWith('video')) type = 'video';
        else if (file.type.startsWith('audio')) type = 'audio';

        return {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type,
            size: file.size,
            url: URL.createObjectURL(file), // Create local preview URL
            date: new Date()
        };
    });

    setFiles(prev => [...newFiles, ...prev]);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 pt-24 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-4xl font-bold mb-2 border-l-4 border-bio-green pl-4">Dateimanager</h2>
                <p className="text-slate-400 pl-5">Upload und Verwaltung von Medien.</p>
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
                    className="bg-ocean-glow hover:bg-cyan-300 text-slate-950 font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                    <Upload size={20} />
                    <span>Upload</span>
                </button>
            </div>
        </div>

        {/* Upload Area / Dropzone Visual */}
        <div 
            className="border-2 border-dashed border-slate-800 rounded-xl p-12 text-center mb-8 bg-slate-900/30 hover:bg-slate-900/50 hover:border-ocean-glow/50 transition-all cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
        >
            <Upload className="mx-auto text-slate-500 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-300">Dateien hier ablegen</h3>
            <p className="text-slate-500 text-sm mt-2">Unterstützt Videos, Musik, Bilder und Dokumente</p>
        </div>

        {/* File List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 bg-slate-950/50 text-xs font-mono text-slate-500 uppercase tracking-wider">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Typ</div>
                <div className="col-span-2">Größe</div>
                <div className="col-span-2 text-right">Aktion</div>
            </div>
            
            <div className="divide-y divide-slate-800">
                {files.map(file => (
                    <div key={file.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-800/50 transition-colors group">
                        <div className="col-span-6 flex items-center gap-4 overflow-hidden">
                            <div className="p-2 bg-slate-950 rounded border border-slate-800">
                                {getIcon(file.type)}
                            </div>
                            <div className="truncate">
                                <div className="font-medium text-slate-200 truncate">{file.name}</div>
                                <div className="text-xs text-slate-500">{file.date.toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div className="col-span-2 text-sm text-slate-400 capitalize bg-slate-950/30 px-2 py-1 rounded w-fit h-fit">
                            {file.type}
                        </div>
                        <div className="col-span-2 font-mono text-sm text-slate-400">
                            {formatSize(file.size)}
                        </div>
                        <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {file.url !== '#' && (
                                <a href={file.url} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-700 rounded text-ocean-glow">
                                    <Download size={18} />
                                </a>
                            )}
                            <button 
                                onClick={() => setFiles(files.filter(f => f.id !== file.id))}
                                className="p-2 hover:bg-red-900/30 rounded text-red-400"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                
                {files.length === 0 && (
                    <div className="p-12 text-center text-slate-500 italic">
                        Keine Dateien vorhanden.
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default FileBrowser;