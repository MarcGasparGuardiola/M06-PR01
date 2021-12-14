function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

export var User = function User(userName, fullName, email, password) {
  _classCallCheck(this, User);

  this.userName = userName;
  this.fullName = fullName;
  this.email = email;
  this.password = password;
};