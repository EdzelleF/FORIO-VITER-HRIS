import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard, MdTimer } from 'react-icons/md';
import {
  FaClipboardCheck,
  FaBusinessTime,
  FaUsers,
  FaCalendarAlt,
  FaNewspaper,
  FaCog,
  FaBook,
} from 'react-icons/fa';

import { FaBuildingUser } from 'react-icons/fa6';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { PiCaretDown } from 'react-icons/pi';
import { HiSpeakerphone } from 'react-icons/hi';
import { GiPayMoney } from 'react-icons/gi';
import { StoreContext } from '../store/StoreContext';

const Navigation = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const scrollRef = React.useRef(null);
  const leaveAvailableRef = React.useRef(null);
  const workScheduleRef = React.useRef(null);
  const userManualRef = React.useRef(null);

  const isMobileOrTablet = window.matchMedia('(max-width:1027px)').matches;

  const link = '/developer';
  const menu = '';
  const submenu = '';

  const setIsSearch = (value) => ({
    type: 'SET_IS_SEARCH',
    payload: value,
  });

  const handleShowNavigation = () => {};
  const handleScroll = () => {};
  const handleLeaveOpen = () => {};
  const handleKpiOpen = () => {};
  const handlePayrollOpen = () => {};
  const handleSettingsOpen = () => {};
  const isNewFeatureShow = () => false;

  const whatsNewCodeItemLeaveAvailable = '';
  const whatsNewCodeNavWorkSchedule = '';
  const whatsNewCodeNavUserManual = '';

  return (
    <>
      <div className="print:hidden">
        <nav
          className={`${
            store.isShow ? 'translate-x-0' : '-translate-x-56'
          } duration-200 ease-in fixed z-40 overflow-y-auto w-[14rem] print:hidden py-3 uppercase pt-[76px]`}
          ref={scrollRef}
          onScroll={(e) => handleScroll(e)}
        >
          <div className="text-sm text-white flex flex-col justify-between h-full">
            <ul>
              <li
                className={`${
                  menu === 'overview' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 pl-3`}
                onClick={() => dispatch(setIsSearch(false))}
              >
                <Link
                  to={`${link}/overview`}
                  className="w-full flex items-center !px-2 !py-1 justify-start tooltip-navigation"
                  onClick={handleShowNavigation}
                  data-tooltip="overview"
                >
                  <MdDashboard className="w-4 h-4 mr-4" />
                  <span>Overview</span>
                </Link>
              </li>

              <li
                className={`${
                  menu === 'time' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 pl-3`}
                onClick={() => dispatch(setIsSearch(false))}
              >
                <Link
                  to={`${link}/time`}
                  className="w-full flex items-center !px-2 !py-1 justify-start tooltip-navigation"
                  onClick={handleShowNavigation}
                  data-tooltip="Time"
                >
                  <MdTimer className="w-4 h-4 mr-4" />
                  <span>Time</span>
                </Link>
              </li>

              <li
                className={`${
                  menu === 'task' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 pl-3`}
                onClick={() => dispatch(setIsSearch(false))}
              >
                <Link
                  to={`${link}/task`}
                  className="w-full flex items-center !px-2 !py-1 justify-start tooltip-navigation"
                  onClick={handleShowNavigation}
                  data-tooltip="Task"
                >
                  <FaClipboardCheck className="w-4 h-4 mr-4" />
                  <span>Task</span>
                </Link>
              </li>

              <li
                className={`${
                  menu === 'leave' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 cursor-pointer pl-3`}
                onClick={handleLeaveOpen}
              >
                <div
                  className="w-full flex items-center justify-between !px-2 !py-1 tooltip-navigation"
                  data-tooltip="Leave"
                >
                  <BsFillCalendarEventFill className="mr-4 w-4 h-4" />
                  <div className="flex justify-between items-center w-full">
                    <span className="ml-0.5">Leave</span>
                    <PiCaretDown
                      className={`mr-2 ${
                        !store.isLeaveOpen
                          ? 'rotate-0 duration-200'
                          : 'rotate-180 duration-200'
                      }`}
                    />
                  </div>
                </div>
              </li>

              {store.isLeaveOpen && (
                <ul className="ml-12 mb-2 text-xs capitalize">
                  <li>
                    <Link
                      className={`${
                        submenu === 'fbs-application-leave'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/leave/fbs-application-leave`}
                      onClick={handleShowNavigation}
                    >
                      <span>FBS Application</span>
                    </Link>
                  </li>
                  <li ref={leaveAvailableRef}>
                    <Link
                      className={`${
                        submenu === 'fbs-available-leave' ||
                        isNewFeatureShow(store, [whatsNewCodeItemLeaveAvailable])
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/leave/fbs-available-leave`}
                      onClick={handleShowNavigation}
                    >
                      <span>FBS Available</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'application-leave'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/leave/application-leave`}
                      onClick={handleShowNavigation}
                    >
                      <span>Application</span>
                    </Link>
                  </li>
                  <li ref={leaveAvailableRef}>
                    <Link
                      className={`${
                        submenu === 'available-leave' ||
                        isNewFeatureShow(store, [whatsNewCodeItemLeaveAvailable])
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/leave/available-leave`}
                      onClick={handleShowNavigation}
                    >
                      <span>Available</span>
                    </Link>
                  </li>
                </ul>
              )}

              <li
                className={`${
                  menu === 'overtime' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 pl-3`}
                onClick={() => dispatch(setIsSearch(false))}
              >
                <Link
                  to={`${link}/overtime`}
                  className="w-full flex items-center !px-2 !py-1 justify-start tooltip-navigation"
                  onClick={handleShowNavigation}
                  data-tooltip="overtime"
                >
                  <FaBusinessTime className="mr-4 w-4 h-4" />
                  <span>Overtime</span>
                </Link>
              </li>

              <li
                className={`${
                  menu === 'employees' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 pl-3`}
                onClick={() => dispatch(setIsSearch(false))}
              >
                <Link
                  to={`${link}/employees`}
                  className="w-full flex items-center !px-2 !py-1 justify-start tooltip-navigation"
                  onClick={handleShowNavigation}
                  data-tooltip="Employees"
                >
                  <FaUsers className="mr-4 w-4 h-4" />
                  <span>Employees</span>
                </Link>
              </li>

              <li
                className={`${
                  menu === 'work-from-home' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 pl-3`}
                onClick={() => dispatch(setIsSearch(false))}
              >
                <Link
                  to={`${link}/work-from-home`}
                  className="w-full flex items-center !px-2 !py-1 justify-start tooltip-navigation group"
                  onClick={handleShowNavigation}
                  data-tooltip="work from home"
                >
                  <FaUsers className="w-4 h-4 mr-4" />
                  <span>work from home</span>
                </Link>
              </li>

              <li
                className={`${
                  menu === 'subscriber-client' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 cursor-pointer pl-3`}
                onClick={() => dispatch(setIsSearch(false))}
              >
                <Link
                  to={`${link}/subcriber-client`}
                  className="w-full flex items-center !px-2 !py-1 justify-start tooltip-navigation"
                  onClick={handleShowNavigation}
                  data-tooltip="Client"
                >
                  <FaBuildingUser className="w-4 h-4 mr-4" />
                  <span>Client</span>
                </Link>
              </li>

              <li
                className={`${
                  menu === 'announcement' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 cursor-pointer pl-3`}
                onClick={() => dispatch(setIsSearch(false))}
              >
                <Link
                  to={`${link}/announcement`}
                  className="w-full flex items-center !px-2 !py-1 justify-start tooltip-navigation"
                  onClick={handleShowNavigation}
                  data-tooltip="Announcement"
                >
                  <HiSpeakerphone className="w-4 h-4 mr-4" />
                  <span>Announcement</span>
                </Link>
              </li>

              <li
                className={`${
                  menu === 'calendar-rd-leave' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 cursor-pointer pl-3`}
                onClick={() => dispatch(setIsSearch(false))}
              >
                <Link
                  to={`${link}/calendar-rd-leave`}
                  className="w-full flex items-center !px-2 !py-1 justify-start tooltip-navigation"
                  onClick={handleShowNavigation}
                  data-tooltip="Calendar Rest Day and Leave"
                >
                  <FaCalendarAlt className="w-4 h-4 mr-4" />
                  <span>Calendar RD & L</span>
                </Link>
              </li>

              <li
                className={`${
                  menu === 'work-schedule' ||
                  isNewFeatureShow(store, [whatsNewCodeNavWorkSchedule])
                    ? 'active'
                    : 'hover:bg-secondary/30'
                } mb-2 cursor-pointer pl-3`}
                onClick={() => dispatch(setIsSearch(false))}
                ref={workScheduleRef}
              >
                <Link
                  to={`${link}/work-schedule`}
                  className="w-full flex items-center !px-2 !py-1 justify-start tooltip-navigation group"
                  onClick={handleShowNavigation}
                  data-tooltip="Client"
                >
                  <FaBuildingUser className="w-4 h-4 mr-4" />
                  <span>Work Schedule</span>
                </Link>
              </li>

              <li
                className={`${
                  menu === 'kpi' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 cursor-pointer pl-3`}
                onClick={handleKpiOpen}
              >
                <div
                  className="w-full flex items-center justify-between !px-2 !py-1 tooltip-navigation group"
                  data-tooltip="kpi"
                >
                  <FaNewspaper className="w-4 h-4 mr-4" />
                  <div className="flex justify-between items-center w-full">
                    <span className="ml-0.5">Kpi</span>
                    <PiCaretDown
                      className={`mr-2 ${
                        !store.isKpiOpen
                          ? 'rotate-0 duration-200'
                          : 'rotate-180 duration-200'
                      }`}
                    />
                  </div>
                </div>
              </li>

              {store.isKpiOpen && (
                <ul className="ml-12 mb-2 text-xs capitalize">
                  <li>
                    <Link
                      className={`${
                        submenu === 'kpi-evaluation'
                          ? 'submenu-active !pointer-events-auto'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/kpi-eval`}
                      onClick={handleShowNavigation}
                    >
                      <span>Evaluation</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'kpi-performance-rating'
                          ? 'submenu-active !pointer-events-auto'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/kpi-performance-rating`}
                      onClick={handleShowNavigation}
                    >
                      <span>Performance Rating</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'kpi-evaluation-log'
                          ? 'submenu-active !pointer-events-auto'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/kpi-evaluation-log`}
                      onClick={handleShowNavigation}
                    >
                      <span>Log</span>
                    </Link>
                  </li>
                </ul>
              )}

              <li
                className={`${
                  menu === 'payroll' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 cursor-pointer pl-3`}
                onClick={handlePayrollOpen}
              >
                <div
                  className="w-full flex items-center justify-between !px-2 !py-1 tooltip-navigation"
                  data-tooltip="Payroll"
                >
                  <GiPayMoney className="mr-4 w-4 h-4" />
                  <div className="flex justify-between items-center w-full">
                    <span className="ml-0.5">Payroll</span>
                    <PiCaretDown
                      className={`mr-2 ${
                        !store.isPayrollOpen
                          ? 'rotate-0 duration-200'
                          : 'rotate-180 duration-200'
                      }`}
                    />
                  </div>
                </div>
              </li>

              {store.isPayrollOpen && (
                <ul className="ml-12 mb-2 text-xs capitalize">
                  <li>
                    <Link
                      className={`${
                        submenu === 'payroll-settings'
                          ? 'submenu-active !pointer-events-auto'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/payroll-settings`}
                      onClick={handleShowNavigation}
                    >
                      <span>Settings</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'payroll-holiday'
                          ? 'submenu-active !pointer-events-auto'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/payroll/holiday`}
                      onClick={handleShowNavigation}
                    >
                      <span>Holiday</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'payroll-run-list'
                          ? 'submenu-active !pointer-events-auto'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/payroll/payroll-run-list`}
                      onClick={handleShowNavigation}
                    >
                      <span>Run List</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'payroll-report'
                          ? 'submenu-active !pointer-events-auto'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/payroll/report`}
                      onClick={handleShowNavigation}
                    >
                      <span>Report</span>
                    </Link>
                  </li>
                </ul>
              )}

              <li
                className={`${
                  menu === 'settings' ? 'active' : 'hover:bg-secondary/30'
                } mb-2 cursor-pointer pl-3`}
                onClick={handleSettingsOpen}
              >
                <div
                  className="w-full flex items-center justify-between !px-2 !py-1 tooltip-navigation"
                  data-tooltip="Settings"
                >
                  <FaCog className="mr-4 w-4 h-4" />
                  <div className="flex justify-between items-center w-full">
                    <span className="ml-0.5">Settings</span>
                    <PiCaretDown
                      className={`mr-2 ${
                        !store.isSettingsOpen
                          ? 'rotate-0 duration-200'
                          : 'rotate-180 duration-200'
                      }`}
                    />
                  </div>
                </div>
              </li>

              {store.isSettingsOpen && (
                <ul className="ml-12 mb-2 text-xs capitalize">
                  <li>
                    <Link
                      className={`${
                        submenu === 'users'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/users`}
                      onClick={handleShowNavigation}
                    >
                      <span>Users</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'subscriber'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/subscriber`}
                      onClick={handleShowNavigation}
                    >
                      <span>Subscribers</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'job'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/job`}
                      onClick={handleShowNavigation}
                    >
                      <span>Job</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'department'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/department`}
                      onClick={handleShowNavigation}
                    >
                      <span>Department</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'company-settings'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/company-settings`}
                      onClick={handleShowNavigation}
                    >
                      <span>Company Info</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'leave'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/leave-settings`}
                      onClick={handleShowNavigation}
                    >
                      <span>Leave</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'working-days-in-year'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/working-days-in-year`}
                      onClick={handleShowNavigation}
                    >
                      <span>Working Days</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'notification'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/notification`}
                      onClick={handleShowNavigation}
                    >
                      <span>Notification</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'directReport'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/direct-report`}
                      onClick={handleShowNavigation}
                    >
                      <span>Direct Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'company-location'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/company-location`}
                      onClick={handleShowNavigation}
                    >
                      <span>Company Location</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'user-manual-category'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/user-manual-category`}
                      onClick={handleShowNavigation}
                    >
                      <span>Manual Category</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'user-manual-sub-category'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/user-manual-sub-category`}
                      onClick={handleShowNavigation}
                    >
                      <span>Manual Sub Category</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'user-manual-topic'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/user-manual-topic`}
                      onClick={handleShowNavigation}
                    >
                      <span>Manual Topic</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'whats-new'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/whats-new`}
                      onClick={handleShowNavigation}
                    >
                      <span>What's New</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        submenu === 'limit-access'
                          ? 'submenu-active'
                          : 'w-full flex items-center justify-start tooltip-navigation'
                      } w-full h-full px-1 my-0.5 mb-2 hover:!border-white duration-150 !border-l-2 border-transparent rounded-r-md`}
                      to={`${link}/settings/limit-access`}
                      onClick={handleShowNavigation}
                    >
                      <span>Limit Access</span>
                    </Link>
                  </li>
                </ul>
              )}

              <li
                className={`${
                  menu === 'user-manual' ||
                  isNewFeatureShow(store, [whatsNewCodeNavUserManual])
                    ? 'active'
                    : 'hover:bg-secondary/30'
                } mb-2 cursor-pointer pl-2.5`}
                onClick={() => dispatch(setIsSearch(false))}
                ref={userManualRef}
              >
                <Link
                  to={`${link}/user-manual`}
                  className="w-full flex items-center !px-2 !py-1 justify-start tooltip-navigation"
                  onClick={handleShowNavigation}
                  data-tooltip="user-manual"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FaBook className="w-4 h-4 mr-4" />
                  <span>User Manual</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <span
          className={`${
            store.isShow ? '' : '-translate-x-full'
          } fixed z-30 w-screen h-screen bg-dark/50 ${
            isMobileOrTablet ? '' : 'lg:hidden'
          }`}
          onClick={handleShowNavigation}
          onTouchMove={handleShowNavigation}
        ></span>
      </div>
    </>
  );
};

export default Navigation;