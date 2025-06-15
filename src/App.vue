<template>
  <div class="app">
    <TelaInicial v-if="telaAtual === 'inicial'" @comecar="iniciarJogo" />
    <TelaJogo v-else @voltar-inicio="voltarInicio" />
  </div>
</template>

<script>
import TelaInicial from './components/TelaInicial.vue'
import TelaJogo from './components/TelaJogo.vue'

export default {
  name: 'App',
  components: {
    TelaInicial,
    TelaJogo
  },
  data() {
    return {
      telaAtual: 'inicial'
    }
  },
  methods: {
    iniciarJogo() {
      this.telaAtual = 'jogo'
    },
    voltarInicio() {
      this.telaAtual = 'inicial'
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

.app {
  font-family: 'Nunito', sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}
</style>
