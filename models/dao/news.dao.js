import prisma from '../prisma/prisma-client.js';

export class NewsDao {
  createNews = async (newsDto) => {
    const news = await prisma.news.create({
      data: newsDto,
    });

    return news;
  };

  getAllNews = async () => {
    const news = await prisma.news.findMany();

    return news;
  };

  getNewsById = async (id) => {
    const news = await prisma.news.findUnique({
      where: {
        id,
      },
    });

    return news;
  };

  getNewsByAdminId = async (adminId) => {
    const news = await prisma.news.findMany({
      where: {
        adminId,
      },
    });

    return news;
  };

  updateNews = async (newsDto) => {
    const news = await prisma.news.update({
      where: {
        id: newsDto.id,
      },
      data: newsDto,
    });

    return news;
  };

  deleteNews = async (newsId) => {
    const news = await prisma.news.delete({
      where: {
        id: newsId,
      },
    });

    return news;
  };
}
