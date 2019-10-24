import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { PathsService } from '../services/paths.service';
import { PopupService } from '../services/popup.service';

interface userProfile {
  descriptions? : string;
  name? : string;
  phone? : string;
  pictureURL? : string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:any = [];
  usersMeta:any;
  onlineIds:any= [];

  constructor(public Paths:PathsService, public popupService:PopupService) { }

  getCurrentUser(){
    return firebase.auth().currentUser.toJSON();
  }

  getCurrentUserUid(){ 
    return (firebase.auth().currentUser)?firebase.auth().currentUser.uid:"";
  }

  registerToken(token:any){
    return new Promise((resolve, reject)=>{
      if(this.getCurrentUserUid()){
        this.Paths.userDeviceTokenRef(this.getCurrentUserUid()).update({
          token:token, time:firebase.database.ServerValue.TIMESTAMP
        },  (data:any)=>{
          if(data){
            console.log(data);
            reject(data)
          }
          else{
            resolve(true)
          }
        })
      }
      else{
        reject("Authentication failed")
      }
    })
    
  }

  updateProfile(metaData:any){
    if(this.getCurrentUserUid()){
      this.Paths.userMetaRef(this.getCurrentUserUid()).update(metaData)
    }
    this.popupService.showToast("Profile updated");
  }

  updateUserProfile(metaData:userProfile){
    this.updateProfile(metaData);
  }

  getOnlineUsers(){
    this.Paths.onlineUsersRef().on('value', (snap:any)=>{
      if(snap.val()){
        this.onlineIds = snap.val();
      }
      else{
        this.onlineIds = [];
      }
    })
  }

  addRemoveOnline(){
    let ref = this.Paths.userOnlineRef(this.getCurrentUserUid());
    ref.onDisconnect().update({status : false,time: firebase.database.ServerValue.TIMESTAMP});
    ref.update({
      uid: this.getCurrentUserUid(),
      status : true,
      time: firebase.database.ServerValue.TIMESTAMP
    },  (data:any)=>{
      if(data)console.log(data);
    });
  }

  getUsers(){
    this.users = [];
    this.Paths.usersRef().on('value', (snapshot:any)=>{
      // console.log(snapshot.val())
      if(snapshot.val()){
        let users = snapshot.val();
        this.usersMeta = snapshot.val();
        let keys = Object.keys(users);
        keys = keys.filter((value, index, arr)=>{
          
          return value != this.getCurrentUserUid();      
        });
        // console.log(users);
        keys.forEach(el=>{
          users[el].meta['uid'] = el;
          // console.log(el);
          let index = this.users.findIndex(o=> o.meta.uid == el);
          if(index != -1){
            this.users[index] = users[el];
          }else{
            this.users.push(users[el]);
          }
          
        });
        this.sortUsers();
      }
      // console.log(this.users);
    })
  }

  sortUsers(){
    this.users.sort( (user1, user2)=> {
        if(!user2.meta.name) user1.meta.name = "";
        if(!user2.meta.name) user2.meta.name = "";
        if(user1.meta.name.toLocaleLowerCase() !== user2.meta.name.toLocaleLowerCase()) {
            return user1.meta.name.toLocaleLowerCase() > user2.meta.name.toLocaleLowerCase() ? 1 : -1;
        }
        return 0;
    });
  }

  getUserName(uid:string){
    if(this.usersMeta[uid])
    return this.usersMeta[uid].meta.name;
    else
    return uid;
  }

  getUserImage(uid:string){
    if(this.usersMeta[uid])
    return this.usersMeta[uid].meta.pictureURL;
    else
    return "";
  }

  getUserOnlineStatus(uid:string){
    if(this.usersMeta[uid] && this.usersMeta[uid].online)
    return this.usersMeta[uid].online.status;
    else
    return "";
  }

  getUserLastOnline(uid:string){
    if(this.usersMeta[uid] && this.usersMeta[uid].online)
    return this.usersMeta[uid].online.time;
    else
    return "";
  }

}
