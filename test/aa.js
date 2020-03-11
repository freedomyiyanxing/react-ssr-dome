const hex = '68747470733a2f2f737068617264322e6769746875622e6';
const rawStr = hex.trim();
const len = rawStr.length;
let curCharCode;
const resultStr = [];
for (let i = 0; i < len; i = i + 2) {
  curCharCode = parseInt(rawStr.substr(i, 2), 16);
  resultStr.push(String.fromCharCode(curCharCode))
}
