<!-- <script setup>
import { ref, watch, defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
    param_name: String,
    large: Boolean,
    is_edit: Boolean,
    isDropdown: Boolean,
    multiple: Boolean,
    multiInstance: Boolean,
    options: {
        type: Array,
        default: () => []
    },
    modelValue: {
        type: [Array, String, Number, Object],
        required: true
    },
});

const emit = defineEmits(['update:modelValue', 'apply'])
const now_edit = ref(props.is_edit);
const localValues = ref(
    Array.isArray(props.modelValue) 
        ? [...props.modelValue] 
        : props.modelValue
);

const selectedLabels = computed(() => {
    if (!props.isDropdown) return null;
    
    // Для нескольких dropdown
    if (props.multiInstance) {
        return localValues.value.map(id => 
            props.options.find(opt => opt.id === id)?.name || 'Не выбрано'
        );
    }
    
    // Для одиночного dropdown
    if (Array.isArray(props.modelValue)) {
        return props.modelValue
            .map(id => props.options.find(opt => opt.id === id)?.name)
            .filter(Boolean);
    }
    return props.options.find(opt => opt.id === props.modelValue)?.name;
});

watch(() => props.is_edit, (newVal) => {
    now_edit.value = newVal;
});

watch(() => props.modelValue, (newValues) => {
    localValues.value = Array.isArray(newValues) 
        ? [...newValues] 
        : newValues;
}, { deep: true });

// Общие методы
const updateField = (index, value) => {
    const newValues = [...localValues.value];
    newValues[index] = value;
    emitUpdate(newValues);
};

const removeItem = (index) => {
    const newValues = [...localValues.value];
    newValues.splice(index, 1);
    emitUpdate(newValues);
};

const addNewItem = () => {
    const newValues = [...localValues.value, props.multiInstance ? null : ''];
    emitUpdate(newValues);
};

// Методы для dropdown
const handleDropdownChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const newValue = props.multiple
        ? selectedOptions.map(option => option.value)
        : e.target.value;
    
    emitUpdate(newValue);
};

const updateDropdownInstance = (index, value) => {
    const newValues = [...localValues.value];
    newValues[index] = value;
    emitUpdate(newValues);
};

const emitUpdate = (value) => {
    emit('update:modelValue', props.multiInstance && !Array.isArray(value) ? [value] : value);
};

const isSelected = (id) => {
    return Array.isArray(props.modelValue) 
        ? props.modelValue.includes(id) 
        : props.modelValue === id;
};
</script>

<template>
    <div style="position: relative;">
        <div class="mt-3">
            <h5 class="font-semibold text-s mb-1 hello">
                {{ param_name }}:
            </h5>

            <div v-if="!now_edit" @click="now_edit = true;" class="edit-box">
                <div class="hover-editable column" style="min-height: 45px;">
                    <template v-if="isDropdown">
                        <template v-if="multiInstance">
                            <p 
                                v-for="(label, index) in selectedLabels" 
                                :key="index" 
                                class="font-light text-s"
                            >
                                - {{ label }}
                            </p>
                        </template>
                        <template v-else>
                            <p v-if="!multiple" class="font-light text-s">
                                {{ selectedLabels || 'Не выбрано' }}
                            </p>
                            <template v-else>
                                <p 
                                    v-for="(label, index) in selectedLabels" 
                                    :key="index" 
                                    class="font-light text-s"
                                >
                                    - {{ label }}
                                </p>
                            </template>
                        </template>
                    </template>

                    <template v-else>
                        <p v-if="!Array.isArray(modelValue)" class="font-light text-s">
                            {{ modelValue }}
                        </p>
                        <template v-else>
                            <p 
                                v-for="(param, index) in modelValue" 
                                :key="index" 
                                class="font-light text-s"
                            >
                                - {{ param }}
                            </p>
                        </template>
                    </template>
                </div>
                <img class="edit-button edit-menu center" src="../assets/edit-icon.svg">
            </div>

            <div v-else>
                <div v-if="isDropdown && multiInstance">
                    <div 
                        v-for="(item, index) in localValues" 
                        :key="index" 
                        class="input-group mt-2"
                    >
                        <select 
                            class="form-select"
                            :value="item"
                            @change="updateDropdownInstance(index, $event.target.value)"
                        >
                            <option value="" disabled>Выберите опцию</option>
                            <option 
                                v-for="option in options" 
                                :key="option.id" 
                                :value="option.id"
                            >
                                {{ option.name }}
                            </option>
                        </select>
                        <button 
                            v-if="localValues.length > 1" 
                            @click="removeItem(index)"
                            class="btn btn-outline-secondary" 
                            type="button"
                        >
                            <img src="../assets/delete-icon.svg">
                        </button>
                    </div>
                    <div v-if="!is_edit" class="d-flex justify-content-center max-width mt-3">
                        <button @click="$emit('apply'); now_edit=false;" class="btn btn-primary me-2">
                            Применить
                        </button>
                        <button @click="addNewItem" class="btn btn-outline-secondary ms-2">
                            Добавить
                        </button>
                    </div>
                </div>

                <div v-else-if="isDropdown" class="input-group">
                    <select 
                        class="form-select"
                        :multiple="multiple"
                        @change="handleDropdownChange"
                        :value="modelValue"
                    >
                        <option 
                            v-for="option in options" 
                            :key="option.id" 
                            :value="option.id"
                            :selected="isSelected(option.id)"
                        >
                            {{ option.name }}
                        </option>
                    </select>
                    <button 
                        v-if="!is_edit" 
                        @click="$emit('apply'); now_edit=false;"
                        class="btn btn-outline-secondary" 
                    >
                        Применить
                    </button>
                </div>

                <template v-else>
                    <div v-if="!Array.isArray(modelValue)" class="input-group">
                        <textarea 
                            v-if="large" 
                            autofocus 
                            class="form-control" 
                            :value="modelValue"
                            @input="$emit('update:modelValue', $event.target.value)" 
                            rows="10"
                        ></textarea>
                        <input 
                            v-else 
                            autofocus 
                            type="text" 
                            class="form-control" 
                            :value="modelValue"
                            @input="$emit('update:modelValue', $event.target.value)"
                        >
                        <button 
                            v-if="!is_edit" 
                            @click="$emit('apply'); now_edit=false;"
                            class="btn btn-outline-secondary" 
                        >
                            Применить
                        </button>
                    </div>

                    <div v-else>
                        <div v-for="(param, index) in localValues" :key="index" class="input-group mt-2">
                            <input 
                                autofocus 
                                type="text" 
                                class="form-control" 
                                :value="param"
                                @input="updateField(index, $event.target.value)"
                            >
                            <button 
                                v-if="localValues.length > 1" 
                                @click="removeItem(index)"
                                class="btn btn-outline-secondary" 
                            >
                                <img src="../assets/delete-icon.svg">
                            </button>
                        </div>
                        <div class="d-flex justify-content-center max-width mt-3">
                            <button @click="$emit('apply'); now_edit=false;" class="btn btn-primary me-2">
                                Применить
                            </button>
                            <button @click="addNewItem" class="btn btn-outline-secondary ms-2">
                                Добавить
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template> -->


