export const formatTime = (time) => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return min + ':' + ((sec<10) ? ('0' + sec) : sec);
}
