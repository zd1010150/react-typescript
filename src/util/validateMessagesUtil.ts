/*tslint:disable:object-literal-sort-keys*/
import {LANGUAGE} from '../config/app.config';
import formField from '../i18n/global/form';
import { idNumberReg, passwordReg, phoneReg, zipCodeReg } from './regex';
// 定义所有校验规则的错误信息

const errorMessages = (() => {
  const zhMessages = {
    after: (field: string, [target]: [string]) => ` ${field}必须在${target}之后`,
    alpha: (field: string) => ` ${field} 只能包含字母字符.`,
    alpha_dash: (field: string) => ` ${field}能够包含字母数字字符，包括破折号、下划线`,
    alpha_num: (field: string) => `${field} 只能包含字母数字字符.`,
    alpha_spaces: (field: string) => ` ${field} 只能包含字母字符，包括空格.`,
    before: (field: string, [target]: [string]) => ` ${field} 必须在${target} 之前.`,
    confirmed: (field:string, [confirmedField]: [string]) => ` ${field} 不能和${confirmedField}匹配.`,
    date_between: (field:string, [min, max]: [number, number]) => ` ${field}必须在${min}和${max}之间.`,
    date_format: (field:string, [format]:[string]) => ` ${field}必须在在${format}格式中.`,
    decimal: (field:string, [decimals] = ['*']) => ` ${field} 必须是数字的而且能够包含${decimals === '*' ? '' : decimals} 小数点.`,
    default: (field: string) => `${field} 校验失败`,
    digits: (field:string, [length]:[number]) => ` ${field} 必须是数字，且精确到 ${length}数`,
    dimensions: (field:string, [width, height]:[number, number]) => ` ${field}必须是 ${width} 像素到 ${height} 像素.`,
    email: (field: string) => ` ${field} 必须是有效的邮箱.`,
    ext: (field: string) => ` ${field} 必须是有效的文件.`,
    image: (field: string) => ` ${field} 必须是图片.`,
    in: (field: string) => ` ${field} 必须是一个有效值.`,
    ip: (field: string) => ` ${field} 必须是一个有效的地址.`,
    max: (field: string, [length]:[number]) => ` ${field} 不能大于${length}字符.`,
    mimes: (field: string) => ` ${field} 必须是有效的文件类型.`,
    min: (field: string, [length]:[number]) => ` ${field} 必须至少有 ${length} 字符.`,
    not_in: (field: string) => ` ${field}必须是一个有效值.`,
    numeric: (field: string) => ` ${field} 只能包含数字字符.`,
    regex: (field: string) => ` ${field}格式无效.`,
    required: (field: string) => `${field}是必须的.`,
    size: (field: string, [size]:[number]) => ` ${field} 必须小于 ${size} KB.`,
    url: (field: string) => ` ${field}不是有效的url.`,
  };
  const enMessages = {
    after: (field: string, [target]: [string]) => ` ${field}必须在${target}之后`,
    alpha: (field: string) => ` ${field} 只能包含字母字符.`,
    alpha_dash: (field: string) => ` ${field}能够包含字母数字字符，包括破折号、下划线`,
    alpha_num: (field: string) => `${field} 只能包含字母数字字符.`,
    alpha_spaces: (field: string) => ` ${field} 只能包含字母字符，包括空格.`,
    before: (field: string, [target]: [string]) => ` ${field} 必须在${target} 之前.`,
    confirmed: (field: string, [confirmedField]:[string]) => ` ${field} 不能和${confirmedField}匹配.`,
    date_between: (field: string, [min, max]: [number,number]) => ` ${field}必须在${min}和${max}之间.`,
    date_format: (field: string, [format]: [string]) => ` ${field}必须在在${format}格式中.`,
    decimal: (field: string, [decimals] = ['*']) => ` ${field} 必须是数字的而且能够包含${decimals === '*' ? '' : decimals} 小数点.`,
    default: (field: string) => `${field} validated fail`,
    digits: (field: string, [length]: [number]) => ` ${field} 必须是数字，且精确到 ${length}数`,
    dimensions: (field: string, [width, height]: [number,number]) => ` ${field}必须是 ${width} 像素到 ${height} 像素.`,
    email: (field: string) => ` ${field} should be valid email address.`,
    ext: (field: string) => ` ${field} 必须是有效的文件.`,
    image: (field: string) => ` ${field} 必须是图片.`,
    in: (field: string) => ` ${field} 必须是一个有效值.`,
    ip: (field: string) => ` ${field} 必须是一个有效的地址.`,
    max: (field: string, [length]: [number]) => ` ${field} can't more than ${length} characters.`,
    mimes: (field: string) => ` ${field} 必须是有效的文件类型.`,
    min: (field: string, [length]: [number]) => ` ${field} at least includes ${length} characters.`,
    not_in: (field: string) => ` ${field}必须是一个有效值.`,
    numeric: (field: string) => ` ${field} 只能包含数字字符.`,
    regex: (field: string) => ` ${field}格式无效.`,
    required: (field: string) => `${field} 是必须的.`,
    size: (field: string, [size]: [number]) => ` ${field} 必须小于 ${size} KB.`,
    url: (field: string) => ` ${field}不是有效的url.`,
  };
  const setMessage = (ruleName: string, zhMsg: string, enMsg:string) => {
    Object.assign(zhMessages, zhMsg);
    Object.assign(enMessages, enMsg);
  };
  const getMessages = (language: LANGUAGE) => (language === LANGUAGE.ZH ? zhMessages : enMessages);
  return {
    getMessages,
    setMessage
  };
})();


