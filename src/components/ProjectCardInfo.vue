<script setup>
    import {ref} from 'vue';

    const props = defineProps({
        showUserButtons: Boolean,
        projectInfo: Object
});

    const project_info = ref({
        image_url: (props.projectInfo.images.length > 0) ? "https://spp.gradient.fun:8000/api/projects/images/" + props.projectInfo.images[0] : "https://ik.imagekit.io/vn49p9jmnnv7g/konte/placeholder__yPgLyFqc.jpg",
        project_name: props.projectInfo.name,
        description: props.projectInfo.description
    });


    console.log('project card info', props.projectInfo);
</script>

<template>
    <div class="elevated max-width project-card">
        <img class="max-width ratio-16-9"
            :src="project_info.image_url">
        <div class="p-4 column">
            <h5 class="text-xl text title-color mb-2">
                {{project_info.project_name}}
            </h5>
            <!-- <span class="text-m mb-2">
                Компания партнер: {{ project_info.company_name }}
            </span> -->
            <span class="text-m d-none">
                Сложность: 5/10
            </span>
            <p class="text-xs mt-3 light-gray-color mb-1" style="text-align: justify; height: 10rem; text-overflow: ellipsis; overflow: hidden;">
                {{ project_info.description }}
            </p>
            <div class="mt-4 d-flex align-items-center justify-content-between d-none">
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