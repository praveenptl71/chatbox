import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefinesService {

  DEBUG = false;
  FIREBASE_REF_DEBUG = false;

  RoomDefaultNameEmpty = "Empty Chat";
  RoomDefaultName1To1 = "Private Chat";
  RoomDefaultNameGroup = "Group Chat";
  RoomDefaultNamePublic = "Public Chat";

  DefaultAvatarProvider = "http://flathash.com";

  Minute = 60;
  Hour = this.Minute * 60;
  Day = this.Hour * 24;

  // Last visited
  // Show the click to chat box if the user has visited more than x hours
  LastVisitedTimeout = this.Hour;

  // Paths
  UsersPath = "users";
  UsersMetaPath = "users";
  RoomsPath = "threads";
  PublicRoomsPath = "public-threads";
  MessagesPath = 'messages';
  FlaggedPath = 'flagged';
  TypingPath = 'typing';
  FriendsPath = 'friends';
  BlockedPath = 'blocked';
  UpdatedPath = 'updated';
  OnlineUserCountKey = 'onlineUserCount';
  LastMessagePath = "lastMessage";
  FlaggedMessagesPath = "flagged";
  BroadcastPath = "broadcast";

  SenderEntityID = "sender-entity-id";
  CreatorEntityID = "creator-entity-id";

  messageUID = "user-firebase-id";
  //    messageRID = "rid";
  messageType = "type";
  messageTime = "date";
  messageJSONv2 = "json_v2";
  messageUserName = "userName";
  messageUserFirebaseID = "user-firebase-id";

  // JSON Keys
  messageText = "text";
  messageFileURL = "file-url";
  messageImageURL = "image-url";
  messageMimeType = "mime-type";
  messageThumbnailURL = "thumbnail-url";
  textColor = "text-color";
  backgroundColor = "bg-color";

  messageImageWidth = "image-width";
  messageImageHeight = "image-height";

  userUID = "uid";

  roomCreated = "creation-date";
  roomRID = "rid";
  roomUserCreated = "userCreated";
  roomName = "name";
  roomInvitesEnabled = "invitesEnabled";
  roomDescription = "description";
  roomWeight = "weight";
  roomType = "type_v4";
  roomTypeV3 = "type";
  roomCreatorEntityID = this.CreatorEntityID;

  ReadKey = 'read';
  DateKey = "date";
  MessageKey = "message";
  MetaKey = "meta";
  DetailsKey = "details";
  ImageKey = "image";
  TimeKey = "time";
  UserCountKey = "user-count";
  ConfigKey = "config";
  DeviceToken = "deviceToken";

  OnlineKey = "online";
  TypeKey = "type";

  UserName = "name";
  UserNameLower = "name-lowercase";
  Email = "email";
  UserCountryCode = "country-code";
  UserLocation = "location";
  UserImageURL = "pictureURL";
  UserGender = "gender";
  UserStatus = "status";
  UserProfileLink = "profile-link";
  UserHomepageLink = "homepage-link";
  UserHomepageText = "homepage_text";
  UserProfileHTML = "profile-html";
  UserAllowInvites = "allow-invites";

  // TODO:
  DefaultUserPrefix = "ChatSDK";

  UserStatusOwner = 'owner';
  UserStatusMember = 'member';
  //    bUserStatusInvited = 'invited'; // Depricated
  bUserStatusClosed = 'closed';

  //    RoomType1to1 = '1to1';
  //    RoomTypeGroup = 'group';
  //    RoomTypePublic = 'public';
  //    RoomTypeInvalid = 'invalid';

  RoomTypeInvalid = 0x0;
  RoomTypeGroup = 0x1;
  RoomType1to1 = 0x2;
  RoomTypePublic = 0x4;

  RoomTypePrivateV3 = 0;
  RoomTypePublicV3 = 1;

  UserAllowInvitesEveryone = 'Everyone';
  UserAllowInvitesFriends = 'Friends';
  UserAllowInvitesNobody = 'Nobody';

  // Tabs
  UsersTab = 'users';
  RoomsTab = 'rooms';
  FriendsTab = 'friends';
  InboxTab = 'inbox';
  MessagesTab = 'messages';
  ChannelTab = 'channels';

  ProviderTypeCustom = 'custom';

  ProfileSettingsBox = 'profileSettingsBox';
  LoginBox = 'loginBox';
  MainBox = 'mainBox';
  CreateRoomBox = 'createRoomBox';
  ErrorBox = 'errorBox';

  ShowProfileSettingsBox = 'showProfileSettingsBox';
  ShowCreateChatBox = 'showCreateChatBox';

  VisibilityChangedNotification = 'VisibilityChangedNotification';

  PublicRoomAddedNotification = 'PublicRoomAddedNotification';
  PublicRoomRemovedNotification = 'PublicRoomRemovedNotification';

  RoomAddedNotification = 'RoomAddedNotification';
  RoomRemovedNotification = 'RoomRemovedNotification';

  RoomOpenedNotification = 'RoomOpenedNotification';
  RoomClosedNotification = 'RoomClosedNotification';

  broadcastAddedNotification = 'broadcastAddedNotification';

  AnimateRoomNotification = 'AnimateRoomNotification';

  RoomUpdatedNotification = 'RoomUpdatedNotification';
  RoomPositionUpdatedNotification = 'RoomPositionUpdatedNotification';
  RoomSizeUpdatedNotification = 'RoomSizeUpdatedNotification';
  UpdateRoomActiveStatusNotification = 'UpdateRoomActiveStatusNotification';

  LazyLoadedMessagesNotification = 'LazyLoadedMessagesNotification';

  ChatUpdatedNotification = 'ChatUpdatedNotification';

  UserOnlineStateChangedNotification = 'UserOnlineStateChangedNotification';
  UserValueChangedNotification = 'UserValueChangedNotification';

  ScreenSizeChangedNotification = 'ScreenSizeChangedNotification';

  LoginCompleteNotification = 'LoginComp   eNotification';
  LogoutNotification = 'LogoutNotification';

  StartSocialLoginNotification = 'StartSocialLoginNotification';

  RoomFlashHeaderNotification = 'RoomFlashHeaderNotification';
  RoomBadgeChangedNotification = 'RoomBadgeChangedNotification';

  OnlineUserAddedNotification = 'OnlineUserAddedNotification';
  OnlineUserRemovedNotification = 'OnlineUserRemovedNotification';

  UserAddedNotification = 'UserAddedNotification';
  UserRemovedNotification = 'UserRemovedNotification';

  AllUserAddedNotification = 'AllUserAddedNotification';
  AllUserRemovedNotification = 'AllUserRemovedNotification';

  UserBlockedNotification = 'UserBlockedNotification';
  UserUnblockedNotification = 'UserUnblockedNotification';

  FriendAddedNotification = 'FriendAddedNotification';
  FriendRemovedNotification = 'FriendRemovedNotification';

  DeleteMessageNotification = 'De   eMessageNotification';
  EditMessageNotification = 'EditMessageNotification';

  ConfigUpdatedNotification = "ConfigUpdatedNotification";

  UserSearchInput = "UserSearchInput";

  LoginModeSimple = "simple";
  //     bLoginModeSingleSignOn = "singleSignOn";
  //     bLoginModeToken = "token";
  LoginModeAuthenticating = "authenticating";
  LoginModeClickToChat = "clickToChat";

  MessageTypeText = 0;
  MessageTypeLocation = 1;
  MessageTypeImage = 2;
  MessageTypeFile = 3;

  // Chat width
  ChatRoomWidth = 230;
  ChatRoomHeight = 300;

  ChatRoomTopMargin = 60;
  ChatRoomSpacing = 15;

  MainBoxWidth = 250;
  MainBoxHeight = 300;

  RoomListBoxWidth = 200;
  RoomListBoxHeight = 300;

  ProfileBoxWidth = 300;

  // Notifications

  NotificationTypeWaiting = 'waiting';
  NotificationTypeAlert = 'alert';

  UsernameKey = 'username';
  PasswordKey = 'password';
  RoomIDKey = 'roomID';

  constructor() { }
}
