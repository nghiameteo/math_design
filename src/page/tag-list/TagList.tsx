import { Space, Tag } from "antd";

interface OwnProps {
    tags: string[];
}

const TagList = ({tags}:OwnProps) => {

    return <Space size={[0, 8]} wrap>
        {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
    </Space>
}
export default TagList