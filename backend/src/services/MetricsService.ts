import MetricRepository from "../database/repositories/MetricRepository";

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

  // async scoreComparation(userId: string){
  // 	const usermetrics = await MetricRepository.list(userId);


  // }
}

export default new MetricsService;