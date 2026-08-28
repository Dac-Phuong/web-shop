<script setup>
definePageMeta({
  layout: "auth",
});
const { t, locale, setLocale } = useI18n();
const loading = ref(false);
const isOpen = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const languages = [
  { value: "vi", label: "VN", icon: "circle-flags:vn" },
  { value: "en", label: "EN", icon: "circle-flags:us" },
  { value: "zh", label: "中文", icon: "circle-flags:cn" },
  { value: "ko", label: "한국", icon: "circle-flags:kr" },
  { value: "de", label: "DE", icon: "circle-flags:de" },
  { value: "ja", label: "日本", icon: "circle-flags:jp" },
  { value: "fr", label: "FR", icon: "circle-flags:fr" },
];

const currentLang = computed(() =>
  languages.find((l) => l.value === locale.value),
);

const setLang = async (value) => {
  await setLocale(value);
  isOpen.value = false;
};
const state = reactive({
  country: "+84",
  phone: "",
  username: "",
  password: "",
  confirmPassword: "",
  referralCode: "",
});

const countries = [
  { label: "+84 (VN)", value: "+84" },
  { label: "+1 (US)", value: "+1" },
  { label: "+44 (GB)", value: "+44" },
  { label: "+86 (CN)", value: "+86" },
  { label: "+81 (JP)", value: "+81" },
  { label: "+82 (KR)", value: "+82" },
  { label: "+33 (FR)", value: "+33" },
  { label: "+49 (DE)", value: "+49" },
  { label: "+39 (IT)", value: "+39" },
  { label: "+7 (RU)", value: "+7" },
  { label: "+61 (AU)", value: "+61" },
  { label: "+1 (CA)", value: "+1" },
  { label: "+65 (SG)", value: "+65" },
  { label: "+66 (TH)", value: "+66" },
  { label: "+60 (MY)", value: "+60" },
  { label: "+62 (ID)", value: "+62" },
  { label: "+63 (PH)", value: "+63" },
  { label: "+91 (IN)", value: "+91" },
  { label: "+55 (BR)", value: "+55" },
  { label: "+52 (MX)", value: "+52" },
  { label: "+34 (ES)", value: "+34" },
  { label: "+41 (CH)", value: "+41" },
  { label: "+852 (HK)", value: "+852" },
  { label: "+886 (TW)", value: "+886" },
];

