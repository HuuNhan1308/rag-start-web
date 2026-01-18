import apiClient from '../api/axios';
import type { UrlResponse, PdfUploadResponse, UrlRequest } from '../types/knowledge';

export const submitUrl = async (urlRequest: UrlRequest): Promise<UrlResponse> => {
  try {
    const response = await apiClient.post<UrlResponse>('/knowledge/web', urlRequest); 
    
    return response.data;
  } catch (error) {
    console.error('Error submitting URL:', error);
    throw error;
  }
};

export const uploadPdf = async (file: File): Promise<PdfUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<PdfUploadResponse>(
      '/knowledge/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
};
