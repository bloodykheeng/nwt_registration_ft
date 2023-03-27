import AxiosApi from "services/api/AxiosApi";

export async function getAllInvoiceAddress() {
  const response = await AxiosApi.get("/InvoiceAddress");
  return response;
}

export async function getInvoiceAddressById(id) {
  const response = await AxiosApi.get("/InvoiceAddress/" + id);
  return response;
}

export async function addInvoiceAddress(data) {
  const response = AxiosApi.post("/InvoiceAddress", data);
  return response;
}

export async function updateInvoiceAddress(id, data) {
  const response = AxiosApi.put("/InvoiceAddress/" + id, data);
  return response;
}

export async function deleteInvoiceAddress(id) {
  const response = AxiosApi.delete("/InvoiceAddress", +id);
  return response;
}