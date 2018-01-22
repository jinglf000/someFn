
// const  reg = /([\s\S]*pla
// y[\s\S]*)/g;
// const reg = /(\b\w*\b)/g;
// const reg = /(\b[\w]*p[\w]*\b)/g;
// const reg = /(?!\b[\w]*ph[\w]\b)(\b[\w]*p[\w]*\b)/g;
// var str = "python php ruby javascript jsonp perhapsphpisoutdated";

// const reg = /\b\d/g;

// var str = '1px 2em 3pt 4px';

// const str = 'sss'
// 

// const reg1 = /\b\d{2}/g;
// const reg2 = /(?!0)\b\d{2}/g;
// const reg3 = /(?=0)\b\d{2}/g;
// const str = '01px 12em 03pt  14px';

// console.log(str.match(reg1));
// console.log(str.match(reg2));
// console.log(str.match(reg3));

// const reg = /(?=0)\d12/g;

// const str = '1101212';

// console.log(str.match(reg));


var s = 'aaalllsss0tAAAnnn999';
var reg = /(\w)\1{2}(?!(\w)\2{2})/g;

console.log(s.match(reg));
