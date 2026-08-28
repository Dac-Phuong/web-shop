<script setup>
definePageMeta({
  layout: "auth",
});
const { t, locale, setLocale } = useI18n();
const authStore = useAuthStore();
const { $socket } = useNuxtApp();
const router = useRouter();

const handleUserApprove = async (data) => {
  if (data?.status == 2) {
    await authStore.setAuth();
    await router.push("/profile");
  } else {
    await router.push("/auth/login");
  }
};

onMounted(async () => {
  $socket.on("user-approve", handleUserApprove);
  if (authStore?.profile?.status === 2) {
    router.push("/profile");
  }
});

onUnmounted(() => {
  $socket.off("user-approve", handleUserApprove);
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <div
      class="relative mx-auto flex min-h-screen w-full max-w-xl flex-col px-4 pb-6 pt-5"
    >
  
      <div class="relative z-10 flex items-center justify-between">
        <!-- BACK -->
        <NuxtLink
          to="/withdraw"
          class="flex h-10  items-center justify-center "
        >
          <UIcon
            name="weui:back-filled"
            class="h-5 w-5"
          />
        </NuxtLink>

        
      </div>

      <main
        class="flex flex-1 items-start justify-center pt-4 sm:items-center sm:pt-4"
      >
        <div class="w-full">
          <!-- CARD -->
          <div
            class="overflow-hidden "
          >
            <div class="text-center">
              <!-- ICON -->
              <div
                class="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-[24px] border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm"
              >
                <div
                  class="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100"
                >
                  <UIcon
                    name="i-heroicons-clock"
                    class="h-7 w-7 text-amber-500"
                  />
                </div>
              </div>

              <!-- TITLE -->
              <h1
                class="mt-4 text-[21px] font-extrabold tracking-tight text-slate-900"
              >
                {{ $t("kycPending") }}
              </h1>

              <!-- DESCRIPTION -->
              <p
                class="mx-auto mt-2 max-w-[340px] text-[12px] leading-5 text-slate-500"
              >
                {{ $t("kycDescription") }}
              </p>

              <!-- STATUS -->
              <div
                class="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3.5 py-1.5 text-[11px] font-bold text-amber-600"
              >
                <span
                  class="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500"
                ></span>

                {{ $t("kycPending") }}
              </div>
            </div>

            <div
              class="mt-5 rounded-[20px] border border-slate-100 bg-[#F7F9FC] p-4"
            >
              <!-- INFO HEADER -->
              <div class="mb-3 flex items-center gap-2.5">
                <div
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FB]"
                >
                  <UIcon
                    name="i-heroicons-information-circle"
                    class="h-4 w-4 text-[#145DA0]"
                  />
                </div>

                <p
                  class="text-[12px] font-bold text-slate-800"
                >
                  KYC Information
                </p>
              </div>

              <!-- INFO LIST -->
              <div class="space-y-2.5">
                <div class="flex items-start gap-2.5">
                  <UIcon
                    name="i-heroicons-check-circle"
                    class="mt-0.5 h-4 w-4 shrink-0 text-[#145DA0]"
                  />

                  <p
                    class="text-[11px] leading-[17px] text-slate-500"
                  >
                    {{ $t("kycInfo1") }}
                  </p>
                </div>

                <div class="flex items-start gap-2.5">
                  <UIcon
                    name="i-heroicons-check-circle"
                    class="mt-0.5 h-4 w-4 shrink-0 text-[#145DA0]"
                  />

                  <p
                    class="text-[11px] leading-[17px] text-slate-500"
                  >
                    {{ $t("kycInfo2") }}
                  </p>
                </div>

                <div class="flex items-start gap-2.5">
                  <UIcon
                    name="i-heroicons-check-circle"
                    class="mt-0.5 h-4 w-4 shrink-0 text-[#145DA0]"
                  />

                  <p
                    class="text-[11px] leading-[17px] text-slate-500"
                  >
                    {{ $t("kycInfo3") }}
                  </p>
                </div>
              </div>
            </div>
            <div
              class="mt-3 flex items-center gap-3 rounded-[18px] border border-[#DCEAF7] bg-[#F2F8FD] p-3"
            >
              <!-- ICON -->
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm"
              >
                <UIcon
                  name="i-heroicons-shield-check"
                  class="h-5 w-5 text-[#145DA0]"
                />
              </div>

              <!-- CONTENT -->
              <div class="min-w-0">
                <p
                  class="text-[11px] font-bold text-[#145DA0]"
                >
                  Secure verification
                </p>

                <p
                  class="mt-0.5 text-[10px] leading-4 text-slate-500"
                >
                  Your verification information is securely processed.
                </p>
              </div>
            </div>
            <div class="mt-5">
              <!-- HOME -->
              <NuxtLink
                to="/"
                class="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0B2B5C] via-[#145DA0] to-[#1B8FE5] text-xs font-bold text-white shadow-[0_10px_25px_rgba(20,93,160,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(20,93,160,0.28)] active:translate-y-0 active:scale-[0.98]"
              >
                <UIcon
                  name="i-heroicons-home"
                  class="h-4 w-4"
                />

                {{ $t("backToHome") }}
              </NuxtLink>
            </div>
          </div>

          <p
            class="mt-4 text-center text-[10px] text-slate-400"
          >
            Your account verification is being reviewed securely.
          </p>
        </div>
      </main>
    </div>
  </div>
</template>