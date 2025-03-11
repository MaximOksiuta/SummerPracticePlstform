<script setup>
    import { ref } from 'vue'

    import MainHeader from '@/components/MainHeader.vue';
    import MainFooter from '@/components/MainFooter.vue';
    import EditableArgument from '@/components/EditableArgument.vue';
    import { userRole } from '@/main.js';

    const roles = ref([
        "Lorem ipsum dolor",
        "Lorem ipsum odor amet",
        "Lorem ipsum",
        "Lorem",
        "Lorem ipsum odor amet"
    ]);
</script>

<template>
    <div class="main-container">
        <main-header :userRole="userRole" />
        <div class="main-content">
            <router-link :to="{ name: 'main' }" class="none-deco font-light text-s cyan-color cursor-pointer">
                Мои проекты / Название текущего проекта
            </router-link>

            <h3 class="font-semibold text-xl mt-5 accent-color">
                Информация о проекте
            </h3>

            <div class="two-columns">
                <div class="column">
                    <editable-argument param_name="Название проекта" param_value="Некоторое очень крутое название" />

                    <editable-argument large="true" param_name="Описание"
                        param_value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                </div>

                <div class="column">
                    <editable-argument param_name="Партнеры проекта" param_value="- Sitronics-kt" />

                    <editable-argument param_name="Необходимые роли" :param_value="roles" />
                </div>
            </div>

            <h3 class="font-semibold text-xl mt-5 accent-color">
                Изображения
            </h3>

            <div style="display: flex; gap: 2%; flex-wrap: wrap; align-content: start;">
                <div class="edit-box" v-for="theme in [1, 2, 3, 4, 5, 6, 7, 8]">
                    <div class="hover-editable">
                        <img src="https://yastatic.net/naydex/yandex-search/pEx1Z9458/yfc3cb8J/9LlQulD8ASm2V6QkLsXYvhcDzv-Mdv2Vl4fqiTBNnrbFqHxPw3OU386nGKsTLPCPeEwzp8JwL2HY8GptlBqu-HE9JT4kOHU4A5LwRVuFWI5HIhsrvWc4NdJWTqz17M6TZVj8KUX0k134IM68kU5HW-1N14bUA-"
                            class="mt-4 grid-item elevated" />
                    </div>
                    <div class="edit-menu center cursor-pointer">
                        <div class="d-flex ">
                            <img class="edit-button me-5 " src="../assets/expand-icon.svg">
                            <img class="edit-button ms-5" src="../assets/trash-icon.svg">
                        </div>
                        
                    </div>
                    
                </div>

            </div>
        </div>
        <main-footer />
    </div>
</template>

<style>
@media (min-width: 800px) {
    .two-columns {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .two-columns>* {
        width: 48%;
    }
}
</style>
