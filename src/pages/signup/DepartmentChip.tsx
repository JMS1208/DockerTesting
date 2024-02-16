import {ReactElement} from "react";
import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

interface Props {
    id: number;
    name: string;
    selected: boolean;
    clicked: ()=>void;
}


export const DepartmentChip = ({id, name, selected, clicked}: Props): ReactElement => {

    return (
        <Chip
            key={id}
            icon={selected ? <CheckCircleRoundedIcon/> : undefined}
            label={name}
            onClick={clicked}
            variant={selected ? "filled" : "outlined"}
            color={selected ? "primary" : "default"}
            sx={{fontSize: '0.8rem', fontWeight: selected ? '700' : '500'}}
        />
    );
}