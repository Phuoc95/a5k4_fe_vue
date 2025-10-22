<template>
  <div class="form-field" :class="{ 'has-error': hasError }">
    <label v-if="label" :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <slot />

    <div v-if="hasError" class="form-error">
      {{ errorMessage }}
    </div>

    <div v-if="helpText && !hasError" class="form-help">
      {{ helpText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id?: string
  label?: string
  required?: boolean
  errorMessage?: string
  helpText?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false
})

const hasError = computed(() => !!props.errorMessage)
</script>

<style scoped>
.form-field {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.95rem;
}

.text-danger {
  color: #dc3545;
  margin-left: 0.25rem;
}

.form-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.form-error::before {
  content: '⚠';
  font-size: 0.75rem;
}

.form-help {
  color: #6c757d;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-field.has-error .form-control {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.form-field.has-error .form-control:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
</style>
