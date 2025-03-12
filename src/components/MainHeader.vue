<script setup>
    import { useRouter } from 'vue-router';

    defineProps(['userRole']);

    const router = useRouter();

    const navigateToLogin = () => {
        router.push('/auth')
    }
</script>

<template>
    <div class="header d-flex p-4 align-items-center justify-content-between">
        <div class="d-flex align-items-center">
            <img class="top-logo" src="../assets/big-logo.png">
            <router-link :to="{ name: 'main' }"
                class="ms-5 none-deco default-text-color font-semibold text-xl cursor-pointer">Доска проектов</router-link>
            <router-link v-if="userRole === 1" :to="{ name: 'myApplications' }"
                class="ms-5 none-deco default-text-color font-semibold text-xl cursor-pointer">Мои заявки</router-link>

            <router-link v-if="userRole === 2" :to="{ name: 'myProjects' }"
                class="ms-5 none-deco default-text-color font-semibold text-xl cursor-pointer">Мои проекты</router-link>
        </div>

        <div v-if="userRole !== -1" class="d-flex align-items-center">
            <img class="header-icon me-3 cursor-pointer" src="../assets/notifications.svg">
            <img v-if="userRole === 1" class="header-icon me-3 cursor-pointer d-none" src="../assets/favorite.svg">
            <div class="circle gray-background top-logo center-content cursor-pointer">
                <span class="font-light text-xs" style="color: var(--light-gray);">ИИ</span>
            </div>
        </div>

        <div v-else @click="navigateToLogin" class="d-flex align-items-center cursor-pointer">
            <img class="header-icon me-2" src="../assets/profile.svg">
            <span class="font-semibold cyan-color text-s">Вход</span>
        </div>
    </div>
</template>

<style>
.top-logo {
    max-height: 35px;
}

.header-icon {
    max-height: 20px;
}

.circle {
    border-radius: 50%;
    width: 35px;
    height: 35px;
}
</style>