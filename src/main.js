import { createApp } from 'vue'
import App from './App.vue'
import routers from './router.js'
import store from './store.js'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

let app = createApp(App);

app.use(routers).use(store).use(Quasar, quasarUserOptions).mount('#app')