
import { Icon } from '@iconify/react';
import { useState } from 'react';
import logo from '../assets/logo-cactus.png';
import profileSide from '../assets/profileSide.png';

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    {title: 'Dashboard', icon: 'ci:grid'},
    {title: 'Schedule', icon: 'ic:baseline-calendar-today'},
    {title: 'Insight', icon: 'fe:bar-chart', gap: true},
    {title: 'Reports', icon: 'mdi:file-document'},
    {title: 'Settings', icon: 'ci:settings', gap: true},
    {title: 'Profile', icon: 'ci:user'},
  ]
  
    return (
    <div className={`${open ? 'w-60' : 'w-20'} duration-300 h-screen p-5 pt-12 bg-[#3daaa5d7] relative`}>
          <Icon icon="ic:baseline-arrow-forward" 
              className={`absolute cursor-pointer -right-3 top-9 p-1.5 bg-[#1f104f] rounded-full w-8 h-8 ${open && 'rotate-180'}`}
              onClick={() => setOpen(!open)}
              color="white"
              />
              
          <div className='flex gap-x-4 items-center'>
            <img src={logo} alt="Logo" />
          </div>
            <ul className="pt-6">
              {Menus.map((menu, index) =>
                <li className={`text-white text-md flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[rgba(104,165,173,0.5)]  rounded-md ${menu.gap ? 'mt-9' : 'mt-2'}`}
                key={index}>
                    <Icon
                    icon={menu.icon}
                    width="24"
                    height="24"
                  />
                  <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                </li>
              
              )}
          </ul>
          <div className="flex gap-x-4 items-center mt-20">
            <img src={profileSide} className={`${open ? 'w-12 h-12' : 'w-auto h-auto '} rounded-full`} />
            <div className={`${!open && 'hidden'} origin-left duration-200 `}>
              <p className="text-md text-white font-semibold">Ana Clara</p>
              <p className="text-sm text-white">Software Developer</p>
            </div>
          </div>
          </div>
 
    );
  };


export default SideBar;