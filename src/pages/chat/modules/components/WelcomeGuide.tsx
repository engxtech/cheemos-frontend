import { Card } from "antd";

interface DynamicBoxGridProps {
  data: string | undefined;
  title:string|undefined;
}

export const DynamicBoxGrid: React.FC<DynamicBoxGridProps> = ({ data,title }) => {
  return (
    <div className="w-full sm:p-4">
      <Card  title={title} className="shadow-md sm:p-2 text-white bg-gray-600 hover:shadow-lg transition-all duration-200">
        <p className=" text-center">{data}</p>
      </Card>
    </div>
  );
};
