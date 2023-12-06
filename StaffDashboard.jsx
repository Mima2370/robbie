// Import node_modules
import React from 'react';
import styled from "styled-components";

// Import components
import { Loading } from '../Loading.jsx';
import { StaffInput } from './Input.jsx';
import { StaffOutput } from './Output.jsx';
import GoogleAdSense from './../../Utils/GoogleAdsense';

const staff = [
    '439223656200273932',
    '242760305623433219',
    '395526710101278721',
    '267331268243488769',
    '249955383001481216',
    '222239619897360385',
    '107510319315697664',
    '235792008763932672',
    '282075857194057729',
    '345686279880572929',
    '192719510510239746',
    '457588351982108705'
];

export class StaffEdit extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: {
                id: "",
                name: "",
                avatar: "",
                content: "",
                emotes: [],
                scroll: false
            },
            store: {
                id: "",
                name: "",
                avatar: "",
                content: "",
                emotes: [],
                scroll: false
            }
        };
    };

    async componentDidMount(){
        if(this.props.user.isLogged === false || !staff.includes(this.props.user.id)){
            this.props.history.push('/404');
        };
        let member = await fetch(`/json/staff/member/${this.props.user.id}`);
        if(member.status !== 200){
            this.props.history.push('/404');
        }
        member = await member.json();
        this.setState({isLoading: false, user: member, store: member});
        this.store = member;
    }

    handleName = (event) => {
        this.setState({user: {...this.state.user, ...{name: event.target.value}}})
    }

    handleContent = (event) => {
        this.setState({user: {...this.state.user, ...{content: event.target.value}}})
    }

    handleAvatar = (event) => {
        this.setState({user: {...this.state.user, ...{avatar: event.target.value}}})
    }

    handleAvatarURL = () => {
        this.setState({user: {...this.state.user, ...{avatar: this.props.user.avatar}}})
    }

    handleEmotesAdd = () => {
        let emotes = this.state.user.emotes;
        if((emotes.length + 1) > 5) return;
        emotes.push('');
        this.setState({user: {...this.state.user, ...{emotes: emotes}}})
    }

    handleEmotesModify = (index, text) => {
        let emotes = this.state.user.emotes;
        emotes[index] = text;
        this.setState({user: {...this.state.user, ...{emotes: emotes}}})
    }

    handleEmotesRemove = (index) => {
        let emotes = this.state.user.emotes;
        emotes.splice(index, 1);
        this.setState({user: {...this.state.user, ...{emotes: emotes}}})
    }

    handleScroll = (event) => {
        this.setState({user: {...this.state.user, ...{scroll: event}}})
    }

    handleSubmit = () => {
        let newMember = this.state.user;
        newMember.emotes = newMember.emotes.filter(x => x)
        fetch('/json/staff/update', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMember)
        });
        this.setState({user: newMember, store: newMember});
    }

    render() {
        if(this.state.isLoading === true){
            return (
                <Container>
                    <Content>
                        <Loading />
                    </Content>
                </Container>
            )
        }else{
            return (
                <Container>
                    <Content>
                        <Title>{this.props.user.username} edit</Title>
                    </Content>
                    <Content>
                        <FlexContainer>
                            <StaffInput 
                                user={this.state.user} 
                                handleName={this.handleName} 
                                handleContent={this.handleContent} 
                                handleAvatar={this.handleAvatar}
                                handleAvatarURL={this.handleAvatarURL}
                                handleEmotesAdd={this.handleEmotesAdd} 
                                handleEmotesModify={this.handleEmotesModify} 
                                handleEmotesRemove={this.handleEmotesRemove} 
                                handleScroll={this.handleScroll}
                            />
                            <StaffOutput user={this.state.user} parentObject={this} />
                        </FlexContainer>

                        <VariableContainer>
                            <VariableMainTitle>Current variables</VariableMainTitle>
                            <VariableBlock>
                                <VariableTitle>Emotes: </VariableTitle>
                                <VariableText>&#123;!URL&#125;</VariableText>
                            </VariableBlock>

                            <VariableBlock>
                                <VariableTitle>User tag:</VariableTitle>
                                <VariableText>&lt;@KSJaay&gt;</VariableText>
                            </VariableBlock>

                            <VariableBlock>
                                <VariableTitle>Channel tag:</VariableTitle>
                                <VariableText>&#091;#Channel&#093;</VariableText>
                            </VariableBlock>

                        </VariableContainer>

                        <SaveContainer showPopup={JSON.stringify(this.state.user) !== JSON.stringify(this.state.store)}>
                            <SaveText>Changes detected! Please save or cancel.</SaveText>
                            <SaveButtonContainer>
                                <CancelButton onClick={() => {
                                    let newUser = this.state.store;
                                    this.setState({user: newUser});
                                }}>Cancel</CancelButton>
                                <SaveButton onClick={this.handleSubmit}>Save</SaveButton>
                            </SaveButtonContainer>
                        </SaveContainer>
                    </Content>
                    
                    <AdContent>
                        <GoogleAdSense />
                    </AdContent>


                </Container>
            )
        };
    }
};


