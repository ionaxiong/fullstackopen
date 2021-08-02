const info = (...param) => {
	console.log(...param)
}

const error = (...param) => {
	console.error(...param)
}

module.exports = {
	info,
	error,
}
