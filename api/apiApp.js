import { Platform } from 'react-native';

var baseLink 
if (Platform.OS === 'ios') {
  // Code for iOS
  baseLink = 'http://localhost:3002'
} else if (Platform.OS === 'android') {
  // Code for Android
  baseLink = 'http://10.0.2.2:3002';
} else {
  // Code for other platforms
}


var loginApiUrl = baseLink + '/dangnhap';
var registerUrl = baseLink + '/api/themTaiKhoan'
var getInforUrl = baseLink + '/api/getThongTinCaNhan/'


const LoginApi = async ({ userName, password }) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    taiKhoan: userName,
    matKhau: password,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  try {
    const response = await fetch(loginApiUrl, requestOptions);
    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result; // Trả về kết quả cho người gọi hàm
  } catch (error) {
    console.log('error', error);
    return null; // Trả về giá trị null trong trường hợp lỗi
  }
};

const registerApi = async ({ name, userName, password }) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    hoTen: name,
    taiKhoan: userName,
    matKhau: password,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  try {
    const response = await fetch(registerUrl, requestOptions);
    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result; // Trả về kết quả cho người gọi hàm
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu:', error); // Log lỗi nếu có
    return null; // Trả về null nếu có lỗi
  }
};



  const getInfor = async ({ id}) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
  
    try {
      const response = await fetch(getInforUrl + id, requestOptions);
      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ');
      }
      const result = await response.json();
      return result.data; // Trả về kết quả cho người gọi hàm
    } catch (error) {
      // Xử lý lỗi nếu cần
      throw error;
    }
  };


module.exports = { LoginApi, registerApi, getInfor};
