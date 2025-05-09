import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import Projects from '../pages/Projects';
const Dashboard = () => {

  //get react-router-dom query params
  const [search, setSearch] = useSearchParams();
  const tab = search.get('tab') || '';

  useEffect(() => {
    console.log(tab);
  }, [search]);


  return (
    <div className='flex flex-col md:flex-row'>
      <div className='md:w-64 md:min-h-screen bg-white-50 dark:bg-gray-800'>
        {/* Sidebar */}
        <DashSidebar tab={tab}/>
      </div>
      {/* profile tab */}
      {tab === 'profile' && <DashProfile/> }
      {tab === 'projects' && <Projects/>}
    </div>
  )
}

export default Dashboard