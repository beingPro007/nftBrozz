'use client';
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';

export default function ImageUpload({ onUploadSuccess }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return alert('Please select an image first!');

    const formData = new FormData();
    formData.append('cloudinary-image', image);

    setUploading(true);
    try {
      const res = await axios.post(
        'http://localhost:3000/api/v1/users/nft/upload-image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log("Response received: ", res);
      
      onUploadSuccess(res.data.imageUrl);
    } catch (err) {
      console.error('Upload failed', err);
      alert('Upload failed. Try again.');
    }
    setUploading(false);
  };

  return (
    <Card className="w-80 p-4 shadow-lg flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold">Upload Image</h2>
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-40 h-40 rounded-md object-cover"
        />
      ) : (
        <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed rounded-md text-gray-400">
          <UploadCloud size={32} />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Select Image
      </label>
      <Button
        onClick={handleUpload}
        className="bg-green-500 w-full"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
    </Card>
  );
}
