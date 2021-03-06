//import Core from 'alexandria-core';

export const SET_PAGE_TYPE = 'SET_PAGE_TYPE'

export const SEARCH_FOR_ARTIFACTS = "SEARCH_FOR_ARTIFACTS";
export const RANDOM_ARTIFACT_LIST = 'RANDOM_ARTIFACT_LIST'

export const REQUEST_ARTIFACT_LIST = 'REQUEST_ARTIFACT_LIST'
export const RECIEVE_ARTIFACT_LIST = 'RECIEVE_ARTIFACT_LIST'
export const INVALIDATE_ARTIFACT_LIST = 'INVALIDATE_ARTIFACT_LIST'
export const REQUEST_ARTIFACT_LIST_ERROR = 'REQUEST_ARTIFACT_LIST_ERROR'

export const REQUEST_CURRENT_ARTIFACT = 'REQUEST_CURRENT_ARTIFACT'
export const RECIEVE_CURRENT_ARTIFACT = 'RECIEVE_CURRENT_ARTIFACT'
export const INVALIDATE_CURRENT_ARTIFACT = 'INVALIDATE_CURRENT_ARTIFACT'
export const REQUEST_CURRENT_ARTIFACT_ERROR = 'REQUEST_CURRENT_ARTIFACT_ERROR'
export const SET_COMMENTS = 'SET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'

export const SET_ACTIVE_FILE_IN_PLAYLIST = 'SET_ACTIVE_FILE_IN_PLAYLIST'
export const SET_FILE_PLAYLIST = 'SET_FILE_PLAYLIST'
export const BUY_FILE = 'BUY_FILE'
export const PAY_FOR_FILE = 'PAY_FOR_FILE'
export const PAYMENT_IN_PROGRESS = 'PAYMENT_IN_PROGRESS'
export const PAYMENT_ERROR = 'PAYMENT_ERROR'
export const BUY_IN_PROGRESS = 'BUY_IN_PROGRESS'
export const BUY_ERROR = 'BUY_ERROR'
export const CLEAR_PAY_PROGRESS_ERROR = 'CLEAR_PAY_PROGRESS_ERROR'
export const ADD_FILE_TO_PLAYLIST = 'ADD_FILE_TO_PLAYLIST'
export const PLAYLIST_SKIP_BACK = 'PLAYLIST_SKIP_BACK'
export const PLAYLIST_NEXT = 'PLAYLIST_NEXT'
export const PLAYLIST_PAUSE = 'PLAYLIST_PAUSE'
export const PLAYLIST_PLAY = 'PLAYLIST_PLAY'
export const UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME'
export const UPDATE_IS_PLAYING = 'UPDATE_IS_PLAYING'
export const UPDATE_IS_PLAYABLE = 'UPDATE_IS_PLAYABLE'
export const UPDATE_IS_SEEKABLE = 'UPDATE_IS_SEEKABLE'
export const UPDATE_DURATION = 'UPDATE_DURATION'

export const UPDATE_WALLET = 'UPDATE_WALLET'
export const UPDATE_USD = 'UPDATE_USD'
export const UPDATE_BALANCE = 'UPDATE_BALANCE'
export const UPDATE_ADDRESSES = 'UPDATE_ADDRESSES'
export const UPDATE_COIN = 'UPDATE_COIN'

export const CHANGE_VOLUME = 'CHANGE_VOLUME'
export const CHANGE_MUTE = 'CHANGE_MUTE'

export const LATEST_CONTENT_LIST = 'LATEST_CONTENT_LIST'
export const SEARCH_PAGE_LIST = 'SEARCH_PAGE_LIST'

export const LOGIN_FETCHING = 'LOGIN_FETCHING'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'
export const PROMPT_LOGIN = 'PROMPT_LOGIN'
export const PROMPT_SWAP = 'PROMPT_SWAP'
export const PROMPT_BUY = 'PROMPT_BUY'
export const PROMPT_DAILY_FAUCET = 'PROMPT_DAILY_FAUCET'
export const SET_TRY_FAUCET = 'SET_TRY_FAUCET'
export const REGISTER_START = 'REGISTER_START'
export const REGISTER_ERROR = 'REGISTER_ERROR'

export const PAUSED = 'PAUSED'

export const setPageType = pg_type => ({
	type: SET_PAGE_TYPE,
	pg_type
})

