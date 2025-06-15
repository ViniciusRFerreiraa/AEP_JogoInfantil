<template>
  <div class="container-fluid min-vh-100 py-4">
    <div class="container">
      <!-- Botão Voltar -->
      <div class="row mb-4">
        <div class="col-12">
          <button @click="voltarInicio" class="btn rounded-pill px-4 py-2 voltar-btn">
            <i class="mdi mdi-arrow-left me-2"></i>
            Voltar para Início
          </button>
        </div>
      </div>

      <!-- Header com nível e pontuação -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card bg-nivel shadow-sm">
            <div class="card-body">
              <h2 class="mb-0 text-white d-flex align-items-center">
                <i class="mdi mdi-flag me-2"></i>
                Nível {{ nivelAtual }}/10
              </h2>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card bg-pontuacao shadow-sm">
            <div class="card-body">
              <h2 class="mb-0 text-white d-flex align-items-center">
                <i class="mdi mdi-star me-2"></i>
                Pontuação: {{ pontuacao }}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <!-- Lixeiras -->
      <div class="row row-cols-2 row-cols-md-3 g-4 mb-4 justify-content-center">
        <div v-for="lixeira in lixeiras" :key="lixeira.tipo" class="col">
          <div
            class="card h-100 shadow-sm lixeira-card"
            :class="[`bg-${lixeira.tipo}`, { 'highlight': itemArrastando }]"
            @dragenter.prevent
            @dragover.prevent
            @drop="soltarItem($event, lixeira.tipo)"
          >
            <div class="card-body text-center text-white">
              <i :class="lixeira.icone" class="fs-1"></i>
              <h5 class="card-title mt-2">{{ lixeira.nome }}</h5>
            </div>
          </div>
        </div>
      </div>

      <!-- Itens recicláveis -->
      <div class="row row-cols-2 row-cols-md-4 g-4 justify-content-center">
        <div v-for="(item, index) in itensNivelAtual" :key="index" class="col">
          <div
            v-if="!item.reciclado"
            class="card h-100 shadow-sm item-card"
            :class="{
              'card-item': true,
              'acerto-papel': item.status === 'correto' && item.tipo === 'papel',
              'acerto-plastico': item.status === 'correto' && item.tipo === 'plastico',
              'acerto-metal': item.status === 'correto' && item.tipo === 'metal',
              'acerto-vidro': item.status === 'correto' && item.tipo === 'vidro',
              'acerto-organico': item.status === 'correto' && item.tipo === 'organico',
              'erro': item.status === 'incorreto'
            }"
            draggable="true"
            @dragstart="iniciarArrasto($event, item)"
            @dragend="finalizarArrasto"
          >
            <div class="card-body text-center">
              <i :class="item.icone" class="fs-1"></i>
              <h5 class="card-title mt-2">{{ item.nome }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tela Final -->
    <TelaFinal
      v-if="jogoFinalizado"
      :pontuacao="pontuacao"
      @voltar-inicio="voltarInicio"
    />
  </div>
</template>

<script>
import TelaFinal from './TelaFinal.vue'

export default {
  name: 'TelaJogo',
  components: {
    TelaFinal
  },
  data() {
    return {
      nivelAtual: 1,
      pontuacao: 0,
      itemArrastando: false,
      jogoFinalizado: false,
      lixeiras: [
        {
          tipo: 'papel',
          nome: 'Papel',
          icone: 'mdi mdi-newspaper',
          cor: '#2196F3'
        },
        {
          tipo: 'plastico',
          nome: 'Plástico',
          icone: 'mdi mdi-bottle-soda',
          cor: '#F44336'
        },
        {
          tipo: 'metal',
          nome: 'Metal',
          icone: 'mdi mdi-recycle-variant',
          cor: '#FFC107'
        },
        {
          tipo: 'vidro',
          nome: 'Vidro',
          icone: 'mdi mdi-bottle-wine',
          cor: '#4CAF50'
        },
        {
          tipo: 'organico',
          nome: 'Orgânico',
          icone: 'mdi mdi-food-apple',
          cor: '#795548'
        }
      ],
      itensReciclaveis: {
        papel: [
          { nome: 'Jornal', icone: 'mdi mdi-newspaper', tipo: 'papel' },
          { nome: 'Revista', icone: 'mdi mdi-book-open-page-variant', tipo: 'papel' },
          { nome: 'Caderno', icone: 'mdi mdi-notebook', tipo: 'papel' },
          { nome: 'Caixa', icone: 'mdi mdi-package-variant-closed', tipo: 'papel' },
          { nome: 'Envelope', icone: 'mdi mdi-email', tipo: 'papel' },
          { nome: 'Papel Sulfite', icone: 'mdi mdi-file', tipo: 'papel' },
          { nome: 'Livro', icone: 'mdi mdi-book', tipo: 'papel' },
          { nome: 'Papelão', icone: 'mdi mdi-box-shadow', tipo: 'papel' },
          { nome: 'Cartaz', icone: 'mdi mdi-poster', tipo: 'papel' },
          { nome: 'Folheto', icone: 'mdi mdi-file-document', tipo: 'papel' },
          { nome: 'Agenda', icone: 'mdi mdi-calendar-blank', tipo: 'papel' },
          { nome: 'Calendário', icone: 'mdi mdi-calendar', tipo: 'papel' },
          { nome: 'Cartão', icone: 'mdi mdi-card-text', tipo: 'papel' },
          { nome: 'Papel de Presente', icone: 'mdi mdi-gift', tipo: 'papel' },
          { nome: 'Apostila', icone: 'mdi mdi-book-open', tipo: 'papel' },
          { nome: 'Papel de Carta', icone: 'mdi mdi-email-outline', tipo: 'papel' },
          { nome: 'Caixa de Sapato', icone: 'mdi mdi-shoe-formal', tipo: 'papel' },
          { nome: 'Caixa de Pizza', icone: 'mdi mdi-pizza', tipo: 'papel' },
          { nome: 'Papel de Embrulho', icone: 'mdi mdi-gift-outline', tipo: 'papel' },
          { nome: 'Rótulo de Papel', icone: 'mdi mdi-label', tipo: 'papel' }
        ],
        plastico: [
          { nome: 'Garrafa PET', icone: 'mdi mdi-bottle-soda', tipo: 'plastico' },
          { nome: 'Sacola', icone: 'mdi mdi-shopping', tipo: 'plastico' },
          { nome: 'Pote Plástico', icone: 'mdi mdi-cup', tipo: 'plastico' },
          { nome: 'Brinquedo', icone: 'mdi mdi-toy-brick', tipo: 'plastico' },
          { nome: 'Embalagem de Shampoo', icone: 'mdi mdi-bottle-tonic-outline', tipo: 'plastico' },
          { nome: 'Garrafa de Água', icone: 'mdi mdi-bottle-soda-outline', tipo: 'plastico' },
          { nome: 'Pente', icone: 'mdi mdi-hair-dryer', tipo: 'plastico' },
          { nome: 'Balde', icone: 'mdi mdi-bucket', tipo: 'plastico' },
          { nome: 'Embalagem de Iogurte', icone: 'mdi mdi-cup-outline', tipo: 'plastico' },
          { nome: 'Régua', icone: 'mdi mdi-ruler', tipo: 'plastico' },
          { nome: 'Garrafa de Leite', icone: 'mdi mdi-bottle-tonic', tipo: 'plastico' },
          { nome: 'Embalagem de Detergente', icone: 'mdi mdi-spray', tipo: 'plastico' },
          { nome: 'Pote de Margarina', icone: 'mdi mdi-bowl', tipo: 'plastico' },
          { nome: 'Tubo de Pasta', icone: 'mdi mdi-toothbrush-paste', tipo: 'plastico' },
          { nome: 'Garrafa de Suco', icone: 'mdi mdi-bottle-wine-outline', tipo: 'plastico' },
          { nome: 'Embalagem de Biscoito', icone: 'mdi mdi-cookie', tipo: 'plastico' },
          { nome: 'Pote de Sorvete', icone: 'mdi mdi-ice-cream', tipo: 'plastico' },
          { nome: 'Sacola de Mercado', icone: 'mdi mdi-shopping-outline', tipo: 'plastico' },
          { nome: 'Embalagem de Sabão', icone: 'mdi mdi-water', tipo: 'plastico' },
          { nome: 'Garrafa de Refrigerante', icone: 'mdi mdi-bottle-soda-classic', tipo: 'plastico' },
          { nome: 'Copo de Suco', icone: 'mdi mdi-glass-mug', tipo: 'plastico' }
        ],
        metal: [
          { nome: 'Lata', icone: 'mdi mdi-beer', tipo: 'metal' },
          { nome: 'Panela', icone: 'mdi mdi-pot', tipo: 'metal' },
          { nome: 'Alumínio', icone: 'mdi mdi-silverware', tipo: 'metal' },
          { nome: 'Ferramentas', icone: 'mdi mdi-tools', tipo: 'metal' },
          { nome: 'Prego', icone: 'mdi mdi-nail', tipo: 'metal' },
          { nome: 'Parafuso', icone: 'mdi mdi-screw-flat-top', tipo: 'metal' },
          { nome: 'Chave', icone: 'mdi mdi-key', tipo: 'metal' },
          { nome: 'Clips', icone: 'mdi mdi-paperclip', tipo: 'metal' },
          { nome: 'Tesoura', icone: 'mdi mdi-scissors-cutting', tipo: 'metal' },
          { nome: 'Moeda', icone: 'mdi mdi-currency-usd', tipo: 'metal' },
          { nome: 'Lata de Refrigerante', icone: 'mdi mdi-beer', tipo: 'metal' },
          { nome: 'Lata de Conserva', icone: 'mdi mdi-bowl-mix', tipo: 'metal' },
          { nome: 'Talheres', icone: 'mdi mdi-silverware-fork-knife', tipo: 'metal' },
          { nome: 'Arame', icone: 'mdi mdi-vector-line', tipo: 'metal' },
          { nome: 'Tampinha', icone: 'mdi mdi-bottle-soda-classic', tipo: 'metal' },
          { nome: 'Grampo', icone: 'mdi mdi-paperclip-check', tipo: 'metal' },
          { nome: 'Alicate', icone: 'mdi mdi-pliers', tipo: 'metal' },
          { nome: 'Chave de Fenda', icone: 'mdi mdi-screwdriver', tipo: 'metal' },
          { nome: 'Martelo', icone: 'mdi mdi-hammer', tipo: 'metal' },
          { nome: 'Forma de Bolo', icone: 'mdi mdi-cake', tipo: 'metal' }
        ],
        vidro: [
          { nome: 'Garrafa', icone: 'mdi mdi-bottle-wine', tipo: 'vidro' },
          { nome: 'Copo', icone: 'mdi mdi-glass-wine', tipo: 'vidro' },
          { nome: 'Pote de Vidro', icone: 'mdi mdi-bottle-tonic', tipo: 'vidro' },
          { nome: 'Perfume', icone: 'mdi mdi-spray', tipo: 'vidro' },
          { nome: 'Espelho', icone: 'mdi mdi-mirror', tipo: 'vidro' },
          { nome: 'Janela', icone: 'mdi mdi-window-closed', tipo: 'vidro' },
          { nome: 'Lâmpada', icone: 'mdi mdi-lightbulb', tipo: 'vidro' },
          { nome: 'Aquário', icone: 'mdi mdi-fishbowl', tipo: 'vidro' },
          { nome: 'Taça', icone: 'mdi mdi-glass-cocktail', tipo: 'vidro' },
          { nome: 'Jarra', icone: 'mdi mdi-bottle-wine-outline', tipo: 'vidro' },
          { nome: 'Vidro de Conserva', icone: 'mdi mdi-bottle-tonic-skull', tipo: 'vidro' },
          { nome: 'Garrafa de Vinho', icone: 'mdi mdi-bottle-wine', tipo: 'vidro' },
          { nome: 'Vidro de Tempero', icone: 'mdi mdi-shaker', tipo: 'vidro' },
          { nome: 'Vidro de Azeitona', icone: 'mdi mdi-bottle-tonic-plus', tipo: 'vidro' },
          { nome: 'Garrafa de Azeite', icone: 'mdi mdi-oil', tipo: 'vidro' },
          { nome: 'Vidro de Palmito', icone: 'mdi mdi-bottle-tonic-outline', tipo: 'vidro' },
          { nome: 'Porta de Vidro', icone: 'mdi mdi-door', tipo: 'vidro' },
          { nome: 'Vidro de Molho', icone: 'mdi mdi-bottle-soda', tipo: 'vidro' },
          { nome: 'Vidro de Café', icone: 'mdi mdi-coffee', tipo: 'vidro' },
          { nome: 'Vidro de Remédio', icone: 'mdi mdi-pill', tipo: 'vidro' }
        ],
        organico: [
          { nome: 'Casca de Banana', icone: 'mdi mdi-food-apple', tipo: 'organico' },
          { nome: 'Restos de Comida', icone: 'mdi mdi-food', tipo: 'organico' },
          { nome: 'Folhas', icone: 'mdi mdi-leaf', tipo: 'organico' },
          { nome: 'Casca de Ovo', icone: 'mdi mdi-egg', tipo: 'organico' },
          { nome: 'Borra de Café', icone: 'mdi mdi-coffee', tipo: 'organico' },
          { nome: 'Casca de Fruta', icone: 'mdi mdi-fruit-watermelon', tipo: 'organico' },
          { nome: 'Galhos', icone: 'mdi mdi-tree', tipo: 'organico' },
          { nome: 'Flores', icone: 'mdi mdi-flower', tipo: 'organico' },
          { nome: 'Legumes', icone: 'mdi mdi-carrot', tipo: 'organico' },
          { nome: 'Pão Velho', icone: 'mdi mdi-bread-slice', tipo: 'organico' },
          { nome: 'Casca de Laranja', icone: 'mdi mdi-fruit-citrus', tipo: 'organico' },
          { nome: 'Erva de Chá', icone: 'mdi mdi-tea', tipo: 'organico' },
          { nome: 'Casca de Batata', icone: 'mdi mdi-potato', tipo: 'organico' },
          { nome: 'Casca de Cebola', icone: 'mdi mdi-onion', tipo: 'organico' },
          { nome: 'Folha de Alface', icone: 'mdi mdi-leaf-maple', tipo: 'organico' },
          { nome: 'Casca de Maçã', icone: 'mdi mdi-fruit-cherries', tipo: 'organico' },
          { nome: 'Restos de Verdura', icone: 'mdi mdi-sprout', tipo: 'organico' },
          { nome: 'Casca de Abacaxi', icone: 'mdi mdi-pine-tree', tipo: 'organico' },
          { nome: 'Casca de Melancia', icone: 'mdi mdi-fruit-watermelon', tipo: 'organico' },
          { nome: 'Restos de Jardim', icone: 'mdi mdi-grass', tipo: 'organico' }
        ]
      },
      itensNivelAtual: []
    }
  },
  created() {
    this.iniciarNivel()
  },
  methods: {
    iniciarNivel() {
      const todosItens = Object.values(this.itensReciclaveis).flat()
      this.itensNivelAtual = this.embaralharArray(todosItens)
        .slice(0, 5)
        .map(item => ({ ...item, reciclado: false }))
    },
    embaralharArray(array) {
      const newArray = [...array]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
      }
      return newArray
    },
    iniciarArrasto(event, item) {
      const index = this.itensNivelAtual.indexOf(item)
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', index.toString())
      this.itemArrastando = true
    },
    finalizarArrasto() {
      this.itemArrastando = false
    },
    soltarItem(event, tipoLixeira) {
      const itemIndex = parseInt(event.dataTransfer.getData('text/plain'))
      const item = this.itensNivelAtual[itemIndex]
      
      if (!item) return

      const estaCorreto = item.tipo === tipoLixeira
      
      if (estaCorreto) {
        item.status = 'correto'
        this.pontuacao += 10
        
        setTimeout(() => {
          item.reciclado = true
          
          const todosReciclados = this.itensNivelAtual.every(i => i.reciclado)
          if (todosReciclados) {
            if (this.nivelAtual === 10) {
              setTimeout(() => {
                this.jogoFinalizado = true
              }, 500)
            } else {
              setTimeout(() => {
                this.nivelAtual++
                this.iniciarNivel()
              }, 1000)
            }
          }
        }, 600)
      } else {
        item.status = 'incorreto'
        setTimeout(() => {
          item.status = null
        }, 800)
      }
    },
    reiniciarJogo() {
      this.nivelAtual = 1
      this.pontuacao = 0
      this.jogoFinalizado = false
      this.itemArrastando = false
      this.iniciarNivel()
    },
    voltarInicio() {
      this.$emit('voltar-inicio')
    }
  }
}
</script>

