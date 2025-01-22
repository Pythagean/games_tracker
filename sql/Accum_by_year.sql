CREATE VIEW cumulative_year_durations AS SELECT 
	s.start_date,
    s.session_id,
    s.duration / 60.0 AS duration_hours,
	EXTRACT(YEAR FROM s.start_date) AS year,
    SUM(s.duration) OVER (
        PARTITION BY EXTRACT(YEAR FROM s.start_date) -- Partition by game_id and year
        ORDER BY s.session_id
    ) / 60.0 AS cumulative_duration_hours
FROM 
    sessions s
ORDER BY 
    s.session_id;

	select * from cumulative_year_durations limit 10;