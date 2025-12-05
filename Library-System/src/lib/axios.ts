// src/lib/axios.ts

import axios from 'axios';

// **تعريف الـ Backend URL**
// نستخدم متغير بيئة (Environment Variable) لسهولة التغيير في بيئات مختلفة
// افترضنا هنا VITE_BACKEND_URL هو "http://localhost:3000"
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// إنشاء مثيل Axios مُهَيَّأ (Interceptor/Client)
export const api = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// مثال على Interceptor: يمكن استخدامه لإضافة الـ JWT Token لجميع الطلبات
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);