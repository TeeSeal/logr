const chalk = require("chalk");
const moment = require("moment");

module.exports = {
	success: (name, message) => {
		return log(chalk.green, name, message);
	},
	warn:    (name, message) => {
		return log(chalk.yellow, name, message);
	},
	debug:   (name, message) => {
		return log(chalk.magenta, name, message);
	},
	error:   (name, message, stacktrace) => {
		return log(chalk.red, name, message, stacktrace);
	},
	fatal:   (name, message, stacktrace) => {
		throw log(chalk.bgRed.white, name, message, stacktrace);
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
