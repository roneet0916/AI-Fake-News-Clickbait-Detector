const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function apiRequest<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      let errorMsg = `Request failed with status ${response.status}`;
      try {
        const errorJson = await response.json();
        errorMsg = errorJson.detail || errorJson.message || errorMsg;
      } catch {
        // Fallback to generic status text
      }
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (err: any) {
    if (err.message.includes("Failed to fetch") || err.name === "TypeError") {
      throw new Error("Unable to connect to AI NewsGuard Backend API. Please verify backend is running on http://localhost:8000.");
    }
    throw err;
  }
}

export const api = {
  health: () => apiRequest("/api/health"),
  analyze: (data: { title: string; text: string; category?: string }) =>
    apiRequest("/api/analyze", { method: "POST", body: JSON.stringify(data) }),
  getHistory: (limit?: number, offset?: number, query?: string) => {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (offset) params.append("offset", offset.toString());
    if (query) params.append("query", query);
    const q = params.toString() ? `?${params.toString()}` : "";
    return apiRequest(`/api/history${q}`);
  },
  getHistoryById: (id: number) => apiRequest(`/api/history/${id}`),
  deleteHistory: (id: number) => apiRequest(`/api/history/${id}`, { method: "DELETE" }),
  getModels: () => apiRequest("/api/models"),
  getEvaluation: () => apiRequest("/api/evaluation"),
};

export default api;
