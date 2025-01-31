import * as RSAUtil from "../utils/RSAUtil.js";

export default class SignIn {
    constructor() {
        this.API_URL = '/auth/sign-in';
        this.COMPONENT_AREA = document.querySelector('#sign-in-area');
    }

    init() {

        this.initEvent();
    }

    initEvent() {
        this.COMPONENT_AREA.querySelector('.sign-in-btn').addEventListener('click', async (e) => {
            e.preventDefault();

            const publicKey = await RSAUtil.getPublicKeyFromServer();
            const encryptedSocialId = RSAUtil.encryptData(publicKey, this.#getElementValue('USER_ID'));
            const encryptedPassword = RSAUtil.encryptData(publicKey, this.#getElementValue('USER_PWD'));
            this.submitSignIn(encryptedSocialId, encryptedPassword);
        });
    }

    async submitSignIn(encryptedSocialId, encryptedPassword) {
        const response = await fetch(`${this.API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                socialId: encryptedSocialId,
                password: encryptedPassword
            }),
            redirect: 'follow' // 'follow'로 설정해야 리디렉트 자동 처리
        });

        if (!response.ok) {
            alert('로그인에 실패했습니다.');
            return;
        }

        // fetch API의 redirect 옵션을 사용하면 서버에서 리디렉트 응답을 보낼 때 자동으로 리디렉트됨
        if (response.redirected) {
            window.location.href = response.url;
        }
    }

    #getElementValue(id) {
        const element = this.COMPONENT_AREA.querySelector(`#${id}`);
        if (!element) return null;
        return element.value;
    }
}




// export default function Login() {
export function naverLogin() {
    var naverIdLogin = new naver_id_login("UJM6kMtsW6AZq13aSZAZ", "http://localhost:8080/index");
    var state = naverIdLogin.getUniqState();
    naverIdLogin.setButton("white", 2,40);
    naverIdLogin.setDomain("http://localhost:8080");
    naverIdLogin.setState(state);
    naverIdLogin.setPopup();
    naverIdLogin.init_naver_id_login();

    callback();
}

function callback() {
    // var naver_id_login = new naver_id_login("UJM6kMtsW6AZq13aSZAZ", "YOUR_CALLBACK_URL");
    var naverIdLogin = new naver_id_login("UJM6kMtsW6AZq13aSZAZ", "http://localhost:8080/index");
    // 접근 토큰 값 출력
    alert(naverIdLogin.oauthParams.access_token);
    // 네이버 사용자 프로필 조회
    naverIdLogin.get_naver_userprofile("naverSignInCallback()");
    // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
    function naverSignInCallback() {
        alert(naverIdLogin.getProfileData('email'));
        alert(naverIdLogin.getProfileData('nickname'));
        alert(naverIdLogin.getProfileData('age'));
    }
}