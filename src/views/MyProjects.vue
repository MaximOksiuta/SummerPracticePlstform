<script setup>
    import { ref } from 'vue';
    import ProjectCardInfo from '../components/ProjectCardInfo.vue'
    import MainHeader from '../components/MainHeader.vue';
    import MainFooter from '../components/MainFooter.vue'
    import { useRouter } from 'vue-router';
    import { userRole } from '@/main.js';


    const themes = ref([
        "IT",
        "Biology",
        "Chemistry"
    ]);

    const router = useRouter();

    const navigateToEdit = (id) => {
        router.push('/edit')
    }
</script>

<template>
    <div class="main-container">
        <main-header :userRole="userRole" />
        <div class="main-content">
            <div class="d-flex justify-content-between align-items-center">
                <input class="form-control" type="search" placeholder="Поиск по названию" style="max-width: 500px;">
                <router-link :to="{ name: 'newProject' }"
                class="ms-5 none-deco default-text-color font-semibold text-xl cursor-pointer">Доска проектов</router-link>
            
                
            </div>
            <div style="display: flex; gap: 2%; flex-wrap: wrap; align-content: start;">
                <project-card-info @click="navigateToEdit(0)" v-for="theme in themes" class="mt-4 grid-item" />
            </div>

        </div>
        <main-footer />
    </div>
</template>