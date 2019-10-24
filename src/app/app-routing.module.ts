import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { ChatPage } from './chat/chat.page';
import { ChatDetailPage } from './chat-detail/chat-detail.page';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'chatbox',
    canActivate:[AuthGuard],
    children :[
      {
        path: 'tabs',
        component: TabsPage,
        // canActivate:[AuthGuard],
        children : [
          {
            path: 'inbox',
            component : Tab1Page
          },
          {
            path: 'contact',
            component : Tab2Page
          },
          // {
          //   path: 'tab3',
          //   component : Tab3Page
          // },
          {
            path: '',
            redirectTo: '/tabs/inbox',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'chat',
        canActivate:[AuthGuard],
        component: ChatPage
      },
      {
        path : 'chat-detail',
        canActivate:[AuthGuard],
        component: ChatDetailPage
      },
      {
        path: '',
        redirectTo: 'chatbox/tabs/inbox',
        pathMatch: 'full'
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
