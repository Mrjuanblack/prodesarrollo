import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    credentials: 'include',
  },
});

// ISO date regex pattern
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;

// Recursively convert ISO date strings to Date objects
const parseDates = (data: unknown): unknown => {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'string' && ISO_DATE_REGEX.test(data)) {
    return new Date(data);
  }

  if (Array.isArray(data)) {
    return data.map(parseDates);
  }

  if (typeof data === 'object') {
    return Object.keys(data as Record<string, unknown>).reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = parseDates((data as Record<string, unknown>)[key]);
      return acc;
    }, {});
  }

  return data;
};

// Add response interceptor to automatically parse dates
apiClient.interceptors.response.use(
  (response) => {
    response.data = parseDates(response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient; 