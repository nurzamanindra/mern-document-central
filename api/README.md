
# 🚀 Node.js + Express REST API Boilerplate

A lightweight and simple boilerplate to kickstart your backend REST API development using **Node.js** and **Express**.

---

## 📦 Tech Stack

- **Node.js**
- **Express**
- **dotenv**
- **nodemon** (for development)

---

## 🛠️ Getting Started

### 📁 Project Setup

```bash
# Install dependencies
npm install
```

### 📄 Configuration

Create a file at:

```
./config/config.env
```

With the following content:

```env
PORT=3000
NODE_ENV=development

MONGO_URI = mongodb://localhost:27017/<db name>
JWT_SECRET=ldsfjldskfjdslfjlsdfkjdsl
JWT_EXPIRE=20d

FIREBASE_PROJECT_ID=
```

---

## 🚀 Run the Server

```bash
npm run dev
```

Make sure your `package.json` has the following script:

```json
"scripts": {
  "dev": "nodemon server"
}
```

Replace `server` with your actual entry point file if it's different.

---

## 📁 Folder Structure Suggestion

```
project-root/
│
├── config/
│   └── config.env
│
├── routes/
├── controllers/
├── models/
│
├── server.js
└── README.md
```

---

## 📌 Notes

- You can extend this boilerplate with middleware, error handling, authentication, etc.

---
