import AxiosApi from "services/api/AxiosApi";

export async function getAllInvoices() {
  const response = await AxiosApi.get("/api/invoice");
  return response;
}

export async function getInvoicesById(id) {
  const response = await AxiosApi.get("/api/invoice/" + id);
  return response;
}

export async function addInvoices(data) {
  const response = AxiosApi.post("/api/invoice", data);
  return response;
}

export async function updateInvoices(id, data) {
  const response = AxiosApi.put("/api/invoice/" + id, data);
  return response;
}

export async function deleteInvoices(id) {
  const response = AxiosApi.delete("/api/invoice/" + id);
  return response;
}
