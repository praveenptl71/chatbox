# Chatbox

Chatbox is a npm module for ionic (version >= 4) to integrate in existing Ionic 4 projects.

In this module firebase realtime database is used for chatting, There are 2 tabs, one is inbox tab and another is contacts tab, where all firebase users are displayed. By using this chat module you can send text & image message.

## Installation

Run following command to install Chatbox in your project.

```bash
npm i @praveenptl71/chatbox --save
```


## Documentation


## Basic Usage

### Ionic/Angular apps
To use this package, import and add the module to your `@NgModule`, and then inject it where you wish to use it. 

```typescript
// app.module.ts
import { ChatModule } from '@praveenptl71/chatbox';

...

@NgModule({
  ...

  imports: [
    ...
    ChatModule
    ...
  ]
  ...
})
export class AppModule { }
```

#### Add firebase app

Import package
```typescript
import * as firebase from 'firebase';
```

Initialize app (if you are already initialized firebase app in your projects, do not initialize this again)
```typescript
let firebaseConfig = { 
	/* 
	* firebase config 
	*/ 
	};
firebase.initializeApp(firebaseConfig);
```

#### Import service to load users and chats

```typescript
import { UserService, RoomService } from '@praveenptl71/chatbox';
```

#### add in constructor

```typescript
constructor( ..., public userService:UserService, public roomService:RoomService, ...)
```

#### Signup to firebase app 
create new account (if don't have account)

```typescript
firebase.auth().createUserWithEmailAndPassword('email@gmail.com', '123456').then(data=>{
     // update user profile after sign up
     this.userService.updateUserProfile({descriptions:'', name:'',pictureURL:''});

     // load all users and chats
	this.userService.getUsers(); 
	this.roomService.getAllRooms();

	// navigate to this url
	this.navCtrl.navigateRoot('/chatbox/tabs/inbox'); 
})
.catch(error=>{
  
})
```


#### Login to firebase app
(if already have account)

Login with email and password

```typescript
firebase.auth().signInWithEmailAndPassword('email@gmail.com', '123456').then(user=>{ 
	// load all users and chats
	this.userService.getUsers(); 
	this.roomService.getAllRooms();

	// navigate to this url
	this.navCtrl.navigateRoot('/chatbox/tabs/inbox'); 
}) 
.catch(error=>{ 
	console.error(error); 
})
```

# Credits

Praveen Patel - [@praveenptl71](https://github.com/praveenptl71)

