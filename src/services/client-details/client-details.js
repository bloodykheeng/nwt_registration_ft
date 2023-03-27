import AxiosApi from "services/api/AxiosApi";

export async function getAllClientDetails() {
  const response = await AxiosApi.get("/api/client_details");
  return response;
}

export async function getClientDetailsById(id) {
  const response = await AxiosApi.get("/api/client_details/" + id);
  return response;
}

export async function addClientDetails(data) {
  const response = AxiosApi.post("/api/client_details", data);
  return response;
}

export async function updateClientDetails(id, data) {
  const response = AxiosApi.put("/api/client_details/" + id, data);
  return response;
}

export async function deleteClientDetails(id) {
  const response = AxiosApi.delete("/api/client_details/" + id);
  return response;
}
