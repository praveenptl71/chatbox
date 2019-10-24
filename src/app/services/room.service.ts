import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { PathsService } from '../services/paths.service';
import { DefinesService } from '../services/defines.service';
import { UserService } from '../services/user.service';
import { MessageService } from '../entities/message.service';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  allRoomRef:any = null;
  activeChat:any;
  rid:any;
  constructor(public Paths:PathsService, public Define:DefinesService, public userService:UserService,
    public messageService:MessageService, public events:Events) { 

  }

  setRid(rid:any){
    this.rid =rid
  }

  setActiveChat(data:any){
    this.activeChat = data
  }

  getActiveChat(){
    return this.activeChat;
  }

  getAllRooms(){
    // console.log("this.allRoomRef");
    this.Paths.roomsRef().on('value', (snap:any)=>{
      // console.log("allRoomRef load",snap)
      this.allRoomRef = snap.val();
      // console.log(snap);
      this.events.publish('room_updated');
    })
  }

  createRoom(name, description, invitesEnabled=false, type = this.Define.RoomType1to1, weight=0){
    return new Promise((resolve, reject)=>{
      let rid = this.Paths.roomsRef().push().key;
      let roomMeta = this.roomMeta(rid, name, description, true, invitesEnabled, type, weight);
      roomMeta[this.Define.roomCreatorEntityID] = this.userService.getCurrentUserUid();

      var roomMetaRef = this.Paths.roomMetaRef(rid);

      roomMetaRef.set(roomMeta, error=> {
        if(error) {
          reject(error);
        }
        else{
          this.addUserToRoom(rid, this.userService.getCurrentUserUid(), this.Define.UserStatusOwner, type);
          resolve(rid);
        }
      });
    })

  }

  /**
   * @author Praveen Patel
   * @param rid Rood Id
   * @param uid User Id
   * @param status status of user (owner || member)
   * @param type Room type (one to one || Group)
   */
  addUserToRoom(rid:any, uid:any, status:any, type:any) {

    let data = {
        status: status,
        time: firebase.database.ServerValue.TIMESTAMP
    };

    let ref = this.Paths.roomUsersRef(rid).child(uid);
    ref.update(data,  (error)=> {
        if(!error) {
            
        }
        else {
            
        }
    });

    this.addRoomWithRID(rid, type, uid)
  }

  addRoomWithRID (rid, type, uid) {

    var ref = this.Paths.userRoomsRef(uid).child(rid);

    var data = {
        invitedBy: this.userService.getCurrentUserUid()
    };

    ref.update(data,  (error)=> {
        if(!error) {
           
            // this.entity.updateState(RoomsPath);
        }
        else {
          this.removeRoomWithRID(rid);
        }
    });

   
  }

  removeRoomWithRID(rid){

  }

  roomMeta(rid, name, description, userCreated, invitesEnabled, type, weight) {

    var m = {};
    m[this.Define.roomRID] = rid ? rid : null;
    m[this.Define.roomName] = name ? name : null;
    m[this.Define.roomInvitesEnabled] = invitesEnabled;
    m[this.Define.roomDescription] = description ? description : "";
    m[this.Define.roomUserCreated] = userCreated;
    m[this.Define.roomCreated] = firebase.database.ServerValue.TIMESTAMP;
    m[this.Define.roomWeight] = weight ? weight : 0;
    m[this.Define.roomType] = type;
    // A fix for legacy v3 users
    m[this.Define.roomTypeV3] = type;

    return m;
  }

  sendTextMessage(inputText:string, userUid:string, rid:string){
    if(!inputText || inputText.length === 0)
      return;
    let message = this.messageService.buildMeta(null, userUid, inputText, this.Define.MessageTypeText);
    this.sendMessage(message, userUid, rid);
  }

  sendImageMessage(url:string, thumbUrl:string, userUid:string, rid:string){
    if(!url || url.length === 0)
      return;
    let message = this.messageService.buildImageMeta(null, userUid, url, thumbUrl, null, null);
    this.sendMessage(message, userUid, rid);
  }

  sendMessage(message:any, userUid:any, rid:string){
    var ref = this.Paths.roomMessagesRef(rid);
    // Add the message
    var newRef = ref.push();
    
    newRef.setWithPriority(message.meta, firebase.database.ServerValue.TIMESTAMP.toString(), (error)=> {
      if(error) {
         
      }
      else {
          // deferred.reject(error);
      }
    });

    // Last message
    var p1 = this.setLastMessage(message, rid);

    // The user's been active so update their status
    // with the current time
    this.updateUserStatusTime(userUid, rid);

    // Avoid a clash..
    // var p2 = this.entity.updateState(MessagesPath);
  }

  setLastMessage(message, rid) {

    var lastMessageMeta = message.meta;
    lastMessageMeta['userName'] = this.userService.getCurrentUser()['displayName'];

    var ref = this.Paths.roomLastMessageRef(rid);
    ref.set(lastMessageMeta, (error)=> {
        if(!error) {
           
        }
        else {
            this.events.publish("lastMessage", null);
        }
    }); 
  };

  updateUserStatusTime(userUid:any, rid:any) {

    var data = {
        time: firebase.database.ServerValue.TIMESTAMP
    };

    var ref = this.Paths.roomUsersRef(rid);
    ref.child(userUid).update(data, (error)=> {
        if(!error) {
           
        }
        else {
           
        }
    })
   
  }

  getUserChats(){
    return this.Paths.userRoomsRef(this.userService.getCurrentUserUid());
  }



}
