import AxiosApi from "services/api/AxiosApi";

export async function getAllInvoices() {
  const response = await AxiosApi.get("/Invoices");
  return response;
}

export async function getInvoicesById(id) {
  const response = await AxiosApi.get("/Invoices/" + id);
  return response;
}

export async function addInvoices(data) {
  const response = AxiosApi.post("/Invoices", data);
  return response;
}

export async function updateInvoices(id, data) {
  const response = AxiosApi.put("/Invoices/" + id, data);
  return response;
}

export async function deleteInvoices(id) {
  const response = AxiosApi.delete("/Invoices", +id);
  return response;
}
