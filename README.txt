# FavTheme Chrome Extension

---

## Overview

**FavTheme** is a powerful Chrome extension that allows users to apply customizable color themes (including dark mode and many others) to any website. It helps reduce eye strain and makes browsing more comfortable, especially in low-light conditions. FavTheme supports applying themes either to the current page or globally across all sites you visit.

---

## What Is FavTheme?

FavTheme is a multi-theme Chrome extension designed to force websites into a variety of visually appealing modes, including dark themes, sepia, solarized, and more. Unlike simple dark mode extensions, FavTheme offers:

- Multiple themes (10+ options) beyond just dark mode.
- Per-page or global theme application.
- Brightness adjustment slider for fine-tuning display.
- Exclude list to prevent themes on specific websites.
- Auto-scheduling to automatically switch themes at night.
- Professional, easy-to-use UI.

---

## How It Works

1. **User Interaction**

   Users can open the extension popup by clicking the FavTheme icon in the Chrome toolbar.

2. **Theme Selection**

   Choose from a dropdown of 10+ preset themes such as Dark, Solarized Dark, Sepia, Forest, Ocean, and more.

3. **Apply Mode**

   - **Current Page:** Applies the selected theme only on the active browser tab.
   - **Global:** Applies the selected theme on all websites you open or browse to, except those on the exclude list.

4. **Brightness Adjustment**

   Use the brightness slider to lighten or darken the theme effect in real-time.

5. **Exclude List**

   Manage a list of websites where themes will not be applied globally (e.g., sites that already have a good built-in dark mode).

6. **Auto-Schedule**

   Enable night mode that automatically applies themes during specified hours (currently toggleable for future extension).

7. **Real-Time Updates**

   All changes apply immediately without needing to reload pages manually.

---

## Features

- **Multiple Predefined Themes:**  
  Dark, Solarized Dark, Solarized Light, Midnight, Sepia, Forest, Rose, Slate, Copper, Ocean, and more.

- **Mode Toggle:**  
  Choose to apply theme to the current tab or globally across all browsing.

- **Brightness Control:**  
  Adjust the brightness dynamically with a smooth slider.

- **Exclude List:**  
  Add or remove websites where global themes should not apply.

- **Auto-Schedule Support:**  
  Enable theme application only during night hours to reduce eye strain.

- **Professional UI:**  
  Clean, responsive popup and options pages designed for ease of use.

- **Permissions:**  
  Uses Chrome storage, tabs, scripting, and activeTab APIs to manage theme application efficiently and securely.

---

## How It Was Made

- **Technologies Used:**  
  - JavaScript for extension logic  
  - Chrome Manifest V3  
  - HTML/CSS for UI popup and options pages  
  - Chrome Storage API for saving user preferences  
  - Chrome Scripting API to inject CSS dynamically into web pages  

- **Development Approach:**  
  - The extension listens for user input in the popup to save theme and mode preferences.  
  - When global mode is enabled, the background service worker injects CSS into all open tabs (except excluded sites).  
  - For per-page mode, CSS is injected only into the current tab.  
  - The brightness slider adjusts CSS filter properties on the fly.  
  - Options page allows managing excluded sites that prevent global theme injection.  

- **CSS Themes:**  
  Each theme is defined as a CSS string that sets background colors, text colors, link colors, and image/video filters to ensure content remains visually clear and accessible.

---

## How to Use FavTheme

1. **Install the Extension**

   - Download the `FavTheme.zip` file.
   - Extract it to a local folder.

2. **Load into Chrome**

   - Open `chrome://extensions/` in your browser.
   - Enable **Developer mode** (toggle top right).
   - Click **Load unpacked** and select the extracted FavTheme folder.

3. **Open the Popup**

   - Click the FavTheme icon next to the address bar.

4. **Choose Your Theme**

   - Select a theme from the dropdown menu.
   - Adjust brightness with the slider.

5. **Apply Mode**

   - Select whether to apply the theme only on the current page or globally.

6. **Save Settings**

   - Your preferences save automatically.
   - Themes apply instantly to the current tab or all tabs (for global mode).

7. **Manage Excluded Sites**

   - From the popup, click "Manage Exclude Sites" to open the options page.
   - Add or remove sites where you don’t want the global theme applied.

8. **Auto Schedule (Optional)**

   - Enable auto scheduling to restrict theme application to night hours (feature placeholder for future update).

---

## Notes & Recommendations

- **Page Layout Issues:**  
  FavTheme ensures minimal content overlap by applying `box-sizing: border-box` and limiting element widths. If you notice layout issues on specific websites, consider adding those sites to the exclude list.

- **Images and Videos:**  
  The extension applies brightness and contrast filters on media to avoid incorrect color inversions.

- **Privacy:**  
  FavTheme does not collect any personal data. All settings are stored locally in Chrome's sync storage.

---

## Contributions & Feedback

This is an open project and contributions are welcome! Feel free to open issues or submit pull requests to improve themes, add features, or enhance usability.

---

## License

This project is open-source and free to use.

---

Thank you for choosing **FavTheme** — browse comfortably with style!

---

*For any questions or support, reach out to the developer.*
