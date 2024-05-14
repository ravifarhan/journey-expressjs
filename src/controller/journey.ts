import { Request, Response } from "express";
import * as journeyService from "../services/journey";

export const createJourney = async (req: Request, res: Response) => {
  try {
    const { body, file } = req;
    body.userId = res.locals.user;

    const journey = await journeyService.createJourney(
      body,
      file as unknown as Express.Multer.File);
    res.json({
      status: true,
      message: "success",
      data: journey,
    });
  } catch (error) {
    const err = error as unknown as Error;
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getAllJourney = async (req: Request, res: Response) => {
  try {
    const result = await journeyService.getAllJourney();
    res.json({
      status: true,
      message: "success",
      data: result,
    });
  } catch (error) {
    const err = error as unknown as Error;
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

export const getJourney = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await journeyService.getJourney(+id);
    res.json({
      status: true,
      message: "success",
      data: result,
    });
  } catch (error) {
    const err = error as unknown as Error;
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

export const getUserJourney = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await journeyService.getUserJourney(+userId);
    res.json({
      status: true,
      message: "success",
      data: result,
    });
  } catch (error) {
    const err = error as unknown as Error;
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

export const deleteJourney = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = res.locals.user;

    console.log("iddddd", id, "user iddddd", userId);
    const result = await journeyService.deleteJourney(+id, userId);
    res.json({
      status: true,
      message: "success",
      data: result,
    });
  } catch (error) {
    const err = error as unknown as Error;
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}