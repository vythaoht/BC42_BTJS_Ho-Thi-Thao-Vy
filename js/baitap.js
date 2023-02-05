//CÂU 1: IN RA TABLE DS NV
let danhSachNhanVien = [];

//hàm in ra table danh sách NV
function renderTable(ds) {
  let html = ds.reduce((output, nhanVien) => {
    let nv = new Nhanvien(
      nhanVien.taiKhoan,
      nhanVien.hoVaTen,
      nhanVien.email,
      nhanVien.matKhau,
      nhanVien.ngayLam,
      nhanVien.luongCB,
      nhanVien.chucVu,
      nhanVien.gioLam
    );
    return (
      output +
      `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoVaTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.calcTongLuong()}</td>
            <td>${nv.ranking()}</td>

            <td>
                <button class="btn btn-success" 
                data-toggle="modal"
                    data-target="#myModal"
                onclick="selectNvToUpdate('${nv.taiKhoan}')">Cap nhat</button>
                <button class="btn btn-danger" 
                onclick="deleteNhanvien('${nv.taiKhoan}')">Xoá</button>
            </td>
        </tr>    
        `
    );
  }, "");
  getElement("#tableDanhSach").innerHTML = html;
}
renderTable(danhSachNhanVien);

//CÂU 2: THÊM NV MỚI
//Hàm thêm nhân viên mới:
function createNV() {
  //b1: DOM để lấy giá trị yêu cầu:
  let tk = getElement("#tknv").value;
  let name = getElement("#name").value;
  let email = getElement("#email").value;
  let password = getElement("#password").value;
  let date = getElement("#datepicker").value;
  let luongCB = +getElement("#luongCB").value;
  let chucVu = getElement("#chucvu").value;
  let gioLam = getElement("#gioLam").value;

  if (!validate()) {
    return;
  }

  //b2: Khoi tao OBJECT NHAN VIEN
  const nv = new Nhanvien(
    tk,
    name,
    email,
    password,
    date,
    luongCB,
    chucVu,
    gioLam
  );

  //b3: push vao mang
  danhSachNhanVien.push(nv);

  //b4: goi ham de in ra table
  renderTable(danhSachNhanVien);

  resetForm();
}
getElement("#btnThemNV").onclick = createNV;

//Câu 4: Validation
function validate() {
  let isCheck = true;

  // TK có 4-6 ký tự
  let tk = getElement("#tknv").value;
  if (!tk.trim() || tk.length < 4 || tk.length > 6) {
    isCheck = false;
    getElement("#tbTKNV").innerHTML = "Số kí tự tối thiểu là 4 và tối đa là 6";
    getElement("#tbTKNV").style.display = "block";
  } else {
    getElement("#tbTKNV").innerHTML = "";
    getElement("#tbTKNV").style.display = "none";
  }

  // Tên NV phải là chữ, không đc để trống
  let hoVaTen = getElement("#name").value;

  const regexHasNumber = /\d/;
  if (!hoVaTen.trim() || regexHasNumber.test(hoVaTen)) {
    isCheck = false;
    getElement("#tbTen").innerHTML = "Tên NV không được để trống và chứa số";
    getElement("#tbTen").style.display = "block";
  } else {
    getElement("#tbTen").innerHTML = "";
    getElement("#tbTen").style.display = "none";
  }

  //Email phải đúng định dạng và ko đc để trống
  let email = getElement("#email").value;

  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email.trim() || !regexEmail.test(email)) {
    isCheck = false;
    getElement("#tbEmail").innerHTML = "Email không đúng định dạng";
    getElement("#tbEmail").style.display = "block";
  } else {
    getElement("#tbEmail").innerHTML = "";
    getElement("#tbEmail").style.display = "none";
  }

  //mật khẩu 6-10 kí tự, có 1 kí tự hoa, 1 số, 1 kí tự đặc biệt
  let password = getElement("#password").value;
  const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,10})/;
  if (!password.trim() || !regexPassword.test(password)) {
    isCheck = false;
    getElement("#tbMatKhau").innerHTML =
      "Mật khẩu phải chứa 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống ";
    getElement("#tbMatKhau").style.display = "block";
  } else {
    getElement("#tbMatKhau").innerHTML = "";
    getElement("#tbMatKhau").style.display = "none";
  }

  //ngày làm ko để trống, định dạng dd/mm/yy
  let date = getElement("#datepicker").value;
  const regexDate =
    /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
  if (!date.trim() || !regexDate.test(date)) {
    isCheck = false;
    getElement("#tbNgay").innerHTML = "Định dạng ngày chưa đúng";
    getElement("#tbNgay").style.display = "block";
  } else {
    getElement("#tbNgay").innerHTML = "";
    getElement("#tbNgay").style.display = "none";
  }

  //lương CB ko để trống, 1_000_000 đến 20_000_000
  let luong = getElement("#luongCB").value;
  if (!luong.trim() || luong < 1000000 || luong > 20000000) {
    isCheck = false;
    getElement("#tbLuongCB").innerHTML = "Lương không phù hợp";
    getElement("#tbLuongCB").style.display = "block";
  } else {
    getElement("#tbLuongCB").innerHTML = "";
    getElement("#tbLuongCB").style.display = "none";
  }

  //Chọn chức vụ, ko đc để trống
  let chucVu = getElement("#chucvu").value;
  if (!chucVu) {
    isCheck = false;
    getElement("#tbChucVu").innerHTML = "Chức vụ không được để trống";
    getElement("#tbChucVu").style.display = "block";
  } else {
    getElement("#tbChucVu").innerHTML = "";
    getElement("#tbChucVu").style.display = "none";
  }

  //giờ làm từ 80 - 200 / tháng, ko để trống
  let gioLam = getElement("#gioLam").value;
  if (!gioLam.trim() || gioLam < 80 || gioLam > 200) {
    isCheck = false;
    getElement("#tbGiolam").innerHTML = "Giờ làm từ 80-200 giờ/tháng";
    getElement("#tbGiolam").style.display = "block";
  } else {
    getElement("#tbGiolam").innerHTML = "";
    getElement("#tbGiolam").style.display = "none";
  }
  // resetForm();
  return isCheck;
}

