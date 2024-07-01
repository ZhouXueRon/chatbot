// 用户登录和注册表单项验证的通用代码

/**
 * 对某一个表单项进行验证的构造函数
 */
class FieldValidator {
    /**
     * 构造器
     * @param {String} txtId 文本框 id
     * @param {Function} validatorFunction 验证规则函数，当需要对该文本框进行验证时，会调用该函数。函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回值则表示无错误
     */
    constructor(txtId, validatorFunction) {
        this.input = $(`#${txtId}`);
        this.p = this.input.nextElementSibling;
        this.validatorFunction = validatorFunction;
        // 失去焦点，进行单项验证
        this.input.addEventListener('blur', () => {
            this.validate();
        });
        this.validatorFunction = validatorFunction;
    }

    /**
     * 验证，成功返回 true，失败返回 false
     */
    async validate() {
        const err = await this.validatorFunction(this.input.value);
        this.p.innerText = err || '';
        return !err;
    }

    /**
     * 对传入的所有验证器进行统一验证，所有验证通过则为通过返回 true，否则返回 false
     * @param {FieldValidator []} validates 
     */
    static async validate(...validates) {
        const proms = validates.map(v => v.validate());
        const result = await Promise.all(proms);
        return result.every(v => v);
    }

}