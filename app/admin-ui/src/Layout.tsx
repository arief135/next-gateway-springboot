import employeeIcon from '@ui5/webcomponents-icons/dist/employee.js';
import { Avatar, ShellBar, SideNavigation, SideNavigationItem, SideNavigationSubItem } from '@ui5/webcomponents-react';
import { Navigate, Outlet, redirect } from 'react-router-dom';
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/calendar.js";
import "@ui5/webcomponents-icons/dist/chain-link.js";
import "@ui5/webcomponents-icons/dist/history.js";
import { useToken } from './Auth';

function Layout() {

  const { token, clearToken } = useToken()

    if (!token) {
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
            primaryTitle="UI5 Web Components for React Template"
            profile={<Avatar icon={employeeIcon} />}
          />
        </div>

        <div className='bodyWrapper'>
          <div className='sidebarWrapper'>
            <SideNavigation
              fixedItems={<><SideNavigationItem href="https://www.sap.com/index.html" icon="chain-link" target="_blank" text="External Link" /><SideNavigationItem icon="history" text="History" /></>}
              onSelectionChange={function _a() { }}
              style={{ borderRadius: 0, border: 0, boxShadow: 'none' }}
            >
              <SideNavigationItem
                icon="home"
                text="Home"
              />
              <SideNavigationItem
                expanded
                icon="group"
                text="People"
              >
                <SideNavigationSubItem text="From My Team" />
                <SideNavigationSubItem text="From Other Teams" />
              </SideNavigationItem>
              <SideNavigationItem
                icon="locate-me"
                selected
                text="Locations"
              />
              <SideNavigationItem
                icon="calendar"
                text="Events"
              >
                <SideNavigationSubItem text="Local" />
                <SideNavigationSubItem text="Others" />
              </SideNavigationItem>
            </SideNavigation>
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