//Câu 7: Xoá nhân viên
function deleteNhanvien(taiKhoanNV) {
  danhSachNhanVien = danhSachNhanVien.filter((nv) => {
    return nv.taiKhoan !== taiKhoanNV;
  });
  renderTable(danhSachNhanVien);
}

//Câu 8: Cập nhật nhân viên
//Hàm tìm nhân viên theo ID để fill lên form lại, chuẩn bị cho bước cập nhật
function selectNvToUpdate(taiKhoan) {
  //B1: Tìm NV theo ID
  selectNv = danhSachNhanVien.find((nv) => {
    return nv.taiKhoan === taiKhoan;
  });

  //B2: Lấy thông tin vừa tìm được ráp vào các ô inputs tương ứng
  getElement("#tknv").value = selectNv.taiKhoan;
  getElement("#name").value = selectNv.hoVaTen;
  getElement("#email").value = selectNv.email;
  getElement("#password").value = selectNv.matKhau;
  getElement("#datepicker").value = selectNv.ngayLam;
  getElement("#luongCB").value = selectNv.luongCB;
  getElement("#chucvu").value = selectNv.chucVu;
  getElement("#gioLam").value = selectNv.gioLam;

  //B3: disable ô tài khoản NV và nút thêm NV
  getElement("#tknv").disabled = true;
  getElement("#btnThemNV").disabled = true;
  getElement("#btnCapNhat").disabled = false;
}

//hàm update nhân viên
getElement("#btnCapNhat").onclick = function () {
  //B1: DOM toi cac gia tri cua form them lan nua
  let tk = getElement("#tknv").value;
  let name = getElement("#name").value;
  let email = getElement("#email").value;
  let password = getElement("#password").value;
  let date = getElement("#datepicker").value;
  let luongCB = +getElement("#luongCB").value;
  let chucVu = getElement("#chucvu").value;
  let gioLam = getElement("#gioLam").value;

  if (!validate()) {
    return;
  }

  //b2: khoi tao object moi co doi tuong la nhan vien
  const nv = new Nhanvien(
    tk,
    name,
    email,
    password,
    date,
    luongCB,
    chucVu,
    gioLam
  );

  //b3: cập nhật thông tin mới của student
  let index = danhSachNhanVien.findIndex((nhanVien) => {
    return nhanVien.taiKhoan === tk;
  });

  danhSachNhanVien[index] = nv;
  renderTable(danhSachNhanVien);
};

//Câu 9: Tìm NV theo xếp loại
getElement("#btnTimNV").onclick = function () {
  let searchRank = getElement("#searchName").value;

  let danhSachNhanVienSauKhiFilter = danhSachNhanVien.filter((nv) => {
    return nv.ranking().toLowerCase().indexOf(searchRank.toLowerCase()) !== -1;
  });

  //"nếu searchRank rỗng" !searchRank
  if (!searchRank) {
    renderTable(danhSachNhanVien);
  } else {
    renderTable(danhSachNhanVienSauKhiFilter);
  }
};

//Hàm dùng để DOM
function getElement(selector) {
  return document.querySelector(selector);
}

//Hàm bắt sự kiện thì:
getElement("#btnThem").onclick = function () {
  getElement("#tknv").disabled = false;
  getElement("#btnThemNV").disabled = false;
  getElement("#btnCapNhat").disabled = true;
};
getElement("#btnDong").onclick = function () {
  resetForm();
};

//hàm reset form
function resetForm() {
  getElement("#tknv").value = "";
  getElement("#name").value = "";
  getElement("#email").value = "";
  getElement("#password").value = "";
  getElement("#datepicker").value = "";
  getElement("#luongCB").value = "";
  getElement("#chucvu").value = "";
  getElement("#gioLam").value = "";
}
