import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent implements OnInit {

  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {}

  openAction(action:string){
    this.modalCtrl.dismiss(action);
  }

}
