import React, { useEffect, useState } from "react";
import PageContent from "../../components/pageContent";
import { ListSummaries } from "../../hooks/useSummarie";
import { useUser } from "../../hooks/useContextUserId";

interface ItemType {
    id: number;
}

export default function SummariesPage() {
	const [listSummaries, setListSummaries] = useState([]);

	const { userId } = useUser();
	useEffect(() => {
		const fetchListSummaries = async () =>{
			if(14) {
				await ListSummaries(14).then((res) => setListSummaries(res.data));
			};
		};
		fetchListSummaries();
	},[]);

	const fetchUpdatedListSummaries = async () => {
		if (userId) {
			await ListSummaries(userId).then((res) => setListSummaries(res.data));
		};
	};

  return (
    <PageContent pageName='Summaries' cardsContent={listSummaries} onItemUpdated={fetchUpdatedListSummaries} />
  );
}