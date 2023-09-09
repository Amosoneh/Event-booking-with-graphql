const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Booking{
        id:ID!
        event:Event!
        user: User!
        createdAt: String!
        updatedAt: String!
    }
    type Event {
        id: ID!
        title: String!
        description: String!
        price: Float
        date: String!
        creator: User!
    }

    type User {
        id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
    }

    type AuthData {
        userId: String!
        token: String!
        tokenExpiresIn: Int!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input UserInput{
        email: String!
        password: String!
    }


    input EventInput{
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type RootQuery {
        event(id:ID!): Event
        events: [Event!]!
        user(id:ID!): User
        users: [User!]!
        bookings: [Booking!]!
        login(loginInput: LoginInput): AuthData!
    }

    type RootMutation{
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        bookEvent(eventId: ID): Booking!
        cancelBooking(bookingId: ID): Event!
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }
`)