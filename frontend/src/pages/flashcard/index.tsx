import React from "react";
import "./styles.css";
import PageContent from "../../components/pageContent";

// interface FlashcardPageProps {
// }

const teste = [
  {
    cardName: "caneco",
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

export default function FlashcardPage(/*props: FlashcardPageProps*/) {
  return (
    <PageContent pageName='Decks' cardsContent={teste}/>
  );
}