import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {

  // 3) Atributos
  items: Observable<any[]>;

  // 3.1) Atributos
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(

    // 2) Injeta dependências
    firestore: AngularFirestore,
    public menuCtrl: MenuController
  ) {

    // 4) Ler dados do banco de dados
    // this.item = firestore.collection('articles').valueChanges({ idField: 'id' });

    // 4.1) Ler dados do banco de dados com filtro

    this.itemsCollection  = firestore.collection<any>(
      'job', // Coleção a ser consultada
      ref => ref // Aplica filtros
        .orderBy('date', 'desc') // Ordena por 'date' na ordem decrescente

      /*
        ATENÇÃO!
          Será necessário gerar um índice no Firestore para que esta query funcione.
          O link para gerar o índice aparece no console.
          Logue-se no Firebase.com e clique no link do console.
      */
    );

    // 5. Obtém os ítens da coleção e também o 'id' de cada item.
    this.items = this.itemsCollection.valueChanges({ idField: 'id' });

  }

  ngOnInit() { this.menuCtrl.enable(true); }
}
