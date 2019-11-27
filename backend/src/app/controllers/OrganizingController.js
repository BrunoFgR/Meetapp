import Meetup from '../models/Meetup';
import File from '../models/File';

class OrganizingController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url', 'id'],
        },
      ],
      order: ['date'],
    });

    return res.json(meetups);
  }
}

export default new OrganizingController();
