import React from 'react'

export const Button = (props) => {
    const { btnType = 'button', btnCategory = 'primary', btnName, btnCls = '', btnStyle = {}, ...rest } = props;
    let customStyle = { background: 'transparent', border: '1px solid rgba(24, 40, 61, 0.5)', ...btnStyle }
    if (btnCategory === 'primary') {
        customStyle = { background: '#FE634E', border: 'none', color: "#fff", ...btnStyle }
    }
    if (btnCategory === 'secondary') {
        customStyle = { border: '1px solid #232323', background: '#fff', color: '#232323', ...btnStyle }
    }
    return (
        <button
            type={btnType}
            className={`inline-block rounded px-7 pb-3 pt-3 text-sm font-medium 
                ${btnCategory === 'primary' ? 'text-white' : 'text-black'} ${btnCls}`}
            data-twe-ripple-init
            data-twe-ripple-color="light"
            style={customStyle}
            {...rest}
        >
            {btnName}
        </button>
    )
}