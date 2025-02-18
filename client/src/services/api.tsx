// api/index.ts
import { useState } from "react";

// base URL
const API_URL = process.env.API_URL || "http://192.168.12.76:3000";

// Function for requests with error processing and timeouts
const request = async (endpoint: string, options: RequestInit = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // timeout 10min

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
  } catch (error) {
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const sendMessageToAI = async (text: string) => {
  try {
    // send message to server
    const response = await request("/ai", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    // return response
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
