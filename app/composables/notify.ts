export const useNotify = () => {
  const toast = useToast();
   const { $i18n } = useNuxtApp();

  const base = {
    title: $i18n.t("notify"),
    duration: 3000,
  };

  return {
    error: (description: string) =>
      toast.add({
        ...base,
        description,
        icon: "i-heroicons-x-circle",
        color: "error",
      }),

    success: (description: string) =>
      toast.add({
        ...base,
        description,
        icon: "i-heroicons-check-circle",
        color: "success",
      }),

    warning: (description: string) =>
      toast.add({
        ...base,
        description,
        icon: "i-heroicons-exclamation-triangle",
        color: "warning",
      }),

    info: (description: string) =>
      toast.add({
        ...base,
        description,
        icon: "i-heroicons-information-circle",
        color: "info",
      }),
  };
};
