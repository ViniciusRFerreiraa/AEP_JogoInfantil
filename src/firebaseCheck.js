import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

// Função para verificar a conexão com o Firebase
export const verificarFirebase = async () => {
  try {
    const rankingRef = collection(db, 'ranking')
    await getDocs(rankingRef)
    console.log('✅ Conexão com o Firebase estabelecida com sucesso!')
    return true
  } catch (error) {
    console.error('❌ Erro na conexão com o Firebase:', error)
    return false
  }
} 