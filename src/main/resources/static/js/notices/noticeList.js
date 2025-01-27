import * as UIUtil from "../utils/UIUtil.js";
import NoticeDetail from "./noticeDetail.js";
import NoticeAdd from "./noticeAdd.js";


export default class NoticeList {
    COMPONENT_AREA = document.querySelector('#notice-area');

    constructor() {
        console.log("NoticeList instance created");
        this.#init();
    }

    show() {
        UIUtil.show(this.COMPONENT_AREA);
    }

    async #init() {
        await this.initPage();
        this.initData();
    }

    async initPage() {
        await this.loadHtml();
        this.initEvent();
    }

    async loadHtml() {
        const response = await fetch('/static/html/notices/noticeList.html');
        if (!response.ok) {
            throw new Error('Failed to load HTML file');
        }

        const html = await response.text();

        UIUtil.append(html, this.COMPONENT_AREA);
    }

    initEvent() {
        const addBtn = this.COMPONENT_AREA.querySelector('#notice-add-btn');
        addBtn?.addEventListener('click', (e) => {
           e.preventDefault();
           new NoticeAdd(this);
        });
    }

    async initData() {
        const tableEl = this.COMPONENT_AREA.querySelector('table.notice-list');

        const tbody = tableEl.querySelector('tbody');
        tbody.innerHTML = '';

        const datas = await this.#getDatas();

        if (!datas.length) {
            // no data
            const html = '<tr><td colspan="3">공지사항이 없습니다.</td></tr>';
            UIUtil.removeChildren(tableEl);
            UIUtil.append(html, tableEl);
            return;
        }

        this.drawDatas(datas, tbody);
    }

    async #getDatas() {
        try {
            const response = await fetch('/notices', { method: 'GET' });

            if (!response.ok) {
                throw new Error('Failed to load data');
            }

            return await response.json();
        } catch (error) {
            console.error(error); // 로그 출력
            return [];  // 빈 배열 반환
        }
    }

    drawDatas(datas, targetEl) {

        datas.forEach(data => {
            drawData.bind(this)(data);
        })


        function drawData(data) {
            const html = `<tr id="${data.id}">
                        <td><a class="text-decoration-none">${data.title}</a></td>
                        <td>${data.createdBy}</td>
                        <td>${data.createdDate}</td>
                    </tr>`;

            const el = UIUtil.append(html, targetEl);

            // 이벤트 세팅
            el.addEventListener('click', async () => {
                const notice = await this.getDataById(data.id);
                new NoticeDetail(notice, this);
            })
        }
    }

    async getDataById(id) {
        try {
            const response = await fetch(`/notices/${id}`,{method: 'GET' });

            if (!response.ok) {
                throw new Error('Failed to load data');
            }

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
}