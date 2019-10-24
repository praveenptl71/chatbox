import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';
import { DefinesService } from '../services/defines.service'

@Injectable({
  providedIn: 'root'
})
export class PathsService {
  FIREBASE_REF_DEBUG: boolean;
  cid: any = environment.rootPath;
  initialized: any = false;
  database: any = null;

  constructor(public Paths: DefinesService) { 
    
  }

  firebaseTimeStamp(){
    return firebase.database.ServerValue.TIMESTAMP;
  }

  firebase(): firebase.database.Reference {
    // if (!this.initialized) {
    //   firebase.initializeApp(environment.firebaseConfig);
    //   this.database = firebase.database();
    //   this.initialized = true;
    // }
    // if (this.FIREBASE_REF_DEBUG) console.log("firebase");
    // if (this.cid) {
    //   return this.database.ref(this.cid);
    // }
    // else {
    //   return this.database.ref();
    // }
    this.database = firebase.database();
    return this.database.ref(this.cid);
  }

  usersRef() {
    if (this.FIREBASE_REF_DEBUG) console.log("usersRef");
    return this.firebase().child(this.Paths.UsersPath);
  }

  allUsersRef() {
    return this.usersRef();
  }

  configRef() {
    return this.firebase().child(this.Paths.ConfigKey);
  }

  timeRef(uid) {
    if (this.FIREBASE_REF_DEBUG) console.log("timeRef");
    return this.firebase().child(this.Paths.TimeKey).child(uid);
  }

  userRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("userRef");
    return this.usersRef().child(fid);
  }

  userMetaRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("userMetaRef");
    return this.userRef(fid).child(this.Paths.MetaKey);
  }

  userDeviceTokenRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("userRef");
    return this.usersRef().child(fid).child(this.Paths.DeviceToken);
  }

  userImageRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("userImageRef");
    return this.userRef(fid).child(this.Paths.ImageKey);
  }

  userStateRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("userStateRef");
    return this.userRef(fid).child(this.Paths.UpdatedPath);
  }

  userOnlineRef(fid) {
    return this.userRef(fid).child(this.Paths.OnlineKey);
  }


  //    userThumbnailRef(fid) {
  //        if(DEBUG) console.log("");
  //        return this.userRef(fid).child(bThumbnailKey);
  //    }

  userFriendsRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("userFriendsRef");
    return this.userRef(fid).child(this.Paths.FriendsPath);
  }

  userBlockedRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("userBlockedRef");
    return this.userRef(fid).child(this.Paths.BlockedPath);
  }

  onlineUsersRef() {
    if (this.FIREBASE_REF_DEBUG) console.log("onlineUsersRef");
    return this.firebase().child(this.Paths.OnlineKey);
  }

  onlineUserRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("onlineUserRef");
    return this.onlineUsersRef().child(fid);
  }


  roomsRef() {
    if (this.FIREBASE_REF_DEBUG) console.log("roomsRef");
    return this.firebase().child(this.Paths.RoomsPath);
  }

  broadcastRef() {
    if (this.FIREBASE_REF_DEBUG) console.log("broadcastRef");
    return this.firebase().child(this.Paths.BroadcastPath);
  }

  statusRef() {
    if (this.FIREBASE_REF_DEBUG) console.log("statusRef");
    return this.firebase().child(this.Paths.BroadcastPath);
  }

  userStatusRef(uid) {
    if (this.FIREBASE_REF_DEBUG) console.log("userStatusRef");
    return this.statusRef().child(uid);
  }

  publicRoomsRef() {
    if (this.FIREBASE_REF_DEBUG) console.log("publicRoomsRef");
    return this.firebase().child(this.Paths.PublicRoomsPath);
  }

  publicRoomRef(rid) {
    if (this.FIREBASE_REF_DEBUG) console.log("publicRoomRef");
    return this.publicRoomsRef().child(rid);
  }

  roomRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("roomRef");
    return this.roomsRef().child(fid);
  }

  roomMetaRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("roomMetaRef");
    return this.roomRef(fid).child(this.Paths.DetailsKey);
  }

  broadcastMetaRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("broadcastMetaRef");
    return this.firebase().child(this.Paths.BroadcastPath).child(fid).child(this.Paths.DetailsKey);
  }

  broadcastMessageRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("broadcastMessageRef");
    return this.firebase().child(this.Paths.BroadcastPath).child(fid).child(this.Paths.MessageKey);
  }

  broadcastUserRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("broadcastUserRef");
    return this.firebase().child(this.Paths.BroadcastPath).child(fid).child(this.Paths.UsersPath);
  }

  roomLastMessageRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("roomLastMessageRef");
    return this.roomRef(fid).child(this.Paths.LastMessagePath);
  }

  roomStateRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("roomStateRef");
    return this.roomRef(fid).child(this.Paths.UpdatedPath);
  }

  roomMessagesRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("roomMessagesRef");
    return this.roomRef(fid).child(this.Paths.MessagesPath);
  }

  roomUsersRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("roomUsersRef");
    return this.roomRef(fid).child(this.Paths.UsersMetaPath);
  }

  roomTypingRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("roomTypingRef");
    return this.roomRef(fid).child(this.Paths.TypingPath);
  }

  userRoomsRef(fid) {
    if (this.FIREBASE_REF_DEBUG) console.log("userRoomsRef");
    return this.userRef(fid).child(this.Paths.RoomsPath);
  }

  messageUsersRef(rid, mid) {
    if (this.FIREBASE_REF_DEBUG) console.log("messageUsersRef");
    return this.messageRef(rid, mid).child(this.Paths.UsersPath);
  }

  messageRef(rid, mid) {
    if (this.FIREBASE_REF_DEBUG) console.log("messageRef");
    return this.roomMessagesRef(rid).child(mid);
  }

  onlineUserCountRef() {
    if (this.FIREBASE_REF_DEBUG) console.log("onlineUserCountRef");
    return this.firebase().child(this.Paths.OnlineUserCountKey);
  }

  flaggedMessageRef(tid, mid) {
    return this.firebase().child(this.Paths.FlaggedPath).child(this.Paths.RoomsPath).child(tid).child(this.Paths.MessagesPath).child(mid);
  }
}
