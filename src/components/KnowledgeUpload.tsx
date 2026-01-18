import { useState, type FormEvent, type ChangeEvent } from 'react';
import { submitUrl, uploadPdf } from '../services/knowledgeService';
import type { UploadStatus, UrlRequest } from '../types/knowledge';
import './KnowledgeUpload.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function KnowledgeUpload() {
  const [activeTab, setActiveTab] = useState<'url' | 'pdf'>('url');
  
  // URL state
  const [urlInput, setUrlInput] = useState('');
  const [urlStatus, setUrlStatus] = useState<UploadStatus>('idle');
  const [urlMessage, setUrlMessage] = useState('');
  
  // PDF state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfStatus, setPdfStatus] = useState<UploadStatus>('idle');
  const [pdfMessage, setPdfMessage] = useState('');

  // Validate URL
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Handle URL submission
  const handleUrlSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const trimmedUrl = urlInput.trim();
    if (!trimmedUrl) {
      setUrlMessage('Please enter a URL');
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setUrlMessage('Please enter a valid URL');
      return;
    }

    setUrlStatus('uploading');
    setUrlMessage('Processing URL...');

    try {
      const urlRequest: UrlRequest = { url: trimmedUrl };
      const response = await submitUrl(urlRequest);
      setUrlStatus('success');
      setUrlMessage(response.message || 'URL processed successfully! The content has been added to the knowledge base.');
      setUrlInput('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setUrlStatus('idle');
        setUrlMessage('');
      }, 5000);
    } catch (error) {
      setUrlStatus('error');
      setUrlMessage('Failed to process URL. Please try again.');
    }
  };

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      setPdfMessage('Please select a PDF file');
      setPdfStatus('error');
      setSelectedFile(null);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setPdfMessage(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
      setPdfStatus('error');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setPdfStatus('idle');
    setPdfMessage('');
  };

  // Handle PDF upload
  const handlePdfUpload = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setPdfMessage('Please select a PDF file');
      return;
    }

    setPdfStatus('uploading');
    setPdfMessage('Uploading and processing PDF...');

    try {
      const response = await uploadPdf(selectedFile);
      setPdfStatus('success');
      setPdfMessage(response.message || 'PDF uploaded successfully! The content has been added to the knowledge base.');
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      // Reset after 5 seconds
      setTimeout(() => {
        setPdfStatus('idle');
        setPdfMessage('');
      }, 5000);
    } catch (error) {
      setPdfStatus('error');
      setPdfMessage('Failed to upload PDF. Please try again.');
    }
  };

  return (
    <div className="knowledge-upload-container">
      <div className="knowledge-header">
        <h2>Add Knowledge</h2>
        <p>Upload documents or add web content to expand the AI's knowledge base</p>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'url' ? 'active' : ''}`}
          onClick={() => setActiveTab('url')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
          </svg>
          Web URL
        </button>
        <button
          className={`tab-button ${activeTab === 'pdf' ? 'active' : ''}`}
          onClick={() => setActiveTab('pdf')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          PDF Upload
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'url' && (
          <form onSubmit={handleUrlSubmit} className="upload-form">
            <div className="form-group">
              <label htmlFor="url-input">Enter URL</label>
              <input
                id="url-input"
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/article"
                className="url-input"
                disabled={urlStatus === 'uploading'}
              />
            </div>

            {urlMessage && (
              <div className={`status-message ${urlStatus}`}>
                {urlStatus === 'uploading' && (
                  <div className="spinner"></div>
                )}
                <p>{urlMessage}</p>
              </div>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={!urlInput.trim() || urlStatus === 'uploading'}
            >
              {urlStatus === 'uploading' ? 'Processing...' : 'Submit URL'}
            </button>
          </form>
        )}

        {activeTab === 'pdf' && (
          <form onSubmit={handlePdfUpload} className="upload-form">
            <div className="form-group">
              <label htmlFor="pdf-upload">Select PDF File</label>
              <div className="file-input-wrapper">
                <input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="file-input"
                  disabled={pdfStatus === 'uploading'}
                />
                <label htmlFor="pdf-upload" className="file-input-label">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                  </svg>
                  {selectedFile ? selectedFile.name : 'Choose PDF file'}
                </label>
              </div>
              <p className="file-info">Maximum file size: 10MB</p>
            </div>

            {pdfMessage && (
              <div className={`status-message ${pdfStatus}`}>
                {pdfStatus === 'uploading' && (
                  <div className="spinner"></div>
                )}
                <p>{pdfMessage}</p>
              </div>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={!selectedFile || pdfStatus === 'uploading'}
            >
              {pdfStatus === 'uploading' ? 'Uploading...' : 'Upload PDF'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default KnowledgeUpload;
