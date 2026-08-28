import type { IResp } from "~~/types";

export const useAPI = async (path: string, post?: any, options: any = {}) => {
  const { removeAuth } = useAuthStore();
  const { $i18n } = useNuxtApp();
  try {
    const headers = import.meta.server ? useRequestHeaders(["cookie"]) : {};

    const data = await $fetch<IResp>(`/api/${path}`, {
      method: post ? "POST" : "GET",
      body: post || undefined,
      credentials: "include",

      headers: {
        ...headers,
        ...options.headers,
      },

      ...options,
    });

    const { code, message, result, params } = data;

    if (message && import.meta.client) {
      const text = $i18n.t(message, params || {});
      console.log(params);
      

      if (code === 200) {
        useNotify().success(text);
      } else {
        useNotify().error(text);
      }
    }

    if (code === 200) {
      return result || null;
    }

    if (code === 401) {
      if (import.meta.client) {
        await removeAuth();
      }
      return Promise.reject(message);
    }

    return Promise.reject(message);
  } catch (error: any) {
    const statusCode = error?.statusCode || error?.response?.status || 500;
    const message = error?.data?.message || error?.message || "Lỗi API";
    if (import.meta.client) {
      showError({
        statusCode,
        statusMessage: message,
      });
    }
    return Promise.reject(message);
  }
};
