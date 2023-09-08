import React, { useEffect, useState } from "react";
import "./styles.css";
import { useUser } from "../../hooks/useContextUserId";
import axios from "axios";
import { Toast } from "react-bootstrap";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryPie } from "victory";


export default function DashboardPage() {

	const { userId, token, username } = useUser();
	const [metrics, setMetrics] = useState<any[]>([]);
	const [summaries, setSummaries] = useState<any>();
	const [decks, setDecks] = useState<any>();
	const [reviews, setReviews] = useState<any>([]);
	const [percent, setPercent] = useState<any>();
	const [isGrow, setIsGrow] = useState<any>();

	const barData = [
		{ x: 'Sun', y: reviews[0] || 0 },
		{ x: 'Mon', y: reviews[1] || 0 },
		{ x: 'Tue', y: reviews[2] || 0 },
		{ x: 'Wed', y: reviews[3] || 0 },
		{ x: 'Thu', y: reviews[4] || 0 },
		{ x: 'Fri', y: reviews[5] || 0 },
		{ x: 'Sat', y: reviews[6] || 0 },
	]


	useEffect(() => {
		getMetrics();
	}, []);

	useEffect(() => {
		countSummaries();
		countDecks();
	}, [metrics]);

	const getMetrics = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/user/metrics/${username}`,
				{
					headers: {
						'Authorization': `Bearer ${token}`,
					}
				}
			);

			setMetrics(response.data.user.metrics);
			setPercent(response.data.metricsInfo.percent);
			setIsGrow(response.data.metricsInfo.isGrowth);
			metrics.sort((a, b) => {
				const dateA = new Date(a.metrics_date);
				const dateB = new Date(b.metrics_date);
			  
				return dateA.getTime() - dateB.getTime();
			  });
			  
			const reviewsData = response.data.user.metrics.map((x: any) => x.reviews);
			setReviews(reviewsData);
		} catch (error) {
			console.error(error)
		};

	}

	const countSummaries = () => {
		const sum = metrics.reduce((acc, current) => {
			return acc + current.summaries_reviews;
		}, 0);
		setSummaries(sum);
	}

	const countDecks = () => {
		const sum = metrics.reduce((acc, current) => {
			return acc + current.decks_reviews;
		}, 0);
		setDecks(sum);
	}
	return (

		<div className='content-inside'>

			<div className='text-inside'>
				<p className='p welcome'>Welcome, {username}! </p>
				<p className='p view'>View an overview of your progress.</p>
			</div>

			<div className='overview'>

				<div className='right-content'>
					<VictoryChart
						width={350}
					>
						<VictoryBar
							data={barData}
							style={{ data: { fill: "#024959" } }}

						/>
						<VictoryAxis style={{
							axis: { stroke: "transparent" },
							ticks: { stroke: "transparent" },
						}} />
					</VictoryChart>
				</div>

				<div className='right-content'>
					<VictoryPie
						data={
							[
								{ x: "Summaries", y: summaries || 1 },
								{ x: "Decks", y: decks || 1 }
							]
						}
						colorScale={['#024959', '#A7C6D9']}
						labelRadius={({ innerRadius }) => innerRadius as number + 90}
						innerRadius={70}
						width={550}
						style={{ labels: { fill: "black" } }}
					/>
				</div>

			</div>
		</div>

	);
}