import joi from "joi";
import { IJourney } from "../../type/app";

export const journeyValidation = joi.object<IJourney>({
  title: joi.string().required(),
  description: joi.string().required(),
});