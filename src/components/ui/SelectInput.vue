<template>
  <select
    :id="id"
    :name="name"
    :value="modelValue"
    :required="required"
    :disabled="disabled"
    :class="inputClasses"
    @change="handleChange"
    @blur="handleBlur"
    @focus="handleFocus"
  >
    <option v-if="placeholder" value="" disabled>
      {{ placeholder }}
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface Props {
  id?: string
  name?: string
  modelValue?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  options: SelectOption[]
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'error'
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'focus'): void
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'default'
})

const emit = defineEmits<Emits>()

const inputClasses = computed(() => [
  'form-control',
  `form-control-${props.size}`,
  {
    'is-invalid': props.variant === 'error'
  }
])

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}

const handleBlur = () => {
  emit('blur')
}

const handleFocus = () => {
  emit('focus')
}
</script>

<style scoped>
.form-control {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 6 7 7 7-7'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  padding-right: 2.5rem;
}

.form-control:focus {
  color: #212529;
  background-color: #fff;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.form-control:disabled {
  background-color: #e9ecef;
  opacity: 1;
}

.form-control-sm {
  padding: 0.5rem 0.75rem;
  padding-right: 2rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  background-size: 12px 9px;
  background-position: right 0.5rem center;
}

.form-control-lg {
  padding: 1rem 1.25rem;
  padding-right: 3rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
  background-size: 20px 15px;
  background-position: right 1rem center;
}

.is-invalid {
  border-color: #dc3545;
}

.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

option {
  padding: 0.5rem;
}
</style>