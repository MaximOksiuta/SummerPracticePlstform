<script setup>
    import { ref } from 'vue'

    import MainHeader from '@/components/MainHeader.vue';
    import MainFooter from '@/components/MainFooter.vue';
    import EditableArgument from '@/components/EditableArgument.vue';
    import { userRole, useApi, all_categories, all_companies, all_specialities } from '@/main.js';
    import { useRoute } from 'vue-router';

    const id = ref(useRoute().params.id);
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

    var images = ref([

    ])

    const { sendRequest, isLoading, error } = useApi();

    async function getProjectDetails(){
        try {
            console.log('getProjectDetails');
            const result = await sendRequest('GET', `/projects/detail/${id.value}`);
            console.log('getProjectDetails finish');

            console.log('Data saved:', result);
            name.value = result.name
            category.value = result.category.id
            description.value = result.description
            partner.value = result.company.id
            author.value = result.author
            contact.value = result.contact
            curator.value = result.curator
            roles.value = result.specialities.map((item) => item.id)
            images.value = result.images.map((item) => "https://spp.gradient.fun:8000/api/projects/images/" + item)
            
            id.value = result.id
        } catch (error) {
            console.log(error)
        }
    };

    const fileInput = ref(null);
    const selectedFile = ref(null);

    const uploadFile = async () => {
        if (!selectedFile.value) return;

        const formData = new FormData();
        formData.append('images', selectedFile.value);

        try {
            const response = await sendRequest('POST',`/projects/images/upload/${id.value}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            });
            
            console.log('Файл успешно загружен:', response.data);
            getProjectDetails();
            selectedFile.value = null;
        } catch (error) {
            console.error('Ошибка загрузки файла:', error);
        }
    };

    const handleFileSelect = (event) => {
        const files = event.target.files;
        if (files?.length) {
            selectedFile.value = files[0];
        }
        uploadFile();
    };

    const triggerFileInput = () => {
    fileInput.value.click();
    };

    async function patchProject(data) {
        try {
            const result = await sendRequest('PATCH',`/projects/update/${id.value}`, data);
            console.log('Data saved (patch):', result);
            getProjectDetails();
        } catch {
            console.log(error)
        }
    }

    getProjectDetails();
    
</script>

<template>
    <div class="main-container">
        <main-header :userRole="userRole" />
        <div class="main-content">
            <router-link :to="{ name: 'myProjects' }" class="none-deco font-light text-s cyan-color cursor-pointer">
                Мои проекты / {{name}}
            </router-link>

            <h3 class="font-semibold text-xl mt-5 accent-color">
                Информация о проекте
            </h3>

            <div class="two-columns">
                <div class="column">
                    <editable-argument @apply="patchProject({name: name})" param_name="Название" v-model="name" />
                    <editable-argument @apply="patchProject({category_id: Number(category)})" param_name="Категория" v-model="category" is-dropdown
                        :options="all_categories" />
                    <editable-argument @apply="patchProject({description: description})" large param_name="Описание" v-model="description" />
                </div>

                <div class="column">
                    <editable-argument @apply="patchProject({company_id: Number(partner)})" :onlyRead="userRole === 2" param_name="Партнер" v-model="partner" is-dropdown
                        :options="all_companies" />
                    <editable-argument @apply="patchProject({author: author})" param_name="Автор" v-model="author" />
                    <editable-argument @apply="patchProject({contact: contact})" param_name="Контактное лицо" v-model="contact" />
                    <editable-argument @apply="patchProject({curator: curator})" param_name="Куратор" v-model="curator" />
                    <editable-argument @apply="patchProject({specialities: roles.map((item) => Number(item))})" param_name="Необходимые роли" v-model="roles" is-dropdown multi-instance :options="all_specialities"/>

                </div>
            </div>

            <h3 class="font-semibold text-xl mt-5 accent-color">
                Изображения
            </h3>

            <div style="display: flex; gap: 2%; flex-wrap: wrap; align-content: start;" class="">
                <!-- <div class="edit-box" v-for="theme in [1, 2, 3, 4, 5, 6, 7, 8]"> -->
                    <!-- <div class="hover-editable"> -->
                        <img v-for="image in images" :src="image"
                            class="mt-4 grid-item elevated" />
                            <div @click="triggerFileInput" class="mt-4 grid-item elevated">
                                <div class="d-flex max-width max-height justify-content-center align-items-center">
                                    <img src="../assets/plus-icon.svg" style="height: 50%; margin: auto auto; display: block;">
                                
                                </div>
                            </div>
                            <input
                                type="file"
                                ref="fileInput"
                                accept=".jpg,.jpeg,.png"
                                @change="handleFileSelect"
                                style="display: none"
                            />
                    <!-- </div> -->
                    <!-- <div class="edit-menu center cursor-pointer">
                        <div class="d-flex ">
                            <img class="edit-button me-5 " src="../assets/expand-icon.svg">
                            <img class="edit-button ms-5" src="../assets/trash-icon.svg">
                        </div>
                        
                    </div> -->
                    
                <!-- </div> -->

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
