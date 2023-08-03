// watchSchema.js
import fs from 'fs';
import {buildSchema} from 'graphql';
import chokidar from 'chokidar';

// Path to the schema and mock data folders
const schemaFilePath = './schema.graphql';
const mockDataFolderPath = './mocks/';

// Read the initial schema and mock data files
let schema = buildSchema(fs.readFileSync(schemaFilePath, 'utf-8'));
const mockDataFiles = fs.readdirSync(mockDataFolderPath);

// Watch the schema file for changes
const watcher = chokidar.watch(schemaFilePath);
watcher.on('change', () => {
    console.log('Schema file changed. Updating mock data files...');
    updateMockDataFiles();
});

// Function to update the mock data files
function updateMockDataFiles() {
    const updatedSchema = buildSchema(fs.readFileSync(schemaFilePath, 'utf-8'));
    const queries = updatedSchema.getQueryType().getFields()

    Object.entries(queries).forEach(([queryName, queryField]) => {
        if (!mockDataFiles.includes(`${queryName}.json`)) {
            fs.writeFileSync(`${mockDataFolderPath}${queryName}.json`, JSON.stringify(generateMockData(), null, 2));
        }
    })
}

function generateMockData() {
    return {
        scenarios: {
            default: null
        }
    }
}

// Run the initial update for mock data files
updateMockDataFiles();
