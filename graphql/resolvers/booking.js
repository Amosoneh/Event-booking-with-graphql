const Booking = require("../../models/booking");
const { transformBooking, transformEvent } = require("./merge");
const Event = require("../../models/event");


module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },

    
    bookEvent: async (args, req) => {
       if (!req.isAuth) {
         throw new Error("Unauthenticated");
       }
    try {
      const fetchEvent = await Event.findOne({ _id: args.eventId });
      const booking = new Booking({
        user: req.userId,
        event: fetchEvent,
      });
      const res = await booking.save();
      return transformBooking(res);
    } catch (error) {
      throw error;
    }
    },
    
    
    cancelBooking: async (args, req) => {
       if (!req.isAuth) {
         throw new Error("Unauthenticated");
       }
    try {
      const booking = await Booking.findByIdAndDelete(args.bookingId).populate(
        "event"
      );
      return transformEvent(booking.event);
    } catch (error) {
      throw error;
    }
  },
};
