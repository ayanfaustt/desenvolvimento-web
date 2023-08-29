import React, { useEffect, useState } from "react";
import PageSummariesContent from "../../components/pageSummarieContent";
import { FilterTagSummaries, ListSummaries } from "../../hooks/useSummarie";
import { useUser } from "../../hooks/useContextUserId";

export default function SummariesPage() {
	const [listSummaries, setListSummaries] = useState([]);
	const { userId, token } = useUser();

	useEffect(() => {
		const fetchListSummaries = async () => {
			if (userId && token) {
				await ListSummaries(userId, token).then((res) => setListSummaries(res.data));
			};
		};
		fetchListSummaries();
	}, []);

	const fetchUpdatedListSummaries = async () => {
		if (userId && token) {
			await ListSummaries(userId, token).then((res) => setListSummaries(res.data));
		};
	};

	const fetchFilteredSummaries = async (tagId: number | null) => {
		if (userId && token) {
			if (tagId) {
				await FilterTagSummaries(userId, tagId, token).then((res) => setListSummaries(res.data)).catch(err => console.log(err));
			} else if (tagId === null) {
				await ListSummaries(userId, token).then((res) => setListSummaries(res.data));
			}
		}
	};

	return (
		<PageSummariesContent pageName='Summaries' cardsContent={listSummaries} onItemChanged={fetchUpdatedListSummaries} onFilter={fetchFilteredSummaries} />
	);
}