<template>
  <nav aria-label="breadcrumb" class="container py-2" v-if="breadcrumbs.length > 0">
    <ol class="breadcrumb mb-0">
      <li class="breadcrumb-item">
        <router-link to="/">Trang Chủ</router-link>
      </li>
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.path"
        class="breadcrumb-item"
        :class="{ active: index === breadcrumbs.length - 1 }"
        :aria-current="index === breadcrumbs.length - 1 ? 'page' : undefined"
      >
        <router-link
          v-if="index < breadcrumbs.length - 1"
          :to="breadcrumb.path"
        >
          {{ breadcrumb.label }}
        </router-link>
        <span v-else>{{ breadcrumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface BreadcrumbItem {
  label: string
  path: string
}

const route = useRoute()

const breadcrumbs = computed((): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = []
  
  // Get route meta for breadcrumb information
  const routeMeta = route.meta?.breadcrumb as BreadcrumbItem[] | undefined
  
  if (routeMeta) {
    return routeMeta
  }
  
  // Generate breadcrumbs based on route path
  const pathSegments = route.path.split('/').filter(segment => segment)
  
  let currentPath = ''
  
  for (let i = 0; i < pathSegments.length; i++) {
    currentPath += `/${pathSegments[i]}`
    
    const label = getBreadcrumbLabel(pathSegments[i], currentPath)
    breadcrumbs.push({
      label,
      path: currentPath
    })
  }
  
  return breadcrumbs
})

const getBreadcrumbLabel = (segment: string, fullPath: string): string => {
  // Define label mappings
  const labelMap: Record<string, string> = {
    'services': 'Dịch Vụ',
    'gallery': 'Thư Viện',
    'contact': 'Liên Hệ',
    'about': 'Giới Thiệu'
  }
  
  // Check if it's a service detail page
  if (fullPath.startsWith('/services/') && segment !== 'services') {
    return `Dịch Vụ #${segment}`
  }
  
  // Check if it's a gallery detail page
  if (fullPath.startsWith('/gallery/') && segment !== 'gallery') {
    return `Thư Viện #${segment}`
  }
  
  // Return mapped label or capitalize segment
  return labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
}
</script>

<style scoped>
.breadcrumb {
  background: transparent;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: ">";
  color: #6c757d;
  font-weight: 500;
}

.breadcrumb-item a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-item a:hover {
  color: var(--accent-color);
  text-decoration: underline;
}

.breadcrumb-item.active {
  color: #6c757d;
}

.breadcrumb-item.active span {
  color: #6c757d;
  font-weight: 500;
}

/* Hide breadcrumb on home page */
.breadcrumb-item:only-child {
  display: none;
}
</style>