import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { RoomService } from '../services/room.service';
import { UserService } from '../services/user.service';
import { PathsService } from '../services/paths.service';
import { DefinesService } from '../services/defines.service';
import { ModalController, NavController, Events } from '@ionic/angular';
// import { EnterAnimation } from '../../animations/enterAnimation';
// import { LeaveAnimation } from '../../animations/leaveAnimation';
import { ActionSheetComponent } from '../modals/action-sheet/action-sheet.component';
import { ImageViewComponent } from '../modals/image-view/image-view.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import * as momentImported from 'moment';
const moment = momentImported;
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement) {
    this.adjust(textArea);
  }
  onChange(textArea: HTMLTextAreaElement) {
    this.adjust(textArea);
  }

  @ViewChild('content', { static: false }) public content: any;

  currentThread: any;
  receiver_name: string;
  receiver_profile: string;
  message_list: any = [];
  userid: any;

  users: any;

  threadData: any;
  threadRef: any;

  inputMessage: string;
  bufferSize: number = 0;
  showFileProgress: boolean = false;

  constructor(public roomService: RoomService, public userService: UserService, public Paths: PathsService,
    public Define: DefinesService, public element: ElementRef, public navCtrl: NavController,
    public modalCtrl: ModalController, public event: Events, private camera: Camera) {


  }

  ngOnInit() {
    
  }

  fileChange(event){
    // console.log((event.target.files.item(0)));
    let files = event.target.files[0]; 
    // console.log((event.target.files[0]));
    // this.certLogoFileName = event.target.files.item(0).name;
    var customuri = URL.createObjectURL(files);
    
    var myReader:FileReader = new FileReader();
    myReader.readAsDataURL(files);
    myReader.onload = (e) =>{
      // this.certLogo = myReader.result;
      // console.log(myReader.result.toString());
      let base64 = myReader.result.toString();
      this.getThumbnail(base64).then((data:any)=>{
        let thumb = data.split(',')[1]
        this.uploadFile(base64.split(",")[1], "jpeg", thumb);
      })
      .catch(error=>{
        this.uploadFile(base64.split(",")[1], "jpeg", null);
      })
      // this.uploadFile(base64.split(",")[1], "jpg");
    };
  }

  openCamera(){

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.CAMERA
    }
   
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.getThumbnail(base64Image).then((data:any)=>{
        let thumb = data.split(',')[1]
        this.uploadFile(imageData, "jpeg", thumb);
      })
      .catch(error=>{
        this.uploadFile(imageData, "jpeg", null);
      })

     }).catch(error=>{
     	// console.log(error)
     })
    
  }

  openGallery(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit:true
    }
   
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.getThumbnail(base64Image).then((data:any)=>{
        let thumb = data.split(',')[1]
        this.uploadFile(imageData, "jpeg", thumb);
      })
      .catch(error=>{
        this.uploadFile(imageData, "jpeg", null);
      })

     }).catch(error=>{
     	// console.log(error)
     })
    
  }

  getUserName(message:any){
    // console.log(message);
    return this.userService.getUserName(message[this.Define.messageUserFirebaseID])
  }


  async openModal() {
    let modal = await this.modalCtrl.create({
      component: ActionSheetComponent,
      // enterAnimation: EnterAnimation,
      // leaveAnimation: LeaveAnimation,
      cssClass: 'modal-action-sheet'
    });
    modal.present();

    modal.onWillDismiss().then(data => {
      if(data.data = "camera"){
        this.openCamera()        
      }
      else{
        this.openGallery()
      }
    })
      .catch(error => { console.error(error); });
  }

  ionViewWillEnter() {
    this.currentThread = this.roomService.getActiveChat();
    // console.log(this.currentThread);
    if (this.currentThread) {
      this.users = this.userService.usersMeta[this.currentThread.user]
      // console.log(this.users);
      this.threadData = this.currentThread.thread
      this.startListening();
    }
  }

  ionViewWillLeave() {
    this.stopListening();
  }

  openChantDetails(){
    let data = this.threadData;

    delete data['lastMessage'];
    delete data['messages'];
    let navigationExtras: NavigationExtras = {
      queryParams: {
        threadData: JSON.stringify(data)
      }
    };
    this.navCtrl.navigateForward(['chatbox/chat-detail'], navigationExtras)
  }

  getMembers(){
    return Object.keys(this.currentThread.thread.users).length + " members";
  }

  startListening() {
    if (this.threadData && this.threadData.details && this.threadData.details.rid) {
      this.threadRef = this.Paths.roomRef(this.threadData.details.rid);
      this.threadRef.on('value', snap => {
        // this.message_list = snap.val()
        this.threadData = snap.val();
        this.prepareMessageList();
      })
    }
  }

  addNewMessage() {

  }

  prepareMessageList() {
    if (this.threadData && this.threadData.messages) {
      this.message_list = this.objectToArray(this.threadData.messages);
      this.scrollToBottom();
    }
    // console.log(this.message_list);
  }

  stopListening() {
    try {
      this.threadRef.off();
    }
    catch (error) {

    }
  }

  objectToArray(object: any) {
    var array = [];
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        array.push(object[key]);
      }
    }
    return array;
  }

  getDate(data: any) {
    if (data && data.date) {
      return moment(new Date(data.date)).format("DD MMM YYYY");
    }
    else {
      return null;
    }
  }

  getTime(data: any) {
    if (data && data.date) {
      return moment(new Date(data.date)).format("h:mm a");
    }
    else {
      return null;
    }
  }

  getDateTimeString(time) {
    // console.log(time)
    return "lastSeen " + moment(new Date(time)).format("DD MMM YY h:mm a");
  }

  getDateTimeString1(time) {
    // console.log(time)
    return moment(new Date(time)).format("DD MMM YY h:mm a");
  }

  getMessage(object: any) {
    return object[this.Define.messageJSONv2][this.Define.messageText]
  }

  getImageUrl(object: any) {
    return object[this.Define.messageJSONv2][this.Define.messageImageURL]
  }

  getThumbnailUrl(object: any) {
    return object[this.Define.messageJSONv2][this.Define.messageThumbnailURL]
  }

  getSide(object: any) {
    if (object[this.Define.messageUserFirebaseID] == this.userService.getCurrentUserUid()) {
      return "left";
    }
    else {
      return "right";
    }
  }

  sendMessage() {
    // console.log(JSON.stringify(this.inputMessage))
    // this.inputMessage = ""
    this.roomService.sendTextMessage(this.inputMessage, this.userService.getCurrentUserUid(), this.threadData.details.rid)
    setTimeout(() => {
      this.inputMessage = ""
      setTimeout(() => {
        this.adjust(null);
      }, 10);
    }, 200);
  }

  adjust(textArea?: HTMLTextAreaElement) {
    textArea = textArea || this.element.nativeElement.querySelector('textarea');

    if (!textArea) {
      return;
    }
    textArea.style.height = 'auto';
    textArea.style.height = ((textArea.scrollHeight <= 120) ? textArea.scrollHeight : 120) + 'px';
  }

  scrollToBottom() {
    this.content.scrollToBottom(200);

  }

  goBack() {
    this.event.publish("BackTriggered");
    this.navCtrl.pop();

  }

   uploadFile(file: string, type: string, thumb:string=null) {
    this.showFileProgress = true;
    let fn = this.createFileName();
    let fileName = fn+type;
    
    let storageRef = firebase.storage().ref();
    let fileRef = storageRef.child("Images/" + fileName);
    let uploadTask = fileRef.putString(file, 'base64');

    let uploadThumbTask = null;
    if(thumb){
      let fileThumbName = fn+"-thumb"+type;
      let fileThumbRef = storageRef.child("Images/" + fileThumbName);
      uploadThumbTask = fileThumbRef.putString(thumb, 'base64');
    }

    uploadTask.on('state_changed',  (snapshot)=> {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes);
      this.bufferSize = progress;
      // console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          // console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          // console.log('Upload is running');
          break;
      }
    },  (error)=> {
      // console.log(error);
      this.showFileProgress = true;
      this.bufferSize = 0;
      // Handle unsuccessful uploads
    },  ()=> {
      this.showFileProgress = false;
      this.bufferSize = 0;
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then( (downloadURL)=> {
        console.log('File available at', downloadURL);
        let thumbUrl = ""
        if(uploadThumbTask){
          uploadThumbTask.snapshot.ref.getDownloadURL().then( (downloadThumbURL)=> {
            console.log(downloadThumbURL);
            this.sendImageMessage(downloadURL, downloadThumbURL);
          });
        }
        else{
          this.sendImageMessage(downloadURL, downloadURL);
        }
        
      });
    });

  }

  sendImageMessage(url:string, thumbUrl:string){
    this.roomService.sendImageMessage(url, thumbUrl, this.userService.getCurrentUserUid(), this.threadData.details.rid)
    setTimeout(() => {
      // this.inputMessage = ""
      setTimeout(() => {
        this.adjust(null);
      }, 10);
    }, 200);
    
  }

  createFileName() {
    let uid = this.userService.getCurrentUserUid();
    let time = new Date().getTime();
    return uid + "-" + time;
  }

  /**
   * @author Praveen Patel
   * @description Generate thumbnail of Image
   * @param imgBase64 Base64 string of image
   * @param width Target with of Image (Default : 100)
   */
  getThumbnail(imgBase64:string, width:number = 100) {
    return new Promise((resolve, reject)=>{
      let img = new Image();
      img.src = imgBase64;
      img.onload = ()=> {
        
            var oc = document.createElement('canvas'), octx = oc.getContext('2d');
            oc.width = img.width;
            oc.height = img.height;
            octx.drawImage(img, 0, 0);
            while (oc.width * 0.5 > width) {
              oc.width *= 0.5;
              oc.height *= 0.5;
              octx.drawImage(oc, 0, 0, oc.width, oc.height);
            }
            oc.width = width;
            oc.height = oc.width * img.height / img.width;
            octx.drawImage(img, 0, 0, oc.width, oc.height);
            resolve(oc.toDataURL('image/jpeg'));      
      };
      img.onerror = (error)=>{
        reject(error);
      }
      
    });
    
  }

  async showFullImage(messageData){
    // console.log(messageData);
    let url = this.getImageUrl(messageData);
    let time = this.getDateTimeString1(messageData.date);
    let name = this.users.meta.name;
    let modal = await this.modalCtrl.create({
      component: ImageViewComponent,
      // enterAnimation: EnterAnimation,
      // leaveAnimation: LeaveAnimation,
      cssClass: 'modal-image-view',
      componentProps: { 
        imageUrl : url,
        time:time,
        name:name
      }
    });
    modal.present();
  }


}