<script setup>
import { ref, watch, defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
    param_name: String,
    large: Boolean,
    is_edit: Boolean,
    isDropdown: Boolean,
    multiple: Boolean,
    multiInstance: Boolean,
    onlyRead: {
        type: Boolean,
        default: false
    },
    options: {
        type: Array,
        default: () => []
    },
    modelValue: {
        type: [Array, String, Number, Object],
        required: true
    }
})

const emit = defineEmits(['update:modelValue', 'apply'])
const now_edit = ref(props.is_edit)
const localValues = ref(
    props.multiInstance
        ? (Array.isArray(props.modelValue) 
            ? [...props.modelValue] 
            : [props.modelValue])
        : (Array.isArray(props.modelValue) 
            ? [...props.modelValue] 
            : props.modelValue)
)

const selectedLabels = computed(() => {
    if (!props.isDropdown) return null
    
    if (props.multiInstance) {
        return localValues.value.map(id => 
            props.options.find(opt => opt.id === id)?.name || 'Не выбрано'
        )
    }
    
    if (Array.isArray(props.modelValue)) {
        return props.modelValue
            .map(id => props.options.find(opt => opt.id === id)?.name)
            .filter(Boolean)
    }
    
    if (typeof props.modelValue === 'object' && props.modelValue !== null) {
        return props.options.find(opt => opt.id === props.modelValue.id)?.name || 'Не выбрано'
    }
    
    return props.options.find(opt => opt.id === props.modelValue)?.name || 'Не выбрано'
})

watch(() => props.is_edit, (newVal) => {
    if (!props.onlyRead) now_edit.value = newVal
})

watch(() => props.onlyRead, (newVal) => {
    if (newVal) now_edit.value = false
})

watch(() => props.modelValue, (newValues) => {
    localValues.value = Array.isArray(newValues) 
        ? [...newValues] 
        : newValues
}, { deep: true, immediate: true })

const enableEdit = () => {
    if (!props.onlyRead) now_edit.value = true
}

const applyChanges = () => {
    emit('apply')
    if (!props.onlyRead) now_edit.value = false
}

const updateField = (index, value) => {
    const newValues = [...localValues.value]
    newValues[index] = value
    emitUpdate(newValues)
}

const removeItem = (index) => {
    const newValues = [...localValues.value]
    newValues.splice(index, 1)
    emitUpdate(newValues)
}

const addNewItem = () => {
    const defaultValue = props.options[0]?.id ?? null
    const newValues = [...localValues.value, props.multiInstance ? defaultValue : '']
    emitUpdate(newValues)
}

const handleDropdownChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions)
    const newValue = props.multiple
        ? selectedOptions.map(option => option.value)
        : e.target.value
    
    emitUpdate(newValue)
}

const updateDropdownInstance = (index, value) => {
    const newValues = [...localValues.value]
    newValues[index] = value
    emitUpdate(newValues)
}

const emitUpdate = (value) => {
    emit('update:modelValue', props.multiInstance && !Array.isArray(value) ? [value] : value)
}

