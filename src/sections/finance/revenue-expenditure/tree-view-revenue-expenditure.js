import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const TreeViewRevenueExpenditure = (props) => {
    const { title, treeData } = props;
    return (
        <>
            <Typography variant="h6" gutterBottom sx={{ marginTop: '30px' }}>
                {title}
            </Typography>
            <Box sx={{ minHeight: 220, flexGrow: 1, maxWidth: 300 }}>
                <TreeView
                    aria-label="multi-select"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    multiSelect
                >
                    {/* Sử dụng map để tạo các TreeItem từ dữ liệu state */}
                    {treeData.map((node) => (
                        <TreeItem key={node.id} nodeId={node.id} label={node.label} defaultExpanded>
                            {node.children &&
                                node.children.map((child) => (
                                    <TreeItem key={child.id} nodeId={child.id} label={child.label} />
                                ))}
                        </TreeItem>
                    ))}
                </TreeView>
            </Box>
        </>
    );
};

export default TreeViewRevenueExpenditure;
