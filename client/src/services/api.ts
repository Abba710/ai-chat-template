import { saveToken } from "./securestore";

// base URL
const API_URL = process.env.API_URL || "http://192.168.12.76:3000";

// Function for requests with error processing and timeouts
const request = async (endpoint: string, options: RequestInit = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // timeout 10s

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw { status: response.status, ...errorData };
    }

    return response.json();
  } catch (error: any) {
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const googleAuth = async (accessToken: string) => {
  try {
    const response = await request("/auth/google", {
      method: "POST",
      body: JSON.stringify({ accessToken }),
    });

    if (response.token) {
      await saveToken(response.token);
    }

    console.log("User Data:", response);
  } catch (error) {
    console.error("auth error", error);
  }
};
