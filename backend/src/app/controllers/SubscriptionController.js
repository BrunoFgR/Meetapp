import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../Jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['path', 'url'],
            },
            {
              model: User,
              as: 'user',
              attributes: ['name'],
            },
          ],
        },
      ],
      order: [['meetup', 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetups" });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't subscribe to past meetups" });
    }

    const checkDate = await Subscription.findOne({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    const subscription = await Subscription.findOne({
      where: { user_id: user.id, meetup_id: meetup.id },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          attributes: ['id', 'title', 'description', 'location', 'date'],
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['path', 'url'],
            },
            {
              model: User,
              as: 'user',
              attributes: ['name'],
            },
          ],
        },
      ],
      order: [['meetup', 'date']],
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const { id } = req.params;

    const subscription = await Subscription.findOne({
      where: { user_id: req.userId, meetup_id: id },
      include: [{ model: Meetup, as: 'meetup', where: { id } }],
    });

    if (!subscription) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (subscription.meetup.past) {
      return res.status(400).json({ error: 'User cannot delete past meetups' });
    }

    await subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();
