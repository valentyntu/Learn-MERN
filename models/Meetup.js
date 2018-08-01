const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetupSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: Date, required: true},
    createdAt: {type: Date, default: Date.now},
    guests: [{
        type: Schema.Types.ObjectId,
        ref: 'Guest'
    }
    ]
});

MeetupSchema.statics.addGuestById = function (meetupId, userId) {
    let addNewGuestId = {$addToSet: {'guests': userId}};
    return this.findByIdAndUpdate(meetupId,
        addNewGuestId,
        {new: true});
};

MeetupSchema.statics.deleteGuestById = function (meetupId, userId) {
    let removeGuestByID = {$pull: {'guests': userId}};
    return this.findByIdAndUpdate(meetupId,
        removeGuestByID,
        {new: true});
};


const Meetup = mongoose.model('Meetup', MeetupSchema, 'meetups');


module.exports = Meetup;