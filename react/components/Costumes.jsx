// RPG CREATION IS HERE!
import React, { useEffect, useRef, useState } from 'react';

export default function PaintEditor({ costume }) {
    const canvasRef = useRef(null);
    const [tool, setTool] = useState('brush');
    const [color, setColor] = useState('#000000');
    const [size, setSize] = useState(8);
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');

        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        context.fillStyle = '#ffffff';
        context.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        context.lineCap = 'round';
        context.lineJoin = 'round';
    }, [costume?.id]);

    const getPosition = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        return {
            x:
                (event.clientX - rect.left) *
                (canvas.width / rect.width),

            y:
                (event.clientY - rect.top) *
                (canvas.height / rect.height)
        };
    };

    const startDrawing = (event) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const position = getPosition(event);

        context.beginPath();
        context.moveTo(position.x, position.y);

        setDrawing(true);
    };

    const draw = (event) => {
        if (!drawing) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const position = getPosition(event);

        context.strokeStyle =
            tool === 'eraser'
                ? '#ffffff'
                : color;

        context.lineWidth = size;

        context.lineTo(position.x, position.y);
        context.stroke();
    };

    const stopDrawing = () => {
        setDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        context.fillStyle = '#ffffff';

        context.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );
    };

    const exportPNG = () => {
        const canvas = canvasRef.current;

        canvas.toBlob((blob) => {
            if (!blob) return;

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement('a');

            link.href = url;
            link.download =
                `${costume?.name || 'costume'}.png`;

            link.click();

            URL.revokeObjectURL(url);
        }, 'image/png');
    };

    return (
        <div className="paint-editor">
            <div className="paint-toolbar">
                <button
                    className={
                        tool === 'brush'
                            ? 'active'
                            : ''
                    }
                    onClick={() =>
                        setTool('brush')
                    }
                >
                    🖌️ Brush
                </button>

                <button
                    className={
                        tool === 'eraser'
                            ? 'active'
                            : ''
                    }
                    onClick={() =>
                        setTool('eraser')
                    }
                >
                    🧹 Eraser
                </button>
              <div className="paint-layer-tools">
    <button onClick={() => moveLayer('front')}>
        ⬆️ Front
    </button>

    <button onClick={() => moveLayer('back')}>
        ⬇️ Back
    </button>

    <button onClick={() => mergeSelected()}>
        🔗 Merge
    </button>

    <button onClick={() => subtractSelected()}>
        ➖ Subtract
    </button>

    <button onClick={() => maskSelected()}>
        🎭 Mask
    </button>

    <button onClick={() => greenifySelected()}>
        🟢 Greenify
    </button>
</div>
              const moveLayer = (direction) => {
    console.log(`Move selected layer to ${direction}`);
};

const mergeSelected = () => {
    console.log('Merge selected layers');
};

const subtractSelected = () => {
    console.log('Subtract selected shape');
};

const maskSelected = () => {
    console.log('Mask selected shape');
};

const greenifySelected = () => {
    console.log('Greenify selected object');
};

                <label>
                    Color

                    <input
                        type="color"
                        value={color}
                        onChange={(event) =>
                            setColor(event.target.value)
                        }
                    />
                </label>

                <label>
                    Size

                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={size}
                        onChange={(event) =>
                            setSize(
                                Number(event.target.value)
                            )
                        }
                    />
                </label>

                <button onClick={clearCanvas}>
                    🗑️ Clear
                </button>

                <button onClick={exportPNG}>
                    💾 Export PNG
                </button>
            </div>

            <div className="paint-canvas-wrapper">
                <canvas
                    ref={canvasRef}
                    width={480}
                    height={360}
                    onPointerDown={startDrawing}
                    onPointerMove={draw}
                    onPointerUp={stopDrawing}
                    onPointerLeave={stopDrawing}
                  <div className="costume-type-switch">
    <button
        className={costumeType === 'bitmap' ? 'active' : ''}
        onClick={() => setCostumeType('bitmap')}
    >
        🖼️ Bitmap
    </button>

    <button
        className={costumeType === 'vector' ? 'active' : ''}
        onClick={() => setCostumeType('vector')}
    >
        ✒️ Vector
    </button>
</div>
                />
            </div>
        </div>
    );
          }
