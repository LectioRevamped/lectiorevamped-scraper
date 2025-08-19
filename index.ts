import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const lectioBundleMapping = 'https://www.lectio.dk/lectio/content/lectio.bundle.js.map';
const outputPath = 'lectio_bundle_sources';

interface SourceMap {
    sources: string[];
    sourcesContent: string[];
}


async function requestMappings() {
    return new Promise((resolve, reject) => {

        fetch(lectioBundleMapping).then(response => {

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();

        })
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
}


async function parseMappings(rawMappings: SourceMap) {
    console.log(chalk.bold('Parsing mappings...'));
    rawMappings.sources.forEach((source, index) => {
        const content = rawMappings?.sourcesContent[index];

        if (!content) {
            console.warn(`No content found for source: ${source}`);
            return;
        }

        let fileName = path.basename(source);
        if (!fileName) {
            console.warn(`Could not extract file name from source: ${source}`);
            fileName = `unknown_${index}.js`;
            return;
        }

        let reconstructedPath = source
            .replace("webpack://lectio/./", "")
            .replace("webpack://lectio/", "")
            .replace(/^webpack:\/\//, "");

        if (!reconstructedPath || reconstructedPath === fileName) {
            reconstructedPath = fileName;
        }

        const outputFilePath = path.join(outputPath, reconstructedPath);
        const outputDir = path.dirname(outputFilePath);
        
        
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputFilePath, content, 'utf8');
        console.log(`${chalk.dim(`${index+1} [`)}✅${chalk.dim(']')} ${chalk.white(outputFilePath)}`);
    })
}


console.log(chalk.bold('Requesting mappings...'));

await requestMappings().then(mappings => {
    console.log(chalk.bold('Mappings received'));

    parseMappings(mappings as SourceMap).then(() => {
        console.log(chalk.bold('Mappings parsed successfully'));
    }).catch(error => {
        console.error('Error parsing mappings:', error);
    });

}).catch(error => {
    console.error('Error fetching mappings:', error);
});