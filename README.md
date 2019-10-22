# chatbox
A firebase chatbox package for Ionic 4 application

Step to integrate:

1.) Install package 
`npm install @praveenptl71/chatbox`

2.) Import firebase
`import * as firebase from 'firebase';`

and Initialize firebase app
`let firebaseConfig = {
	/*
	* firebase config
	*/
}
firebase.initializeApp(firebaseConfig);`

3.) Login with email and password
`firebase.auth().signInWithEmailAndPassword('email@gmail.com', '123456').then(user=>{
    this.initDB();
        this.navCtrl.navigateRoot('/chatbox/tabs/inbox');
})
.catch(error=>{    console.error(error); })`

4.) Import service to load users and chats
`import { UserService, RoomService } from '@praveenptl71/chatbox';`

add in constructor
`constructor(public userService:UserService, public roomService:RoomService) {}`

5.) Create a initDB function and call this method from 
`initDB(){
    this.userService.getUsers();
    this.roomService.getAllRooms();
}`