export const requestArtifactList = page => ({
	type: REQUEST_ARTIFACT_LIST,
	page
})

export const recieveArtifactList = (page, items) => ({
	type: RECIEVE_ARTIFACT_LIST,
	page,
	items,
	receivedAt: Date.now()
})

export const invalidateArtifactList = page => ({
	type: INVALIDATE_ARTIFACT_LIST,
	page
})

export const requestArtifactListError = (page, errorText) => ({
	type: REQUEST_ARTIFACT_LIST_ERROR,
	page,
	errorText
})

export const fetchArtifactList = (Core, list_id, options) => dispatch => {
	dispatch(requestArtifactList(list_id));

	if (list_id === LATEST_CONTENT_LIST){
		Core.Index.getSupportedArtifacts(function(artifacts){
			dispatch(recieveArtifactList(list_id, artifacts.slice(0,100)));
		}, function(err){
			dispatch(requestArtifactListError(list_id));
		})
	} else if (list_id === SEARCH_PAGE_LIST) {
		Core.Index.search(options, function(results){
			dispatch(recieveArtifactList(list_id, results));
		}, function(err){
			dispatch(requestArtifactListError(list_id, err));
		});
	} else {
		Core.Index.getRandomSuggested(function(results){
			dispatch(recieveArtifactList(list_id, results))
		})
	}
}

export const requestCurrentArtifact = () => ({
	type: REQUEST_CURRENT_ARTIFACT	
})

export const recieveCurrentArtifact = artifact => ({
	type: RECIEVE_CURRENT_ARTIFACT,
	artifact: {...artifact},
	receivedAt: Date.now()
})

export const invalidateCurrentArtifact = () => ({
	type: INVALIDATE_CURRENT_ARTIFACT
})

export const requestCurrentArtifactError = error => ({
	type: REQUEST_CURRENT_ARTIFACT_ERROR,
	error
})

export const setComments = (comments) => ({
	type: SET_COMMENTS,
	comments
})

export const addSingleComment = (comment) => ({
	type: ADD_COMMENT,
	comment
})

export const addFileToPlaylist = (file, uid, Core) => ({
	type: ADD_FILE_TO_PLAYLIST,
	uid,
	isPaid: Core.Artifact.isFilePaid(file),
	file
})

export const setActiveFileInPlaylist = uid => ({
	type: SET_ACTIVE_FILE_IN_PLAYLIST,
	uid
})

export const payForFile = uid => ({
	type: PAY_FOR_FILE,
	uid
})

export const buyFile = uid => ({
	type: BUY_FILE,
	uid
})

export const paymentInProgress = uid => ({
	type: PAYMENT_IN_PROGRESS,
	uid
})

export const paymentError = uid => ({
	type: PAYMENT_ERROR,
	uid
})

export const buyInProgress = uid => ({
	type: BUY_IN_PROGRESS,
	uid
})

export const buyError = uid => ({
	type: BUY_ERROR,
	uid
})

export const clearPaymentProgressError = uid => ({
	type: CLEAR_PAY_PROGRESS_ERROR,
	uid
})

export const updateFileCurrentTime = (uid, currentTime) => ({
	type: UPDATE_CURRENT_TIME,
	uid,
	currentTime
})

export const updateFileDuration = (uid, duration) => ({
	type: UPDATE_DURATION,
	uid,
	duration
})

export const isPlayingFile = (uid, isPlaying) => ({
	type: UPDATE_IS_PLAYING,
	uid,
	isPlaying
})

export const isPlayableFile = (uid, isPlayable) => ({
	type: UPDATE_IS_PLAYABLE,
	uid,
	isPlayable
})

export const isSeekableFile = (uid, isSeekable) => ({
	type: UPDATE_IS_SEEKABLE,
	uid,
	isSeekable
})

export const setVolume = volume => ({
	type: CHANGE_VOLUME,
	volume
})

export const setMute = mute => ({
	type: CHANGE_MUTE,
	isMuted: mute
})

export const updateWallet = walletState => ({
	type: UPDATE_WALLET,
	walletState
})

