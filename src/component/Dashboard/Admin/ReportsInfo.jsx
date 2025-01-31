import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';
import CardWrapper from '../../../shared/Card/CardWrapper'
import ExpandeIcon from '../../../assets/icons/Expand.svg';

export default function ReportsInfo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const timeFilter = [
        {
            name: 'Month',
            value: 'month'
        },
        {
            name: 'Year',
            value: 'year'
        },
    ]

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    tension: 0.4,
                    borderColor: 'rgba(254, 137, 37, 1)'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    tension: 0.4,
                    borderColor: 'rgba(16, 143, 14, 1)'
                },
                {
                    label: 'Third Dataset',
                    data: [12, 51, 62, 33, 21, 62, 45],
                    fill: true,
                    borderColor: 'rgba(29, 91, 191, 1)',
                    tension: 0.4,
                    backgroundColor: 'rgba(29, 91, 191, 1)'
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <CardWrapper title='Reports Info' icon={ExpandeIcon} timeFilter={timeFilter}>
            <div className="card px-8 py-6 h-[440px]">
                <Chart type="line" data={chartData} options={chartOptions} height='390' />
            </div>
        </CardWrapper>
    )
}
