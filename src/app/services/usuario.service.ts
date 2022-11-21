import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Mensaje } from '../clases/mensaje';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuariosRef: AngularFirestoreCollection;
  private mensajesARef: AngularFirestoreCollection;
  private mensajesBRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.usuariosRef = this.db.collection('usuarios');
    this.mensajesARef = this.db.collection('mensajesA');
    this.mensajesBRef = this.db.collection('mensajesB');
  }

  public crearUsuario(usuario: Usuario) {
    return this.usuariosRef.add({ ...usuario });
  }

  public obtenerUsuario() {
    return this.usuariosRef.valueChanges() as Observable<Object[]>;
  }

  public update(id: string, data: any) {
    return this.usuariosRef.doc(id).update(data);
  }

  public delete(id: string) {
    return this.usuariosRef.doc(id).delete();
  }

  public obtenerColeccionUsuario() {
    return this.usuariosRef.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a: any) => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id,  ...data };
        })
      )
    );
  }

  addChatMessage(mensaje:string, usuario:Usuario, aula:string) {
    if(aula == 'a'){
    return this.mensajesARef.add({
      mensaje: mensaje,
      usuario: {...usuario},
      createdAt: new Date()
    });}
    if(aula == 'b')
    {return this.mensajesBRef.add({
      mensaje: mensaje,
      usuario: {...usuario},
      createdAt: new Date()
    });}
  }
  
  getChatMessages(aula:string) {
    if(aula == 'a')
    {
      return this.mensajesARef.snapshotChanges().pipe(
        map((actions) =>
          actions.map((a: any) => {
            const data = a.payload.doc.data() as any;
            const fechaCreacionParseada = a.payload.doc.data().createdAt.toDate()
            const id = a.payload.doc.id;
            return { id, fechaCreacionParseada,...data };
          })
        )
      );
    }
    if(aula == 'b')
    {
      return this.mensajesBRef.snapshotChanges().pipe(
        map((actions) =>
          actions.map((a: any) => {
            const data = a.payload.doc.data() as any;
            const fechaCreacionParseada = a.payload.doc.data().createdAt.toDate()
            const id = a.payload.doc.id;
            return { id, fechaCreacionParseada,...data };
          })
        )
      );
    }

  }
  
  private getUserForMsg(msgFromId, users: Usuario[]): string {
    for (let usr of users) {
      if (usr.id == msgFromId) {
        return usr.mail;
      }
    }
    return 'Deleted';
  }
}