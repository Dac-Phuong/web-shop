<script setup>
definePageMeta({
  layout: "auth",
});

const authStore = useAuthStore();

const logout = async () => {
  await authStore.removeAuth();
  await navigateTo("/auth/login");
};
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="mx-auto max-w-xl">
      <!-- HEADER -->
      <div
        class="relative overflow-hidden bg-gradient-to-br h-[200px] from-[#1f1f1f] via-[#2a2a2a] to-[#111111] px-5 pt-10 pb-10 rounded-b-[38px]"
      >
        <div
          class="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-red-500/10 blur-3xl"
        />

        <div class="relative flex items-center justify-between">
          <NuxtLink
            to="/auth/kyc"
            class="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl active:scale-95 transition"
          >
            <UIcon name="i-heroicons-arrow-left" class="h-5 w-5 text-white" />
          </NuxtLink>

          <div class="text-center">
            <p class="text-xs text-slate-400">Verification status</p>
            <h1 class="mt-1 text-lg font-bold text-white tracking-[0.2em]">
              KYC STATUS
            </h1>
          </div>
        </div>
      </div>

      <!-- CARD -->
      <div class="px-4 -mt-16 relative">
        <div class="rounded-3xl bg-white p-6 shadow-2xl text-center">
          <!-- ICON -->
          <div
            class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100"
          >
            <UIcon name="i-heroicons-x-circle" class="h-10 w-10 text-red-500" />
          </div>

          <!-- TITLE -->
          <h1 class="mt-5 text-xl font-bold tracking-[0.2em] text-red-600">
            VERIFICATION REJECTED
          </h1>

          <p class="mt-2 text-xs text-gray-500 leading-relaxed">
            Your identity verification has been rejected.<br />
            Please review your information and try submitting again.
          </p>

          <!-- STATUS BADGE -->
          <div
            class="mt-5 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-600"
          >
            <span class="h-2 w-2 rounded-full bg-red-500"></span>
            REJECTED
          </div>

          <!-- INFO BOX -->
          <div
            class="mt-6 rounded-2xl bg-gray-50 p-4 text-left text-xs text-gray-500"
          >
            • Make sure your ID is clear and readable<br />
            • Avoid blurred or cropped images<br />
            • You can resubmit after updating information
          </div>

          <!-- BUTTON -->
          <NuxtLink
            to="/auth/kyc"
            class="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-red-600 text-xs font-bold tracking-[0.25em] text-white active:scale-[0.98]"
          >
            RESUBMIT KYC
          </NuxtLink>

          <button
            @click="logout()"
            class="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-2xl bg-black text-xs font-bold tracking-[0.25em] text-white active:scale-[0.98]"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
