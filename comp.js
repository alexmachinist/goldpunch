let price=96.9956;

let cp=100;

console.log('\n'+'price is '+price);
console.log('cp is '+cp);
console.log('price dolzhen byt` ne menche chem na 10, i ne bolshe chem na 10 ot cp'+'\n'+'\n'+'ok, nachinaem sravnivat`');
if (price>=cp-10 && price < cp+10) {
		console.log(' - cp nam podhodit, dimon pidr')
} else {
	console.log(' - cp ne podhodit, dimon vsio ravno pidr')
};

//cp>=_price-5 && cp<=_price+5