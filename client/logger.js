const axios = require('axios');

class Logger {
  constructor(serviceName, serverUrl) {
    this.serviceName = serviceName;
    this.serverUrl = serverUrl;
  }

  async log(level, message, meta = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      service: this.serviceName,
      level,
      message,
      meta,
    };
    try {
      await axios.post(`${this.serverUrl}/logs`, logEntry);
    } catch (error) {
      console.error('Failed to send log:', error);
    }
  }

  info(message, meta) {
    this.log('INFO', message, meta);
  }

  error(message, meta) {
    this.log('ERROR', message, meta);
  }

  debug(message, meta) {
    this.log('DEBUG', message, meta);
  }
}

module.exports = Logger;
