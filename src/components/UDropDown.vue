<script setup>
import { computed } from 'vue';

const props = defineProps({
  buttonText: {
    type: String,
    required: true
  },
  commonButtonText: {
    type: String,
    required: true
  },
  listargs: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(item => 
        typeof item === 'object' && 
        'id' in item && 
        'name' in item
      )
    }
  },
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

const selectedValues = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

function toggleAll() {
  const allIds = props.listargs.map(item => item.id);
  if (selectedValues.value.length === props.listargs.length) {
    selectedValues.value = [];
  } else {
    selectedValues.value = [...allIds];
  }
}
</script>

<template>
  <div class="d-flex justify-content-start align-items-center ms-4 mt-1 mb-1">
    <button
      type="button"
      class="btn rounded-s dropdown-toggle"
      style="
        --bs-btn-border-color: var(--light-gray);
        --bs-btn-hover-border-color: var(--bs-btn-active-border-color);
        --bs-btn-color: var(--light-gray);
      "
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ buttonText }}
    </button>
    <ul
      class="dropdown-menu checkbox-menu allow-focus mt-1"
      style="
        --bs-dropdown-link-active-bg: --selected-color;
        --bs-dropdown-link-active-color: --default-text-color;
      "
    >
      <li>
        <span class="dropdown-item" href="#" @click="toggleAll">
          {{ commonButtonText }}
        </span>
      </li>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <li v-for="arg in listargs" :key="arg.id" class="dropdown-item p-0">
        <label class="d-flex align-items-center">
          <input
            v-model="selectedValues"
            class="form-check-input m-2"
            style="align-self: center"
            type="checkbox"
            :value="arg.id"
            :id="`checkbox-${arg.id}`"
          />
          {{ arg.name }}
        </label>
      </li>
    </ul>
  </div>
</template>