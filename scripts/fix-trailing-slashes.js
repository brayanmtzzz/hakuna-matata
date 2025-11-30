const fs = require('fs');
const path = require('path');

const VOID_ELEMENTS = [
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
];

const DIRS_TO_PROCESS = [
  path.join(process.cwd(), '.next', 'server', 'app'),
  path.join(process.cwd(), '.next', 'server', 'pages'),
  path.join(process.cwd(), 'out'),
];

function processHtmlFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let replacements = 0;

    VOID_ELEMENTS.forEach(element => {
      const regex = new RegExp(`<${element}([^>]*?)\\s*\\/\\s*>`, 'gi');
      const matches = content.match(regex);

      if (matches) {
        replacements += matches.length;
        content = content.replace(regex, `<${element}$1>`);
      }
    });

    if (replacements > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
    }

    return replacements;
  } catch (error) {
    return 0;
  }
}

function findHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function main() {
  let totalReplacements = 0;

  DIRS_TO_PROCESS.forEach(dir => {
    if (!fs.existsSync(dir)) {
      return;
    }

    const htmlFiles = findHtmlFiles(dir);

    htmlFiles.forEach(file => {
      const replacements = processHtmlFile(file);
      totalReplacements += replacements;
    });
  });

  process.exit(0);
}

main();
