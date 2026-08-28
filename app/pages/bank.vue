<template>
  <div>
    <LayoutPublicHeader
      :title="t('linkBank')"
      icon="i-heroicons-building-library"
    />

    <div class="px-2 pt-[65px] pb-4">
      <div class="space-y-2">
        <div
          class="relative isolate overflow-hidden rounded-[20px] bg-gradient-to-br from-[#031735] via-[#082F63] to-[#145DA0] p-4 text-white shadow-[0_12px_32px_rgba(3,23,53,0.28)]"
        >
          <div
            class="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full border-[20px] border-white/[0.04]"
          />

          <div
            class="pointer-events-none absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-[#1B8FE5]/15 blur-2xl"
          />

          <div
            class="pointer-events-none absolute right-16 bottom-5 h-16 w-16 rounded-full bg-white/[0.04] blur-xl"
          />

          <div class="relative">
            <div class="flex items-start justify-between gap-3">
              <div
                class="flex h-9 w-12 items-center justify-center overflow-hidden rounded-[7px] border border-yellow-200/30 bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 shadow-[0_3px_8px_rgba(0,0,0,0.15)]"
              >
                <div
                  class="grid h-6 w-8 grid-cols-2 grid-rows-2 overflow-hidden rounded-[3px] border border-yellow-700/30"
                >
                  <span class="border-b border-r border-yellow-700/30"></span>
                  <span class="border-b border-yellow-700/30"></span>
                  <span class="border-r border-yellow-700/30"></span>
                  <span></span>
                </div>
              </div>

              <div class="flex items-center gap-2.5">
                <div class="text-right">
                  <p
                    class="text-[9px] font-bold uppercase tracking-[1px] text-blue-200/60"
                  >
                    {{ t("bankName") }}
                  </p>

                  <p
                    class="mt-0.5 max-w-[160px] truncate text-[15px] font-black text-white"
                  >
                    {{ state.bankName || "YOUR BANK" }}
                  </p>
                </div>

                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 shadow-inner"
                >
                  <UIcon
                    name="i-heroicons-building-library"
                    class="h-5 w-5 text-white"
                  />
                </div>
              </div>
            </div>

            <div class="mt-5">
              <p
                class="mb-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-blue-200/60"
              >
                {{ t("accountNumber") }}
              </p>

              <p
                class="truncate font-mono text-[19px] font-bold tracking-[0.13em] text-white"
              >
                {{ state.accountNumber || "•••• •••• ••••" }}
              </p>
            </div>

            <div class="mt-5 flex items-end justify-between gap-3">
              <div class="min-w-0">
                <p
                  class="text-[9px] font-bold uppercase tracking-[0.16em] text-blue-200/60"
                >
                  {{ t("accountName") }}
                </p>

                <p
                  class="mt-1 max-w-[220px] truncate text-[13px] font-black uppercase tracking-wide text-white"
                >
                  {{ state.accountName || "ACCOUNT HOLDER" }}
                </p>
              </div>

              <div
                class="rounded-lg border border-white/10 bg-white/10 px-2.5 py-1.5 text-right"
              >
                <p
                  class="text-[8px] font-bold uppercase tracking-[1px] text-blue-200/60"
                >
                  Account
                </p>

                <p
                  class="mt-0.5 text-[11px] font-black tracking-wider text-white"
                >
                  BANK
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="loadingData"
          class="flex min-h-[300px] items-center justify-center rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)]"
        >
          <UIcon
            name="i-heroicons-arrow-path"
            class="h-6 w-6 animate-spin text-[#145DA0]"
          />
        </div>

        <div
          v-else-if="bankExists"
          class="overflow-hidden rounded-[20px] border border-slate-400 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)]"
        >
          <div
            class="rounded-[16px] border border-blue-100 bg-gradient-to-br from-blue-50 to-slate-50 p-4"
          >
            <div class="flex items-start gap-3">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#061A40]"
              >
                <UIcon
                  name="i-heroicons-information-circle"
                  class="h-5 w-5 text-white"
                />
              </div>

              <div class="min-w-0 flex-1">
                <h3 class="text-[15px] font-black text-slate-900">
                  {{ t("accountManagement") }}
                </h3>

                <p class="mt-1 text-[13px] leading-6 text-slate-500">
                  {{ t('bankInfoEditNotice') }}
                </p>
              </div>
            </div>

            <NuxtLink
              to="/support"
              class="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#061A40] to-[#145DA0] text-[13px] font-black text-white shadow-[0_8px_18px_rgba(6,26,64,0.22)] transition-all duration-200 hover:from-[#04132F] hover:to-[#104D88] active:scale-[0.98]"
            >
              <UIcon
                name="i-heroicons-chat-bubble-left-right"
                class="h-[18px] w-[18px]"
              />

              {{ t('contactSupport') }}
            </NuxtLink>
          </div>
        </div>

        <div
          v-else
          class="overflow-hidden rounded-[20px] border border-slate-200 bg-white p-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.07)]"
        >
          <div class="mb-4 flex items-center gap-3">
            <div>
              <h3
                class="text-[16px] font-black tracking-[-0.2px] text-slate-900"
              >
                {{ t("accountManagement") }}
              </h3>

              <p class="mt-0.5 text-[12px] font-medium text-slate-500">
                {{ t("enterBankAccountInformation") }}
              </p>
            </div>
          </div>

          <div class="space-y-2">
            <div
              class="group rounded-[14px] border border-slate-200 bg-[#F6F8FB] p-2 transition-all duration-200 focus-within:border-[#145DA0] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(20,93,160,0.08)]"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#061A40]"
                >
                  <UIcon
                    name="i-heroicons-building-library"
                    class="h-[17px] w-[17px] text-white"
                  />
                </div>

                <div class="min-w-0 flex-1">
                  <label
                    class="block text-[9px] font-bold uppercase tracking-[0.5px] text-slate-500"
                  >
                    {{ t("bankName") }}
                  </label>

                  <input
                    v-model="state.bankName"
                    type="text"
                    :placeholder="t('enterBankName')"
                    class="mt-1 h-6 w-full border-0 bg-transparent p-0 text-[14px] text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div
              class="group rounded-[14px] border border-slate-200 bg-[#F6F8FB] p-2 transition-all duration-200 focus-within:border-[#145DA0] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(20,93,160,0.08)]"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#061A40]"
                >
                  <UIcon
                    name="i-heroicons-credit-card"
                    class="h-[17px] w-[17px] text-white"
                  />
                </div>

                <div class="min-w-0 flex-1">
                  <label
                    class="block text-[9px] font-bold uppercase tracking-[0.5px] text-slate-500"
                  >
                    {{ t("accountNumber") }}
                  </label>

                  <input
                    v-model="state.accountNumber"
                    type="text"
                    inputmode="numeric"
                    :placeholder="t('enterAccountNumber')"
                    class="mt-1 h-6 w-full border-0 bg-transparent p-0 tracking-wide text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div
              class="group rounded-[14px] border border-slate-200 bg-[#F6F8FB] p-2 transition-all duration-200 focus-within:border-[#145DA0] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(20,93,160,0.08)]"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#061A40]"
                >
                  <UIcon
                    name="i-heroicons-user"
                    class="h-[17px] w-[17px] text-white"
                  />
                </div>

                <div class="min-w-0 flex-1">
                  <label
                    class="block text-[9px] font-bold uppercase tracking-[0.5px] text-slate-500"
                  >
                    {{ t("accountName") }}
                  </label>

                  <input
                    v-model="state.accountName"
                    type="text"
                    :placeholder="t('enterAccountName')"
                    class="mt-1 h-6 w-full border-0 bg-transparent p-0 uppercase text-slate-900 outline-none placeholder:normal-case placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div
              class="group rounded-[14px] border border-slate-200 bg-[#F6F8FB] p-2 transition-all duration-200 focus-within:border-[#145DA0] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(20,93,160,0.08)]"
            >
              <div class="flex items-center gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#061A40]"
                >
                  <UIcon
                    name="i-heroicons-map-pin"
                    class="h-[17px] w-[17px] text-white"
                  />
                </div>

                <div class="min-w-0 flex-1">
                  <label
                    class="block text-[9px] font-bold uppercase tracking-[0.5px] text-slate-500"
                  >
                    {{ t("branchAddress") }}
                  </label>

                  <input
                    v-model="state.address"
                    type="text"
                    :placeholder="t('enterBranchAddress')"
                    class="mt-1 h-6 w-full border-0 bg-transparent p-0 text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            v-if="!loading"
            type="button"
            @click="onSubmit"
            class="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#061A40] to-[#145DA0] text-[13px] font-black text-white shadow-[0_8px_18px_rgba(6,26,64,0.22)] transition-all duration-200 hover:from-[#04132F] hover:to-[#104D88] active:scale-[0.98]"
          >
            <UIcon name="i-heroicons-check-circle" class="h-[18px] w-[18px]" />

            {{ t("saveInfo") }}
          </button>

          <button
            v-else
            type="button"
            disabled
            class="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#061A40] to-[#145DA0] text-white shadow-[0_8px_18px_rgba(6,26,64,0.18)]"
          >
            <UIcon name="i-heroicons-arrow-path" class="h-5 w-5 animate-spin" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();

const loading = ref(false);
const loadingData = ref(true);
const bankExists = ref(false);

const state = reactive({
  bankName: "",
  accountNumber: "",
  accountName: "",
  address: "",
});

const onSubmit = async () => {
  if (loading.value || bankExists.value) return;

  try {
    loading.value = true;
    await useAPI("payment/public/update", JSON.parse(JSON.stringify(state)));
    bankExists.value = true;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const getBank = async () => {
  try {
    const data = await useAPI("payment/public/get");

    if (data && (data.bankName || data.accountNumber || data.accountName || data.address)) {
      state.bankName = data.bankName || "";
      state.accountNumber = data.accountNumber || "";
      state.accountName = data.accountName || "";
      state.address = data.address || "";
      bankExists.value = true;
    }
  } catch (e) {
    console.log(e);
  } finally {
    loadingData.value = false;
  }
};

getBank();
</script>
