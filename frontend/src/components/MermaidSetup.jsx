import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram.replace(/\r\n/g, "\n").trim();

  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};


// here we used logic which will automatically assign unique ids to nodes based on their labels, so that duplicate labels will reuse the same node instead of creating multiple nodes with same label. This is done by maintaining a map of seen labels and their corresponding node definitions. This way we can ensure that even if the input diagram has duplicate labels, the rendered diagram will have unique nodes for each label.
const autoFixNodes = (diagram) => {
 let index = 0;
 const used = new Map(); // this line is used to keep track of seen labels and their corresponding node definitions. It allows us to reuse existing nodes when we encounter duplicate labels, ensuring that the rendered diagram has unique nodes for each label even if the input diagram contains duplicates.

 return diagram.replace(/\[(.*?)\]/g, (match, label) => {
  // normalize label for key
  const key = label.trim()

  // reuse existing node if label already seen
  if(used.has(key)) {
    return used.get(key);
  }
  
  index++;
  const id = `N${index}`;
  const node = `${id}["${key}"]`;  // this line is used to create a unique node definition for each label. It generates a unique ID for the node and formats it in the way that Mermaid expects for node definitions. By using the unique ID, we can ensure that even if there are duplicate labels in the input diagram, each node will be treated as a distinct entity in the rendered diagram.

  used.set(key, node);
  return node;
 });
};

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";
        const uniqueId = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        // sanitize before render
        const safeChart = autoFixNodes(cleanMermaidChart(diagram));

        const { svg } = await mermaid.render(uniqueId, safeChart);

        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid render failed:", error);
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      <div ref={containerRef} />
    </div>
  );
}

export default MermaidSetup;
