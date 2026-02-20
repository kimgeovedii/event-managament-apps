import apiFetch from "@/services/apiFetch";

export const getOrganizerProfile = async (id: string) => {
  const response = await apiFetch.get(`/organizations/${id}`);
  return response.data;
};

export const updateOrganizerProfile = async (
  id: string,
  data: { name?: string; description?: string },
) => {
  const response = await apiFetch.patch(`/organizations/${id}`, data);
  return response.data;
};

export const deleteOrganizerProfile = async (id: string) => {
  const response = await apiFetch.delete(`/organizations/${id}`);
  return response.data;
};
