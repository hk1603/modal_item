import * as React from 'react';
import {
  ListItem,
  Button,
} from '@material-ui/core';
import Modal from 'react-modal';
import styled from 'styled-components';

const ClickableListItem = styled(ListItem)`
  text-decoration: underline;
    cursor: pointer;
    display: inline-block;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    border-bottom: 1px solid black;
`;

const ContentBlock = styled.div`
  overflow-y:scroll;
  .example::-webkit-scrollbar{ 
    width: 15px;
  }
`;

const Centering = styled.div`
  text-align: center;
  padding: 24px;
`;

const Title = styled.div`
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all  0.3s ease;
  color: #2196f3;
    :hover {
      color: #ff4500;
    }  
`;

const CloseButton = styled(Button)`
  && {
    color: #2196f3;
    :hover {
      color: #ff4500;
    }  
  }
`;


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '-40%',
    bottom                : 'auto',
    marginRight           : '0%',
    transform             : 'translate(-50%, -50%)',
    height                : 'auto',
    maxHeight             : '65%',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  }
};

interface Props {
  title: string;
  contents: string;
  created_at: string;
  year: string;
  month: string;
  day: string;
}
interface State {
  modalIsOpen: boolean;
}


export default class ModalItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
    this.state = {
      modalIsOpen: false,
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
    document.body.setAttribute('style', 'overflow: hidden;')
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    document.body.removeAttribute('style')
  }

  render(): JSX.Element {
    const {title, contents, year, month, day} = this.props;
    const {modalIsOpen} = this.state;

    return (
      <React.Fragment>
        <ClickableListItem onClick={this.openModal}>
          <div>
            {`${year}年${month}月${day}日`}<br/>
            <Title>
              {title}
            </Title>
          </div>
        </ClickableListItem>
        <React.Fragment>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
            >
              <h2>{title}</h2>
              <ContentBlock>
                <div style={{whiteSpace: 'pre-line'}}>
                  {contents}
                </div>
              </ContentBlock>
              <Centering>
                <CloseButton onClick={this.closeModal} color="primary">閉じる</CloseButton>
              </Centering>
            </Modal>
        </React.Fragment>
      </React.Fragment>
    );
  }
}
