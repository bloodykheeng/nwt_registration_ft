import AxiosApi from "services/api/AxiosApi";


export async function getAllServiceStates() {
  const response = await AxiosApi.get("/api/servicestate");
  return response;
}

export async function getServiceStatesById(id) {
  const response = await AxiosApi.get("/api/servicestate/" + id);
  return response;
}

export async function addServiceStates(data) {
  const response = AxiosApi.post("/api/servicestate", data);
  return response;
}

export async function updateServiceStates(id, data) {
  const response = AxiosApi.put("/api/servicestate/" + id, data);
  return response;
}

export async function deleteServiceStates(id) {
  const response = AxiosApi.delete("/api/servicestate/", +id);
  return response;
}