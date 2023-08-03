import { readdirSync, readFileSync } from 'fs'

const mockDataFolderPath = './mocks/';
const mockDataFiles = readdirSync(mockDataFolderPath);

const defaultMocks = mockDataFiles.reduce((acc, mockFile) => {

    const file = readFileSync(`${mockDataFolderPath}/${mockFile}`, 'utf-8')
    const parsed = JSON.parse(file)
    return {
        ...acc,
        [mockFile.split('.json')[0]]: () => parsed.scenarios.default
    }
}, {})

export default {
    Int: () => 65,
    Float: () => 12.34,
    String: () => 'Hello World',
    Query: () => defaultMocks
};
