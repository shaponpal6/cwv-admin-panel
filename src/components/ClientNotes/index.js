import React, { useState, memo } from 'react'

function ClientNotes() {

    return (
        <>
            <div className="cwv-UMCHETitle">
                <span className="cwv-UMCHEIcon">
                    <svg className="cwv-SvgIconRoot" fill="#000000" width="22px" height="22px" viewBox="0 0 1024 1024"
                        rotate="0">
                        <path
                            d="M826.024 452.226c-13.732-128.436-117.942-228.226-250.024-228.226-89.676 0-173.070 45.624-218.792 115.43-15.892-7.318-33.566-11.43-52.208-11.43-68.416 0-123.962 54.974-124.954 123.154-69.862 22.072-116.046 85.162-116.046 156.846 0 87.812 71.188 160 159 160h578c87.812 0 159-72.188 159-160 0-79.296-58.054-143.768-133.976-155.774zM801 736h-578c-70.028 0-127-57.696-127-128 0-28.544 8.886-54.094 25.7-77.2 16.942-23.28 40.452-40.308 67.988-49.008l22.020-7.020 0.336-23.124c0.358-24.548 10.186-47.59 27.674-64.85 17.502-17.274 40.688-26.792 65.284-26.792 13.52 0 26.58 2.856 38.82 8.492l25.046 11.532 15.11-23.066c41.614-63.536 115.714-101.464 191.524-101.464 55.626 0 104.96 20.53 146.18 57.808 40.932 37.020 66.688 87.474 72.526 142.070l2.606 24.376 24.214 3.83c29.454 4.658 56.506 19.844 76.174 42.762 19.86 23.142 30.798 51.174 30.798 81.654 0 70.304-56.972 128-127 128z">
                        </path>
                    </svg>
                </span>
                <div className="cwv-UMCHEName">Short Notes</div>
            </div>
            <hr className="cwv-hr" />
            <div className="cwv-UMCHEDesc">
                <div className="cwv-UMCHEDescWraper">
                    <div className="cwv-UMCHERowBase cwv-UMCHERow cwv-button" role="button"
                        aria-disabled="false">
                        <div className="cwv-listAvatar cwv-UMCHERowIcon">
                            <svg className="cwv-SvgIconRoot" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                </path>
                            </svg>
                        </div>
                        <div className="cwv-UMCHERowTitle">
                            <span className="cwv-UMCHERowLabel">Name </span>
                            <p className="cwv-UMCHERowName"> Shapon Pal</p>
                        </div>
                        <div className="cwv-UMCHERowActions">
                            <button className="cwv-buttonRoot cwv-button cwv-userActionButton" type="button">
                                <span className="MuiButton-label">Edit</span>
                                <span className="cwv-touchRipple"></span>
                            </button>
                            <button className="cwv-buttonRoot cwv-button cwv-userActionButton" type="button">
                                <span className="MuiButton-label">Skip</span>
                                <span className="cwv-touchRipple"></span>
                            </button>
                        </div>
                        <span className="cwv-touchRipple"></span>
                    </div>
                </div>
            </div>
            <hr className="cwv-hr" />
        </>
    )
}


export default memo(ClientNotes)

