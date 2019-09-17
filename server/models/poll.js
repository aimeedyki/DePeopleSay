import mongoose, { Schema } from 'mongoose';

const OptionSchema = new Schema({
  optionValue: {
    type: String,
    sparse: true
  },
  optionCount: {
    type: Number,
    default: 0
  },
  optionUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  anonymousResponses: {
    type: Number,
    default: 0
  }
});

const PollSchema = new Schema({
  question: {
    type: String,
    sparse: true
  },
  options: [OptionSchema],
  responseCount: {
    type: Number,
    default: 0
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likeCount: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  closedAt: {
    type: Date
  }
});

const Poll = mongoose.model('Poll', PollSchema);

export default Poll;
