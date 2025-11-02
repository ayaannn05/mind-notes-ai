import { Rnd } from "react-rnd";

const DraggableContainer = ({ position, setPosition, children, minWidth = 300, minHeight = 150, disableDragging }) => {
    return (
        <Rnd
            enableResizing={!disableDragging}
            disableDragging={disableDragging}
            size={{ width: position.width, height: position.height }}
            position={{ x: position.x, y: position.y }}
            onDragStop={(e, d) => {
                if (disableDragging) return;

                const maxX = window.innerWidth - position.width - 30;
                const maxY = window.innerHeight + window.scrollY - position.height - 30;
                const newX = Math.min(d.x, maxX);
                const newY = Math.min(d.y + window.scrollY, maxY);

                setPosition((prev) => ({ ...prev, x: newX, y: newY }));
            }}
            onResizeStop={(e, direction, ref, delta, pos) => {
                if (disableDragging) return;

                const newWidth = parseInt(ref.style.width, 10);
                const newHeight = parseInt(ref.style.height, 10);
                const maxX = window.innerWidth - newWidth - 30;
                const maxY = window.innerHeight + window.scrollY - newHeight - 30;

                setPosition({
                    width: newWidth,
                    height: newHeight,
                    x: Math.min(pos.x, maxX),
                    y: Math.min(pos.y + window.scrollY, maxY),
                });
            }}
            bounds="window"
            minWidth={minWidth}
            minHeight={minHeight}
            className="bg-white text-black shadow-lg z-50"
            dragCursor="move"
            resizeHandleStyles={{
                bottom: { cursor: "ns-resize" },
                right: { cursor: "ew-resize" },
                bottomRight: { cursor: "nwse-resize" },
                left: { cursor: "ew-resize" },
                bottomLeft: { cursor: "nesw-resize" },
                top: { cursor: "ns-resize" },
            }}
        >
            {children}
        </Rnd>
    );
};

export default DraggableContainer;