import React, { Component } from 'react';

class ViewerJSPlayer extends Component {
	constructor(props){
		super(props);

		this.state = {

		}

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let updateState = this.stateDidUpdate;

		this.unsubscribe = this.props.store.subscribe(() => {
			updateState();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let currentArtifact, active, activeFile;

		if (newState.CurrentArtifact)
			currentArtifact = newState.CurrentArtifact;
		if (newState.FilePlaylist){
			active = newState.FilePlaylist.active;
			activeFile = newState.FilePlaylist[active];
		}

		let stateObj = {
			CurrentArtifact: currentArtifact,
			ActiveFile: activeFile
		}

		if (stateObj && this.state !== stateObj){
			this.setState(stateObj);
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	render() {
		let pdfURL;

		if (this.state.ActiveFile && this.state.CurrentArtifact && this.state.ActiveFile.info && this.state.CurrentArtifact.artifact){
			pdfURL = this.props.Core.util.buildIPFSURL(this.props.Core.util.buildIPFSShortURL(this.props.Core.Artifact.getLocation(this.state.CurrentArtifact.artifact), this.state.ActiveFile.info));
		}
		return (
			<iframe title="pdf" style={{width:"100vw", height:"100%", overflow: "hidden"}} frameBorder="0" src={"http://viewerjs.org/ViewerJS/#" + pdfURL}></iframe>
		);
	}
}

ViewerJSPlayer.SUPPORTED_FILE_TYPES = ["pdf", "odt", "odp", "ods"]

export default ViewerJSPlayer;