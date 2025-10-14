<template>
    <footer class="footer-section">
        <div class="footer-container">
            <div class="footer-content">
                <!-- Company Info -->
                <div class="footer-column">
                    <div class="footer-brand">
                        <h5 class="mb-3">{{ siteInfo.siteName }}</h5>
                        <p class="footer-slogan mb-3">{{ siteInfo.siteSlogan }}</p>
                        <p class="footer-address mb-4">{{ contactInfo.address }}</p>
                        <div class="footer-social d-flex gap-3">
                            <a
                                v-if="socialLinks.facebook"
                                :href="socialLinks.facebook"
                                target="_blank"
                                class="social-link d-flex align-items-center justify-content-center"
                                aria-label="Facebook"
                            >
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a
                                v-if="socialLinks.instagram"
                                :href="socialLinks.instagram"
                                target="_blank"
                                class="social-link d-flex align-items-center justify-content-center"
                                aria-label="Instagram"
                            >
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a
                                v-if="socialLinks.youtube"
                                :href="socialLinks.youtube"
                                target="_blank"
                                class="social-link d-flex align-items-center justify-content-center"
                                aria-label="YouTube"
                            >
                                <i class="fab fa-youtube"></i>
                            </a>
                            <a
                                v-if="socialLinks.zalo"
                                :href="socialLinks.zalo"
                                target="_blank"
                                class="social-link d-flex align-items-center justify-content-center"
                                aria-label="Zalo"
                            >
                                <i class="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="footer-column">
                    <h6 class="mb-4">Liên Kết Nhanh</h6>
                    <ul class="footer-links list-unstyled mb-0">
                        <li class="mb-2">
                            <router-link to="/" class="text-decoration-none">Trang Chủ</router-link>
                        </li>
                        <li class="mb-2">
                            <router-link to="/services" class="text-decoration-none"
                                >Dịch Vụ</router-link
                            >
                        </li>
                        <li class="mb-2">
                            <router-link to="/gallery" class="text-decoration-none"
                                >Thư Viện</router-link
                            >
                        </li>
                        <li class="mb-2">
                            <router-link to="/about" class="text-decoration-none"
                                >Giới Thiệu</router-link
                            >
                        </li>
                        <li class="mb-2">
                            <router-link to="/contact" class="text-decoration-none"
                                >Liên Hệ</router-link
                            >
                        </li>
                    </ul>
                </div>

                <!-- Services -->
                <div class="footer-column">
                    <h6 class="mb-4">Dịch Vụ</h6>
                    <ul class="footer-links list-unstyled mb-0">
                        <li class="mb-2">Tổ Chức Trọn Gói</li>
                        <li class="mb-2">Trang Trí Sân Khấu</li>
                        <li class="mb-2">Âm Thanh Ánh Sáng</li>
                        <li class="mb-2">Chụp Ảnh Quay Phim</li>
                        <li class="mb-2">Dịch Vụ Ẩm Thực</li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div class="footer-column">
                    <h6 class="mb-4">Thông Tin Liên Hệ</h6>
                    <div class="contact-info d-flex flex-column gap-3">
                        <div class="contact-item d-flex align-items-center gap-3">
                            <i class="fas fa-phone"></i>
                            <a
                                :href="`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`"
                                class="text-decoration-none"
                                >{{ contactInfo.phone }}</a
                            >
                        </div>
                        <div class="contact-item d-flex align-items-center gap-3">
                            <i class="fas fa-envelope"></i>
                            <a :href="`mailto:${contactInfo.email}`" class="text-decoration-none">{{
                                contactInfo.email
                            }}</a>
                        </div>
                        <div class="contact-item d-flex align-items-center gap-3">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>{{ contactInfo.address }}</span>
                        </div>
                        <div class="contact-item d-flex align-items-center gap-3">
                            <i class="fas fa-clock"></i>
                            <span>{{ contactInfo.workingHours }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div
                class="footer-bottom border-top border-opacity-25 pt-4 d-flex justify-content-between align-items-center flex-wrap gap-3"
            >
                <div class="footer-copyright">
                    <p class="mb-0">
                        &copy; {{ currentYear }} {{ siteInfo.siteName }}. Tất cả quyền được bảo lưu.
                    </p>
                </div>
                <div class="footer-credit">
                    <p class="mb-0">
                        Được phát triển bởi <a href="#" class="credit-link">Kohino Events Team</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const siteInfo = computed(() => themeStore.siteInfo)
const contactInfo = computed(() => themeStore.contactInfo)
const socialLinks = computed(() => themeStore.socialLinks)

const currentYear = computed(() => {
    if (typeof window !== 'undefined') {
        return new Date().getFullYear()
    }
    return 2024
})
</script>

<style scoped>
:root {
    --footer-bg: #1a1a2e;
    --footer-text: #e6e6e6;
    --footer-text-muted: #a0a0a0;
    --footer-border: rgba(255, 255, 255, 0.1);
    --footer-hover: var(--primary-color);
    --footer-transition: all 0.3s ease;
}

.footer-section {
    background: var(--footer-bg);
    color: var(--footer-text);
    padding: 4rem 0 0;
    position: relative;
    overflow: hidden;
    font-family:
        'Inter',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        Oxygen,
        Ubuntu,
        sans-serif;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
}

.footer-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2.5rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid var(--footer-border);
    margin-bottom: 1.5rem;
}

.footer-column {
    padding: 0 0.5rem;
}

.footer-column h5,
.footer-column h6 {
    color: white;
    font-weight: 600;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    position: relative;
    padding-bottom: 0.75rem;
}

.footer-column h5::after,
.footer-column h6::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    border-radius: 2px;
}

.footer-brand h5 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.footer-slogan {
    color: var(--accent-color);
    margin-bottom: 1.25rem;
    line-height: 1.6;
    font-size: 0.95rem;
    font-weight: 500;
}

.footer-address {
    color: var(--footer-text-muted);
    margin-bottom: 1.5rem;
    line-height: 1.7;
    font-size: 0.9rem;
}

.footer-social {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    color: var(--footer-text);
    transition: var(--footer-transition);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 1rem;
}

.social-link:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-links li {
    margin-bottom: 0.8rem;
    color: var(--footer-text-muted);
    font-size: 0.9rem;
    transition: var(--footer-transition);
    padding-left: 1.25rem;
    position: relative;
}

.footer-links li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-size: 1.2rem;
    line-height: 1;
    top: 0.1em;
}

.footer-links a {
    color: var(--footer-text-muted);
    text-decoration: none;
    transition: var(--footer-transition);
    display: inline-block;
    padding: 0.25rem 0;
}

.footer-links a:hover {
    color: white;
    padding-left: 5px;
}

.contact-item a,
.contact-item span {
    color: var(--footer-text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    transition: var(--footer-transition);
}

.contact-item a:hover {
    color: var(--primary-color);
}

.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .footer-content {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
}

@media (max-width: 768px) {
    .footer-section {
        padding: 3rem 0 2rem;
    }

    .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
    }

    .footer-social {
        justify-content: center;
    }

    .footer-bottom {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }
}

@media (max-width: 576px) {
    .footer-container {
        padding: 0 0.75rem;
    }

    .footer-section {
        padding: 2.5rem 0 1.5rem;
    }

    .footer-social {
        gap: 0.75rem;
    }

    .social-link {
        width: 40px;
        height: 40px;
        font-size: 1.1rem;
    }
}
</style>
