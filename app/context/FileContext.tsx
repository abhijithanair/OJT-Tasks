import React, { createContext, useContext, useState } from 'react';

interface FileContextType {
  file: File | null;
  idcard: string | null;
  setFile: (file: File | null) => void;
  setIdCard: (idcard: string | null) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [idcard, setIdCard] = useState<string | null>(null);

  return (
    <FileContext.Provider value={{ file, idcard, setFile, setIdCard }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = (): FileContextType => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileContextProvider');
  }
  return context;
};
