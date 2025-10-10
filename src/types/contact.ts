export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  service?: string
}

export interface ContactFormValidation {
  name: { required: boolean; minLength: number; maxLength: number }
  email: { required: boolean; pattern: RegExp; maxLength: number }
  phone: { pattern: RegExp; maxLength: number }
  subject: { required: boolean; maxLength: number }
  message: { required: boolean; minLength: number; maxLength: number }
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  workingHours: string
  mapEmbed: string
}

export interface ContactPageData {
  contactInfo: ContactInfo
  formConfig: {
    services: string[]
    validationRules: ContactFormValidation
  }
}

export interface ContactSubmissionResponse {
  success: boolean
  message: string
  data?: {
    id: number
    submittedAt: string
  }
  errors?: Record<string, string[]>
}

export interface ContactInfoResponse {
  success: boolean
  data: ContactInfo
}

export interface FormFieldError {
  field: string
  message: string
}

export interface FormState {
  isSubmitting: boolean
  isSubmitted: boolean
  errors: FormFieldError[]
  successMessage: string
}