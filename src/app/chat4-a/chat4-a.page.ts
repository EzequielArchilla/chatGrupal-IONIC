import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, LoadingController, ToastController } from '@ionic/angular';
import { Usuario } from '../clases/usuario';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-chat4-a',
  templateUrl: './chat4-a.page.html',
  styleUrls: ['./chat4-a.page.scss'],
})
export class Chat4APage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  messages: any[] = [];
  nuevoMensaje = '';
  usuario:Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService, private authService:AuthService, private router: Router,
    private loadingCtrl:LoadingController,
    private toastController:ToastController) { }

  ngOnInit() {
    this.usuarioService.getChatMessages('a').subscribe((data)=>{
      this.usuario = this.authService.usuarioLogueado;
      this.messages = data.sort((itemA:any, itemB:any)=>itemA.fechaCreacionParseada - itemB.fechaCreacionParseada);
    });
  }

  sendMessage() {
    console.log(this.authService.usuarioLogueado.mail);
    if(this.authService.usuarioLogueado.mail != ''){
    this.usuarioService.addChatMessage(this.nuevoMensaje, this.authService.usuarioLogueado, 'a').then(() => {
      this.nuevoMensaje = '';
      this.content.scrollToBottom();
    });
  }
  else{
    this.presentToast();
    setTimeout(()=>{
      this.signOut()
    },2000)
  }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Su sesion se ha cerrado.',
      duration: 2000
    });
    toast.present();
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
