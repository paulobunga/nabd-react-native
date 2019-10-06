import {
  TOGGLE_AUDIO_STATE,
  TOGGLE_VIDEO_STATE,
  SET_LOCAL_VIDEO_STREAM_ID,
  SET_REMOTE_VIDEO_STREAM_ID,
  RESET_CALL_OPTIONS
} from '../actions/types';

const INTIAL_STATE = {
  isAudioMuted: false,
  // isVideoSent: this.isVideoCall,
  isVideoSent: true,
  localVideoStreamId: null,
  remoteVideoStreamId: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_AUDIO_STATE:
      return { ...state, isAudioMuted: !state.isAudioMuted };
    case TOGGLE_VIDEO_STATE:
      return { ...state, isVideoSent: !state.isVideoSent };
    case SET_LOCAL_VIDEO_STREAM_ID:
      return { ...state, localVideoStreamId: action.payload };
    case SET_REMOTE_VIDEO_STREAM_ID:
      return { ...state, remoteVideoStreamId: action.payload };
    case RESET_CALL_OPTIONS:
      return INTIAL_STATE;
    default:
      return state;
  }
};