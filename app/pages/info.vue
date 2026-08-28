<template>
  <div class="min-h-screen bg-[#F5F8FC]">
    <!-- HEADER -->
    <LayoutPublicHeader :title="t('profile')" icon="i-heroicons-cog-6-tooth" />

    <div class="mx-auto min-h-screen w-full max-w-xl px-2 pb-8 pt-[65px]">
      <!-- PROFILE HERO -->
      <section
        class="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#031735] via-[#082F63] to-[#145DA0] p-5 text-white shadow-[0_18px_45px_rgba(20,93,160,0.20)]"
      >
        <!-- Decorative -->
        <div
          class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.06] blur-2xl"
        ></div>

        <div
          class="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-sky-300/[0.08] blur-3xl"
        ></div>

        <!-- TOP -->
        <div class="relative flex items-center gap-4">
          <!-- AVATAR -->
          <div class="relative shrink-0">
            <div
              class="flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-[24px] border-2 border-white/30 bg-white/10 p-0.5 shadow-lg"
            >
              <img
                src="/assets/img/user.jpg"
                alt="Avatar"
                class="h-full w-full rounded-[21px] object-cover"
              />
            </div>

            <!-- ONLINE -->
            <span
              class="absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-[#0A4A88] bg-emerald-400"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
            </span>
          </div>

          <!-- USER INFO -->
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5">
              <h2 class="truncate text-[19px] font-extrabold tracking-tight">
                {{ authStore.profile.username }}
              </h2>

              <UIcon
                name="i-heroicons-check-badge"
                class="h-[19px] w-[19px] shrink-0 text-sky-200"
              />
            </div>

            <p class="mt-1 truncate text-[11px] font-medium text-white/55">
              {{ authStore.profile.phone }}
            </p>

            <!-- VIP -->
            <div
              class="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-amber-200/20 bg-amber-300/10 px-2.5 py-1.5"
            >
              <span
                class="flex h-4 w-4 items-center justify-center rounded-full bg-amber-300/20"
              >
                <UIcon
                  name="i-heroicons-sparkles"
                  class="h-2.5 w-2.5 text-amber-300"
                />
              </span>

              <span
                class="text-[10px] font-extrabold tracking-wide text-amber-200"
              >
                VIP {{ authStore.profile.level }}
              </span>
            </div>
          </div>
        </div>

        <!-- BOTTOM STATS -->
        <div
          class="relative mt-3 grid grid-cols-3 divide-x divide-white/10 rounded-[18px] border border-white/10 bg-black/10 px-2 py-3"
        >
          <div class="text-center">
            <p class="text-[10px] font-medium text-white/45">
              {{ t("status") }}
            </p>
            <div class="mt-1 flex items-center justify-center gap-1">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span class="text-[12px] font-bold text-white">
                {{ t("active") }}
              </span>
            </div>
          </div>

          <div class="text-center">
            <p class="text-[10px] font-medium text-white/45">VIP</p>
            <p class="mt-1 text-[12px] font-bold text-amber-200">
              Level {{ authStore.profile.level }}
            </p>
          </div>

          <div class="text-center">
            <p class="text-[10px] font-medium text-white/45">
              {{ t("country") }}
            </p>
            <p class="mt-1 truncate px-1 text-[12px] font-bold text-white">
              {{ getCountryFromPhone(authStore.profile.phone) }}
            </p>
          </div>
        </div>
      </section>

      <section class="mt-2">
        <!-- TITLE -->
        <div class="mb-2 px-1">
          <div class="flex items-end justify-between gap-3">
            <div>
              <h2
                class="text-[16px] font-extrabold tracking-tight text-[#0F2742]"
              >
                {{ t("accountInformation") }}
              </h2>

              <p class="mt-1 text-[12px] leading-4 text-slate-400">
                {{ t("accountInformationDescription") }}
              </p>
            </div>

            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FB]"
            >
              <UIcon
                name="i-heroicons-user-circle"
                class="h-4 w-4 text-[#145DA0]"
              />
            </div>
          </div>
        </div>

        <!-- INFORMATION CARD -->
        <div
          class="overflow-hidden rounded-[24px] border border-slate-100 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
        >
          <!-- FULL NAME -->
          <div class="flex items-center gap-3 px-4 py-4">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#EAF3FB]"
            >
              <UIcon
                name="i-heroicons-user"
                class="h-[17px] w-[17px] text-[#145DA0]"
              />
            </div>

            <div class="min-w-0 flex-1">
              <p
                class="text-[10px] font-semibold uppercase tracking-wide text-slate-400"
              >
                {{ t("fullName") }}
              </p>

              <p
                class="mt-1 truncate text-[12px] font-extrabold text-slate-800"
              >
                {{ authStore.profile.username }}
              </p>
            </div>
          </div>

          <div class="mx-4 border-t border-slate-100"></div>

          <!-- PHONE -->
          <div class="flex items-center gap-3 px-4 py-4">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#EAF3FB]"
            >
              <UIcon
                name="i-heroicons-device-phone-mobile"
                class="h-[17px] w-[17px] text-[#145DA0]"
              />
            </div>

            <div class="min-w-0 flex-1">
              <p
                class="text-[10px] font-semibold uppercase tracking-wide text-slate-400"
              >
                {{ t("phone") }}
              </p>

              <p
                class="mt-1 truncate text-[12px] font-extrabold text-slate-800"
              >
                {{ authStore.profile.phone }}
              </p>
            </div>
          </div>

          <div class="mx-4 border-t border-slate-100"></div>

          <!-- VIP LEVEL -->
          <div class="flex items-center gap-3 px-4 py-4">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-amber-50"
            >
              <UIcon
                name="i-heroicons-sparkles"
                class="h-[17px] w-[17px] text-amber-500"
              />
            </div>

            <div class="min-w-0 flex-1">
              <p
                class="text-[10px] font-semibold uppercase tracking-wide text-slate-400"
              >
                {{ t("vipLevel") }}
              </p>

              <p class="mt-1 text-[12px] font-extrabold text-slate-800">
                VIP {{ authStore.profile.level }}
              </p>
            </div>

            <span
              class="rounded-full bg-amber-50 px-2.5 py-1.5 text-[8px] font-extrabold tracking-wide text-amber-600"
            >
              ACTIVE
            </span>
          </div>

          <div class="mx-4 border-t border-slate-100"></div>

          <!-- COUNTRY -->
          <div class="flex items-center gap-3 px-4 py-4">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#EAF3FB]"
            >
              <UIcon
                name="i-heroicons-globe-alt"
                class="h-[17px] w-[17px] text-[#145DA0]"
              />
            </div>

            <div class="min-w-0 flex-1">
              <p
                class="text-[10px] font-semibold uppercase tracking-wide text-slate-400"
              >
                {{ t("country") }}
              </p>

              <p
                class="mt-1 truncate text-[12px] font-extrabold text-slate-800"
              >
                {{ getCountryFromPhone(authStore.profile.phone) }}
              </p>
            </div>
          </div>
          <!-- KYC -->
          <div class="mx-4 border-t border-slate-100"></div>

          <div class="flex items-center gap-3 px-4 py-4">
            <!-- ICON -->
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px]"
              :class="kycStatus.iconBg"
            >
              <UIcon
                :name="kycStatus.icon"
                class="h-[17px] w-[17px]"
                :class="kycStatus.iconClass"
              />
            </div>

            <!-- CONTENT -->
            <div class="min-w-0 flex-1">
              <p
                class="text-[10px] font-semibold uppercase tracking-wide text-slate-400"
              >
                KYC
              </p>

              <p
                class="mt-1 truncate text-[12px] font-extrabold text-slate-800"
              >
                {{ kycStatus.title }}
              </p>
            </div>

            <!-- STATUS -->
            <span
              class="shrink-0 rounded-full px-2.5 py-1.5 text-[8px] font-extrabold tracking-wide"
              :class="kycStatus.badgeClass"
            >
              {{ kycStatus.badge }}
            </span>
          </div>
        </div>
      </section>
    
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore();

