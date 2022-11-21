import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, LoadingController } from '@ionic/angular';
import { Usuario } from '../clases/usuario';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-chat4-b',
  templateUrl: './chat4-b.page.html',
  styleUrls: ['./chat4-b.page.scss'],
})
export class Chat4BPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  messages: any[] = [];
  nuevoMensaje = '';
  usuario:Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService, private authService:AuthService, private router: Router,
    private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.usuarioService.getChatMessages('b').subscribe((data)=>{
      this.usuario = this.authService.usuarioLogueado;
      this.messages = data.sort((itemA:any, itemB:any)=>itemA.fechaCreacionParseada - itemB.fechaCreacionParseada);
    });
  }

  sendMessage() {
    this.usuarioService.addChatMessage(this.nuevoMensaje, this.authService.usuarioLogueado, 'b').then(() => {
      this.nuevoMensaje = '';
      this.content.scrollToBottom();
    });
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigateByUrl('/home');
    });
  }

  autoHideShow() {
    this.loadingCtrl
      .create({
        message: 'Cargando...',
        duration: 2000,
        cssClass: 'ion-loading-class',
        spinner: 'crescent',
      })
      .then((res) => {
        res.present();
        res.onDidDismiss().then((res2) => {
          console.log('Loader closed', res2);
        });
      });
  }
}
