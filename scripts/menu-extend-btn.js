// Menu-extend-btn.js
// Logic for menu corner button

document.addEventListener('DOMContentLoaded', () => {
    const menuToggleButton = document.getElementById('menuToggleButton');
    const subButtonsContainer = document.querySelector('.sub-buttons-container');
    const expandableCornerMenu = document.querySelector('.expandable-corner-menu');

    if (menuToggleButton && subButtonsContainer) {


        menuToggleButton.addEventListener('click', (event) => {
            event.stopPropagation(); // prevent to click event conflit to other element

            // Convert to class 'closed'
            // if there is class 'closed' -> remove (extend)
            // if there is not class 'closed' -> add ()
            subButtonsContainer.classList.toggle('closed');

            // Change to toggle button 
            const icon = menuToggleButton.querySelector('i');
            if (subButtonsContainer.classList.contains('closed')) {
                icon.classList.remove('fa-times'); // if closed, three line is showed
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');  // if opend, X is showed
                icon.classList.add('fa-times');
            }
        });

        // Close menu if click anywhere
        // document.addEventListener('click', (event) => {
        //     // Kiểm tra xem click có nằm ngoài khu vực menu và menu đang mở không
        //     if (expandableCornerMenu && !expandableCornerMenu.contains(event.target) && !subButtonsContainer.classList.contains('closed')) {
        //         subButtonsContainer.classList.add('closed'); // Thêm class 'closed' để thu gọn
        //         const icon = menuToggleButton.querySelector('i');
        //         icon.classList.remove('fa-times'); // Trả lại biểu tượng 3 gạch ngang
        //         icon.classList.add('fa-bars');
        //     }
        // });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const albumImgButton = document.getElementById('albumImageButton');
    if (albumImgButton) {
        albumImgButton.addEventListener('click', function() {
            const gallerySection = document.getElementById('gallery');
            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const wishesButton = document.getElementById('wishesButton');
    if (wishesButton) {
        wishesButton.addEventListener('click', function() {
            const gallerySection = document.getElementById('rsvp');
            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

});

document.addEventListener('DOMContentLoaded', function() {
    const moneyGiftButton = document.getElementById('giftMoneyButton');
    const moneyGiftDialog = document.getElementById('moneyGiftDialog');
    const closeMoneyGiftDialogButton = document.getElementById('closeMoneyGiftDialog');

    // Mở dialog khi nhấn nút "Gửi tiền mừng"
    if (moneyGiftButton) {
        moneyGiftButton.addEventListener('click', function() {
            if (moneyGiftDialog) {
                moneyGiftDialog.style.display = 'flex'; // Hiển thị dialog
            }
        });
    }

    // Đóng dialog khi nhấn nút 'X'
    if (closeMoneyGiftDialogButton) {
        closeMoneyGiftDialogButton.addEventListener('click', function() {
            if (moneyGiftDialog) {
                moneyGiftDialog.style.display = 'none'; // Ẩn dialog
            }
        });
    }

    // Đóng dialog khi click ra ngoài vùng dialog content
    if (moneyGiftDialog) {
        moneyGiftDialog.addEventListener('click', function(event) {
            if (event.target === moneyGiftDialog) { // Chỉ đóng khi click trực tiếp vào overlay
                moneyGiftDialog.style.display = 'none';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const wishesButton = document.getElementById('wishesButton');
    const wishesDialog = document.getElementById('wishesDialog');
    const closeWishesDialogButton = document.getElementById('closeWishesDialog');
    
    // Mở dialog khi nhấn nút "Gửi tiền mừng"
    if (wishesButton) {
        wishesButton.addEventListener('click', function() {
            if (wishesDialog) {
                rsvpDiv.style.display = 'block';
                rsvpThanksDiv.style.display = 'none';
                wishesDialog.style.display = 'flex'; // Hiển thị dialog
            }
        });
    }

    // Đóng dialog khi nhấn nút 'X'
    if (closeWishesDialogButton) {
        closeWishesDialogButton.addEventListener('click', function() {
            if (wishesDialog) {
                wishesDialog.style.display = 'none'; // Ẩn dialog
                db.collection(guest_source).doc(guestId).get()
                .then(doc => {
                if (doc.exists) {
                    updateInvitationRSVPStatus(doc.data()); // Cập nhật trạng thái trên thiệp mời
                }
                })
                .catch(error => {
                console.error("Lỗi khi tải lại dữ liệu khách mời để cập nhật UI:", error);
                });
            }
        });
    }

    // Đóng dialog khi click ra ngoài vùng dialog content
    if (wishesDialog) {
        wishesDialog.addEventListener('click', function(event) {
            if (event.target === wishesDialog) { // Chỉ đóng khi click trực tiếp vào overlay
                wishesDialog.style.display = 'none';
                db.collection(guest_source).doc(guestId).get()
                .then(doc => {
                if (doc.exists) {
                    updateInvitationRSVPStatus(doc.data()); // Cập nhật trạng thái trên thiệp mời
                }
                })
                .catch(error => {
                console.error("Lỗi khi tải lại dữ liệu khách mời để cập nhật UI:", error);
                });
                }
        });
    }
});

function openDialog() {
    const wishesDialog = document.getElementById('wishesDialog');
    if (wishesDialog) {
        rsvpDiv.style.display = 'block';
        rsvpThanksDiv.style.display = 'none';
        wishesDialog.style.display = 'flex'; // Hiển thị dialog
    }
}


