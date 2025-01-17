select * from players;

select * from games;

select * from games where developer like '%Naughty%';

select * from sessions;

select sum(duration)/60 from sessions where played_with LIKE '%Jordan%';

select s.*, g.title from sessions s join games g on s.game_id = g.game_id order by start_date desc;



