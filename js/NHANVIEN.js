//=======CÂU 3: Tạo lớp đối tượng NV ===========

function Nhanvien(
  tk,
  hoVaTen,
  email,
  matKhau,
  ngayLam,
  luongCB,
  chucVu,
  gioLam
) {
  this.taiKhoan = tk;
  this.hoVaTen = hoVaTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCB = luongCB;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
}

//Câu 5: Xây dựng phương thức tính tổng lương
Nhanvien.prototype.calcTongLuong = function () {
  if (this.chucVu === "GD") {
    return this.luongCB * 3;
  } else if (this.chucVu === "TP") {
    return this.luongCB * 2;
  } else {
    return this.luongCB;
  }
};

//Xây dựng phương thức xếp loại nhân viên
Nhanvien.prototype.ranking = function () {
  if (this.gioLam >= 192) {
    return "NV xuat sac";
  } else if (this.gioLam >= 176) {
    return "NV gioi";
  } else if (this.gioLam >= 160) {
    return "NV kha";
  } else {
    return "NV trung binh";
  }
};
