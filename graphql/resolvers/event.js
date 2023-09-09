const { transformEvent } = require('./merge')
const Event = require('../../models/event')
const User = require('../../models/user')




module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },

  event: async (args) => {
    try {
      const eventId = args.id;
      const event = await Event.findById(eventId);
      return transformEvent(event);
    } catch (err) {
      throw err;
    }
  },

  createEvent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated')
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId,
    });
    try {
      const savedEvent = await event.save();

      const creatorUser = await User.findById(req.userId);

      if (!creatorUser) {
        throw new Error("user not found");
      }
      creatorUser.createdEvents.push(event);
      await creatorUser.save();

      return transformEvent(savedEvent);
    } catch (err) {
      throw err;
    }
  },
};