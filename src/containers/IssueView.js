import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";
import styled from "styled-components";
import media from "../util/media";
import { API_URL } from "../util/api";
import { flexCenter } from "../util/sharedStyle";
import moment from "moment";
import {
  MyEditor,
  Button,
  Title,
  Container,
  Content,
  Image,
  Circle
} from "../components";
import { stateToHTML } from "draft-js-export-html";

let gid = "";
class IssueView extends Component {
  componentWillMount() {
    const { fetchselectedissue, match } = this.props;
    fetchselectedissue(match.params.id);
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

  render() {
    const { issueform, auth, selectedissue, commentform } = this.props;
    const now = moment.utc(selectedissue.issue.updatedAt).fromNow();
    gid = issueform.addedfile;

    return (
      <Container>
        {selectedissue.loading
          ? <div>...yükleniyor </div>
          : <div>

              <ContentContainer>
                <Header>
                  <Circle size={60}>
                    {selectedissue.issue.postitem.user.image
                      ? <Image src={selectedissue.issue.postitem.user.image} borderRadius={30} />
                      : <div>
                          {selectedissue.issue.postitem.user.name
                            .substr(0, 1)
                            .toUpperCase()}
                          {" "}
                        </div>}
                  </Circle>
                  <Owner>
                    <Name>
                      {selectedissue.issue.postitem.user.name}
                      {" "}
                      {selectedissue.issue.postitem.user.surname}
                    </Name>
                    <Now> {now} </Now>
                    <Status
                      status={selectedissue.issue.status}
                      category={selectedissue.issue.category}
                    >
                      {selectedissue.issue.category === "I"
                        ? selectedissue.issue.status ? "Açık" : "Tamamlandı"
                        : "Duyuru"}
                    </Status>

                  </Owner>
                </Header>
                <Title>{selectedissue.issue.title}</Title>
                <Content createMarkup={this.createMarkup()} />
              </ContentContainer>

              <CommentContainer>
                <Comments>
                  <EditorContainer>
                    <MyEditor
                      text={commentform.text}
                      onEditorStateChange={e =>
                        this.handleEditorInput(e, "text")}
                      placeholder="Buraya yorum yazabilirsin"
                      imageUploadCb={this.uploadCallback}
                    />
                    <Button onClick={this.handleSave}>Gönder</Button>
                  </EditorContainer>
                </Comments>
              </CommentContainer>

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

const Status = styled.div`
    position:absolute;
    top:0;
    right:0;
    padding:10px 30px;
    background-color: ${p => p.category === "I" ? p.status ? "#F44336" : "#4CAF50" : "#ffa726"}
    color:${p => p.theme.palette.alternateTextColor};
    border-radius:4px;
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
    commentform: state.commentform
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueView);
