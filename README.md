# lectiorevamped-scraper

A small tool that fetches the Lectio bundle source map and reconstructs the original source files locally. It writes all recovered files into the lectio_bundle_sources directory, preserving folder structure.

## Features
- Downloads https://www.lectio.dk/lectio/content/lectio.bundle.js.map
- Parses sources and writes them to disk

## Requirements
- Bun (recommended), or
- Node.js 18+ with tsx (for running TypeScript directly)

## Install
- Bun: bun install
- npm/pnpm/yarn: install dependencies as usual (chalk)

## Run
- With Bun:
  - bun index.ts
- With Node.js:
  - npx tsx index.ts

## Output
- Files are written to: lectio_bundle_sources
- Existing files may be overwritten.

## Configuration
- Output directory: edit outputPath in index.ts
- Source map URL: edit lectioBundleMapping in index.ts

## License
Licensed under the <a href="https://www.gnu.org/licenses/gpl-3.0">GPL-3.0 License</a> - see the 
<a href="LICENSE.md">LICENSE</a> file for details.