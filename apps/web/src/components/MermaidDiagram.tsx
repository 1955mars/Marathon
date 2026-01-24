"use client";

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid with a dark theme matching the app
mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
        primaryColor: '#7c3aed',
        primaryTextColor: '#fff',
        primaryBorderColor: '#a78bfa',
        secondaryColor: '#1e1b4b',
        tertiaryColor: '#312e81',
        lineColor: '#a78bfa',
        textColor: '#e2e8f0',
        fontSize: '14px',
        nodeBorder: '#a78bfa',
        mainBkg: '#1e1b4b',
        clusterBkg: '#312e81',
    },
    flowchart: {
        curve: 'basis',
        padding: 20,
    },
});

interface MermaidDiagramProps {
    chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderChart = async () => {
            if (!containerRef.current) return;

            try {
                // Clear previous content
                containerRef.current.innerHTML = '';

                // Generate a unique ID for EACH render call
                // This is critical for React StrictMode which double-renders
                const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

                // Render the new diagram
                const { svg } = await mermaid.render(uniqueId, chart);
                containerRef.current.innerHTML = svg;
            } catch (error) {
                console.error('Mermaid rendering failed:', error);
                // Fallback to showing the raw chart as code
                containerRef.current.innerHTML = `
                    <pre class="text-sm text-gray-400 bg-black/40 p-4 rounded-lg overflow-x-auto">
                        <code>${chart}</code>
                    </pre>
                `;
            }
        };

        renderChart();
    }, [chart]);

    return (
        <div
            ref={containerRef}
            className="my-6 flex justify-center bg-black/30 rounded-xl p-6 border border-white/10 overflow-x-auto"
        />
    );
}
