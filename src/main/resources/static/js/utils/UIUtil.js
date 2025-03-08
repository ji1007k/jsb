export function toggle(targetElement) {
    if (!targetElement) return;

    [...targetElement].forEach(element =>
        element.classList.toggle('d-none')
    );
}

export function hide(targetEl) {
    if (!targetEl) return;

    // 단일 노드일 경우 배열로 변환
    const elements = targetEl instanceof NodeList ? [...targetEl] : [targetEl];
    elements.forEach(el => el.classList.add('d-none'));
}

export function show(targetEl) {
    if (!targetEl) return;

    const elements = targetEl instanceof NodeList ? [...targetEl] : [targetEl];
    elements.forEach(el => el.classList.remove('d-none'));
}

export function remove(targetElement) {
    if (!targetElement) return;
    // targetElement?.remove();
    [...targetElement].forEach(element =>
        element.remove()
    );
}

export function removeChildren(targetElement) {
    if (!targetElement) return;

    // 요소 이벤트까지 삭제
    [...targetElement].forEach(element =>
        element.innerHTML = ''
    );

    // 이벤트는 남기고 요소만 삭제
    /*while (targetElement.firstChild) {
        targetElement.removeChild(targetElement.firstChild);  // 첫 번째 자식 요소를 하나씩 삭제
    }*/
}

/**
 * UI 관련 유틸리티
 */

// HTML 문자열을 DocumentFragment로 변환하여 삽입
export function append(html, targetElement) {
    // HTML 문자열을 DocumentFragment로 변환
    // const range = document.createRange();
    // const fragment = range.createContextualFragment(html);

    // tr만 append 시 무시되는 문제 해결하기 위해 template 사용
    const template = document.createElement( 'template' );
    template.innerHTML = html;
    // 템플릿의 DocumentFragment 반환
    const fragment = template.content;

    // 자식 요소들을 배열로 저장
    const addedElements = Array.from(fragment.children);

    // 새 요소를 추가
    targetElement.appendChild(fragment);

    // 추가된 요소를 반환
    return addedElements[0];
}

// Form에 데이터를 삽입
export function setFormData(data, formElement) {
    // 객체의 각 key와 value에 대해
    Object.keys(data).forEach(key => {
        // key와 동일한 id를 가진 요소를 찾기
        const element = formElement.querySelector(`#${key}`);
        if (element) {
            // 해당 요소에 값 삽입 (input과 textarea를 처리)
            if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {

                if (element.type === 'checkbox') {
                    element.checked = data[key];
                } else {
                    element.value = data[key];
                }
            }
        }
    });
}

export function getFormData(formElement) {
    return formToObject(formElement);
}

export function formToObject(formElement) {
    const formData = {};
    const elements = formElement.querySelectorAll('input:not([type=file]), select, textarea'); // 폼의 모든 요소를 가져옴

    elements.forEach((element) => {
        const name = element.name || element.id;  // name이 없으면 id 사용
        if (name) {
            if (element.type === 'checkbox' || element.type === 'radio') {
                formData[name] = element.checked;
            } else if (element.type === 'file') {
                // 파일일 경우
                formData[name] = element.files[0] || null;
            } else {
                // 그 외의 경우
                formData[name] = element.value;
            }
        }
    });

    return formData;
}
