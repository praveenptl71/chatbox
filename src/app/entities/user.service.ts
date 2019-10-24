import { DefinesService } from '../services/defines.service';

export class UserService {

  // user: any;
  define: DefinesService;

  constructor(public user: any) {

  }

  unORNull(object: any) {
    return object === 'undefined' || object == null;
  }

  getMeta() {
    if (this.unORNull(this.user.meta)) {
      this.user.meta = {};
    }
    return this.user.meta;
  }

  getMetaValue(key: any) {
    return this.getMeta()[key];
  }

  metaValue(key: any) {
    return this.getMetaValue(key);
  }

  getName() {
    return this.getMetaValue(this.define.UserName);
  }

  getStatus() {
    return this.getMetaValue(this.define.UserStatus);
  }
  getImageURL() {
    return this.getMetaValue(this.define.UserImageURL);
  }

}
