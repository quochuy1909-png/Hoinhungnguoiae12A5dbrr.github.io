let names = ['Mai Anh', 'Ng PAnh', 'Tr PAnh', 'Ánh', 'Bình', 'Bảo Châu', 'Kim Tuyến', 'Diệu Châu', 'Giang', 'Huyền', 'Ly', 'Phương', 'Ngân', 'Ninh', 'Thu', 'Thư', 'Uyên'];
let scratchCount = 0;
let isMusicPlaying = true;
const bgMusic = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');

// Hàm cập nhật tiêu đề
function updateTitle() {
    const titleElement = document.getElementById('title');
    titleElement.textContent = `NGƯỜI TRÚNG QUÀ SỐ ${scratchCount + 1} LÀ`;
}

// Hàm tạo hiệu ứng pháo giấy
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }
}

// Hàm xóa pháo giấy
function clearConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
}

// Hàm mở hũ và hiển thị kết quả
function openBox() {
    const cardNumberElement = document.getElementById('card-number');
    document.getElementById('open-box-btn').disabled = true;  // Vô hiệu hóa nút mở hũ sau khi đã nhấn

    // Nếu đây là lần mở hũ thứ 7, chọn tên "Kim Tuyến"
    if (scratchCount === 6) {
        cardNumberElement.textContent = 'Kim Tuyến';
    } else {
        const randomIndex = Math.floor(Math.random() * names.length);
        const scratchedName = names[randomIndex];  // Chọn ngẫu nhiên tên từ mảng
        cardNumberElement.textContent = scratchedName;
        names.splice(randomIndex, 1);  // Xóa tên đã chọn khỏi mảng để không lặp lại
    }

    createConfetti();  // Hiển thị pháo giấy
    scratchCount++;

    // Mở khóa nút "Thẻ kế tiếp" sau khi mở hũ
    document.getElementById('next-card-btn').disabled = false;
}

// Lắng nghe sự kiện nhấn nút "Thẻ kế tiếp"
document.getElementById('next-card-btn').addEventListener('click', () => {
    clearConfetti();
    document.getElementById('card-number').textContent = '?';  // Đặt lại dấu hỏi
    document.getElementById('open-box-btn').disabled = false;  // Kích hoạt lại nút "Mở hũ"
    document.getElementById('next-card-btn').disabled = true;  // Vô hiệu hóa nút "Thẻ kế tiếp" khi bắt đầu lượt mới
    updateTitle();  // Cập nhật tiêu đề cho lượt cào tiếp theo
});

// Lắng nghe sự kiện nhấn nút "Mở hũ"
document.getElementById('open-box-btn').addEventListener('click', openBox);

// Lắng nghe sự kiện nhấn nút bật/tắt nhạc
document.getElementById('music-toggle').addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicIcon.src = 'images/sound-off.png';  // Thay đổi biểu tượng âm thanh
    } else {
        bgMusic.play();
        musicIcon.src = 'images/sound-on.png';  // Thay đổi biểu tượng âm thanh
    }
    isMusicPlaying = !isMusicPlaying;  // Đảo ngược trạng thái âm nhạc
});

// Khởi tạo tiêu đề ngay từ đầu
updateTitle();
