module.exports = {
    async up(db, client) {
        console.log('Applying initial schema setup migration...');
        // Create Users collection and indexes
        const usersCollection = await db.createCollection('users');
        await usersCollection.createIndex({ email: 1 }, { unique: true });
        await usersCollection.createIndex({ username: 1 }, { unique: true });
        console.log('Users collection and indexes created.');

        // Create Events collection and indexes
        const eventsCollection = await db.createCollection('events');
        await eventsCollection.createIndex({ date: 1 });
        await eventsCollection.createIndex({ category: 1 });
        await eventsCollection.createIndex({ organizer: 1 });
        console.log('Events collection and indexes created.');

        // Create Bookings collection and indexes
        const bookingsCollection = await db.createCollection('bookings');
        await bookingsCollection.createIndex({ user: 1 });
        await bookingsCollection.createIndex({ event: 1 });
        console.log('Bookings collection and indexes created.');
    },

    async down(db, client) {
        console.log('Reverting initial schema setup migration...');
        // Drop collections
        await db.collection('users').drop();
        await db.collection('events').drop();
        await db.collection('bookings').drop();
        console.log('Collections dropped.');
    }
};