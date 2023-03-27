import AxiosApi from "services/api/AxiosApi";

export async function getAllAdmin() {
  const response = await AxiosApi.get("/api/admin");
  return response;
}

export async function getAdminById(id) {
  const response = await AxiosApi.get("/api/admin/" + id);
  return response;
}

export async function addAdmin(data) {
  const response = AxiosApi.post("/api/admin", data);
  return response;
}

export async function updateAdmin(id, data) {
  const response = AxiosApi.put("/api/admin/" + id, data);
  return response;
}

export async function deleteAdmin(id) {
  const response = AxiosApi.delete("/api/admin/" + id);
  return response;
}
