import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Handle,
    Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import NodeDetail from './NodeDetail';
import './GraphComponent.css';

// Custom Node Component
const CustomNode = ({ data, selected }) => {
    return (
        <div className={`custom-node ${selected ? 'selected' : ''} ${data.node_type === 'primary' ? 'primary' : ''}`}>
            <Handle type="target" position={Position.Top} />
            <div className="custom-node-label">{data.name} {data.surname}</div>
            <div className="custom-node-sublabel">{data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

const nodeTypes = {
    custom: CustomNode,
};

// Layout Helper
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 172;
    const nodeHeight = 80;

    dagreGraph.setGraph({
        rankdir: direction,
        ranksep: 150, // Increased vertical spacing between levels
        nodesep: 100  // Increased horizontal spacing between nodes
    });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            targetPosition: 'top',
            sourcePosition: 'bottom',
            position: {
                x: nodeWithPosition.x - nodeWidth / 2 + 100, // Add 100px offset to shift right
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };
    });

    return { nodes: newNodes, edges };
};

const GraphComponent = ({ data }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState(null);

    // Transform input data to React Flow format
    useEffect(() => {
        if (!data) return;

        const initialNodes = data.nodes.map((node) => ({
            id: node.id,
            type: 'custom',
            data: { ...node }, // Pass all node data to the custom node
            position: { x: 0, y: 0 }, // Initial position, will be calculated by layout
        }));

        const initialEdges = data.links.map((link, index) => ({
            id: `e${index}`,
            source: link.source,
            target: link.target,
            label: link.detail || link.type,
            animated: true,
            style: { stroke: '#646cff' },
        }));

        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            initialNodes,
            initialEdges
        );

        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [data, setNodes, setEdges]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
    }, []);

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, []);

    return (
        <div className="graph-container">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                proOptions={{ hideAttribution: true }}
            >
                <Controls />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>

            <NodeDetail
                node={selectedNode}
                onClose={() => setSelectedNode(null)}
            />
        </div>
    );
};

export default GraphComponent;
