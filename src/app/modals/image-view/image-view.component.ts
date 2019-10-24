import { Component, OnInit, } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
})

export class ImageViewComponent implements OnInit {
  imageUrl:string = null;
  name:string = "";
  time:any = ""

  constructor(navParams: NavParams, public modalCtrl:ModalController) { 
    this.imageUrl = navParams.get('imageUrl');
    this.time = navParams.get('time');
    this.name = navParams.get('name');
    
  }

  ngOnInit() {}

  goBack(){
    this.modalCtrl.dismiss().finally(()=>{
      this.imageUrl = null;
      this.time = "";
      this.name = "";
    })
  }

}
