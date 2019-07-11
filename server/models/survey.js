import mongoose, { Schema } from 'mongoose';

const SurveySchema = new Schema({
  title: {
    type: String,
    sparse: true
  },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
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
  createAnonymously: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Survey = mongoose.model('Survey', SurveySchema);

export default Survey;
