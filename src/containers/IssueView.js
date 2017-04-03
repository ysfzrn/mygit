import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";
import styled from "styled-components";
import { API_URL } from "../util/api";
import moment from "moment";
import {
  MyEditor,
  Button,
  Title,
  Container,
  Content,
  IssueProfileImage,
  CommentCard,
  StatusOpen,
  StatusClose,
  StatusAnnounce,
  IssueDeleteButton,
  MyModalAlert
} from "../components";
import { stateToHTML } from "draft-js-export-html";
import { app } from "../store";

let gid = "";
let issue_id = 0;
class IssueView extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }
  componentWillMount() {
    const { fetchselectedissue, match } = this.props;
    const commentService = app.service("comments");

    fetchselectedissue(match.params.id);
    if (commentService.connection.disconnected) {
      commentService.on("created", item => this.handleFetchComment(item));
      commentService.on("patched", item => this.handleFetchComment(item));
      commentService.on("updated", item => this.handleFetchComment(item));
    }
  }

  handleFetchComment = item => {
    const { fetchComments, match, selectedissue } = this.props;
    fetchComments(issue_id);
  };

  componentDidMount() {
    const { fetchComments, match } = this.props;
    issue_id = match.params.id;
    fetchComments(issue_id);
  }

  componentWillUnmount() {
    const { commentsReset } = this.props;
    commentsReset();
  }

  createMarkup = () => {
    const { selectedissue } = this.props;
    return { __html: selectedissue.issue.text };
  };

  uploadCallback = file => {
    const { issueimageupload } = this.props;
    let reader = new FileReader();
    reader.onload = () => {
      issueimageupload(reader.result);
    };

    var d = new Promise((resolve, reject) => {
      reader.onloadend = () => {
        setTimeout(
          () => {
            resolve({ data: { link: `${API_URL}${gid}` } });
          },
          4000
        );
      };
    });

    reader.readAsDataURL(file);

    return d;
  };

  handleEditorInput = (text, field) => {
    const { commentFormChange } = this.props;

    commentFormChange({
      [field]: stateToHTML(text.getCurrentContent())
    });
  };

  handleSave = () => {
    const { commentform, commentSave, auth, selectedissue } = this.props;
    commentSave(auth.data._id, selectedissue.issue._id, commentform.text);
  };

  handleStatus = (id, status) => {
    const { issueUpdateRequest } = this.props;
    issueUpdateRequest(id, !status);
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleRemoveIssue = () => {
    const { removeIssue, selectedissue } = this.props;
    removeIssue(selectedissue.issue._id, selectedissue.issue.postitem._id);
  };

  render() {
    const {
      issueform,
      selectedissue,
      commentform,
      comments,
      auth
    } = this.props;
    
    let now = undefined;
    if (!selectedissue.loading) {
      now = moment.utc(selectedissue.issue.updatedAt).fromNow();
    }

    gid = issueform.addedfile;

    return (
      <Container>
        {selectedissue.loading
          ? <div>...yükleniyor </div>
          : <div>

              <ContentContainer>
                <Header>
                  <IssueProfileImage user={selectedissue.issue.postitem.user} />
                  <Owner>
                    <Name>
                      {selectedissue.issue.postitem.user.name}
                      {" "}
                      {selectedissue.issue.postitem.user.surname}
                    </Name>
                    <Now> {now} </Now>
                  </Owner>
                  <StatusContainer>
                    {selectedissue.issue.category === "I" &&
                      selectedissue.issue.status
                      ? <StatusOpen
                          onClick={() =>
                            this.handleStatus(
                              selectedissue.issue._id,
                              selectedissue.issue.status
                            )}
                        />
                      : selectedissue.issue.category === "I" &&
                          !selectedissue.issue.status
                          ? <StatusClose
                              onClick={() =>
                                this.handleStatus(
                                  selectedissue.issue._id,
                                  selectedissue.issue.status
                                )}
                            />
                          : null}
                    {selectedissue.issue.category === "A"
                      ? <StatusAnnounce />
                      : null}
                    {selectedissue.issue.postitem.user._id === auth.data._id
                      ? <IssueDeleteButton onClick={this.handleOpenModal} />
                      : null}
                  </StatusContainer>
                </Header>
                <Title>{selectedissue.issue.title}</Title>
                <Content createMarkup={this.createMarkup()} />
              </ContentContainer>

              <CommentContainer>
                {comments.comments.length !== 0
                  ? comments.comments.map((item, i) => {
                      return <CommentCard key={i} comment={item} />;
                    })
                  : null}

                <Comments>
                  <EditorContainer>
                    {!commentform.loading
                      ? <MyEditor
                          text={commentform.text}
                          commentMode={true}
                          onEditorStateChange={e =>
                            this.handleEditorInput(e, "text")}
                          placeholder="Buraya yorum yazabilirsin"
                          imageUploadCb={this.uploadCallback}
                        />
                      : <div style={{ minWidth: "200px" }}>
                          Gönderiliyor...
                        </div>}
                    <Button onClick={this.handleSave}>Gönder</Button>
                  </EditorContainer>
                </Comments>
              </CommentContainer>
              <MyModalAlert
                isOpen={this.state.showModal}
                onRequestYes={this.handleRemoveIssue}
                onRequestClose={this.handleCloseModal}
                onCloseModal={this.handleCloseModal}
              />

            </div>}

      </Container>
    );
  }
}

const ContentContainer = styled.div`
     flex:1;
     background-color:#ffffff;
     padding-top:35px;
     padding-bottom:35px;
`;

const CommentContainer = styled.div`
    flex:1;
    align-selft:flex-end;
    min-height:400px;
    
`;

const EditorContainer = styled.div`
    
`;

const Comments = styled.div`
    max-width:740px;
    height:100%;
    margin:0 auto;
`;

const Header = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    max-width:740px;
    margin:0 auto;
`;

const Owner = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    position:relative;
    flex:1;
`;

const StatusContainer = styled.div`
  
`;

const Name = styled.div`
    padding-left:30px;
    font-size:14px;
    opacity:0.6;
`;

const Now = styled.div`
	padding:5px 5px 5px 30px;
	font-size:11px;
	opacity:0.6;
`;

var mapStateToProps = state => {
  return {
    selectedissue: state.selectedissue,
    issueform: state.issueform,
    auth: state.auth,
    commentform: state.commentform,
    comments: state.comments
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueView);
