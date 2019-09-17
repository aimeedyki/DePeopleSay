import mongoose, { Schema } from 'mongoose';

const ReplySchema = new Schema({
  Reply: {
    type: String,
    sparse: true
  },
  commentId: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likeCount: {
    type: Number,
    default: 0
  },
  repliedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Reply = mongoose.model('Reply', ReplySchema);

export default Reply;
