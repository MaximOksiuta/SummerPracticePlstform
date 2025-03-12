<script setup>
    import { ref, computed } from 'vue';
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
            router.push({name: 'projectEdit', params: {id: id}})
        } else{
            router.push({name: 'details', params: {id: id}})
        }
        
    }

    const selectedCategories = ref([]);
    const selectedCompanies = ref([]);

    const filteredProjects = computed ( () => {
        return all_projects.value.filter( (item) => (selectedCategories.value.length === 0 || selectedCategories.value.indexOf(item.category_id) !== -1) && (selectedCompanies.value.length === 0 || selectedCompanies.value.indexOf(item.company_id) !== -1))
    })
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
                <project-card-info @click="openDetails(project.id)" v-for="project in filteredProjects" :key="project.id" :projectInfo="project" class="mt-4 grid-item" />
            </div>

        </div>
        <main-footer />
    </div>
</template>