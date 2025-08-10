// background.js - service worker for FavTheme auto-schedule
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['autoSchedule','nightHour','dayHour'], data => {
    if (data.autoSchedule === undefined) {
      chrome.storage.sync.set({autoSchedule:false, nightHour:20, dayHour:7, enabled:false});
    }
  });
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'favtheme_check') {
    const data = await chrome.storage.sync.get(['autoSchedule','nightHour','dayHour']);
    if (data.autoSchedule) {
      const now = new Date();
      const hour = now.getHours();
      const night = data.nightHour ?? 20;
      const day = data.dayHour ?? 7;
      const enable = (hour >= night || hour < day);
      await chrome.storage.sync.set({enabledBySchedule: enable});
      const tabs = await chrome.tabs.query({});
      for (const t of tabs) {
        chrome.tabs.sendMessage(t.id, {cmd:'updateSettings'}).catch(()=>{});
      }
    }
  }
});

chrome.alarms.create('favtheme_check', {periodInMinutes: 15});
