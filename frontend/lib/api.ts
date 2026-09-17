import http from "http";
import { parse } from "url";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function apiRequest(path: string, options: RequestInit = {}): Promise<any> {
  const url = parse(`${API_BASE}${path}`);

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (res.statusCode >= 400) {
              reject(new Error(json.detail || json.message || `Request failed with status ${res.statusCode}`));
            } else {
              resolve(json);
            }
          } catch {
            reject(new Error("Invalid JSON response from server"));
          }
        });
      }
    );
    req.on("error", (err) => reject(new Error(`Network error: ${err.message}`)));
    if (options.body) {
      req.write(typeof options.body === "string" ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

const api = {
  health: () => apiRequest("/api/health"),
  analyze: (data: { title: string; text: string; category?: string }) =>
    apiRequest("/api/analyze", { method: "POST", body: JSON.stringify(data) }),
  getHistory: () => apiRequest("/api/history"),
  getHistoryById: (id: number) => apiRequest(`/api/history/${id}`),
  deleteHistory: (id: number) => apiRequest(`/api/history/${id}`, { method: "DELETE" }),
  getModels: () => apiRequest("/api/models"),
  getEvaluation: () => apiRequest("/api/evaluation"),
};

export default api;
