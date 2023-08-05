import React from "react";
import PageContent from "../../components/pageContent";

// interface SummariesPageProps {
// }

const teste = [
  {
    cardName: "Teste",
    cardTag: "Mat"
  },
  {
    cardName: "Teste2",
    cardTag: "Port"
  },
  {
    cardName: "Teste3",
    cardTag: "Port"
  },
];

export default function SummariesPage(/*props: SummariesPageProps*/) {
  return (
    <PageContent pageName='Summaries' cardsContent={teste}/>
  );
}