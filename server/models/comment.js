import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  comment: {
    type: String,
    sparse: true
  },
  pollId: [{ type: Schema.Types.ObjectId, ref: 'Poll' }],
  likeCount: {
    type: Number,
    default: 0
  },
  commentedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
