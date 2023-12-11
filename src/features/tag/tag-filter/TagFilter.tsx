import { Select, Space, Tag } from "antd"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getTagsAsync, searchTag, selectMultiTag } from "../../filter/filterSlice";
import { SetStateAction, useEffect, useState } from "react";

const TagFilter = () => {
    const dispatch = useAppDispatch();
    const tags = useAppSelector(selectMultiTag);    

    useEffect(() => {
        dispatch(getTagsAsync());
    }, []);

    const onSearchTagChange = (value: string) => {
              
        dispatch(searchTag({ tag: value }))
    }

    return <Space
        size={[0, 10]}>
        <div>
            <h2>Search Tag</h2>
            <div>
                <Select
                    placeholder='Please Select'
                    onChange={onSearchTagChange}>
                    {tags.map((tag) => (
                        <Select.Option key={tag} value={tag} label={tag}>
                            <Tag >{tag}</Tag>
                        </Select.Option>
                    )
                    )}
                </Select>
            </div>
        </div>
    </Space>
}
export default TagFilter