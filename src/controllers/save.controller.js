const SaveService = require('../services/save.service');
const { logger } = require('../middlewares/logger');

class SaveController {
  constructor() {
    this.saveService = new SaveService();
  }
}

module.exports = SaveController;
