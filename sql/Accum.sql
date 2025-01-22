SELECT 
    s.game_id,
	g.title,
    s.session_id,
    s.duration / 60.0,
    SUM(duration) OVER (
        PARTITION BY s.game_id 
        ORDER BY s.session_id
    )/60.0 AS cumulative_duration
FROM 
    sessions s
JOIN 
	games g on s.game_id = g.game_id
ORDER BY 
    s.session_id;

	DROP VIEW cumulative_session_durations;


CREATE VIEW cumulative_session_durations AS
SELECT 
	s.session_id,
	g.title,
    SUM(duration) OVER (
        PARTITION BY s.game_id 
        ORDER BY s.session_id
    )/60.0 AS cumulative_duration
FROM 
    sessions s
JOIN 
	games g on s.game_id = g.game_id
ORDER BY 
    s.game_id, s.session_id;



	SELECT * FROM cumulative_session_durations LIMIT 10;

