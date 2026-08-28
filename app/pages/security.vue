<template>
  <div>
    <LayoutPublicHeader
      :title="t('securityCenter')"
      icon="i-heroicons-shield-check"
    />

    <div class="px-2 pb-4 pt-[65px]">
      <div
        class="overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_6px_22px_rgba(15,23,42,0.05)]"
      >
        <div
          class="flex items-center justify-between border-b border-slate-100 px-4 py-3.5"
        >
          <div>
            <h2 class="text-[15px] font-bold text-slate-900">
              {{ t("accountManagement") }}
            </h2>

            <p class="mt-0.5 text-[11px] text-slate-400">
              Security & account protection
            </p>
          </div>

          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50"
          >
            <UIcon
              name="i-heroicons-shield-check"
              class="h-5 w-5 text-[#145DA0]"
            />
          </div>
        </div>

        <div class="divide-y divide-slate-100">
          <button
            type="button"
            @click="openChangePassword('login')"
            class="group flex w-full items-center gap-3 px-4 py-3.5 text-left transition active:bg-slate-50"
          >
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50"
            >
              <UIcon
                name="i-heroicons-lock-closed"
                class="h-5 w-5 text-[#145DA0]"
              />
            </div>

            <div class="min-w-0 flex-1">
              <p class="truncate text-[14px] font-bold text-slate-900">
                {{ t("changeLoginPassword") }}
              </p>

              <p class="mt-1 truncate text-[12px] leading-4 text-slate-400">
                {{ t("updatePasswordToProtectAccount") }}
              </p>
            </div>

            <UIcon
              name="i-heroicons-chevron-right"
              class="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5"
            />
          </button>

          <button
            type="button"
            @click="handleWithdrawPassword"
            class="group flex w-full items-center gap-3 px-4 py-3.5 text-left transition active:bg-slate-50"
          >
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50"
            >
              <UIcon
                name="i-heroicons-shield-check"
                class="h-5 w-5 text-emerald-600"
              />
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <p class="truncate text-[14px] font-bold text-slate-900">
                  {{ t("withdrawPassword") }}
                </p>

                <span
                  class="rounded-md px-1.5 py-0.5 text-[9px] font-bold"
                  :class="
                    hasWithdrawPassword
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-orange-50 text-orange-500'
                  "
                >
                  {{ hasWithdrawPassword ? t("configured") : t("noYetSetup") }}
                </span>
              </div>

              <p class="mt-1 truncate text-[12px] leading-4 text-slate-400">
                {{ t("setupSecurityWhenWithdrawing") }}
              </p>
            </div>

            <UIcon
              name="i-heroicons-chevron-right"
              class="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </div>

    <UModal
      v-model:open="showCreatePasswordModal"
      :ui="{
        content:
          'w-[calc(100%-24px)] max-w-[400px] overflow-hidden rounded-[28px]',
      }"
    >
      <template #content>
        <div class="bg-white">
          <div
            class="flex items-center justify-between border-b border-slate-100 px-5 py-4"
          >
            <div>
              <h3 class="text-[17px] font-bold text-slate-900">
                {{ t("createPassword") }}
              </h3>

              <p class="mt-0.5 text-[11px] text-slate-400">
                {{ t("setupWithdrawPassword") }}
              </p>
            </div>

            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition hover:bg-slate-100"
              @click="showCreatePasswordModal = false"
            >
              <UIcon name="i-heroicons-x-mark" class="h-5 w-5" />
            </button>
          </div>

          <div class="space-y-4 p-4">
            <div class="space-y-1.5">
              <label class="text-[12px] font-semibold text-slate-700">
                {{ t("password") }}
              </label>

              <div class="relative mt-1">
                <input
                  v-model="createForm.password"
                  :type="showCreatePassword ? 'text' : 'password'"
                  placeholder=""
                  autocomplete="new-password"
                  class="h-11 w-full rounded-full border border-slate-200 bg-[#F7F9FC] pl-4 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#145DA0] focus:bg-white focus:ring-4 focus:ring-[#EAF3FB]"
                />

                <button
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#145DA0]"
                  @click="showCreatePassword = !showCreatePassword"
                >
                  <UIcon
                    :name="
                      showCreatePassword
                        ? 'i-heroicons-eye-slash'
                        : 'i-heroicons-eye'
                    "
                    class="h-5 w-5"
                  />
                </button>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-[12px] font-semibold text-slate-700">
                {{ t("confirmPassword") }}
              </label>

              <div class="relative mt-1">
                <input
                  v-model="createForm.confirmPassword"
                  :type="showCreateConfirmPassword ? 'text' : 'password'"
                  placeholder=""
                  autocomplete="new-password"
                  class="h-11 w-full rounded-full border border-slate-200 bg-[#F7F9FC] pl-4 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#145DA0] focus:bg-white focus:ring-4 focus:ring-[#EAF3FB]"
                />

                <button
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#145DA0]"
                  @click="
                    showCreateConfirmPassword = !showCreateConfirmPassword
                  "
                >
                  <UIcon
                    :name="
                      showCreateConfirmPassword
                        ? 'i-heroicons-eye-slash'
                        : 'i-heroicons-eye'
                    "
                    class="h-5 w-5"
                  />
                </button>
              </div>
            </div>

            <UButton
              block
              size="lg"
              class="h-12 rounded-full bg-[#145DA0] text-[13px] font-bold text-white shadow-[0_6px_18px_rgba(20,93,160,0.22)] hover:bg-[#104D88]"
              :loading="isSubmitting"
              @click="submitCreatePassword"
            >
              <span class="flex items-center justify-center gap-2">
                <UIcon name="i-heroicons-lock-closed" class="h-4 w-4" />
                {{ t("createPassword") }}
              </span>
            </UButton>
          </div>
        </div>
      </template>
    </UModal>

    <UModal
      v-model:open="showChangePasswordModal"
      :ui="{
        content:
          'w-[calc(100%-24px)] max-w-[400px] overflow-hidden rounded-[28px]',
      }"
    >
      <template #content>
        <div class="bg-white">
          <div
            class="flex items-center justify-between border-b border-slate-100 p-4"
          >
            <div>
              <h3 class="text-[17px] font-bold text-slate-900">
                {{ t("changeLoginPassword") }}
              </h3>

              <p class="mt-0.5 text-[11px] text-slate-400">
                {{ t("updatePasswordToProtectAccount") }}
              </p>
            </div>

            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition hover:bg-slate-100"
              @click="showChangePasswordModal = false"
            >
              <UIcon name="i-heroicons-x-mark" class="h-5 w-5" />
            </button>
          </div>

          <div class="space-y-2 p-4">
            <div class="space-y-2">
              <label class="text-[12px] font-semibold text-slate-700">
                {{ t("currentPassword") }}
              </label>

              <div class="relative mt-1">
                <input
                  v-model="changeForm.currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  placeholder=""
                  autocomplete="current-password"
                  class="h-11 w-full rounded-full border border-slate-200 bg-[#F7F9FC] pl-4 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#145DA0] focus:bg-white focus:ring-4 focus:ring-[#EAF3FB]"
                />

                <button
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#145DA0]"
                  @click="showCurrentPassword = !showCurrentPassword"
                >
                  <UIcon
                    :name="
                      showCurrentPassword
                        ? 'i-heroicons-eye-slash'
                        : 'i-heroicons-eye'
                    "
                    class="h-5 w-5"
                  />
                </button>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-[12px] font-semibold text-slate-700">
                {{ t("newPassword") }}
              </label>

              <div class="relative mt-1">
                <input
                  v-model="changeForm.password"
                  :type="showNewPassword ? 'text' : 'password'"
                  placeholder=""
                  autocomplete="new-password"
                  class="h-11 w-full rounded-full border border-slate-200 bg-[#F7F9FC] pl-4 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#145DA0] focus:bg-white focus:ring-4 focus:ring-[#EAF3FB]"
                />

                <button
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#145DA0]"
                  @click="showNewPassword = !showNewPassword"
                >
                  <UIcon
                    :name="
                      showNewPassword
                        ? 'i-heroicons-eye-slash'
                        : 'i-heroicons-eye'
                    "
                    class="h-5 w-5"
                  />
                </button>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-[12px] font-semibold text-slate-700">
                {{ t("confirnNewPassword") }}
              </label>

              <div class="relative mt-1">
                <input
                  v-model="changeForm.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder=""
                  autocomplete="new-password"
                  class="h-11 w-full rounded-full border border-slate-200 bg-[#F7F9FC] pl-4 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#145DA0] focus:bg-white focus:ring-4 focus:ring-[#EAF3FB]"
                />

                <button
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#145DA0]"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <UIcon
                    :name="
                      showConfirmPassword
                        ? 'i-heroicons-eye-slash'
                        : 'i-heroicons-eye'
                    "
                    class="h-5 w-5"
                  />
                </button>
              </div>
            </div>

            <UButton
              block
              size="lg"
              class="h-11 mt-2 rounded-full bg-[#145DA0] text-[13px] font-bold text-white shadow-[0_6px_18px_rgba(20,93,160,0.22)] hover:bg-[#104D88]"
              :loading="isSubmitting"
              @click="submitChangePassword"
            >
              <span class="flex items-center justify-center gap-2">
                {{ t("update") }}
              </span>
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
    <UModal
      v-model:open="showWithdrawPasswordModal"
      :ui="{
        content:
          'w-[calc(100%-24px)] max-w-[400px] overflow-hidden rounded-[28px]',
      }"
    >
      <template #content>
        <div class="bg-white">
          <div
            class="flex items-center justify-between border-b border-slate-100 px-5 py-4"
          >
            <div>
              <h3 class="text-[17px] font-bold text-slate-900">
                {{ t("withdrawPassword") }}
              </h3>

              <p class="mt-0.5 text-[11px] text-slate-400">
                {{
                  isWithdrawPasswordVerified
                    ? t("securityInformation")
                    : t("authToWiewThePassword")
                }}
              </p>
            </div>

            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition hover:bg-slate-100"
              @click="showWithdrawPasswordModal = false"
            >
              <UIcon name="i-heroicons-x-mark" class="h-5 w-5" />
            </button>
          </div>

          <div class="space-y-4 px-5 pb-5 pt-3">
            <template v-if="!isWithdrawPasswordVerified">
              <div class="space-y-2">
                <label class="text-[12px] font-semibold text-slate-700">
                  {{ t("loginPassword") }}
                </label>

                <div class="relative mt-2">
                  <input
                    v-model="showPasswordForm.currentPassword"
                    :type="showVerifyPassword ? 'text' : 'password'"
                    placeholder=""
                    autocomplete="current-password"
                    class="h-11 w-full rounded-full border border-slate-200 bg-[#F7F9FC] pl-4 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#145DA0] focus:bg-white focus:ring-4 focus:ring-[#EAF3FB]"
                  />

                  <button
                    type="button"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#145DA0]"
                    @click="showVerifyPassword = !showVerifyPassword"
                  >
                    <UIcon
                      :name="
                        showVerifyPassword
                          ? 'i-heroicons-eye-slash'
                          : 'i-heroicons-eye'
                      "
                      class="h-5 w-5"
                    />
                  </button>
                </div>
              </div>

              <UButton
                block
                size="lg"
                class="h-12 rounded-full bg-[#145DA0] text-[13px] font-bold text-white shadow-[0_6px_18px_rgba(20,93,160,0.22)] hover:bg-[#104D88]"
                :loading="isVerifyingPassword"
                @click="verifyWithdrawPassword"
              >
                {{ t("confirm") }}
              </UButton>
            </template>

            <template v-else>
              <div
                class="rounded-2xl border border-emerald-100 bg-emerald-50 p-4"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white"
                  >
                    <UIcon
                      name="i-heroicons-check-circle"
                      class="h-5 w-5 text-emerald-500"
                    />
                  </div>

                  <div>
                    <p class="text-[12px] font-semibold text-emerald-700">
                      {{ t("authSuccessfull") }}
                    </p>

                    <p class="mt-0.5 text-[10px] text-emerald-600">
                      {{ t("yourWithdrawPassword") }}
                    </p>
                  </div>
                </div>

                <div class="relative mt-4">
                  <input
                    :value="withdrawPassword"
                    :type="showWithdrawPassword ? 'text' : 'password'"
                    readonly
                    class="h-11 w-full rounded-full border border-emerald-200 bg-white px-4 pr-11 text-center text-[16px] font-bold tracking-[4px] text-slate-900 outline-none"
                  />

                  <button
                    type="button"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#145DA0]"
                    @click="showWithdrawPassword = !showWithdrawPassword"
                  >
                    <UIcon
                      :name="
                        showWithdrawPassword
                          ? 'i-heroicons-eye-slash'
                          : 'i-heroicons-eye'
                      "
                      class="h-5 w-5"
                    />
                  </button>
                </div>
              </div>

              <UButton
                block
                size="lg"
                class="h-12 rounded-full bg-[#145DA0] text-[13px] font-bold text-white hover:bg-[#104D88]"
                @click="showWithdrawPasswordModal = false"
              >
                {{ t("cancel") }}
              </UButton>
            </template>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup>
