import { createApp } from "vue"
import "./style.css"
import App from "./app/App.vue"
import { store } from "@/shared/store" 
import router from "./router"

const app = createApp(App)

console.log('[Store check]', store) // Проверяем store ДО подключения

app.use(store)
app.use(router)

console.log('[App check]', app) // Проверяем экземпляр приложения

app.mount("#app")

console.log('>>> Приложение смонтировано')
