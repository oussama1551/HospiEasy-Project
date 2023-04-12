import { PlusOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from 'antd';
import { useState } from 'react';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const AddPatient = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  
  return (
    <>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 15,
        }}
        layout="horizontal"
        //disabled={componentDisabled}
        style={{
          maxWidth: 600,
        }}
      > 
        <br></br>
        <Form.Item label="Nom">
          <Input placeholder='Enter Nom Patient' />
        </Form.Item>
        <Form.Item label="Select Statut">
          <Select>
            <Select.Option value="demo" >Attente</Select.Option>
            <Select.Option value="demo" >Bien Payé</Select.Option>
            <Select.Option value="demo" >Bien Non Payé</Select.Option>
          </Select>
        </Form.Item>        
        <Form.Item label="Date Entre">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Age">
          <InputNumber />
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
    </>
  );
};
export default AddPatient;