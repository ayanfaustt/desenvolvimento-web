import React, { useEffect, useState } from "react";
import PageSummariesContent from "../../components/pageSummarieContent";
import { FilterTagSummaries, ListSummaries } from "../../hooks/useSummarie";
import { useUser } from "../../hooks/useContextUserId";

export default function SummariesPage() {
	const [listSummaries, setListSummaries] = useState([]);

	const { userId } = useUser();
	useEffect(() => {
		const fetchListSummaries = async () => {
			if (userId) {
				await ListSummaries(userId).then((res) => setListSummaries(res.data));
			};
		};
		fetchListSummaries();
	}, []);

	const fetchUpdatedListSummaries = async () => {
		if (userId) {
			await ListSummaries(userId).then((res) => setListSummaries(res.data));
		};
	};

	const fetchFilteredSummaries = async (tagId: number | null) => {
		if (userId) {
			if (tagId) {
				await FilterTagSummaries(userId, tagId).then((res) => setListSummaries(res.data)).catch(err => console.log(err));
			} else if (tagId === null) {
				await ListSummaries(userId).then((res) => setListSummaries(res.data));
			}
		}
	};

	return (
		<PageSummariesContent pageName='Summaries' cardsContent={listSummaries} onItemChanged={fetchUpdatedListSummaries} onFilter={fetchFilteredSummaries} />
	);
}