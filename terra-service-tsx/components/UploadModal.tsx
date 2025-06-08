/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  // const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  // const [nin, setNin] = useState('');
  const [landRegNumber, setLandRegNumber] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [currentOwnerId, setCurrentOwnerId] = useState("5");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

 const handleUpload = async () => {
  if (!landRegNumber || !file) {
    alert('Please enter NIN, Land Reg Number, and select a file.');
    return;
  }

  setIsUploading(true);

  const formData = new FormData();
  // formData.append('nin', nin);
  formData.append('unique_property_identifier', landRegNumber);
  formData.append('proof_of_ownership_document', file);
  formData.append('full_address', location)
  formData.append('property_type', "land")
  formData.append("current_owner", currentOwnerId)

  try {
    const res = await fetch('https://e1e0-102-90-100-9.ngrok-free.app/properties/', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic bHVjaWZlcjpkZWF0aDIwMjU='
      },
      body: formData,
    });

    if (!res.ok) {
      let errorMsg = `Upload failed with status ${res.status}`;
      try {
        const errorData = await res.json();
        errorMsg = errorData.detail || JSON.stringify(errorData);
      } catch {
      }
      throw new Error(errorMsg);
    }

    const result = await res.json();
    console.log('Uploaded successfully:', result);

    alert('Upload successful!');
    
    // Reset form
    setFile(null);
    setLandRegNumber('');
    setLocation('')
    setPropertyType('')
    onClose();

  } catch (err: any) {
    console.error('Upload error:', err);
    alert(err.message || 'An unexpected error occurred during upload.');
  } finally {
    setIsUploading(false);
  }
};

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>

        {/* Dropzone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-md p-6 cursor-pointer transition-all duration-300 ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <p className="text-center text-gray-500">
            Drag and drop files here, or click to select
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        {/* NIN & Land Reg Inputs */}
        <form className="mt-4 space-y-4">

          <div>
            <label htmlFor="nin" className="block text-sm font-medium text-gray-700">
              Location Address
            </label>
            <input
              id="loaction"
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter location address"
            />
          </div>

          <div>
            <label htmlFor="landRegNumber" className="block text-sm font-medium text-gray-700">
              Land Registration Number
            </label>
            <input
              id="landRegNumber"
              type="text"
              value={landRegNumber}
              onChange={e => setLandRegNumber(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter Land Reg Number"
            />
          </div>
        </form>

        {/* Previews */}
        {file && (
        <div className="mt-4 max-h-40 overflow-y-auto">
          {file.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-24 h-24 object-cover rounded shadow"
            />
          ) : (
            <div className="text-gray-700 text-sm break-words">
              📄 {file.name}
            </div>
          )}
        </div>
      )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isUploading}
            className="py-2 px-4 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={isUploading || file == null}
            className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 flex items-center"
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              'Upload'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
