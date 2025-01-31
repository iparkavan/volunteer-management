import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import protectedApi from "../../services/api";


export default function ProgramMetrix() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await protectedApi.get('/dashboard/metrics-galance');
                const data = response.data;

                // Prepare chart data
                const chartData = {
                    labels: data.category,  // Use the categories (Jan, Feb, Mar, etc.)
                    datasets: [
                        {
                            label: 'Number of Programs',
                            backgroundColor: '#636363',
                            borderColor: '#636363',
                            data: data.total_programs,  // Data for total programs
                        },
                        {
                            label: 'Active Programs',
                            backgroundColor: '#FF985D',
                            borderColor: '#FF985D',
                            data: data.activate_program,  // Data for active programs
                        },
                        {
                            label: 'Joined Members',
                            backgroundColor: '#FE634E',
                            borderColor: '#FE634E',
                            data: data.joined_members,  // Data for joined members
                        }
                    ]
                };

                // Set the chart options
                const chartOptions = {
                    maintainAspectRatio: false,
                    aspectRatio: 0.8,
                    plugins: {
                        legend: {
                            labels: {
                                fontColor: textColor,
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: textColorSecondary,
                                font: {
                                    weight: 500,
                                }
                            },
                            grid: {
                                display: false,
                                drawBorder: false
                            }
                        },
                        y: {
                            ticks: {
                                color: textColorSecondary
                            },
                            grid: {
                                color: surfaceBorder,
                                drawBorder: false
                            }
                        }
                    }
                };

                // Update the chart state
                setChartData(chartData);
                setChartOptions(chartOptions);
                setLoading(false);  // Data is loaded
            } catch (err) {
                console.error("Error fetching data", err);
                setError('Failed to load data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // Loading state
    }

    if (error) {
        return <div>{error}</div>;  // Error state
    }

    return (
        <div className="card px-8 py-6">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}
