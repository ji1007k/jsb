import {append, getFormData, setFormData} from '../utils/UIUtil.js';
import {makeItemDtlHtml, makeItemFormHtml} from './ItemHtml.js';

/**
 * 아이템 상세/수정
 */
export default class ItemDetail {
    constructor(data, parent, isEditMode = false) {
        this.data = data;
        this.parent = parent;
        this.isEditMode = isEditMode;

        this.MODAL = null;
        this.modalArea = document.getElementById('modalSheet');

        this.init();
    }

    async init() {
        await this.#initPage();
        this.initEvent();
        this.initData();

        console.log('ItemDetail init');
    }

    async #initPage() {
        const html = await this.loadHtml();
        // this.initEvent();

        this.MODAL = new bootstrap.Modal(this.modalArea, {
            backdrop: true,         // 배경 클릭 시 닫힘
            keyboard: true,         // ESC로 닫힘
            fullscreen: 'md-down'   // 특정 크기 이하에서 전체 화면 모달
        });

        const modalBody = this.modalArea.querySelector(".modal-body");
        modalBody.innerHTML = '';

        append(html, modalBody);
    }

    async loadHtml() {
        try {
            const response = await fetch('/static/html/items/item.html');
            if (!response.ok) {
                throw new Error('Failed to load HTML file');
            }
            return await response.text();
        } catch (error) {
            console.error('Error loading HTML:', error);
            this.MODAL.hide();
        }
    }

    initEvent() {
        // TODO 관리자일 경우에만 수정 버튼 표시 및 이벤트 세팅
        // 상세/수정 화면 토글
        this.modalArea.querySelectorAll('.edit-btn, .cancel-btn').forEach(btn => {
            const toggleEditMode = (e) => {
                e.stopPropagation();
                e.preventDefault();

                this.isEditMode = !this.isEditMode;
                const tarSelectors = ['.edit-btns', '.detail-btns', '.delete-btn', '#item-img-upload-label']
                tarSelectors.forEach(sltr => this.modalArea.querySelector(sltr).classList.toggle('d-none'));
                this.initData();
            }

            btn.removeEventListener('click', toggleEditMode);
            btn.addEventListener('click', toggleEditMode);
        });

        this.modalArea.querySelector('.save-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            this.saveData();
        });

        this.modalArea.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.preventDefault();

            this.deleteData();
        });
    }

    initData() {
        const data = this.data;

        const modalBody = this.modalArea.querySelector('.modal-body');
        drawItemImg.bind(this)(modalBody);
        drawItemInfo.bind(this)(modalBody);

        this.MODAL.show();


        function drawItemImg(modalBody) {
            const img = modalBody.querySelector('.item-image img');
            img.src = data.imageUrl;
            img.alt = data.name;
        }

        function drawItemInfo(modalBody) {
            const target = modalBody.querySelector('#item-details');
            target.innerHTML = '';

            makeItemInfoHtml.bind(this)();
            setItemInfoEvent.bind(this)();


            function makeItemInfoHtml() {
                if (this.isEditMode) {
                    const form = append(makeItemFormHtml(), target);
                    setFormData(data, form);

                } else {
                    append(makeItemDtlHtml(data), target);
                }
            }

            function setItemInfoEvent() {

            }
        }
    }

    saveData() {
        const form = document.getElementById('item-form');
        const param = getFormData(form);
        // FormData 객체가 자동으로 multipart/form-data 형식으로 데이터를 인코딩
        const formData = new FormData();

        formData.append("item", JSON.stringify(param));

        const file = document.getElementById('item-img-upload').files[0];
        if (file) {
            formData.append('file', file);
        }

        fetch(`/items/${this.data.id}`, {
            method: 'PUT',
            body: formData
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            return response.json();
        }).then(result => {
            this.data = result;

            this.isEditMode = !this.isEditMode;
            const tarSelectors = ['.edit-btns', '.detail-btns', '.delete-btn', '#item-img-upload-label'];
            tarSelectors.forEach(sltr => this.modalArea.querySelector(sltr).classList.toggle('d-none'));

            this.initData();

            // 목록 업데이트
            this.parent.initData();
        }).catch(error => {
            console.error('Error saving data:', error);
            this.MODAL.hide();
        });
    }

    async deleteData() {
        const response = await fetch(`items/${this.data.id}`, {
            method: 'DELETE'
        });

        if (! response.ok) {
            throw new Error('Failed to delete data');
        }

        this.parent.initData();
        this.MODAL.hide();
    }


}

