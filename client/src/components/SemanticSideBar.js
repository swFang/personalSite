import React, { Component } from 'react'; 
import DisplayPicture from './DisplayPicture';
import {  Sidebar, Menu } from "semantic-ui-react";
import Links from './Links';
import scrollToComponent from 'react-scroll-to-component';

export default class SemanticSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: []
        }
    }

    async getTopics() {
        const res = await fetch('/getTopics')
        const body = res.json()
            .then(data => {
                this.setState({
                    topics: data.Topics
                })
            });

        if(res.status !== 200) {
            throw Error(body.message)
        }
    }

    handleItemClick(element) {
        console.log(element);
        this.props.scrollToElement('FunkyProjects');
    }

    componentDidMount() {
        this.getTopics(); 
    }

    renderTopics() {
        return (
            this.state.topics.map((element) => {
                return (
                    <Menu.Item as='a'  
                    onClick={() => {this.handleItemClick(element)}}
                    key={element}> 
                        {element}
                    </Menu.Item>)
            })
        );
    }

    render() {
        return (
            <Sidebar
                as={Menu}
                animation='push'
                vertical
                visible
            >
            <DisplayPicture/>
            {this.renderTopics()}
            <Links/>
            </Sidebar>
        )
    }
}