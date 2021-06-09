import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

// Alert Controller
import { AlertController } from '@ionic/angular';

// Usuário autenticado
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

// 6) Não permite somente espaços nos campos
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}
@Component({
  selector: 'app-newjob',
  templateUrl: './newjob.page.html',
  styleUrls: ['./newjob.page.scss'],
})
export class NewjobPage implements OnInit {

  // 3) Atributos
  public registerForm: FormGroup; // Contém o formulário de cadastro
  public pipe = new DatePipe('en_US'); // Formatar as datas

  constructor(
    // 2) Injeta dependências
    public form: FormBuilder,
    public firestore: AngularFirestore,

    // Alert Controller
    public alert: AlertController,

    // Usuário autenticado
    public auth: AngularFireAuth,

    public router: Router
  ) { }

  ngOnInit() {
    // 4) Cria o formulário de contatos
    this.registerFormCreate();

    // Preenche os campos se usuário está logado
    if (this.registerForm) {
      this.auth.onAuthStateChanged(
        (userData) => {
          if (userData) {
            this.registerForm.controls.uid.setValue(userData.uid.trim());
          }
        }
      );
    }
  }

  // 5) Cria o formulário de contatos
  registerFormCreate() {

    // 'registerForm' contém o formulário
    // Um formulário é um 'agrupamento' (group) de campos...
    this.registerForm = this.form.group({

      // Data de cadastro (date)
      // * Será gerada automaticamente pelo script
      date: [''],

      // Campo 'Nome' (name)
      service: [
        '', // Valor inicial
        Validators.compose([ // Validação do campo
          Validators.required, // Obrigatório
          Validators.minLength(3), // Pelo menos 3 caracteres
          removeSpaces // Não permite somente espaços
        ]),
      ],

          // Campo 'Nome' 
          name: [
            '',
            Validators.compose([
              Validators.required,
              Validators.minLength(3),
              removeSpaces
            ]),
          ],

      // Campo 'E-mail' (email)
      value: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          removeSpaces
        ]),
      ],

      // Campo 'Whatsapp' (whatsapp)
      whatsapp: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/),
          removeSpaces
        ]),
      ],

        // Campo 'bairro' ()
        maps: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            removeSpaces
          ]),
        ],

         // Campo 'imagem' ()
         photo: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            removeSpaces
          ]),
        ],

      

      // Id do usuário logado (uid)
      uid: ['']

    });
  }

  // 7) Processa o envio do formulário]
  registerSend() {

    // Cria e formata a data
    this.registerForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim()
    );

    // Salva em um novo documento do Firebase Firestore
    this.firestore.collection('job').add(this.registerForm.value)
      .then(
        () => {

          // Feedback
          this.presentAlert();
        }
      )
      .catch(

        // Exibe erro se não salvar
        (error) => {
          alert('Erro ao cadastrar.' + error);
        }
      );
  }

  // Feedback
  // Exibe feedback
  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Oba!',
      message: 'Cadastro realizado com sucesso!',
      buttons: [{
        text: 'Ok',
        handler: () => {

          this.router.navigate(['/job']);

        }
      }]
    });

    await alert.present();
  }
}
