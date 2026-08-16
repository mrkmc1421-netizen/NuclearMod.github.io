import React, { useRef, useState } from 'react';

export default function Toolbar() {
    const fileInputRef = useRef(null);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const newProject = () => {
        if (window.confirm('Create a new project? Unsaved changes may be lost.')) {
            window.location.reload();
        }
    };

    const saveNow = () => {
        const project = {
            name: 'Untitled NuclearMod Project',
            version: 1,
            savedAt: new Date().toISOString()
        };

        localStorage.setItem('nuclearModProject', JSON.stringify(project));
        alert('Project saved.');
    };

    const saveToComputer = () => {
        const project = {
            name: 'Untitled NuclearMod Project',
            version: 1,
            savedAt: new Date().toISOString()
        };

        const blob = new Blob(
            [JSON.stringify(project, null, 2)],
            { type: 'application/json' }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'Untitled.nuclearapp';
        link.click();

        URL.revokeObjectURL(url);
    };

    const loadFromComputer = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            try {
                const project = JSON.parse(reader.result);
                localStorage.setItem(
                    'nuclearModProject',
                    JSON.stringify(project)
                );

                alert(`Loaded "${project.name || 'Untitled Project'}".`);
            } catch {
                alert('That is not a valid NuclearMod project.');
            }
        };

        reader.readAsText(file);
        event.target.value = '';
    };

    return (
        <>
            <div className="toolbar">
                <button onClick={newProject}>New</button>

                <button onClick={saveNow}>
                    Save Now
                </button>

                <button onClick={() => fileInputRef.current?.click()}>
                    Load from Computer
                </button>

                <button onClick={saveToComputer}>
                    Save to Computer
                </button>

                <button
                    className="advanced-button"
                    onClick={() => setShowAdvanced(true)}
                >
                    ☢️ Advanced Settings
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".nuclearapp,.json"
                    hidden
                    onChange={loadFromComputer}
                />
            </div>

            {showAdvanced && (
                <div
                    className="modal-backdrop"
                    onClick={() => setShowAdvanced(false)}
                >
                    <div
                        className="modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="advanced-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setShowAdvanced(false)}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <h2 id="advanced-title">
                            ☢️ Advanced Settings
                        </h2>

                        <label>
                            <input type="checkbox" />
                            Enable experimental features
                        </label>

                        <label>
                            <input type="checkbox" />
                            Enable developer tools
                        </label>

                        <label>
                            <input type="checkbox" />
                            Debug NuclearMod VM
                        </label>

                        <button
                            onClick={() => setShowAdvanced(false)}
                        >
                            Done
                        </button>
                    </div>
                </>
            )}
        </>
    );
}