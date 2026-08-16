import React, { useMemo, useState } from 'react';

const extensions = [
    {
        id: 'nuclear-math',
        name: 'Math Tools',
        category: 'Utilities',
        description: 'Extra mathematical blocks for calculations and number tools.',
        icon: '🔢'
    },
    {
        id: 'nuclear-arrays',
        name: 'Arrays',
        category: 'Data',
        description: 'Create and manipulate arrays with Scratch-style blocks.',
        icon: '📊'
    },
    {
        id: 'nuclear-storage',
        name: 'Storage',
        category: 'Data',
        description: 'Store project data locally between sessions.',
        icon: '💾'
    },
    {
        id: 'nuclear-camera',
        name: 'Camera',
        category: 'Media',
        description: 'Use camera-related features in compatible projects.',
        icon: '📷'
    },
    {
        id: 'nuclear-graphics',
        name: 'Graphics',
        category: 'Graphics',
        description: 'Additional drawing and visual-effect blocks.',
        icon: '🎨'
    },
    {
        id: 'nuclear-files',
        name: 'File Tools',
        category: 'Utilities',
        description: 'Work with project files through supported browser APIs.',
        icon: '📁'
    },
    {
        id: 'nuclear-network',
        name: 'Network',
        category: 'Internet',
        description: 'Tools for working with permitted web requests.',
        icon: '🌐'
    },
    {
        id: 'nuclear-json',
        name: 'JSON Tools',
        category: 'Data',
        description: 'Read and create JSON data inside projects.',
        icon: '🧾'
    },
    {
        id: 'nuclear-text',
        name: 'Text Tools',
        category: 'Utilities',
        description: 'Extra blocks for manipulating and inspecting text.',
        icon: '🔤'
    },
    {
        id: 'nuclear-timers',
        name: 'Timers',
        category: 'Utilities',
        description: 'Advanced timing and stopwatch blocks.',
        icon: '⏱️'
    },
    {
        id: 'nuclear-particles',
        name: 'Particles',
        category: 'Graphics',
        description: 'Create lightweight particle effects.',
        icon: '✨'
    },
    {
        id: 'nuclear-scope',
        name: 'Scope',
        category: 'Data',
        description: 'Work with temporary scoped values.',
        icon: '🎯'
      {
    id: 'nuclear-3d',
    name: '3D Engine',
    category: 'Graphics',
    description: 'Create and manipulate simple 3D scenes.',
    icon: '🧊'
},
{
    id: 'nuclear-animation',
    name: 'Animation',
    category: 'Graphics',
    description: 'Advanced animation and interpolation tools.',
    icon: '🎞️'
},
{
    id: 'nuclear-color',
    name: 'Color Tools',
    category: 'Graphics',
    description: 'Convert, mix, and analyze colors.',
    icon: '🌈'
},
{
    id: 'nuclear-physics',
    name: 'Physics',
    category: 'Simulation',
    description: 'Physics utilities for movement and simulations.',
    icon: '⚙️'
},
{
    id: 'nuclear-collision',
    name: 'Collision',
    category: 'Game',
    description: 'Advanced collision detection utilities.',
    icon: '💥'
},
{
    id: 'nuclear-gamepad',
    name: 'Gamepad',
    category: 'Hardware',
    description: 'Read supported game controller inputs.',
    icon: '🎮'
},
{
    id: 'nuclear-keyboard',
    name: 'Keyboard',
    category: 'Hardware',
    description: 'Additional keyboard input utilities.',
    icon: '⌨️'
},
{
    id: 'nuclear-mouse',
    name: 'Mouse Tools',
    category: 'Hardware',
    description: 'Advanced mouse position and interaction blocks.',
    icon: '🖱️'
},
{
    id: 'nuclear-microphone',
    name: 'Microphone',
    category: 'Media',
    description: 'Work with supported microphone input.',
    icon: '🎙️'
},
{
    id: 'nuclear-video',
    name: 'Video Tools',
    category: 'Media',
    description: 'Additional video and playback controls.',
    icon: '📹'
},
{
    id: 'nuclear-sound',
    name: 'Sound Tools',
    category: 'Media',
    description: 'Advanced audio controls and utilities.',
    icon: '🔊'
},
{
    id: 'nuclear-events',
    name: 'Advanced Events',
    category: 'Events',
    description: 'Additional event and messaging blocks.',
    icon: '📡'
},
{
    id: 'nuclear-clones',
    name: 'Clone Tools',
    category: 'Game',
    description: 'Utilities for managing project clones.',
    icon: '👯'
},
{
    id: 'nuclear-lists',
    name: 'List Tools',
    category: 'Data',
    description: 'Advanced list searching, sorting, and manipulation.',
    icon: '📋'
},
{
    id: 'nuclear-strings',
    name: 'String Tools',
    category: 'Data',
    description: 'Advanced text processing and formatting.',
    icon: '🔤'
},
{
    id: 'nuclear-random',
    name: 'Random Tools',
    category: 'Utilities',
    description: 'Random numbers, choices, and utilities.',
    icon: '🎲'
},
{
    id: 'nuclear-math-advanced',
    name: 'Advanced Math',
    category: 'Math',
    description: 'Extra mathematical functions and calculations.',
    icon: '🧮'
},
{
    id: 'nuclear-date',
    name: 'Date & Time',
    category: 'Utilities',
    description: 'Read and manipulate dates and times.',
    icon: '📅'
},
{
    id: 'nuclear-console',
    name: 'Developer Console',
    category: 'Developer',
    description: 'Debug projects with developer console tools.',
    icon: '🖥️'
},
{
    id: 'nuclear-debug',
    name: 'Debugger',
    category: 'Developer',
    description: 'Inspect variables, targets, and runtime state.',
    icon: '🐛'
},
{
    id: 'nuclear-vm',
    name: 'VM Tools',
    category: 'Developer',
    description: 'Inspect and control NuclearMod VM behavior.',
    icon: '🫀'
},
{
    id: 'nuclear-http',
    name: 'HTTP Tools',
    category: 'Internet',
    description: 'Work with permitted HTTP requests.',
    icon: '🌐'
},
{
    id: 'nuclear-websocket',
    name: 'WebSocket',
    category: 'Internet',
    description: 'Communicate with compatible WebSocket servers.',
    icon: '🔌'
},
{
    id: 'nuclear-markdown',
    name: 'Markdown',
    category: 'Text',
    description: 'Create and process Markdown content.',
    icon: '📝'
},
{
    id: 'nuclear-encoding',
    name: 'Encoding',
    category: 'Utilities',
    description: 'Encode and decode supported text formats.',
    icon: '🔐'
},
{
    id: 'nuclear-data',
    name: 'Data Tools',
    category: 'Data',
    description: 'Inspect, transform, and organize structured data.',
    icon: '🗃️'
},
{
    id: 'nuclear-ai',
    name: 'AI Tools',
    category: 'AI',
    description: 'Hooks for compatible AI-powered project features.',
    icon: '🤖'
},
{
    id: 'nuclear-chat',
    name: 'Chat',
    category: 'Internet',
    description: 'Build compatible real-time messaging features.',
    icon: '💬'
},
{
    id: 'nuclear-tilemap',
    name: 'Tilemaps',
    category: 'Game',
    description: 'Create and manage tile-based game worlds.',
    icon: '🗺️'
},
{
    id: 'nuclear-particles',
    name: 'Particle Effects',
    category: 'Graphics',
    description: 'Create customizable particle systems.',
    icon: '✨'
},
{
    id: 'nuclear-pathfinding',
    name: 'Pathfinding',
    category: 'Game',
    description: 'Utilities for finding paths through game environments.',
    icon: '🧭'
},
{
    id: 'nuclear-save',
    name: 'Save System',
    category: 'Data',
    description: 'Create structured game save data.',
    icon: '💾'
      }
    }
];
const MathExtension = {
    id: 'nuclear-math',
    name: 'Math Tools',

    blocks: [
        {
            opcode: 'math_add',
            blockType: 'reporter',
            text: '[A] + [B]',
            arguments: {
                A: 0,
                B: 0
            }
        },

        {
            opcode: 'math_multiply',
            blockType: 'reporter',
            text: '[A] × [B]',
            arguments: {
                A: 0,
                B: 0
            }
        }
    ],

    opcodes: {
        math_add(args) {
            return Number(args.A) + Number(args.B);
        },

        math_multiply(args) {
            return Number(args.A) * Number(args.B);
        }
    }
};

