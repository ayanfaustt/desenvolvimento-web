import React from 'react';
import './styles.css';
import SideBar from '../../components/sidebar';
import Cards from '../../components/card';
import PageName from '../../components/pageName';

interface CardInfo {
    cardName: string;
    cardTag: string;
};

interface PageContentProps {
    pageName: string;
    cardsContent: CardInfo[];
};

export default function PageContent(props: PageContentProps) {
    return (
        <main className='sidebar-content'>
            <SideBar />
            <div className='pageContent'>
                <PageName name={props.pageName} />
                <div className='cards'>
                    {props.cardsContent.map((content) => (
                        <Cards name={content.cardName} tag={content.cardTag} />
                    )
                    )}
                </div>
            </div>
        </main>
    );
}