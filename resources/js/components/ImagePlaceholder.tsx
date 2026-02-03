import React from 'react';

interface ImagePlaceholderProps {
  width?: string;
  height?: string;
  text?: string;
  className?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width = '100%',
  height = '160px',
  text = 'Tidak ada gambar',
  className = '',
}) => {
  return (
    <div 
      className={`flex items-center justify-center bg-gray-200 rounded-md ${className}`}
      style={{ width, height }}
    >
      <span className="text-gray-500 text-sm font-medium">{text}</span>
    </div>
  );
};

export default ImagePlaceholder; 