const API_URL = '/auth';

export async function getPublicKeyFromServer() {
    const response = await fetch(`${API_URL}/generate-rsa-keys`, { method: 'POST' });
    return await response.text();
}

export function encryptData(publicKey, data) {
    const encrypt = new JSEncrypt();  // JSEncrypt 라이브러리 사용
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(data);
}