# Migration Plan: Laravel Blade Contact Page to Vue.js

## Overview
This document outlines the migration plan for converting the Laravel Blade `/contact` page from the `a5k4` backend to the Vue.js frontend in `a5k4_fe`.

## Current State Analysis

### Laravel Backend (a5k4)
- **Route**: `/contact` handled by `ContactController@index`
- **Form Submission**: `/contact/submit` handled by `ContactController@store`
- **Template**: `resources/views/frontend/pages/contact.blade.php`
- **Features**:
  - Contact information display (address, phone, email, working hours)
  - Contact form with validation
  - Google Maps embed
  - Form submission with email notification
  - Success/error message handling
- **Data Structure**:
  - Contact info from settings (via ViewComposerServiceProvider)
  - Form validation rules
  - Email sending capability
  - Database storage for contact submissions

### Vue Frontend (a5k4_fe)
- **Route**: `/contact` already configured in router
- **Component**: `src/views/ContactView.vue` (basic placeholder)
- **Existing Components**:
  - `ContactCTA.vue` (partial contact info display)
  - `Footer.vue` (contact info in footer)
  - Theme store with contact info structure
- **Missing Features**:
  - Contact form implementation
  - Form validation
  - API integration
  - Map display
  - Form submission handling

## Migration Tasks

### Phase 1: Data Structure & API Setup
- [ ] **1.1** Create contact form interfaces
  - Add `ContactForm` interface in `src/types/contact.ts`
  - Define form fields (name, email, phone, subject, message, service)
  - Add validation rules interface
  
- [ ] **1.2** Create contact page data interface
  - Add `ContactPageData` interface
  - Include contact info, map embed, and form configuration
  
- [ ] **1.3** Update Laravel API endpoints
  - Create `/api/contact` endpoint for contact info
  - Update `ContactController@store` to handle JSON requests
  - Add proper CORS configuration
  - Return structured JSON responses

- [ ] **1.4** Create contact form submission endpoint
  - `POST /api/contact/submit` endpoint
  - Validate form data
  - Send email notifications
  - Store in database
  - Return success/error responses

### Phase 2: Vue Components Development
- [ ] **2.1** Create contact info section component
  - `src/components/contact/ContactInfoSection.vue`
  - Display contact details (address, phone, email, hours)
  - Responsive layout with icons
  - Use existing theme store data
  
- [ ] **2.2** Create contact form component
  - `src/components/contact/ContactForm.vue`
  - Form fields with validation
  - Loading states and error handling
  - Success/error message display
  
- [ ] **2.3** Create map section component
  - `src/components/contact/MapSection.vue`
  - Google Maps embed display
  - Responsive iframe handling
  - Fallback for missing map data
  
- [ ] **2.4** Create form field components
  - `src/components/ui/FormField.vue` (reusable)
  - `src/components/ui/TextInput.vue`
  - `src/components/ui/TextArea.vue`
  - `src/components/ui/SelectInput.vue`

### Phase 3: Store & State Management
- [ ] **3.1** Create contact store
  - `src/stores/contact.ts`
  - Contact info state
  - Form submission state
  - Loading and error states
  
- [ ] **3.2** Add form validation
  - Client-side validation rules
  - Real-time validation feedback
  - Error message display
  
- [ ] **3.3** Add API integration
  - Contact info loading
  - Form submission handling
  - Error handling and retry logic

### Phase 4: Main Contact Page Implementation
- [ ] **4.1** Update `ContactView.vue`
  - Replace placeholder content
  - Import and use all contact components
  - Add proper layout structure
  - Implement responsive design
  
- [ ] **4.2** Add page header section
  - Breadcrumb navigation
  - Page title and description
  - Consistent with other pages
  
- [ ] **4.3** Implement form submission flow
  - Form validation before submission
  - Loading states during submission
  - Success/error message handling
  - Form reset after successful submission

### Phase 5: Styling & UX
- [ ] **5.1** Create contact page styles
  - Consistent with existing design system
  - Custom CSS for contact-specific sections
  - Form styling and validation states
  
- [ ] **5.2** Add animations and transitions
  - Form field focus animations
  - Loading spinners
  - Success/error message animations
  - Smooth page transitions
  
- [ ] **5.3** Improve accessibility
  - Proper form labels and ARIA attributes
  - Keyboard navigation support
  - Screen reader compatibility
  - Focus management

