import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
  question: {
    type: String,
    sparse: true
  },
  surveyId: [{ type: Schema.Types.ObjectId, ref: 'Survey' }],
  Options: [{ type: Schema.Types.ObjectId, ref: 'Options' }],
});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
