import Model from "sequelize/types/model";
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

  async list ( userId: string ): Promise<Model[]> {
    try {
      const metrics = MetricsModel.findAll({
        where:{
          userId: userId
        }
      });

      return metrics;
    } catch (error) {
      throw new Error("The operation can not be completed");
    }
  }

  async imcrementDeckReview (user_id: string, metricId: string, reviews: number, deckReviews: number): Promise<void> {
    try {
	  	await MetricsModel.update(
      	{
		  		decks_reviews: deckReviews,
		  		reviews: reviews,
        },
        {
		  		where: {
            id: metricId,
            userId: user_id,
		  		},
        },
	  	);
    } catch (error) {
	  	throw new Error("The operation can not be completed");
    }
  };

  async imcrementSummariesReview ( user_id: string, metricId: string, reviews: number, summariesReviews: string ): Promise<void> {
    try {
      await MetricsModel.update(
        {
          summaries_reviews: summariesReviews,
          reviews: reviews,
        },
        {
          where: {
            id: metricId,
            userId: user_id,
          },
        },
      );
    } catch (error) {
		  throw new Error("The operation can not be completed");
    }
  };
  
}

export default new MetricsRepository;
