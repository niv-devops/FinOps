import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const getAwsCost = async () => {
  const response = await axios.get(`${API_BASE_URL}/cost/aws`);
  return response.data;
};

export const getGcpCost = async () => {
  const response = await axios.get(`${API_BASE_URL}/cost/gcp`);
  return response.data;
};