export const updateWalletFunc = walletState => (dispatch, getState) => {
	let newState = walletState;
	let prevState = getState().Wallet;

	for (var coin in prevState){
		// console.log(coin, )
		if (newState[coin] && newState[coin].usd === 0 && prevState[coin] && prevState[coin].usd && prevState[coin].usd > 0){
			newState[coin].usd = prevState[coin].usd
		}
		if (typeof prevState[coin] !== "object"){
			newState[coin] = prevState[coin];
		}
	}

	dispatch(updateWallet(newState));
}

export const updateUSD = (coin, usd) => ({
	type: UPDATE_USD,
	coin,
	usd
})

export const updateBalance = (coin, balance) => ({
	type: UPDATE_BALANCE,
	coin,
	balance
})

export const updateAddresses = (coin, balance) => ({
	type: UPDATE_ADDRESSES,
	coin,
	balance
})

export const loginFetching = () => ({
	type: LOGIN_FETCHING
})

export const loginSuccess = (publisher) => ({
	type: LOGIN_SUCCESS,
	publisher
})

export const loginFailure = () => ({
	type: LOGIN_FAILURE
})

export const logoutAction = () => ({
	type: LOGOUT
})

export const logout = () => (dispatch) => {
	try {
		localStorage.username = "";
		localStorage.pw = "";
	} catch(e){ console.error(e) }
	dispatch(logoutAction())
}

export const loginPrompt = (prompt) => ({
	type: PROMPT_LOGIN,
	prompt
})

export const buyPrompt = (prompt) => ({
	type: PROMPT_BUY,
	prompt
})

export const swapPrompt = (prompt) => ({
	type: PROMPT_SWAP,
	prompt
})

export const faucetPrompt = (prompt) => ({
	type: PROMPT_DAILY_FAUCET,
	prompt
})

export const registerStarting = () => ({
	type: REGISTER_START
})

export const playlistNext = restrictions => (dispatch, getState) => {
	let FilePlaylist = getState().FilePlaylist;
	let active = FilePlaylist.active;

	let keys = Object.keys(FilePlaylist);

	for (var i = 0; i < keys.length; i++) {
		if (keys[i] === active){
			let nextI = i + 1;
			if (keys[nextI]){
				if (restrictions && restrictions.type){
					if (FilePlaylist[keys[nextI]].info.type === restrictions.type){
						dispatch(setActiveFileInPlaylist(keys[nextI]));
					}
				} else {
					dispatch(setActiveFileInPlaylist(keys[nextI]));
				}
			}
		}
	}
}

export const selectCurrentArtifact = (Core, txid, piwik) => dispatch => {
	dispatch(requestCurrentArtifact());

	Core.Index.getArtifactFromID(txid, function(artifact){
		dispatch(recieveCurrentArtifact(artifact));

		let files = Core.Artifact.getFiles(artifact);

		let publisher = Core.Artifact.getPublisher(artifact);
		let txid = Core.Artifact.getTXID(artifact);

		for (var i = 0; i < files.length; i++) {
			dispatch(addFileToPlaylist(files[i], txid + "|" + i, Core));
		}

		dispatch(setActiveFileInPlaylist(txid + "|" + 0));

		dispatch(getComments(Core, txid));

		piwik.push(['trackContentImpression', publisher, txid, ""])
	}, function(err){
		dispatch(requestCurrentArtifactError(err));
	});
}

export const getComments = (Core, url) => dispatch => {
	Core.Comments.get(url, function(res){
		if (res && res.data && res.data.replies){
			dispatch(setComments(res.data.replies))
		}
	})
}

export const addComment = (Core, url, comment) => dispatch => {
	Core.Comments.add(url, comment, function(res){
		dispatch(getComments(Core, url));
	})
}

export const setCurrentFile = (Core, artifact, file) => dispatch => {
	let files = Core.Artifact.getFiles(artifact);

	for (var i = 0; i < files.length; i++) {
		if (files[i].fname === file.fname && files[i].dname === file.dname){
			dispatch(setActiveFileInPlaylist(Core.Artifact.getTXID(artifact) + "|" + i));
		}
	}
}

export const promptLogin = (onSuccess, onError) => (dispatch, getState) => {
	dispatch(loginPrompt(true));

	var succeeded = false;
	let checkLogin = setInterval(() => {
		let state = getState();
		if (state.User.isLoggedIn && !succeeded){
			let shouldContinue = true;
			for (var coin in state.Wallet) {
				if (state.Wallet[coin].balance > 0 && (!state.Wallet[coin].usd || state.Wallet[coin].usd === 0)){
					shouldContinue = false;
				}
			}
			if (shouldContinue){
				succeeded = true;
				clearInterval(checkLogin);
				onSuccess();
			}
		}
	}, 1000)
}

