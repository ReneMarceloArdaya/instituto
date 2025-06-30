import { TitleBlockProps } from "./TitleBlock.type";


export function TitleBlock(props: TitleBlockProps) {
  const {tittle, icon: Icon} = props;
  return (
    <div className="flex items-center mb-6 gap-1">
        <div className="p-2 rounded-full bg-violet-400">
            <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold">{tittle}</h3>
    </div>
  )
}
