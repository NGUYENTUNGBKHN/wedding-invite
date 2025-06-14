function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const guestId = getQueryParam('guest');
const invitationDiv = document.getElementById('invitation');
const rsvpDiv = document.getElementById('rsvp');

if (!guestId) {
  invitationDiv.innerHTML = '<p>Link không hợp lệ hoặc không có thông tin khách mời.</p>';
} else {
  db.collection('guests').doc(guestId).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        let str_rsvpStatus = '';
        let val_rsvpStatus = 0;
        switch (data.rsvp) {
          case 'accepted': str_rsvpStatus = 'sẽ tham dự 💖'; val_rsvpStatus = 1; break;
          case 'declined': str_rsvpStatus = 'không tham dự 😢'; val_rsvpStatus = 2; break;
          default: str_rsvpStatus = 'chưa phản hồi'; val_rsvpStatus = 3;
        }

        invitationDiv.innerHTML = `
          <h2> ${data.name} </h2>
          <p>Thân mời ${data.message}</p>
          <p>Tới dự bữa cơm thân mật chung vui cùng gia đình chúng tôi.</p>
          <p>Vào lúc: 10:00 Thứ bảy</p>
          <p>24.01.2026</p>
          <p>(Tức ngày 06 tháng 12 năm Ất Tỵ)</p>
          <p>Tại : Phủ Chủ tịch</p>
          <p>Số 01 Hoàn Kiếm Hà Nội</p>
          <p>Sự hiện diện của quý vị</p>
          <p>là niềm vinh hạnh cho gia đình chúng tôi.</p>
          <div class="footer-display_2">
            <div class="footer_2">
              <div class="left-box_2">
                <div class="label_2">Nhà Trai</div>
                <div class="label_2">Nguyễn Văn Tỵ</div>
                <div class="label_2">Đỗ Thị Hải</div>
              </div>
              <div class="right-box_2">
                <div class="label_2">Nhà Gái</div>
                <div class="label_2">Trương Tiến Thục</div>
                <div class="label_2">Phan Thị Hồng The</div>
              </div>
            </div>
          </div>
          
        `;
        if (val_rsvpStatus == 1)
        {
          invitationDiv.innerHTML += `
          <p>Bạn ${str_rsvpStatus}</p>
          <strong>Tùng và Thục Anh rất vui !! Cảm ơn bạn.</strong>`;
        } 
        else if (val_rsvpStatus == 2)
        {
          invitationDiv.innerHTML += `
          <p>Bạn ${str_rsvpStatus} </p>
          <strong>Tùng và Thục Anh rất tiếc !! Cảm ơn bạn.</strong>`;
        }
        else // val_rsvpStatus == 3
        {
          invitationDiv.innerHTML += `
          <p>Bạn ${str_rsvpStatus} </p>
          <p>Hãy phản hồi cho cô dâu chú rể ở đây nhé !!</p>
          <button class="corner-button" onclick="openDialog()">Lời chúc</button>`;
        }
        

        if (data.rsvp === 'pending') {
          rsvpDiv.style.display = 'block';
        }
      } else {
        invitationDiv.innerHTML = '<p>Không tìm thấy thông tin khách mời.</p>';
      }
    })
    .catch(error => {
      invitationDiv.innerHTML = `<p>Lỗi khi tải dữ liệu: ${error.message}</p>`;
    });
}

const wishesInput = document.getElementById('wishesText'); // Thêm dòng này

function sendRSVP(status) {
  const confirmText = status === 'accepted'
    ? 'Bạn xác nhận sẽ tham dự chứ?'
    : 'Bạn xác nhận sẽ không tham dự?';

  if (!confirm(confirmText)) return;

  const guestWishes = wishesInput ? wishesInput.value : '';

  db.collection('guests').doc(guestId).update({ rsvp: status, wishes: guestWishes })
    .then(() => {
      alert('Cảm ơn bạn đã phản hồi!');
      location.reload();
    })
    .catch(err => {
      alert('Lỗi khi gửi phản hồi: ' + err.message);
    });
}

// function sendRSVP(status) {
//   const confirmText = status === 'accepted'
//     ? 'Bạn xác nhận sẽ tham dự chứ?'
//     : 'Bạn xác nhận sẽ không tham dự?';

//   if (!confirm(confirmText)) return;

//   // Kiểm tra guestId có tồn tại trước khi gửi
//   if (!guestId) {
//     alert('Không tìm thấy ID khách mời để gửi phản hồi.');
//     return;
//   }

//   // Lấy lời chúc từ input
//   const guestWishes = wishesInput ? wishesInput.value : ''; // Lấy giá trị, nếu input tồn tại

//   // Tạo đối tượng dữ liệu để cập nhật
//   const updateData = { rsvp: status, wishes: guestWishes };

//   updateDoc(doc(db, 'guests', guestId), updateData) // Sửa thành updateData
//     .then(() => {
//       alert('Cảm ơn bạn đã phản hồi!');
//       location.reload(); // Tải lại trang để hiển thị trạng thái mới
//     })
//     .catch(err => {
//       alert('Lỗi khi gửi phản hồi: ' + err.message);
//       console.error("Lỗi khi cập nhật RSVP:", err);
//     });
// }

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerToggle = document.querySelector('.hamburger-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links-container');
    const navButtons = document.querySelectorAll('.nav-links-container .nav-button'); // Chọn tất cả các nút nav

    if (hamburgerToggle && navLinksContainer) {
        hamburgerToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            hamburgerToggle.classList.toggle('active'); // Thêm class 'active' cho icon hamburger
        });

        // Đóng menu khi click vào một nút điều hướng
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Kiểm tra nếu menu đang mở (có class 'active') trên mobile thì đóng lại
                if (window.innerWidth <= 768 && navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    hamburgerToggle.classList.remove('active');
                }
            });
        });
    }

    // --- Các đoạn mã JavaScript khác của bạn (gallery.js, music.js, v.v.) sẽ ở đây ---
    // Đảm bảo rằng bạn đã kết hợp tất cả logic JS vào một tệp hoặc tải chúng theo đúng thứ tự.
});
