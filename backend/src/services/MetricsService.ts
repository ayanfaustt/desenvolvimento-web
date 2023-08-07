import MetricRepository from "../database/repositories/MetricRepository";
import { MetricComparationModel } from "../interfaces/interfaces";

class MetricsService{

  async create (
    user_id: string,
    reviews: number,
    decks_reviews: number,
    summaries_reviews: number,
    metrics_date: string,
  ): Promise<void> {
    try {
      await MetricRepository.createMetrics(user_id, reviews, decks_reviews, summaries_reviews, metrics_date);
    } catch (error) {
      throw new Error();
    }
  };

  async imcrementDeckReview (user_id: string): Promise<void> {
    try {
      const userMetrics = await MetricRepository.list(user_id); 
		
      const id = userMetrics[userMetrics.length - 1].getDataValue("id");
      const decks_reviews = userMetrics[userMetrics.length - 1].getDataValue("decks_reviews") + 1;
      const reviews =userMetrics[userMetrics.length - 1].getDataValue("reviews") + 1;
		
      await MetricRepository.imcrementDeckReview(user_id, id, reviews, decks_reviews);
    } catch (error) {
	  	throw new Error();
    }
  };

  async imcrementSummariesReview (user_id: string): Promise<void> {
    try {
      const userMetrics = await MetricRepository.list(user_id);
		
      const id = userMetrics[userMetrics.length - 1].getDataValue("id");
      const summaries_reviews = userMetrics[userMetrics.length - 1].getDataValue("summaries_reviews",) + 1;
      const reviews = userMetrics[userMetrics.length - 1].getDataValue("reviews") + 1;

      await MetricRepository.imcrementSummariesReview(user_id, id, reviews, summaries_reviews);
  
    } catch (error) {
		  throw new Error();
    }
  };

  async metricsHistory(userId: string): Promise<MetricComparationModel> {
    try {
	    const metricsHistory = await this.metricsWeekCompiler(userId);

	    return metricsHistory;
    } catch (error) {
      throw new Error();
    }

  }

  private async metricsWeekCompiler(userId: string): Promise<MetricComparationModel>{
    try {
		 	const usermetrics = await MetricRepository.list(userId);
      const currentDate = new Date();
      const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
		
      const currentWeekScores = usermetrics.filter(
        (score) => new Date(score.getDataValue("metrics_date")) >= oneWeekAgo && new Date(score.getDataValue("metrics_date")) <= currentDate
      );
		
      const previousWeekScores = usermetrics.filter(
        (score) => new Date(score.getDataValue("metrics_date")) >= new Date(oneWeekAgo.getTime() - 7 * 24 * 60 * 60 * 1000) && new Date(score.getDataValue("metrics_date")) <= oneWeekAgo
      );
		
      const currentWeekSum = currentWeekScores.reduce((sum, score) => sum + score.getDataValue("reviews"), 0);
      const previousWeekSum = previousWeekScores.reduce((sum, score) => sum + score.getDataValue("reviews"), 0);
      const result = this.scoreComparation( currentWeekSum, previousWeekSum);
	
      return result;
	 } catch (error) {
      throw new Error();
	 }
  }

  private scoreComparation(currentWeek: number, previousWeek: number): MetricComparationModel {
    let isGrowth: boolean = false;
    const percent = (currentWeek * 100) / previousWeek;

    if (currentWeek > previousWeek) isGrowth = true;

    const difference = Math.abs(percent - 100);
    const result: MetricComparationModel = {
      isGrowth: isGrowth,
      percent: difference   
    };

    return result;

  }
}

export default new MetricsService;