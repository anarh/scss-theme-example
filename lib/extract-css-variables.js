const fs = require('fs');
const path = require('path');
const rework = require('rework');

const reworkExtractVariables = (options = { output: 'dist/variables.json'}) => {
  return (style) => {
    const cssVars = {};

    style.rules.forEach(rule => {
      if (rule.type !== 'rule') return;

      if (rule.selectors.length !== 1 || rule.selectors[0] !== ':root') return;

      rule.declarations.forEach((decl, i) => {
        const prop = decl.property;
        const value = decl.value;

        if (prop && prop.indexOf('--') === 0) {
          cssVars[prop] = value;
        }
      });
    });

    fs.writeFileSync(path.resolve(options.output), JSON.stringify(cssVars, null, 2));
  }
};

const extractCssVariables = (input = 'dist/index.css', output = 'dist/variables.json') => {
  const rawCss = fs.readFileSync(path.resolve(input), 'utf8');
  rework(rawCss).use(reworkExtractVariables({ output }));
};

extractCssVariables();