const { t } = useI18n();
const authStore = useAuthStore();

const showCreatePasswordModal = ref(false);
const showChangePasswordModal = ref(false);
const showWithdrawPasswordModal = ref(false);
const isWithdrawPasswordVerified = ref(false);
const showVerifyPassword = ref(false);
const isVerifyingPassword = ref(false);
const showWithdrawPassword = ref(false);
const withdrawPassword = ref("");
const selectedPasswordType = ref(null);
const hasWithdrawPassword = computed(
  () => authStore.profile?.withdrawStatus === 1,
);
const isSubmitting = ref(false);
const showCreatePassword = ref(false);
const showCreateConfirmPassword = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const createForm = reactive({
  password: "",
  confirmPassword: "",
});

const changeForm = reactive({
  currentPassword: "",
  password: "",
  confirmPassword: "",
});
const showPasswordForm = reactive({
  currentPassword: "",
});

const openCreatePassword = () => {
  selectedPasswordType.value = "withdraw";
  showCreatePasswordModal.value = true;
};

const openChangePassword = (type) => {
  selectedPasswordType.value = type;
  showChangePasswordModal.value = true;
};

const handleWithdrawPassword = () => {
  if (hasWithdrawPassword.value) return openWithdrawPassword();
  openCreatePassword();
};

