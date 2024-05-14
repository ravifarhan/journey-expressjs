import { Request, Response } from "express";
import * as bookmarkService from "../services/bookmark";

export const createBookmark = async (req: Request, res: Response) => {
  try {
    const { journeyId } = req.body;
    const userId = res.locals.user;

    const message = await bookmarkService.createBookmark({
      journeyId,
      userId,
    })
    res.json({
      status: true,
      message
    })
  } catch (error) {
    const err = error as unknown as Error
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

export const getBookmarks = async (req: Request, res: Response) => {
  try {
    const { journeyId } = req.params;
    const bookmarks = await bookmarkService.getBookmarks(+journeyId);

    res.json({
      status: true,
      message: "success",
      data: {
        user: bookmarks
      }
    })
  } catch (error) {
    const err = error as unknown as Error
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

export const getBookmarkUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const bookmarks = await bookmarkService.getBookmarkUser(+userId);

    res.json({
      status: true,
      message: "success",
      data: {
        bookmarks
      }
    })
  } catch (error) {
    const err = error as unknown as Error
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}


