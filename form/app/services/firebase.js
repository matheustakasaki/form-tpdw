import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCLI6u__toG-8ursaCmuvaKeAp73tytJ5c',
  authDomain: 'form-puc.firebaseapp.com',
  projectId: 'form-puc',
  storageBucket: 'form-puc.firebasestorage.app',
  messagingSenderId: '561245652037',
  appId: '1:561245652037:web:8be9a26b760c7edb9bcf2c',
  measurementId: 'G-GFD846J09D',
}

// Inicialização dos serviços
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app) // opcional
const auth = getAuth(app)
const db = getFirestore(app)

// Exporte o que será usado em outros arquivos
export { auth, db }
