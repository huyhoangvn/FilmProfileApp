import { Platform } from 'react-native';

var baseLink = 'https://gratis-dusty-cabinet.glitch.me'
// var baseLink
// if (Platform.OS === 'ios') {
//   // Code for iOS
//   baseLink = 'http://localhost:3002';
// } else if (Platform.OS === 'android') {
//   // Code for Android
//   baseLink = 'http://10.0.2.2:3002';
// } else {
//   // Code for other platforms
// }

var loginApiUrl = baseLink + '/dangnhap';
var registerUrl = baseLink + '/api/themTaiKhoan';
var getInforUrl = baseLink + '/api/getThongTinCaNhan/';
var editProFileUrl = baseLink + '/api/suaThongTin/';
var saveMovieUrl = baseLink + '/api/themPhim/';
var getStatusUrl = baseLink + '/api/isPhimTrongDanhSach/';
var deleteStatusUrl = baseLink + '/api/xoaKhoiDanhSach/';
var getListSaveUrl = baseLink + '/api/getDanhSach/';
var editSaveListUrl = baseLink + '/api/suaDanhGia/';
var addPostUrl = baseLink + '/api/themBaiDang/';
var getPostFriendUrl = baseLink + '/api/getBaiDangBanBe/';
var addLikePostUrl = baseLink + '/api/themLike/';
var deleteLikePostUrl = baseLink + '/api/xoaLike/';
var getLikePostUrl = baseLink + '/api/getAllLike/';
var getPointReviewUrl = baseLink + '/api/getDiemDanhGia/';
var getUsersListUrl = baseLink + '/api/getDanhSachTimNguoiDung/';
var getUserFriendsListUrl = baseLink + '/api/getDanhSachBanBe/';
var addFriendUrl = baseLink + '/api/themBanBe/';
var removeFriendUrl = baseLink + '/api/xoaBanbe/';
var getFollowMeUrl = baseLink + '/api/getSoLuongTheoDoi/';
var getFollowerUrl = baseLink + '/api/getSoLuongNguoiTheoDoi/';
var getPostUserUrl = baseLink + '/api/getBaiDangCaNhan/';

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

const getInfor = async ({ id }) => {
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

const editProFile = async ({ id, name, bird, sex, introduce, image }) => {
  console.log(id + ' ' + name + ' ' + bird + ' ' + sex + ' ' + introduce + ' ' + image);
  var formdata = new FormData();
  formdata.append('hoTen', name);
  formdata.append('ngaySinh', bird);
  formdata.append('gioiTinh', sex);
  formdata.append('moTa', introduce);
  formdata.append('hinhAnh', {
    uri: image, // Đường dẫn đến hình ảnh đã chọn
    name: 'photo.png', // Tên tùy ý cho tệp hình ảnh
    type: 'image/png', // Loại hình ảnh
  });

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };
  try {
    const response = await fetch(editProFileUrl + id, requestOptions);
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

const saveMovies = async ({ id, idMovie, nameMovie, imageMovie }) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    idPhim: idMovie,
    tenPhim: nameMovie,
    hinhAnh: imageMovie,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  try {
    const response = await fetch(saveMovieUrl + id, requestOptions);
    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result; // Trả về kết quả cho người gọi hàm
  } catch (error) {
    // Xử lý lỗi nếu cần
    throw error;
  }
};

const getStatus = async ({ idMovie, idUser }) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(getStatusUrl + idMovie + '/' + idUser, requestOptions);
    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result; // Trả về kết quả cho người gọi hàm
  } catch (error) {
    // Xử lý lỗi nếu cần
    throw error;
  }
};

const deleteStatus = async ({ idMovie, idUser }) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(deleteStatusUrl + idMovie + '/' + idUser, requestOptions);
    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result; // Trả về kết quả cho người gọi hàm
  } catch (error) {
    // Xử lý lỗi nếu cần
    throw error;
  }
};

