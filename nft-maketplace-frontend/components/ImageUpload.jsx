'use client';

import { useState } from 'react';
import { Axis3DIcon, UploadCloud } from 'lucide-react';
import axios from 'axios';

export function ImageUpload({ onUploadSuccess }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    
    setIsUploading(true);

    const localImageUrl = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append('cloudinary-image', file);

    try {
      const res = await axios.post(
        'http://localhost:3000/api/v1/users/nft/upload-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log("Response generated", res.data.imageUrl);
      const imageUrl = res.data.imageUrl;
      console.log("Image url is",imageUrl);
      
      onUploadSuccess(imageUrl);
      setIsUploading(false);
      
    } catch (error) {
      console.log("Error occured while uploading the image to the cloud", error.message);
      alert("Fail to upload the data to cloud");    
    }

  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragging
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload').click()}
    >
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="rounded-full bg-primary/10 p-3">
          <UploadCloud className="h-6 w-6 text-primary" />
        </div>
        <div className="text-sm font-medium">
          {isUploading ? (
            'Uploading...'
          ) : (
            <>
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  );
}