const onSubmit = async () => {
  try {
    loading.value = true;
    await useAPI("auth/public/sign/up", JSON.parse(JSON.stringify(state)));
    await navigateTo("/profile");
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="min-h-screen bg-white">
    <div class="relative mx-auto min-h-screen max-w-xl px-4 p-5">
      <!-- TOP BAR -->
      <div class="relative flex items-center justify-between">
        <!-- BACK -->
        <NuxtLink
          to="/login"
          class="flex h-10 items-center justify-center "
        >
          <UIcon name="weui:back-filled" class="h-5 w-5" />
        </NuxtLink>

        <!-- LANGUAGE -->
        <div class="relative">
           <button
          @click="isOpen = true"
          class="flex min-w-[78px] items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#0F2742] active:scale-95"
        >
          <UIcon :name="currentLang?.icon" class="h-4 w-4 shrink-0" />
          <span>{{ currentLang?.label }}</span>
          <UIcon name="i-heroicons-chevron-down" class="h-4 w-4 shrink-0" />
        </button>

        <!-- LANGUAGE MODAL -->
        <Transition name="modal">
          <div v-if="isOpen" class="fixed inset-0 z-[9999]">
            <!-- BACKDROP -->
            <div
              class="absolute inset-0 bg-slate-950/50 backdrop-blur-[3px]"
              @click="isOpen = false"
            ></div>

            <!-- BOTTOM SHEET -->
            <div
              class="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-xl overflow-hidden rounded-t-[28px] bg-white shadow-[0_-15px_50px_rgba(15,23,42,0.2)]"
            >
              <!-- HANDLE -->
              <div class="flex justify-center pt-3">
                <div class="h-1.5 w-10 rounded-full bg-slate-200"></div>
              </div>

              <!-- HEADER -->
              <div class="flex items-center justify-between px-5 pb-4 pt-3">
                <div>
                  <h3 class="text-[17px] font-bold text-slate-900">
                    {{ $t("language") }}
                  </h3>

                  <p class="mt-0.5 text-xs text-slate-400">
                    {{ $t("selectLanguage") }}
                  </p>
                </div>

                <button
                  @click="isOpen = false"
                  class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition active:scale-90"
                >
                  <UIcon name="i-heroicons-x-mark" class="h-5 w-5" />
                </button>
              </div>

              <!-- LANGUAGES -->
              <div class="space-y-2 px-4 pb-6">
                <button
                  v-for="lang in languages"
                  :key="lang.value"
                  @click="
                    setLang(lang.value);
                    isOpen = false;
                  "
                  class="flex w-full items-center gap-3 rounded-2xl border px-2 py-2 text-left transition-all active:scale-[0.98]"
                  :class="
                    locale === lang.value
                      ? 'border-[#145DA0]/20 bg-[#145DA0]/10 text-[#145DA0]'
                      : 'border-slate-100 bg-slate-50 text-slate-700'
                  "
                >
                  <!-- ICON -->
                  <div
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                    :class="
                      locale === lang.value ? 'bg-[#145DA0]/10' : 'bg-white'
                    "
                  >
                    <UIcon :name="lang.icon" class="h-5 w-5" />
                  </div>

                  <!-- LABEL -->
                  <div class="min-w-0 flex-1">
                    <p
                      class="text-sm font-semibold"
                      :class="
                        locale === lang.value
                          ? 'text-[#145DA0]'
                          : 'text-slate-700'
                      "
                    >
                      {{ lang.label }}
                    </p>
                  </div>

                  <!-- CHECK -->
                  <div
                    v-if="locale === lang.value"
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-[#145DA0]"
                  >
                    <UIcon
                      name="i-heroicons-check"
                      class="h-4 w-4 text-white"
                    />
                  </div>
                </button>
              </div>

              <!-- SAFE AREA -->
              <div class="h-[env(safe-area-inset-bottom)] bg-white"></div>
            </div>
          </div>
        </Transition>
        </div>
      </div>
      <!-- TITLE -->
      <div class="mt-7 text-center">
        <h1 class="text-[28px] font-extrabold tracking-tight text-[#0F2742]">
          {{ $t("registerForAccount") }}
        </h1>

        <p class="mt-1.5 text-[13px] text-slate-400">
          {{ $t("joinUsAndEnjoy") }}
        </p>
      </div>

      <!-- FORM -->
      <form class="mt-4 space-y-2" @submit.prevent="onSubmit">
        <!-- FULL NAME -->
        <div>
          <label class="mb-1.5 block text-[12px] font-semibold text-[#334155]">
            {{ $t("fullName") }}
          </label>

          <div
            class="relative rounded-full border border-[#DCE8F3] bg-white transition-all focus-within:border-[#145DA0] focus-within:ring-4 focus-within:ring-[#145DA0]/10"
          >
            <UIcon
              name="i-heroicons-user"
              class="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#145DA0]"
            />

            <input
              v-model="state.username"
              type="text"
              :placeholder="$t('fullNamePlaceholder')"
              class="h-11 w-full rounded-full bg-transparent pl-11 pr-4 text-sm text-[#0F2742] outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <!-- PHONE -->
        <div>
          <label class="mb-1.5 block text-[12px] font-semibold text-[#334155]">
            {{ $t("phone") }}
          </label>

          <div
            class="flex h-11 items-center rounded-full border border-[#DCE8F3] bg-white px-3 transition-all focus-within:border-[#145DA0] focus-within:ring-4 focus-within:ring-[#145DA0]/10"
          >
            <UIcon
              name="i-heroicons-phone"
              class="mr-2 h-4.5 w-4.5 shrink-0 text-[#145DA0]"
            />

            <select
              v-model="state.country"
              class="max-w-[85px] bg-transparent !text-sm font-semibold text-[#145DA0] outline-none"
            >
              <option
                v-for="c in countries"
                :key="c.value"
                :value="c.value"
              >
                {{ c.label }}
              </option>
            </select>

            <div class="mx-3 h-5 w-px bg-[#DCE8F3]" />

            <input
              v-model="state.phone"
              type="tel"
              :placeholder="$t('phonePlaceholder')"
              class="min-w-0 flex-1 bg-transparent text-sm text-[#0F2742] outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <!-- PASSWORD -->
        <div>
          <label class="mb-1.5 block text-[12px] font-semibold text-[#334155]">
            {{ $t("password") }}
          </label>

          <div
            class="relative rounded-full border border-[#DCE8F3] bg-white transition-all focus-within:border-[#145DA0] focus-within:ring-4 focus-within:ring-[#145DA0]/10"
          >
            <UIcon
              name="i-heroicons-lock-closed"
              class="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#145DA0]"
            />

            <input
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="$t('passwordPlaceholder')"
              class="h-11 w-full rounded-full bg-transparent pl-11 pr-11 text-sm text-[#0F2742] outline-none placeholder:text-slate-400"
            />

            <button
              type="button"
              class="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#EAF3FB] hover:text-[#145DA0]"
              @click="showPassword = !showPassword"
            >
              <UIcon
                :name="
                  showPassword
                    ? 'i-heroicons-eye-slash'
                    : 'i-heroicons-eye'
                "
                class="h-4 w-4"
              />
            </button>
          </div>
        </div>

        <!-- CONFIRM PASSWORD -->
        <div>
          <label class="mb-1.5 block text-[12px] font-semibold text-[#334155]">
            {{ $t("confirmPassword") }}
          </label>

          <div
            class="relative rounded-full border border-[#DCE8F3] bg-white transition-all focus-within:border-[#145DA0] focus-within:ring-4 focus-within:ring-[#145DA0]/10"
          >
            <UIcon
              name="i-heroicons-shield-check"
              class="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#145DA0]"
            />

            <input
              v-model="state.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              :placeholder="$t('confirmPasswordPlaceholder')"
              class="h-11 w-full rounded-full bg-transparent pl-11 pr-11 text-sm text-[#0F2742] outline-none placeholder:text-slate-400"
            />

            <button
              type="button"
              class="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#EAF3FB] hover:text-[#145DA0]"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <UIcon
                :name="
                  showConfirmPassword
                    ? 'i-heroicons-eye-slash'
                    : 'i-heroicons-eye'
                "
                class="h-4 w-4"
              />
            </button>
          </div>
        </div>

        <!-- REFERRAL -->
        <div>
          <label class="mb-1.5 block text-[12px] font-semibold text-[#334155]">
            {{ $t("referralCode") }}
          </label>

          <div
            class="relative rounded-full border border-[#DCE8F3] bg-white transition-all focus-within:border-[#145DA0] focus-within:ring-4 focus-within:ring-[#145DA0]/10"
          >
            <UIcon
              name="i-heroicons-ticket"
              class="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#145DA0]"
            />

            <input
              v-model="state.referralCode"
              type="text"
              :placeholder="$t('referralCodePlaceholder')"
              class="h-11 w-full rounded-full bg-transparent pl-11 pr-4 text-sm text-[#0F2742] outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <!-- SUBMIT -->
        <button
          type="submit"
          :disabled="loading"
          class="mt-6 flex h-13 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#0B2B5C] via-[#145DA0] to-[#1B8FE5] text-sm font-bold text-white shadow-[0_12px_28px_rgba(20,93,160,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(20,93,160,0.32)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <UIcon
            v-if="loading"
            name="i-svg-spinners-ring-resize"
            class="mr-2 h-5 w-5"
          />

          {{ loading ? $t("processing") : $t("createAccount") }}
        </button>

      
        <!-- LOGIN -->
        <div class="pb-2 pt-4 text-center">
          <p class="text-[12px] text-slate-400">
            {{ $t("alreadyHaveAccount") }}

            <NuxtLink
              to="/auth/login"
              class="ml-1 font-bold text-[#145DA0] transition hover:text-[#0B2B5C]"
            >
              {{ $t("login") }}
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>