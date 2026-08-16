const fs = require('fs');
const path = require('path');

const FORMAT = 'NuclearMod Project';
const VERSION = 1;
const EXTENSION = '.nuclearapp';

function createProject(project = {}) {
    return {
        format: FORMAT,
        version: VERSION,
        name: project.name || 'Untitled Project',
        targets: project.targets || [],
        variables: project.variables || {},
        lists: project.lists || {},
        metadata: project.metadata || {}
    };
}

function saveProject(filePath, project) {
    if (!filePath.endsWith(EXTENSION)) {
        filePath += EXTENSION;
    }

    const data = createProject(project);

    fs.writeFileSync(
        path.resolve(filePath),
        JSON.stringify(data, null, 2),
        'utf8'
    );

    return filePath;
}

function loadProject(filePath) {
    if (!filePath.endsWith(EXTENSION)) {
        throw new Error('Not a NuclearMod project file.');
    }

    const data = JSON.parse(
        fs.readFileSync(path.resolve(filePath), 'utf8')
    );

    if (data.format !== FORMAT) {
        throw new Error('Invalid NuclearMod project format.');
    }

    if (typeof data.version !== 'number') {
        throw new Error('Missing NuclearMod project version.');
    }

    return data;
}

module.exports = {
    FORMAT,
    VERSION,
    EXTENSION,
    createProject,
    saveProject,
    loadProject
};