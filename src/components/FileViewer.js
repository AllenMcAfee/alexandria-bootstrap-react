import React, { Component } from 'react';

import AudioContainer from './audioContainer.js';
import VideoPlayer from './videoPlayer.js';
import ImageContainer from './imageContainer.js';
import ViewerJSPlayer from './ViewerJSPlayer.js';
import MarkdownContainer from './markdownContainer.js';
import HTMLContainer from './htmlContainer.js';
import CodeContainer from './codeContainer.js';

var PLAYERS = [
	AudioContainer, 
	VideoPlayer, 
	ImageContainer, 
	ViewerJSPlayer,
	MarkdownContainer,
	HTMLContainer, 
	CodeContainer
];

class FileViewer extends Component {
	constructor(props){
		super(props);

		this.state = {
			ActiveFile: {}
		};

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let CurrentArtifact = newState.CurrentArtifact;
		let active = newState.FilePlaylist.active;
		let currentFile = newState.FilePlaylist[active];

		if (currentFile && this.state !== currentFile){
			this.setState({CurrentArtifact: CurrentArtifact, ActiveFile: currentFile});
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render() {
		let extension, fileViewerComponent;

		if (this.state.ActiveFile.info && this.state.ActiveFile.info.fname){
			extension = this.props.Core.util.getExtension(this.state.ActiveFile.info.fname).toLowerCase();
		}

		if (extension){
			for (var Player of PLAYERS){
				if (Player.SUPPORTED_FILE_TYPES){
					for (var SupportedFileType of Player.SUPPORTED_FILE_TYPES){
						if (extension === SupportedFileType){
							fileViewerComponent = React.createElement(Player, {Core: this.props.Core, store: this.props.store})
						}
					}
				}
			}
		}

		if (!fileViewerComponent){
			fileViewerComponent = <div style={{height: "100%", width: "100vw", maxWidth: "100vw"}}><h1 style={{color: "#fff", textAlign: "center", marginTop: "10%"}}>Unsupported File Format (.{extension})</h1></div>;
		}

		return fileViewerComponent;
	}
}

export default FileViewer;