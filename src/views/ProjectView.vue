<script setup>
import { ref } from 'vue';
import UDropDown from '../components/UDropDown.vue'
import ProjectCardInfo from '../components/ProjectCardInfo.vue'
import InfoArgument from '@/components/InfoArgument.vue';
import MainHeader from '../components/MainHeader.vue';
import MainFooter from '../components/MainFooter.vue'
import { useRoute } from 'vue-router';
import { userRole, useApi } from '@/main.js';

const { sendRequest, isLoading, error } = useApi();

const project_info = ref({});

async function getProjectDetails(){
    try {
        const result = await sendRequest('GET', `/projects/detail/${useRoute().params.id}`);
        console.log('Data saved:', result);

        project_info.value = {
            project_name: result.name,
            description: result.description,
            category: "",
            company_name: result.company.name,
            specialities: result.specialities.map( (item) => item.name ),
            curator: result.curator,
            images_url: result.images.map((item) => "https://spp.gradient.fun:8000/api/projects/images/" + item)
        }
    } catch {
        console.log(error)
    }
};
getProjectDetails();


</script>

<template>
    <div class="main-container">
        <main-header :userRole="userRole" />
        <div v-if="!isLoading" class="main-content d-flex-column align-items-center max-width">
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
                    
                    <info-argument param_name="Описание" :param_value="project_info.description" text_justify/>
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