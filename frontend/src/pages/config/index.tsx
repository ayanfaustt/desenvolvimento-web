import React from 'react';
import './styles.css';
import SideBar from '../../components/sidebar';


interface ConfigPageProps {

}
export default function ConfigPage(props : ConfigPageProps){
    return(
        <main className='sidebar-content'>
            <SideBar />
            <div className="dashboard-content">
                <div className="box-center">
                    
                </div>
            </div>
        </main>
    )
}