const { t } = useI18n();

const copied = ref(false);

const copyReferral = async (text) => {
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);

    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (error) {
    console.error("Copy referral failed:", error);
  }
};
const getCountryFromPhone = (phone) => {
  const countryCodes = {
    "+84": "Vietnam",
    "+1": "United States",
    "+44": "United Kingdom",
    "+81": "Japan",
    "+82": "South Korea",
    "+86": "China",
    "+49": "Germany",
    "+33": "France",
    "+39": "Italy",
    "+7": "Russia",
    "+91": "India",
    "+61": "Australia",
    "+65": "Singapore",
    "+66": "Thailand",
    "+60": "Malaysia",
    "+62": "Indonesia",
    "+63": "Philippines",
  };

  const value = phone.replace(/\s|-/g, "");

  // Ưu tiên mã dài trước
  const code = Object.keys(countryCodes)
    .sort((a, b) => b.length - a.length)
    .find((code) => value.startsWith(code));

  return code ? countryCodes[code] : "Unknown";
};

const kycStatus = computed(() => {
  const status = authStore.profile?.status;

  switch (status) {
    case 0:
      return {
        title: t("KYCnotYetVerified"),
        description: t("kycNotVerifiedDescription"),
        icon: "i-heroicons-shield-exclamation",
        iconClass: "text-amber-500",
        iconBg: "bg-amber-50",
        badgeClass: "bg-amber-50 text-amber-600",
        badge: t("notVerified"),
      };

    case 1:
      return {
        title: t("kycPending"),
        description: t("kycPendingDescription"),
        icon: "i-heroicons-clock",
        iconClass: "text-blue-500",
        iconBg: "bg-blue-50",
        badgeClass: "bg-blue-50 text-blue-600",
        badge: t("pending"),
      };

    case 2:
      return {
        title: t("kycVerified"),
        description: t("kycVerifiedDescription"),
        icon: "i-heroicons-shield-check",
        iconClass: "text-emerald-500",
        iconBg: "bg-emerald-50",
        badgeClass: "bg-emerald-50 text-emerald-600",
        badge: t("verified"),
      };

    default:
      return {
        title: t("KYCnotYetVerified"),
        description: t("kycNotVerifiedDescription"),
        icon: "i-heroicons-shield-exclamation",
        iconClass: "text-amber-500",
        iconBg: "bg-amber-50",
        badgeClass: "bg-amber-50 text-amber-600",
        badge: t("notVerified"),
      };
  }
});
</script>
