<template>
  <div class="min-h-screen bg-[#F4F7FB] pb-8">
    <!-- HEADER -->
    <LayoutPublicHeader :title="t('withdraw')" icon="i-heroicons-banknotes" />

    <!-- CONTENT -->
    <div class="space-y-2 px-2 pt-[65px]">
      <!-- WITHDRAW METHOD -->
      <div
        class="rounded-[20px] border border-[#DCE8F4] bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#061A40] to-[#145DA0] text-white shadow-[0_5px_12px_rgba(20,93,160,0.18)]"
          >
            <UIcon name="i-heroicons-arrow-up-right" class="h-5 w-5" />
          </div>

          <div>
            <p class="text-sm font-bold text-[#10213A]">
              {{ t("method") }}
            </p>

            <p class="mt-0.5 text-[11px] text-slate-400">
              {{ t("chooseMethod") }}
            </p>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-3">
          <!-- BANK -->
          <button
            @click="type = 'bank'"
            class="relative overflow-hidden rounded-2xl border p-3 text-left transition-all duration-200 active:scale-[0.97]"
            :class="
              type === 'bank'
                ? 'border-[#145DA0] bg-[#EEF6FD] shadow-[0_5px_15px_rgba(20,93,160,0.08)]'
                : 'border-slate-200 bg-slate-50'
            "
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl"
                :class="
                  type === 'bank'
                    ? 'bg-gradient-to-r from-[#061A40] to-[#145DA0] text-white shadow-[0_5px_12px_rgba(20,93,160,0.18)]'
                    : 'bg-white text-slate-500'
                "
              >
                <UIcon name="i-heroicons-building-library" class="h-5 w-5" />
              </div>

              <div>
                <p
                  class="text-sm font-bold"
                  :class="type === 'bank' ? 'text-[#145DA0]' : 'text-slate-700'"
                >
                  {{ t("bank") }}
                </p>

                <p class="mt-0.5 text-[10px] text-slate-400">Bank account</p>
              </div>
            </div>

            <div
              v-if="type === 'bank'"
              class="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#061A40] to-[#145DA0]"
            >
              <UIcon name="i-heroicons-check" class="h-3.5 w-3.5 text-white" />
            </div>
          </button>

          <!-- USDT -->
          <button
            @click="type = 'usdt'"
            class="relative overflow-hidden rounded-2xl border p-3 text-left transition-all duration-200 active:scale-[0.97]"
            :class="
              type === 'usdt'
                ? 'border-[#145DA0] bg-[#EEF6FD] shadow-[0_5px_15px_rgba(20,93,160,0.08)]'
                : 'border-slate-200 bg-slate-50'
            "
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl"
                :class="
                  type === 'usdt'
                    ? 'bg-gradient-to-r from-[#061A40] to-[#145DA0] text-white shadow-[0_5px_12px_rgba(20,93,160,0.18)]'
                    : 'bg-white text-slate-500'
                "
              >
                <span class="text-lg font-black">₮</span>
              </div>

              <div>
                <p
                  class="text-sm font-bold"
                  :class="type === 'usdt' ? 'text-[#145DA0]' : 'text-slate-700'"
                >
                  USDT
                </p>

                <p class="mt-0.5 text-[10px] text-slate-400">Crypto wallet</p>
              </div>
            </div>

            <div
              v-if="type === 'usdt'"
              class="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#061A40] to-[#145DA0]"
            >
              <UIcon name="i-heroicons-check" class="h-3.5 w-3.5 text-white" />
            </div>
          </button>
        </div>
      </div>

      <!-- BANK WITHDRAW -->
      <div
        v-if="type === 'bank'"
        class="rounded-[20px] border border-[#DCE8F4] bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
      >
        <div class="mb-5 flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF6FD]"
          >
            <UIcon
              name="i-heroicons-credit-card"
              class="h-5 w-5 text-[#145DA0]"
            />
          </div>

          <div>
            <p class="text-sm font-bold text-[#10213A]">
              {{ t("bank") }}
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <!-- ACCOUNT NAME -->
          <div>
            <label class="text-xs font-bold text-slate-700">
              {{ t("accountName") }}
            </label>

            <div class="relative mt-2">
              <UIcon
                name="i-heroicons-user"
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />

              <input
                v-model="bank.accountName"
                type="text"
                disabled
                :placeholder="t('enterAccountName')"
                class="h-12 w-full rounded-full border border-slate-200 bg-[#F7F9FC] pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#145DA0] focus:bg-white focus:ring-4 focus:ring-[#EAF3FB]"
              />
            </div>
          </div>

          <!-- BANK NAME -->
          <div>
            <label class="text-xs font-bold text-slate-700">
              {{ t("bankName") }}
            </label>

            <div class="relative mt-2">
              <UIcon
                name="i-heroicons-building-library"
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />

              <input
                v-model="bank.bankName"
                type="text"
                disabled
                :placeholder="t('enterBankName')"
                class="h-12 w-full rounded-full border border-slate-200 bg-[#F7F9FC] pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#145DA0] focus:bg-white focus:ring-4 focus:ring-[#EAF3FB]"
              />
            </div>
          </div>

          <!-- ACCOUNT NUMBER -->
          <div>
            <label class="text-xs font-bold text-slate-700">
              {{ t("accountNumber") }}
            </label>

            <div class="relative mt-2">
              <UIcon
                name="i-heroicons-hashtag"
                class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />

              <input
                v-model="bank.accountNumber"
                type="text"
                disabled
                :placeholder="t('enterAccountNumber')"
                class="h-12 w-full rounded-full border border-slate-200 bg-[#F7F9FC] pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#145DA0] focus:bg-white focus:ring-4 focus:ring-[#EAF3FB]"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- USDT WITHDRAW -->
      <div
        v-if="type === 'usdt'"
        class="rounded-[20px] border border-[#DCE8F4] bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
      >
        <div class="mb-5 flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF6FD]"
          >
            <UIcon name="i-heroicons-wallet" class="h-5 w-5 text-[#145DA0]" />
          </div>

          <div>
            <p class="text-sm font-bold text-[#10213A]">USDT Wallet</p>
          </div>
        </div>

        <div class="space-y-4">
          <!-- WALLET -->
          <div>
            <label class="text-xs font-bold text-slate-700">
              {{ t("chooseWallet") }}
            </label>

            <USelectMenu
              v-model="usdt.wallet"
              :items="wallets"
              :placeholder="t('chooseMethod')"
              class="mt-2 h-12 w-full rounded-full bg-[#F7F9FC] text-slate-900"
            />
          </div>

          <!-- ADDRESS -->
          <div>
            <label class="text-xs font-bold text-slate-700">
              {{ t("addressWallet") }}
            </label>

            <div class="relative mt-2">
              <UIcon
                name="i-heroicons-link"
                class="absolute left-3 top-3.5 h-4 w-4 text-slate-400"
              />

              <textarea
                v-model="usdt.address"
                :placeholder="t('enterWallet')"
                :rows="4"
                class="w-full resize-none rounded-2xl border border-slate-200 bg-[#F7F9FC] py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#145DA0] focus:bg-white focus:ring-4 focus:ring-[#EAF3FB]"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- AMOUNT -->
      <div
        class="rounded-[20px] border border-[#DCE8F4] bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-bold text-[#10213A]">
              {{ t("amountWithdraw") }}
            </p>
          </div>

          <div class="text-right">
            <p class="text-[10px] font-medium text-slate-400">
              {{ t("balance") }}
            </p>

            <p class="mt-0.5 text-sm font-bold text-[#145DA0]">
              ${{ useMoney().toMoney(authStore.profile?.coin || 0) }}
            </p>
          </div>
        </div>

        <!-- AMOUNT INPUT -->
        <div class="relative mt-4">
          <span
            class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400"
          >
            $
          </span>

          <input
            v-model="amount"
            type="number"
            :placeholder="t('enterAmount')"
            class="h-12 w-full rounded-full border border-slate-200 bg-[#F7F9FC] pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#145DA0] focus:bg-white focus:ring-4 focus:ring-[#EAF3FB]"
          />
        </div>

        <!-- QUICK AMOUNTS -->
        <div class="mt-3 grid grid-cols-3 gap-2">
          <button
            v-for="item in quickAmounts"
            :key="item"
            @click="amount = item"
            class="h-10 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 transition-all hover:border-[#145DA0] hover:bg-[#EEF6FD] hover:text-[#145DA0] active:scale-95"
          >
            ${{ useMoney().toMoney(item) }}
          </button>
        </div>
      </div>

      <!-- SUBMIT -->
      <div class="pt-1">
        <UButton
          v-if="!loading"
          block
          @click="submitWithdraw"
          class="h-12 rounded-full bg-gradient-to-r from-[#061A40] to-[#145DA0] font-bold text-white shadow-[0_10px_25px_rgba(6,26,64,0.22)] transition-all hover:from-[#071F4D] hover:to-[#1768AC] active:scale-[0.98]"
        >
          <UIcon name="i-heroicons-arrow-up-right" class="mr-1 h-5 w-5" />

          {{ t("confirmWithdraw") }}
        </UButton>

        <button
          v-else
          class="flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#061A40] to-[#145DA0] text-white shadow-lg"
        >
          <UIcon
            name="i-heroicons-arrow-path-rounded-square"
            class="h-6 w-6 animate-spin"
          />
        </button>
      </div>
    </div>

    <UModal
      v-model:open="modal.show"
      :ui="{
        content: 'rounded-[28px] max-w-md overflow-hidden',
      }"
    >
      <template #content>
        <div class="overflow-hidden rounded-[28px] bg-white">
          <!-- MODAL HEADER -->
          <div
            class="relative overflow-hidden bg-gradient-to-r from-[#061A40] to-[#145DA0] p-3 text-center text-white"
          >
            <div
              class="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10"
            />

            <div
              class="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10"
            >
              <UIcon name="i-heroicons-shield-check" class="h-7 w-7" />
            </div>

            <h3 class="relative mt-3 text-lg font-bold">
              {{ t("confirmWithdraw") }}
            </h3>

            <p class="relative mt-1 text-xs text-blue-100">
              {{ enterWithdrawPass }}
            </p>
          </div>
          <div class="space-y-3 p-3">
            <div class="rounded-2xl border border-[#DCE8F4] bg-[#F7F9FC] p-4">
              <div class="flex items-center justify-between">
                <span class="text-xs text-slate-500">
                  {{ t("amountWithdraw") }}
                </span>

                <span class="text-lg font-black text-[#145DA0]">
                  ${{ useMoney().toMoney(amount || 0) }}
                </span>
              </div>

              <div class="my-3 h-px bg-slate-200" />

              <div class="flex items-center justify-between">
                <span class="text-xs text-slate-500">
                  {{ t("method") }}
                </span>

                <span
                  class="flex items-center gap-1.5 text-xs font-bold text-slate-800"
                >
                  <UIcon
                    :name="
                      type === 'bank'
                        ? 'i-heroicons-building-library'
                        : 'i-heroicons-wallet'
                    "
                    class="h-4 w-4 text-[#145DA0]"
                  />

                  {{ type === "bank" ? t("bank") : "USDT" }}
                </span>
              </div>
            </div>

            <!-- PASSWORD -->
            <div>
              <label class="text-xs font-bold text-slate-700">
                {{ t("withdrawPass") }}
              </label>

              <div class="relative mt-2">
                <UIcon
                  name="i-heroicons-lock-closed"
                  class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                />

                <input
                  v-model="withdrawPassword"
                  type="password"
                  :placeholder="t('withdrawPassPlace')"
                  class="h-12 w-full rounded-full border border-slate-200 bg-[#F7F9FC] pl-10 pr-4 text-sm outline-none transition focus:border-[#145DA0] focus:bg-white focus:ring-4 focus:ring-[#EAF3FB]"
                />
              </div>
            </div>
            <!-- NOTE -->
            <div
              class="mt-2.5 flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-2.5"
            >
              <UIcon
                name="i-heroicons-information-circle"
                class="mt-0.5 h-4 w-4 shrink-0 text-amber-500"
              />

              <p class="text-[12px] font-medium leading-4 text-amber-700">
                {{ t("withdrawPasswordNote") }}
              </p>
            </div>

            <!-- ACTIONS -->
            <div class="grid grid-cols-2 gap-3 pt-1">
              <UButton
                color="neutral"
                variant="soft"
                class="h-12 rounded-full font-semibold"
                @click="modal.show = false"
              >
                {{ t("cancel") }}
              </UButton>

              <UButton
                :loading="loading"
                class="h-12 rounded-full bg-gradient-to-r from-[#061A40] to-[#145DA0] font-bold text-white shadow-[0_6px_16px_rgba(6,26,64,0.18)] hover:from-[#071F4D] hover:to-[#1768AC]"
                @click="confirmWithdraw"
              >
                <UIcon
                  v-if="!loading"
                  name="i-heroicons-check"
                  class="mr-1 h-4 w-4"
                />

                {{ t("confirm") }}
              </UButton>
            </div>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const { t } = useI18n();

