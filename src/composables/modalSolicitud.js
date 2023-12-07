import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useModalStore = defineStore('modal',()=>{
    
    
    const modal = ref(false)
    const libro = ref({})
    
    //modal especie
    function handleClickModal(){
        modal.value = !modal.value
    }
   
    const solicitarLibro = (data)=>{
        libro.value = data 
        handleClickModal()
    }

   
    return{
        modal,
        libro,
        solicitarLibro,
        handleClickModal
    }
});