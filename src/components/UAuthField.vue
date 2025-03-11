<script setup>
    defineProps(['title', 'type', 'requered', 'modelValue', 'invalid']);

    defineEmits(["update:modelValue"]);
</script>

<template>
    <label 
        class="font-light text-xs light-gray-color mb-1 mt-2" 
        v-bind:class = "(requered)?'requered':''">
            {{title}}
    </label>
    <input  class="form-control default-field mb-2 mt-1" v-bind:class="(invalid)?'is-invalid':''" :type="type" autofocus="autofocus" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :required="requered">
</template>