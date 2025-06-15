import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './firebase' // Importando a configuração do Firebase
import { verificarFirebase } from './firebaseCheck'

import { createApp } from 'vue'
import App from './App.vue'

// Verifica a conexão com o Firebase
verificarFirebase().then(conectado => {
  if (!conectado) {
    console.error('Por favor, verifique suas configurações do Firebase em src/firebase.js')
  }
})

const app = createApp(App)
app.mount('#app')
