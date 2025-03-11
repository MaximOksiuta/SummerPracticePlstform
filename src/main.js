import { createApp, ref } from 'vue';
import axios from 'axios';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import './assets/general.css';
import MainView from './views/Main.vue';
import AuthView from './views/Auth.vue';
import SignUpView from './views/SignUp.vue';
import MyApplicationsView from './views/MyApplications.vue';
import ProjectEditView from './views/ProjectEdit.vue'
import ProjectView from './views/ProjectView.vue';
import MyProjects from './views/MyProjects.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import "https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.4.4/cjs/popper.min.js"

const { sendRequest, isLoading, error } = useApi();

export var userRole = ref(-1);

async function updateUserState () {
  try {
    const result = sendRequest(
      'GET',
      '/users/me'
    );
    console.log('Data saved:', result);
    result.then(function (response) {
      userRole.value = response.role.id;
    })
  } catch {
      // Обработка ошибки
  } finally {
    return true
  }
}

const router = createRouter({
  routes: [{
    path: '/',
    component: MainView,
    name: 'main'
  },
  {
    path: '/auth',
    component: AuthView,
    name: 'auth'
  },
  {
    path: '/signUp',
    component: SignUpView,
    name: 'signUp'
  },
  {
    path: '/myApplications',
    component: MyApplicationsView,
    name: 'myApplications'
  },
  {
    path: '/myProjects',
    component: MyProjects,
    name: 'myProjects'
  },
  {
    path: '/edit',
    component: ProjectEditView,
    name: 'projectEdit'
  },
  {
    path: '/details/:id',
    component: ProjectView,
    name: 'details'
  }
  ],
  history: createWebHistory()
});

router.afterEach((to, from) => {
  if (to.fullPath !== '/auth'){
      updateUserState();
  }
})


export function useApi () {
  axios.defaults.baseURL = 'https://spp.gradient.fun:8000/api/';
  axios.defaults.withCredentials = true;
  const isLoading = ref(false);
  const error = ref(null);

  const sendRequest = async (method, url, data = null, config = {}) => {
      isLoading.value = true;
      error.value = null;

      try {
          const response = await axios({
              method: method.toLowerCase(),
              url,
              data,
              ...config
          });
          return response.data;
      } catch (err) {
          handleError(err);
          throw err; // Пробрасываем ошибку для обработки в компоненте
      } finally {
          isLoading.value = false;
      }
  };

  const handleError = (err) => {
      if (err.response) {
          // Сервер ответил с статусом ошибки
          error.value = err.response.data.message || 'Server Error';
          console.error('Server Error:', err.response.data);
      } else if (err.request) {
          // Запрос был отправлен, но ответ не получен
          error.value = 'Network Error';
          console.error('Network Error:', err.request);
      } else {
          // Ошибка при настройке запроса
          error.value = 'Request Error';
          console.error('Request Error:', err.message);
      }
  };

  return {
      sendRequest,
      isLoading,
      error
  };
};

const app = createApp(App)
app.use(router)
app.mount('#app')