module.exports = MathExtension;

export default function Extensions() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [selected, setSelected] = useState(null);

    const categories = useMemo(() => {
        return [
            'All',
            ...new Set(extensions.map((extension) => extension.category))
        ];
    }, []);

    const filteredExtensions = useMemo(() => {
        const query = search.trim().toLowerCase();

        return extensions.filter((extension) => {
            const matchesCategory =
                category === 'All' ||
                extension.category === category;

            const matchesSearch =
                !query ||
                extension.name.toLowerCase().includes(query) ||
                extension.description.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [search, category]);

    return (
        <main className="extensions-page">
            <header className="extensions-header">
                <div>
                    <h1>🧩 NuclearMod Extensions</h1>
                    <p>
                        Add new capabilities to your projects.
                    </p>
                </div>

                <input
                    type="search"
                    placeholder="Search extensions..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />
            </header>

            <nav className="extension-categories">
                {categories.map((item) => (
                    <button
                        key={item}
                        className={
                            category === item
                                ? 'active'
                                : ''
                        }
                        onClick={() => setCategory(item)}
                    >
                        {item}
                    </button>
                ))}
            </nav>

            <section className="extension-grid">
                {filteredExtensions.map((extension) => (
                    <article
                        className="extension-card"
                        key={extension.id}
                        onClick={() => setSelected(extension)}
                    >
                        <div className="extension-icon">
                            {extension.icon}
                        </div>

                        <div className="extension-card-content">
                            <h2>{extension.name}</h2>

                            <span className="extension-category">
                                {extension.category}
                            </span>

                            <p>
                                {extension.description}
                            </p>
                        </div>

                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                setSelected(extension);
                            }}
                        >
                            Add
                        </button>
                    </article>
                ))}
            </section>

            {filteredExtensions.length === 0 && (
                <section className="empty-extensions">
                    <h2>No extensions found</h2>
                    <p>
                        Try another search or category.
                    </p>
                </section>
            )}

            {selected && (
                <div
                    className="extension-modal-backdrop"
                    onClick={() => setSelected(null)}
                >
                    <section
                        className="extension-modal"
                        role="dialog"
                        aria-modal="true"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <button
                            className="modal-close"
                            onClick={() => setSelected(null)}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <div className="extension-modal-icon">
                            {selected.icon}
                        </div>

                        <h2>{selected.name}</h2>

                        <span>
                            {selected.category}
                        </span>

                        <p>
                            {selected.description}
                        </p>

                        <button
                            className="add-extension"
                            onClick={() => {
                                console.log(
                                    'Add extension:',
                                    selected.id
                                );

                                setSelected(null);
                            }}
                        >
                            ➕ Add Extension
                        </button>
                    </section>
                </div>
            )}
        </main>
    );
      }