export const promptCurrencyBuy = (coin, fiat, fiat_amount, paymentAddresses, onSuccess, onError) => (dispatch, getState) => {
	dispatch(buyPrompt(true));

	var succeeded = false;
	let checkBuy = setInterval(() => {
		let state = getState();
		for (var coin in paymentAddresses){
			if (state.Wallet[coin][fiat] >= fiat_amount && !succeeded){
				succeeded = true;
				clearInterval(checkBuy);
				dispatch(buyPrompt(false));
				onSuccess();
			}
		}
	}, 1000)
}

export const promptSwap = (coin, fiat, fiat_amount, paymentAddresses, onSuccess, onError) => (dispatch, getState) => {
	dispatch(swapPrompt(true));

	var succeeded = false;
	let checkSwap = setInterval(() => {
		let state = getState();
		for (var coin in paymentAddresses){
			if (state.Wallet[coin][fiat] >= fiat_amount && !succeeded){
				succeeded = true;
				clearInterval(checkSwap);
				dispatch(swapPrompt(false));
				onSuccess();
			}
		}
	}, 1000)
}

export const promptTryFaucet = (Core, onSuccess, onError) => (dispatch, getState) => {
	let intlState = getState();

	var succeeded = false;
	var heardFromCheck = false;
	let checkFaucet = setInterval(() => {
		let state = getState();
		if (state && state.Wallet && state.Wallet.florincoin){
			if (state.Wallet.tryFaucet === false && !succeeded && heardFromCheck){
				succeeded = true;
				clearInterval(checkFaucet);
				onSuccess();
			}
		}
	}, 200)

	Core.Wallet.checkDailyFaucet(intlState.Wallet.florincoin.mainAddress, (canReceive) => {
		if (canReceive){
			dispatch(faucetPrompt(true));
			heardFromCheck = true;
		} else {
			dispatch(setTryFaucet(false));
			clearInterval(checkFaucet);
			onSuccess();
		}
	}, (error) => {
		dispatch(setTryFaucet(false));
		onError(error);
	})
}

export const tryPaymentSend = (Core, NotificationSystem, paymentAddresses, fiat, fiat_amount, type, paymentName, onSuccess, onError) => (dispatch, getState) => {
	console.log(paymentAddresses);
	let retryTryPaymentSend = function(){
		dispatch(tryPaymentSend(Core, NotificationSystem, paymentAddresses, fiat, fiat_amount, type, paymentName, onSuccess, onError));
	}
	let processTransaction = function(addrList){
		dispatch(sendPayment(Core, NotificationSystem, addrList, fiat, fiat_amount, type, paymentName, onSuccess, onError));
	}

	let state = getState();

	if (state.User.isLoggedIn){
		var canProcessWith = {};
		for (var acceptedCoin in paymentAddresses){
			var tmpFiat = fiat;

			// If we are using the coin, then just check against the balance
			if (fiat === acceptedCoin)
				tmpFiat = "balance";

			if (state.Wallet[acceptedCoin] && state.Wallet[acceptedCoin][tmpFiat] && state.Wallet[acceptedCoin][tmpFiat] >= fiat_amount){
				canProcessWith[acceptedCoin] = paymentAddresses[acceptedCoin];
			}
		}
		if (Object.keys(canProcessWith).length > 0){
			console.log(canProcessWith);
			processTransaction(canProcessWith);
		} else {
			let swapFrom = [];
			let swapTo = [];

			for (var coin in state.Wallet) {
				console.log(state.Wallet[coin][fiat], fiat_amount);
				if (state.Wallet[coin][fiat] >= fiat_amount){
					swapFrom.push(coin);
				}
			}

			for (var coin in paymentAddresses) {
				swapTo.push(coin)
			}

			if (swapFrom.length > 0){
				dispatch(promptSwap(coin, fiat, fiat_amount, paymentAddresses, retryTryPaymentSend, onError));
			} else {
				var faucetUSDValue = 0.005;

				var canProcessWithIfFaucet = {};

				for (var acceptedCoin in paymentAddresses){
					if (state.Wallet[acceptedCoin] && state.Wallet[acceptedCoin][fiat]){
						var currentBalance = state.Wallet[acceptedCoin][fiat];
						if (parseFloat(currentBalance) + faucetUSDValue >= fiat_amount){
							canProcessWithIfFaucet[acceptedCoin] = paymentAddresses[acceptedCoin];
						}
					}
				}

				if (state.Wallet.tryFaucet && Object.keys(canProcessWithIfFaucet).length > 0){
					dispatch(promptTryFaucet(Core, retryTryPaymentSend, onError))
				} else {
					dispatch(promptCurrencyBuy(coin, fiat, fiat_amount, paymentAddresses, retryTryPaymentSend, onError))
				}
			}
		}
	} else {
		dispatch(promptLogin(retryTryPaymentSend, onError));
	}
}

