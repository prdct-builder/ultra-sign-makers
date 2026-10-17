<script setup>
import { useCounter } from '../../composables/useCounter'

const props = defineProps({
  target: { type: Number, required: true },
  suffix: { type: String, default: '' },
  prefix: { type: String, default: '' },
  duration: { type: Number, default: 1800 }
})

const { el, value } = useCounter(props.target, { duration: props.duration })
</script>

<template>
  <span ref="el" class="tabular-nums">{{ prefix }}{{ value.toLocaleString() }}{{ suffix }}</span>
</template>
