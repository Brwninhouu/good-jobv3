import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // 3) Atributos

  constructor(

    // 2) Injeta dependências
    public auth: AngularFireAuth,
    private router: Router,
    public alert: AlertController,
    public menuCtrl: MenuController
  ) { 
    
   }

  ngOnInit()  {this.menuCtrl.enable(false);}

  // 4) Método de login
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

      // Se o login funcionar
      .then(
        (data: any) => {
          this.feedback(data.user.displayName);
        }
      )

      // Se o login falhar
      .catch(
        (error) => {
          console.log(error)
        }
      );
  }

  // 5) Feeback e saida da página
  async feedback(userName: string) {
    const alert = await this.alert.create({
      header: `Olá ${userName}!`,
      message: 'Login efetuado com sucesso!',
      buttons: [{
        text: 'Beleza',


        
        handler: () => {
          this.router.navigate(['job']);
        }



      }]
    });

    await alert.present();
  }
}
