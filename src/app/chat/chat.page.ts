import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';
import { Mensaje } from '../clases/mensaje';
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  messages: any[] = [];
  nuevoMensaje = '';
  usuario:Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService, private authService:AuthService, private router: Router) { }

  ngOnInit() {
    this.usuarioService.getChatMessages().subscribe((data)=>{
      this.usuario = this.authService.usuarioLogueado;
      this.messages = data.sort((itemA:any, itemB:any)=>itemA.fechaCreacionParseada - itemB.fechaCreacionParseada);
    });
  }

  sendMessage() {
    this.usuarioService.addChatMessage(this.nuevoMensaje, this.authService.usuarioLogueado).then(() => {
      this.nuevoMensaje = '';
      this.content.scrollToBottom();
    });
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigateByUrl('/home');
    });
  }

}