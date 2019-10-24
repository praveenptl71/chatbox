import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from '../services/user.service';
import * as momentImported from 'moment';
const moment = momentImported;


@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {

  threadData:any;
  details:any;
  users:any;

  constructor(private route: ActivatedRoute, public userService:UserService) { 
    this.route.queryParams.subscribe(params => {
      this.threadData = JSON.parse(params["threadData"]);
      if(this.threadData){
        this.users = this.objectToArray(this.threadData.users, true)
        this.details = this.threadData.details
        // console.log(this.users);
      }
  });
  }

  ngOnInit() {
  }

  getUserName(uid:string){
    return this.userService.getUserName(uid);
  }

  getUserImage(uid:string){
    return this.userService.getUserImage(uid)
  }

  getDateTime(time:any){
    return moment(new Date(time)).format("DD MMM YY h:mm a");
  }

  objectToArray(object: any, includeKey:boolean = false, keyName:string="uid") {
    var array = [];
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        if(includeKey) object[key][keyName] = key
        array.push(object[key]);
      }
    }
    return array;
  }

}
