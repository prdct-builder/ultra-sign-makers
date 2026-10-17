<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { PageConfig, SectionConfig } from '../site/types'
import { useSite } from '../site/useSite'
import { homeAnchors, isSectionVisible, resolveSectionComponent, sectionAnchor } from '../sections'
import { useScrollSpy } from '../composables/useScrollSpy'

const route = useRoute()
const { config } = useSite()

const page = route.meta.page as PageConfig
const sections = (page.sections ?? []).filter(isSectionVisible)
const pageComponent = page.component ? config.components?.[page.component] : undefined

// App.vue keys this view by page path, so this runs once per page.
if (page.path === '/') useScrollSpy(homeAnchors(config))

function sectionProps(section: SectionConfig) {
  if (section.type === 'custom') return section.props ?? {}
  const { type: _type, id: _id, ...props } = section
  return props
}

const rendered = computed(() =>
  sections.map((section, i) => ({
    key: `${section.type}-${i}`,
    component: resolveSectionComponent(section, config),
    id: sectionAnchor(section) ?? undefined,
    props: sectionProps(section)
  }))
)
</script>

<template>
  <component :is="pageComponent" v-if="pageComponent" />
  <template v-else>
    <component
      :is="section.component"
      v-for="section in rendered"
      :id="section.id"
      :key="section.key"
      v-bind="section.props"
    />
  </template>
</template>
