const { Pins, PinsTags, Tags, sequelize } = require('../../models');

class TagssRepository {
  create = async ({ hashtags }) => {
    const createTagData = await Tags.create({
      tagName: hashtags,
    });
    return createTagData;
  };
}

module.exports = TagssRepository;
