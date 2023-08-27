import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

interface FlashcardListProps {
	card_name: string;
	card_content: string;
}

export default function FlashcardList(props: FlashcardListProps) {
	const [flip, setFlip] = useState(false);
	const front = useRef<HTMLInputElement>(null);
	const back = useRef<HTMLInputElement>(null);
	const [height, setHeight] = useState(0);

	const setMaxHeight = () => {
		const frontHeight = front.current ? front.current.getBoundingClientRect().height : 0;
		const backHeight = back.current ? back.current.getBoundingClientRect().height : 0;

		setHeight(Math.max(frontHeight, backHeight, 100))
	};

	useEffect(setMaxHeight, [props.card_content, props.card_name]);
	useEffect(() => {
		window.addEventListener('resize', setMaxHeight)
		return () => window.removeEventListener('resize', setMaxHeight)
	  }, []);

	return (
		<div
			className={`card ${flip ? "flip" : ""}`}
			style={{height : height }}
			onClick={() => setFlip(!flip)}>
			<div className="front" ref={front}>{props.card_name}</div>
			<div className="back" ref={back}>{props.card_content}</div>
		</div>
	)
}