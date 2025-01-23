import {makeItemFormHtml} from "./ItemHtml.js";
import {append, getFormData} from "../utils/UIUtil.js";


export default class ItemAdd {
    constructor(parent) {
        console.log("ItemAdd instance created");
        this.parent = parent;

        this.MODAL = null;
        this.modalArea = document.getElementById('modalSheet');

        this.init();
    }

    async init() {
        await this.#initPage();
        this.initEvent();

        console.log("ItemAdd initialized");
    }

    async #initPage() {
        const html = await this.loadHtml();

        this.MODAL = new bootstrap.Modal(this.modalArea, {
            backdrop: true,         // 배경 클릭 시 닫힘
            keyboard: true,         // ESC로 닫힘
            fullscreen: 'md-down'   // 특정 크기 이하에서 전체 화면 모달
        });

        const modalBody = this.modalArea.querySelector(".modal-body");
        modalBody.innerHTML = '';
        append(html, modalBody);

        const target = modalBody.querySelector('#item-details');
        target.innerHTML = '';
        append(makeItemFormHtml(), target);

        const tarSelectors = ['.edit-btns', '.detail-btns', '#item-img-upload-label']
        tarSelectors.forEach(sltr => this.modalArea.querySelector(sltr).classList.toggle('d-none'));
        this.MODAL.show();
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
        this.modalArea.querySelector('.save-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            this.saveData();
        });

        this.modalArea.querySelector('.cancel-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            this.MODAL.hide();
        });
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

        fetch(`/items`, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to save data');
            }
        }).then(result => {
            // 목록 업데이트
            this.parent.initData();
            this.MODAL.hide();
        }).catch(error => {
            console.error('Error saving data:', error);
        });
    }
}