# Frontend UI Requirements – Q&A Chat Application

## 1. Overview

This document describes the requirements for building a **Frontend User Interface (UI)** for a Question & Answer (Q&A) chat application.

* The backend service is **already implemented**.
* The frontend is responsible only for **user interaction, UI rendering, and API communication**.
* The backend API is available at `http://localhost:8080`.

The application behavior is similar to a simple **chat-based interface** (e.g., ChatGPT-style).

---

## 2. Scope

### In Scope

* User interface for submitting questions
* Displaying user messages and backend responses
* Calling backend APIs
* Handling loading and error states

### Out of Scope

* Backend logic or AI/RAG processing
* User authentication or authorization
* Database or data persistence

---

## 3. Target Users

* End users accessing the application via a web browser
* Users must authenticate before accessing chat and knowledge management features

---

## 3.1 Authentication Requirement Overview

* The application must provide a **login screen**.

* Users must successfully authenticate to receive an **access token**.

* All protected API requests (chat and knowledge storage) must include this token.

* End users accessing the application via a web browser

* No login or account is required

---

## 4. Functional Requirements

The application must support **user authentication**, **chat-based Q&A**, and **knowledge base ingestion**.

All protected features require a valid authentication token.

In addition to the chat functionality, the UI must support **knowledge ingestion** by allowing users to submit a URL or upload a PDF file, which will be stored as vectors in the backend knowledge base.

### 4.1 User Login

#### 4.1.1 Login Screen

* The UI must provide a dedicated **Login Screen**.
* The login form must include:

  * Username or Email
  * Password
  * Login button

#### 4.1.2 Login Behavior

* On login submission, the frontend must call a backend authentication API.
* If authentication is successful:

  * The backend returns an **access token**.
  * The token must be stored securely on the client (e.g., in memory or localStorage).
  * The user is redirected to the main application screen.
* If authentication fails:

  * Display an appropriate error message.

**Example Authentication API (conceptual):**

```
POST http://localhost:8080/api/auth/login
```

**Response (example):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 4.2 Question Input

* The UI **must provide a text input area** for users to type questions.

* Users can submit a question by:

  * Clicking the **Send** button, or
  * Pressing the **Enter** key.

* Empty or whitespace-only input **must not be allowed**.

* The UI **must provide a text input area** for users to type questions.

* Users can submit a question by:

  * Clicking the **Send** button, or
  * Pressing the **Enter** key.

* Empty or whitespace-only input **must not be allowed**.

**Validation Rules:**

* Disable the Send button or show a warning message when the input is empty.

---

### 4.2 Chat Message Display

* Messages must be displayed in a **conversation (chat) format**.
* The UI must clearly distinguish between:

  * User messages
  * AI / backend responses
* Each message should include:

  * Message content (text)
  * Timestamp (optional)
* The chat view should **automatically scroll** to the newest message.

---

### 4.3 Backend API Integration (Authenticated)

**API Endpoint**

```
POST http://localhost:8080/api/chat
```

**Authorization Requirement**

* All chat requests **must include a valid access token**.
* The token must be sent using the HTTP `Authorization` header.

```http
Authorization: Bearer <access_token>
```

**Request Body (example)**

```json
{
  "question": "What is Retrieval-Augmented Generation?"
}
```

**Response Body (example)**

```json
{
  "answer": "Retrieval-Augmented Generation (RAG) combines retrieval with text generation..."
}
```

* Requests without a valid token must be rejected by the backend.
* The frontend must handle unauthorized responses (HTTP 401) by redirecting the user back to the login screen.

**API Endpoint**

```
POST http://localhost:8080/api/chat
```

**Request Body (example)**

```json
{
  "question": "What is Retrieval-Augmented Generation?"
}
```

**Response Body (example)**

```json
{
  "answer": "Retrieval-Augmented Generation (RAG) combines retrieval with text generation..."
}
```

* The frontend must send user questions to the backend using HTTP POST.
* The frontend must render the `answer` field from the response.

---

### 4.4 Loading State Handling

* When a question is submitted:

  * Display a **loading indicator** (e.g., spinner or "AI is typing...").
  * Optionally disable the input field while waiting for the response.
* When the response is received:

  * Remove the loading indicator.
  * Display the answer in the chat.

---

### 4.5 Error Handling

* If the API request fails (network error or HTTP 4xx/5xx):

  * Display a user-friendly error message, such as:

    > "Something went wrong. Please try again."
* The UI should allow the user to resend the question.

---

### 4.6 Knowledge Base Ingestion (URL / PDF Upload)

The UI must provide functionality for users to add new knowledge sources to the system.

**Authorization Requirement**

* All knowledge ingestion requests **must include the access token** in the `Authorization` header.

```http
Authorization: Bearer <access_token>
```

#### 4.6.1 URL Input

