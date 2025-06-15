<template>
  <div class="container-fluid min-vh-100 py-4 bg-gradient">
    <div class="container">
      <div class="card main-card shadow-lg">
        <div class="card-body text-center p-5">
          <div class="victory-animation mb-4">
            <i class="mdi mdi-trophy-award text-warning display-1 animate-bounce"></i>
          </div>
          
          <h1 class="display-4 text-success mb-4">Parabéns!</h1>
          <p class="lead fs-3 mb-4">Você é um verdadeiro Mestre da Reciclagem!</p>
          
          <div class="score-card bg-light rounded-4 p-4 mb-5">
            <div class="row">
              <div class="col-md-6 mb-4 mb-md-0">
                <div class="stat-item">
                  <i class="mdi mdi-star text-warning fs-1"></i>
                  <h3 class="fs-4 mb-2">Pontuação Final</h3>
                  <p class="fs-2 text-primary mb-0">{{ pontuacao }} pontos</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="stat-item">
                  <i class="mdi mdi-recycle text-success fs-1"></i>
                  <h3 class="fs-4 mb-2">Níveis Completados</h3>
                  <p class="fs-2 text-success mb-0">10/10</p>
                </div>
              </div>
            </div>
          </div>

          <div class="achievements mb-5">
            <h3 class="fs-3 mb-4">
              <i class="mdi mdi-medal text-warning"></i>
              Suas Conquistas
            </h3>
            <div class="row g-3">
              <div class="col-md-4">
                <div class="achievement-card bg-success bg-opacity-10 p-3 rounded-4">
                  <i class="mdi mdi-leaf text-success fs-2"></i>
                  <p class="mb-0">Protetor do Planeta</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="achievement-card bg-primary bg-opacity-10 p-3 rounded-4">
                  <i class="mdi mdi-lightbulb text-primary fs-2"></i>
                  <p class="mb-0">Especialista em Reciclagem</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="achievement-card bg-warning bg-opacity-10 p-3 rounded-4">
                  <i class="mdi mdi-star text-warning fs-2"></i>
                  <p class="mb-0">Mestre da Sustentabilidade</p>
                </div>
              </div>
            </div>
          </div>

          <button @click="$emit('voltar-inicio')" class="btn btn-success btn-lg rounded-pill px-5 py-3 shadow-lg">
            Voltar ao Início
            <i class="mdi mdi-home ms-2"></i>
          </button>
        </div>
      </div>
    </div>

    <RankingModal 
      :show="mostrarRanking"
      :pontuacao="pontuacao"
      @fechar="fecharRanking"
    />
  </div>
</template>

<script>
import RankingModal from './RankingModal.vue'

export default {
  name: 'TelaFinal',
  components: {
    RankingModal
  },
  props: {
    pontuacao: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      mostrarRanking: true
    }
  },
  methods: {
    fecharRanking() {
      this.mostrarRanking = false
    }
  }
}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  font-family: 'Nunito', sans-serif;
}

.main-card {
  border: none;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 2rem;
}

.victory-animation {
  animation: float 3s ease-in-out infinite;
}

.animate-bounce {
  animation: bounce 1s ease infinite;
}

.achievement-card {
  transition: all 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-5px);
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.btn-success {
  background-color: #2e7d32;
  border: none;
  transition: all 0.3s ease;
}

.btn-success:hover {
  background-color: #1b5e20;
  transform: translateY(-3px);
}

.btn-success:active {
  transform: translateY(1px);
}
</style> 