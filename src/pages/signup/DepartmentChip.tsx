import {ReactElement} from "react";
import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

interface Props {
    id: number;
    name: string;
    checked?: boolean;
    clicked: (checked: boolean)=>void;
}

const DepartmentChipPreview = (): ReactElement => {
    return (
        <DepartmentChip id={1} name={"소프트웨어학부"} checked={false} clicked={()=> {}}/>
    );
}

export const DepartmentChip = ({id, name, checked = false, clicked}: Props): ReactElement => {

    const [selected, setSelected] = useState(checked);

    return (
        <Chip
            key={id}
            icon={selected ? <CheckCircleRoundedIcon/> : undefined}
            label={name}
            onClick={()=>{
                setSelected(!selected);
                clicked(selected);
            }}
            variant={selected ? "filled" : "outlined"}
            color={selected ? "primary" : "default"}
            sx={{fontSize: '0.8rem', fontWeight: selected ? '700' : '500'}}
        />
    );
}