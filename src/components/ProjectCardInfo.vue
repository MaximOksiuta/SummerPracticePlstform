<script setup>
    import {ref} from 'vue';

    defineProps(['showUserButtons']);

    const project_info = ref({
        image_url: "https://yastatic.net/naydex/yandex-search/pEx1Z9458/yfc3cb8J/9LlQulD8ASm2V6QkLsXYvhcDzv-Mdv2Vl4fqiTBNnrbFqHxPw3OU386nGKsTLPCPeEwzp8JwL2HY8GptlBqu-HE9JT4kOHU4A5LwRVuFWI5HIhsrvWc4NdJWTqz17M6TZVj8KUX0k134IM68kU5HW-1N14bUA-",
        project_name: "Крутое название",
        company_name: "Яндекс",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.`
    });
</script>

<template>
    <div class="elevated max-width project-card">
        <img class="max-width"
            :src="project_info.image_url">
        <div class="p-4 column">
            <h5 class="text-xl text title-color mb-2">
                {{project_info.project_name}}
            </h5>
            <span class="text-m mb-2">
                Компания партнер: {{ project_info.company_name }}
            </span>
            <span class="text-m d-none">
                Сложность: 5/10
            </span>
            <p class="text-xs mt-3 light-gray-color" style="text-align: justify">
                {{ project_info.description }}
            </p>
            <div class="mt-4 d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center hide">
                    <img class="icon-s me-2" src="../assets/check-accent.svg">
                    <span class="text-xs">Есть подходящая вам роль</span>
                </div>
                <img class="icon-s me-2" src="../assets/favorite.svg">
            </div>
        </div>
    </div>
</template>

<style>
.project-card {
    overflow: hidden;
    position: relative;
}

.icon-s {
    width: 25px;
    height: 25px;
}
</style>