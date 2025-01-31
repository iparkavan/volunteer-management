import React from 'react'


export const useWindowDimentions = () => {

    const { innerWidth: width, innerHeight: height } = window;



    return {
        width, height
    }
}