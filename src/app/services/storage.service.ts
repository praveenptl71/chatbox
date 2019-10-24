import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public events:Events) { }

  addUsers(users:object){
    localStorage.setItem("allUsers", JSON.stringify(users));
    setTimeout(()=>{
      this.events.publish("UsersUpdated");
    }, 300);
  }

  getUsers(){
    return JSON.parse(localStorage.getItem("allUsers"));
  }

  addRooms(users:object){
    localStorage.setItem("allRooms", JSON.stringify(users));
    setTimeout(()=>{
      this.events.publish("RoomsUpdated");
    }, 300);
  }

  getRooms(){
    return JSON.parse(localStorage.getItem("allRooms"));
  }
}
