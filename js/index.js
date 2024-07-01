(async function () {
    // 验证用户是否已登录，如果没有登录，跳转到登录页
    const resp = await API.profile();
    const user = resp.data;
    if (!user) {
        alert('未登录或登录已过期，请重新登录');
        window.location.href = 'login.html';
        return;
    }

    const doms = {
        aside: {
            nickname: $('#nickname'),
            loginId: $('#loginId')
        },
        close: $('.close'),
        container: $('.chat-container'),
        txtMsg: $('#txtMsg'),
        msgContainer: $('.msg-container'),
    }
    setUserInfo();

    // 注销事件
    doms.close.addEventListener('click', () => {
        API.loginOut();
        window.location.href = 'login.html';
    });

    // 设置用户信息
    function setUserInfo() {
        doms.aside.nickname.innerText = user.nickname;
        doms.aside.loginId.innerText = user.loginId;
    };

    /**
     * 根据消息对象，添加到页面中
     * chartInfo: {
     *  content: '你几岁啦？',
     *  createdAt: 16234234234,
     *  from: 'haha',
     *  to: null
     * }
     */
    function addChat(chatInfo) {
        const div = $$$('div');
        div.classList.add('chat-item');
        if (chatInfo.from) {
            div.classList.add('me');
        }
        const img = $$$('img');
        img.classList.add('chat-avatar')
        img.src = chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';

        const content = $$$('div');
        content.classList.add('chat-content');
        content.innerText = chatInfo.content;

        const date = $$$('div');
        date.classList.add('chat-date');
        date.innerText = formatDate(chatInfo.createdAt);

        div.appendChild(img);
        div.appendChild(content);
        div.appendChild(date);
        doms.container.appendChild(div);
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    // 加载历史记录
    async function loadHistory() {
        const resp = await API.getHistory();
        for (const item of resp.data) {
            addChat(item);
        }
    }

    // 让聊天区域的滚动条滚动到底部
    function scrollToBottom() {
        doms.container.scrollTop = doms.container.scrollHeight;
    }

    // 发送消息
    async function sendChat() {
        const content = doms.txtMsg.value.trim();
        if (!content) return;
        addChat({
            from: user.loginId,
            to: null,
            createdAt: Date.now(),
            content
        })
        scrollToBottom();
        doms.txtMsg.value = '';
        const resp = await API.sendChat(content);
        addChat({
            from: null,
            to: user.loginId,
            ...resp.data
        });
        scrollToBottom();
    }

    await loadHistory();
    scrollToBottom();

    // 监听发送事件
    doms.msgContainer.addEventListener('submit', (e) => {
        e.preventDefault();
        sendChat();
    });


})();