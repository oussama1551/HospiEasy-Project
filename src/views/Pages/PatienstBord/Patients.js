import React from 'react'
import { Card , Table , Tag , Space} from 'antd';
import { useState ,useEffect } from 'react';
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'antd';
import { Button } from "reactstrap";

import { PlusOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from 'antd';



import './Patients.css'

const columns = [
  {
    title: 'Name',
  
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Statut',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'Attente') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="small">
                  <Button className="btn-1" color="transparent" outline type="button"
                  >
                    <span className="btn-inner1--icon">
                    <FontAwesomeIcon icon={faEye} />
                    </span>
                  </Button>
                  <Button className="btn-1" color="transparent" outline type="button"
                  >
                    <span className="btn-inner2--icon">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    </span>
                  </Button>
                  <Button className="btn-1" color="transparent" outline type="button"
                  >
                    <span className="btn-inner3--icon">
                    <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </Button>
                  
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'Berkani Boulahya',
    age: 32,
    address: 'Oum El Bouaghi',
    tags: ['Attente'],
  },
  {
    key: '2',
    name: 'Abdou Zenda',
    age: 42,
    address: 'Alger',
    tags: ['Bien' , 'Payé'],
  },
  {
    key: '3',
    name: 'Azzou 406',
    age: 32,
    address: 'Hanana',
    tags: ['Bien', 'Non Payé'],
  },
  {
    key: '4',
    name: 'Ramdan Belakhdar',
    age: 32,
    address: 'Saada',
    tags: ['Attente'],
  },
  {
    key: '5',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
 

];

const tabList = [
  {
    key: 'tab1',
    tab: "Aujourd'hui",
  },
  {
    key: 'tab2',
    tab: 'List Patients',
  },
];
const contentList = {
  tab1: <p>content1</p>,
  tab2: <div><Table columns={columns} dataSource={data} scroll={{ y: 240 }} /></div>,
};

const { TextArea } = Input;

function Patients () {
  const [PatientsList, setPatientsList] = useState([]);
  const [NomPatient, setNomPatient] = useState('');
  const [AgePatient, setAgePatient] = useState('');
  const [AdressePatient, setAdressePatient] = useState('');
  const [StatutPatient, setStatutPatient] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  useEffect(() => {
    fetch('http://localhost:4000/addPatient')
      .then(res => res.json())
      .then(data => setPatientsList(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const data = { NomPatient, AgePatient, AdressePatient, StatutPatient};
    fetch('http://localhost:4000/addPatient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.status === 201) {
          // clear input fields and update doctors list
          setNomPatient('');
          setAgePatient('');
          setAdressePatient('');
          setStatutPatient('');
          fetch('http://localhost:4000/addPatient')
            .then(res => res.json())
            .then(data => setPatientsList(data))
            .catch(err => console.error(err));
        } else {
          throw new Error('Error adding Patient');
        }
      })
      .catch(err => console.error(err));
  };



  const [componentDisabled, setComponentDisabled] = useState(true);
  const [activeTabKey1, setActiveTabKey1] = useState('tab1');
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState();
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    handleSubmit();
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <div>
      <br />
      <Card
        className='card'
        title="Patients"
        extra={
          <div>
            <Button
            className="btn-icon btn-3 ml-1 justify-content-between ps-1 pe-2 m-2"
            color="primary" outline
            type="button"
            onClick={showModal}
            >
            <span className="btn-inner--icon1 mr-1 justify-content-between px-1">
            <AiFillFileAdd />
            </span>
            <span className="btn-inner--text">Nouveau</span>
            </Button>
            <Modal
              title="Nouveau Patient"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              okText="Enregistrer"
              cancelText="Annuler"
              style={{ top: 10 }}
            >
              <Form
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 16,
                }}
                layout="horizontal"
                //disabled={componentDisabled}
                style={{
                  maxWidth: 600,
                }}
              > 
                <br></br>
                <Form.Item label="Nom">
                  <Input placeholder='Enter Nom Patient' value={NomPatient} onChange={e => setNomPatient(e.target.value)} required/>
                </Form.Item>
                <Form.Item label="Age" >
                  <Input type="number" value={AgePatient} onChange={e => setAgePatient(e.target.value)} />
                </Form.Item>
                <Form.Item label="Adresse">
                  <Input placeholder='Enter Adresse Patient' value={AdressePatient} onChange={e => setAdressePatient(e.target.value)} required/>
                </Form.Item>
                <Form.Item label="Select Statut">
                  <Select value={StatutPatient} onChange={e => setStatutPatient(e.target.value)} >
                    <Select.Option value="demo" >Attente</Select.Option>
                    <Select.Option value="demo" >Bien Payé</Select.Option>
                    <Select.Option value="demo" >Bien Non Payé</Select.Option>
                  </Select>
                </Form.Item>        
                <Form.Item label="Date Entre">
                  <DatePicker />
                </Form.Item>
                
                <Form.Item label="Description Statut">
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList">
                  <Upload action="/upload.do" listType="picture-card">
                    <div>
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>
            <Button
            className="btn-icon btn-3 ml-1 justify-content-between ps-1 pe-2"
            color="primary"
            type="button"
            outline
            >
            <span className="btn-inner--icon2 mr-1 justify-content-between px-1">
            <AiOutlineUserAdd />
            </span>
            <span className="btn-inner--text">Ajouter</span>
          </Button>
        </div>
        }
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
      <br />
      <br />
    </div>

  )
}



export default Patients;