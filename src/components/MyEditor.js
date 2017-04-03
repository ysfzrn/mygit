import React, { Component } from 'react';
import styled from 'styled-components'
import { ContentState,EditorState,convertFromHTML } from 'draft-js';
import  { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const optionsComment= ['inline', 'fontSize','colorPicker', 'link', 'emoji','image','history'];
const optionsIssue= ['inline', 'fontSize','list', 'colorPicker', 'link', 'emoji','image','history'];

class MyEditor extends Component {
    

    uploadCallback=(file)=>{
         return this.props.imageUploadCb(file);  
    }
  
   render() {
    const {commentMode} = this.props;
    const blocksFromHTML = convertFromHTML(this.props.text);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
    ); 
  
    const toolbar  = {
          options: commentMode ? optionsComment  : optionsIssue, 
          image: {
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: this.uploadCallback,
          },
          fontFamily: {
            options: ['Arial', 'Impact', 'Tahoma', 'Verdana','Roboto'],
           },
    }

    return (
      <Edi {...this.props} 
               toolbar={ toolbar }
               editorClassName={undefined}
               wrapperClassName={undefined}
               defaultEditorState={EditorState.createWithContent(state)}
                 />
    );
  }
}

const Edi = styled(Editor)`
    border:1px solid black;
`

export default MyEditor;

