export const getPieOption = (config: any, chartData: AnimationPlaybackEventInit) => {
  const { series, ...rest } = config;
  return {
    series: [
      {
        type: "pie",
        animation: true,
        data: chartData,
        ...series?.[0],
      },
    ],
    ...rest,
  };
};