<script setup>
import { ref } from 'vue'

import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';
import EditableArgument from '@/components/EditableArgument.vue';
import { useRouter } from 'vue-router';
import { userRole, useApi, all_categories, all_companies, all_specialities } from '@/main.js';

const { sendRequest, isLoading, error } = useApi();
const router = useRouter();


const name = ref("");
const category = ref(-1);

const description = ref("");

const partner = ref(-1);

const author = ref("");

const contact = ref("");

const curator = ref("");

var roles = ref([
    -1
]);

const navigateToEdit = (id) => {
        router.push({name: 'projectEdit', params: {id: id}})
    };

async function createProject() {
  try {
    const result = await sendRequest(
      'POST',
      '/projects/create',
      {
        name: name.value,
        description: description.value,
        author: author.value,
        contact: contact.value,
        curator: curator.value,
        company_id: Number(partner.value),
        category_id: Number(category.value),
        specialities: roles.value.map((item) => Number(item))
      }
    );
    console.log('Data saved:', result);
    navigateToEdit(result.id);
  } catch {
    console.log(error)
  }
}

</script>

<template>
    <div class="main-container">
        <main-header :userRole="userRole" />
        <div class="main-content align-items-center" style="max-width: 800px;">
            <h2 class="font-semibold text-xxl mt-3 accent-color text-center">
                Создание проекта
            </h2>

            <h3 class="font-semibold text-xl mt-5 accent-color">
                Информация
            </h3>

            <editable-argument is_edit param_name="Название" v-model="name" />

            <editable-argument is_edit param_name="Категория" v-model="category" is-dropdown
                :options="all_categories" />

            <editable-argument is_edit large param_name="Описание" v-model="description" />

            <editable-argument is_edit param_name="Партнер" v-model="partner" is-dropdown
                :options="all_companies" />

            <editable-argument is_edit param_name="Автор" v-model="author" />

            <editable-argument is_edit param_name="Контактное лицо" v-model="contact" />

            <editable-argument is_edit param_name="Куратор" v-model="curator" />

            <editable-argument is_edit param_name="Необходимые роли" v-model="roles" is-dropdown multi-instance :options="all_specialities"/>

            <button @click="roles.push(-1);" class="btn btn-secondary max-width mt-4">Добавить новую роль</button>

            <h3 class="font-semibold text-xl mt-5 accent-color d-none">
                Изображения
            </h3>

            <div style="display: flex; gap: 2%; flex-wrap: wrap; align-content: start;" class="d-none">
                <div class="edit-box" v-for="theme in [1, 2, 3, 4, 5, 6, 7, 8]">
                    <div class="hover-editable">
                        <img src="https://yastatic.net/naydex/yandex-search/pEx1Z9458/yfc3cb8J/9LlQulD8ASm2V6QkLsXYvhcDzv-Mdv2Vl4fqiTBNnrbFqHxPw3OU386nGKsTLPCPeEwzp8JwL2HY8GptlBqu-HE9JT4kOHU4A5LwRVuFWI5HIhsrvWc4NdJWTqz17M6TZVj8KUX0k134IM68kU5HW-1N14bUA-"
                            class="mt-4 grid-item elevated" />
                    </div>
                    <div class="edit-menu center cursor-pointer">
                        <div class="d-flex">
                            <img class="edit-button me-5 " src="../assets/expand-icon.svg">
                            <img class="edit-button ms-5" src="../assets/trash-icon.svg">
                        </div>
                    </div>
                </div>
            </div>

            <button @click="createProject" class="btn btn-primary max-width mt-5">Создать проект</button>
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