<style scoped>
.item-card {
  cursor: grab;
  transition: all 0.3s ease;
  user-select: none;
  position: relative;
  overflow: hidden;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.item-card:active {
  cursor: grabbing;
}

.feedback-correto {
  animation: feedbackCorreto 0.6s ease forwards;
  background-color: #4CAF50 !important;
  border-color: #4CAF50 !important;
  color: white !important;
}

.feedback-incorreto {
  animation: feedbackIncorreto 0.8s ease;
  background-color: #F44336 !important;
  border-color: #F44336 !important;
  color: white !important;
}

.lixeira-card {
  transition: all 0.3s ease;
  user-select: none;
  min-height: 160px;
}

.lixeira-card.highlight {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.card {
  border-radius: 1rem;
  background-color: white;
}

/* Cores de fundo para as lixeiras */
.bg-papel {
  background-color: #2196F3 !important;
  border-color: #1976D2 !important;
}

.bg-plastico {
  background-color: #F44336 !important;
  border-color: #D32F2F !important;
}

.bg-metal {
  background-color: #FFC107 !important;
  border-color: #FFA000 !important;
}

.bg-vidro {
  background-color: #4CAF50 !important;
  border-color: #388E3C !important;
}

.bg-organico {
  background-color: #795548 !important;
  border-color: #5D4037 !important;
}

.lixeira-card i {
  font-size: 2.5rem;
}

/* Removendo as cores específicas dos ícones das lixeiras pois agora são brancos */
[data-tipo] i { color: white !important; }

/* Animações */
@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes feedbackCorreto {
  0% {
    transform: scale(1);
    background-color: white;
    opacity: 1;
  }
  40% {
    transform: scale(1.1);
    background-color: #4CAF50;
    opacity: 1;
  }
  100% {
    transform: scale(0);
    background-color: #4CAF50;
    opacity: 0;
  }
}

@keyframes feedbackIncorreto {
  0% {
    transform: scale(1);
    background-color: white;
  }
  25% {
    transform: translateX(-5px);
    background-color: #F44336;
  }
  50% {
    transform: translateX(5px);
    background-color: #F44336;
  }
  75% {
    transform: translateX(-5px);
    background-color: #F44336;
  }
  100% {
    transform: translateX(0);
    background-color: #F44336;
  }
}

.item-card {
  animation: aparecer 0.3s ease-out;
}

/* Garantir que os ícones fiquem brancos durante o feedback */
.feedback-correto i,
.feedback-incorreto i {
  color: white !important;
}

/* Cards de nível e pontuação */
.bg-nivel {
  background: linear-gradient(45deg, #9C27B0, #673AB7);
  border: none;
  border-radius: 1rem;
}

.bg-pontuacao {
  background: linear-gradient(45deg, #E91E63, #EC407A);
  border: none;
  border-radius: 1rem;
}

.bg-nivel i {
  color: #FFFFFF;
}

.bg-pontuacao i {
  color: #FFD700;
}

.bg-nivel, .bg-pontuacao {
  transition: all 0.3s ease;
}

.bg-nivel:hover, .bg-pontuacao:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Garantindo que todo texto nos cards seja branco */
.bg-nivel h2, .bg-pontuacao h2 {
  color: white !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

/* Feedback visual para acertos e erros */
.card-item.acerto-papel {
  background-color: #2196F3 !important;
  color: white !important;
  border: 2px solid #1976D2;
}

.card-item.acerto-plastico {
  background-color: #F44336 !important;
  color: white !important;
  border: 2px solid #D32F2F;
}

.card-item.acerto-metal {
  background-color: #FFC107 !important;
  color: white !important;
  border: 2px solid #FFA000;
}

.card-item.acerto-vidro {
  background-color: #4CAF50 !important;
  color: white !important;
  border: 2px solid #388E3C;
}

.card-item.acerto-organico {
  background-color: #795548 !important;
  color: white !important;
  border: 2px solid #5D4037;
}

.card-item.erro {
  background-color: #212121 !important;
  color: white !important;
  border: 2px solid #000000;
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.voltar-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background-color: #212121;
  color: white;
  border: 2px solid #212121;
  transition: all 0.3s ease;
}

.voltar-btn:hover {
  transform: translateX(-5px);
  background-color: white;
  color: #212121;
  border: 2px solid #212121;
}
</style>