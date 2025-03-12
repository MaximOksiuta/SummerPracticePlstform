<script setup>
    import { ref } from 'vue';

    defineProps({
        param_name: String,
        param_value: String,
        text_justify: Boolean
    });
</script>

<template>
    <div style="position: ">
        <div class="mt-3">
            <h5 class="title-color text-xxl font-regular">
                {{ param_name }}:
            </h5>
            <div class="column" style="min-height: 45px;">
                <p v-if="param_value !== none && !(param_value instanceof Array)" class="light-gray text-xxl font-light text-justify" :v-bind:class="((text_justify) ? 'text-justify': '')">
                    {{ param_value }}
                </p>
                <p>

                </p>
                <p class="light-gray text-xxl font-light" v-if="(param_value instanceof Array)" v-for="param in param_value">
                    - {{ param }}
                </p>
            </div>
        </div>
    </div>
</template>