### Phase 6: Integration & Testing
- [ ] **6.1** API integration testing
  - Test contact info loading
  - Test form submission
  - Test error handling scenarios
  
- [ ] **6.2** Form validation testing
  - Test all validation rules
  - Test edge cases and error states
  - Test form reset functionality
  
- [ ] **6.3** Cross-browser testing
  - Test on different browsers
  - Test responsive design
  - Test form functionality across devices

## File Structure After Migration

```
a5k4_fe/vue-frontend/src/
├── components/
│   ├── contact/
│   │   ├── ContactInfoSection.vue
│   │   ├── ContactForm.vue
│   │   └── MapSection.vue
│   └── ui/
│       ├── FormField.vue
│       ├── TextInput.vue
│       ├── TextArea.vue
│       └── SelectInput.vue
├── types/
│   └── contact.ts
├── stores/
│   └── contact.ts
└── views/
    └── ContactView.vue (updated)
```

## Data Mapping

### Laravel Blade → Vue.js
```php
// Laravel Controller Data
$contact = $settingService->getGroup('contact');
// Contains: phone, email, address, working_hours, map_embed
```

```typescript
// Vue Store Data
interface ContactInfo {
  phone: string
  email: string
  address: string
  workingHours: string
  mapEmbed: string
}
```

### Form Data Structure
```typescript
interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  service?: string
}

interface ContactFormValidation {
  name: { required: boolean, minLength: number }
  email: { required: boolean, pattern: RegExp }
  phone: { pattern: RegExp }
  subject: { required: boolean, maxLength: number }
  message: { required: boolean, minLength: number, maxLength: number }
}
```

## API Endpoints Required

### Laravel Backend
- `GET /api/contact` - Get contact information
- `POST /api/contact/submit` - Submit contact form

### Response Formats

#### Contact Info Response
```json
{
  "success": true,
  "data": {
    "phone": "+84 123 456 789",
    "email": "info@dichvucuoihoidep.com",
    "address": "123 Đường ABC, Quận 1, TP.HCM",
    "workingHours": "Thứ 2 - Thứ 6: 8:00 - 18:00",
    "mapEmbed": "<iframe src=\"https://www.google.com/maps/embed?...\" width=\"100%\" height=\"400\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>"
  }
}
```

#### Form Submission Response
```json
{
  "success": true,
  "message": "Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi lại sớm nhất có thể.",
  "data": {
    "id": 123,
    "submittedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại sau.",
  "errors": {
    "email": ["Địa chỉ email không hợp lệ"],
    "message": ["Nội dung tin nhắn phải có ít nhất 10 ký tự"]
  }
}
```

## Form Validation Rules

### Client-side Validation
```typescript
const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 255
  },
  phone: {
    pattern: /^[0-9\-\+\(\)\s]+$/,
    maxLength: 20
  },
  subject: {
    required: true,
    maxLength: 255
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 2000
  }
}
```

## Component Architecture

### ContactView.vue Structure
```vue
<template>
  <div class="contact-page">
    <!-- Page Header -->
    <ContactHeader />
    
    <!-- Contact Info & Form -->
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <ContactInfoSection />
        </div>
        <div class="col-lg-6">
          <ContactForm />
        </div>
      </div>
    </div>
    
    <!-- Map Section -->
    <MapSection />
  </div>
</template>
```

### ContactForm.vue Features
- Form validation with real-time feedback
- Loading states during submission
- Success/error message display
- Form reset after successful submission
- Accessibility features

## Timeline Estimate
- **Phase 1**: 2-3 days (Data structure & API)
- **Phase 2**: 3-4 days (Components development)
- **Phase 3**: 2-3 days (Store & State management)
- **Phase 4**: 2-3 days (Main page implementation)
- **Phase 5**: 2-3 days (Styling & UX)
- **Phase 6**: 2-3 days (Integration & Testing)

**Total Estimated Time**: 13-19 days

## Dependencies
- Vue 3 Composition API
- Pinia for state management
- TypeScript for type safety
- Axios for API calls
- Form validation library (VeeValidate or custom)
- Google Maps API (if needed)

## Notes
- Maintain consistency with existing design system
- Ensure mobile responsiveness
- Follow Vue.js best practices
- Keep components reusable and modular
- Implement proper error handling and loading states
- Consider adding CAPTCHA for spam protection
- Add form analytics tracking
- Implement proper SEO meta tags for contact page