import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Theme {
  themeMode: 'light' | 'dark'
  primaryColor: string
  secondaryColor: string
  accentColor: string
  textColor: string
  backgroundColor: string
}

export interface SiteInfo {
  siteName: string
  siteSlogan: string
  logo: string
  favicon: string
}

export interface SeoInfo {
  title: string
  metaDescription: string
  metaKeywords: string
  ogImage: string
  headerScripts: string
  footerScripts: string
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  workingHours: string
  mapEmbed: string
}

export interface SocialLinks {
  facebook: string
  twitter: string
  linkedin: string
  instagram: string
  youtube: string
  zalo: string
}

export const useThemeStore = defineStore('theme', () => {
  // Theme state
  const theme = ref<Theme>({
    themeMode: 'light',
    primaryColor: '#0d6efd',
    secondaryColor: '#6c757d',
    accentColor: '#fd7e14',
    textColor: '#212529',
    backgroundColor: '#ffffff'
  })

  // Site information
  const siteInfo = ref<SiteInfo>({
    siteName: 'Wedding Events',
    siteSlogan: 'Dịch vụ cưới hỏi chuyên nghiệp',
    logo: '/images/logo.jpg',
    favicon: '/favicon.ico'
  })

  // SEO information
  const seoInfo = ref<SeoInfo>({
    title: '',
    metaDescription: 'Dịch vụ tổ chức đám cưới chuyên nghiệp với chất lượng cao và sáng tạo',
    metaKeywords: 'dịch vụ cưới hỏi, tổ chức đám cưới, trang trí sân khấu, âm thanh ánh sáng',
    ogImage: '/images/logo.jpg',
    headerScripts: '',
    footerScripts: ''
  })

  // Contact information
  const contactInfo = ref<ContactInfo>({
    phone: '+84 123 456 789',
    email: 'info@weddingevents.com',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    workingHours: 'Thứ 2 - Thứ 7: 8:00 - 18:00',
    mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.325!2d106.6297!3d10.7769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b90b1c9c7%3A0x5c4a8c8c8c8c8c8c!2sHo%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1234567890!5m2!1sen!2s" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
  })

  // Social links
  const socialLinks = ref<SocialLinks>({
    facebook: 'https://facebook.com/weddingevents',
    twitter: 'https://twitter.com/weddingevents',
    linkedin: 'https://linkedin.com/company/weddingevents',
    instagram: 'https://instagram.com/weddingevents',
    youtube: 'https://youtube.com/weddingevents',
    zalo: 'https://zalo.me/weddingevents'
  })

  // Computed properties
  const isDarkMode = computed(() => theme.value.themeMode === 'dark')
  const primaryColorRgb = computed(() => hexToRgb(theme.value.primaryColor))
  const secondaryColorRgb = computed(() => hexToRgb(theme.value.secondaryColor))
  const accentColorRgb = computed(() => hexToRgb(theme.value.accentColor))

  // Actions
  const setTheme = (newTheme: Partial<Theme>) => {
    theme.value = { ...theme.value, ...newTheme }
    updateCSSVariables()
    saveThemeToStorage()
  }

  const toggleTheme = () => {
    theme.value.themeMode = theme.value.themeMode === 'light' ? 'dark' : 'light'
    updateCSSVariables()
    saveThemeToStorage()
  }

  const setSiteInfo = (info: Partial<SiteInfo>) => {
    siteInfo.value = { ...siteInfo.value, ...info }
  }

  const setSeoInfo = (info: Partial<SeoInfo>) => {
    seoInfo.value = { ...seoInfo.value, ...info }
  }

  const setContactInfo = (info: Partial<ContactInfo>) => {
    contactInfo.value = { ...contactInfo.value, ...info }
  }

  const setSocialLinks = (links: Partial<SocialLinks>) => {
    socialLinks.value = { ...socialLinks.value, ...links }
  }

  const initializeTheme = () => {
    loadThemeFromStorage()
    updateCSSVariables()
  }

  const loadThemeFromStorage = () => {
    try {
      const stored = localStorage.getItem('wedding-events-theme')
      if (stored) {
        const parsedTheme = JSON.parse(stored)
        theme.value = { ...theme.value, ...parsedTheme }
      }
    } catch (error) {
      console.warn('Failed to load theme from storage:', error)
    }
  }

  const saveThemeToStorage = () => {
    try {
      localStorage.setItem('wedding-events-theme', JSON.stringify(theme.value))
    } catch (error) {
      console.warn('Failed to save theme to storage:', error)
    }
  }

  const updateCSSVariables = () => {
    const root = document.documentElement
    root.style.setProperty('--primary-color', theme.value.primaryColor)
    root.style.setProperty('--secondary-color', theme.value.secondaryColor)
    root.style.setProperty('--accent-color', theme.value.accentColor)
    root.style.setProperty('--text-color', theme.value.textColor)
    root.style.setProperty('--background-color', theme.value.backgroundColor)
  }

  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result 
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '0, 0, 0'
  }

  const resetTheme = () => {
    theme.value = {
      themeMode: 'light',
      primaryColor: '#0d6efd',
      secondaryColor: '#6c757d',
      accentColor: '#fd7e14',
      textColor: '#212529',
      backgroundColor: '#ffffff'
    }
    updateCSSVariables()
    saveThemeToStorage()
  }

  return {
    // State
    theme,
    siteInfo,
    seoInfo,
    contactInfo,
    socialLinks,
    
    // Computed
    isDarkMode,
    primaryColorRgb,
    secondaryColorRgb,
    accentColorRgb,
    
    // Actions
    setTheme,
    toggleTheme,
    setSiteInfo,
    setSeoInfo,
    setContactInfo,
    setSocialLinks,
    initializeTheme,
    resetTheme
  }
})