const Container = styled.div`
    top: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.colors.primary};
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    min-height: 88vh;
    color: ${(props) => props.theme.colors.font};
`;

const Content = styled.div`
    margin: 0px 10%;
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1550px) {
        margin: 0 6%;
        width: 88%;
    }

    @media screen and (max-width: 1100px) {
        margin: 0 3%;
        width: 94%;
    }

    @media (max-width: 768px) {
        margin: 0px 2%;
        width: 96%;
    }
`;


const AdContent = styled.div`
    margin: 0px 10%;
    width: 80%;
    height: auto;
    text-align: center;

    @media screen and (max-width: 1550px) {
        margin: 0 6%;
        width: 88%;
    }

    @media screen and (max-width: 1100px) {
        margin: 0 3%;
        width: 94%;
    }

    @media (max-width: 768px) {
        margin: 0px 2%;
        width: 96%;
    }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.font};
    padding: 15px 0;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 20px;
`;

const FlexContainer = styled.div`
    display: flex;
    @media (max-width: 800px) {
        display: block;
    }
`;

const SaveContainer = styled.div`
    position: fixed;
    bottom: 30px;
    z-index: 1000;
    display: flex;
    width: inherit;
    background-color: ${(props) => props.theme.colors.light};
    color: ${(props) => props.theme.colors.font};
    padding: 0 20px;
    border-radius: 12px;

    transition: opacity .5s;
    opacity: ${({ showPopup }) => (showPopup ? '1' : '0')};
`;

const SaveText = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const SaveButtonContainer = styled.div`
    display: flex;
    padding: 10px 0;
`;

const SaveButton = styled.div`
    display: inline-block;
    padding: 12px 24px;
    margin: 0 8px;
    border-radius: 6px;
    background-color: ${(props) => props.theme.colors.highlight};;
    color: white;
    font-weight: bold;
    box-shadow: 0 8px 25px -15px rgb(0 0 0 / 80%);
    text-decoration: none;
    &:hover{
        background-color: #fc6a3e;
        cursor: pointer;
    }
`;

const CancelButton = styled.div`
    display: inline-block;
    padding: 12px 24px;
    margin: 0 8px;
    border-radius: 6px;
    background-color: #585a5c;
    color: white;
    font-weight: bold;
    box-shadow: 0 8px 25px -15px rgb(0 0 0 / 80%);
    text-decoration: none;
    &:hover{
        background-color: #4a4c4f;
        cursor: pointer;
    }
`;

const VariableContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const VariableMainTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0 10px 0;
    text-decoration: underline;
`;

const VariableBlock = styled.div`
    display: flex;
`;

const VariableTitle = styled.div`
    padding-right: 10px;
    color: ${(props) => props.theme.colors.font};
    font-weight: bold;
`;

const VariableText = styled.div`
    color: ${(props) => props.theme.colors.highlight};
`;
