export default function dropDownPayload(keys, values){
	if (!keys || !values){
		throw new Error("Не указаны аргументы!")
	}
	if (Object.prototype.toString.call(keys) !== '[object Object]' || Object.prototype.toString.call(values) !== '[object Object]') {
		throw new Error("Неверный тип аргументов!")
	}
	if (keys.length !== values.length){
		throw new Error("Длина ключей не равна длине значений!")
	}
	return Object.keys(keys).map(key => {
		return {
			payload: key,
			text: values[key]
		}
	})
}