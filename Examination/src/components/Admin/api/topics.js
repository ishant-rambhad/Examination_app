import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchTopics = async () => {
  const response = await axios.get(`${baseUrl}/api/Admin/topics/`);
  return response.data;
};

export const createTopic = async (topicData) => {
  const response = await axios.post(`${baseUrl}/api/Admin/topics/create/`, topicData);
  return response.data;
};

export const updateTopic = async (topicId, updatedData) => {
  const response = await axios.put(`${baseUrl}/api/Admin/topics/update/${topicId}/`, updatedData);
  return response.data;
};

export const deleteTopic = async (topicId) => {
  await axios.delete(`${baseUrl}/api/Admin/topics/delete/${topicId}/`);
};
