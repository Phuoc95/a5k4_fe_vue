<template>
  <textarea
    :id="id"
    :name="name"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :maxlength="maxLength"
    :rows="rows"
    :class="inputClasses"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  ></textarea>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id?: string
  name?: string
  modelValue?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  maxLength?: number
  rows?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'error'
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'focus'): void
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
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

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
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
  resize: vertical;
  min-height: 120px;
}

.form-control:focus {
  color: #212529;
  background-color: #fff;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.form-control::placeholder {
  color: #6c757d;
  opacity: 1;
}

.form-control:disabled {
  background-color: #e9ecef;
  opacity: 1;
}

.form-control-sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  min-height: 80px;
}

.form-control-lg {
  padding: 1rem 1.25rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
  min-height: 160px;
}

.is-invalid {
  border-color: #dc3545;
}

.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}
</style>