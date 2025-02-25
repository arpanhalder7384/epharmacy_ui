import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function CartIcon() {
  const navigate = useNavigate(); // Hook for navigation

  const handlecartNavigation=()=>{
    console.log("cart clicked")
    navigate("/cart")
  }
  return (
    <IconButton onClick={()=>handlecartNavigation()}>
      <ShoppingCartIcon fontSize="small" />
      <CartBadge badgeContent={2} color="primary" overlap="circular"  />
    </IconButton>
  );
}