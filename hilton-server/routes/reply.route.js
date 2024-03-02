import express from 'express';
import { ReplyController } from '../controllers/reply.controller.js';

const router = express.Router();

router
  .route('/')
  .post(ReplyController.createReply)
  .get(ReplyController.getAllReplies);


router
  .route('/:replyId')
  .get(ReplyController.getReplyById)
  .put(ReplyController.updateReply)
  .delete(ReplyController.deleteReply);

router
  .route('/news/:newsId')
  .get(ReplyController.getRepliesByNewsId);

export default router;
