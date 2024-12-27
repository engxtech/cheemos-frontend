import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const AgentToolUsage: React.FC = () => {
  return (
    <div className="p-6 h-full bg-gray-100">
      <Title level={5} className="mb-4">
        How does an agent use a tool?
      </Title>

      <div className="mb-6">
        <Title level={5} className="mb-2 text-sm">
          The agent decides whether to use the tool
        </Title>
        <Paragraph className="text-sm">
          When your agent is deciding whether to use this tool, it considers
          the tool's name and prompt for how to use. Make sure that these are
          clear, as it can affect performance a lot.
        </Paragraph>
      </div>

      <div className="mb-6 text-xs">
        <Title level={5} className="mb-2 text-sm">
          The agent fills in the Inputs
        </Title>
        <Paragraph className="text-sm">
          The agent will fill in all of the tool's inputs. It considers the
          input's name and description when deciding how to fill each input.
          These are also very important!
        </Paragraph>
      </div>

      <div>
        <Title level={5} className="mb-2">
          The tool runs and returns the output
        </Title>
        <Paragraph className="text-sm">
          The agent receives the tool's final output. If you want to preserve
          context in the agent, consider setting a manual output with only
          exactly what the agent needs.
        </Paragraph>
      </div>
    </div>
  );
};

export default AgentToolUsage;
