module.exports = {
    async up(db, client) {
        console.log('Adding tags field to events collection...');
        // FIX: Removed the extra curly braces around the $set operator.
        await db.collection('events').updateMany(
            {}, // Filter: Select all documents
            { $set: { tags: [] } } // Update: Set the 'tags' field to an empty array
        );
        console.log('Tags field added.');
    },

    async down(db, client) {
        console.log('Removing tags field from events collection...');
        // FIX: Removed the extra curly braces around the $unset operator.
        await db.collection('events').updateMany(
            {}, // Filter: Select all documents
            { $unset: { "tags": "" } } // Update: Remove the 'tags' field
        );
        console.log('Tags field removed.');
    }
};
