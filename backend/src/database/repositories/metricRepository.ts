import { MetricsModel } from "../../models/metrics.model";


class MetricsRepository {
  
  async createMetrics (
    user_id: string,
    reviews: number,
    decks_reviews: number,
    summaries_reviews: number,
    metrics_date: string,
  ): Promise<void> {
    const newDate = new Date(metrics_date);
	  
    const metric = await MetricsModel.create({
		  userId: user_id,
		  reviews: reviews,
		  decks_reviews: decks_reviews,
		  summaries_reviews: summaries_reviews,
		  metrics_date: newDate,
    });
	  
    if (!metric) throw new Error("Can not update the user metrics");
  };

  async imcrementDeckReview (user_id: string): Promise<void> {
    try {
	  const userMetrics = await MetricsModel.findAll({
        where: {
		  userId: user_id,
        },
	  });
  
	  const id = userMetrics[userMetrics.length - 1].getDataValue("id");
	  const decks_reviews = userMetrics[userMetrics.length - 1].getDataValue("decks_reviews");
	  const reviews =userMetrics[userMetrics.length - 1].getDataValue("reviews");
  
	  await MetricsModel.update(
        {
		  decks_reviews: decks_reviews + 1,
		  reviews: reviews + 1,
        },
        {
		  where: {
            id: id,
            userId: user_id,
		  },
        },
	  );
    } catch (error) {
	  throw new Error();
    }
  };

  async imcrementSummariesReview (
    user_id: string,
  ): Promise<void> {
    try {
	  const userMetrics = await MetricsModel.findAll({
        where: {
		  userId: user_id,
        },
	  });
  
	  const id = userMetrics[userMetrics.length - 1].getDataValue("id");
	  const summaries_reviews = userMetrics[userMetrics.length - 1].getDataValue("summaries_reviews",);
	  const reviews = userMetrics[userMetrics.length - 1].getDataValue("reviews");
  
	  await MetricsModel.update(
        {
		  summaries_reviews: summaries_reviews + 1,
		  reviews: reviews + 1,
        },
        {
		  where: {
            id: id,
            userId: user_id,
		  },
        },
	  );
    } catch (error) {
		  throw new Error();
    }
  };
  
}

export default new MetricsRepository;