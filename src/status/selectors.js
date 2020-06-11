function getMessage(state) {
  return state.message;
}

function checkIsWaiting(state) {
  return state.isWaiting;
}

export default {
  getMessage,
  checkIsWaiting,
};
