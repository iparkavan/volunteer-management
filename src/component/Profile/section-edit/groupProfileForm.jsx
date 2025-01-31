import { Divider, Grid } from '@mui/material';
import React from 'react';

export const GroupProfileForm = ({
    data = {}
}) => {
    const detailData = {
        first_name: "First Name",
        last_name: "Last Name",
        email: "E-Mail",
        phone_number: "Primary Contact Number",
        secondary_phone_number: "Secondary Contact Number",
        gender: "Gender",
        related_as: "Related Us",
    };

    return (
        <>
            {data?.volunteer_group?.map((vol, index, len) => (
                <React.Fragment key={index}>
                    <Grid container>
                        {Object.keys(detailData)?.map((e, i) => (
                            <Grid item xs={4} key={i}>
                                <div style={{ marginBottom: '16px' }}>
                                    <label
                                        className="block disabled:text-gray-100 tracking-wide text-xs mb-2"
                                        style={{ color: 'rgba(116, 116, 116, 1)' }}
                                    >
                                        {detailData[e]}
                                    </label>
                                    <p className="text-[14px] pt-3 capitalize">
                                        {vol[e] ?? "-"}
                                    </p>
                                </div>
                            </Grid>
                        ))}

                        {/* Conditionally render the "Specify" column */}
                        {vol.related_as === 'family' && (
                            <Grid item xs={4}>
                                <div style={{ marginBottom: '16px' }}>
                                    <label
                                        className="block disabled:text-gray-100 tracking-wide text-xs mb-2"
                                        style={{ color: 'rgba(116, 116, 116, 1)' }}
                                    >
                                        Specify
                                    </label>
                                    <p className="text-[14px] pt-3 capitalize">
                                        {vol.relationship ?? "-"}
                                    </p>
                                </div>
                            </Grid>
                        )}

                        {
                            vol.documents?.length > 0 && (
                                <Grid item xs={12}>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label
                                            className="block disabled:text-gray-100 tracking-wide text-xs mb-2"
                                            style={{ color: 'rgba(116, 116, 116, 1)' }}
                                        >
                                            Documents
                                        </label>
                                        {
                                            vol?.documents?.map((e) => {
                                                return (
                                                    <a className="text-[14px] text-font-primary-main pt-3 pr-6 underline" href={e?.document} target='_blank'>
                                                        {e?.file_display_name ?? "-"}
                                                    </a>
                                                )
                                            })
                                        }

                                    </div>
                                </Grid>
                            )
                        }
                    </Grid>
                    {len?.length - 1 !== index && <Divider sx={{ my: 2 }} />}
                </React.Fragment>
            ))}
        </>
    );
};
