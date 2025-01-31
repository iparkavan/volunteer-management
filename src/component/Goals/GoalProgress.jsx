import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { useDispatch, useSelector } from 'react-redux';
import { getGoalsProgressData } from '../../services/goalsInfo';

export default function GoalProgress() {
    const [hovered, setHovered] = useState(undefined);
    const [loading, setLoading] = useState(true)
    const [progressData, setProgressData] = useState([])

    const { goalProgress } = useSelector(state => state.goals)
    const dispatch = useDispatch();
    const chartColors = ['rgba(0, 174, 189, 1)', 'rgba(29, 91, 191, 1)', 'rgba(229, 96, 49, 1)', 'rgba(80, 105, 146, 1)', 'rgba(160, 217, 180, 1)'];

    const empty = [{ title: 'nodata', value: 100, color: chartColors[0] }]
    const data =
        [
            { title: 'Supporting Personal Growth', value: 30, color: 'rgba(0, 174, 189, 1)' },
            { title: 'Networking and Career Development', value: 25, color: 'rgba(29, 91, 191, 1)' },
            { title: 'Fostering Leadership Skills', value: 17, color: 'rgba(229, 96, 49, 1)' },
            { title: 'Lorem ipsum dolor', value: 15, color: 'rgba(80, 105, 146, 1)' },
            { title: 'Lorem ipsum dolor', value: 13, color: 'rgba(160, 217, 180, 1)' },
        ];

    const updateddata = data.map((entry, i) => {
        if (hovered === i) {
            return {
                ...entry,
                color: 'grey',
                opacity: 0.4
            };
        }
        return entry;
    });

    useEffect(() => {
        if (goalProgress.length) {
            let chartData = goalProgress.map((progress, i) => {
                let updatedProgressData = {
                    title: progress.goal_name,
                    value: progress.progress,
                    color: chartColors[i]
                }
                if (hovered === i) {
                    return {
                        ...updatedProgressData,
                        color: 'grey',
                        opacity: 0.4
                    };
                }
                return updatedProgressData

            })
            setProgressData(chartData)
        }

        setLoading(false)
    }, [goalProgress])

    useEffect(() => {
        dispatch(getGoalsProgressData())
    }, [])

    if(loading) return <></>

    return (
        <div className='goal-progress' style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '10px', marginBottom: '50px' }}>
            <div className='goal-title-container progress-container flex justify-between items-center mb-5'>
                <div className='flex gap-5 items-center '>
                    <p className='text-[18px] font-semibold'>Goals Progress</p>
                </div>

            </div>
            <div className='goal-chart' style={{ padding: '10px 30px 20px' }} >
                <PieChart
                    data={progressData.length ? progressData : empty}
                    animate
                    animationDuration={1000}
                    labelStyle={{
                        fontWeight: 700,
                        fontSize: "6px",
                        fill: !progressData.length  ? chartColors[0] : "#fff"
                    }}

                    labelPosition={70}
                    lineWidth={80}
                    label={({ dataEntry }) => {
                        return dataEntry.value + "%"
                    }}

                    onMouseOver={(_, index) => {
                        setHovered(index);
                    }}
                    {
                    ...!progressData.length ?

                        { children : <text dominant-baseline="central" x="50" y="50"
                            dx="1" dy="1"
                            text-anchor="middle"
                            // style="font-weight: 700;font-size: 6px;fill: #fff"
                            style={{ fontWeight: 700, fontSize: '6px', fill: '#000' }}
                        >
                            0%
                        </text>
                        }
                        : {}


                    }
                    onMouseOut={() => {
                        setHovered(undefined);
                    }}
                    viewBoxSize={[100, 100]}

                    startAngle={100}
                />
                <div>
                    <ul className='leading-10'>
                        {
                            progressData.map((data, index) =>
                                <li className='element-block' style={{ color: 'rgba(24, 40, 61, 1)' }} key={index}
                                    onMouseOver={() => {
                                        setHovered(index);
                                    }}
                                    onMouseOut={() => {
                                        setHovered(undefined);
                                    }}
                                >
                                    <span className='item-highlight' style={{
                                        background: data.color,
                                    }}></span>
                                    <span className='progress-title'>{data.title}</span>
                                </li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
