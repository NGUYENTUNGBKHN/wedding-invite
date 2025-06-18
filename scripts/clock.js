// clock.js
$(document).ready(function() {
    // Đặt ngày và giờ mục tiêu của bạn
    // Định dạng: "YYYY-MM-DD HH:mm"
    var targetDateString = "2025-06-18 17:20";

    // Đặt múi giờ cho ngày mục tiêu
    // Rất quan trọng để đảm bảo đếm ngược chính xác, đặc biệt với các múi giờ khác nhau.
    // Ví dụ: "Asia/Ho_Chi_Minh" cho múi giờ Việt Nam
    //        "Asia/Tokyo" cho múi giờ Nhật Bản (hiện tại)
    //        "America/New_York" cho múi giờ EST
    var targetTimeZone = "Asia/Tokyo"; // Thay đổi thành múi giờ bạn mong muốn

    // Chuyển đổi ngày mục tiêu sang đối tượng Moment.js với múi giờ cụ thể
    var targetDate = moment.tz(targetDateString, targetTimeZone);

    // Lấy thời điểm hiện tại
    var currentDate = moment();

    // Tính toán chênh lệch thời gian giữa ngày mục tiêu và thời điểm hiện tại (bằng giây)
    var diffInSeconds = targetDate.diff(currentDate, 'seconds');

    var clock; // Khai báo biến clock ở phạm vi ngoài để có thể truy cập sau này

    // Kiểm tra nếu ngày mục tiêu đã trôi qua
    if (diffInSeconds < 0) {
        diffInSeconds = 0; // Đặt về 0 nếu thời gian đã hết
        $('#message').text("Sự kiện đã bắt đầu!"); // Hiển thị thông báo
    }

    // Khởi tạo FlipClock
    clock = $('.clock').FlipClock(diffInSeconds, {
        clockFace: 'DailyCounter', // Hiển thị ngày, giờ, phút, giây
        countdown: true,           // Đếm ngược
        showSeconds: true,         // Hiển thị giây

        // Hàm callback khi bộ đếm kết thúc
        callbacks: {
            stop: function() {
                $('#message').text("Sự kiện đã bắt đầu!");
                // Bạn có thể thêm mã JavaScript khác ở đây khi bộ đếm kết thúc,
                // ví dụ: ẩn bộ đếm, hiển thị nội dung mới, v.v.
            }
        }
    });

    // Cập nhật thông báo nếu bộ đếm đã hết ngay khi tải trang
    if (diffInSeconds === 0) {
        $('#message').text("Sự kiện đã bắt đầu!");
    }
});