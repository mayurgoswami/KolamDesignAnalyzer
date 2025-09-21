import React, { useState, useRef, useEffect } from 'react';
import { ImageUpIcon, Info, ImageIcon, CheckCircle, X } from 'lucide-react';
import './UploadSection.css';

function UploadSection() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadComplete, setUploadComplete] = useState({});
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      processFiles(newFiles);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      processFiles(newFiles);
    }
  };

  const processFiles = (newFiles) => {
    // Filter for image files only and check size
    const validFiles = newFiles.filter(file => {
      if (!file.type.startsWith('image/')) return false;
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Max size is 10MB.`);
        return false;
      }
      return true;
    });

    setFiles(prevFiles => [...prevFiles, ...validFiles]);
    
    // Initialize progress for each file
    const newProgress = {};
    validFiles.forEach(file => {
      newProgress[file.name] = 0;
    });
    setUploadProgress(prev => ({...prev, ...newProgress}));
    
    // Start simulation for each file
    validFiles.forEach(file => {
      simulateUpload(file);
    });
  };

  const simulateUpload = (file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      progress = Math.min(progress, 100);
      
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: progress
      }));
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadComplete(prev => ({
          ...prev,
          [file.name]: true
        }));
      }
    }, 200);
  };

  const removeFile = (fileName) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const newProgress = {...prev};
      delete newProgress[fileName];
      return newProgress;
    });
    setUploadComplete(prev => {
      const newComplete = {...prev};
      delete newComplete[fileName];
      return newComplete;
    });
  };

  const handleUploadClick = () => {
    alert(`Uploading ${files.length} file(s)...\n\nIn a real application, this would send the files to a server.`);
  };

  return (
    <section className="section" id='upload-section'>
      <div className="floating_container">
        <h1>Upload Files</h1>
        <label 
          htmlFor="input-files" 
          className={`upload_box ${dragActive ? 'drag_active' : ''}`}
          ref={dropAreaRef}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            className="upload_input" 
            ref={fileInputRef} 
            onChange={handleChange}
            accept="image/*" 
            id="input-files" 
            multiple 
          />
          <ImageUpIcon color={dragActive ? '#BA3111' : '#6D6A6A'} size={100} />
          <p>Drag & drop or click to choose files</p>
          <div className="file_restriction">
            <Info color='#6D6A6A' size={18} />
            <p>Max image size: 10MB</p>
          </div>
        </label>
        
        <div className="uploaded_files_container">
          {files.map((file, index) => (
            <div className="uploaded_file" key={index}>
              <ImageIcon color='#BA3111' />
              <div className="file_info">
                <h2>{file.name}</h2>
                <div className="file_details">
                  <span className="file_type">{file.name.slice(file.name.lastIndexOf('.') + 1)}</span>
                  <span>|</span>
                  <span className="file_size">{formatFileSize(file.size)}</span>
                </div>
                <div className="progress_container">
                  <div className="progress_bar">
                    <div 
                      className="progress" 
                      style={{ width: `${uploadProgress[file.name] || 0}%` }}
                    ></div>
                  </div>
                  <span className="progress_text">
                    {uploadComplete[file.name] ? 'Complete' : `${Math.round(uploadProgress[file.name] || 0)}%`}
                  </span>
                </div>
              </div>
              {uploadComplete[file.name] ? (
                <CheckCircle color='#1c971c' />
              ) : (
                <X 
                  color='#ff4d4f' 
                  className="remove_icon" 
                  onClick={() => removeFile(file.name)} 
                />
              )}
            </div>
          ))}
        </div>
        
        <button 
          className={`btn_upload ${files.length === 0 ? 'disabled' : ''}`}
          onClick={handleUploadClick}
          disabled={files.length === 0}
        >
          Analyze
        </button>
      </div>
    </section>
  );
}

export default UploadSection;






















// import React, { useEffect, useRef, useState } from 'react';
// import styles from './UploadSection.module.css';

// import { ImageUpIcon, Info, ImageIcon, CheckCircle } from 'lucide-react';

// function UploadSection() {
//   const [icon_color, setIconColor] = useState('#6D6A6A');
//   const upload_box_ref = useRef(0);
//   const input_field = useRef(0);
//   const files_list = useRef(0);
//   const progressBar = useRef(0);
//   const fileStatus = useRef(0);

//   let uploadedFiles = [];

//   const formatFileSize = bytes => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const createFileItem = file => {
//     const fileItem = document.createElement('div');
//     fileItem.className = 'uploaded_file';

//     const fileSize = formatFileSize(file.size);

//     fileItem.innerHTML = `<div className={styles.uploaded_file}>
//             <ImageIcon color='#BA3111' />
//             <div>
//               <h2>${file.name}</h2>
//               <span className={styles.file_type}>${file.name.slice(file.name.lastIndexOf('.'), file.name.length)}</span>
//               <span>|</span>
//               <span className={styles.file_size}>${fileSize}</span>
//               <div class="progress-bar">
//                             <div class="progress"></div>
//                 </div>
//             </div>
//             <CheckCircle color='#1c971c' />
//           </div>`;

//     return fileItem;
//   }

//   function simulateUploadProgress(fileItem, file) {
//     const progressBar = fileItem.querySelector('.progress');
//     const fileStatus = fileItem.querySelector('.file-status');

//     let width = 0;
//     const interval = setInterval(() => {
//       if (width >= 100) {
//         clearInterval(interval);
//         fileStatus.textContent = 'Uploaded';
//         fileStatus.classList.add('success');
//       } else {
//         width += Math.random() * 15;
//         width = Math.min(width, 100);
//         progressBar.style.width = width + '%';
//         fileStatus.textContent = Math.round(width) + '%';
//       }
//     }, 200);
//   }

//   const handleFiles = files => {
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       if (!file) continue;

//       uploadedFiles.push(file);
//       const fileItem = createFileItem(file);
//       files_list.current.appendChild(fileItem);

//       simulateUploadProgress(fileItem, file);
//     }
//   }

//   useEffect(() => {
//     upload_box_ref.current.addEventListener('dragover', () => {
//       upload_box_ref.current.style.borderColor = 'var(--app-primary)';
//       upload_box_ref.current.style.background = 'var(--app-primary-transparent)';
//       setIconColor('#BA3111');
//     });

//     upload_box_ref.current.addEventListener('drop', () => {
//       upload_box_ref.current.style.borderColor = 'var(--app-warm-grey)';
//       upload_box_ref.current.style.background = 'transparent';
//       setIconColor('#6D6A6A');
//     });

//     upload_box_ref.current.addEventListener('drop', e => {
//       handleFiles(e.dataTransfer.files);
//     });

//     input_field.current.addEventListener('change', () => {
//       handleFiles(input_field.files);
//     });
//   });


//   return (
//     <section className={styles.section}>
//       <div className={styles.floating_container}>
//         <h1>Upload Files</h1>
//         <label htmlFor="input-files" className={styles.upload_box} ref={upload_box_ref}>
//           <input type="file" className={styles.upload_input} ref={input_field} accept="image/*" id="input-files" multiple />
//           <ImageUpIcon color={icon_color} size={100} />
//           <p>Drag & drop or click to choose files</p>
//           <div className={styles.file_restriction}>
//             <Info color='#6D6A6A' size={18} />
//             <p>Max image size: 10MB</p>
//           </div>
//         </label>
//         <div className={styles.uploaded_files_container} ref={files_list}>
//           <div className={styles.uploaded_file}>
//             <ImageIcon color='#BA3111' />
//             <div>
//               <h2>Image Title</h2>
//               <span className={styles.file_type}>.png</span>
//               <span>|</span>
//               <span className={styles.file_size}>1.2 MB</span>
//             </div>
//             <CheckCircle color='#1c971c' />
//           </div>
//         </div>
//         <button className={styles.btn_upload}>Upload</button>
//       </div>
//     </section>
//   )
// }

// export default UploadSection;