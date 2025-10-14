import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    ContactForm,
    ContactInfo,
    FormState,
    FormFieldError,
    ContactInfoResponse,
} from '@/types/contact'
import { useApi } from '@/composables/useApi.ts'

export const useContactStore = defineStore('contact', () => {
  // State
  const contactInfo = ref<ContactInfo>({
    // phone: '+84 123 456 789',
    // email: 'info@dichvucuoihoidep.com',
    // address: '123 Đường ABC, Quận 1, TP.HCM',
    // workingHours: 'Thứ 2 - Thứ 6: 8:00 - 18:00',
    // mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6324416472356!2d106.67935761526035!3d10.76290689233084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed009%3A0x1e6c81d2b5d9f3e1!2sExample%20Location!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'

      phone: 'phone',
      email: 'info@email.com',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      workingHours: 'Thứ 2 - Thứ 6: 8:00 - 18:00',
      mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6324416472356!2d106.67935761526035!3d10.76290689233084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed009%3A0x1e6c81d2b5d9f3e1!2sExample%20Location!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
  })

  const formState = ref<FormState>({
    isSubmitting: false,
    isSubmitted: false,
    errors: [],
    successMessage: ''
  })

  const loading = ref(false)
  const error = ref<string | null>(null)

  // Services
  const availableServices = ref([
    'Tổ Chức Trọn Gói',
    'Trang Trí Sân Khấu',
    'Âm Thanh Ánh Sáng',
    'Chụp Ảnh Quay Phim',
    'Dịch Vụ Ẩm Thực',
    'Tư Vấn Event'
  ])

  // Validation rules
  const validationRules = {
    name: { required: true, minLength: 2, maxLength: 100 },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, maxLength: 255 },
    phone: { pattern: /^[0-9\-\+\(\)\s]+$/, maxLength: 20 },
    subject: { required: true, maxLength: 255 },
    message: { required: true, minLength: 10, maxLength: 2000 }
  }

  // Computed
  const hasErrors = computed(() => formState.value.errors.length > 0)
  const isFormValid = computed(() => !hasErrors.value && !formState.value.isSubmitting)

  // Actions
  const loadContactInfo = async () => {
    try {
      loading.value = true
      error.value = null

      // TODO: Replace with actual API call
      // const response = await useApi().get<ContactInfoResponse>('/api/contact')
      const response = await useApi().get('/api/contact')
      contactInfo.value = response.data.data

      // For now, use default data from theme store
      console.log('Contact info loaded')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load contact info'
      console.error('Error loading contact info:', err)
    } finally {
      loading.value = false
    }
  }

  const validateForm = (form: ContactForm): FormFieldError[] => {
    const errors: FormFieldError[] = []

    // Name validation
    if (validationRules.name.required && (!form.name || form.name.trim().length === 0)) {
      errors.push({ field: 'name', message: 'Vui lòng nhập họ và tên' })
    } else if (form.name && form.name.length < validationRules.name.minLength) {
      errors.push({ field: 'name', message: `Họ và tên phải có ít nhất ${validationRules.name.minLength} ký tự` })
    } else if (form.name && form.name.length > validationRules.name.maxLength) {
      errors.push({ field: 'name', message: `Họ và tên không được vượt quá ${validationRules.name.maxLength} ký tự` })
    }

    // Email validation
    if (validationRules.email.required && (!form.email || form.email.trim().length === 0)) {
      errors.push({ field: 'email', message: 'Vui lòng nhập địa chỉ email' })
    } else if (form.email && !validationRules.email.pattern.test(form.email)) {
      errors.push({ field: 'email', message: 'Địa chỉ email không hợp lệ' })
    } else if (form.email && form.email.length > validationRules.email.maxLength) {
      errors.push({ field: 'email', message: `Email không được vượt quá ${validationRules.email.maxLength} ký tự` })
    }

    // Phone validation
    if (form.phone && !validationRules.phone.pattern.test(form.phone)) {
      errors.push({ field: 'phone', message: 'Số điện thoại không hợp lệ' })
    } else if (form.phone && form.phone.length > validationRules.phone.maxLength) {
      errors.push({ field: 'phone', message: `Số điện thoại không được vượt quá ${validationRules.phone.maxLength} ký tự` })
    }

    // Subject validation
    if (validationRules.subject.required && (!form.subject || form.subject.trim().length === 0)) {
      errors.push({ field: 'subject', message: 'Vui lòng nhập tiêu đề' })
    } else if (form.subject && form.subject.length > validationRules.subject.maxLength) {
      errors.push({ field: 'subject', message: `Tiêu đề không được vượt quá ${validationRules.subject.maxLength} ký tự` })
    }

    // Message validation
    if (validationRules.message.required && (!form.message || form.message.trim().length === 0)) {
      errors.push({ field: 'message', message: 'Vui lòng nhập nội dung tin nhắn' })
    } else if (form.message && form.message.length < validationRules.message.minLength) {
      errors.push({ field: 'message', message: `Nội dung tin nhắn phải có ít nhất ${validationRules.message.minLength} ký tự` })
    } else if (form.message && form.message.length > validationRules.message.maxLength) {
      errors.push({ field: 'message', message: `Nội dung tin nhắn không được vượt quá ${validationRules.message.maxLength} ký tự` })
    }

    return errors
  }

  const submitContactForm = async (form: ContactForm): Promise<boolean> => {
    try {
      formState.value.isSubmitting = true
      formState.value.errors = []
      formState.value.successMessage = ''

      // Validate form
      const validationErrors = validateForm(form)
      if (validationErrors.length > 0) {
        formState.value.errors = validationErrors
        return false
      }

      // TODO: Replace with actual API call
      // const response = await useApi().post<ContactSubmissionResponse>('/api/contact/submit', form)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock successful response
      formState.value.isSubmitted = true
      formState.value.successMessage = 'Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi lại sớm nhất có thể.'

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.'
      formState.value.errors = [{ field: 'general', message: errorMessage }]
      return false
    } finally {
      formState.value.isSubmitting = false
    }
  }

  const resetForm = () => {
    formState.value = {
      isSubmitting: false,
      isSubmitted: false,
      errors: [],
      successMessage: ''
    }
  }

  const getFieldError = (fieldName: string): string | null => {
    const error = formState.value.errors.find(err => err.field === fieldName)
    return error ? error.message : null
  }

  return {
    // State
    contactInfo,
    formState,
    loading,
    error,
    availableServices,
    validationRules,

    // Computed
    hasErrors,
    isFormValid,

    // Actions
    loadContactInfo,
    validateForm,
    submitContactForm,
    resetForm,
    getFieldError
  }
})
