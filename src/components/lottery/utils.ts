export const createSlicePath = (
  startAngle: number,
  endAngle: number,
  radius: number,
) => {
  const startX = radius + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = radius - radius * Math.sin((startAngle * Math.PI) / 180);

  const endX = radius + radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = radius - radius * Math.sin((endAngle * Math.PI) / 180);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `
      M ${radius} ${radius}
      L ${startX} ${startY}
      A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX} ${endY}
      Z
    `;
};

export const calculateTextPosition = (
  startAngle: number,
  endAngle: number,
  radius: number,
) => {
  const angle = (startAngle + endAngle) / 2;
  const textRadius = radius * 0.7;
  const x = radius + textRadius * Math.cos((angle * Math.PI) / 180);
  const y = radius - textRadius * Math.sin((angle * Math.PI) / 180);
  return {x, y, angle: -angle + 180};
};
