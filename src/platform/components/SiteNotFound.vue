<script setup lang="ts">
defineProps<{ requested: string | null; sites: { id: string; name: string }[]; errors?: string[] }>()
</script>

<!-- Rendered outside any site (no theme), so it uses plain Tailwind colours on purpose. -->
<template>
  <main class="mx-auto max-w-xl px-6 py-24 font-sans text-slate-800">
    <template v-if="errors?.length">
      <h1 class="text-2xl font-bold">Site configuration has errors</h1>
      <ul class="mt-6 list-disc space-y-2 pl-5 text-sm text-red-700">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </template>
    <template v-else>
      <h1 class="text-2xl font-bold">No site found<span v-if="requested"> for "{{ requested }}"</span></h1>
      <p class="mt-3 text-slate-600">Pick one of the sites in this build:</p>
      <ul class="mt-6 space-y-2">
        <li v-for="site in sites" :key="site.id">
          <a :href="`/${site.id}/`" class="font-semibold text-blue-700 underline">{{ site.name }}</a>
          <span class="ml-2 text-sm text-slate-500">/{{ site.id }}/</span>
        </li>
      </ul>
    </template>
  </main>
</template>
