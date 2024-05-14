import db from "../db";
import { IJourney } from "../type/app";


export const createJourney = async (payload: IJourney, files: Express.Multer.File) => {

  if (files) {
    payload.image = files.filename as string;
  }

  const journey = await db.journey.create({
    data: {
      ...payload,
    },
  });

  return { journey };
}

export const getAllJourney = async () => {
  return await db.journey.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          fullname: true,
        },
      }
    }
  });
}

export const getJourney = async (id: number) => {
  return await db.journey.findFirst({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          fullname: true,
        },
      }
    }
  });
}

export const getUserJourney = async (userId: number) => {
  return await db.journey.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          fullname: true,
        },
      }
    }
  });
}

export const deleteJourney = async (id: number, userId: number) => {
  const existedJourney = await db.journey.findFirst({
    where: {
      id,
    },
  })

  if (!existedJourney) {
    throw new Error("Journey not found");
  }

  if (existedJourney.userId !== userId) {
    throw new Error("You do not have permission to delete this journey");
  }

  await db.journey.delete({
    where: {
      id,
    },
  })

  return true
}


