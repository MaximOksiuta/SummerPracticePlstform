<script setup>
    import { ref } from 'vue';
    import UDropDown from '../components/UDropDown.vue'
    import ProjectCardInfo from '../components/ProjectCardInfo.vue'
    import MainHeader from '../components/MainHeader.vue';
    import MainFooter from '../components/MainFooter.vue'
    import { useRouter } from 'vue-router';
    import { userRole, all_projects, all_categories, all_companies } from '@/main.js';

    const themes = ref([
        "IT",
        "Biology",
        "Chemistry"
    ]);

    const router = useRouter();

    const openDetails = (id) => {
        if (userRole === 3){
            router.push('/edit')
        } else{
            router.push({name: 'details', params: {id: 123}})
        }
        
    }

    const selectedCategories = ref([]);
    const selectedCompanies = ref([]);

</script>

<template>
    <div class="main-container">
        <main-header :userRole="userRole" />
        <div class="main-content">
            <div class="d-flex justify-content-start max-width align-items-center">
                <h4 class="font-regular m-0">Фильтры поиска: </h4>
                <div class="d-flex justify-content-start align-items-center flex-wrap">
                    <u-drop-down v-model="selectedCategories" buttonText="Сфера проекта" commonButtonText="Все сферы" :listargs="all_categories"></u-drop-down>
                    <u-drop-down v-model="selectedCompanies" buttonText="Компания партнер" commonButtonText="Все компании" :listargs="all_companies"></u-drop-down>
                    <!-- <u-drop-down class="d-none" buttonText="Сложность" commonButtonText="Любая сложность"
                        :listargs=themes></u-drop-down>
                    <u-drop-down class="d-none"  buttonText="Статус проекта" commonButtonText="Любой статус"
                        :listargs=themes></u-drop-down> -->

                    <div class="form-check d-none">
                        <label class="d-flex align-items-center">
                            <span class="light-gray-color" for="remember">
                                Есть подходящая роль:
                            </span>
                            <input class="form-check-input mb-1 ms-3" style="align-self: center;" type="checkbox"
                                id="remember">
                        </label>
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 2%; flex-wrap: wrap; align-content: start;">
                <project-card-info @click="openDetails(0)" v-for="project in all_projects" :projectInfo="project" class="mt-4 grid-item" />
            </div>

        </div>
        <main-footer />
    </div>
</template>