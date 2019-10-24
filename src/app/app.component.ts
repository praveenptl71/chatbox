import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';

import { UserService } from './services/user.service';
import { RoomService } from './services/room.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    public userService: UserService, public roomService: RoomService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
    });
  }

  
}
