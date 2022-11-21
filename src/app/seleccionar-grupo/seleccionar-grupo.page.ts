import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-seleccionar-grupo',
  templateUrl: './seleccionar-grupo.page.html',
  styleUrls: ['./seleccionar-grupo.page.scss'],
})
export class SeleccionarGrupoPage implements OnInit {
  spinnerHidden: boolean;

  constructor(public loadingCtrl: LoadingController, private auth:AuthService, private router:Router) {
    this.spinnerHidden = false;
   }

  ngOnInit() {
  }

  autoHideShow() {
    this.loadingCtrl
      .create({
        message: 'Cargando...',
        duration: 2000,
        translucent: true,
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

  logout() {
    this.auth
      .signOut()
      .then((ok) => {
        this.navigateTo('/home');
      })
      .catch((err) => {
        this.navigateTo('/home');
      });
  }

  navigateTo(url: string) {
    this.autoHideShow();
    setTimeout(() => {
      this.router.navigateByUrl(url);
    }, 2000);
  }
}
