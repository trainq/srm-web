/*过滤特殊字符*/
export function stripscript(str) {
  const pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;,\\[\\].<>/?！￥…（）—【】‘；：” “。，、？]"
  );
  let rs = "";
  for (let i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
/*验证密码 字符+数字*/
export function checkEmail(str) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return reg.test(str);
}
/*验证验证码 6位数字或字符*/
export function checkCaptcha(str) {
  let reg = /^[a-z0-9]{6}$/;
  return reg.test(str);
}
