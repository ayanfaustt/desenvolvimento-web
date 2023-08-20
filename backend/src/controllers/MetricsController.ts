import { Request, Response } from "express";
import { UserErrorMessages } from "../expcetions/messages";
import errorHandler from "../expcetions/returnError";
import MetricsService from "../services/MetricsService";

class MetricsController {
  /**
	 * @description Update the user's deck review metric.
	 * @param {string} userId - req.params (string) the user id;
	 * @returns A message with status code.
	 */
  async updateDecksMetrics(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      if(!userId)
        throw new Error(UserErrorMessages.USER_ID_NULL);

      await MetricsService.incrementDeckReview(userId);

      return res.status(200).send({ message: "User metrics updated !" });
    } catch (error) {
      return errorHandler(error, res);
    }
  }

  /**
	 * @description Update the user's summarie review metric.
	 * @param {string} userId - req.params (string) the user id;
	 * @returns A message with status code.
	 */
  async updatedSummariesMetrics(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const { userId } = req.params;

      if(!userId)
        throw new Error(UserErrorMessages.USER_ID_NULL);

      await MetricsService.incrementSummariesReview(userId);

      return res.status(200).send({ message: "User metrics updated !" });
    } catch (error) {
      return errorHandler(error, res);
    }
  }
}

export default new MetricsController();
