/* BÀI A — ĐIỀN VÀO CHỖ TRỐNG: Thư viện ảnh tương tác (index.html) */

// ---------- Phần 1: Tìm phần tử ----------
// Phần tử ĐẦU TIÊN khớp bộ chọn CSS:
const anhLon = document.querySelector("#gallery > div > img");        // (1) querySelector
// TẤT CẢ phần tử khớp bộ chọn CSS:
const dsAnhNho = document.querySelectorAll("#gallery ul li img");     // (2) querySelectorAll
const khungAnhNho = document.querySelector("#gallery ul");
// Tìm theo id:
const oTimKiem = document.getElementById("o-tim-kiem");                 // (3) getElementById

console.log(dsAnhNho.length);                     // in ra: 6            // (4) 6

// ---------- Phần 2: Đi lại trên cây DOM ----------
console.log(khungAnhNho.firstChild.nodeType);     // in ra: 3            // (5) 3 (Text node do xuống dòng)
console.log(khungAnhNho.childNodes.length);       // in ra: 13           // (6) 13
// Đi từ <img> lên phần tử cha của nó:
console.log(dsAnhNho[0].parentNode.nodeName);     // in ra: LI           // (7) parentNode

// ---------- Phần 3: Tạo và chèn phần tử ----------
const chuThich = document.createElement("p");                            // (8) createElement
chuThich.id = "chu-thich";
// (9) Gán nội dung dạng VĂN BẢN THUẦN:
chuThich.textContent = "Bấm vào ảnh nhỏ để đổi ảnh lớn.";                // (9) textContent
// (10) Chèn vào CUỐI thẻ <div> đang chứa ảnh lớn:
anhLon.parentNode.appendChild(chuThich);                                // (10) appendChild

// ---------- Phần 4: MỘT trình lắng nghe cho cả 6 ảnh nhỏ ----------
function doiAnh(e) {
	// Người dùng có thể bấm trúng khoảng trống của <ul> hoặc mép <li>: khi đó không làm gì cả.
	if (e.target.nodeName !== "IMG") {                                  // (11) !==
		return;                                                          // (12) return
	}

	// Thuộc tính alt của ảnh nhỏ lưu tên file ảnh lớn tương ứng.
	anhLon.src = `images/${e.target.alt}.jpg`;
	chuThich.textContent = `Đang xem: ${e.target.alt}.jpg`;              // (13) target

	// Bỏ lớp "dang-chon" ở mọi <li>, rồi gán cho <li> chứa ảnh vừa bấm.
	for (const anh of dsAnhNho) {                                        // (14) of
		anh.parentNode.className = "";
	}
	e.target.parentNode.className = "dang-chon";                         // (15) className
}

khungAnhNho.addEventListener("click", doiAnh);                          // (16) addEventListener, (17) doiAnh

// Nếu viết khungAnhNho.addEventListener("click", doiAnh()); thì:
//   → (B)                                                              // (18) (B) hoặc B

// ---------- Phần 5: Thay inline JS của ô tìm kiếm ----------
const GOI_Y = "Enter search query";
oTimKiem.addEventListener("focus", () => {                              // (19) focus
	if (oTimKiem.value === GOI_Y) {
		oTimKiem.value = "";
	}
});
oTimKiem.addEventListener("blur", () => {
	if (oTimKiem.value === "") {
		oTimKiem.value = GOI_Y;
	}
});

// ---------- Phần 6: Gỡ trình lắng nghe ----------
const nutKhoa = document.getElementById("nut-khoa");
nutKhoa.addEventListener("click", (e) => {
	khungAnhNho.removeEventListener("click", doiAnh);                   // (20) removeEventListener, (21) doiAnh
	chuThich.textContent = "Thư viện ảnh đã khoá.";
	console.log(e.type);                           // in ra: click       // (22) click
	console.log(e.target.id);                      // in ra: nut-khoa    // (23) nut-khoa
});

// thì removeEventListener("click", (e) => doiAnh(e)) có gỡ được không? → không  // (24) không

// ---------- Phần 7: Thêm một mục vào cột bên phải ----------
const dsBaiViet = document.querySelector("#posts ul");
const mucMoi = document.createElement("li");
const tieuDe = document.createElement("h5");
tieuDe.textContent = "Khuyến mãi <b>thiệp cưới</b>";
mucMoi.append(tieuDe);
// (25) Chèn vào ĐẦU danh sách:
dsBaiViet.prepend(mucMoi);                                              // (25) prepend

// Trên trang, hai chữ "thiệp cưới" hiện IN ĐẬM hay hiện NGUYÊN cả cặp thẻ <b>…</b>? → NGUYÊN cả cặp thẻ <b>…</b> // (26) NGUYÊN cả cặp thẻ <b>…</b>
console.log(dsBaiViet.querySelectorAll("li").length);     // in ra: 4   // (27) 4