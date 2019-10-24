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
	this.navCtrl.navigateForward('/chatbox/tabs/inbox'); 
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

#### Theming
Apply your theme color add these code (you can change color code)

```scss
// theme/variable.scss

:root {
	...
	/** chatboxPrimary **/
    --ion-color-chatboxPrimary: #1798d2;
    --ion-color-chatboxPrimary-rgb: 23, 152, 210;
    --ion-color-chatboxPrimary-contrast: #ffffff;
    --ion-color-chatboxPrimary-contrast-rgb: 255, 255, 255;
    --ion-color-chatboxPrimary-shade: #1486b9;
    --ion-color-chatboxPrimary-tint: #2ea2d7;
    /** chatboxLight **/
    --ion-color-chatboxLight: #f4f5f8;
    --ion-color-chatboxLight-rgb: 244, 244, 244;
    --ion-color-chatboxLight-contrast: #000000;
    --ion-color-chatboxLight-contrast-rgb: 0, 0, 0;
    --ion-color-chatboxLight-shade: #d7d8da;
    --ion-color-chatboxLight-tint: #f5f6f9;
    ...
}

.ion-color-chatboxPrimary {
    --ion-color-base: var(--ion-color-chatboxPrimary) !important;
    --ion-color-base-rgb: var(--ion-color-chatboxPrimary-rgb) !important;
    --ion-color-contrast: var(--ion-color-chatboxPrimary-contrast) !important;
    --ion-color-contrast-rgb: var(--ion-color-chatboxPrimary-contrast-rgb) !important;
    --ion-color-shade: var(--ion-color-chatboxPrimary-shade) !important;
    --ion-color-tint: var(--ion-color-chatboxPrimary-tint) !important;
}

.ion-color-chatboxLight {
    --ion-color-base: var(--ion-color-chatboxLight) !important;
    --ion-color-base-rgb: var(--ion-color-chatboxLight-rgb) !important;
    --ion-color-contrast: var(--ion-color-chatboxLight-contrast) !important;
    --ion-color-contrast-rgb: var(--ion-color-chatboxLight-contrast-rgb) !important;
    --ion-color-shade: var(--ion-color-chatboxLight-shade) !important;
    --ion-color-tint: var(--ion-color-chatboxLight-tint) !important;
}
```


# Credits

Praveen Patel - [@praveenptl71](https://github.com/praveenptl71)

