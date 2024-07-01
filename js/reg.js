/**
 * 验证账号
 */
const loginIdValidator = new FieldValidator('txtLoginId', async val => {
    if (!val) return '请填写账号';
    const res = await API.exists(val);
    if (res.data) return '该账号已被占用，请重新填写'
});

/**
 * 验证昵称
 */
const nickNameValidator = new FieldValidator('txtNickname', val => {
    if (!val) return '请填写昵称';
});

/**
 * 验证密码
 */
const loginPwdValidator = new FieldValidator('txtLoginPwd', val => {
    if (!val) return '请填写密码';
});

/**
 * 验证确认密码
 */
const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', val => {
    if (!val) return '请填写确认密码';
    if (val !== loginPwdValidator.input.value) return '两次密码不一致'
});

// 获取表单元素，绑定提交事件
const form = $('.user-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const result = FieldValidator.validate(loginIdValidator, nickNameValidator, loginPwdValidator, loginPwdConfirmValidator);
    if (!result) return; // 验证未通过直接结束
    const formData = new FormData(form); // 传入表单 dom， 得到一个表单数据对象
    const data = Object.fromEntries(formData.entries());
    const resp = await API.reg(data);
    if (resp.code === 0) {
        alert('注册成功，点击确认跳转至登录页！');
        location.href = './login.html'; // 跳转到登录页
    }
})