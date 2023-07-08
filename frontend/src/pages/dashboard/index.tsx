import React, { useState } from 'react';
import './styles.css';
import SideBar from '../../components/sidebar';

interface DashboardPageProps {

}
export default function DashboardPage(props: DashboardPageProps) {
    return (
        <main className='sidebar-content'>
            <SideBar />
            <div className='dashboard-content'>
                <div className='box-center'>
                    <div className='content-inside'>

                        <div className='text-inside'>
                            <p className='p welcome'>Welcome, userx! </p>
                            <p className='p view'>View an overview of your progress.</p>
                        </div>

                        <div className='overview'>

                            <div className='left-content'>
                                <div className='performace'></div>

                                <div className='left-content-inside'>
                                    <div className='events'></div>
                                    <div className='usedResources'></div>
                                </div>
                            </div>

                            <div className='right-content'></div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}