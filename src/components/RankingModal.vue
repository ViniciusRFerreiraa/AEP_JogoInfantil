<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-content card shadow-lg">
      <div class="card-body p-4">
        <!-- Botão Fechar -->
        <button 
          class="btn-close position-absolute top-0 end-0 m-3" 
          @click="fecharModal"
          aria-label="Fechar"
        ></button>

        <h2 class="text-center mb-4">
          <i class="mdi mdi-trophy text-warning me-2"></i>
          Ranking dos Jogadores
        </h2>

        <!-- Formulário de Nome -->
        <div v-if="!nomeInserido" class="mb-4">
          <div class="form-group">
            <label for="nomeJogador" class="form-label">Digite seu nome:</label>
            <input 
              type="text" 
              class="form-control form-control-lg mb-3" 
              id="nomeJogador" 
              v-model="nomeJogador" 
              placeholder="Seu nome"
              @keyup.enter="salvarPontuacao"
              :disabled="salvando"
            >
            <div class="d-grid gap-2">
              <button 
                class="btn btn-success btn-lg" 
                @click="salvarPontuacao"
                :disabled="!nomeJogador.trim() || salvando"
              >
                <span v-if="!salvando">Salvar Pontuação</span>
                <span v-else>
                  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                  Salvando...
                </span>
              </button>
              <button 
                class="btn btn-danger btn-lg"
                @click="naoSalvarNome"
                :disabled="salvando"
              >
                Não Desejo Salvar
              </button>
            </div>
          </div>
        </div>

        <!-- Lista de Ranking -->
        <div v-else>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Pontuação</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(jogador, index) in ranking" :key="index" 
                    :class="{ 'table-success': jogador.nome === nomeJogador }">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ jogador.nome }}</td>
                  <td>{{ jogador.pontuacao }}</td>
                </tr>
                <tr v-if="ranking.length === 0">
                  <td colspan="3" class="text-center py-4">
                    <span class="text-muted">Nenhuma pontuação registrada ainda</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button class="btn btn-primary btn-lg w-100 mt-4" @click="fecharModal">
            Continuar
          </button>
        </div>

        <!-- Mensagem de erro -->
        <div v-if="erro" class="alert alert-danger mt-3" role="alert">
          Ocorreu um erro ao salvar a pontuação. Por favor, tente novamente.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore'

export default {
  name: 'RankingModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    pontuacao: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const nomeJogador = ref('')
    const nomeInserido = ref(false)
    const ranking = ref([])
    const salvando = ref(false)
    const erro = ref(false)

    const carregarRanking = async () => {
      try {
        const rankingRef = collection(db, 'ranking')
        const q = query(rankingRef, orderBy('pontuacao', 'desc'), limit(10))
        const querySnapshot = await getDocs(q)
        
        ranking.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (error) {
        console.error('Erro ao carregar ranking:', error)
        erro.value = true
      }
    }

    const salvarPontuacao = async () => {
      if (!nomeJogador.value.trim() || salvando.value) return

      salvando.value = true
      erro.value = false

      try {
        const rankingRef = collection(db, 'ranking')
        await addDoc(rankingRef, {
          nome: nomeJogador.value,
          pontuacao: props.pontuacao,
          data: new Date()
        })

        nomeInserido.value = true
        await carregarRanking()
      } catch (error) {
        console.error('Erro ao salvar pontuação:', error)
        erro.value = true
      } finally {
        salvando.value = false
      }
    }

    const naoSalvarNome = () => {
      if (salvando.value) return
      emit('fechar')
    }

    const fecharModal = () => {
      if (salvando.value) return
      emit('fechar')
    }

    onMounted(carregarRanking)

    return {
      nomeJogador,
      nomeInserido,
      ranking,
      salvando,
      erro,
      salvarPontuacao,
      naoSalvarNome,
      fecharModal
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-content {
  width: 90%;
  max-width: 500px;
  border-radius: 1rem;
  background-color: white;
  position: relative;
}

.table {
  margin-bottom: 0;
}

.table-success {
  background-color: #d4edda !important;
}

.form-control {
  border-radius: 0.5rem;
}

.btn {
  border-radius: 0.5rem;
}

.d-grid {
  display: grid;
  gap: 0.5rem;
}

.btn-close {
  z-index: 1;
}

.spinner-border {
  width: 1rem;
  height: 1rem;
}
</style> 