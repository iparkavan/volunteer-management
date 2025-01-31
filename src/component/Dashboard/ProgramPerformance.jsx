import React, { useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import ExpandeIcon from '../../assets/icons/Expand.svg';

export default function ProgramPerformance({ data, total = '48,650', handleFilter, handleDetails, height }) {
    const [hovered, setHovered] = useState(undefined);

    const updateddata = data.map((entry, i) => {
        if (hovered === i) {
            return {
                ...entry,
                color: 'grey',
            };
        }
        return entry;
    });

    const handleDropdown = (e) => {
        handleFilter && handleFilter(e)
    }

    const handleOpenDetails = () => {
        handleDetails && handleDetails()
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    return (
        <div className='program-performance' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
            <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                <div className="flex gap-4">
                    <div className="card-dash" style={{ background: "#FE634E" }} ></div>
                    <h4>Program Performance</h4>
                    <img className='cursor-pointer statistic-icon' onClick={handleOpenDetails} src={ExpandeIcon} alt="statistics" />
                </div>
                <p className="text-[12px] py-2 px-2 cursor-pointer" style={{
                    background: 'rgba(217, 228, 242, 1)', color: 'rgba(29, 91, 191, 1)', borderRadius: '3px'
                }}>
                    <select className='focus:outline-none' style={{ background: 'rgba(217, 228, 242, 1)', border: 'none' }} onChange={handleDropdown}>
                        <option value={"date"}>Day</option>
                        <option value={"month"}>Month</option>
                    </select>

                </p>


            </div>
            <div style={{ height: getWindowDimensions().width <= 1536 && !height ? '370px' : height ? height : '450px' }} className="chart-view py-9 relative flex justify-center">
                {/* <div className='relative'> */}
                <PieChart
                    data={updateddata}
                    animate
                    animationDuration={1000}
                    labelStyle={{
                        fontWeight: 700,
                        fontSize: "6px",
                        fill: "#fff"
                    }}

                    labelPosition={70}
                    lineWidth={60}
                    label={({ dataEntry }) => {
                        if (dataEntry.value>0&&dataEntry.title) {
                            // return "48,560";
                        return dataEntry.value + "%"
                        }
                    }}

                    onMouseOver={(_, index) => {
                        setHovered(index);
                    }}
                    onMouseOut={() => {
                        setHovered(undefined);
                    }}
                    viewBoxSize={[100, 100]}
                    children={
                        <text dominant-baseline="central" x="50" y="50"
                            dx="1" dy="1"
                            text-anchor="middle"
                            // style="font-weight: 700;font-size: 6px;fill: #fff"
                            style={{ fontWeight: 700, fontSize: '6px', fill: '#000' }}
                        >
                            {total}
                        </text>
                    }
                    startAngle={100}
                    // lengthAngle={20}
                    segmentsTabIndex={30}
                />
            </div>
        </div>
    )
}
