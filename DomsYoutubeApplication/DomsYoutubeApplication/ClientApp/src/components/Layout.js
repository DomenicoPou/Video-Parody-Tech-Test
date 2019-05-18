import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  displayName = Layout.name

  render() {
        return (
        <div>
            <NavMenu />
            <div class="main-container">
                <Grid fluid>
                    <Row>
                       {this.props.children}
                    </Row>
                </Grid>
            </div>
        </div>
    );
  }
}
