import React from 'react';
import './styles.css';
import SideBar from '../../components/sidebar';
import Cards from '../../components/Card';


interface DeckPageProps {

}
export default function DeckPage(props: DeckPageProps) {
    return (
        <main className='sidebar-deck'>
            <SideBar />
            <div className='decks'>
                <h1>Decks</h1>
                <Cards name='materia x' tag='matemática'/>
            </div>
        </main>
    )
}