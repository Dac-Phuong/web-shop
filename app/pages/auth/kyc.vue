<script setup>
definePageMeta({
  layout: "auth",
});
const authStore = useAuthStore();
const loading = ref(false);
const { $socket } = useNuxtApp();
const state = reactive({
  front: null,
  back: null,
});

const frontPreview = ref("");
const backPreview = ref("");

const handleUpload = (e, type) => {
  const file = e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);

  if (type === "front") {
    state.front = file;
    frontPreview.value = url;
  } else {
    state.back = file;
    backPreview.value = url;
  }
};

const onSubmit = async () => {
  try {
    loading.value = true;
    const formData = new FormData();
    formData.append("front", state.front);
    formData.append("back", state.back);

    await useAPI("auth/public/sign/kyc", formData);
    console.log("PASS API");
    await nextTick();
    await navigateTo("/auth/pending");
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const logout = async () => {
  await authStore.removeAuth();
  await navigateTo("/auth/login");
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="relative mx-auto min-h-screen max-w-xl p-3">
      <!-- HEADER -->
      <div class="relative flex items-center justify-between">
        <!-- BACK -->
        <NuxtLink to="/withdraw" class="flex h-10 items-center justify-center">
          <UIcon name="weui:back-filled" class="h-5 w-5" />
        </NuxtLink>
       
      </div>
      <!-- CARD -->
      <div class="relative">
        <div
          class="rounded-[28px] "
        >
          <!-- TITLE -->
          <div class="mb-6 text-center">
            <h1
              class="mt-4 text-2xl font-bold uppercase tracking-[0.06em] text-slate-900"
            >
              {{ $t("kycTitle") }}
            </h1>

            <p class="mt-2 text-[12px] leading-5 text-slate-400">
              {{ $t("kycInstructions") }}
            </p>
          </div>

          <form class="space-y-5" @submit.prevent="onSubmit">
            <!-- FRONT -->
            <div>
              <div class="mb-2 flex items-center justify-between">
                <label
                  class="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-600"
                >
                  {{ $t("kycFront") }}
                </label>

                <span
                  class="flex items-center gap-1 rounded-lg bg-[#EEF6FD] px-2 py-1 text-[9px] font-bold text-[#145DA0]"
                >
                  <UIcon name="i-heroicons-credit-card" class="h-3 w-3" />
                  FRONT
                </span>
              </div>

              <label
                class="group relative flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#AFCDE5] bg-[#F7F9FC] transition-all duration-200 hover:border-[#145DA0] hover:bg-[#EEF6FD]"
              >
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="(e) => handleUpload(e, 'front')"
                />

                <!-- PREVIEW -->
                <UiImg
                  v-if="frontPreview"
                  :src="frontPreview"
                  class="h-full w-full object-cover"
                />

                <!-- EMPTY -->
                <div v-else class="text-center">
                  <div
                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF6FD] transition group-hover:scale-105"
                  >
                    <UIcon
                      name="i-heroicons-camera"
                      class="h-6 w-6 text-[#145DA0]"
                    />
                  </div>

                  <p class="mt-3 text-xs font-semibold text-slate-600">
                    {{ $t("kycFrontInstruction") }}
                  </p>

                  <p class="mt-1 text-[10px] text-slate-400">
                    JPG, PNG · Max 5MB
                  </p>
                </div>

                <!-- PREVIEW OVERLAY -->
                <div
                  v-if="frontPreview"
                  class="absolute inset-x-0 bottom-0 flex items-center justify-between bg-slate-900/65 px-3 py-2 backdrop-blur-sm"
                >
                  <span
                    class="flex items-center gap-1.5 text-[10px] font-semibold text-white"
                  >
                    <UIcon
                      name="i-heroicons-check-circle"
                      class="h-4 w-4 text-[#60A5FA]"
                    />
                    {{ $t("kycFront") }}
                  </span>

                  <span class="text-[10px] text-white/80"> Change </span>
                </div>
              </label>
            </div>

            <!-- BACK -->
            <div>
              <div class="mb-2 flex items-center justify-between">
                <label
                  class="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-600"
                >
                  {{ $t("kycBack") }}
                </label>

                <span
                  class="flex items-center gap-1 rounded-lg bg-[#EEF6FD] px-2 py-1 text-[9px] font-bold text-[#145DA0]"
                >
                  <UIcon name="i-heroicons-credit-card" class="h-3 w-3" />
                  BACK
                </span>
              </div>

              <label
                class="group relative flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#AFCDE5] bg-[#F7F9FC] transition-all duration-200 hover:border-[#145DA0] hover:bg-[#EEF6FD]"
              >
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="(e) => handleUpload(e, 'back')"
                />

                <!-- PREVIEW -->
                <UiImg
                  v-if="backPreview"
                  :src="backPreview"
                  class="h-full w-full object-cover"
                />

                <!-- EMPTY -->
                <div v-else class="text-center">
                  <div
                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF6FD] transition group-hover:scale-105"
                  >
                    <UIcon
                      name="i-heroicons-camera"
                      class="h-6 w-6 text-[#145DA0]"
                    />
                  </div>

                  <p class="mt-3 text-xs font-semibold text-slate-600">
                    {{ $t("kycBackInstruction") }}
                  </p>

                  <p class="mt-1 text-[10px] text-slate-400">
                    JPG, PNG · Max 5MB
                  </p>
                </div>

                <!-- PREVIEW OVERLAY -->
                <div
                  v-if="backPreview"
                  class="absolute inset-x-0 bottom-0 flex items-center justify-between bg-slate-900/65 px-3 py-2 backdrop-blur-sm"
                >
                  <span
                    class="flex items-center gap-1.5 text-[10px] font-semibold text-white"
                  >
                    <UIcon
                      name="i-heroicons-check-circle"
                      class="h-4 w-4 text-[#60A5FA]"
                    />
                    {{ $t("kycBack") }}
                  </span>

                  <span class="text-[10px] text-white/80"> Change </span>
                </div>
              </label>
            </div>

            <!-- SECURITY NOTE -->
            <div
              class="flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5"
            >
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE]"
              >
                <UIcon
                  name="i-heroicons-shield-check"
                  class="h-5 w-5 text-[#145DA0]"
                />
              </div>

              <div>
                <p class="text-xs font-bold text-[#145DA0]">
                  Secure verification
                </p>

                <p class="mt-0.5 text-[11px] leading-4 text-slate-500">
                  {{ $t("kycNote") }}
                </p>
              </div>
            </div>

            <!-- BUTTON -->
            <button
              type="submit"
              :disabled="loading"
              class="mt-6 flex h-12 w-full gap-2 items-center justify-center rounded-full bg-gradient-to-r from-[#0B2B5C] via-[#145DA0] to-[#1B8FE5] text-sm font-bold text-white shadow-[0_12px_28px_rgba(20,93,160,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(20,93,160,0.32)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <UIcon
                v-if="!loading"
                name="i-heroicons-cloud-arrow-up"
                class="h-5 w-5"
              />

              <UIcon
                v-else
                name="i-heroicons-arrow-path"
                class="h-5 w-5 animate-spin"
              />

              <span>
                {{ loading ? $t("kycSubmitting") : $t("kycSubmit") }}
              </span>
            </button>

            <!-- LOGOUT -->
            <!-- <button
              type="button"
              @click="logout"
              class="mx-auto flex items-center gap-1.5 pt-1 text-xs font-semibold text-slate-400 transition hover:text-[#145DA0]"
            >
              <UIcon
                name="i-heroicons-arrow-left-on-rectangle"
                class="h-4 w-4"
              />

              {{ $t("logout") }}
            </button> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
