<script setup>
defineProps(['buttonText', 'commonButtonText', 'listargs'])
</script>

<template>
    <div class="d-flex justify-content-start align-items-center ms-4 mt-1 mb-1">
        <button type="button" class="btn rounded-s dropdown-toggle"
            style="--bs-btn-border-color: var(--light-gray); --bs-btn-hover-border-color: var(--bs-btn-active-border-color); --bs-btn-color: var(--light-gray)"
            data-bs-toggle="dropdown" aria-expanded="false">{{ buttonText }}</button>
        <ul class="dropdown-menu checkbox-menu allow-focus mt-1"
            style="--bs-dropdown-link-active-bg: --selected-color; --bs-dropdown-link-active-color: --default-text-color">
            <li><span class="dropdown-item" href="#">{{ commonButtonText }}</span></li>
            <li>
                <hr class="dropdown-divider" />
            </li>
            <li v-for="arg in listargs" class="dropdown-item p-0">
                <label class="d-flex align-items-center">
                    <input class="form-check-input m-2" style="align-self: center;" type="checkbox" id="remember" />
                    {{ arg }}
                </label>
            </li>
        </ul>
    </div>
</template>