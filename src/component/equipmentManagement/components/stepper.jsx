import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import stepperActive from "../../../assets/icons/stepperActive.svg"
import stepperInActiveIcon from "../../../assets/icons/stepperInActiveIcon.svg"
import { Divider, Typography } from '@mui/material';
import dayjs from 'dayjs';

const QontoStepIconRoot = styled('div')(({ theme }) => ({
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    '& .QontoStepIcon-completedIcon': {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    ...theme.applyStyles('dark', {
        color: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                color: '#784af4',
            },
        },
    ],
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: "#35A462"
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: "#35A462"
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 5,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                // backgroundImage:
                //     'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
                background: "#35A462",
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
        },
        {
            props: ({ ownerState }) => ownerState.completed,
            style: {
                // backgroundImage:
                //     'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
                background: "#35A462"
            },
        },
    ],
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {completed || active ? (
                <img src={stepperActive} alt='' className='h-[50px] w-[50px]' />
            ) : (
                <img src={stepperInActiveIcon} alt='' className='h-[50px] w-[50px]' />
            )}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};



export default function CustomizedSteppers({
    data
}) {

    const steps = [
        {
            title: <Typography className='!text-[#353F4F] !text-[16px]'>Equipment Assigned to <span className='!text-[#1D5BBF]'>{`(${data?.program_name})`}</span></Typography>,
            subTitle: <Typography className='!text-[#848484] !text-[14px]'>Assigned by <span className='!text-[#1D5BBF]'>{`(${data?.current_program_holder})`}</span></Typography>
        },
        {
            title: <Typography className='!text-[#353F4F] !text-[16px]'>Program Start Date</Typography>,
            subTitle: <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <Typography className='!text-[#848484] !text-[14px]'>{dayjs(data?.program_start_date).format("DD/MM/YYYY")}</Typography>
                {/* <Typography className='!text-[#848484] !text-[14px]'>22/12/2024</Typography> */}
            </Stack>

        },
        {
            title: <Typography className='!text-[#353F4F] !text-[16px]'>Program End Date</Typography>,
            subTitle: <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <Typography className='!text-[#848484] !text-[14px]'>{dayjs(data?.program_end_date).format("DD/MM/YYYY")}</Typography>
                {/* <Typography className='!text-[#848484] !text-[14px]'>22/12/2024</Typography> */}
            </Stack>
        }
    ];

    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={data?.count - 1} connector={<ColorlibConnector />}>
                {steps.map((val, i) => (
                    <Step key={i}>

                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                            <Stack alignItems={"center"} spacing={"12px"}>
                                {val?.title}
                                {val?.subTitle}
                            </Stack>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}