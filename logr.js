const chalk = require('chalk');
const moment = require('moment');

module.exports = {
	success(info, name = 'success') {
		return log(chalk.green, name, info);
	},
	info(info, name = 'info') {
		return log(chalk.blue, name, info);
	},
	warn(info, name = 'warn') {
		return log(chalk.yellow, name, info);
	},
	debug(info, name = 'debug') {
		return log(chalk.magenta, name, info);
	},
	error(info, name = 'error', stack) {
		if (info instanceof Error) return log(chalk.red, info.name, info.message, info.stack);
		return log(chalk.red, name, info, stack);
	},
	fatal(info, name = 'fatal', stack) {
		if (info instanceof Error) return log(chalk.bgRed.white, info.name, info.message, info.stack);
		throw log(chalk.bgRed.white, name, info, stack);
	}
}

function time() {
	return moment().format('HH:mm:ss');
}

function log(style, name, message, stacktrace) {
	if (typeof style !== 'function') {
		log(chalk.white, 'Logger', 'Missing Style Type');
		style = chalk.white;
	}

	// Log Multiple
	if (Array.isArray(message)) {
		for (const item of message) console.log(style.bold(`[${time()} ${name}]`), style(item));
		return null;
	}

	// Log Stacktrace
	if (stacktrace) {
		console.log(style.bold(`[${time()} ${name}]`), style(message));
		stacktrace = stacktrace.split('\n').slice(1).join('\n');
		return console.log(stacktrace);
	}

	// Log Normally
	if (typeof message === 'string') message = message.replace(/\r?\n|\r/g, ' ');
	return console.log(style.bold(`[${time()} ${name}]`), style(message));
}
