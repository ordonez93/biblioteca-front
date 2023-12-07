import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'


//iconos fortawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

const app = createApp(App)



//firebase
import {VueFire, VueFireAuth} from 'vuefire'
import {firebaseApp} from './config/firebase'

//fortawesome
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
library.add(fas, fab, faCopy, faCircleUser);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia())
app.use(router)
app.use(VueFire, {
    firebaseApp,
    modules:[VueFireAuth()]
})


app.mount('#app')
