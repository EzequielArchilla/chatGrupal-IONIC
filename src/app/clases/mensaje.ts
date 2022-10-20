import { Usuario } from "./usuario";

export class Mensaje {
    fechaCreacion: Date;
    idMensaje: string;
    usuario:Usuario;
    mensaje: string;
    myMsg: boolean;

    constructor()
    {
        this.fechaCreacion = new Date();
        this.idMensaje = '';
        this.usuario = new Usuario();
        this.mensaje = '';
        this.myMsg = false;
    }
}
