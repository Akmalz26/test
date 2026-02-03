import React, { ChangeEvent, useState, useEffect } from 'react';
import { FileIcon, UploadCloud } from 'lucide-react';

interface UploadFieldProps {
  label: string;
  name: string;
  accept?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  maxSize?: number; // in MB
  progress?: any;
  fileInfo?: { name: string; preview?: string; isExisting?: boolean } | null;
}

export default function UploadField({
  label,
  name,
  accept = 'image/*',
  onChange,
  required = false,
  disabled = false,
  error,
  maxSize = 2, // Default 2MB
  progress,
  fileInfo,
}: UploadFieldProps) {
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [hasFile, setHasFile] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isExistingFile, setIsExistingFile] = useState<boolean>(false);
  
  // Set file info jika ada fileInfo dari prop
  useEffect(() => {
    if (fileInfo) {
      setFileName(fileInfo.name);
      setHasFile(true);
      setIsExistingFile(fileInfo.isExisting || false);
      
      if (fileInfo.preview) {
        setPreviewUrl(fileInfo.preview);
      }
    }
  }, [fileInfo]);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Check file size
      const fileSizeInMB = file.size / (1024 * 1024);
      
      if (fileSizeInMB > maxSize) {
        // Reset the file input
        e.target.value = '';
        setFileName('');
        setFileSize('');
        setHasFile(false);
        setPreviewUrl(null);
        setIsExistingFile(false);
        alert(`Ukuran file melebihi batas maksimal ${maxSize}MB`);
        return;
      }
      
      setFileName(file.name);
      setFileSize((fileSizeInMB).toFixed(2) + ' MB');
      setHasFile(true);
      setIsExistingFile(false);
      
      // Preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setFileName('');
      setFileSize('');
      setHasFile(false);
      setPreviewUrl(null);
      setIsExistingFile(false);
    }
    
    onChange(e);
  };
  
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-orange-500">*</span>}
        </label>
      </div>
      
      <div className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg overflow-hidden`}>
        <label 
          htmlFor={name} 
          className="relative block cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50">
            {!hasFile ? (
              <>
                <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">Tarik & letakkan file atau</p>
                <span className="text-sm text-orange-500 hover:text-orange-400 transition-colors">
                  Pilih file
                </span>
              </>
            ) : (
              <div className="w-full">
                {previewUrl ? (
                  <div className="flex justify-center mb-3">
                    <img src={previewUrl} alt="Preview" className="h-24 rounded border border-gray-300" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <FileIcon className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium text-gray-700 mb-1">{fileName}</p>
                  {!isExistingFile && <p className="text-xs text-gray-500 mb-2">{fileSize}</p>}
                  {isExistingFile && (
                    <p className="text-xs text-green-600 mb-2">Dokumen sudah diupload sebelumnya</p>
                  )}
                  <span className="text-xs text-orange-500 hover:text-orange-400 transition-colors">
                    {isExistingFile ? 'Ganti dokumen' : 'Ganti file'}
                  </span>
                </div>
              </div>
            )}
            
            <input
              type="file"
              id={name}
              name={name}
              onChange={handleFileChange}
              accept={accept}
              required={required && !isExistingFile}
              disabled={disabled}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              aria-label={label}
            />
          </div>
        </label>
        
        {progress && progress.percentage && (
          <div className="w-full h-1 bg-gray-200">
            <div 
              className="h-1 bg-orange-500 transition-all duration-300"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        )}
      </div>
      
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}