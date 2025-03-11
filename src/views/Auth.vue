<script setup>
import UAuthField from '../components/UAuthField.vue';
import AuthLeftInfoBlock from '../components/AuthLeftInfoBlock.vue';
import { ref, computed } from 'vue';
import useApi from "@/main.js"
import { useRouter } from 'vue-router';


const email = ref("");
const password = ref("");


const { sendRequest, isLoading, error } = useApi();

const router = useRouter();

const sendSignIn = async () => {
    console.log(email.value);
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
        router.push('/');
    } catch {
        // Обработка ошибки
    }
};

const helloWorld = () => {
    console.log("Hello world");
    sendSignIn();
};
</script>

<template>
    <div class="absolute-center d-flex justify-content-between elevated" style="max-width: 800px;">
        <AuthLeftInfoBlock />
        <form @submit.prevent="sendSignIn" class="col ps-3 pe-3 pb-4 pt-4 needs-validation" novalidate>
            <h3 class="text-xl font-medium title-color center-text mb-4">
                Вход в систему
            </h3>
            <div class="mt-2 mb-3 d-none">
                <span class="font-light text-xs">Ещё не зарегистрированы?</span> <router-link :to="{ name: 'signUp' }"
                    class="none-deco font-light text-xs accent-color cursor-pointer">Регистрация</router-link>
            </div>
            <UAuthField title="E-mail" type="email" requered v-model="email" :requered="true" />
            <UAuthField title="Пароль" type="password" requered v-model="password" :requered="true" />
            <div @submit.prevent="sendSignUp" class="form-check mb-3">
                <label class="d-flex align-items-center">
                    <input class="form-check-input mb-1 me-3" style="align-self: center;" type="checkbox" id="remember">
                    <span class="text-xs font-light" for="remember">
                        Запомнить меня
                    </span>
                </label>
            </div>
            <button v-if="!isLoading" @click="helloWorld" type="submit"
                class="cursor-pointer max-width without-bd rounded-s pt-2 pb-2 accent-color-background white-color font-regular text-s">
                Войти
            </button>
        </form>
    </div>


</template>