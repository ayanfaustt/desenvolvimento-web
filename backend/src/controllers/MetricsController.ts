import { Request, Response } from "express";

import MetricsService from "../services/MetricsService";

class MetricsController {
  /**
	 * @description Update the user's deck review metric.
	 * @param {string} userId - req.params (string) the user id;
	 * @returns A message with status code.
	 */
  async updateDecksMetrics(req: Request, res: Response): Promise<Response> {
    try {
      const { userId: id } = req.params;

      await MetricsService.incrementDeckReview(id);

      return res.status(200).send({ message: "User metrics updated !" });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).send({ message: error.message });

      return res.status(400).send({ message: error });
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
      const { userId: id } = req.params;

      await MetricsService.incrementSummariesReview(id);

      return res.status(200).send({ message: "User metrics updated !" });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).send({ message: error.message });

      return res.status(400).send({ message: error });
    }
  }
}

export default new MetricsController();
