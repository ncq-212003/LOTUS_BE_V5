const now = new Date()

export default [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2023, 3, 0),
    end: new Date(2015, 3, 1),
    colorEvento: '#7FFFD4',
    color: 'white'
  },
  {
    id: 1,
    title: 'Hội nghị nhân viên',
    start: new Date(2023, 3, 7),
    end: new Date(2023, 3, 10),
    colorEvento: '#8A2BE2',
    color: 'white'
  },

  {
    id: 2,
    title: 'Lịch đón khách ở sân bay',
    start: new Date(2023, 2, 13, 0, 0, 0),
    end: new Date(2023, 2, 20, 0, 0, 0),
    colorEvento: '#5F9EA0',
    color: 'white'
  },

  {
    id: 3,
    title: 'Lịch đi ăn với khách hàng ở Tokio',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
    colorEvento: '#6495ED',
    color: 'white'
  },

  {
    id: 4,
    title: 'Lịch họp với các ban lãnh đạo công ty',
    start: new Date(2023, 11, 17, 0, 10, 0),
    end: new Date(2023, 11, 17, 2, 1, 0),
    colorEvento: '#DC143C',
    color: 'white'
  },
  {
    id: 5,
    title: 'Thử nghiệm sản phẩm mới',
    start: new Date(2023, 10, 11),
    end: new Date(2023, 10, 13),
    desc: 'Thử nghiệm và đánh giá sản phẩm mới trước khi ra mắt công chúng hoặc khách hàng',
    colorEvento: '#008B8B',
    color: 'white'
  },
  {
    id: 6,
    title: 'Họp cục bộ với ban quản trị dự án về xuất khẩu và nhập cư',
    start: new Date(2023, 11, 17, 11, 30, 0, 0),
    end: new Date(2023, 11, 17, 14, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
    colorEvento: '#87CEFA',
    color: 'white'
  },
  {
    id: 7,
    title: 'Tiếp đón khách Nam Dương ở nhà cần Quán Lá Đa',
    start: new Date(2023, 10, 16, 8, 20, 10),
    end: new Date(2023, 10, 16, 9, 30, 10),
    desc: 'Power lunch',
    colorEvento: '#DDA0DD',
    color: 'white'
  },
  {
    id: 8,
    title: 'Trao đổi với học viên về vấn đề xuất khẩu',
    start: new Date(2023, 9, 12, 14, 0, 0, 0),
    end: new Date(2023, 9, 12, 15, 0, 0, 0),
    colorEvento: '#8B008B',
    color: 'white'
  },
  {
    id: 9,
    title: 'Buổi họp báo',
    start: new Date(2023, 11, 22, 17, 0, 0, 0), // số cuối là mili giay 
    end: new Date(2023, 11, 22, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
    colorEvento: '#8B008B',
    color: 'white'
  },
  {
    id: 10,
    title: 'Ăn tối cùng phó Giám Đốc công ty Hải Bình',
    start: new Date(2023, 11, 18, 20, 0, 0, 0), // năm, tháng (0-11), ngày, giờ, phút và giây
    end: new Date(2023, 11, 18, 21, 0, 0, 0),
    colorEvento: 'red',
    color: 'white'
  },
  {
    id: 11,
    title: 'Buổi tiệc chia tay với nghiệp đoàn A',
    start: new Date(2024, 10, 28, 20, 0, 0),
    end: new Date(2023, 10, 28, 21, 30, 0),
    colorEvento: 'red',
    color: 'white'
  },
  {
    id: 12,
    title: 'Lịch đi uống cafe với ông C',
    start: new Date(2023, 11, 17, 9, 30, 0),
    end: new Date(2023, 11, 17, 12, 0, 0),
    colorEvento: '#ADD8E6',
    color: 'white'
  },
  {
    id: 13,
    title: "Gặp mặt team ITOMO",
    start: new Date(2023, 11, 18, 11, 30, 0),
    end: new Date(2023, 11, 18, 14, 0, 0),
    color: 'white'
  },
  {
    id: 14,
    title: 'Đi vào siêu thị mua hoa',
    start: new Date(2023, 11, 18, 15, 30, 0),
    end: new Date(2023, 11, 18, 18, 0, 0),
    colorEvento: 'red',
    color: 'white'
  },
  {
    id: 15,
    title: 'Đi xem nhạc hội',
    start: new Date(2023, 9, 18, 19, 30, 0),
    end: new Date(2023, 9, 18, 21, 21, 0),
    colorEvento: 'red',
    color: 'white'
  },
  {
    id: 16,
    title: 'Đi đón Noen cùng Bà Hà Tổng Giám Đốc',
    start: new Date(2023, 11, 23, 21, 30, 0),
    end: new Date(2023, 11, 24, 21, 30, 0),
    colorEvento: '#778899',
    color: 'white'
  },
  {
    id: 17,
    title: 'Đi ăn tối cùng ông A',
    start: new Date(2023, 11, 17, 18, 30, 0),
    end: new Date(2023, 11, 17, 20, 21, 0),
    colorEvento: '#C71585',
    color: 'white'
  },
  {
    id: 18,
    title: 'Mua xe ô tô cùng Trưởng phòng B',
    start: new Date(2023, 11, 17, 5, 50, 0),
    end: new Date(2023, 11, 17, 7, 30, 0),
    colorEvento: '#3CB371',
    color: 'white'
  },
  {
    id: 18,
    title: 'Mời khách hàng đi mua đồ',
    start: new Date(2023, 11, 17, 10, 50, 0),
    end: new Date(2023, 11, 17, 13, 30, 0),
    colorEvento: '#DA70D6',
    color: 'white'
  },
  {
    id: 20,
    title: 'Lịch họp của team ITOMO bàn về mục tiêu sắp tới',
    start: new Date(2023, 11, 17, 12, 30, 0),
    end: new Date(2023, 11, 17, 17, 40, 0),
    colorEvento: '#A0522D',
    color: 'white'
  },
  {
    id: 21,
    title: 'Đi ăn sáng cùng Nam',
    start: new Date(2023, 11, 18, 2, 30, 0),
    end: new Date(2023, 11, 18, 3, 40, 0),
    colorEvento: '#4682B4',
    color: 'white'
  },
  {
    id: 22,
    title: 'Hello Quyết',
    start: new Date(2023, 11, 17, 0, 30, 0),
    end: new Date(2023, 11, 17, 2, 30, 0),
    colorEvento: '#4682B4',
    color: 'white'
  },
  {
    id: 23,
    title: 'Online Coding Test',
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 20, 30, 0),
  },
  {
    id: 24,
    title: 'An overlapped Event',
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0),
  },
  {
    id: 25,
    title: 'Phone Interview',
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0),
  },
  {
    id: 26,
    title: 'Cooking Class',
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 27,
    title: 'Go to the gym',
    start: new Date(2015, 3, 14, 18, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
  {
    id: 28,
    title: 'DST ends on this day (Europe)',
    start: new Date(2022, 9, 30, 0, 0, 0),
    end: new Date(2022, 9, 30, 4, 30, 0),
  },
  {
    id: 29,
    title: 'DST ends on this day (America)',
    start: new Date(2022, 10, 6, 0, 0, 0),
    end: new Date(2022, 10, 6, 4, 30, 0),
  },
  {
    id: 30,
    title: 'DST starts on this day (America)',
    start: new Date(2023, 2, 12, 0, 0, 0),
    end: new Date(2023, 2, 12, 4, 30, 0),
  },
  {
    id: 31,
    title: 'DST starts on this day (Europe)',
    start: now,
    end: now,
  },
]
