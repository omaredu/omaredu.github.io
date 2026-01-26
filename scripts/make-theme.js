import fs from "fs";

// 1. Paste your XML content here or read from a file
const itermThemeXml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
	<key>Ansi 0 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.1098</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.0824</real>
		<key>Red Component</key>
		<real>0.0667</real>
	</dict>
	<key>Ansi 1 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.451</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.4235</real>
		<key>Red Component</key>
		<real>0.9176</real>
	</dict>
	<key>Ansi 10 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.298</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.851</real>
		<key>Red Component</key>
		<real>0.6667</real>
	</dict>
	<key>Ansi 11 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.3294</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.7059</real>
		<key>Red Component</key>
		<real>1.0</real>
	</dict>
	<key>Ansi 12 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1.0</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.7608</real>
		<key>Red Component</key>
		<real>0.349</real>
	</dict>
	<key>Ansi 13 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1.0</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.651</real>
		<key>Red Component</key>
		<real>0.8235</real>
	</dict>
	<key>Ansi 14 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.7961</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.902</real>
		<key>Red Component</key>
		<real>0.5843</real>
	</dict>
	<key>Ansi 15 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1.0</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>1.0</real>
		<key>Red Component</key>
		<real>1.0</real>
	</dict>
	<key>Ansi 2 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.3843</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.851</real>
		<key>Red Component</key>
		<real>0.498</real>
	</dict>
	<key>Ansi 3 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.3098</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.6863</real>
		<key>Red Component</key>
		<real>0.9765</real>
	</dict>
	<key>Ansi 4 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.9804</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.7412</real>
		<key>Red Component</key>
		<real>0.3255</real>
	</dict>
	<key>Ansi 5 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.9804</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.6314</real>
		<key>Red Component</key>
		<real>0.8039</real>
	</dict>
	<key>Ansi 6 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.7765</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.8824</real>
		<key>Red Component</key>
		<real>0.5647</real>
	</dict>
	<key>Ansi 7 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.7804</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.7804</real>
		<key>Red Component</key>
		<real>0.7804</real>
	</dict>
	<key>Ansi 8 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.4078</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.4078</real>
		<key>Red Component</key>
		<real>0.4078</real>
	</dict>
	<key>Ansi 9 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.4706</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.4431</real>
		<key>Red Component</key>
		<real>0.9412</real>
	</dict>
	<key>Background Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.0784</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.0549</real>
		<key>Red Component</key>
		<real>0.0431</real>
	</dict>
	<key>Bold Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.7137</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.7412</real>
		<key>Red Component</key>
		<real>0.749</real>
	</dict>
	<key>Cursor Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.3137</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.7059</real>
		<key>Red Component</key>
		<real>0.902</real>
	</dict>
	<key>Cursor Guide Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.3137</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.7059</real>
		<key>Red Component</key>
		<real>0.902</real>
	</dict>
	<key>Cursor Text Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.0784</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.0549</real>
		<key>Red Component</key>
		<real>0.0431</real>
	</dict>
	<key>Foreground Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.7137</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.7412</real>
		<key>Red Component</key>
		<real>0.749</real>
	</dict>
	<key>Selected Text Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.0784</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.0549</real>
		<key>Red Component</key>
		<real>0.0431</real>
	</dict>
	<key>Selection Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1.0</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.6235</real>
		<key>Red Component</key>
		<real>0.251</real>
	</dict>
  </dict>
  </plist>
`;

function convertItermToXterm(xmlContent) {
  // Helper to convert 0-1 float to 00-FF hex
  const toHex = (num) => {
    const val = Math.round(parseFloat(num) * 255);
    return val.toString(16).padStart(2, "0").toUpperCase();
  };

  // Mapping from iTerm keys to Xterm.js keys
  const colorMap = {
    "Ansi 0 Color": "black",
    "Ansi 1 Color": "red",
    "Ansi 2 Color": "green",
    "Ansi 3 Color": "yellow",
    "Ansi 4 Color": "blue",
    "Ansi 5 Color": "magenta",
    "Ansi 6 Color": "cyan",
    "Ansi 7 Color": "white",
    "Ansi 8 Color": "brightBlack",
    "Ansi 9 Color": "brightRed",
    "Ansi 10 Color": "brightGreen",
    "Ansi 11 Color": "brightYellow",
    "Ansi 12 Color": "brightBlue",
    "Ansi 13 Color": "brightMagenta",
    "Ansi 14 Color": "brightCyan",
    "Ansi 15 Color": "brightWhite",
    "Background Color": "background",
    "Foreground Color": "foreground",
    "Cursor Color": "cursor",
    "Cursor Text Color": "cursorAccent",
    "Selection Color": "selectionBackground",
    "Selected Text Color": "selectionForeground",
  };

  const xtermTheme = {};

  // Regex to capture the Key and the following Dict with RGB values
  // This assumes the standard iTerm2 plist formatting
  const dictRegex = /<key>(.*?)<\/key>\s*<dict>(.*?)<\/dict>/gs;
  const componentRegex =
    /<key>(Red|Green|Blue) Component<\/key>\s*<real>(.*?)<\/real>/g;

  let match;
  while ((match = dictRegex.exec(xmlContent)) !== null) {
    const itermKey = match[1];
    const colorData = match[2];

    if (colorMap[itermKey]) {
      let r = "00",
        g = "00",
        b = "00";

      let componentMatch;
      while ((componentMatch = componentRegex.exec(colorData)) !== null) {
        const component = componentMatch[1];
        const value = componentMatch[2];

        if (component === "Red") r = toHex(value);
        if (component === "Green") g = toHex(value);
        if (component === "Blue") b = toHex(value);
      }

      xtermTheme[colorMap[itermKey]] = `#${r}${g}${b}`;
    }
  }

  return JSON.stringify(xtermTheme, null, 2);
}

// Run the conversion
// If you are reading from a file use: const xml = fs.readFileSync('MyTheme.itermcolors', 'utf8');
console.log(convertItermToXterm(itermThemeXml));
