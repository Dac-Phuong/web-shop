<template>
  <UApp :toaster="{ position: 'top-right' }">
    <NuxtLayout>
      <NuxtLoadingIndicator :height="2" />
      <NuxtPage />
      <SocketInit />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const configStore = useConfigStore();
const mode = useColorMode();
const appConfig = useAppConfig();

// Meta Seo
useSeoMeta({
  title: () => configStore.config.name,
  ogTitle: () => configStore.config.name,
  description: () => configStore.config.description,
  ogDescription: () => configStore.config.description,
  ogImage: () =>
    new URL(
      configStore.config.og_image || "/images/null.webp",
      runtimeConfig.public.clientURL,
    ),
  ogImageAlt: () => configStore.config.name,
  ogType: "website",
});


</script>
