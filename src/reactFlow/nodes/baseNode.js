// BaseNode.js
import { Handle, Position } from 'reactflow';

//parentNode
export const BaseNode = ({ id, data, type, styles, handles, content }) => {
  return (
    <div className='p-2 rounded-lg border border-gray-400 shadow-lg' style={{ width: 200, border: '1px solid black', ...styles }}>
      <div>
        <span>{type}</span>
      </div>
      <div>{content}</div>
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id || `${id}-${handle.type}`}
          style={handle.style}
        />
      ))}
    </div>
  );
};
