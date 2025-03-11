<script setup>
    import { ref } from 'vue';

    defineProps(['param_name', 'param_value', 'large']);
    const now_edit = ref(false);
</script>

<template>
    <div style="position: ">
        <div class="mt-3">
            <h5 class="font-semibold text-s mb-1 hello">
                {{ param_name }}:
            </h5>
            <div v-if="!now_edit" @click="now_edit = true;" class="edit-box">
                <div class="hover-editable column" style="min-height: 45px;">
                    <p v-if="param_value !== none && !(param_value instanceof Array)" class="font-light text-s">
                        {{ param_value }}
                    </p>
                    <p>

                    </p>
                    <p class="font-light text-s" v-if="(param_value instanceof Array)" v-for="param in param_value">
                        - {{ param }}
                    </p>
                </div>
                <img class="edit-button edit-menu center" src="../assets/edit-icon.svg">
            </div>
            <div v-else-if="!(param_value instanceof Array)" class="input-group">
                <textarea v-if="large" autofocus="autofocus" class="form-control" :value="param_value" rows="10"></textarea>
                <input v-else autofocus="autofocus" type="text" class="form-control" :value="param_value">
                <button @click="now_edit = false;" class="btn btn-outline-secondary" type="button"
                    id="button-addon2">Применить</button>
            </div>

            <div v-else>
                <div v-for="param in param_value" class="input-group mt-2">
                    <input autofocus="autofocus" type="text" class="form-control" :value="param">
                    <button @click="now_edit = false;" class="btn btn-outline-secondary" type="button"
                        id="button-addon2"><img src="../assets/delete-icon.svg"></button>
                </div>
                <div class="d-flex justify-content-center max-width mt-3">
                    <button @click="now_edit = false;" class="btn btn-primary me-2" type="button"
                        id="button-addon2">Применить</button>
                    <button @click="now_edit = false;" class="btn btn-outline-secondary ms-2" type="button"
                        id="button-addon2">Добавить</button>
                </div>
            </div>
        </div>
    </div>
</template>