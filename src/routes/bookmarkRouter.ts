import { Router } from "express";
import auth from "../middleware/auth";
import { createBookmark, getBookmarkUser, getBookmarks } from "../controller/bookmark";

const bookmarkRouter = Router();

bookmarkRouter.post("/bookmark", auth, createBookmark);
bookmarkRouter.get("/bookmarks/:journeyId", auth, getBookmarks);
bookmarkRouter.get("/bookmark/:userId", auth, getBookmarkUser);

export default bookmarkRouter;
