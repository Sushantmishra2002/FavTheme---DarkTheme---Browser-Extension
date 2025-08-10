// content.js - applies the dark theme dynamically and listens for setting updates
(function(){
  const STYLE_ID = 'favtheme-injected-style';
  let settings = { enabled: false, brightness: 0.9, exclude: [] , enabledBySchedule: false };

  function isExcluded(origin) {
    return (settings.exclude || []).some(e => e && origin.includes(e));
  }

  function createCSS(brightness){
    return `
    html, body, :root { background-color: #0b0f12 !important; color: #e6eef9 !important; }
    body, div, section, article, aside, header, footer, main, p, span, a, li, ul, ol, table, td, th {
      background-color: transparent !important;
      color: inherit !important;
      border-color: rgba(255,255,255,0.06) !important;
      box-shadow: none !important;
    }
    a { color: #7ec7ff !important; }
    input, textarea, select, button { background-color: rgba(255,255,255,0.02) !important; color: inherit !important; border-color: rgba(255,255,255,0.06) !important; }
    img, video, svg, picture, iframe { filter: none !important; opacity: 1 !important; background: transparent !important }
    * { transition: background-color 0.15s ease, color 0.15s ease !important; }
    html { filter: brightness(${brightness}) !important; }
    `;
  } 

  function applyStyle(b) {
    removeStyle();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = createCSS(b);
    document.documentElement.prepend(style);
  }

  function removeStyle() {
    const existing = document.getElementById(STYLE_ID);
    if (existing) existing.remove();
  }

  chrome.storage.sync.get(['enabled','brightness','exclude','enabledBySchedule'], data => {
    settings = Object.assign(settings, data);
    const origin = location.origin;
    const enabledGlobally = settings.enabled || false;
    const enabledBySchedule = settings.enabledBySchedule || false;
    const shouldApply = (enabledGlobally || enabledBySchedule) && !isExcluded(origin);
    if (shouldApply) applyStyle(settings.brightness ?? 0.9);
  });

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.cmd === 'updateSettings') {
      chrome.storage.sync.get(['enabled','brightness','exclude','enabledBySchedule'], data => {
        settings = Object.assign(settings, data);
        const origin = location.origin;
        const shouldApply = (settings.enabled || settings.enabledBySchedule) && !isExcluded(origin);
        if (shouldApply) applyStyle(settings.brightness ?? 0.9);
        else removeStyle();
      });
    }
    if (msg.cmd === 'applyNow') {
      chrome.storage.sync.get(['brightness'], data => applyStyle(data.brightness ?? 0.9));
    }
    if (msg.cmd === 'removeNow') {
      removeStyle();
    }
  });
})();
