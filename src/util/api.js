let host = "http://192.168.1.103";

if (process.env === "production") {
  host = "http://iisdevsrv01.takasdom.takasbank.com.tr";
  exports.HOST_URL = `${host}:8080/`;
}else{
  exports.HOST_URL = `${host}:3000`;
}

const API_URL = `${host}:3030/`;
exports.API_URL = `${host}:3030/`;
exports.LOGIN_URL = `${API_URL}auth/local`;
exports.SIGNIN_URL = `${API_URL}/signin`;
exports.SIGNUP_URL = `${API_URL}signup`;
exports.IMAGEUPLOAD_URL = `${API_URL}imageupload`;
