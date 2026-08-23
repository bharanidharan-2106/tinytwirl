import axios from 'axios';
import { siteConfig } from '../config/site';

const api = axios.create({
  baseURL: siteConfig.apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('tt_token');
      localStorage.removeItem('tt_user');
      // If we are not already on the login page, redirect to it
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const publicApi = {
  getPrograms: () => api.get('/programs'),
  getMedia: (params) => api.get('/media', { params }),
  getOffers: () => api.get('/offers'),
  getEvents: () => api.get('/events'),
  getTestimonials: () => api.get('/testimonials'),
  getSettings: () => api.get('/settings'),
};

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};

export const adminApi = {
  getStats: () => api.get('/admin/dashboard/stats'),
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (data) => api.put('/admin/settings', data),
  getMedia: () => api.get('/admin/media'),
  uploadMedia: (formData) =>
    api.post('/admin/media', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateMedia: (id, data) => api.put(`/admin/media/${id}`, data),
  deleteMedia: (id) => api.delete(`/admin/media/${id}`),
  getPrograms: () => api.get('/admin/programs'),
  createProgram: (data) => api.post('/admin/programs', data),
  updateProgram: (id, data) => api.put(`/admin/programs/${id}`, data),
  deleteProgram: (id) => api.delete(`/admin/programs/${id}`),
  getOffers: () => api.get('/admin/offers'),
  createOffer: (formData) =>
    api.post('/admin/offers', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateOffer: (id, formData) =>
    api.put(`/admin/offers/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteOffer: (id) => api.delete(`/admin/offers/${id}`),
  getEvents: () => api.get('/admin/events'),
  createEvent: (formData) =>
    api.post('/admin/events', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateEvent: (id, formData) =>
    api.put(`/admin/events/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteEvent: (id) => api.delete(`/admin/events/${id}`),
  getTestimonials: () => api.get('/admin/testimonials'),
  createTestimonial: (data) => api.post('/admin/testimonials', data),
  updateTestimonial: (id, data) => api.put(`/admin/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),
};

export default api;
