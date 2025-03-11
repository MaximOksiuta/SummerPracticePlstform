<script setup>
import { ref } from 'vue';
import UDropDown from '../components/UDropDown.vue'
import ProjectCardInfo from '../components/ProjectCardInfo.vue'
import InfoArgument from '@/components/InfoArgument.vue';
import MainHeader from '../components/MainHeader.vue';
import MainFooter from '../components/MainFooter.vue'
import { useRouter } from 'vue-router';

const userRole = ref(-1);

const themes = ref([
    "IT",
    "Biology",
    "Chemistry"
]);

const router = useRouter();

const navigateToEdit = (id) => {
    router.push('/edit')
};

const project_info = ref({
    project_name: "Крутое название",
    image_urls: ["https://yastatic.net/naydex/yandex-search/pEx1Z9458/yfc3cb8J/9LlQulD8ASm2V6QkLsXYvhcDzv-Mdv2Vl4fqiTBNnrbFqHxPw3OU386nGKsTLPCPeEwzp8JwL2HY8GptlBqu-HE9JT4kOHU4A5LwRVuFWI5HIhsrvWc4NdJWTqz17M6TZVj8KUX0k134IM68kU5HW-1N14bUA-", "https://yastatic.net/naydex/yandex-search/pEx1Z9458/yfc3cb8J/9LlQulD8ASm2V6QkLsXYvhcDzv-Mdv2Vl4fqiTBNnrbFqHxPw3OU386nGKsTLPCPeEwzp8JwL2HY8GptlBqu-HE9JT4kOHU4A5LwRVuFWI5HIhsrvWc4NdJWTqz17M6TZVj8KUX0k134IM68kU5HW-1N14bUA-", "https://yastatic.net/naydex/yandex-search/pEx1Z9458/yfc3cb8J/9LlQulD8ASm2V6QkLsXYvhcDzv-Mdv2Vl4fqiTBNnrbFqHxPw3OU386nGKsTLPCPeEwzp8JwL2HY8GptlBqu-HE9JT4kOHU4A5LwRVuFWI5HIhsrvWc4NdJWTqz17M6TZVj8KUX0k134IM68kU5HW-1N14bUA-"],
    category: "Engeeniring",
    company_name: "Яндекс",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.`,
    specialities: ['Frontend developer', 'Backend developer', 'ML engenier', 'Dev-Ops'],
    curator: "Старый лях"
});
</script>

<template>
    <div class="main-container">
        <main-header :userRole="userRole" />
        <div class="main-content d-flex-column align-items-center max-width">
            <h1 class="center-text title-color font-medium">
                {{ project_info.project_name }}
            </h1>

            <div id="carouselExample" class="carousel slide mt-5" style="width: 100%; margin-left: auto; margin-right: auto;">
                <div class="carousel-inner">
                    <div class="carousel-indicators d-none">
                        <button v-for="(image, index) in project_info.image_urls" type="button"
                            data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="index"
                            v-bind:class="(index === 0) ? 'active' : ''" :aria-current="index === 0"
                            aria-label="Slide {{ index }}"></button>
                    </div>
                    <div v-for="(image, index) in project_info.image_urls" class="carousel-item"
                        v-bind:class="(index === 0) ? 'active' : ''">
                        <img :src="image" class="d-block w-100">
                    </div>

                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div class="two-columns mt-4 ms-3 me-3">
                <div class="column align-items-center">
                    <info-argument param_name="Компания партнер" :param_value="project_info.company_name"/>
                    
                    <info-argument param_name="Описание" :param_value="project_info.description"/>
                </div>

                <div class="column">
                    <info-argument param_name="Куратор" :param_value="project_info.curator"/>

                    <info-argument param_name="Сфера проекта" :param_value="project_info.category"/>

                    <info-argument param_name="Необходимые специалисты" :param_value="project_info.specialities"/>

                </div>
            </div>
        </div>
        <main-footer />
    </div>
</template>