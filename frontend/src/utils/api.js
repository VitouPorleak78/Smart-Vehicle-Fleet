const API_BASE_URL = 'http://localhost:5000/api/v1';

export const fetchAdminData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/${endpoint}`);
    if (!response.ok) throw new Error(`Network failure on /${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error(`Telemetry Fetch Exception [${endpoint}]:`, error);
    return { success: false, data: [] };
  }
};
