import moment from 'moment';

const EngagementHelper = {
	engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
		// Filtering channels with more than 1 message
		const channelsWithMessages = channels.filter((channel) => {
			const messageDates = new Set(
				messageCountList
					.filter((message) => message.channelId === channel.id)
					.map((message) => moment(message.timeBucket).format('YYYY-MM-DD'))
			);
			return messageDates.size > 1;
		});

		// Getting x-axis for the graph i.e., all dates from the lowest date entry to highest date entry
		const uniqueDates = [
			...new Set(messageCountList.map((message) => message.timeBucket)),
		];
		uniqueDates.sort();
		const allDates = EngagementHelper.getAllDates(
			uniqueDates[0],
			uniqueDates.pop()
		);

		// Getting data points for our graph, per channel, per date
		const groupedData = channelsWithMessages.map((channel) => {
			const dataPoints = allDates.map((date) => {
				const messageCount = messageCountList.find(
					(message) =>
						message.channelId === channel.id && message.timeBucket === date
				);
				return messageCount ? parseInt(messageCount.count) : null;
			});
			console.log(uniqueDates, allDates, dataPoints);

			return {
				name: channel.name,
				data: dataPoints,
				connectNulls: true,
			};
		});

		// Configuring options for our HighCharts with custom styling and processed data points
		const options = {
			chart: {
				type: 'spline',
			},
			legend: {
				backgroundColor: '#15161B',
				itemStyle: {
					color: '#ffffff',
				},
			},
			tooltip: {
				backgroundColor: '#15161B',
				borderWidth: 1,
				borderColor: '#008E8C',
				style: {
					color: '#ffffff',
					border: '1px solid #0F4748',
				},
				formatter: function () {
					return `<strong>general</strong>
						<br/>
						${this.y} message(s) on ${moment(this.x).format('D MMM')}`;
				},
			},
			plotOptions: {
				series: {
					color: '#008E8C',
				},
			},
			title: {
				text: 'Engagement Messages Over Time',
				style: {
					color: '#5B5C5F',
				},
			},
			xAxis: {
				categories: allDates,
				gridLineWidth: 0,
				labels: {
					formatter: function () {
						return moment(this.value).format('D MMM');
					},
					style: {
						color: '#5B5C5F',
					},
				},
			},
			yAxis: {
				title: {
					text: 'Message Count',
					style: {
						color: '#5B5C5F',
					},
				},
				gridLineWidth: 0,
				labels: {
					style: {
						color: '#5B5C5F',
					},
				},
			},
			series: groupedData,
		};

		return options;
	},

	// Helper function to give individual dates for a date range
	getAllDates: (start, end) => {
		const startDate = new Date(start);
		const endDate = new Date(end);
		const dates = [];

		while (startDate <= endDate) {
			dates.push(startDate.toISOString());
			startDate.setDate(startDate.getDate() + 1);
		}

		return dates;
	},
};

export default EngagementHelper;
