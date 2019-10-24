import { Injectable } from '@angular/core';
import { DefinesService } from '../services/defines.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public Define: DefinesService) { }

  buildMeta(rid: any, uid: any, text: any, type: any) {
    var m = {
      meta: {}
    };

    m.meta[this.Define.messageUID] = uid;

    var json = {};
    json[this.Define.messageText] = text;

    m.meta[this.Define.messageJSONv2] = json;
    m.meta[this.Define.messageType] = type;
    m.meta[this.Define.messageTime] = firebase.database.ServerValue.TIMESTAMP;

    return m;
  }

  buildImageMeta(rid: any, uid: any, imageURL: any, thumbnailURL: any, width: any, height: any) {

    var text = imageURL + ',' + imageURL + ',W' + width + "&H" + height;

    var m = this.buildMeta(rid, uid, text, this.Define.MessageTypeImage);

    var json = {};

    json[this.Define.messageText] = text;
    json[this.Define.messageImageURL] = imageURL;
    json[this.Define.messageThumbnailURL] = thumbnailURL;
    json[this.Define.messageImageWidth] = width;
    json[this.Define.messageImageHeight] = height;

    m.meta[this.Define.messageJSONv2] = json;

    return m;
  }

  buildFileMeta(rid: any, uid: any, fileName: any, mimeType: any, fileURL: any) {

    var m = this.buildMeta(rid, uid, fileName, this.Define.MessageTypeFile);

    var json = {};

    json[this.Define.messageText] = fileName;
    json[this.Define.messageMimeType] = mimeType;
    json[this.Define.messageFileURL] = fileURL;

    m.meta[this.Define.messageJSONv2] = json;

    return m;
  }
}
