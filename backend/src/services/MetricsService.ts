import { Model } from 'sequelize'
import MetricRepository from '../database/repositories/MetricRepository'
import { MetricComparationModel } from '../interfaces/interfaces'

class MetricsService {
	async create(
		user_id: string,
		reviews: number,
		decks_reviews: number,
		summaries_reviews: number,
		metrics_date: string,
	): Promise<void> {
		try {
			await MetricRepository.createMetrics(
				user_id,
				reviews,
				decks_reviews,
				summaries_reviews,
				metrics_date,
			)
		} catch (error) {
			throw new Error()
		}
	}

	async imcrementDeckReview(user_id: string): Promise<void> {
		try {
			const userMetrics = await MetricRepository.list(user_id)

			const id = userMetrics[userMetrics.length - 1].getDataValue('id')
			const decks_reviews =
				userMetrics[userMetrics.length - 1].getDataValue('decks_reviews') + 1
			const reviews =
				userMetrics[userMetrics.length - 1].getDataValue('reviews') + 1

			await MetricRepository.imcrementDeckReview(
				user_id,
				id,
				reviews,
				decks_reviews,
			)
		} catch (error) {
			throw new Error()
		}
	}

	async imcrementSummariesReview(user_id: string): Promise<void> {
		try {
			const userMetrics = await MetricRepository.list(user_id)

			const currentMetric = userMetrics.find(
				(x) => new Date(x.getDataValue('metrics_date')),
			)

			if (currentMetric) {
				const id = currentMetric.getDataValue('id')
				const summaries_reviews =
					currentMetric.getDataValue('summaries_reviews') + 1
				const reviews = currentMetric.getDataValue('reviews') + 1

				await MetricRepository.imcrementSummariesReview(
					user_id,
					id,
					reviews,
					summaries_reviews,
				)
			} else {
				const id = userMetrics[userMetrics.length - 1].getDataValue('id')
				const summaries_reviews =
					userMetrics[userMetrics.length - 1].getDataValue(
						'summaries_reviews',
					) + 1
				const reviews =
					userMetrics[userMetrics.length - 1].getDataValue('reviews') + 1

				await MetricRepository.imcrementSummariesReview(
					user_id,
					id,
					reviews,
					summaries_reviews,
				)
			}
		} catch (error) {
			throw new Error()
		}
	}

	async metricsHistory(userId: string): Promise<MetricComparationModel> {
		try {
			const metricsHistory = await this.metricsWeekCompiler(userId)

			return metricsHistory
		} catch (error) {
			throw new Error()
		}
	}

	private getCurrentWeekStart(): Date {
		const currentDate = new Date()
		const currentWeekStart = new Date(currentDate)
		currentWeekStart.setDate(currentWeekStart.getDate() - currentDate.getDay())
		currentWeekStart.setHours(0, 0, 0, 0)

		return currentWeekStart
	}

	// TODO: create a similar method to previous week start
	// TODO: implemente the setHours in DateObserver
	getCurrentMetrics(userMetrics: Model[]): Model[] {
		const currentDate = new Date()
		const currentWeekStart = this.getCurrentWeekStart()

		const currentWeekScores = userMetrics.filter(
			(x) =>
				new Date(x.getDataValue('metrics_date')) >= currentWeekStart &&
				new Date(x.getDataValue('metrics_date')) <= currentDate,
		)

		return currentWeekScores
	}

	getLastMetrics(userMetrics: Model[]): Model[] {
		const currentWeekStart = this.getCurrentWeekStart()
		const previousWeekStart = new Date(currentWeekStart)
		previousWeekStart.setDate(previousWeekStart.getDate() - 7)
		previousWeekStart.setHours(0, 0, 0, 0)

		const previousWeekScores = userMetrics.filter(
			(score) =>
				new Date(score.getDataValue('metrics_date')) >= previousWeekStart &&
				new Date(score.getDataValue('metrics_date')) < currentWeekStart,
		)

		return previousWeekScores
	}

	private async metricsWeekCompiler(
		userId: string,
	): Promise<MetricComparationModel> {
		try {
			const usermetrics = await MetricRepository.list(userId)

			const currentWeekScores = this.getCurrentMetrics(usermetrics)
			const previousWeekScores = this.getLastMetrics(usermetrics)

			const currentWeekSum = currentWeekScores.reduce(
				(sum, score) => sum + score.getDataValue('reviews'),
				0,
			)
			const previousWeekSum = previousWeekScores.reduce(
				(sum, score) => sum + score.getDataValue('reviews'),
				0,
			)
			const result = this.scoreComparation(currentWeekSum, previousWeekSum)

			return result
		} catch (error) {
			throw new Error()
		}
	}

	private scoreComparation(
		currentWeek: number,
		previousWeek: number,
	): MetricComparationModel {
		let isGrowth: boolean = false
		const percent = (currentWeek * 100) / previousWeek

		if (currentWeek > previousWeek) isGrowth = true

		const difference = Math.abs(percent - 100)
		const result: MetricComparationModel = {
			isGrowth,
			percent: difference,
		}

		return result
	}
}

export default new MetricsService()
