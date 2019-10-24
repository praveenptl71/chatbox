import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  toast:any=null;

  constructor(public toastCtrl:ToastController) { 
    
  }


  async showToast(message:string, position:string="bottom",duration:number=3000){
    this.toast = await this.toastCtrl.create({
      message:message,
      duration : duration
    });
    this.toast.present();
  }

  hideToast(){
    try {
      this.toast.dismiss();
    } catch (error) {
      
    }
  }

  
}
