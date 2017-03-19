const chalk = require("chalk");
const moment = require("moment");

module.exports = {
	success: (message) => {
		return log(chalk.green, 'success', message);
	},
	info: (message) => {
		return log(chalk.blue, '   info', message);
	},
	warn: (message) => {
		return log(chalk.yellow, 'warning', message);
	},
	debug: (message) => {
		return log(chalk.magenta, '  debug', message);
	},
	error: (message, stacktrace) => {
		return log(chalk.red, '  error', message, stacktrace);
	},
	fatal: (message, stacktrace) => {
		throw log(chalk.bgRed.white, '  fatal', message, stacktrace);
	}
}

function time() {
		return moment().format("HH:mm:ss");
}

function log(style, name, message, stacktrace) {
		if (typeof style !== "function") {
				log(chalk.white, "Logger", "Missing Style Type");
				style = chalk.white;
		}

		// Log Multiple
		if (Array.isArray(message)) {
				for (const item of message) console.log(style.bold(`[${time()} ${name}]`), style(item));
				return false;
		// Log Stacktrace
		} else if (stacktrace) {
				console.log(style.bold(`[${time()} ${name}]`), style(message));
				return console.trace(message);
		// Log Normally
		} else {
				message = typeof message === "string" ? message.replace(/\r?\n|\r/g, " ") : message;
				return console.log(style.bold(`[${time()} ${name}]`), style(message));
		}
}
