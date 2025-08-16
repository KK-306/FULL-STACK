
        const svg = document.getElementById("canvas");
        let drawing = false;
        let currentPath = null;

        svg.addEventListener("mousedown", (e) => {
            drawing = true;
            const pt = getMousePosition(e);
            currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            currentPath.setAttribute("d", `M ${pt.x} ${pt.y}`);
            currentPath.setAttribute("stroke", "blue");
            currentPath.setAttribute("stroke-width", "2");
            currentPath.setAttribute("fill", "none");
            svg.appendChild(currentPath);
        });

        svg.addEventListener("mousemove", (e) => {
            if (!drawing) return;
            const pt = getMousePosition(e);
            let d = currentPath.getAttribute("d");
            d += ` L ${pt.x} ${pt.y}`;
            currentPath.setAttribute("d", d);
        });

        svg.addEventListener("mouseup", () => {
            drawing = false;
            currentPath = null;
        });

        function getMousePosition(evt) {
            const CTM = svg.getScreenCTM();
            return {
                x: (evt.clientX - CTM.e) / CTM.a,
                y: (evt.clientY - CTM.f) / CTM.d
            };
        }
