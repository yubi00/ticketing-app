import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log('publisher connected to NATS');

  const data = JSON.stringify({
    id: '255',
    title: 'concert',
    price: 2000
  });
  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  });
});
