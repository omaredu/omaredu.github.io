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
		<real>0.29411765933036804</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.27058824896812439</real>
		<key>Red Component</key>
		<real>0.26274511218070984</real>
	</dict>
	<key>Ansi 1 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.47843137383460999</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.54117649793624878</real>
		<key>Red Component</key>
		<real>1</real>
	</dict>
	<key>Ansi 10 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.92156863212585449</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.98039215803146362</real>
		<key>Red Component</key>
		<real>0.69411766529083252</real>
	</dict>
	<key>Ansi 11 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.30980393290519714</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.63137257099151611</real>
		<key>Red Component</key>
		<real>1</real>
	</dict>
	<key>Ansi 12 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.87450981140136719</real>
		<key>Red Component</key>
		<real>0.41960784792900085</real>
	</dict>
	<key>Ansi 13 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.72156864404678345</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.5215686559677124</real>
		<key>Red Component</key>
		<real>1</real>
	</dict>
	<key>Ansi 14 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.81176471710205078</real>
		<key>Red Component</key>
		<real>0.89803922176361084</real>
	</dict>
	<key>Ansi 15 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>1</real>
		<key>Red Component</key>
		<real>1</real>
	</dict>
	<key>Ansi 2 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.73725491762161255</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.78823530673980713</real>
		<key>Red Component</key>
		<real>0.51372551918029785</real>
	</dict>
	<key>Ansi 3 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.40784314274787903</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.7764706015586853</real>
		<key>Red Component</key>
		<real>0.85098040103912354</real>
	</dict>
	<key>Ansi 4 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.90196079015731812</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.76862746477127075</real>
		<key>Red Component</key>
		<real>0.30588236451148987</real>
	</dict>
	<key>Ansi 5 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.72156864404678345</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.5215686559677124</real>
		<key>Red Component</key>
		<real>1</real>
	</dict>
	<key>Ansi 6 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.63137257099151611</real>
		<key>Red Component</key>
		<real>0.80392158031463623</real>
	</dict>
	<key>Ansi 7 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>1</real>
		<key>Red Component</key>
		<real>1</real>
	</dict>
	<key>Ansi 8 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.56862747669219971</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.5372549295425415</real>
		<key>Red Component</key>
		<real>0.51372551918029785</real>
	</dict>
	<key>Ansi 9 Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.47843137383460999</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.54117649793624878</real>
		<key>Red Component</key>
		<real>1</real>
	</dict>
	<key>Background Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.14117647707462311</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.12156862765550613</real>
		<key>Red Component</key>
		<real>0.12156862765550613</real>
	</dict>
	<key>Badge Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>0.5</real>
		<key>Blue Component</key>
		<real>0.0</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.1491314172744751</real>
		<key>Red Component</key>
		<real>1</real>
	</dict>
	<key>Bold Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>1</real>
		<key>Red Component</key>
		<real>1</real>
	</dict>
	<key>Cursor Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>1</real>
		<key>Red Component</key>
		<real>1</real>
	</dict>
	<key>Cursor Guide Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>0.25</real>
		<key>Blue Component</key>
		<real>1</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.9268307089805603</real>
		<key>Red Component</key>
		<real>0.70213186740875244</real>
	</dict>
	<key>Cursor Text Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.14117647707462311</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.12156862765550613</real>
		<key>Red Component</key>
		<real>0.12156862765550613</real>
	</dict>
	<key>Foreground Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>1</real>
		<key>Red Component</key>
		<real>1</real>
	</dict>
	<key>Link Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.87450981140136719</real>
		<key>Red Component</key>
		<real>0.41960784792900085</real>
	</dict>
	<key>Selected Text Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>1</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>1</real>
		<key>Red Component</key>
		<real>1</real>
	</dict>
	<key>Selection Color</key>
	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>0.29411765933036804</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>0.27058824896812439</real>
		<key>Red Component</key>
		<real>0.26274511218070984</real>
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
