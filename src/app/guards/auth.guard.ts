import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public navCtrl:NavController) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isComplete = await firebase.auth().currentUser;

    if (!isComplete) {
      this.navCtrl.navigateRoot('/');
      console.log("not authenticated")
      return false;
    }
    else
      return true;    
  }
  
}
