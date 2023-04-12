import React from "react";
// reactstrap components
import {
  Button,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
import "./Login.css"
// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { Card } from 'antd';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space ,notification  } from 'antd';
import { Select ,Form} from 'antd';

import {NotificationContainer, NotificationManager} from 'react-notifications';

const { Option } = Select;

class Login extends React.Component {
  
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  constructor(props) {
    super(props);
    this.state = {
      userclinique: '',
      password: ''
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userclinique: this.state.userclinique,
          password: this.state.password
        })
      })
      const data = await response.json();
      const { userclinique } = data;
      if (userclinique) {
        notification.success({
          message: 'Login successful',
          description: 'You have successfully logged in!'
        });
        setTimeout(() => {
          switch (userclinique) {
            case 'admin':
              window.location.href="/admin"
              break;
            case 'docteur':
              window.location.href="/doctor"
              break;
            case 'receptioniste':
              window.location.href="/reception"
              break;
          }
        }, 800);}
      else {
        const errorMessage = await response.json();
        notification.warning({
          message: 'Login failed',
          description: errorMessage.message
        });
      }

    } catch (error) {
      notification.warning({
        message: 'Login failed',
        description: 'Check Password or user selected'
      });
      console.error(error);
    }
  };

  handleUsernameChange = (value) => {
    this.setState({ userclinique: value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };
  render() {
    return (
      <>
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="col px-0 ">
              <Row className="align-items-center justify-content-center">
                <Col className="text-center" lg="6">
                  <img
                    alt="..."
                    className="img-fluid"
                    src={require("assets/HL.png")}
                    style={{ width: "300px" }}
                  />
                  <p className="lead text-white">
                    A Hospital Management System , various advantages , best possible experience .
                  </p>
                </Col>
              </Row>
            </div>
            <Container className="pt-lg-1">
              <Row className="justify-content-center">
                <Card
                  style={{
                    width: 400,
                    top:-10,                            
                  }}
                >
                <div className="ttt text-muted text-center mb-0">
                  <h3>Clinique El siha</h3>
                </div>
                <CardBody className="px-lg-3 py-lg-2 mt-2">
                <div className="ttt text-center text-muted mb-4">
                  <small>Bienvenue , Selectioner l'utilisateure</small>
                </div>
                <form onSubmit={this.handleSubmit}>
                <Form.Item>
                    <Select value={this.state.userclinique} onChange={this.handleUsernameChange}>
                      <Option value="admin">Administrateur</Option>
                      <Option value="docteur">Médecin</Option>
                      <Option value="receptioniste">Réceptionniste</Option>
                      <Option value="ouvrier">Ouvrière</Option>
                      <Option value="infirmier">Infirmière</Option>
                      <Option value="labo">Laboratoire</Option>
                      <Option value="magasin">Magasinier</Option>
                    </Select>
                  </Form.Item>

                  <Input.Password                    
                    className="inpuut"
                    placeholder="Mot de passe"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  <div className="justify-content-center">
                    <Button
                      className="my-1 mx-7"
                      color="primary"
                      type="submit"
                      
                    >
                      Connecter
                    </Button>
                    </div>
                  </form>              
                </CardBody>
                </Card>
              </Row>
            </Container>

          </section>
          <SimpleFooter />
        </main>
      </>
    );
  }
}

export default Login;
