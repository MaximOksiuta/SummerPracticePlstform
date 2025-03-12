<script setup>
    import { ref, computed } from 'vue';
    import ProjectCardInfo from '../components/ProjectCardInfo.vue'
    import MainHeader from '../components/MainHeader.vue';
    import MainFooter from '../components/MainFooter.vue'
    import { useRouter } from 'vue-router';
    import { userRole, all_projects, userCompany } from '@/main.js';

    const router = useRouter();

    const navigateToEdit = (id) => {
        router.push({name: 'projectEdit', params: {id: id}})
    };

    const searchState = ref("");

    const filteredProjects = computed ( () => {
        return all_projects.value.filter( (project) => {
            return (project.company_id === userCompany.value) && ((project.name.toLowerCase().indexOf(searchState.value.toLowerCase()) !== -1) || (project.description.toLowerCase().indexOf(searchState.value.toLowerCase()) !== -1))
        });
    });


</script>

<template>
    <div class="main-container">
        <main-header :userRole="userRole" />
        <div class="main-content">
            <div class="d-flex justify-content-between align-items-center">
                <input class="form-control" type="search" placeholder="Поиск по названию" v-model="searchState" style="max-width: 500px;">
                <router-link :to="{ name: 'newProject' }"
                class="ms-5 none-deco title-color font-regular text-s cursor-pointer">Создать новый проект</router-link>
            </div>
            <div style="display: flex; gap: 2%; flex-wrap: wrap; align-content: start;">
                <project-card-info @click="navigateToEdit(project.id)" v-for="project in filteredProjects" :key= "project.id" :projectInfo="project" class="mt-4 grid-item" />
            </div>
            <!-- <p v-else class="max-width center-text mt-5">Пока что не добавлено ни одного проекта</p> -->

        </div>
        <main-footer />
    </div>
</template>