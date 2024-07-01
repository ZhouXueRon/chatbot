/**
 * 验证账号
 */
const loginIdValidator = new FieldValidator('txtLoginId', async val => {
    if (!val) return '请填写账号';
});

/**
 * 验证密码
 */
const loginPwdValidator = new FieldValidator('txtLoginPwd', val => {
    if (!val) return '请填写密码';
});


// 获取表单元素，绑定提交事件
const form = $('.user-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const result = FieldValidator.validate(loginIdValidator, loginPwdValidator);
    if (!result) return; // 验证未通过直接结束
    const formData = new FormData(form); // 传入表单 dom， 得到一个表单数据对象
    const data = Object.fromEntries(formData.entries());
    const resp = await API.login(data);
    if (resp.code === 0) {
        alert('登录成功，点击确认跳转至首页！');
        location.href = './index.html'; // 跳转到登录页
    } else {
        loginPwdValidator.p.innerText = '账号或密码错误';
        loginPwdValidator.input.value = '';
    }
})