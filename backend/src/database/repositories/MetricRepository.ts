import Model from "sequelize/types/model";
import { MetricsModel } from "../../models/metrics.model";


class MetricsRepository {
  
  async createMetrics (
    userId: string,
    reviews: number,
    decksReviews: number,
    summariesReviews: number,
    metricsDate: string,
  ): Promise<Model> {
    const newDate = new Date(metricsDate);
	
    const metric = await MetricsModel.create({
		  userId: userId,
		  reviews: reviews,
		  decks_reviews: decksReviews,
		  summaries_reviews: summariesReviews,
		  metrics_date: newDate,
    });
	  
    return metric;
  };

  async list ( userId: string ): Promise<Model[]> {
    const metrics = await MetricsModel.findAll({
      where:{
        userId: userId
      }
    });

    return metrics;
  }

  async imcrementDeckReview (userId: string, metricId: string, reviews: number, deckReviews: number): Promise<void> {
	  	await MetricsModel.update(
      	{
		  		decks_reviews: deckReviews,
		  		reviews: reviews,
      	},
      	{
		  		where: {
          	id: metricId,
          	userId: userId,
		  		},
      	},
	  	);
  };

  async imcrementSummariesReview ( userId: string, metricId: string, reviews: number, summariesReviews: string ): Promise<void> {
    await MetricsModel.update(
      {
        summaries_reviews: summariesReviews,
        reviews: reviews,
      },
      {
        where: {
          id: metricId,
          userId: userId,
        },
      },
    );
  };
  
}

export default new MetricsRepository;