/**
 * 注册rule错误信息
 * @param ruleName
 * @param zhMsg
 * @param enMsg
 */
const registerMessage = (ruleName: string, zhMsg: string, enMsg:string) => {
  errorMessages.setMessage(ruleName, zhMsg, enMsg);
};

/**
 * 根据字段名获取错误信息
 * @param ruleName 所有的在errorMessage中定义的rule名
 * @param args errormsg中除了字段名以外的其他参数，创给errormessage调用的
 * @param field 字段名，都定义在'src/i18n/global/form'中
 * @param language 语言
 */
const getErrorMsg = (ruleName: string, field: string, language:LANGUAGE, args:any={}) => {
  const messages = errorMessages.getMessages(language);
  const formFields = formField[language];
  const filedName = formFields[field];
  return messages[ruleName](filedName, args);
};
/**
 * 获取已有校验规则的local化错误信息
 * @param ruleName https://ant.design/components/form-cn/#校验规则
 * @param args errormsg中除了字段名以外的其他参数，创给errormessage调用的,或者校验规则本身的一些参数，例如pattern需要一个正则表达式等，在需要的情况下自己补充getExistRule
 * @param field 字段名，都定义在'src/i18n/global/form'中
 * @param language 语言
 * @returns {*}
 */
const getExistRule = (ruleName: string, field: string, language:LANGUAGE, args:any={}) => {
  const messages = errorMessages.getMessages(language);
  const formFields = formField[language];
  const filedName = formFields[field];
  switch (ruleName) {
    case 'required':
      return {

        message: messages.required(filedName),
        required: args.required,
      };
    case 'min':
      return {

        message: messages.min(filedName, args.min),
        min: args.min,
      };
    case 'email':
      return {
        message: messages.email(filedName),
        type: 'email',
      };
    default:
      return {
        message: messages.default(filedName),
      };
  }
};

const registerRule = ({
  // tslint:disable-next-line:no-shadowed-variable
  ruleName, zhMsg, enMsg, validator,
}: any) => {
  registerMessage(ruleName, zhMsg, enMsg);
  return validator;
};
const between = (() => {
  const zhMsg = { between: (field: string, min: number, max: number) => ` ${field} 必须在${min} 到 ${max}字符之间.` };
  const enMsg = { between: (field: string, min: number, max: number) => ` ${field} should between ${min} and ${max}.` };
  return {
    zhMsg,
    enMsg,
    ruleName: 'between',
    validator: (min:number, max:number, language: LANGUAGE) => (rule: any, value = '', callback:any) => {
      const val = value.trim();
      if (val.length < 1) {
        callback();
      } else if (val.length < min || val.length > max) {
        callback(getErrorMsg('between', rule.field, language, [min, max]));
      } else {
        callback();
      }
    },
  };
})();
const phone = (() => {
  const zhMsg = { phone: () => '电话号码不合法.' };
  const enMsg = { phone: () => 'it is invalid phone number.' };
  return {
    zhMsg,
    enMsg,
    ruleName: 'phone',
    validator: (language: LANGUAGE) => (rule: any, value = '', callback: any) => {
      const val = value.trim();
      if (val.length < 1) {
        callback();
      } else if (!phoneReg.test(val)) {
        callback(getErrorMsg('phone', rule.field, language));
      } else {
        callback();
      }
    },
  };
})();
const zipCode = (() => {
  const zhMsg = { zipCode: () => '邮政编码不合法.' };
  const enMsg = { zipCode: () => 'it is invalid ZIP Code.' };
  return {
    zhMsg,
    enMsg,
    ruleName: 'zipCode',
    validator: (language: LANGUAGE) => (rule: any, value = '', callback: any) => {
      const val = value.trim();
      if (val.length < 1) {
        callback();
      } else if (!zipCodeReg.test(val)) {
        callback(getErrorMsg('zipCode', rule.field, language));
      } else {
        callback();
      }
    },
  };
})();
const idNumber = (() => {
  const zhMsg = { idNumber: () => '身份证号码不合法.' };
  const enMsg = { idNumber: () => 'it is invalid ID Number.' };
  return {
    zhMsg,
    enMsg,
    ruleName: 'idNumber',
    validator: (language: LANGUAGE) => (rule: any, value = '', callback: any) => {
      const val = value.trim();
      if (val.length < 1) {
        callback();
      } else if (!idNumberReg.test(val)) {
        callback(getErrorMsg('idNumber', rule.field, language));
      } else {
        callback();
      }
    },
  };
})();
const password = (() => {
  const zhMsg = { password: () => '密码必须包含大小写字母, 数字,至少8个字符' };
  const enMsg = { password: () => 'Should include upper and lower letters and numbers.At least 8 letters.' };
  return {
    zhMsg,
    enMsg,
    ruleName: 'password',
    validator: (language: LANGUAGE) => (rule: any, value = '', callback: any) => {
      const val = value.trim();
      if (val.length < 1) {
        callback();
      } else if (val.length < 8 || (!passwordReg.test(val))) {
        callback(getErrorMsg('password', rule.field, language));
      } else {
        callback();
      }
    },
  };
})();

const validator = {
  between: registerRule(between),
  phone: registerRule(phone),
  zipCode: registerRule(zipCode),
  idNumber: registerRule(idNumber),
  password: registerRule(password),
};
export { getExistRule, getErrorMsg, validator };
