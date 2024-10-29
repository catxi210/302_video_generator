"use client";

import { env } from "@/env";
// import { emitter } from "@/lib/mitt";
import { useAppStore } from "@/stores";

import { langToCountry } from "./utils";

// Function to make API requests using native fetch
const apiFetch = async (
  endpoint: string,
  options?: RequestInit
): Promise<Response> => {
  const url = `${env.NEXT_PUBLIC_FETCH_API_URL}/${endpoint}`;

  // Get the apiKey and language from the application state
  const { apiKey, language } = useAppStore.getState();

  // Set up headers
  const headers = new Headers(options?.headers);
  if (apiKey) {
    headers.set("Authorization", `Bearer ${apiKey}`);
  }
  if (language) {
    headers.set("Lang", langToCountry(language));
  }

  // Make the fetch request
  const response = await fetch(url, {
    ...options,
    headers: headers,
  });

  // Handle HTTP errors
  // if (!response.ok) {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const res = (await response.json()) as any;

  //   if (res.error) {
  //     // Get the error message
  //     let message = res.error["message"]
  //     if (language && language !== "en") {
  //       message = res.error[`message_${langToCountry(language)}`]
  //     }
  //     emitter.emit("ToastError", message);
  //   }
  // }

  return response;
};

export { apiFetch };
