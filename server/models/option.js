import mongoose, { Schema } from 'mongoose';

const OptionSchema = new Schema({
  optionValue: {
    type: String,
    sparse: true
  },
  questionId: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
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

const Option = mongoose.model('Option', OptionSchema);

export default Option;
