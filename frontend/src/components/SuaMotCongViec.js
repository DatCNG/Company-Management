import React, { useState } from 'react';
import "../styles/style.css";
import { IoAddCircle } from "react-icons/io5";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MdDeleteOutline } from "react-icons/md";

const SuaMotCongViec = () => {
    const [moTa, setMoTa] = useState("<p>Mô tả công ty...</p>");
    return (
        <div className="quanly-container qlct-container">
            <div className='them-body themct-body'>
                {/* Danh sách khối .them-body-next */}
                <div className='them-body-scoll' style={{ maxHeight: '670px', overflowY: 'auto' }}>
                    <div className='them-body-next' style={{ marginBottom: '0.75rem' }}>
                        <form
                            className='form themct-form'
                            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '10px' }}
                        >
                            <div className='form-gr'>
                                <div className='form-gr-content'>
                                    <label className='label'>Mã công việc:</label>
                                    <input
                                        type="text"
                                        className='input'
                                    />
                                </div>
                                <div className='form-gr-content'>
                                    <label className='label'>Tên công việc:</label>
                                    <input
                                        type="text"
                                        className='input'
                                    />
                                </div>

                                <div className='form-gr-content' style={{ flexDirection: 'column' }}>
                                    <label className='label'>Phân công nhân viên:</label>
                                    <div className='button-group' style={{ margin: 0, justifyContent: 'left' }}>
                                        <button
                                            className='button-add button-add-pc'
                                            type="button"
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
                                    />
                                </div>
                                <div className='form-gr-content'>
                                    <label className='label'>Ngày kết thúc:</label>
                                    <input
                                        type="date"
                                        className='input'
                                    />
                                </div>
                            </div>

                            <div className='form-gr'>
                                <div className='form-gr-content' style={{ flexDirection: "column" }}>
                                    <label className='label'>Mô tả:</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={moTa}
                                        onChange={(_, editor) => setMoTa(editor.getData())}
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
                        </form>
                    </div>
                </div>
                {/* Nút thao tác tổng */}
                <div className='them-body-footer'>
                    <div className='button-group' style={{ marginRight: 0 }}>
                        <button className='button-cancel' type="button">Hủy</button>
                        <button
                            className='button-add'
                            type="button"
                        >
                            Sửa công việc
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuaMotCongViec;
