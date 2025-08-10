// popup.js - controls UI and updates storage; notifies the current tab to (re)apply settings
const $ = (id) => document.getElementById(id);

async function init() {
  const data = await chrome.storage.sync.get(['enabled','brightness','exclude','autoSchedule','enabledBySchedule','nightHour','dayHour']);
  $('toggleEnable').checked = !!data.enabled;
  $('brightness').value = (data.brightness ?? 0.9);
  $('autoSchedule').checked = !!data.autoSchedule;
  $('globalStatus').innerText = (data.enabled || data.enabledBySchedule) ? 'Active' : 'Inactive';

  // events
  $('toggleEnable').addEventListener('change', async (e) => {
    await chrome.storage.sync.set({enabled: e.target.checked});
    notifyTabs('updateSettings');
    $('globalStatus').innerText = e.target.checked ? 'Active' : 'Inactive';
  });

  $('brightness').addEventListener('input', async (e) => {
    const v = parseFloat(e.target.value);
    await chrome.storage.sync.set({brightness: v});
    notifyTabs('updateSettings');
  });

  $('autoSchedule').addEventListener('change', async (e) => {
    await chrome.storage.sync.set({autoSchedule: e.target.checked});
    notifyTabs('updateSettings');
  });

  $('setNight').addEventListener('click', async () => {
    await chrome.storage.sync.set({nightHour:20, dayHour:7});
    alert('Night schedule set: 20:00 - 07:00');
  });

  $('setDay').addEventListener('click', async () => {
    await chrome.storage.sync.set({nightHour:0, dayHour:24});
    alert('Auto-schedule disabled by setting day range.');
  });

  $('excludeSite').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({active:true,currentWindow:true});
    const url = new URL(tab.url);
    const origin = url.origin;
    const d = await chrome.storage.sync.get('exclude');
    const arr = d.exclude || [];
    if (!arr.includes(origin)) {
      arr.push(origin);
      await chrome.storage.sync.set({exclude:arr});
      alert('Added to exclusion list: ' + origin);
      notifyTabs('updateSettings');
    } else {
      alert('Site already in exclusion list.');
    }
  });

  $('openManage').addEventListener('click', async () => {
    const d = await chrome.storage.sync.get('exclude');
    const arr = d.exclude || [];
    const list = arr.join('\n') || '(none)';
    const edited = prompt('Excluded sites (one per line). Edit to replace list:', list);
    if (edited !== null) {
      const newarr = edited.split('\n').map(s=>s.trim()).filter(Boolean);
      await chrome.storage.sync.set({exclude:newarr});
      alert('Saved exclusion list.');
      notifyTabs('updateSettings');
    }
  });

  $('applyNow').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({active:true,currentWindow:true});
    chrome.scripting.executeScript({target:{tabId:tab.id}, files:['content.js']}, ()=>{
      chrome.tabs.sendMessage(tab.id, {cmd:'applyNow'});
    });
  });

  $('removeNow').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({active:true,currentWindow:true});
    chrome.scripting.executeScript({target:{tabId:tab.id}, files:['content.js']}, ()=>{
      chrome.tabs.sendMessage(tab.id, {cmd:'removeNow'});
    });
  });
}

function notifyTabs(cmd) {
  chrome.tabs.query({}, (tabs) => {
    for (const t of tabs) {
      chrome.tabs.sendMessage(t.id, {cmd}).catch(()=>{});
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
