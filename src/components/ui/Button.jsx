import styled, { css } from "styled-components"

export default function Button({type='bgWhite', children, icon}){
    return(
        <StyleButton type={type}>
            {icon && <span>{icon}</span>}
            {children && <span>{children}</span>}
        </StyleButton>
    )
}
const typeStyle = {
    bgWhite : css`
        background-color: white;
        color: black;
    `,
    bgGray :css`
        background-color: gray;
        color: white;
    `,
    circle :css`
        width: 36px;
        height: 36px;
        border-radius: 100%;
        border: none;
        background-color: white;
        color: black;
        padding: 0;
    `,
    circleOut :css`
        width: 36px;
        height: 36px;
        border-radius: 100%;
        border: solid 1px white;
        background: transparent;
        color: white;
        padding: 0;

    `

}
const StyleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 500;
    gap: 8px;
    outline: none;
    border: none;
    span{
        display: flex;
        align-items: center; 
        svg{
            font-size: 24px;
        }
    }
    &:hover{
        opacity: 0.8;
    }
    ${(props) => props.type && typeStyle[props.type]}
`