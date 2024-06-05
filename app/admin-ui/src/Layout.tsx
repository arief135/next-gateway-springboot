import employeeIcon from '@ui5/webcomponents-icons/dist/employee.js';
import { Avatar, ShellBar } from '@ui5/webcomponents-react';
import { Navigate, Outlet } from 'react-router-dom';
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/chain-link.js";
import "@ui5/webcomponents-icons/dist/history.js";
import { SideMenu } from './components/SideMenu';
import { useEffect, useState } from 'react';
import { isAuthenticated } from './services/Auth.service';
import { Nullable } from '@ui5/webcomponents-react/wrappers';

function Layout() {

  const [authenticated, setAuthenticated] = useState<Nullable<boolean>>(null)

  useEffect(() => {

    isAuthenticated().then((auth) => {
      setAuthenticated(auth)
    })

  }, [])

  if (authenticated === null) {
    return <></>
  }

  if (authenticated === false) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <div className='applicationWrapper'>
        <div className='headerWrapper'>
          <ShellBar
            logo={
              <img
                src="https://raw.githubusercontent.com/SAP/ui5-webcomponents-react/main/assets/ui5-logo.svg"
                alt={'UI5 Web Components for React logo'}
              />
            }
            primaryTitle="Admin Dashboard"
            profile={<Avatar icon={employeeIcon} />}
          />
        </div>

        <div className='bodyWrapper'>
          <div className='sidebarWrapper'>
            <SideMenu />
          </div>
          <div className='contentWrapper'>
            <Outlet />
          </div>
        </div>
      </div>

    </>
  );
}

export default Layout;