const loading = ref(false);
const amount = ref();
const type = ref("bank");
const withdrawPassword = ref("");

const bank = reactive({
  accountName: "",
  bankName: "",
  accountNumber: "",
});

const usdt = reactive({
  wallet: "",
  address: "",
});
const modal = reactive({
  show: false,
});
const submitWithdraw = async () => {
  try {
    if (authStore.profile.status == 1) return await navigateTo("/auth/pending");
    if (authStore.profile.status !== 2) return await navigateTo("/auth/kyc");
    if (type.value === "bank") {
      if (!bank.accountName) throw t("withdrawValidate.accountNameRequired");
      if (!bank.bankName) throw t("withdrawValidate.bankNameRequired");
      if (!bank.accountNumber)
        throw t("withdrawValidate.accountNumberRequired");
    }

    if (type.value === "usdt") {
      if (!usdt.wallet) throw t("withdrawValidate.walletTypeRequired");
      if (!usdt.address) throw t("withdrawValidate.walletAddressRequired");
    }

    if (!amount.value || Number(amount.value) <= 0) {
      throw t("withdrawValidate.amountRequired");
    }

    if (Number(amount.value) > Number(authStore.profile?.coin || 0)) {
      throw t("withdrawValidate.insufficientBalance");
    }

    withdrawPassword.value = "";
    modal.show = true;
  } catch (e) {
    useNotify().error(e);
  }
};

const wallets = ["TRC20", "ERC20", "BEP20", "SPL"];

const quickAmounts = [1000, 5000, 10000];

// Submit
const confirmWithdraw = async () => {
  try {
    if (loading.value) return;

    loading.value = true;

    const payload = {
      type: type.value,
      amount: Number(amount.value),
      withdrawPassword: withdrawPassword.value,
    };

    if (type.value === "bank") {
      Object.assign(payload, {
        accountName: bank.accountName,
        bankName: bank.bankName,
        accountNumber: bank.accountNumber,
      });
    }

    if (type.value === "usdt") {
      Object.assign(payload, {
        wallet: usdt.wallet,
        address: usdt.address,
      });
    }

    await useAPI("payment/public/withdraw", payload);

    amount.value = null;
    withdrawPassword.value = "";

    modal.show = false;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const getBank = async () => {
  try {
    const data = await useAPI("payment/public/get");
    if (data) {
      bank.bankName = data.bankName;
      bank.accountNumber = data.accountNumber;
      bank.accountName = data.accountName;
    }
  } catch (e) {
    console.log(e);
  }
};
getBank();
</script>
