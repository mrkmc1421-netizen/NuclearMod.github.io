// BRO CONVERT YOUR PROJECT HERE.
import React, { useState } from 'react';
import JSZip from 'jszip';

export default function ProjectPackager({
    project = {},
    vmBundle = ''
}) {
    const [format, setFormat] = useState('nuclearapp');
    const [status, setStatus] = useState('');

    const getProjectData = () => ({
        format: 'NuclearMod Project',
        version: 1,
        name: project.name || 'Untitled NuclearMod Project',
        targets: project.targets || [],
        variables: project.variables || {},
        lists: project.lists || {},
        metadata: project.metadata || {}
    });

    const downloadBlob = (blob, filename) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    };

    const packageNuclearApp = () => {
        const data = JSON.stringify(
            getProjectData(),
            null,
            2
        );

        downloadBlob(
            new Blob([data], {
                type: 'application/json'
            }),
            'project.nuclearapp'
        );
    };

    const packageHTML = () => {
        const projectData = JSON.stringify(
            getProjectData()
        );

        const embeddedVM = vmBundle || `
            console.error(
                'NuclearMod VM bundle is missing.'
            );
        `;

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>${escapeHTML(
        getProjectData().name
    )}</title>

    <style>
        html,
        body {
            margin: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #111;
            color: white;
            font-family: Arial, sans-serif;
        }

        #player {
            width: 100%;
            height: 100%;
        }
    </style>
</head>

<body>
    <div id="player"></div>

    <script>
        window.NUCLEARMOD_PROJECT =
            ${projectData};
    </script>

    <script>
        ${embeddedVM}
    </script>

    <script>
        (() => {
            const project =
                window.NUCLEARMOD_PROJECT;

            if (!window.NuclearModVM) {
                console.error(
                    'NuclearMod VM failed to load.'
                );

                return;
            }

            try {
                const vm =
                    new window.NuclearModVM();

                vm.loadProject(project);
                vm.start();

                window.nuclearModVM = vm;
            } catch (error) {
                console.error(
                    'Failed to start NuclearMod:',
                    error
                );
            }
        })();
    </script>
</body>
</html>`;

        downloadBlob(
            new Blob([html], {
                type: 'text/html'
            }),
            'project.html'
        );
    };

    const packageZIP = async () => {
        const zip = new JSZip();
        const data = getProjectData();

        zip.file(
            'project.json',
            JSON.stringify(data, null, 2)
        );

        zip.file(
            'runtime/nuclearmod-vm.js',
            vmBundle
        );

        zip.file(
            'README.txt',
            [
                'NuclearMod Project',
                '',
                'project.json',
                'runtime/nuclearmod-vm.js'
            ].join('\n')
        );

        const blob = await zip.generateAsync({
            type: 'blob'
        });

        downloadBlob(blob, 'project.zip');
    };

    const packageProject = async () => {
        setStatus('Packaging...');

        try {
            if (format === 'nuclearapp') {
                packageNuclearApp();
            } else if (format === 'html') {
                packageHTML();
            } else if (format === 'zip') {
                await packageZIP();
            }

            setStatus(
                'Package created successfully.'
            );
        } catch (error) {
            console.error(error);
            setStatus('Packaging failed.');
        }
    };

    return (
        <section className="project-packager">
            <h2>📦 Project Packager</h2>

            <label htmlFor="package-format">
                Export format
            </label>

            <select
                id="package-format"
                value={format}
                onChange={(event) =>
                    setFormat(event.target.value)
                }
            >
                <option value="nuclearapp">
                    NuclearMod (.nuclearapp)
                </option>

                <option value="zip">
                    ZIP (.zip)
                </option>

                <option value="html">
                    Standalone HTML (.html)
                </option>
            </select>

            <button onClick={packageProject}>
                📦 Package Project
            </button>

            {status && (
                <p role="status">
                    {status}
                </p>
            )}
        </section>
    );
}

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
