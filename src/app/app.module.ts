import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';

/** Add modules of all pages */
// import { TabsPageModule } from './tabs/tabs.module'
// import { ChatPageModule } from './chat/chat.module';
// import { ChatDetailPageModule } from './chat-detail/chat-detail.module';

/** Add all component */
import { ChatPage } from './chat/chat.page';
import { ChatDetailPage } from './chat-detail/chat-detail.page';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { TabsPage } from './tabs/tabs.page';
import { ActionSheetComponent } from './modals/action-sheet/action-sheet.component';
import { ImageViewComponent } from './modals/image-view/image-view.component';

/** Services */
import { UserService } from '../app/services/user.service';
import { RoomService } from '../app/services/room.service';
import { PathsService } from '../app/services/paths.service';
import { DefinesService } from '../app/services/defines.service';
import { StorageService } from './services/storage.service';

/** Pipes */
import { ApplicationPipesModule } from './pipes/application-pipes.module';   


@NgModule({
  declarations: [AppComponent, TabsPage, Tab1Page, Tab2Page, ChatPage, ChatDetailPage, ActionSheetComponent, ImageViewComponent],
  entryComponents: [ ActionSheetComponent, ImageViewComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    // TabsPageModule,
    ApplicationPipesModule,
    // ChatDetailPageModule, ChatPageModule,
    FormsModule
  ],
  providers: [
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService, RoomService, DefinesService, PathsService, StorageService, Camera
  ],
  bootstrap: [AppComponent]
})
export class ChatModule {}
