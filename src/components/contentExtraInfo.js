import React, { Component } from 'react';

import FilesTable from './filesTable.js';
import moment from 'moment';
import Linkify from 'react-linkify';

class ContentExtraInfo extends Component {
	constructor(props){
		super(props);

		this.state = {
			extendedView: false,
			Artifact: {}
		}

		this.setDescriptionAndFiles = this.setDescriptionAndFiles.bind(this);
		this.toggleSeeMore = this.toggleSeeMore.bind(this);
		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let currentArtifact = newState.CurrentArtifact;

		if (currentArtifact && this.state !== currentArtifact){
			this.setState(currentArtifact);
		}
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	setDescriptionAndFiles(props){
		let files = [], tmpFiles = [];

		if (props.artifact){
			files = props.Core.Artifact.getFiles(props.artifact);

			for (var i = files.length - 1; i >= 0; i--) {
				tmpFiles[i] = {};
				tmpFiles[i].icon = props.Core.Artifact.getEntypoIconForType(files[i].type);
				let sugPlay = files[i].sugPlay / props.Core.Artifact.getScale(props.artifact);
				let sugBuy = files[i].sugBuy / props.Core.Artifact.getScale(props.artifact);

				if (isNaN(sugPlay)){
					sugPlay = 0;
				}

				if (isNaN(sugBuy)){
					sugBuy = 0;
				}

				// eslint-disable-next-line
				let playDecimal = sugPlay - parseInt(sugPlay);
				// eslint-disable-next-line
				let buyDecimal = sugBuy - parseInt(sugBuy);

				if (playDecimal.toString().length === 3){
					sugPlay = sugPlay.toString() + "0";
				}
				if (buyDecimal.toString().length === 3){
					sugBuy = sugBuy.toString() + "0";
				}

				tmpFiles[i].fname = files[i].fname;
				tmpFiles[i].dname = files[i].dname;
				tmpFiles[i].type = files[i].type;
				tmpFiles[i].subtype = files[i].subtype;
				tmpFiles[i].disPlay = files[i].disPlay;
				tmpFiles[i].disBuy = files[i].disBuy;
				tmpFiles[i].sugPlay = sugPlay;
				tmpFiles[i].sugBuy = sugBuy;
			}
		}
	}
	toggleSeeMore(){
		this.setState({ extendedView: !this.state.extendedView })
	}
	render() {
		let niceTime = moment(this.props.Core.Artifact.getTimestamp(this.state.artifact) * 1000).calendar(null, {sameElse: "MMMM Do YYYY"});
		let description = this.props.Core.Artifact.getDescription(this.state.artifact);

		return (
			<div>
				<p style={{marginLeft: "0px", fontSize: "14px"}}>Published: <strong>{this.state.isFetching ? "loading..." : niceTime}</strong></p>
				<p style={this.state.extendedView ? 
					{textIndent: "40px", marginTop: "10px", whiteSpace: "pre-wrap"} 
					: 
					{textIndent: "40px", marginTop: "10px", whiteSpace: "pre-wrap", maxHeight:"150px", textOverflow: "ellipsis", overflow: "hidden"}}
				>
					<Linkify>{this.state.isFetching ? "loading..." : description}</Linkify>
				</p>
				<FilesTable extendedView={this.state.extendedView} Core={this.props.Core} store={this.props.store} piwik={this.props.piwik} NotificationSystem={this.props.NotificationSystem} />
				<div className="" style={{width: "100%", marginTop: "-5px"}}>
					<hr style={{marginTop: "25px", marginBottom: "-15px"}} />
					<button className="btn btn-sm btn-outline-secondary" style={{borderColor: "#333", color: "#333", margin: "0px auto", display:"block", backgroundColor:"#fff"}} onClick={this.toggleSeeMore}>{this.state.extendedView ? "See Less" : "See More"}</button>
				</div>
			</div>
		);
	}
}

export default ContentExtraInfo;

// <p style={{textIndent: "40px", marginTop: "10px"}}>{description.length > 350 ? description.substring(0,350) + "..." : description}</p>
// <div className="" style={{width: "100%", marginTop: "-5px"}}>
// 	<hr style={{marginTop: "25px", marginBottom: "-15px"}} />
// 	<button className="btn btn-sm btn-outline-secondary" style={{borderColor: "#333", color: "#333", margin: "0px auto", display:"block", backgroundColor:"#fff"}}>See More</button>
// </div>