import React from 'react';
import './GraphComponent.css';

const NodeDetail = ({ node, onClose }) => {
    if (!node) return null;

    const { data } = node;

    // Filter out internal React Flow properties and ID
    const displayProps = Object.entries(data).filter(([key]) =>
        !['label', 'id'].includes(key)
    );

    return (
        <div className="node-detail-overlay">
            <div className="node-detail-header">
                <h3>{data.label || 'Details'}</h3>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="node-detail-content">
                {displayProps.map(([key, value]) => (
                    <div key={key} className="detail-row">
                        <span className="detail-label">{key.replace(/_/g, ' ')}</span>
                        <span className="detail-value">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NodeDetail;
