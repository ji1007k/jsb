import * as UIUtil from "../utils/UIUtil.js";


export default class NoticeAdd {
    constructor(parent) {
        this.parent = parent;

        this.MODAL = null;
        this.modalArea = document.getElementById('modalNotice');
        this.Quill = null;

        this.init();

        console.log("NoticeDetail instance created");
    }

    async init() {
        await this.initPage();
        this.initEvent();
    }

    async initPage() {
        const html = await this.loadHtml();

        // init modal
        const modalBody = this.modalArea.querySelector(".modal-body");
        modalBody.innerHTML = '';
        UIUtil.append(html, modalBody);

        const option = {
            backdrop: true,         // 배경 클릭 시 닫힘
            keyboard: true,         // ESC로 닫힘
            fullscreen: 'sm-down'  // 작은 화면과 태블릿 크기까지 전체 화면 모달
        };

        this.MODAL = new bootstrap.Modal(this.modalArea, option);
        this.MODAL.show();

        // init quill editor
        const cardBody = this.modalArea.querySelector('.card-body');
        if (!this.Quill) {
            this.Quill = new Quill(cardBody, {
                bounds: '#modalNotice',  // 에디터의 범위를 특정 요소로 제한
                placeholder: '내용을 입력하세요',  // 플레이스홀더 설정
                // TODO 관리자인 경우 false, 일반 사용자인 경우 true
                readOnly: false,  // 읽기 전용 모드 on/off
                theme: 'snow',  // 'snow'는 기본 테마
                // TODO 관리자일 때만 아래 옵션 초기화
                modules: {
                    toolbar: [
                        // 텍스트 스타일링
                        ['bold', 'italic', 'underline', 'strike'],  // 굵게, 이탤릭, 밑줄, 취소선
                        // 텍스트 정렬
                        [{ 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],  // 가운데, 오른쪽, 양쪽 정렬
                        // 리스트
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],  // 순서 있는 리스트, 불릿 리스트
                        // 링크, 이미지, 비디오
                        ['link', 'image', 'video'],  // 링크, 이미지, 비디오 삽입
                        // 글꼴 크기와 색상
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ 'size': ['small', 'medium', 'large', 'huge'] }],  // 글꼴 크기 설정
                        [{ 'color': [] }, { 'background': [] }],  // 텍스트 색상 설정, 배경색 (형광펜 효과)
                        // 코드 블록
                        ['code-block']  // 코드 블록 삽입
                    ],
                    history: {  // Undo/Redo 기능을 활성화
                        delay: 1000,  // Undo/Redo를 위해 저장되는 시간 간격 (밀리초 단위)
                        userOnly: true  // 사용자 입력만 기록하도록 설정 (시스템 동작 제외)
                    },
                    clipboard: {  // 클립보드 관련 설정 (복사, 붙여넣기 동작 등)
                        matchVisual: false  // 붙여넣기 시 시각적 스타일을 무시하고 내용만 반영
                    }
                }
            });
        }

        // FIXME 저장 버튼 보이게
        this.modalArea.querySelector(".edit-btns").classList.toggle('d-none');
    }

    async loadHtml() {
        try {
            const response = await fetch('/static/html/notices/noticeDetail.html');
            if (!response.ok) {
                throw new Error('Failed to load HTML file');
            }

            return await response.text();
        } catch (errer) {
            console.error('Error loading HTML:', error);
            this.MODAL.hide();
        }
    }

    initEvent() {
        const saveBtn = this.modalArea.querySelector('.save-btn');
        saveBtn?.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            await this.saveData();
        });

    }

    async saveData() {
        const form = document.getElementById('notice-form');
        const param = UIUtil.getFormData(form);
        // param.content = this.Quill.getContents();
        param.content = this.Quill.root.innerHTML;

        const formData = new FormData();
        formData.append('notice', JSON.stringify(param));

        const response = await fetch(`/notices`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            console.error('Failed to save data');
            return;
        }

        this.data = await response.json();
        this.parent.initData();
    }
}