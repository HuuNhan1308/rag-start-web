import type { ApiResponse } from './response';

export interface UrlRequest {
  url: string;
  selector?: string;
}

export interface UrlResponse extends ApiResponse<any> {
}

export interface PdfUploadResponse {
  success: boolean;
  message?: string;
}

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
