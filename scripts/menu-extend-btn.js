// Logic cho menu mở rộng ở góc phải
document.addEventListener('DOMContentLoaded', () => {
    const menuToggleButton = document.getElementById('menuToggleButton');
    const subButtonsContainer = document.querySelector('.sub-buttons-container');
    const expandableCornerMenu = document.querySelector('.expandable-corner-menu');

    if (menuToggleButton && subButtonsContainer) {
        // KHÔNG CẦN THÊM CLASS 'open' Ở ĐÂY NỮA, vì trạng thái mặc định được quản lý bằng CSS

        menuToggleButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Ngăn sự kiện click lan truyền ra ngoài

            // Chuyển đổi class 'closed'
            // Nếu có class 'closed' -> xóa đi (mở rộng)
            // Nếu không có class 'closed' -> thêm vào (thu gọn)
            subButtonsContainer.classList.toggle('closed');

            // Thay đổi biểu tượng của nút chính
            const icon = menuToggleButton.querySelector('i');
            if (subButtonsContainer.classList.contains('closed')) {
                icon.classList.remove('fa-times'); // Nếu đang đóng, hiển thị 3 gạch
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');  // Nếu đang mở, hiển thị dấu X
                icon.classList.add('fa-times');
            }
        });

        // Đóng menu khi nhấp ra ngoài
        document.addEventListener('click', (event) => {
            // Kiểm tra xem click có nằm ngoài khu vực menu và menu đang mở không
            if (expandableCornerMenu && !expandableCornerMenu.contains(event.target) && !subButtonsContainer.classList.contains('closed')) {
                subButtonsContainer.classList.add('closed'); // Thêm class 'closed' để thu gọn
                const icon = menuToggleButton.querySelector('i');
                icon.classList.remove('fa-times'); // Trả lại biểu tượng 3 gạch ngang
                icon.classList.add('fa-bars');
            }
        });
    }
});