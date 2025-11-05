import React, { useState } from 'react';
import "../styles/style.css";
import { IoAddCircle } from "react-icons/io5";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MdDeleteOutline } from "react-icons/md";

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
                    <label className='label'>Phân công nhân viên:</label>
                    <div className='button-group' style={{ margin: 0, justifyContent: 'left' }}>
                      <button
                        className='button-add button-add-pc'
                        type="button"
                        onClick={() => alert('Mở modal phân công (tự cài)')}
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
    </div>
  );
};

export default ThemCongViec;
