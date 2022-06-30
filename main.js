const API = " https://graph.facebook.com/";
const CAMPOS ="?fields=id,name,email,picture,birthday&";
const TOKEN="access_token=EAAEQemjqqbQBACptfxsiGy7SW45dzjeWBqi1SCucxT3ShwWBs1JFLOExOZC8vIDiN5To1SzF3ZBsTGg3RLoFHpVwrPUmfHWlzSrlCZAvZC1BXltrIZAEcK57mVF6nK5QKn4oeObmYlLxYmbDIMGaJxNVwtfgwHpoTcjZAncnsCIQZDZD"


/*async function Buscar(){
    const response= await fetch(API + "santi")
    const data = await response.json()
    console.log(data)
}*/
const app = Vue.createApp({
    data(){
        return{
            message: 'hello vue!',
            busqueda: null,
            result:null,
            error: null,
            favoritos: new Map()//se crea un map para guardar los favoritos
        }
    },
    //aqu8 vamos a obtener los favoritos del localstorage
    created(){
        const FavoritosGuardados = JSON.parse( window.localStorage.getItem("misFavoritos"))
        //esta evaluando y ademas midiendo su longitud se abrevia con el ?
        if(FavoritosGuardados?.length){
         //el metodo map para obtener la id como un key y el arreglo completo como el value de mi mao
            const favoritosRebuid = new Map(FavoritosGuardados.map(alias=>[alias.id,alias]))
            //asignamos a la variable favoritos de la instancia el valor nuevo favoritosrebuild
            this.favoritos =favoritosRebuid
       }
    },
    computed:{
        //quremos saber si esta en favoritos
        estafavoritos(){
            return this.favoritos.has(this.result.id)
        },

        todosfavoritos(){
            //poasamos la informacion a un autentico array
            return Array.from(this.favoritos.values())
            //el metodo value traera los valores sin las claves)
        }
    },
    methods:{
        async Buscar(){
            //depende del error
            this.result=this.error=null
            try {
                const response = await fetch(API + this.busqueda+CAMPOS+TOKEN)

                if(!response.ok) throw new Error("usuario no encontrado")
               
                const data = await response.json()
                console.log(data)
                this.result=data
            } catch (error) {
                this.error = error
            }
            
        },//aqui se cerro el metodo buscar

        addFavorito(){
        this.favoritos.set(this.result.id,this.result)
        this.Actualizarstorage()   
        },

        RemoverFavorito(){
            this.favoritos.delete(this.result.id)  
            this.Actualizarstorage()    
           },

           Actualizarstorage(){
               window.localStorage.setItem('misFavoritos',JSON.stringify(this.todosfavoritos))
           }
    }
    //1000006229876280
    //1000006374922337
})