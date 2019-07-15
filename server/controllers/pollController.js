import Poll from '../models/poll';

import { createPollValidation } from '../helpers/pollValidations';

export default {
  createPoll: (req, res) => {
    if (createPollValidation(req.body).isValid) {
      const { question, options, isAnonymous } = req.body;
      const { userId } = req.decoded;
      const newPoll = new Poll({
        question,
        options,
        createdBy: userId,
        isAnonymous
      });

      // save the poll
      newPoll.save((err, savedPoll) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }

        return res.status(201).json({
          success: true,
          message: 'Successful created a new Poll',
          poll: savedPoll
        });
      });
    } else {
      res.status(400).json({
        success: false,
        message: createPollValidation(req.body).message
      });
    }
  }
};
