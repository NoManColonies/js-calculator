import React, { useState, useEffect } from "react";
import Styled from "styled-components";

let column = 0,
  row = 0;

const ButtonElement = Styled.button`
    border: none;
    grid-column: ${column};
    grid-row: ${row};

    border-radius: 10px;
    background-color: #e0e5ec;
    box-shadow: -7px -7px 20px 0px #fff9,
                -4px -4px 5px 0px #fff9,
                7px 7px 20px 0px #0002,
                4px 4px 5px 0px #0001;
    width: 2em;
    height: 2em;
    font-size: 36px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:active
    {
        box-shadow: 4px 4px 6px 0 rgba(255,255,255,.5),
                    -4px -4px 6px 0 rgba(116, 125, 136, .2),
                    inset -4px -4px 6px 0 rgba(255,255,255,.5),
                    inset 4px 4px 6px 0 rgba(116, 125, 136, .3) !important;
        & > *
        {
            transform: scale(0.95);
        }
    }`;

function CalcButton(props: any) {
  useEffect(() => {
    column = props.column;
    row = props.row;
  }, [props.column, props.row]);

  return (
    <ButtonElement onClick={props.onClick} type="button" value={props.value}>
      {props.children}
    </ButtonElement>
  );
}

export default CalcButton;
