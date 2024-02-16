import { ReplyDao } from '../models/dao/reply.dao.js';
import { ReplyDto } from '../models/dto/reply.dto.js';
import { ReplyValidate } from '../middlewares/validations/reply.validate.js';

export class ReplyController {
  static createReply = async (req, res) => {
    const replyDto = new ReplyDto(req.body);
    const replyDao = new ReplyDao();

    try {
      const { error } = await ReplyValidate.createReply(replyDto);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const reply = await replyDao.createReply(replyDto);
      return res
        .status(201)
        .json({ message: 'Reply created successfully', data: reply });

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static getAllReplies = async (req, res) => {
    const replyDao = new ReplyDao();

    try {
      const replies = await replyDao.getAllReplies();
      return res
        .status(200)
        .json({ message: 'Replies retrieved successfully', data: replies });

    } catch (e) {
      return res.status(500).json({ error: e.message || 'Eternal server error' });
    }
  };

  static getReplyById = async (req, res) => {
    const replyDao = new ReplyDao();
    try {
      const reply = await replyDao.getReplyById(req.params.replyId);
      return res
        .status(200)
        .json({ message: 'Reply retrieved successfully', data: reply });

    } catch (e) {
      return res.status(500).json({ error: e.message || 'Eternal server error' });
    }
  };

  static updateReply = async (req, res) => {
    const replyDto = new ReplyDto(req.body);
    const replyDao = new ReplyDao();
    replyDto.id = req.params.replyId;

    try {
      const { error } = await ReplyValidate.updateReply(replyDto);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const reply = await replyDao.updateReply(replyDto);
      console.log(reply);
      return res
        .status(200)
        .json({ message: 'Reply updated successfully', data: reply });

    } catch (e) {
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static deleteReply = async (req, res) => {
    const replyDao = new ReplyDao();
    try {
      const reply = await replyDao.deleteReply(req.params.replyId);
      return res
        .status(200)
        .json({ message: 'Reply deleted successfully', data: reply });

    } catch (e) {
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };
}
