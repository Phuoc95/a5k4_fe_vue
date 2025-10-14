<template>
  <div class="service-contact-form">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="form-container">
            <div class="form-header">
              <h2 class="form-title">Đăng Ký Dịch Vụ</h2>
              <p class="form-subtitle">
                Điền thông tin để chúng tôi có thể tư vấn dịch vụ phù hợp nhất cho bạn
              </p>
            </div>

            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name" class="form-label">
                      <i class="fas fa-user me-2"></i>
                      Họ và tên *
                    </label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      class="form-control"
                      placeholder="Nhập họ và tên của bạn"
                      required
                    />
                    <div v-if="errors.name" class="error-message">
                      {{ errors.name }}
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="email" class="form-label">
                      <i class="fas fa-envelope me-2"></i>
                      Email *
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      class="form-control"
                      placeholder="Nhập địa chỉ email"
                      required
                    />
                    <div v-if="errors.email" class="error-message">
                      {{ errors.email }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="phone" class="form-label">
                      <i class="fas fa-phone me-2"></i>
                      Số điện thoại *
                    </label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="form-control"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                    <div v-if="errors.phone" class="error-message">
                      {{ errors.phone }}
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="service" class="form-label">
                      <i class="fas fa-cog me-2"></i>
                      Dịch vụ quan tâm
                    </label>
                    <select
                      id="service"
                      v-model="form.service_id"
                      class="form-control"
                    >
                      <option value="">Chọn dịch vụ (tùy chọn)</option>
                      <option
                        v-for="service in services"
                        :key="service.service_id"
                        :value="service.service_id"
                      >
                        {{ service.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="date" class="form-label">
                      <i class="fas fa-calendar me-2"></i>
                      Ngày dự kiến
                    </label>
                    <input
                      id="date"
                      v-model="form.preferred_date"
                      type="date"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="budget" class="form-label">
                      <i class="fas fa-money-bill-wave me-2"></i>
                      Ngân sách dự kiến
                    </label>
                    <select
                      id="budget"
                      v-model="form.budget"
                      class="form-control"
                    >
                      <option value="">Chọn mức ngân sách</option>
                      <option value="5000000">Dưới 5 triệu</option>
                      <option value="10000000">5 - 10 triệu</option>
                      <option value="20000000">10 - 20 triệu</option>
                      <option value="50000000">20 - 50 triệu</option>
                      <option value="100000000">Trên 50 triệu</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">
                  <i class="fas fa-comment me-2"></i>
                  Nội dung yêu cầu *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="form-control"
                  rows="5"
                  placeholder="Mô tả chi tiết về sự kiện và yêu cầu của bạn..."
                  required
                ></textarea>
                <div v-if="errors.message" class="error-message">
                  {{ errors.message }}
                </div>
              </div>

              <div class="form-actions">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg submit-btn"
                  :disabled="loading"
                >
                  <i v-if="loading" class="fas fa-spinner fa-spin me-2"></i>
                  <i v-else class="fas fa-paper-plane me-2"></i>
                  {{ loading ? 'Đang gửi...' : 'Gửi Yêu Cầu' }}
                </button>
              </div>

              <div v-if="submitMessage" class="alert alert-success mt-3">
                <i class="fas fa-check-circle me-2"></i>
                {{ submitMessage }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useServicesStore } from '@/stores/services'
import type { ServiceContactForm } from '@/types/service'

const servicesStore = useServicesStore()

// State
const loading = ref(false)
const submitMessage = ref('')
const errors = reactive<Record<string, string>>({})
const flag = reactive<Record<boolean, boolean>>({})

const form = reactive<ServiceContactForm>({
  name: '',
  email: '',
  phone: '',
  message: '',
  service_id: undefined,
  preferred_date: '',
  budget: undefined
})

// Computed
const services = computed(() => servicesStore.activeServices)

// Methods
const validateForm = (): boolean => {
  errors.name = ''
  errors.email = ''
  errors.phone = ''
  errors.message = ''

  let isValid = true

  if (!form.name.trim()) {
    errors.name = 'Vui lòng nhập họ và tên'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Vui lòng nhập email'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Email không hợp lệ'
    isValid = false
  }

  if (!form.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại'
    isValid = false
  } else if (!/^[0-9+\-\s()]+$/.test(form.phone)) {
    errors.phone = 'Số điện thoại không hợp lệ'
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Vui lòng nhập nội dung yêu cầu'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true
  submitMessage.value = ''

  try {
    const result = await servicesStore.submitContactForm(form)
    submitMessage.value = result.message || 'Yêu cầu đã được gửi thành công!'

    // Reset form
    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      message: '',
      service_id: undefined,
      preferred_date: '',
      budget: undefined
    })
  } catch (error) {
    console.error('Error submitting form:', error)
    submitMessage.value = 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.'
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await servicesStore.fetchServices()
})
</script>

<style scoped>
.service-contact-form {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.form-container {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.form-header {
  text-align: center;
  margin-bottom: 3rem;
}

.form-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.form-subtitle {
  font-size: 1.1rem;
  color: #6c757d;
  margin: 0;
  line-height: 1.6;
}

.contact-form {
  max-width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-control {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-control::placeholder {
  color: #adb5bd;
  font-style: italic;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
}

.error-message::before {
  content: '⚠️';
  margin-right: 0.25rem;
}

.form-actions {
  text-align: center;
  margin-top: 2rem;
}

.submit-btn {
  padding: 1rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  min-width: 200px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.alert {
  padding: 1rem 1.5rem;
  border-radius: 10px;
  border: none;
  font-weight: 500;
}

.alert-success {
  background: rgba(40, 167, 69, 0.1);
  color: #155724;
  border: 1px solid rgba(40, 167, 69, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .service-contact-form {
    padding: 3rem 0;
  }

  .form-container {
    padding: 2rem;
  }

  .form-title {
    font-size: 2rem;
  }

  .form-subtitle {
    font-size: 1rem;
  }

  .submit-btn {
    padding: 0.875rem 2rem;
    font-size: 1rem;
    min-width: 180px;
  }
}

@media (max-width: 576px) {
  .form-container {
    padding: 1.5rem;
    margin: 0 1rem;
  }

  .form-title {
    font-size: 1.75rem;
  }

  .form-control {
    padding: 0.75rem;
    font-size: 0.95rem;
  }

  .submit-btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    min-width: 160px;
  }
}
</style>
