import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: 'Nova Inscrição',
      template: 'subscription',
      context: {
        responsable: meetup.user.name,
        meetup: meetup.title,
        subscriber: user.name,
        email: user.email,
        date: format(parseISO(meetup.date), "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new SubscriptionMail();
