function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const guestId = getQueryParam('guest');
const invitationDiv = document.getElementById('invitation');
const rsvpDiv = document.getElementById('rsvp');
const nameElem = document.querySelector('.names');

if (!guestId) {
  invitationDiv.innerHTML = '<p>Link không hợp lệ hoặc không có thông tin khách mời.</p>';
  rsvpDiv.style.display = 'none';
} else {
  db.collection('guests').doc(guestId).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();

        // Hiển thị tên khách mời lên phần .names
        if (data.name && nameElem) {
          nameElem.textContent = data.name;
        }

        let rsvpStatus = '';
        switch (data.rsvp) {
          case 'accepted': rsvpStatus = 'Sẽ tham dự 💖'; break;
          case 'declined': rsvpStatus = 'Không tham dự 😢'; break;
          default: rsvpStatus = 'Chưa phản hồi';
        }

        invitationDiv.innerHTML = `
          <p>${data.message || 'Chúng tôi rất mong bạn đến chung vui cùng chúng tôi.'}</p>
          <p><strong>Trạng thái phản hồi:</strong> ${rsvpStatus}</p>
        `;

        if (data.rsvp === 'pending' || !data.rsvp) {
          rsvpDiv.style.display = 'block';
        } else {
          rsvpDiv.style.display = 'none';
        }
      } else {
        invitationDiv.innerHTML = '<p>Không tìm thấy thông tin khách mời.</p>';
        rsvpDiv.style.display = 'none';
      }
    })
    .catch(error => {
      invitationDiv.innerHTML = `<p>Lỗi khi tải dữ liệu: ${error.message}</p>`;
      rsvpDiv.style.display = 'none';
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
