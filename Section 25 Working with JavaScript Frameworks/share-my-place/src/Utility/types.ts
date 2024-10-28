export type GeocodeResponse = {
	data: {
		[key: string]: unknown;
		results: {
			geometry: {
				location: {
					lat: number;
					lng: number;
				};
			};
		}[];
		status: string;
		error_message?: string;
	};
};

export type CoordinateType = {
	lat: number;
	lng: number;
};
