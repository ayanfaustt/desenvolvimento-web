import React from 'react';
import './styles.css';
import { useUser } from '../../hooks/useContextUserId';

interface DashboardPageProps {

}

export default function DashboardPage(props: DashboardPageProps) {
    const { userId } = useUser();
    return (

        <div className='content-inside'>
            {userId}
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

    )
}