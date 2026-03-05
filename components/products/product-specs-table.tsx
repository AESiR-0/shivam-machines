"use client";

import React from "react";

interface ProductSpecsTableProps {
    technicalSpecs: {
        [key: string]: string | number | undefined;
    };
}

const specMapping: { [key: string]: string } = {
    controlSystem: 'Control system',
    workingSpindleDiameter: 'Diameter of working spindle',
    travelX: 'Travel X-axis',
    travelY: 'Travel Y-axis',
    spindleSpeed: 'Spindle speed',
    travelW: 'Spindle travel - W axis',
    coolingThroughSpindle: 'Cooling through spindle',
    coolingPressure: 'Pressure of cooling',
    toolMagazine: 'Tool magazine',
    spindleTaper: 'Spindle taper',
    travelZ: 'Travel Z-axis',
    axisV: 'Axis V',
    clampingAreaOfTable: 'Clamping area of table',
    maxLoadOfTable: 'Max. load of table',
    mainMotorPower: 'Main motor power',
    machineDimensions: 'Machine dimensions l x w x h',
    machineWeight: 'Machine weight',
    clampingAreaOfRotaryTable: 'Clamping area of rotary table',
    numberOfPositionsInMagazine: 'Number of positions in magazine',
    totalInput: 'Total input',
    facePlateDiameter: 'Face plate diameter',
    maxDiameterOfFaceTurning: 'Max. diameter of face turning',
    rapidFeed: 'Rapid feed',
    tableDimensions: 'Table dimensions',
    ramDimensions: 'Ram dimensions',
    ramTravelZ: 'Ram travel (Z)',
    maxDiameterOfMilledWheel: 'Max. diameter of milled wheel',
    rapidFeedX: 'X-axis rapid feed',
    rapidFeedY: 'Y-axis rapid feed',
    rapidFeedZ: 'Z-axis rapid feed',
    numberOfDrivenAxes: 'Number of driven axes',
    maxWeightOfWorkpiece: 'Max. weight of workpiece',
    numberOfPallets: 'Number of pallets',
    axisB: 'Axis B',
    axisC: 'Axis C',
    spaceOfMachine: 'Space of machine',
    accuracyRepeatability: 'Accuracy - repeatability',
    accuracyPositioning: 'Accuracy - positioning',
    maxDiameterOfWorkpiece: 'Max. diameter of workpiece',
    maxLengthOfWorkpiece: 'Max. length of workpiece',
    maxWorkpieceHeight: 'Max. workpiece height',
    drivenTools: 'Driven Tools',
    axisW: 'Axis W',
    tableRotation: 'Table Rotation',
    turretHead: 'Turret head',
    clampingDiameterOfRotaryTable: 'Clamping diameter of rotary table',
    maxTorqueOfSpindle: 'Max. torque of spindle',
    swingOverCrossSlide: 'Swing over cross slide',
    spindleBore: 'Spindle bore',
    rotationsOfClampingPlate: 'Rotations of clamping plate',
    feedingSpeed: 'Feeding speed',
    numberOfToolPositionsDriven: 'Number of tool positions (driven)',
    speedDrivenTools: 'Speed driven tools',
    turnTableDiameter: 'Turn table diameter',
    turningLength: 'Turning length',
    barLoader: 'Bar loader',
    slopingBed: 'Sloping bed',
    maxBarDiameter: 'Max. bar diameter',
    swingOverBed: 'Swing over bed',
    chuckDiameter: 'Chuck diameter',
    distanceBetweenCentres: 'Distance between centres',
    millingHead: 'Milling head',
    counterspindle: 'Counterspindle',
    travelYLathe: 'Travel Y-axis (lathe)',
    maxDrillingDiameter: 'Max. drilling diameter',
    grindingSpindleSpeed: 'Grinding spindle speed',
};

export default function ProductSpecsTable({ technicalSpecs }: ProductSpecsTableProps) {
    // Filter out empty specs and map to labels
    const specsToShow = Object.entries(technicalSpecs)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => ({
            label: specMapping[key] || key,
            value: value?.toString() || "",
        }));

    if (specsToShow.length === 0) return null;

    return (
        <div className="mt-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-brand-darkBlue mb-6 font-candara border-b border-brand-darkBlue/20 pb-4 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-brand-darkBlue rounded-full"></span>
                Technical Specifications
            </h2>
            <div className="overflow-hidden rounded-xl border border-brand-darkBlue/10 shadow-sm bg-white">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-brand-darkBlue text-white">
                            <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider border-b border-brand-darkBlue/20">Parameter</th>
                            <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider border-b border-brand-darkBlue/20">Specification</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-darkBlue/10">
                        {specsToShow.map((spec, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? 'bg-white' : 'bg-brand-lightGray/50'} hover:bg-brand-darkBlue/5 transition-all duration-200`}
                            >
                                <td className="px-6 py-4 font-semibold text-brand-darkBlue text-sm w-1/3 border-r border-brand-darkBlue/5">
                                    {spec.label}
                                </td>
                                <td className="px-6 py-4 text-brand-gray text-sm font-calibri">
                                    {spec.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