export const sendPayment = (Core, NotificationSystem, paymentAddresses, fiat, fiat_amount, type, paymentName, onSuccess, onError) => (dispatch, getState) => {
	console.log("sendPayment", paymentAddresses, fiat, fiat_amount, type, paymentName);
	let state = getState();

	// Default send with lowest fee, this is just hardcoded for now...
	let coin = "";

	if (paymentAddresses.florincoin){
		coin = "florincoin"
	} else if (paymentAddresses.litecoin){
		coin = "litecoin"
	} else if (paymentAddresses.bitcoin){
		coin = "bitcoin"
	} else if (paymentAddresses === {}){
		onError("not enough balance in selected wallets...");
		return;
	}

	if (!paymentAddresses[coin])
		return;
	
	Core.Wallet.sendPayment(coin, fiat, fiat_amount, paymentAddresses[coin], (success) => {	
		if (NotificationSystem){
			let titleStr = "Payment";
			let msgStr = "Paid";

			if (type && type === "tip"){
				titleStr = "Tip";
				msgStr = "Tipped";
			}
			NotificationSystem.addNotification({title: titleStr + " Success!", message: msgStr + " $" + Core.util.createPriceString(fiat_amount) + " to " + paymentName, level: "success", position: "tr", autoDismiss: 2})
		}	

		onSuccess(success)
	}, (error) => {
		onError(error);
	})
}

export const tipFunc = (Core, artifact, paymentAmount, piwik, NotificationSystem, onSuccess, onError) => dispatch => {
	let txid = Core.Artifact.getTXID(artifact);
	let publisher = Core.Artifact.getPublisher(artifact);
	let publisherName = Core.Artifact.getPublisherName(artifact);

	let paymentAddresses = Core.Artifact.getPaymentAddresses(artifact);

	let id = txid;

	if (paymentAmount > 0){
		dispatch(tryPaymentSend(Core, NotificationSystem, paymentAddresses, "usd", paymentAmount, "tip", publisherName, onSuccess, onError));
	}

	try {
		piwik.push(["trackContentInteraction", "viewFile", publisher, txid]);
	} catch (e) {
		//console.log(e);
	}
}

export const payForFileFunc = (Core, artifact, file, piwik, NotificationSystem, onSuccess, onError) => dispatch => {
	let txid = Core.Artifact.getTXID(artifact);
	let publisher = Core.Artifact.getPublisher(artifact);
	let publisherName = Core.Artifact.getPublisherName(artifact);
	let files = Core.Artifact.getFiles(artifact);

	let paymentAmount = file.sugPlay / Core.Artifact.getScale(artifact);

	let paymentAddresses = Core.Artifact.getPaymentAddresses(artifact, file);

	for (var i = 0; i < files.length; i++) {
		if (files[i].fname === file.fname && files[i].dname === file.dname){
			let id = txid + "|" + i;

			if (file.sugPlay && paymentAmount > 0){
				// If file has cost
				dispatch(paymentInProgress(id));

				dispatch(tryPaymentSend(Core, NotificationSystem, paymentAddresses, "usd", paymentAmount, "pay", publisherName, (success) => {
					dispatch(payForFile(id));
					dispatch(setActiveFileInPlaylist(id));

					onSuccess(success)
				}, (error) => {
					dispatch(paymentError(id));
					onError(error);
				}));
			} else {
				// If it is free
				dispatch(payForFile(id));
				dispatch(setActiveFileInPlaylist(id));
			}

			try {
				piwik.push(["trackContentInteraction", "viewFile", publisher, txid, i]);
			} catch (e) {
				//console.log(e);
			}	
		}
	}
}

