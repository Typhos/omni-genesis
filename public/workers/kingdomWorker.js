
self.onmessage = async (data) => {
  if ( data && data.name ) {
    self.postMessage("hi "+data.name);
  } else {
    self.postMessage("no name provided");
  }
};
