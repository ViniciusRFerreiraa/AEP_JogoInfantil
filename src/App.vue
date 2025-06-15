<template>
  <div class="app">
    <TelaInicial v-if="telaAtual === 'inicial'" @comecar="iniciarJogo" />
    <TelaJogo 
      v-else-if="telaAtual === 'jogo'" 
      @voltar-inicio="voltarInicio"
      @jogo-finalizado="finalizarJogo"
    />
    <TelaFinal 
      v-else 
      :pontuacao="pontuacaoFinal"
      @voltar-inicio="voltarInicio"
    />
  </div>
</template>

<script>
import TelaInicial from './components/TelaInicial.vue'
import TelaJogo from './components/TelaJogo.vue'
import TelaFinal from './components/TelaFinal.vue'

export default {
  name: 'App',
  components: {
    TelaInicial,
    TelaJogo,
    TelaFinal
  },
  data() {
    return {
      telaAtual: 'inicial',
      pontuacaoFinal: 0
    }
  },
  methods: {
    iniciarJogo() {
      this.telaAtual = 'jogo'
      this.pontuacaoFinal = 0
    },
    voltarInicio() {
      this.telaAtual = 'inicial'
    },
    finalizarJogo(pontuacao) {
      this.pontuacaoFinal = pontuacao
      this.telaAtual = 'final'
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