export const buyFileFunc = (Core, artifact, file, piwik, NotificationSystem, onSuccess, onError) => dispatch => {
	let txid = Core.Artifact.getTXID(artifact);
	let publisher = Core.Artifact.getPublisher(artifact);
	let publisherName = Core.Artifact.getPublisherName(artifact);
	let files = Core.Artifact.getFiles(artifact);

	let paymentAmount = file.sugBuy / Core.Artifact.getScale(artifact);

	let paymentAddresses = Core.Artifact.getPaymentAddresses(artifact, file);

	let filei = 0;

	for (var i = 0; i < files.length; i++) {
		if (files[i].fname === file.fname && files[i].dname === file.dname){
			filei = i;
			if (file.sugBuy && paymentAmount > 0){
				// If file has cost
				dispatch(buyInProgress(txid));
				dispatch(tryPaymentSend(Core, NotificationSystem, paymentAddresses, "usd", paymentAmount, "pay", publisherName, (success) => {	
					dispatch(setActiveFileInPlaylist(txid + "|" + filei));
					dispatch(buyFile(txid + "|" + filei));

					onSuccess(success);
				}, (error) => {
					dispatch(buyError(txid));
					onError(error);
				}));
			} else {
				// If it is free
				dispatch(setActiveFileInPlaylist(txid + "|" + filei));
				dispatch(buyFile(txid + "|" + filei));
			}

			try {
				piwik.push(["trackContentInteraction", "buyFile", publisher, txid, filei]);
			} catch (e) {
				//console.log(e)
			}	
		}
	}
}

export const setupWalletEvents = (Core) => dispatch => {
	Core.Wallet.on("bal-update", function(newState){
		dispatch(updateWalletFunc(newState));

		Core.Data.getBTCPrice(function(price){
			if (newState.bitcoin && newState.bitcoin.balance && newState.bitcoin.balance > 0)
				dispatch(updateUSD('bitcoin', parseFloat(price * newState.bitcoin.balance)))
		})

		Core.Data.getFLOPrice(function(price){
			if (newState.florincoin && newState.florincoin.balance && newState.florincoin.balance > 0)
				dispatch(updateUSD('florincoin', parseFloat(price * newState.florincoin.balance)))
		})

		Core.Data.getLTCPrice(function(price){
			if (newState.litecoin && newState.litecoin.balance && newState.litecoin.balance > 0)
				dispatch(updateUSD('litecoin', parseFloat(price * newState.litecoin.balance)))
		})
	})
}

export const login = (Core, identifier, password) => dispatch => {
	dispatch(loginFetching());

	Core.User.Login(identifier, password, (publisher) => {
		// On Success
		dispatch(loginSuccess(publisher));
	}, (error) => {
		// On Error
		dispatch(loginFailure());
	})
}

export const register = (Core, username, email, password, recaptcha, onSuccess, onError) => (dispatch, getState) => {
	dispatch(registerStarting());

	Core.User.Register(email, password, function(wallet){
		var state = getState();

		let floAddress = "";
		try {
			floAddress = state.Wallet.florincoin.mainAddress;
		} catch (e) {
			console.error(e);
		}

		if (floAddress === ""){
			onError("Error, cannot get FLo Address")
			return;
		}

		Core.Wallet.tryOneTimeFaucet(floAddress, recaptcha, function(res, txinfo){
			Core.Publisher.Register(username, floAddress, email, function(pub){
				console.log(pub);
				dispatch(loginSuccess(pub));
				onSuccess();
			}, function(error){
				onError(error);
			})
		}, function(error){
			onError(error);
		})
	}, function(error){
		onError(error);
	})
}

export const setTryFaucet = (newValue) => ({
	type: SET_TRY_FAUCET,
	tryFaucet: newValue
})

export const tryDailyFaucet = (Core, recaptcha, onSuccess, onError) => dispatch => {
	Core.Wallet.tryDailyFaucet(Core.Wallet.getMainAddress('florincoin'), recaptcha, function(success){
		console.log(success);
		dispatch(setTryFaucet(false));
		onSuccess();
	}, function(error){
		console.error(error);
		dispatch(setTryFaucet(false));
		onError(error);
	})
}




















