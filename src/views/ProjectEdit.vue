<script setup>
    import { ref } from 'vue'

    import MainHeader from '@/components/MainHeader.vue';
    import MainFooter from '@/components/MainFooter.vue';
    import EditableArgument from '@/components/EditableArgument.vue';
    import { userRole } from '@/main.js';

    const name = ref("");
    const category = ref("");

    const description = ref("");

    const partner = ref("");

    const author = ref("");

    const contact = ref("");

    const curator = ref("");

    var roles = ref([
        ""
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

                    <editable-argument param_name="Название" v-model="name" />

                    <editable-argument param_name="Категория" v-model="category" />

                    <editable-argument large="true" param_name="Описание" v-model="description" />
                </div>

                <div class="column">
                    <editable-argument param_name="Партнер" param_value="" v-model="partner" />

                    <editable-argument param_name="Автор" param_value="" v-model="author"/>

                    <editable-argument param_name="Контактное лицо" param_value="" v-model="contact"/>

                    <editable-argument param_name="Куратор" param_value="" v-model="curator"/>

                    <editable-argument param_name="Необходимые роли" v-model="roles"/>
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
