// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '5px' }}>
            <div style={{ marginTop: '10px', marginLeft:'10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                {/* <DraggableNode type='example' label='Example' />
                <DraggableNode type='pipeline' label='Pipeline' /> */}
            </div>
        </div>
    );
};
