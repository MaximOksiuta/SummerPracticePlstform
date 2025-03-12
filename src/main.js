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
import CreateNewProject from './views/CreateNewProject.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import "https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.4.4/cjs/popper.min.js"

const { sendRequest, isLoading, error } = useApi();

export const userRole = ref(-1);
export const all_categories = ref([]);
export const all_companies = ref([]);
export const all_specialities = ref([]);
export const all_projects = ref([]);
async function updateUserState() {
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
    console.log(error)
  } finally {
    return true
  }
}

async function updateLists() {
  try {
    const result = await sendRequest(
      'GET',
      '/projects/categories'
    );
    console.log('Data saved:', result);

    all_categories.value = [...result];
  } catch {
    console.log(error)
  }

  try {
    const result = await sendRequest(
      'GET',
      '/projects/specialities'
    );
    console.log('Data saved:', result);

    all_specialities.value = [...result];
  } catch {
    console.log(error)
  }

  try {
    const result = await sendRequest(
      'GET',
      '/projects/companies'
    );
    console.log('Data saved:', result);

    all_companies.value = [...result];
  } catch {
    console.log(error)
  }
};

async function updateProjectsList() {
  try {
    const result = await sendRequest(
      'GET',
      '/projects/'
    );
    console.log('Data saved:', result);

    all_projects.value = [...result];
  } catch {
    console.log(error)
  }
}

updateLists();


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
    name: 'signUp',
    beforeEnter: () => {
      return false
    }
  },
  {
    path: '/myApplications',
    component: MyApplicationsView,
    name: 'myApplications',
    beforeEnter: () => {
      return userRole.value === 1
    }
  },
  {
    path: '/myProjects',
    component: MyProjects,
    name: 'myProjects',
    beforeEnter: () => {
      // return userRole.value === 2
    }
  },
  {
    path: '/newProject',
    component: CreateNewProject,
    name: 'newProject',
    beforeEnter: () => {
      return userRole.value === 2 || userRole.value === 3
    }
  },
  {
    path: '/edit',
    component: ProjectEditView,
    name: 'projectEdit',
    beforeEnter: () => {
      return userRole.value === 2 || userRole.value === 3
    }
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
  if (to.fullPath !== '/auth') {
    updateUserState();
    updateProjectsList();
  }
})


export function useApi() {
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