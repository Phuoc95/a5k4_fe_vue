<template>
    <div class="contact-page">
        <!-- Page Header -->
        <section class="page-header">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="page-title">Liên Hệ Với Chúng Tôi</h1>
                        <nav aria-label="breadcrumb" class="breadcrumb-nav">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <router-link to="/" class="breadcrumb-link"
                                        >Trang Chủ</router-link
                                    >
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Liên Hệ</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="contact-section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <ContactInfoSection />
                    </div>
                    <div class="col-lg-6">
                        <FormField
                            id="phone"
                            label="Số Điện Thoại"
                            help-text="Số điện thoại không bắt buộc"
                        >
                            <TextInput
                                id="phone"
                                name="phone"
                                type="tel"
                                v-model="form.phone"
                                placeholder="Nhập số điện thoại (không bắt buộc)"
                            />
                        </FormField>

                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>

        <!-- Map Section -->
        <!--    <MapSection />-->
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useContactStore } from '@/stores/contact'
import ContactInfoSection from '@/components/contact/ContactInfoSection.vue'
import ContactForm from '@/components/contact/ContactForm.vue'
import TextInput from '@/components/ui/TextInput.vue'
import FormField from '@/components/ui/FormField.vue'
// import MapSection from '@/components/contact/MapSection.vue'

const contactStore = useContactStore()

onMounted(() => {
    // Load contact data when component mounts
    contactStore.loadContactInfo()
})

const form = ref({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: '',
})
</script>

<style scoped>
.contact-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.page-header {
    background: linear-gradient(135deg, #0d6efd 0%, #fd7e14 100%);
    color: white;
    padding: 4rem 0 3rem;
    position: relative;
    overflow: hidden;
}

.page-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
}

.page-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
    position: relative;
    z-index: 1;
}

.breadcrumb-nav {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
}

.breadcrumb {
    display: flex;
    flex-wrap: wrap;
    padding: 0.75rem 1rem;
    margin-bottom: 0;
    list-style: none;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    backdrop-filter: blur(10px);
}

.breadcrumb-item {
    display: flex;
    align-items: center;
}

.breadcrumb-item + .breadcrumb-item::before {
    content: '>';
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0.5rem;
    font-weight: 600;
}

.breadcrumb-item.active {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
}

.breadcrumb-link {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
}

.breadcrumb-link:hover {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: underline;
}

.contact-section {
    padding: 4rem 0;
    position: relative;
}

.contact-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%230d6efd" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
    opacity: 0.5;
}

/* Animation */
.page-header {
    animation: slideInDown 0.8s ease-out;
}

.contact-section {
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .page-header {
        padding: 3rem 0 2rem;
    }

    .page-title {
        font-size: 2.5rem;
    }

    .contact-section {
        padding: 3rem 0;
    }

    .breadcrumb {
        padding: 0.5rem 0.75rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 576px) {
    .page-header {
        padding: 2.5rem 0 1.5rem;
    }

    .page-title {
        font-size: 2rem;
    }

    .contact-section {
        padding: 2rem 0;
    }

    .breadcrumb {
        flex-direction: column;
        text-align: center;
        gap: 0.25rem;
    }

    .breadcrumb-item + .breadcrumb-item::before {
        display: none;
    }
}
</style>
