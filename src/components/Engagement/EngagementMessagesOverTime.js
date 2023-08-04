import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { messageCountList, channels } from '../../data/constants';
import EngagementHelper from './EngagementHelper';

const EngagementMessagesOverTime = () => {
	// Cusotm global style for our chart
	Highcharts.setOptions({
		chart: {
			backgroundColor: '#22222C',
			plotBackgroundColor: '#22222C',
			plotShadow: false,
			plotBorderWidth: 0,
			color: '#ffffff',
		},
	});

	// setting options as a useState to make it easily updatable
	const [chartOptions, setChartOptions] = useState(
		EngagementHelper.engagementMessageOverTimeChartOptions(
			messageCountList,
			channels
		)
	);

	return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default EngagementMessagesOverTime;