const isSelected = (id) => {
    if (typeof props.modelValue === 'object' && props.modelValue !== null) {
        return props.modelValue.id === id
    }
    return Array.isArray(props.modelValue) 
        ? props.modelValue.includes(id) 
        : props.modelValue === id
}
</script>

<template>
    <div style="position: relative;">
        <div class="mt-3">
            <h5 class="font-semibold text-s mb-1 hello">
                {{ param_name }}:
            </h5>

            <div v-if="!now_edit" 
                 @click="enableEdit()" 
                 :class="{'pe-none': onlyRead, 'edit-box': !onlyRead}">
                <div class="column" 
                     :class="{'hover-editable': !onlyRead}" 
                     style="min-height: 45px;">
                    <template v-if="isDropdown">
                        <template v-if="multiInstance">
                            <p v-for="(label, index) in selectedLabels" 
                               :key="index" 
                               class="font-light text-s">
                                - {{ label }}
                            </p>
                        </template>
                        <template v-else>
                            <p v-if="!multiple" class="font-light text-s">
                                {{ selectedLabels }}
                            </p>
                            <template v-else>
                                <p v-for="(label, index) in selectedLabels" 
                                   :key="index" 
                                   class="font-light text-s">
                                    - {{ label }}
                                </p>
                            </template>
                        </template>
                    </template>

                    <template v-else>
                        <p v-if="!Array.isArray(modelValue)" class="font-light text-s">
                            {{ modelValue }}
                        </p>
                        <template v-else>
                            <p v-for="(param, index) in modelValue" 
                               :key="index" 
                               class="font-light text-s">
                                - {{ param }}
                            </p>
                        </template>
                    </template>
                </div>
                <img v-if="!onlyRead" 
                     class="edit-button edit-menu center" 
                     src="../assets/edit-icon.svg">
            </div>

            <div v-else-if="!onlyRead">
                <div v-if="isDropdown && multiInstance">
                    <div v-for="(item, index) in localValues" 
                         :key="index" 
                         class="input-group mt-2">
                        <select class="form-select"
                                :value="item"
                                @change="updateDropdownInstance(index, $event.target.value)">
                            <option value="" disabled>Выберите опцию</option>
                            <option v-for="option in options" 
                                    :key="option.id" 
                                    :value="option.id">
                                {{ option.name }}
                            </option>
                        </select>
                        <button v-if="localValues.length > 1" 
                                @click="removeItem(index)"
                                class="btn btn-outline-secondary" 
                                type="button">
                            <img src="../assets/delete-icon.svg">
                        </button>
                    </div>
                    <div class="d-flex justify-content-center max-width mt-3">
                        <button @click="applyChanges" 
                                class="btn btn-primary me-2">
                            Применить
                        </button>
                        <button @click="addNewItem" 
                                class="btn btn-outline-secondary ms-2">
                            Добавить
                        </button>
                    </div>
                </div>

                <div v-else-if="isDropdown" class="input-group">
                    <select class="form-select"
                            :multiple="multiple"
                            @change="handleDropdownChange"
                            :value="modelValue">
                        <option v-for="option in options" 
                                :key="option.id" 
                                :value="option.id"
                                :selected="isSelected(option.id)">
                            {{ option.name }}
                        </option>
                    </select>
                    <button @click="applyChanges" 
                            class="btn btn-outline-secondary">
                        Применить
                    </button>
                </div>

                <template v-else>
                    <div v-if="!Array.isArray(modelValue)" class="input-group">
                        <textarea v-if="large" 
                                  autofocus 
                                  class="form-control" 
                                  :value="modelValue"
                                  @input="$emit('update:modelValue', $event.target.value)" 
                                  rows="10"></textarea>
                        <input v-else 
                               autofocus 
                               type="text" 
                               class="form-control" 
                               :value="modelValue"
                               @input="$emit('update:modelValue', $event.target.value)">
                        <button @click="applyChanges" 
                                class="btn btn-outline-secondary">
                            Применить
                        </button>
                    </div>

                    <div v-else>
                        <div v-for="(param, index) in localValues" 
                             :key="index" 
                             class="input-group mt-2">
                            <input autofocus 
                                   type="text" 
                                   class="form-control" 
                                   :value="param"
                                   @input="updateField(index, $event.target.value)">
                            <button v-if="localValues.length > 1" 
                                    @click="removeItem(index)"
                                    class="btn btn-outline-secondary">
                                <img src="../assets/delete-icon.svg">
                            </button>
                        </div>
                        <div class="d-flex justify-content-center max-width mt-3">
                            <button @click="applyChanges" 
                                    class="btn btn-primary me-2">
                                Применить
                            </button>
                            <button @click="addNewItem" 
                                    class="btn btn-outline-secondary ms-2">
                                Добавить
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pe-none {
    pointer-events: none;
}

.hover-editable {
    cursor: pointer;
    transition: background-color 0.2s;
}

.hover-editable:hover {
    background-color: #f8f9fa;
}

.edit-button {
    opacity: 0;
    transition: opacity 0.2s;
}

.edit-box:hover .edit-button {
    opacity: 1;
}

.max-width {
    max-width: 500px;
    margin: 0 auto;
}
</style>