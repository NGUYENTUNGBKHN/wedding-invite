function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const guestId = getQueryParam('guest');
const invitationDiv = document.getElementById('invitation');
const rsvpDiv = document.getElementById('rsvp');


function updateInvitationRSVPStatus(data) {
  let str_rsvpStatus = '';
  let val_rsvpStatus = 0;
  switch (data.rsvp) {
    case 'accepted': str_rsvpStatus = 'sẽ tham dự 💖'; val_rsvpStatus = 1; break;
    case 'declined': str_rsvpStatus = 'không tham dự 😢'; val_rsvpStatus = 2; break;
    default: str_rsvpStatus = 'chưa phản hồi'; val_rsvpStatus = 3;
  }

  let rsvpStatusHtml = '';
  if (val_rsvpStatus === 1) {
    rsvpStatusHtml = `
      <p>Bạn ${str_rsvpStatus}</p>
      <strong>Tùng và Thục Anh rất vui !! Cảm ơn bạn.</strong>`;
  } else if (val_rsvpStatus === 2) {
    rsvpStatusHtml = `
      <p>Bạn ${str_rsvpStatus} </p>
      <strong>Tùng và Thục Anh rất tiếc !! Cảm ơn bạn.</strong>`;
  } else { // val_rsvpStatus === 3
    rsvpStatusHtml = `
      <p>Bạn ${str_rsvpStatus} </p>
      <p>Hãy phản hồi cho cô dâu chú rể ở đây nhé !!</p>
      <button class="corner-button" onclick="openDialog()">Lời chúc</button>`;
  }

  // Tìm và cập nhật phần trạng thái RSVP trong invitationDiv
  // Nếu chưa có, sẽ thêm vào.
  const existingStatus = invitationDiv.querySelector('.rsvp-status-display');
  if (existingStatus) {
    existingStatus.innerHTML = rsvpStatusHtml;
  } else {
    // Nếu phần tử chưa tồn tại, thêm nó vào cuối invitationDiv
    const statusWrapper = document.createElement('div');
    statusWrapper.classList.add('rsvp-status-display');
    statusWrapper.innerHTML = rsvpStatusHtml;
    invitationDiv.appendChild(statusWrapper);
  }
}


if (!guestId) {
  invitationDiv.innerHTML = '<p>Link không hợp lệ hoặc không có thông tin khách mời.</p>';
} else {
  db.collection('guests').doc(guestId).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
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
        updateInvitationRSVPStatus(data); // Cập nhật trạng thái phản hồi ban đầu
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
  // rsvpDiv.style.display = 'none';
  // wishesDialog.querySelector('.dialog-content').innerHTML = `
  // <button class="close-button" id="closeWishesDialogOnThanks">×</button>
  //   <div class="dialog-thanks-section" style="display:block;">
  //     <div class="dialog-thanks-content">
  //       <h2>Xin chân thành cảm ơn!</h2>
  //       <p>Rất hân hạnh được đón tiếp</p>
  //       <p class="dialog-couple-signature">Thanh Tùng & Thục Anh</p>
  //     </div>
  //   </div>
  // `;
  // const closeButtonOnThanks = document.getElementById('closeWishesDialogOnThanks');
  // if (closeButtonOnThanks) {
  //   closeButtonOnThanks.addEventListener('click', () => {
  //     wishesDialog.style.display = 'none';
  //     // Tùy chọn: tải lại trang sau khi đóng dialog cảm ơn,
  //     // hoặc bạn có thể cập nhật trạng thái trên trang mà không cần tải lại.
  //     //location.reload();
  //     db.collection('guests').doc(guestId).get()
  //       .then(doc => {
  //         if (doc.exists) {
  //           updateInvitationRSVPStatus(doc.data()); // Cập nhật trạng thái trên thiệp mời
  //         }
  //       })
  //       .catch(error => {
  //         console.error("Lỗi khi tải lại dữ liệu khách mời để cập nhật UI:", error);
  //       });
  //   });
  // }
  db.collection('guests').doc(guestId).update({ rsvp: status, wishes: guestWishes })
    .then(() => {
      alert('Cảm ơn bạn đã phản hồi!');
      // rsvpDiv.style.display = 'none'; // Ẩn phần RSVP
      // location.reload();
      rsvpDiv.style.display = 'none';
      wishesDialog.querySelector('.dialog-content').innerHTML = `
      <button class="close-button" id="closeWishesDialogOnThanks">×</button>
        <div class="dialog-thanks-section" style="display:block;">
          <div class="dialog-thanks-content">
            <h2>Xin chân thành cảm ơn!</h2>
            <p>Rất hân hạnh được đón tiếp</p>
            <p class="dialog-couple-signature">Thanh Tùng & Thục Anh</p>
          </div>
        </div>
      `;
      const closeButtonOnThanks = document.getElementById('closeWishesDialogOnThanks');
      if (closeButtonOnThanks) {
        closeButtonOnThanks.addEventListener('click', () => {
          wishesDialog.style.display = 'none';
          // Tùy chọn: tải lại trang sau khi đóng dialog cảm ơn,
          // hoặc bạn có thể cập nhật trạng thái trên trang mà không cần tải lại.
          //location.reload();
          db.collection('guests').doc(guestId).get()
            .then(doc => {
              if (doc.exists) {
                updateInvitationRSVPStatus(doc.data()); // Cập nhật trạng thái trên thiệp mời
              }
            })
            .catch(error => {
              console.error("Lỗi khi tải lại dữ liệu khách mời để cập nhật UI:", error);
            });
          
        });
      }
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
