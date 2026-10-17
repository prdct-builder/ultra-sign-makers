import 'vue-router'
import type { PageConfig } from './platform/site/types'

declare module 'vue-router' {
  interface RouteMeta {
    page?: PageConfig
  }
}

export {}
