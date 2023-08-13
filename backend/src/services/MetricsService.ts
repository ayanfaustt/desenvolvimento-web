import { Model } from "sequelize";
import MetricRepository from "../database/repositories/MetricRepository";

export interface MetricComparationModel {
	isGrowth: boolean;
	percent: number;
	}

class MetricsService {

  async create(
    userId: string,
    reviews: number,
    decksReviews: number,
    summariesReviews: number,
    metricsDate: string,
  ): Promise<void> {
    await MetricRepository.createMetrics(
      userId,
      reviews,
      decksReviews,
      summariesReviews,
      metricsDate,
    );
  }

  async incrementDeckReview(userId: string): Promise<void> {
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    const userMetrics = await MetricRepository.list(userId);
    let currentMetric = userMetrics.find(
      x => new Date(x.getDataValue("metrics_date")).getTime() === currentDate.getTime(),
    );

    if(!currentMetric){
      const newMetric = await MetricRepository.createMetrics(userId, 0, 0, 0, currentDate.toDateString());
      currentMetric = newMetric;
    }
			
    const id = currentMetric.getDataValue("id");
    const decksReviews = currentMetric.getDataValue("decks_reviews") + 1;
    const reviews = currentMetric.getDataValue("reviews") + 1;

    await MetricRepository.imcrementDeckReview(
      userId,
      id,
      reviews,
      decksReviews,
    );
  }

  async incrementSummariesReview(userId: string): Promise<void> {
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    const userMetrics = await MetricRepository.list(userId);
    let currentMetric = userMetrics.find(
      x => new Date(x.getDataValue("metrics_date")).getTime() === currentDate.getTime(),
    );

    if(!currentMetric){
      const newMetric = await MetricRepository.createMetrics(userId, 0, 0, 0, currentDate.toDateString());
      currentMetric = newMetric;
    }

    const id = currentMetric?.getDataValue("id");
    const summariesReviews = currentMetric?.getDataValue("summaries_reviews") + 1;
    const reviews = currentMetric?.getDataValue("reviews") + 1;

    await MetricRepository.imcrementSummariesReview(
      userId,
      id,
      reviews,
      summariesReviews,
    );
  }

  async metricsHistory(userId: string): Promise<MetricComparationModel> {
    const metricsHistory = await this.metricsWeekCompiler(userId);

    return metricsHistory;
  }

  private getCurrentWeekStart(): Date {
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate);
    currentWeekStart.setDate(currentWeekStart.getDate() - currentDate.getDay());
    currentWeekStart.setHours(0, 0, 0, 0);

    return currentWeekStart;
  }

  // TODO: create a similar method to previous week start
  // TODO: implemente the setHours in DateObserver
  getCurrentMetrics(userMetrics: Model[]): Model[] {
    const currentDate = new Date();
    const currentWeekStart = this.getCurrentWeekStart();

    const currentWeekScores = userMetrics.filter(
      x =>
        new Date(x.getDataValue("metrics_date")) >= currentWeekStart &&
				new Date(x.getDataValue("metrics_date")) <= currentDate,
    );

    return currentWeekScores;
  }

  getLastMetrics(userMetrics: Model[]): Model[] {
    const currentWeekStart = this.getCurrentWeekStart();
    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7);
    previousWeekStart.setHours(0, 0, 0, 0);

    const previousWeekScores = userMetrics.filter(
      score =>
        new Date(score.getDataValue("metrics_date")) >= previousWeekStart &&
				new Date(score.getDataValue("metrics_date")) < currentWeekStart,
    );

    return previousWeekScores;
  }

  private async metricsWeekCompiler(userId: string): Promise<MetricComparationModel> {
    const usermetrics = await MetricRepository.list(userId);

    const currentWeekScores = this.getCurrentMetrics(usermetrics);
    const previousWeekScores = this.getLastMetrics(usermetrics);

    const currentWeekSum = currentWeekScores.reduce(
      (sum, score) => sum + score.getDataValue("reviews"),
      0,
    );
    const previousWeekSum = previousWeekScores.reduce(
      (sum, score) => sum + score.getDataValue("reviews"),
      0,
    );
    const result = this.scoreComparation(currentWeekSum, previousWeekSum);

    return result;
  }

  private scoreComparation(currentWeek: number, previousWeek: number): MetricComparationModel {
    let isGrowth: boolean = false;
    const percent = (currentWeek * 100) / previousWeek;

    if (currentWeek > previousWeek) isGrowth = true;

    const difference = Math.abs(percent - 100);
    const result: MetricComparationModel = {
      isGrowth,
      percent: difference,
    };

    return result;
  }
}

export default new MetricsService();
