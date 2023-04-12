import { Cascader } from 'antd';
const options = [
  {
    code: 'superadmin',
    name: 'Superadmin',
  },
  {
    code: 'doctor',
    name: 'Doctor',
  },
  {
    code: 'receptionist',
    name: 'Receptionicte',
  },
  {
    code: 'employee',
    name: 'Employee',
    items: [
      {
        code: 'infirmier',
        name: 'Infirmier',
      },
      {
        code: 'Labo',
        name: 'Laboratoire',
      },
      {
        code: 'pharmacy',
        name: 'Pharmacy',
      },
    ],
  },
];
const onChange = (value) => {
  console.log(value);
};
const TypeCompte = () => (
  <Cascader
    className='TC'
    fieldNames={{
      label: 'name',
      value: 'code',
      children: 'items',
    }}
    options={options}
    onChange={onChange}
    placeholder="Please select User"
    style={{ width: "315px"}}

  />
);
export default TypeCompte;