* Provide a text input field that allows the user to enter a **publicly accessible URL**.
* The user must be able to submit the URL using a **Submit** button.
* Empty or invalid URLs must not be allowed.

**Behavior:**

* On submit, the frontend must call a backend API responsible for **storing vector embeddings** for the given URL.
* Display a loading indicator while the knowledge is being processed.
* Display a success message when the operation completes successfully.

---

#### 4.6.2 PDF Upload

* Provide a file upload control that allows the user to upload **PDF files only**.
* File validation rules:

  * Accepted format: `.pdf`
  * Maximum file size (configurable, e.g., 10MB)

**Behavior:**

* On submit, the frontend must upload the PDF file to the backend using the provided API.
* The backend will process the PDF and store its content as vector embeddings.
* Display upload and processing status to the user.
* Display a success or error message after completion.

---

#### 4.6.3 Backend API Integration for Knowledge Storage

* The frontend must call existing backend APIs for vector storage.
* Example API patterns (actual endpoints may vary):

```
POST http://localhost:8080/api/knowledge/url
POST http://localhost:8080/api/knowledge/pdf
```

* URL submission should be sent as JSON.

* PDF upload should use `multipart/form-data`.

* Requests without a valid token must be rejected by the backend.

---

#### 4.6.2 PDF Upload

* Provide a file upload control that allows the user to upload **PDF files only**.
* File validation rules:

  * Accepted format: `.pdf`
  * Maximum file size (configurable, e.g., 10MB)

**Behavior:**

* On submit, the frontend must upload the PDF file to the backend using the provided API.
* The backend will process the PDF and store its content as vector embeddings.
* Display upload and processing status to the user.
* Display a success or error message after completion.

---

#### 4.6.3 Backend API Integration for Knowledge Storage

* The frontend must call existing backend APIs for vector storage.
* Example API patterns (actual endpoints may vary):

```
POST http://localhost:8080/api/knowledge/url
POST http://localhost:8080/api/knowledge/pdf
```

* URL submission should be sent as JSON.
* PDF upload should use `multipart/form-data`.

---

* If the API request fails (network error or HTTP 4xx/5xx):

  * Display a user-friendly error message, such as:

    > "Something went wrong. Please try again."
* The UI should allow the user to resend the question.

---

## 5. UI / UX Requirements

### 5.1 Layout Structure

* **Header**: Application title (e.g., *AI Chat Assistant*)
* **Main Area**: Chat message list
* **Footer**:

  * Question input box
  * Send button

---

### 5.2 UX Guidelines

* Clean and minimal design
* Responsive layout (desktop-first, mobile-friendly if possible)
* Chat bubbles with rounded corners
* Message alignment:

  * User messages aligned to the right
  * AI responses aligned to the left

---

## 6. Technical Requirements

### 6.1 Frontend Technology Stack (Recommended)

* Framework: React / Vue / Next.js (React preferred if not specified)
* HTTP Client: **Axios**
* State Management: Local state (`useState`, `useReducer`)

---

### 6.2 API Configuration

* Base URL:

```
http://localhost:8080
```

* Required HTTP Headers:

```http
Content-Type: application/json
Authorization: Bearer <access_token>
```

* The frontend **must create a reusable Axios instance** for all API calls.
* The Axios instance should:

  * Define the `baseURL` as `http://localhost:8080`
  * Automatically attach the access token to the `Authorization` header
  * Set default headers (e.g., `Content-Type: application/json`)
  * Handle authentication errors globally (e.g., 401 Unauthorized)

**Example Axios Instance (conceptual):**

```js
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

* Base URL:

```
http://localhost:8080
```

* Required HTTP Headers:

```http
Content-Type: application/json
```

* The frontend **must create a reusable Axios instance** for all API calls.
* The Axios instance should:

  * Define the `baseURL` as `http://localhost:8080`
  * Set default headers (e.g., `Content-Type: application/json`)
  * Be reused across services or API modules

**Example Axios Instance (conceptual):**

````js
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'foobar'
  }
});
```js
axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});
````

---

### 6.3 Performance Requirements

* No full-page reloads when sending messages
* Messages should appear instantly in the UI
* Clear feedback during backend processing

---

## 7. Security Considerations

* Sanitize and escape user input to prevent XSS attacks
* Do not expose sensitive information in browser console logs

---

## 8. Acceptance Criteria

* ✅ User can enter and submit a question
* ✅ The question is sent to the backend successfully
* ✅ The backend response is displayed correctly
* ✅ Loading state is shown while waiting for a response
* ✅ Errors are handled gracefully
* ✅ UI layout remains stable and responsive

---

## 9. Future Enhancements (Optional)

* Chat history persistence
* Clear chat functionality
* Streaming responses (typing effect)
* Markdown rendering (code blocks, lists, etc.)
