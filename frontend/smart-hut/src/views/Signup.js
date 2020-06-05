import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Icon,
  Input,
  Message,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Forms } from '../remote';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeName: '',
      username: '',
      email: '',
      password: '',
      error: { state: false, message: [] },
      success: false,
    };
  }

  handleRegistration = (e) => {
    e.preventDefault();
    const params = {
      email: this.state.email,
      name: this.state.completeName,
      password: this.state.password,
      username: this.state.username,
    };

    Forms.submitRegistration(params)
      .then(() => this.setState({ success: true }))
      .catch((err) => this.setState({ error: { state: true, message: err.messages } }));
  };

  onChangeHandler = (event) => {
    const nam = event.target.name;
    const val = event.target.value;
    this.setState({ [nam]: val });
  };

  render() {
    if (this.state.success) {
      return <Redirect to="sent-email-reg" />;
    }
    return (
      <>
        <Button circular style={{ margin: '2em' }} href="/">
          <Icon name="arrow alternate circle left" />
          Go Home
          {' '}
        </Button>
        <Grid
          textAlign="center"
          style={{ height: '70vh' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              <Image src="img/logo.png" />
              {' '}
Sign-up to SmartHut
            </Header>
            <Form
              size="large"
              style={{ marginTop: '2em' }}
              error={this.state.error.state}
            >
              <Message error>
                <Message.Header>Singup Error</Message.Header>

                {this.state.error.message.map((e, i) => (
                  <span key={i}>
                    {e}
                    <br />
                  </span>
                ))}
              </Message>
              <Form.Input
                icon="address card outline"
                iconPosition="left"
                placeholder="First Name and Last Name"
                name="completeName"
                type="text"
                onChange={this.onChangeHandler}
                required
              />
              <Form.Input
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                type="text"
                onChange={this.onChangeHandler}
                required
              />
              <Form.Input
                control={Input}
                type="name"
                icon="envelope outline"
                name="email"
                iconPosition="left"
                placeholder="E-mail"
                onChange={this.onChangeHandler}
                /* error={{
                    content: 'Please enter a valid email address',
                    pointing: 'below',
                  }} */
                required
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                placeholder="Password (at least 6 characters)"
                name="password"
                type="password"
                onChange={this.onChangeHandler}
                minLength={6}
                required
              />
              <Button
                color="blue"
                fluid
                size="large"
                onClick={this.handleRegistration}
              >
                Register
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}
