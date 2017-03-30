import React, { Component } from "react";
import { MyEditor, TextInput, Button, SelectField } from "../components";
import styled from "styled-components";
import { connect } from "react-redux";
import { stateToHTML } from "draft-js-export-html";
import { API_URL } from "../util/api";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions";

let gid = "";
class Issue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      categories: [
        { value: "I", label: "Issue", selected: true },
        { value: "A", label: "Duyuru", selected: false }
      ]
    };
  }

  componentDidMount() {
    const { issueFormChange, auth } = this.props;
    issueFormChange({
      ["user_id"]: auth.data._id
    });
  }

  handleInput = (value, field) => {
    const { issueFormChange } = this.props;
    issueFormChange({
      [field]: value
    });
  };

  handleEditorInput = (text, field) => {
    const { issueFormChange } = this.props;
    issueFormChange({
      [field]: stateToHTML(text.getCurrentContent())
    });
  };

  handleSelectInput=(value,field)=>{
    let _cat = this.state.categories;
    _cat.map((item, i)=>{
       if(item.value===value){
          item.selected=true;
       }else{
          item.selected=false;
       }
    })
    this.setState({categories:_cat});
    this.handleInput(value,field)
  }

  handleSave = () => {
    const { issueform, issueSave } = this.props;
    issueSave(
      issueform.user_id,
      issueform.posttype,
      issueform.title,
      issueform.text,
      issueform.status,
      issueform.category
    );
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

  render() {
    const { issueform, auth } = this.props;
    const { categories } = this.state;
    gid = issueform.addedfile;
    return (
      <div className="col col-xs-12 col-sm-11 ">

        <Header>
          <h2>{issueform.category==="I" ? "Issue" : "Duyuru" }</h2>
          <Button onClick={this.handleSave} style={{ width: "30%" }}>
            Gönder
          </Button>
        </Header>

        <EditorContainer>
          <SelectField
            label="Kategori"
            options={categories}
            onSelected={item => this.handleSelectInput(item.value, "category")}
          />
          <TextInput label="Başlık" field="title" onChange={this.handleInput} />
          <MyEditor
            text={issueform.text}
            onEditorStateChange={e => this.handleEditorInput(e, "text")}
            imageUploadCb={this.uploadCallback}
            placeholder="Buraya yazabilirsin"
          />
        </EditorContainer>

      </div>
    );
  }
}

const Header = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:baseline;
  max-width:877px;
  margin:0 auto;
`;

const EditorContainer = styled.div`
  margin:0 auto;
  max-width:877px;
`;

var mapStateToProps = state => {
  return {
    issueform: state.issueform,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Issue);
