const fs = require('fs');
const path = require('path');

const extractCssVariables = (input = 'dist/index.css', output = 'dist/variables.json') => {
  const cssVars = {};
  const rawCss = fs.readFileSync(path.resolve(input), 'utf8');
  const parsedCSS = rawCss.match(/(--)+[_a-zA-Z0-9.-]+[\s]?:([\s\S]*?(?=([;|}])))/gi);

  for (let rule in parsedCSS) {
    const variable = parsedCSS[rule].split(/:(.+)/);
    cssVars[variable[0]] = variable[1].trim();
  }

  fs.writeFileSync(path.resolve(output), JSON.stringify(cssVars, null, 2));
};

extractCssVariables();
