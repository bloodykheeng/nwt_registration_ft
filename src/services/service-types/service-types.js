import AxiosApi from "services/api/AxiosApi";

export async function getAllServiceTypes() {
  const response = await AxiosApi.get("/api/servicetype");
  return response;
}

export async function getServiceTypesById(id) {
  const response = await AxiosApi.get("/api/servicetype/" + id);
  return response;
}

export async function addServiceTypes(data) {
  const response = AxiosApi.post("/api/servicetype", data);
  return response;
}

export async function updateServiceTypes(id, data) {
  const response = AxiosApi.put("/api/servicetype/" + id, data);
  return response;
}

export async function deleteServiceTypes(id) {
  const response = AxiosApi.delete("/api/servicetype/" + id);
  return response;
}
