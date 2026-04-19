import api from "./api";

export default {

    funListar(){
        return api().get("/producto");
    },

    funGuardar(datos){
        return api().post("/producto");
    },

    funMostrar(id){
        return api().get("/producto"+id);
    },

    funModificar(id, datos){
        return api().put("/producto"+id, datos);
    },

    funEliminar(id){
        return api().delete("/producto"+id);
    }
}