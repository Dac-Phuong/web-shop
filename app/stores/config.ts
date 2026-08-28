import { defineStore } from "pinia";
import type { IDBConfigStore } from "~~/types/model/config";

export const useConfigStore = defineStore("config", () => {
  const config: IDBConfigStore = reactive({
    name: "...",
    short_name: "...",
    description: "...",
    og_image: "",
    logo_image: "",
    logo_long_image: "",
    makeby: "",
  });

  const installPrompt: Ref<any> = ref();

  const setInstallPrompt = (data: any) => (installPrompt.value = data);

  const bootConfig = async () => {
    const cfg: IDBConfigStore = await useAPI("config/public/get");
    Object.assign(config, cfg);
  };
  return {
    config,
    bootConfig,
    installPrompt,
    setInstallPrompt,
  };
});
