import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  topic_id: { type: Number, required: true },
  subject_id: { type: Number, required: true },
  question_id: { type: Number, required: true },
  question: { type: String, required: true },
  programme: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
});

// Explicitly tell Mongoose to use the 'variable' collection
const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema, 'variable');

export default Question;
