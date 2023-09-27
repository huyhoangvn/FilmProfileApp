var baseLink = 'https://canyon-mud-carriage.glitch.me';
var loginApiUrl = baseLink + '/dangnhap';

var baseLinkTest = 'http://localhost:3002';
var loginApiUrlTest = baseLinkTest + '/api/dangnhap';
var registerUrlTest = baseLinkTest + '/api/themTaiKhoan'
var getInforUrlTest = baseLinkTest + '/api/getThongTinCaNhan/'

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
    const response = await fetch(loginApiUrlTest, requestOptions);
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
    const response = await fetch(registerUrlTest, requestOptions);
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
      const response = await fetch(getInforUrlTest + id, requestOptions);
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
