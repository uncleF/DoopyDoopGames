import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import * as zlib from 'zlib';
import * as sass from 'sass';
import * as htmlMinifier from 'html-minifier';

const GOOGLE_ADS = `
<div class="adUnit">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4146222498178111" crossorigin="anonymous"></script>
  <!-- Sunny Sudoku WebGL Ad Unit -->
  <ins class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-4146222498178111"
      data-ad-slot="1779061154"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>
`;

function removeAppFolder() {
  return new Promise((resolve, reject) => {
    rimraf('./build/_app', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
}

function buildSass() {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        file: './src/styles/styles.scss',
        outFile: './build/styles.css',
        outputStyle: 'compressed'
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (!fs.existsSync('./build/css/')) {
            fs.mkdirSync('./build/css/', { recursive: true });
          }
          const writeableStream = fs.createWriteStream('./build/css/styles.css');
          writeableStream.write(result.css);
          resolve();
        }
      }
    );
  })
}

function processHTMLFiles() {
  const htmlFiles = findHTMLFiles('./build');
  return Promise.all(htmlFiles.map(processHTMLFile));
}

function processHTMLFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        let result = data.replace(/(?:<.*\/_app\/immutable.*?>)|(?:\sdata-svelte-h=".*?")|(?:<!-- HEAD_svelte.*? -->)|(?:<!-- .*? -->)|(?:<script>(?:\n|\t)*{(?:\n|\t)*__sveltekit_(?:.|\n|\t)*?<\/script>)/g, '');
        result = result.replace(/<title>/g, `<link rel="preload" href="/css/styles.css?v=${Date.now()}" as="style"><link rel="stylesheet" href="/css/styles.css?v=${Date.now()}" media="print" onload="this.media='all'">\n    <title>`);
        result = result.replace(/<a href="\/(.+?)"/g, '<a href="/$1.html"');
        result = result.replace(/<meta property="og:url" content="https:\/\/([a-zA-Z/.]*\/[a-zA-Z/-]+?)"/g, '<meta property="og:url" content="https://$1.html"');
        result = result.replace(/<meta name="twitter:site" content="https:\/\/([a-zA-Z/.]*\/[a-zA-Z/-]+?)"/g, '<meta name="twitter:site" content="https://$1.html"');
        result = result.replace(/<link rel="canonical" href="https:\/\/([a-zA-Z/.]*\/[a-zA-Z/-]+?)"/g, '<link rel="canonical" href="https://$1.html"');
        result = result.replace(/<\/body>/g, `    <script async src="/js/scripts.js?v=${Date.now()}"></script>\n</body>`);
        result = htmlMinifier.minify(result, {
          caseSensitive: false,
          collapseBooleanAttributes: true,
          collapseInlineTagWhitespace: false,
          collapseWhitespace: true,
          conservativeCollapse: false,
          includeAutoGeneratedTags: false,
          keepClosingSlash: false,
          minifyCSS: true,
          minifyJS: true,
          preserveLineBreaks: false,
          removeAttributeQuotes: false,
          removeComments: true,
          removeRedundantAttributes: false,
          removeTagWhitespace: false,
          useShortDoctype: false
        });
        if (shouldAddGoogleAds(filePath)) {
          result = result.replace(/<\/body>/g, `${GOOGLE_ADS}</body>`);
        }
        fs.writeFile(filePath, result, 'utf8', (err) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve();
        });
      }
    });
  });
}

function shouldAddGoogleAds(filePath) {
  // const fileName = path.basename(filePath);
  // return fileName === 'play.html';
  return false;
}

function findHTMLFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    const filePath = dirPath + '/' + file;
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = findHTMLFiles(dirPath + '/' + file, arrayOfFiles);
    } else if (path.extname(file) === '.html') {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });
  return arrayOfFiles;
}

function compressFiles() {
  const files = findCompressableFiles('./build');
    return Promise.all(files.map(compressFile));
}

function  compressFile(filePath) {
  return Promise.all([
    compressFileGZIP(filePath),
    compressFileBrotli(filePath)
  ]);
}

function compressFileGZIP(filePath) {
  const stream = fs.createReadStream(filePath);
  return new Promise((resolve, reject) => {
    stream
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream(`${filePath}.gz`))
      .on('finish', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

function compressFileBrotli(filePath) {
  const stream = fs.createReadStream(filePath);
  return new Promise((resolve, reject) => {
    stream
      .pipe(zlib.createBrotliCompress())
      .pipe(fs.createWriteStream(`${filePath}.bt`))
      .on('finish', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

function findCompressableFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    const filePath = dirPath + '/' + file;
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = findCompressableFiles(dirPath + '/' + file, arrayOfFiles);
    } else if (checkCompression(file)) {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });
  return arrayOfFiles;
}

function checkCompression(fileName) {
  const ext = path.extname(fileName);
  if (
      ext === '.html' ||
      ext === '.css' ||
      ext === '.js' ||
      ext == '.svg' ||
      ext === '.json' ||
      ext === '.xml' ||
      ext === '.ttf' ||
      ext === '.wasm' ||
      ext === '.data'
    ) {
    return true;
  }
  return false;
}

removeAppFolder()
  .then(buildSass)
  .then(processHTMLFiles)
  .then(compressFiles);
