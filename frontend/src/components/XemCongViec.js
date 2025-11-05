import React, { useMemo, useState, useEffect, useRef } from 'react'
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "../styles/style.css";

// ====== Utils: tạo ma trận ngày trong tháng ======
function buildMonthMatrix(year, month) {
  // month: 0-11
  const firstDay = new Date(year, month, 1);
  const startWeekday = (firstDay.getDay() + 6) % 7; // chuyển về Mon=0..Sun=6
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  // Ô trống trước ngày 1
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  // Ngày trong tháng
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  // Bổ sung ô trống để đủ bội số 7
  while (cells.length % 7 !== 0) cells.push(null);

  // Cắt thành các tuần
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function monthsBetween(start, end) {
  const list = [];
  let y = start.getFullYear();
  let m = start.getMonth();
  while (y < end.getFullYear() || (y === end.getFullYear() && m <= end.getMonth())) {
    list.push({ year: y, month: m });
    m++;
    if (m > 11) { m = 0; y++; }
  }
  return list;
}

function isSameDate(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

function isInRange(d, start, end) {
  const t = d.getTime();
  return t >= new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()
      && t <= new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
}

// ====== Popover lịch ======
const CalendarPopover = ({ startDate, endDate, onClose }) => {
  const cardRef = useRef(null);

  // đóng khi click ra ngoài
  useEffect(() => {
    const handler = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) onClose();
    };
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', esc);
    };
  }, [onClose]);

  const monthList = useMemo(() => monthsBetween(startDate, endDate), [startDate, endDate]);

  const dayNames = ['T2','T3','T4','T5','T6','T7','CN'];

  return (
    <div className="cv-overlay">
      <div className="cv-card" ref={cardRef}>
        <div className="cv-header">
          <span>
            Khoảng thời gian:&nbsp;
            <strong>
              {startDate.toLocaleDateString('vi-VN')} → {endDate.toLocaleDateString('vi-VN')}
            </strong>
          </span>
          <button className="cv-close" onClick={onClose} aria-label="Đóng">×</button>
        </div>

        <div className="cv-months">
          {monthList.map(({ year, month }) => {
            const weeks = buildMonthMatrix(year, month);
            const monthLabel = new Date(year, month, 1).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
            return (
              <div className="cv-month" key={`${year}-${month}`}>
                <div className="cv-month-title">{monthLabel}</div>
                <div className="cv-grid">
                  {dayNames.map(d => (
                    <div className="cv-dow" key={d}>{d}</div>
                  ))}
                  {weeks.map((week, wi) => (
                    <React.Fragment key={wi}>
                      {week.map((cell, ci) => {
                        if (!cell) return <div className="cv-cell empty" key={ci}></div>;
                        const inRange = isInRange(cell, startDate, endDate);
                        const isStart = isSameDate(cell, startDate);
                        const isEnd = isSameDate(cell, endDate);

                        const cls = [
                          'cv-cell',
                          inRange ? 'in-range' : '',
                          isStart ? 'is-start' : '',
                          isEnd ? 'is-end' : ''
                        ].join(' ').trim();

                        return (
                          <div className={cls} key={ci}>
                            <div className="cv-day">{cell.getDate()}</div>
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const XemCongViec = () => {
  // Bạn có thể lấy ngày từ props hoặc state thực tế của bạn; ở đây set cứng để demo
  // Ví dụ theo yêu cầu: 01-11-2025 → 05-11-2025
  const startDate = useMemo(() => new Date(2025, 10, 1), []); // tháng 11 = 10 (0-based)
  const endDate   = useMemo(() => new Date(2025, 10, 5), []);

  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="quanly-container qlct-container">
      <div className='chitiet chitiet-pb'>
        <div className='form-gr  under-line'>
          <div className="form-gr-content">
            <strong>Mã công việc:<p>CV01</p></strong>
          </div>
          <div className="form-gr-content">
            <strong>Tên công việc:<p>Công việc 01</p></strong>
          </div>
          <div className="form-gr-content">
            <strong>Phòng ban:<p>Phòng ban 01</p></strong>
          </div>
        </div>

        <div
          className='form-gr under-line clickable-range'
          onClick={() => setShowCalendar(true)}
          title="Nhấn để xem lịch phạm vi ngày"
          role="button"
          tabIndex={0}
          onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' ') setShowCalendar(true); }}
        >
          <div className="form-gr-content">
            <strong>Ngày bắt đầu:<p>01-11-2025</p></strong>
          </div>
          <div className="form-gr-content">
            <strong>Ngày kết thúc:<p>05-11-2025</p></strong>
          </div>
        </div>

        <div className='form-gr under-line'>
          <div className="form-gr-content">
            <strong>Trưởng dự án:<p>Nguyễn Văn A</p></strong>
          </div>
          <div className="form-gr-content">
            <strong>Nhân viên phụ trách:<p>Nguyễn Văn B</p></strong>
          </div>
        </div>

        <div className='form-gr under-line'>
          <div className="form-gr-content">
            <strong style={{ display: "block" }}>
              Mô tả công việc:
              <p>
                Phòng Ban là đơn vị chuyên trách trong công ty, chịu trách nhiệm lập kế hoạch, tổ chức và triển khai các nhiệm vụ thuộc lĩnh vực được giao.
                Dưới sự điều hành của Trưởng phòng, bộ phận phối hợp chặt chẽ với các phòng ban khác để đạt mục tiêu chung, đảm bảo tiến độ và chất lượng công việc.
                Phòng thường xây dựng quy trình, theo dõi KPI, báo cáo định kỳ và đề xuất cải tiến nhằm nâng cao hiệu quả hoạt động.
                Môi trường làm việc đề cao tính kỷ luật, hợp tác và tinh thần chủ động của mỗi thành viên.
              </p>
            </strong>
          </div>
        </div>
      </div>

      {showCalendar && (
        <CalendarPopover
          startDate={startDate}
          endDate={endDate}
          onClose={() => setShowCalendar(false)}
        />
      )}
    </div>
  )
}

export default XemCongViec
