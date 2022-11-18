module.exports = {
  customLabel: '[DEFAULT]',
  setKey(k) { this.customLabel = k; },
  warn(...con) { this.write('warn', ...con); },
  info(...con) { this.write('info', ...con); },
  debug(...con) { this.write('debug', ...con); },
  error(...con) { this.write('error', ...con); },
  write(opt, ...con) {
    // eslint-disable-next-line no-console
    console[opt](this.customLabel, ...con);
  },
};
