const SaveService = require('../services/save.service');
const { logger } = require('../middlewares/logger');

class SaveController {
  constructor() {
    this.saveService = new SaveService();
  }
  saveUser = async (req, res, next) => {
    const userId = Math.floor(Math.random() * 11);
  }
}

module.exports = SaveController;
