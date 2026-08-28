<template>
  <div class="px-4 mt-6 space-y-5">
    <div
      v-for="i in 3"
      :key="i"
      class="rounded-3xl bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)] animate-pulse"
    >
      <div class="flex items-start justify-between">
        <div class="space-y-3">
          <div class="h-7 w-32 rounded-xl bg-slate-200"></div>
          <div class="h-4 w-48 rounded-xl bg-slate-100"></div>
        </div>

        <div class="w-14 h-14 rounded-2xl bg-slate-200"></div>
      </div>

      <div class="grid grid-cols-3 gap-3 mt-6">
        <div v-for="n in 3" :key="n" class="rounded-2xl bg-slate-50 p-4">
          <div class="h-3 w-20 mx-auto rounded bg-slate-200"></div>
          <div class="h-6 w-16 mx-auto rounded bg-slate-300 mt-3"></div>
        </div>
      </div>

      <div class="mt-4">
        <div class="h-12 rounded-2xl bg-slate-200"></div>
      </div>
    </div>
  </div>
</template>