const getListSave = async ({ idUser, love, status, nameMovie, review }) => {
  console.log(idUser, love, status, nameMovie, review);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  try {
    console.log(idUser + `?yeuThich=${love}&trangThaiXem=${status}&tenPhim=${nameMovie}&danhGia=${review}`);
    const response = await fetch(getListSaveUrl + idUser + `?yeuThich=${love}&trangThaiXem=${status}&tenPhim=${nameMovie}&danhGia=${review}`, requestOptions);
    // http://localhost:3002/api/getDanhSach/651b07d81b75b48fecf2016a?yeuThich=-1&trangThaiXem=-1&tenPhim=-1&danhGia=-1
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

const editSaveList = async ({ idUser, idMovie, status, like, point }) => {
  // Tạo đối tượng Headers
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  console.log('dsaadsdasdasdasdasdasdas   ' + idUser, idMovie, status, like, point);

  var raw = JSON.stringify({
    danhGia: point,
    trangThaiXem: status,
    yeuThich: like,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  try {
    const response = await fetch(editSaveListUrl + idUser + '/' + idMovie + `?yeuThich=${like}&danhGia=${point}&trangThaiXem=${status}`, requestOptions);

    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result; // Trả về kết quả cho người gọi hàm
  } catch (error) {
    // Xử lý lỗi nếu cần
    throw error;
  }
};

const addPost = async ({ idUser, idReview, title, content }) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    chuDe: title,
    noiDung: content,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    console.log(addPostUrl + idUser + '/' + idReview);
    const response = await fetch(addPostUrl + idUser + '/' + idReview, requestOptions);

    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result; // Trả về kết quả cho người gọi hàm
  } catch (error) {
    // Xử lý lỗi nếu cần
    throw error;
  }
};

const getPostFriend = async ({ idUser }) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  try {
    const response = await fetch(getPostFriendUrl + idUser, requestOptions);
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

const addLikePost = async ({ idUser, idPost }) => {
  console.log('sdasdasdasdas  ' + idUser + ' ' + idPost);
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
  };

  try {
    const response = await fetch(addLikePostUrl + idUser + '/' + idPost, requestOptions);
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

const deleteLikePost = async ({ idUser, idPost }) => {
  console.log('cccccccccc' + idUser + ' : ' + idPost);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(deleteLikePostUrl + idUser + '/' + idPost, requestOptions);
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

const getLikePost = async ({ idPost }) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  try {
    const response = await fetch(getLikePostUrl + idPost, requestOptions);
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

const getPointReview = async ({ idMovie }) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  try {
    const response = await fetch(getPointReviewUrl + idMovie, requestOptions);
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


//Lấy danh sách người dùng
const getUsersListApi =  async (idUser, tenTimKiem, trang) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  try {
    const response = await fetch(getUsersListUrl + idUser + '/' + `?timKiemTen=${tenTimKiem}&trang=${trang}`, requestOptions);
    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
}

//Thêm bạn bè vào danh sách
const removeFriendApi =  async (idTheoDoi, idUser) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  try {
    console.log(removeFriendUrl + idUser + '/' + idTheoDoi);
    const response = await fetch(removeFriendUrl + idUser + '/' + idTheoDoi, requestOptions);
    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
}

//Xóa bạn bè khỏi danh sách
const addFriendApi =  async (idTheoDoi, idUser) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  try {
    console.log(addFriendUrl + idTheoDoi + '/' + idUser);
    const response = await fetch(addFriendUrl + idUser + '/' + idTheoDoi, requestOptions);
    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
}

//Lấy danh sách bạn đã theo dõi
const getUserFriendsListApi =  async (idUser) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  try {
    console.log(getUsersListUrl + idUser);
    const response = await fetch(getUserFriendsListUrl + idUser, requestOptions);
    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
}

var getFollowMe = async ({ idUser }) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  try {
    console.log(getUsersListUrl + idUser);
    const response = await fetch(getFollowMeUrl + idUser, requestOptions);
    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

var getFollower = async ({ idUser }) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  try {
    console.log(getUsersListUrl + idUser);
    const response = await fetch(getFollowerUrl + idUser, requestOptions);
    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

var getPostUser = async ({ idUser }) => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  try {
    const response = await fetch(getPostUserUrl + idUser, requestOptions);
    if (!response.ok) {
      throw new Error('Không thể kết nối đến máy chủ');
    }
    const result = await response.json();
    return result.data
  } catch (error) {
    throw error;
  }
};

module.exports = {
  LoginApi,
  registerApi,
  getInfor,
  editProFile,
  saveMovies,
  getStatus,
  deleteStatus,
  getListSave,
  editSaveList,
  addPost,
  getPostFriend,
  addLikePost,
  deleteLikePost,
  getLikePost,
  getPointReview,
  getUsersListApi,
  addFriendApi,
  removeFriendApi,
  getUserFriendsListApi,
  getFollowMe,
  getFollower,
  getPostUser,
};