const openWithdrawPassword = () => {
  showPasswordForm.currentPassword = "";
  withdrawPassword.value = "";
  showVerifyPassword.value = false;
  showWithdrawPassword.value = false;
  isWithdrawPasswordVerified.value = false;
  showWithdrawPasswordModal.value = true;
};

const verifyWithdrawPassword = async () => {
  try {
    isVerifyingPassword.value = true;
    const res = await useAPI(
      "auth/public/update/password-verify",
      JSON.parse(JSON.stringify(showPasswordForm)),
    );
    withdrawPassword.value = res;
    isWithdrawPasswordVerified.value = true;
  } finally {
    isVerifyingPassword.value = false;
  }
};
const submitCreatePassword = async () => {
  try {
    isSubmitting.value = true;
    await useAPI(
      "auth/public/update/password-withdraw",
      JSON.parse(JSON.stringify(createForm)),
    );
    hasWithdrawPassword.value = true;
    showCreatePasswordModal.value = false;
  } finally {
    isSubmitting.value = false;
  }
};

const submitChangePassword = async () => {
  try {
    isSubmitting.value = true;
    await useAPI(
      "auth/public/update/password",
      JSON.parse(JSON.stringify(changeForm)),
    );
    showChangePasswordModal.value = false;
  } finally {
    isSubmitting.value = false;
  }
};
</script>
