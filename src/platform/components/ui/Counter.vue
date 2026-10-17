<script setup lang="ts">
import { useCounter } from '../../composables/useCounter'

const props = withDefaults(defineProps<{ target: number; suffix?: string; prefix?: string; duration?: number }>(), {
  suffix: '',
  prefix: '',
  duration: 1800
})

const { el, value } = useCounter(props.target, { duration: props.duration })
</script>

<template>
  <span ref="el" class="tabular-nums">{{ prefix }}{{ value.toLocaleString() }}{{ suffix }}</span>
</template>
