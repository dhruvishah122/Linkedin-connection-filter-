chrome.runtime.onInstalled.addListener(() =>{
  console.log('Extension installed, updated to a new version, or Chrome is updated to a new version.')
});
chrome.runtime.onStartup.addListener(() => {
  console.log('User profile that has this extension is installed has first started up!');
});