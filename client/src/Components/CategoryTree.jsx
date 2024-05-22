// src/CategoryTree.js
import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, ListItemIcon } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const CategoryTree = ({ category }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleToggle}>
        <ListItemText primary={category.name} />
        {category.child.length > 0 ? (
          open ? <ExpandLess /> : <ExpandMore />
        ) : null}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {category.child.map((subCategory) => (
            <CategoryTree key={subCategory._id} category={subCategory} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CategoryTree;
