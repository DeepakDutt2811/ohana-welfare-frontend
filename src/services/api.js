const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export function submitContact(data) {
  return request("/api/contacts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function createDonationOrder(data) {
  return request("/api/donations/create-order", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function verifyDonationPayment(data) {
  return request("/api/donations/verify", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
