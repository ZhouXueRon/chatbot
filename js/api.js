var API = (function () {
    const BASE_URL = 'https://study.duyiedu.com';
    const TOKEN_KEY = 'token';

    function get(path) {
        const headers = {};
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers['authorization'] = `Bearer ${token}`;
        }
        return fetch(`${BASE_URL}${path}`, { headers });
    }

    function post(path, data) {
        let headers = { 'Content-Type': 'application/json' };
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            headers['authorization'] = `Bearer ${token}`;
        }
        return fetch(`${BASE_URL}${path}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
    }

    // 注册
    async function reg(userInfo) {
        const resp = await post('/api/user/reg', userInfo);
        return await resp.json();
    }

    // 登录
    async function login(loginInfo) {
        const resp = await post('/api/user/login', loginInfo);
        const result = await resp.json();
        if (result.code === 0) { // 登录成功
            // 获取 token
            const token = resp.headers.get('authorization');
            // 将 token 存入浏览器缓存
            localStorage.setItem(TOKEN_KEY, token);
        }
        return result;
    }

    // 验证
    async function exists(loginId) {
        const resp = await get(`/api/user/exists?loginId=${loginId}`);
        return await resp.json();
    }

    // 获取用户信息
    async function profile() {
        const resp = await get('/api/user/profile');
        return await resp.json();
    }

    // 发送聊天
    async function sendChat(content) {
        const resp = await post('/api/chat', { content });
        return await resp.json();
    }

    // 获取聊天记录
    async function getHistory() {
        const resp = await get('/api/chat/history');
        return await resp.json();
    }

    // 注销登录
    function loginOut() {
        // 清空token
        localStorage.removeItem(TOKEN_KEY);
    }

    return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        loginOut
    };
})();
