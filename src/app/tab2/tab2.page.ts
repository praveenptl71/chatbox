import { Component, ViewChild } from '@angular/core';
import { PathsService } from '../services/paths.service';
import { UserService } from '../services/user.service';
import { RoomService } from '../services/room.service';
import { DefinesService } from '../services/defines.service';
import {  NavController, AlertController, Platform, IonTabs } from '@ionic/angular';

declare const GROUP = 1;
declare const BROADCAST = 2;


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  users:any = [];
  isEnabled:boolean = false

  threadType:number = null;

  userList:Array<any> =[];
  subscription:any;

  constructor(public Paths:PathsService, public userService:UserService, public roomService:RoomService,
    public Define:DefinesService, private navCtrl:NavController, public alertCtrl: AlertController, 
    public platform:Platform) {
    // this.userService.getUsers();
    
  }

  ionViewWillEnter(){
    // this.users = this.userService.users;
  }

  ionViewDidEnter(){
    this.users = this.userService.users;
    // this.subscription = this.platform.backButton.subscribe(()=>{
    //   this.navCtrl.navigateRoot('/home/tabs/tab1')
    // });
    
  }

  ionViewWillLeave(){
    // this.subscription.unsubscribe();
  }

  async userClicked(user:any){
    // if(!this.roomService.allRoomRef) return;
    if(this.isEnabled) return;
    // jSwY1GDpvWarsyQWEZuaqB7qLVJ3
    // console.log(user.threads);
    let user1 = this.userService.getCurrentUserUid();
    let user2 = user.meta.uid;
    if(user.threads){
      let threads = Object.keys(user.threads);
      console.log(threads);
      let userThreadMessage = null;
     
      for await (const element of threads){
        let threadMessage = this.roomService.allRoomRef[element];
        // console.log(threadMessage);
        // console.log(threadMessage.users[user1], threadMessage.users[user2], threadMessage.users[user1] && threadMessage.users[user2])
        if(threadMessage && threadMessage.details.type_v4 == this.Define.RoomType1to1 &&
          threadMessage.users[user1] && threadMessage.users[user2] ){
            userThreadMessage = threadMessage;
            break;
        }
      }


     
      // console.log(userThreadMessage);
      if(userThreadMessage){
        let data = {
          user:user2,
          thread : userThreadMessage
        }
        this.roomService.setActiveChat(data);
        this.navCtrl.navigateForward('/chatbox/chat')
      }
      else{
        this.createRoom(user2).then((rid:any)=>{
          // console.log(Object.keys(this.roomService.allRoomRef).length);
          let data = {
            user:user2,
            thread : this.roomService.allRoomRef[rid]
          }
          this.roomService.setActiveChat(data);
          this.navCtrl.navigateForward('/chatbox')
        }).catch(error=>{
          // console.log(error);
        });
      }
    }
    else{
      this.createRoom(user2).then((rid:any)=>{
        // console.log(Object.keys(this.roomService.allRoomRef).length);
        let data = {
          user:user2,
          thread : this.roomService.allRoomRef[rid]
        }
        this.roomService.setActiveChat(data);
        this.navCtrl.navigateForward('/chatbox')
      }).catch(error=>{
        // console.log(error);
      });
    }
  }

  createRoom(uid){
    return new Promise((resolve, reject)=>{
      this.roomService.createRoom(null, null).then(rid=>{
        this.roomService.addUserToRoom(rid, uid, this.Define.UserStatusMember, null)
        resolve(rid)
      })
      .catch(error=>{
        reject(error)
      })
    })
    
  }

  createThread(type:number){
    this.isEnabled = true;
    this.threadType = type;
  }

  updateUsers(event:any, user:any){
    if(event.detail.checked){
      if(!this.userList.includes(user.meta.uid)){
        this.userList.push(user.meta.uid);
      }
    }
    else{
      let index = this.userList.indexOf(user.meta.uid);
      if (index !== -1) this.userList.splice(index, 1);
    }
    // console.log(this.userList);
  }

  async createGroupThread(){
    let type = (this.threadType == 1)?"Group":"Broadcast";
    const alert = await this.alertCtrl.create({
      header: type+' details',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: type+' name'
        },
        {
          name: 'name2',
          type: 'text',
          placeholder: type+' description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-btn-cancel',
          handler: (e) => {
            this.threadType = null;
            this.userList = [];
            this.isEnabled = false;
          }
        }, {
          text: 'Submit',
          cssClass: 'alert-btn-submit',
          handler: (data) => {
            console.log(data.name1, data.name2);
            if(this.threadType == 1) this.createGroup(data.name1, data.name2);
            if(this.threadType == 2) this.createBroadcast(data.name1, data.name2);
          }
        }
      ]
    });

    await alert.present();

    
  }

  /**
   * @author Praveen Patel
   * @param name 
   * @param description 
   */
  async createGroup(name:string, description:string){
    if(!this.userList  || this.userList.length == 0) return;
    // console.log(this.userList);
    this.roomService.createRoom(name, description, false, this.Define.RoomTypeGroup).then( async (rid)=>{
      for await (const uid of this.userList){
        this.roomService.addUserToRoom(rid, uid, this.Define.UserStatusMember, null)
      }
      this.navCtrl.back();
      // this.userList.forEach(uid=>{
      //   this.roomService.addUserToRoom(rid, uid, this.Define.UserStatusMember, null)
      // });     
      
    })
    .catch(error=>{
     
    })
  }

  /**
   * @author Praveen Patel
   * @param name 
   * @param description 
   */
  createBroadcast(name:string, description:string){

  }
  

}
