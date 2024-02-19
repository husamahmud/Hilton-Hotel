import prisma from '../prisma/prisma-client.js';

export class FaqsDao {
  createFaqs = async (faqsDto) => {
    const faqs = await prisma.fAQS.create({
      data: faqsDto,
    });
    return faqs;
  };

  getAllFaqs = async () => {
    const faqs = await prisma.fAQS.findMany();
    return faqs;
  };

  getFaqsById = async (id) => {
    const faqs = await prisma.fAQS.findUnique({
      where: {
        id,
      },
    });
    return faqs;
  };

  updateFaqs = async (faqsDto) => {
    const faqs = await prisma.fAQS.update({
      where: {
        id: faqsDto.id,
      },
      data: faqsDto,
    });
    return faqs;
  };

  deleteFaqs = async (id) => {
    const faqs = await prisma.fAQS.delete({
      where: {
        id,
      },
    });
    return faqs;
  };
}
