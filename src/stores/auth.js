import {ref, computed, onMounted} from 'vue'
import {defineStore} from 'pinia'
import {useFirebaseAuth} from 'vuefire'
import {signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import {useRouter} from 'vue-router'
export const useAuthStore = defineStore('auth',()=>{

    const auth = useFirebaseAuth()
    const errorMsg = ref('')
    const authUser = ref(null)
    const router = useRouter()
    

    const errorCodes = {
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'Constraseña incorrecta',
        'auth/invalid-login-credentials': 'Credenciales inválidas',
        'auth/invalid-email': 'Credenciales inválidas'
    }
    
    onMounted(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                authUser.value = user
            }
        })
    })

    const login = ({email,password})=>{
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            const user = userCredential.user
            authUser.value = user
            console.log('es correcto')
            
           router.push({name:'libros'})
        })
        .catch(error=>{
            errorMsg.value = errorCodes[error.code]
            setTimeout(()=>{
                errorMsg.value = ''
            },3000)
            
            console.log(error)
        })
    }

    const logout = ()=>{
        const confirmacion = window.confirm('¿Estás seguro de que deseas salir del sitio?');
        if (confirmacion) {
            try {
                signOut(auth).then(()=>{
                    authUser.value = null
                    router.push({name:'login'})
                }).catch(error =>{
                    console.log(error)
                })
            } catch (error) {
                console.error('Error al salir', error);
            }
        } else {
            console.log('Eliminación cancelada');
        }
        

    }
    
    const hasError = computed(()=>{
        return errorMsg.value
    })
    const isAuth = computed(()=>{
        return authUser.value
    })
    return {
        hasError,
        errorMsg,
        isAuth,
        login,
        logout,
    }
})