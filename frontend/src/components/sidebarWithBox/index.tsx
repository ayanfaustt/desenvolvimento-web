import React from 'react';
import './styles.css';
import SideBar from "../sidebar";

interface SideBarWithBoxProps {
    comp: React.ReactNode
}

export default function SideBarWithBox(props : SideBarWithBoxProps){
    return(
        <main className='sidebar-content'>
            <SideBar />
            <div className="dashboard-content">
                <div className="box-center">
                    {props.comp}
                </div>
            </div>
        </main>
    )
}