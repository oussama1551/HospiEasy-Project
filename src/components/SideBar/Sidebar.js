import './Sidebar.css';
import { RxDashboard } from "react-icons/rx";
import { AiFillSetting } from "react-icons/ai";

import { TbFileFunction } from "react-icons/tb";
import { MdHelpCenter } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BiLogOut } from "react-icons/bi";
import { faUserDoctor,faUserFriends,faHospital
  ,faNotesMedical,faStethoscope,faTruckMedical,faClipboardList
  ,faBellConcierge,faUserNurse,faFlaskVial,faFile,faCircleInfo
  ,faUsers,faPrescriptionBottleMedical,faHeartPulse,faHeartCircleMinus
  ,faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

import { Link, useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { Routes } from 'react-router-dom'

import  TableauBord  from "views/Pages/TableauBord/TableauBord";
import Patients from "views/Pages/PatienstBord/Patients";

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu, theme } from 'antd';
  import React, { useState } from 'react';
  const { Header, Sider, Content } = Layout;

  
  const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();


    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo px-4 w3-sidebar w3-border">
          <img
            alt="..."
            className="img-fluid"
            src={require("assets/HL.png")}
            style={{ width: "200px" }}
            />
          </div>
          <Menu
            className="menu"
            theme="light"
            mode="inline"
            defaultSelectedKeys={['']}
            onClick={({key}) => {
              if (key == "sigout") {

              } else {navigate(key);}
            }}
            style={{
              height: '120%',
              overflow: 'auto',
            }}
            items={[
              {
                key: '',
                icon: <RxDashboard />,
                label: 'Tableau de bord',
              },

              {key: 'Patients',
                icon: <FontAwesomeIcon icon={faUsers} />,
                label: 'Les Patients',
              },
              {
                key: '4',
                icon: <FontAwesomeIcon icon={faHospital} />,
                label: 'Département',
              },
              {
                key: '5',
                icon: <FontAwesomeIcon icon={faUserDoctor} />,
                label: 'Médecins',
              },
              {
                key: '6',
                icon: <FontAwesomeIcon icon={faBellConcierge} />,
                label: 'Réceptionnistes',
              },
              {
                key: '7',
                icon: <FontAwesomeIcon icon={faUserNurse} />,
                label: 'Infirmières',
              },
              {
                key: '8',
                icon: <FontAwesomeIcon icon={faFlaskVial}  />,
                label: 'Laboratoire',
                children: [
                  {
                    key: '81',
                    icon: <FontAwesomeIcon icon={faFile}  />,
                    label: 'Rapports',
                  },
                  {
                    key: '82',
                    icon: <FontAwesomeIcon icon={faUsers}  />,
                    label: 'Employées',
                  },]
              },
              {
                key: '9',
                icon: <FontAwesomeIcon icon={faPrescriptionBottleMedical} />,
                label: 'Pharmacie',
                children: [
                  {
                    key: '91',
                    icon: <FontAwesomeIcon icon={faFile} />,
                    label: 'Facturations',
                  },
                  {
                    key: '92',
                    icon: <FontAwesomeIcon icon={faUsers} />,
                    label: 'Employées',
                  },
                ]
              },
              {
                key: '88',
                icon: <AiFillSetting />,
                label: 'Paramètres',
              },
              {
                key: '109',
                icon: <TbFileFunction />,
                label: 'Demmende Fonctions',
              },
              {
                key: '208',
                icon: <MdHelpCenter />,
                label: 'Aide',
              },
              {
                key: '999',
                icon: <FontAwesomeIcon icon={faCircleInfo}  />,
                label: 'Propos de nous',
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="d-flex justify-content-between ps-1 pe-3"
            style={{
              padding: 0,
              background: 'rgba(94, 114, 228, 1)',
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <div className='log'>
              <div className="d-flex gap-3 align-items-center">
                <div>
                  <img className='user-image'
                    alt="..."
                    src={require("assets/favicon.png")}
     
                  />
                </div>
                <div>
                  <p className='mb-0'>Super Admin</p>

                  <h6 className='mb-0'>Belakhdar Oussama</h6>
                </div>
                <Link to='/'>
                  <BiLogOut className='blog'/>
                </Link>
              </div>
            </div>
            
          </Header>
          <Content
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );  
  };
  export default SideBar;