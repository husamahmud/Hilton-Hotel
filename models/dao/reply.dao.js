import prisma from '../prisma/prisma-client.js';

export class ReplyDao {
  createReply = async (replyDto) => {
    const reply = await prisma.reply.create({
      data: replyDto,
    });

    return reply;
  };

  getAllReplies = async () => {
    const replies = await prisma.reply.findMany();

    return replies;
  };

  getReplyById = async (id) => {
    const reply = await prisma.reply.findUnique({
      where: {
        id,
      },
    });

    return reply;
  };

  getRepliesByCommentId = async (commentId) => {
    const replies = await prisma.reply.findMany({
      where: {
        commentId,
      },
    });

    return replies;
  };

  getRepliesByUserId = async (userId) => {
    const replies = await prisma.reply.findMany({
      where: {
        userId,
      },
    });

    return replies;
  };

  updateReply = async (replyDto) => {
    const reply = await prisma.reply.update({
      where: {
        id: replyDto.id,
      },
      data: replyDto,
    });

    return reply;
  };

  deleteReply = async (replyId) => {
    const reply = await prisma.reply.delete({
      where: {
        id: replyId,
      },
    });

    return reply;
  };
}
