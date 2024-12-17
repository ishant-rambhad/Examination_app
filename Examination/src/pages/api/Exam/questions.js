import dbConnect from '../../../../lib/dbConnect';
import Question from '../../../../models/Question';

export default async function handler(req, res) {
  await dbConnect();
  console.log('Connected to database'); // Check if the connection is established

  try {
    const variable = await Question.find({});
    console.log("Fetched questions:", variable); // Add debug log to see fetched data

    if (!variable || variable.length === 0) {
      return res.status(404).json({ success: false, message: 'No questions found' });
    }

    res.status(200).json({ success: true, data: variable });
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch questions' });
  }
}
