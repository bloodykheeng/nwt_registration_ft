import AxiosApi from "services/api/AxiosApi";

export async function getAllInvoiceAddress() {
  const response = await AxiosApi.get("/api/invoiceaddress");
  return response;
}

export async function getInvoiceAddressById(id) {
  const response = await AxiosApi.get("/api/invoiceaddress/" + id);
  return response;
}

export async function addInvoiceAddress(data) {
  const response = AxiosApi.post("/api/invoiceaddress", data);
  return response;
}

export async function updateInvoiceAddress(id, data) {
  const response = AxiosApi.put("/api/invoiceaddress/" + id, data);
  return response;
}

export async function deleteInvoiceAddress(id) {
  const response = AxiosApi.delete("/api/invoiceaddress/" + id);
  return response;
}
