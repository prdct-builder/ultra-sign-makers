<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | ghost
  size: { type: String, default: 'md' }, // sm | md | lg
  as: { type: String, default: 'button' }, // button | a
  href: { type: String, default: null }
})

const tag = computed(() => (props.href ? 'a' : props.as))

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 ease-out focus-visible:outline-none active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary:
    'bg-primary-600 text-white shadow-glow hover:bg-primary-500 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.25),0_12px_36px_-8px_rgba(99,102,241,0.55)] hover:-translate-y-0.5',
  secondary:
    'bg-white text-slate-900 border border-slate-200 shadow-soft hover:border-primary-300 hover:-translate-y-0.5 dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:border-primary-400/40',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5'
}

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm sm:text-base px-6 py-3',
  lg: 'text-base sm:text-lg px-8 py-4'
}

const classes = computed(() => [base, variants[props.variant], sizes[props.size]])
</script>

<template>
  <component :is="tag" :href="href" :class="classes">
    <slot />
  </component>
</template>
