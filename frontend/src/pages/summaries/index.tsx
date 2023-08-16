import React, { useEffect, useState } from "react";
import PageSummariesContent from "../../components/pageSummarieContent";
import { FilterTagSummaries, ListSummaries } from "../../hooks/useSummarie";
import { useUser } from "../../hooks/useContextUserId";

export default function SummariesPage() {
	const [listSummaries, setListSummaries] = useState([]);

	const { userId } = useUser();
	useEffect(() => {
		const fetchListSummaries = async () => {
			if (14) {
				await ListSummaries(14).then((res) => setListSummaries(res.data));
			};
		};
		fetchListSummaries();
	}, []);

	const fetchUpdatedListSummaries = async () => {
		if (userId) {
			await ListSummaries(userId).then((res) => setListSummaries(res.data));
		};
	};

	const fetchFilteredSummaries = async (data: object) => {
		if (userId) {
			console.log(data)
			await FilterTagSummaries(userId, data).then((res) => setListSummaries(res.data)).catch(err => console.log(err));
		};
	};

	return (
		<PageSummariesContent pageName='Summaries' cardsContent={listSummaries} onItemChanged={fetchUpdatedListSummaries} onFilter={fetchFilteredSummaries} />
	);
}