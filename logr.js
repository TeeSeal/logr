const chalk = require('chalk');
const moment = require('moment');

module.exports = {
	success: (msg, name = 'success') => {
		return log(chalk.green, name, msg);
	},
	info: (msg, name = 'info') => {
		return log(chalk.blue, name, msg);
	},
	warn: (msg, name = 'warn') => {
		return log(chalk.yellow, name, msg);
	},
	debug: (msg, name = 'debug') => {
		return log(chalk.magenta, name, msg);
	},
	error: (msg, name = 'error', stack) => {
		if (msg.constructor.name.includes('Error')) return log(chalk.red, msg.name, msg.message, true);
		return log(chalk.red, name, msg, stack);
	},
	fatal: (msg, name = 'fatal', stack) => {
		if (msg.constructor.name.includes('Error')) return log(chalk.red, msg.name, msg.message, true);
		throw log(chalk.bgRed.white, name, msg, stack);
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
		return console.trace(message);
	}

	// Log Normally
	if (typeof message === 'string') message = message.replace(/\r?\n|\r/g, ' ');
	return console.log(style.bold(`[${time()} ${name}]`), style(message));
}
