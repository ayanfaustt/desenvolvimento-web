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

	const bardData2 = [
		{ x: 'Sun', y: 10 || 0 },
		{ x: 'Mon', y: 12 || 0 },
		{ x: 'Tue', y: 3 || 0 },
		{ x: 'Wed', y: 4 || 0 },
		{ x: 'Thu', y: 7 || 0 },
		{ x: 'Fri', y: 1 || 0 },
		{ x: 'Sat', y: 9 || 0 },
	]


	useEffect(() => {
		getMetrics();
	}, []);

	useEffect(() => {
		countSummaries();
		countDecks();
	}, [metrics]);

	const getMetrics = async () => {
		const data = {
			
		};
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
			// metrics.sort((a,b) => new Date(a.metrics_date) - new Date(b.metrics_date));

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
							data={bardData2}
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
								{ x: "Summaries", y: summaries || 2 },
								{ x: "Decks", y: decks || 10 }
							]
						}
						colorScale={['#024959', '#A7C6D9']}
						labelRadius={({ innerRadius }) => innerRadius as number +120 }
						innerRadius={40}
						width={350}
						style={{ labels: { fill: "black" } }}
					/>
				</div>

			</div>
		</div>

	);
}