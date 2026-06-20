/**
 * API utilities for backend communication
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const apiCall = async (
  endpoint,
  method = "GET",
  data = null,
  token = null
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
};

const getToken = () => localStorage.getItem("token");

export const auth = {
  register: (email, password) =>
    apiCall("/auth/register", "POST", { email, password }),

  login: (email, password) =>
    apiCall("/auth/login", "POST", { email, password }),

  getMe: (token) => apiCall("/auth/me", "GET", null, token || getToken()),
};

export const kyc = {
  submit: (data, token) =>
    apiCall("/kyc/submit", "POST", data, token || getToken()),

  getStatus: (token) => apiCall("/kyc/status", "GET", null, token || getToken()),

  getPending: (token) => apiCall("/kyc/admin/pending", "GET", null, token || getToken()),

  verify: (kycId, token) =>
    apiCall(`/kyc/admin/verify/${kycId}`, "POST", {}, token || getToken()),

  reject: (kycId, reason, token) =>
    apiCall(`/kyc/admin/reject/${kycId}`, "POST", { reason }, token || getToken()),
};

export const wallet = {
  link: (walletAddress, signature, message, token) =>
    apiCall("/wallet/link", "POST", { walletAddress, signature, message }, token || getToken()),

  getInfo: (token) => apiCall("/wallet/info", "GET", null, token || getToken()),

  getMessage: () => apiCall("/wallet/message", "GET"),
};

export const users = {
  getAll: (token) => apiCall("/users", "GET", null, token || getToken()),

  getById: (userId, token) => apiCall(`/users/${userId}`, "GET", null, token || getToken()),

  updateUser: (userId, data, token) =>
    apiCall(`/users/${userId}`, "PUT", data, token || getToken()),

  delete: (userId, token) => apiCall(`/users/${userId}`, "DELETE", null, token || getToken()),

  assignRole: (userId, role, token) =>
    apiCall(`/users/${userId}/role`, "POST", { role }, token || getToken()),
};

export const kycAdmin = {
  getAll: (token) => apiCall("/kyc-admin", "GET", null, token || getToken()),

  getById: (kycId, token) => apiCall(`/kyc-admin/${kycId}`, "GET", null, token || getToken()),

  updateRecord: (kycId, data, token) =>
    apiCall(`/kyc-admin/${kycId}`, "PUT", data, token || getToken()),

  deleteRecord: (kycId, token) =>
    apiCall(`/kyc-admin/${kycId}`, "DELETE", null, token || getToken()),

  verifyRecord: (kycId, token) =>
    apiCall(`/kyc/admin/verify/${kycId}`, "POST", {}, token || getToken()),
};
