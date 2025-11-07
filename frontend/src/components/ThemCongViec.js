import React, { useEffect, useMemo, useRef, useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { IoAddCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";

import "../styles/style.css";

const PhanCongNV = ({ onClose = () => { }, onPick = () => { } }) => {
  // Dữ liệu mẫu – sau này thay bằng API/list thật của bạn
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const [list] = useState([
    { id: 'NV01', ten: 'Nguyễn Văn A', sdt: '0901234567' },
    { id: 'NV02', ten: 'Trần Thị B', sdt: '0902222333' },
    { id: 'NV03', ten: 'Lê Văn C', sdt: '0903333444' },
    { id: 'NV04', ten: 'Phạm Thị D', sdt: '0904444555' },
    { id: 'NV05', ten: 'Đỗ Quốc E', sdt: '0905555666' },
    { id: 'NV06', ten: 'Đỗ Quốc E', sdt: '0905555666' },
    { id: 'NV07', ten: 'Đỗ Quốc E', sdt: '0905555666' },
    { id: 'NV08', ten: 'Đỗ Quốc E', sdt: '0905555666' },
  ]);

  const filtered = useMemo(() => {
    if (!q.trim()) return list;
    const k = q.toLowerCase();
    return list.filter(
      (nv) =>
        nv.id.toLowerCase().includes(k) ||
        nv.ten.toLowerCase().includes(k) ||
        nv.sdt.includes(k)
    );
  }, [q, list]);

  return (
    <div className="chon-tp">
      <div className='form-gr'>
        <div className='form-gr-content'>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="chon-tp-search"
            placeholder="Tìm theo mã, tên, SĐT…"
          />
        </div>
      </div>
      <div className="chon-tp-list">
        {filtered.length === 0 ? (
          <div className="chon-tp-empty">Không có nhân viên phù hợp.</div>
        ) : (
          filtered.map((nv) => (
            <label key={nv.id} className="chon-tp-item">
              <input
                type="radio"
                name="nvpb"
                value={nv.id}
                checked={selected?.id === nv.id}
                onChange={() => setSelected(nv)}
              />
              <div className="chon-tp-meta">
                <div className="chon-tp-line">
                  <span className="chon-tp-name">{nv.ten}</span>
                  <span className="chon-tp-id">{nv.id}</span>
                </div>
                <div className="chon-tp-sub">
                  <span>{nv.sdt}</span>
                </div>
              </div>
            </label>
          ))
        )}
      </div>

      <div className="chon-tp-actions">
        <button className="button-cancel" onClick={onClose}>Hủy</button>
        <button
          className="btn-primary"
          disabled={!selected}
          onClick={() => {
            onPick(selected);   // trả kết quả về cha
            onClose();
          }}
        >
          Phân công
        </button>
      </div>
    </div>
  );
};

const ThemCongViec = () => {
  // Mỗi phần (khối) là 1 object độc lập
  const [sections, setSections] = useState([
    {
      id: Date.now(),
      ten: "",
      nhanVien: [],
      start: "",
      end: "",
      moTa: "<p>Mô tả công việc...</p>",
    },
  ]);

  const addSection = () => {
    setSections(prev => ([
      ...prev,
      {
        id: Date.now() + Math.random(),
        ten: "",
        nhanVien: [],
        start: "",
        end: "",
        moTa: "<p>Mô tả công việc...</p>",
      }
    ]));
  };

  const removeSection = (id) => {
    setSections(prev => {
      if (prev.length <= 1) {
        // Có thể hiện cảnh báo nhẹ nếu muốn:
        // alert("Phải còn ít nhất 1 công việc.");
        return prev; // không thay đổi
      }
      return prev.filter(s => s.id !== id);
    });
  };

  const updateSection = (id, field, value) => {
    setSections(prev =>
      prev.map(s => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const resetAll = () => {
    setSections([
      {
        id: Date.now(),
        ten: "",
        nhanVien: [],
        start: "",
        end: "",
        moTa: "<p>Mô tả công việc...</p>",
      },
    ]);
  };

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'add' | 'edit' | 'view' | 'delete'

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
  };
  // Tiêu đề động kiểu bạn muốn
  const modalTitle =
    modalType === "phancong" ? (
      <div className="quanly-title qlct-title">
        <h2>
          <MdManageAccounts style={{ marginRight: "0.3rem" }} /> Phân công nhân viên
        </h2>
      </div>
    ) : (
      ""
    );

  // Hàm render nội dung trong overlay
  const renderModalContent = () => {
    switch (modalType) {
      case "phancong":
        return <PhanCongNV onClose={closeModal} />;
      default:
        return null;
    }
  };
  return (
    <div className="quanly-container qlct-container">
      <div className='them-body themct-body' style={{ margin: "0.5rem" }}>
        <div className='form-gr' style={{ alignItems: "center" }}>
          <div className='form-gr-content' style={{ margin: 0 }}>
            <h3 style={{ margin: '0 0 0.5rem' }}>
              Tổng số lượng công việc: {sections.length}
            </h3>
          </div>
          <div className="form-gr-content" style={{ margin: 0 }}>
            <strong>Dự án:<p>-</p></strong>
          </div>
        </div>

        {/* Danh sách khối .them-body-next */}
        <div className='them-body-scoll' style={{ maxHeight: '670px', overflowY: 'auto' }}>
          {sections.map((sec, idx) => (
            <div key={sec.id} className='them-body-next' style={{ marginBottom: '0.75rem' }}>
              <form
                className='form themct-form'
                style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '10px' }}
                onSubmit={(e) => e.preventDefault()}
              >
                <div className='form-gr'>
                  <div className='form-gr-content'>
                    <label className='label'>Tên công việc {idx + 1}:</label>
                    <input
                      type="text"
                      className='input'
                      placeholder='Nhập tên công việc...'
                      value={sec.ten}
                      onChange={(e) => updateSection(sec.id, "ten", e.target.value)}
                    />
                  </div>

                  <div className='form-gr-content' style={{ flexDirection: 'column' }}>
                    <label className='label'>Nhân viên phụ trách:</label>
                    <div className='button-group' style={{ margin: 0, justifyContent: 'left' }}>
                      <button
                        className='button-add button-add-pc'
                        type="button"
                        onClick={() => openModal('phancong')}
                      >
                        Chọn nhân viên
                      </button>
                    </div>
                  </div>
                </div>

                <div className='form-gr'>
                  <div className='form-gr-content'>
                    <label className='label'>Ngày bắt đầu:</label>
                    <input
                      type="date"
                      className='input'
                      value={sec.start}
                      onChange={(e) => updateSection(sec.id, "start", e.target.value)}
                    />
                  </div>
                  <div className='form-gr-content'>
                    <label className='label'>Ngày kết thúc:</label>
                    <input
                      type="date"
                      className='input'
                      value={sec.end}
                      onChange={(e) => updateSection(sec.id, "end", e.target.value)}
                    />
                  </div>
                </div>

                <div className='form-gr'>
                  <div className='form-gr-content' style={{ flexDirection: "column" }}>
                    <label className='label'>Mô tả:</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={sec.moTa}
                      onChange={(_, editor) => updateSection(sec.id, "moTa", editor.getData())}
                      config={{
                        toolbar: [
                          "heading", "|",
                          "bold", "italic", "underline", "link", "|",
                          "bulletedList", "numberedList", "blockQuote", "|",
                          "insertTable", "undo", "redo"
                        ]
                      }}
                    />
                  </div>
                </div>

                <div className='button-group' style={{ margin: 0 }}>
                  <button
                    className='button-xoa quanly-button-xoa'
                    type="button"
                    onClick={() => removeSection(sec.id)}
                    disabled={sections.length <= 1}   // << thêm dòng này
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
        {/* Nút thao tác tổng */}
        <div className='them-body-footer'>
          <div className='button-group' style={{ marginRight: 0 }}>
            <button className='button-add' type="button" onClick={addSection}>
              Tiếp tục
            </button>
          </div>

          <div className='button-group' style={{ marginRight: 0 }}>
            <button className='button-cancel' type="button" onClick={resetAll}>Hủy</button>
            <button
              className='button-them'
              type="button"
              onClick={() => console.log("Dữ liệu gửi lên:", sections)}
            >
              <IoAddCircle />
              <div>Thêm</div>
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="ql-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target.classList.contains("ql-overlay")) closeModal();
          }}
        >
          <div className="overlay-content">
            <div className="overlay-header">
              <h3 className="quanly-title qlct-title">
                <span style={{ display: "flex", alignItems: "center" }}>
                  {modalTitle}
                </span>
              </h3>
              <button
                className="overlay-close"
                aria-label="Đóng"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className="overlay-body">{renderModalContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemCongViec;
