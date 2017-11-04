const chalk = require('chalk')
const moment = require('moment')

module.exports = {
  success(name, info) {
    [name, info] = assign('Success', name, info)
    return log(chalk.green, name, info)
  },
  info(name, info) {
    [name, info] = assign('Info', name, info)
    return log(chalk.cyan, name, info)
  },
  warn(name, info) {
    [name, info] = assign('Warn', name, info)
    return log(chalk.yellow, name, info)
  },
  debug(name, info) {
    [name, info] = assign('Debug', name, info)
    return log(chalk.magenta, name, info)
  },
  error(name, info) {
    [name, info] = assign('Error', name, info)
    if (info instanceof Error) return log(chalk.red, info.name, info.message, info.stack)
    return log(chalk.red, name, info)
  },
  fatal(name, info) {
    [name, info] = assign('Fatal', name, info)
    if (info instanceof Error) throw log(chalk.bgRed.white, info.name, info.message, info.stack)
    throw log(chalk.bgRed.white, name, info)
  },
}

function time() {
  return moment().format('HH:mm:ss')
}

function log(style, name, message, stacktrace) {
  if (typeof style !== 'function') {
    log(chalk.white, 'Logger', 'Missing Style Type')
    style = chalk.white
  }

  // Log Multiple
  if (Array.isArray(message)) {
    for (const item of message) console.log(style.bold(`[${time()} ${name}]`), style(item))
    return null
  }

  // Log Stacktrace
  if (stacktrace) {
    console.log(style.bold(`[${time()} ${name}]`), style(sanitize(message)))
    stacktrace = stacktrace.slice(stacktrace.indexOf(message) + message.length + 1)
    return console.log(style(stacktrace))
  }

  // Log Normally
  if (typeof message === 'string') message = sanitize(message)
  return console.log(style.bold(`[${time()} ${name}]`), style(message))
}

function assign(def, name, info) {
  if (!info) return [def, name]
  return [name, info]
}

function sanitize(message) {
  return message.replace(/\r?\n|\r/g, '; ')
}
