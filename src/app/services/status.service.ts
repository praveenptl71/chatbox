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

export class StatusService {
  allRoomRef:any = null;
  activeChat:any;
  rid:any;
  constructor(public Paths:PathsService, public Define:DefinesService, public userService:UserService,
    public messageService:MessageService, public events:Events) { 

  }

  getAllStatus(){
    this.Paths.statusRef();
  }

  setRid(rid:any){
    this.rid =rid
  }

  // getAllStatus(){
  //   console.log("this.allRoomRef");
  //   this.Paths.roomsRef().on('value', (snap:any)=>{
  //     console.log("allRoomRef load",snap)
  //     this.allRoomRef = snap.val();
  //     // console.log(snap);
  //     this.events.publish('room_updated');
  //   })
  // }

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







}
