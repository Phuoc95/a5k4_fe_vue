<template>
    <div class="contact-form-section">
        <div class="contact-form-card">
            <h2 class="section-title">Gửi Tin Nhắn</h2>

            <!-- Success Message -->
            <div
                v-if="formState.isSubmitted && formState.successMessage"
                class="alert alert-success"
            >
                <i class="fas fa-check-circle me-2"></i>
                {{ formState.successMessage }}
            </div>

            <!-- General Error Message -->
            <div v-if="hasGeneralError" class="alert alert-danger">
                <i class="fas fa-exclamation-triangle me-2"></i>
                {{ generalErrorMessage }}
            </div>

            <form @submit.prevent="handleSubmit" class="contact-form">
                <FormField
                    id="name"
                    label="Họ và Tên"
                    :required="true"
                    :error-message="getFieldError('name')"
                >
                    <TextInput
                        id="name"
                        name="name"
                        v-model="form.name"
                        placeholder="Nhập họ và tên của bạn"
                        :required="true"
                        :variant="getFieldError('name') ? 'error' : 'default'"
                        @blur="validateField('name')"
                    />
                </FormField>

                <FormField
                    id="email"
                    label="Email"
                    :required="true"
                    :error-message="getFieldError('email')"
                >
                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        v-model="form.email"
                        placeholder="Nhập địa chỉ email của bạn"
                        :required="true"
                        :variant="getFieldError('email') ? 'error' : 'default'"
                        @blur="validateField('email')"
                    />
                </FormField>

                <FormField
                    id="phone"
                    label="Số Điện Thoại"
                    :error-message="getFieldError('phone')"
                    help-text="Số điện thoại không bắt buộc"
                >
                    <TextInput
                        id="phone"
                        name="phone"
                        type="tel"
                        v-model="form.phone"
                        placeholder="Nhập số điện thoại (không bắt buộc)"
                        :variant="getFieldError('phone') ? 'error' : 'default'"
                        @blur="validateField('phone')"
                    />
                </FormField>

                <FormField
                    id="service"
                    label="Dịch Vụ Quan Tâm"
                    :error-message="getFieldError('service')"
                    help-text="Chọn dịch vụ bạn quan tâm (không bắt buộc)"
                >
                    <SelectInput
                        id="service"
                        name="service"
                        v-model="form.service"
                        placeholder="Chọn dịch vụ"
                        :options="serviceOptions"
                        :variant="getFieldError('service') ? 'error' : 'default'"
                        @blur="validateField('service')"
                    />
                </FormField>

                <FormField
                    id="subject"
                    label="Tiêu Đề"
                    :required="true"
                    :error-message="getFieldError('subject')"
                >
                    <TextInput
                        id="subject"
                        name="subject"
                        v-model="form.subject"
                        placeholder="Nhập tiêu đề tin nhắn"
                        :required="true"
                        :variant="getFieldError('subject') ? 'error' : 'default'"
                        @blur="validateField('subject')"
                    />
                </FormField>

                <FormField
                    id="message"
                    label="Nội Dung"
                    :required="true"
                    :error-message="getFieldError('message')"
                    :help-text="`${form.message.length}/2000 ký tự`"
                >
                    <TextArea
                        id="message"
                        name="message"
                        v-model="form.message"
                        placeholder="Nhập nội dung tin nhắn của bạn..."
                        :required="true"
                        :rows="5"
                        :max-length="2000"
                        :variant="getFieldError('message') ? 'error' : 'default'"
                        @blur="validateField('message')"
                    />
                </FormField>

                <div class="form-actions">
                    <button
                        type="submit"
                        class="btn btn-primary btn-lg"
                        :disabled="formState.isSubmitting || !isFormValid"
                    >
                        <i v-if="formState.isSubmitting" class="fas fa-spinner fa-spin me-2"></i>
                        <i v-else class="fas fa-paper-plane me-2"></i>
                        {{ formState.isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useContactStore } from '@/stores/contact'
import type { ContactForm } from '@/types/contact'
import FormField from '@/components/ui/FormField.vue'
import TextInput from '@/components/ui/TextInput.vue'
import TextArea from '@/components/ui/TextArea.vue'
import SelectInput from '@/components/ui/SelectInput.vue'

const contactStore = useContactStore()

// Form data
const form = ref<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: '',
})

// Computed properties
const formState = computed(() => contactStore.formState)
const availableServices = computed(() => contactStore.availableServices)
const isFormValid = computed(() => contactStore.isFormValid)

const serviceOptions = computed(() => [
    { value: '', label: 'Chọn dịch vụ' },
    ...availableServices.value.map((service) => ({
        value: service,
        label: service,
    })),
])

const hasGeneralError = computed(() => {
    return formState.value.errors.some((error) => error.field === 'general')
})

const generalErrorMessage = computed(() => {
    const generalError = formState.value.errors.find((error) => error.field === 'general')
    return generalError?.message || ''
})

// Methods
const getFieldError = (fieldName: string) => {
    return contactStore.getFieldError(fieldName)
}

const validateField = (fieldName: string) => {
    const errors = contactStore.validateForm(form.value)
    const fieldError = errors.find((error) => error.field === fieldName)

    // Update form state with current field error
    if (fieldError) {
        contactStore.formState.errors = [fieldError]
    } else {
        // Remove field error if validation passes
        contactStore.formState.errors = contactStore.formState.errors.filter(
            (error) => error.field !== fieldName,
        )
    }
}

const handleSubmit = async () => {
    const success = await contactStore.submitContactForm(form.value)

    if (success) {
        // Reset form after successful submission
        form.value = {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            service: '',
        }
    }
}

// Initialize
onMounted(() => {
    contactStore.loadContactInfo()
})
</script>

<style scoped>
.contact-form-section {
    height: 100%;
}

.contact-form-card {
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.section-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1.5rem;
    position: relative;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #0d6efd, #fd7e14);
    border-radius: 2px;
}

.contact-form {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.alert {
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    font-weight: 500;
}

.alert-success {
    color: #0f5132;
    background-color: #d1e7dd;
    border-color: #badbcc;
}

.alert-danger {
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
}

.form-actions {
    margin-top: auto;
    padding-top: 1.5rem;
    text-align: right;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    transition: all 0.15s ease-in-out;
    min-width: 160px;
}

.btn-primary {
    color: #fff;
    background: linear-gradient(135deg, #0d6efd, #fd7e14);
    border-color: transparent;
    box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
}

.btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg, #0b5ed7, #e67e00);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(13, 110, 253, 0.4);
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.btn-lg {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    border-radius: 0.75rem;
}

/* Animation */
.contact-form {
    animation: slideInRight 0.6s ease-out;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .contact-form-card {
        padding: 1.5rem;
    }

    .section-title {
        font-size: 1.5rem;
    }

    .form-actions {
        text-align: center;
    }

    .btn {
        width: 100%;
        max-width: 300px;
    }
}

@media (max-width: 576px) {
    .contact-form-card {
        padding: 1rem;
    }

    .section-title {
        font-size: 1.25rem;
    }

    .btn {
        padding: 0.875rem 1.5rem;
        font-size: 0.95rem;
    }
}
</style>
