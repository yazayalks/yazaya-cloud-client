import React from 'react';
import styles from './contextMenu.css'

const ContextMenu = (props) => {
    return (
        <div className="box context-menu" style={{top: props.points.y + "px", left: props.points.x + "px"}}>
        </div>
    );
};

export default ContextMenu;