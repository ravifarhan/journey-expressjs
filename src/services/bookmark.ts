import db from "../db";

export const createBookmark = async (payload: {
  journeyId: number;
  userId: number;
}) => {
  const existedJourney = await db.journey.findFirst({
    where: {
      id: payload.journeyId,
    },
  });

  if (!existedJourney) {
    throw new Error("Journey not found");
  }

  const existedBookmark = await db.bookmark.findFirst({
    where: {
      journeyId: payload.journeyId,
      userId: payload.userId,
    },
  })

  if (existedBookmark) {
    await db.bookmark.deleteMany({
      where: {
        journeyId: payload.journeyId,
        userId: payload.userId,
      },
    });
    return "Unbookmark success";
  }

  await db.bookmark.create({
    data: {
      ...payload,
    },
  })
  return "Bookmark success";

};

export const getBookmarks = async (journeyId: number) => {
  return await db.bookmark.findMany({
    where: {
      journeyId,
    },
    include: {
      user: {
        select: {
          email: true,
          fullname: true,
        }
      }
    }
  });
}

export const getBookmarkUser = async (userId: number) => {
  return await db.bookmark.findMany({
    where: {
      userId,
    },
    include: {
      journey: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
            }
          }
        }
      }
    }
  });
}



