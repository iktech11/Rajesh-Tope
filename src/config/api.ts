/**
 * Production-ready API configuration
 * Resolves the backend base URL dynamically:
 * - VITE_API_BASE_URL (if configured in deployment environment, e.g. https://rajesh-tope.onrender.com)
 * - Empty string ('') for relative routing when served by the unified Express server or Vite local dev proxy
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export const API_URLS = {
  health: `${API_BASE}/api/health`,
  submissions: `${API_BASE}/api/submissions`,
  adminLogin: `${API_BASE}/api/admin/login`,
  adminVerify: `${API_BASE}/api/admin/verify`,
  adminChangePassword: `${API_BASE}/api/admin/change-password`,
  adminLogout: `${API_BASE}/api/admin/logout`,
};
