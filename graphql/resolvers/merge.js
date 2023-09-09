const Event = require('../../models/event')
const User = require('../../models/user')
const { dateToString } = require("../../helpers/date");

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const event = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const transformUser = (user) => {
  return {
    ...user._doc,
    id: user.id,
    createdEvents: events.bind(this, user._doc.createdEvents),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: event.bind(this, booking._doc.event),
    createdAt: dateToString(booking.createdAt),
    updatedAt: dateToString(booking.updatedAt),
  };
};

const transformEvent = (event) => {
  return {
    ...event._doc,
    id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator),
  };
};
exports.transformEvent = transformEvent;
exports.transformUser = transformUser;
exports.transformBooking = transformBooking