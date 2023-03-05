const {
  BadRequestError,
  ForbiddenError,
} = require('../exceptions/customError.js');
const { logger } = require('../middlewares/logger');
const SaveRepository = require('../repositories/save.repository');

class SaveService {
  constructor() {
    this.saveRepository = new SaveRepository();
  }
}

module.exports = SaveService;
