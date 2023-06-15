import React, { useState } from "react";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserEntry = ({ username ,onClose,size}) => {
    const [sizeimg, setSizeimg] = useState(size)
  
        
  return (
    <HorizontalStack justifyContent="space-between" key={username}>
      <HorizontalStack>
        <UserAvatar width={sizeimg} height={sizeimg} username={username} />
        <Typography>{username}</Typography>
      </HorizontalStack>
      <Link onClick={onClose} to={"/users/" + username} style={{
            color:"#4A92FF",
            fontSize: 15,
            textDecoration: 'none',
          }}>View</Link>
    </HorizontalStack>
  );
};

export default UserEntry;