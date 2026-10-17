<script setup>
import { ChevronDown } from '@lucide/vue'

const props = defineProps({
  question: { type: String, required: true },
  modelValue: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div class="card-surface overflow-hidden">
    <button
      type="button"
      class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      :aria-expanded="modelValue"
      @click="toggle"
    >
      <span class="font-semibold text-slate-900 dark:text-white">{{ question }}</span>
      <ChevronDown
        class="h-5 w-5 shrink-0 text-primary-600 dark:text-primary-400 transition-transform duration-300"
        :class="modelValue && 'rotate-180'"
      />
    </button>
    <div
      class="grid transition-[grid-template-rows] duration-300 ease-out"
      :style="{ gridTemplateRows: modelValue ? '1fr' : '0fr' }"
    >
      <div class="overflow-hidden">
        <p class="px-6 pb-5 text-muted leading-relaxed">
          <slot />
        </p>
      </div>
    </div>
  </div>
</template>
