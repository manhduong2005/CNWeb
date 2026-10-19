/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

const oTimKiem = document.getElementById("o-tim-kiem");
const dsTin = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// Hàm cập nhật bộ đếm và trạng thái của #khong-thay
function capNhatBoDem() {
	const cacTin = Array.from(dsTin.querySelectorAll("li"));
	const tongSo = cacTin.length;
	const soHien = cacTin.filter(tin => !tin.classList.contains("an")).length;

	boDem.textContent = `Đang hiển thị ${soHien}/${tongSo} tin`;

	const tuKhoa = oTimKiem.value;
	if (soHien === 0) {
		khongThay.classList.remove("an");
		khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoa}"`;
	} else {
		khongThay.classList.add("an");
	}
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (keyup)
function locTin() {
	const tuKhoa = oTimKiem.value.toLowerCase();
	const cacTin = dsTin.querySelectorAll("li");

	cacTin.forEach(tin => {
		const h3Text = tin.querySelector("h3") ? tin.querySelector("h3").textContent.toLowerCase() : "";
		const pText = tin.querySelector("p") ? tin.querySelector("p").textContent.toLowerCase() : "";
		const noiDungGop = h3Text + " " + pText;

		if (noiDungGop.includes(tuKhoa)) {
			tin.classList.remove("an");
		} else {
			tin.classList.add("an");
		}
	});

	capNhatBoDem();
}

oTimKiem.addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list (Event Delegation)
dsTin.addEventListener("click", (e) => {
	if (e.target && e.target.classList.contains("more")) {
		const nut = e.target;
		const mucTin = nut.closest("li");
		if (!mucTin) return;

		const p = mucTin.querySelector("p");
		if (p) {
			if (p.classList.contains("day-du")) {
				p.classList.remove("day-du");
				nut.textContent = "Read more >>";
			} else {
				p.classList.add("day-du");
				nut.textContent = "Thu gọn <<";
			}
		}
	}
});

// F5. Nút #nut-dang: Đăng tin nhanh
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value.trim();
	const noiDung = oNoiDung.value.trim();

	// Kiểm tra nếu rỗng
	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	// Xóa báo lỗi nếu nhập đủ
	baoLoi.textContent = "";

	// Tạo thẻ <li> mới
	const liMoi = document.createElement("li");

	const spanTime = document.createElement("span");
	spanTime.className = "time";
	spanTime.textContent = typeof homNay === "function" ? homNay() : "";

	const h3 = document.createElement("h3");
	h3.textContent = tieuDe; // textContent tự động phòng chống HTML injection

	const p = document.createElement("p");
	p.textContent = noiDung;

	const buttonMore = document.createElement("button");
	buttonMore.type = "button";
	buttonMore.className = "more";
	buttonMore.textContent = "Read more >>";

	liMoi.append(spanTime, h3, p, buttonMore);

	// Chèn vào đầu danh sách #list
	dsTin.prepend(liMoi);

	// Xóa trắng hai ô nhập
	oTieuDe.value = "";
	oNoiDung.value = "";

	// Áp dụng bộ lọc đang gõ (nếu có) lên tin mới
	locTin();
});

// Khởi chạy bộ đếm lần đầu khi trang vừa nạp
capNhatBoDem();