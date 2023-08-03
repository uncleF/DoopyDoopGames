import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import * as zlib from 'zlib';
import * as sass from 'sass';
import * as htmlMinifier from 'html-minifier';

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
        let result = data.replace(/(?:<.*\/_app\/immutable.*?>)|(?:\sdata-svelte-h=".*?")|(?:<!-- HEAD_svelte.*?_END -->)|(?:<!-- .*? -->)|(?:<script>(?:\n|\t)*{(?:\n|\t)*__sveltekit_(?:.|\n|\t)*?<\/script>)/g, '');
        result = result.replace(/<title>/g, '<link rel="stylesheet" href="/css/styles.css">\n    <title>');
        result = result.replace(/<a href="\/(.*?)"/g, '<a href="/$1.html"');
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
  if (ext === '.html' || ext === '.css' || ext === '.js' || ext == '.svg' || ext === '.json' || ext === '.xml' || ext === '.ttf' ) {
    return true;
  }
  return false;
}

removeAppFolder()
  .then(buildSass)
  .then(processHTMLFiles)
  .then(compressFiles);