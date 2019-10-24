import { Component } from '@angular/core';
import { RoomService } from '../services/room.service';
import { PathsService } from '../services/paths.service';
import { DefinesService } from '../services/defines.service';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { Events, NavController, Platform } from '@ionic/angular';
import * as momentImported from 'moment';
const moment = momentImported;



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  storeInbox:any = [];
  inbox:any = [];

  roomRef:any;
  userRooms:any;

  subscription:any;

  constructor(public roomService:RoomService, public Paths:PathsService, public Define:DefinesService,
    public userService:UserService, public storage:StorageService, public events:Events, private navCtrl:NavController,
    public platform:Platform) {
      this.events.subscribe("RoomsUpdated", data=>{
        this.getLocalRooms();
      });

      this.events.subscribe("lastMessage", ()=>{
        this.getRoomInfo();
      });

      this.events.subscribe('BackTriggered',()=>{ 
        // console.log('BackTriggered');
        this.getLocalRooms();
        if(this.userRooms)  this.getRoomInfo();
       });

      this.events.subscribe('room_updated',()=>{ 
        // console.log('room_updated');
        this.getLocalRooms();
        if(this.userRooms)  this.getRoomInfo();
       });
    }

  ionViewDidEnter(){
    this.getLocalRooms();
    this.roomRef = this.roomService.getUserChats();
    this.roomRef.on('value', snap=>{
      // console.log("value updated");
      this.userRooms = snap.val();
      
      this.getRoomInfo();
    });

    // this.subscription = this.platform.backButton.subscribe(()=>{
    //   navigator['app'].exitApp();
    // });

  }

  ionViewWillLeave(){
    // this.platform.backButton.unsubscribe();
  }

  openChat(userThreadMessage:any){
    
      let data = {
        user:userThreadMessage.details.fid,
        thread : userThreadMessage
      }
      this.roomService.setActiveChat(data);
      this.navCtrl.navigateForward('/chatbox/chat')
      
  }

  getLocalRooms(){
    this.inbox = this.storage.getRooms();
  }

  async getRoomInfo(){
    if(!this.userRooms) return;
    let rids = Object.keys(this.userRooms);
    for await (const rid of rids){
      await this.Paths.roomsRef().child(rid).once('value', (snap:any)=>{
        let room = snap.val();
        // console.log(room);
        if(room){
          if(!room.updated){
            room.updated ={details:0};
          }
          if(room.details.type_v4 = this.Define.RoomType1to1){
            let uids = Object.keys(room.users);
            uids.forEach(el=>{
              if(el != this.userService.getCurrentUserUid()){
                room.details.fid = el;
                room.details.name = (room.details.name)?room.details.name:this.userService.getUserName(el);
                room.details.pictureURL = (room.details.type ==1)?'':this.userService.getUserImage(el);
                room.details.online = (room.details.type ==1)?'':this.userService.getUserOnlineStatus(el);
                room.details.lastSeen = (room.details.type ==1)?'':this.userService.getUserLastOnline(el);
              }
            });
            this.addInbox(room);
          } 
        }
      })
    }
    this.storeInbox = this.roomsSortedByMostRecent(this.storeInbox);
    this.storage.addRooms(this.storeInbox);
    
  }

  addInbox(room:any){
    
    let index = this.storeInbox.findIndex(o=> o.details.rid == room.details.rid);
    if(index != -1){
      this.storeInbox[index] = room
    }
    else{
      this.storeInbox.push(room);
    }
  }

  getLastMessage(room){
    if(room && room.lastMessage){
      
      if(room.lastMessage.type == this.Define.MessageTypeText){
        return room.lastMessage[this.Define.messageJSONv2][this.Define.messageText]
      }
      else if(room.lastMessage.type == this.Define.MessageTypeImage){
        return "Image";
      }
      else{
        return "File";
      }
    }
    else{
      return "";
    }
  }

  getTimeString(room:any){
    if(room && room.lastMessage && room.lastMessage.date){
      let today = moment(new Date());
      let oldDate = moment(room.lastMessage.date);  
      let days = today.diff(oldDate, 'days');
      if(days == 0) return moment(new Date(room.lastMessage.date)).format("h:mm a"); 
      else if(days ==1) return 'yesterday';
      else return moment(new Date(room.lastMessage.date)).format("DD/MM/YY");
    }
    return '';
  }

  roomsSortedByMostRecent(rooms:any) {
    // console.log(rooms);
    rooms.sort(function (a, b) {
        var at = a.lastMessage ? a.lastMessage["date"] : a.details["creation-date"];
        var bt = b.lastMessage ? b.lastMessage["date"] : b.details["creation-date"];

        return bt - at;
    });
    return rooms;
  }

  sortRooms(){
    this.inbox.sort( (a, b)=>{
      let timeA = 0 ;
      if(a.updated.messages) timeA = a.updated.messages;
      if(timeA == 0 && a.updated.users) timeA = a.updated.users;
      if(timeA == 0 && a.updated.details) timeA = a.updated.details;

      let timeB = 0 ;
      if(b.updated.messages) timeB = b.updated.messages;
      if(timeB == 0 && b.updated.users) timeB = b.updated.users;
      if(timeB == 0 && b.updated.details) timeB = b.updated.details;
        
      timeB-timeA
     
    })
  }

}
