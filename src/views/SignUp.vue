<script setup>
import { ref } from 'vue';
import UAuthField from '../components/UAuthField.vue'
import AuthLeftInfoBlock from '../components/AuthLeftInfoBlock.vue';
import { useApi } from "@/main.js"
import { useRouter } from 'vue-router';

const email = ref("");
const lastname = ref("");
const firstname = ref("");
const middlename = ref("");
const password = ref("");
const confirmPassword = ref("");

// Использование в компоненте
const { sendRequest, isLoading, error } = useApi();
const router = useRouter();

const sendSignIn = async () => {
    try {
        const result = await sendRequest(
            'POST',
            '/users/login',
            {
                username: email.value,
                password: password.value
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        console.log('Data saved:', result);
        router.push('/')
    } catch {
        // Обработка ошибки
    }
};
const sendSignUp = async () => {
    try {
        const result = await sendRequest(
            'POST',
            '/users/register',
            {
                email: email.value,
                password: password.value,
                is_active: true,
                is_superuser: false,
                is_verified: false,
                firstname: firstname.value,
                lastname: lastname.value,
                surname: middlename.value,
                role_id: 0
            }
        );
        console.log('Data saved:', result);
        sendSignIn();

    } catch {
        // Обработка ошибки
    }
};
</script>


<template>
    <div class="absolute-center d-flex justify-content-between elevated" style="max-width: 800px;">
        <AuthLeftInfoBlock />
        <form @submit.prevent="sendSignUp" class="col ps-3 pe-3 pb-4 pt-4 needs-validation" novalidate>
            <h3 class="text-xl font-medium title-color center-text mb-4">
                Регистрация
            </h3>
            <UAuthField title="E-mail" type="email" :requered="true" v-model="email" />
            <div class="invalid-feedback">
                Пожалуйста введите корректный email
            </div>
            <UAuthField title="Фамилия" type="text" :requered="true" v-model="lastname" />
            <div class="invalid-feedback">
                Пожалуйста введите фамилию
            </div>
            <UAuthField title="Имя" type="text" :requered="true" v-model="firstname" />
            <div class="invalid-feedback">
                Пожалуйста введите имя
            </div>
            <UAuthField title="Отчество" type="text" v-model="middlename" />

            <label class="font-light text-xs light-gray-color mb-1 mt-2 requered d-none">Пол</label>

            <div class="d-flex d-none">
                <div class="form-check me-3">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                    <label class="form-check-label text-xs font-light" for="flexRadioDefault1">
                        Мужской
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                    <label class="form-check-label text-xs font-light" for="flexRadioDefault2">
                        Женский
                    </label>
                </div>
            </div>

            <UAuthField title="Пароль" type="password" :requered="true" v-model="password" />
            <div class="invalid-feedback">
                Пожалуйста пароль
            </div>
            <UAuthField title="Пароль ещё раз" type="password" :requered="true" v-model="confirmPassword"
                v-bind:invalid="password !== confirmPassword" />
            <div class="invalid-feedback">
                Пароли должны совпадать
            </div>
            <div class="form-check">
                <label class="d-flex align-items-center">
                    <input class="form-check-input mb-1 me-3" style="align-self: center;" type="checkbox" id="remember"
                        required>
                    <span class="text-xs font-light" for="remember">
                        Даю согласие на обработку своих персональных данных
                    </span>
                </label>
            </div>
            <button type="submit"
                class="mt-3 cursor-pointer max-width without-bd rounded-s pt-2 pb-2 accent-color-background white-color font-regular text-s">
                Зарегестрироваться
            </button>
            <!-- <button class="cursor-pointer max-width without-bd rounded-s pt-2 pb-2 transparent-background title-color font-regular text-s">
                Восстановление пароля
            </button> -->
        </form>
    </div>

</template>

<script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()
</script>

<style>
label.requered::after {
    content: " *";
    color: var(--accent);
}
</style>