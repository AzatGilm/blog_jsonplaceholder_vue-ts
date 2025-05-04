import { createApp } from "vue"
import "./style.css"
import App from "./app/App.vue"
import { store } from "@/shared/store" 
import router from "./app/router"

const app = createApp(App)

app.use(store)
app.use(router)


app.mount("#app")

console.log('>>> Приложение смонтировано')
