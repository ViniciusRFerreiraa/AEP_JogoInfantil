<template>
  <div class="container-fluid min-vh-100 py-4">
    <div class="container">
      <div class="card main-card shadow-lg">
        <div class="card-body text-center p-5">
          <div class="logo mb-4">
            <i class="mdi mdi-recycle text-success display-1"></i>
          </div>
          
          <h1 class="display-4 text-success mb-4">Aventura da Reciclagem</h1>
          <p class="lead fs-3 mb-5">Aprenda a reciclar de forma divertida!</p>

          <div class="instructions bg-light rounded-4 p-4 mb-5">
            <h2 class="fs-3 mb-4">
              <i class="mdi mdi-information text-primary"></i>
              Como Jogar
            </h2>
            <div class="row g-4">
              <div class="col-md-4">
                <div class="instruction-card bg-primary bg-opacity-10 p-4 rounded-4">
                  <i class="mdi mdi-cursor-pointer text-primary fs-1 mb-3"></i>
                  <h3 class="fs-5">1. Selecione uma Lixeira</h3>
                  <p class="mb-0">Clique na lixeira correta para o item</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="instruction-card bg-success bg-opacity-10 p-4 rounded-4">
                  <i class="mdi mdi-trash-can text-success fs-1 mb-3"></i>
                  <h3 class="fs-5">2. Escolha o Item</h3>
                  <p class="mb-0">Clique no item que deseja reciclar</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="instruction-card bg-warning bg-opacity-10 p-4 rounded-4">
                  <i class="mdi mdi-star text-warning fs-1 mb-3"></i>
                  <h3 class="fs-5">3. Ganhe Pontos</h3>
                  <p class="mb-0">Acerte e ganhe pontos para avançar</p>
                </div>
              </div>
            </div>
          </div>

          <button @click="$emit('comecar')" class="btn btn-success btn-lg rounded-pill px-5 py-3 shadow-lg">
            Começar Aventura
            <i class="mdi mdi-play ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TelaInicial'
}
</script>

<style scoped>
.main-card {
  border: none;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 2rem;
}

.instruction-card {
  height: 100%;
  transition: all 0.3s ease;
}

.instruction-card:hover {
  transform: translateY(-5px);
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

.logo {
  animation: float 3s ease-in-out infinite;
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
</style> 