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
        let rsvpStatus = '';
        switch (data.rsvp) {
          case 'accepted': rsvpStatus = 'Sẽ tham dự 💖'; break;
          case 'declined': rsvpStatus = 'Không tham dự 😢'; break;
          default: rsvpStatus = 'Chưa phản hồi';
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
          <p><strong>Trạng thái phản hồi:</strong> ${rsvpStatus}</p>
        `;

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

function sendRSVP(status) {
  const confirmText = status === 'accepted'
    ? 'Bạn xác nhận sẽ tham dự chứ?'
    : 'Bạn xác nhận sẽ không tham dự?';

  if (!confirm(confirmText)) return;

  db.collection('guests').doc(guestId).update({ rsvp: status })
    .then(() => {
      alert('Cảm ơn bạn đã phản hồi!');
      location.reload();
    })
    .catch(err => {
      alert('Lỗi khi gửi phản hồi: ' + err.message);
    });
}
