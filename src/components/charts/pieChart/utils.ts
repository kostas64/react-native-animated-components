import {centerX, centerY} from './data';

// Function to calculate path for each rounded slice
export const createRoundedPieSlicePath = (
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  outerRadius: number,
) => {
  'worklet';

  if (endAngle - startAngle >= 2 * Math.PI) {
    return `M ${centerX} ${centerY} m ${-outerRadius}, 0 a ${outerRadius} ${outerRadius} 0 1 1 ${
      2 * outerRadius
    } 0 a ${outerRadius} ${outerRadius} 0 1 1 ${
      -2 * outerRadius
    } 0 Z M ${centerX} ${centerY} m ${-innerRadius}, 0 a ${innerRadius} ${innerRadius} 0 1 0 ${
      2 * innerRadius
    } 0 a ${innerRadius} ${innerRadius} 0 1 0 ${-2 * innerRadius} 0 Z`;
  }

  const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

  // Calculate outer arc points
  const x1 = centerX + outerRadius * Math.cos(startAngle);
  const y1 = centerY + outerRadius * Math.sin(startAngle);
  const x2 = centerX + outerRadius * Math.cos(endAngle);
  const y2 = centerY + outerRadius * Math.sin(endAngle);

  // Calculate inner arc points (reverse direction)
  const x3 = centerX + innerRadius * Math.cos(endAngle);
  const y3 = centerY + innerRadius * Math.sin(endAngle);
  const x4 = centerX + innerRadius * Math.cos(startAngle);
  const y4 = centerY + innerRadius * Math.sin(startAngle);

  const pathData = [
    `M ${x1} ${y1}`, // Move to start of outer arc
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Outer arc
    `L ${x3} ${y3}`, // Line to start of inner arc
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`, // Inner arc (reversed direction)
    'Z', // Close path
  ].join(' ');

  return pathData;
};
