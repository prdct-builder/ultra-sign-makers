<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { LinkTarget } from '../../site/types'
import { useSite } from '../../site/useSite'
import { homeAnchors } from '../../sections'
import { anchorToPath, scrollToAnchor } from '../../router'

const props = defineProps<{ link: LinkTarget }>()
const emit = defineEmits<{ navigate: [] }>()

const router = useRouter()
const { config } = useSite()

const internalPath = computed(() => {
  if ('section' in props.link) return anchorToPath(props.link.section, homeAnchors(config)[0])
  if ('to' in props.link) return props.link.to
  return null
})

const href = computed(() => (internalPath.value ? router.resolve(internalPath.value).href : (props.link as { href: string }).href))
const external = computed(() => !internalPath.value && /^https?:\/\//.test(href.value))

function onClick(event: MouseEvent) {
  emit('navigate')
  if (!internalPath.value) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault()
  // Clicking the section you're already on (but scrolled away from) just scrolls back to it.
  if (router.currentRoute.value.path === internalPath.value && 'section' in props.link) {
    scrollToAnchor(props.link.section)
  } else {
    router.push(internalPath.value)
  }
}
</script>

<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    @click="onClick"
  >
    <slot />
  </a>
</template>
