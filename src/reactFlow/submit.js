import { useReactFlow } from 'reactflow';
import { Button,message } from 'antd';


export const SubmitButton = () => {
    const { getNodes, getEdges } = useReactFlow();

    const handleSubmit = async () => {
        const nodes = getNodes(); // Get the latest nodes
        const edges = getEdges(); // Get the latest edges
    
        // Prepare nodes and edges data
        const nodeIds = nodes.map((node) => node.id); // Extract node IDs
        const edgePairs = edges.map((edge) => [edge.source, edge.target]); // Create source-target pairs as arrays
    
        const numNodes = nodeIds.length; // Count the nodes
        const numEdges = edgePairs.length; // Count the edges
    
        console.log(`Number of Nodes: ${numNodes}`);
        console.log(`Number of Edges: ${numEdges}`);
        console.log('Edges:', edgePairs);
    
        // Display an alert with the summary
        message.info(`Number of Nodes: ${numNodes}\nNumber of Edges: ${numEdges}`);
    
        // Prepare the API endpoint
        const url = "http://127.0.0.1:8000/pipelines/parse"; // Replace with your backend URL
    
        // Send data to the backend
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Set content type as JSON
                },
                body: JSON.stringify({
                    nodes: nodeIds, // Send node IDs
                    edges: edgePairs, // Send source-target pairs
                }),
            });
    
            if (response.ok) {
                const responseData = await response.json();
                const { num_nodes, num_edges, is_dag } = responseData;
    
                // Display response from the backend in an alert
                message.info(
                    `Response from backend:\n` +
                    `Number of Nodes: ${num_nodes}\n` +
                    `Number of Edges: ${num_edges}\n` +
                    `Is Directed Acyclic Graph (DAG): ${is_dag}`
                );
            } else {
                console.error("Failed to send data to the backend:", response.statusText);
                message.error("Failed to send data to the backend. Please check the console for details.");
            }
        } catch (error) {
            console.error("Error occurred while sending data to the backend:", error);
            message.error("An error occurred while sending data to the backend. Please check the console for details.");
        }
    };
    

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='mb-1'>
            <button
                type="primary"
                className="border p-2 rounded bg-blue-500 text-white hover:bg-blue-400 transition"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
};
